const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
require('dotenv').config();

// Check if API key exists
if (!process.env.GEMINI_API_KEY) {
    console.error('ERROR: GEMINI_API_KEY not found in environment variables');
    process.exit(1);
}

// Initialize Express app and Socket.IO
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files
app.use(express.static('public'));

// Initialize Gemini AI with experimental features
console.log('Initializing Gemini AI with experimental features...');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Configure safety settings with more permissive thresholds
const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
];

// Configure models with improved settings
const visionModel = genAI.getGenerativeModel({
    model: "gemini-pro-vision",
    safetySettings,
    generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 4096,
    }
});

const chatModel = genAI.getGenerativeModel({
    model: "gemini-pro",
    safetySettings,
    generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 4096,
    }
});

// Store active sessions
const sessions = new Map();

// Helper function to process screen content with bounding box detection
async function processScreenContent(imageData, sessionId) {
    try {
        console.log('Processing screen content with object detection...');
        const parts = [
            {
                text: `Analyze this screen content. Identify and locate key elements using bounding boxes.
                       Format: Describe what you see and provide coordinates in [y_min, x_min, y_max, x_max] format (0-1000 scale).
                       Also provide guidance about the content.`
            },
            { inlineData: { data: imageData, mimeType: "image/jpeg" } }
        ];

        const result = await visionModel.generateContent(parts);
        const response = await result.response;
        console.log('Screen analysis complete');
        return response.text();
    } catch (error) {
        console.error('Error processing screen content:', error);
        return 'Error analyzing screen content: ' + error.message;
    }
}

// Function to handle voice input
async function processVoiceInput(audioData) {
    try {
        // Note: Voice processing would go here when available
        return 'Voice processing is currently in experimental access';
    } catch (error) {
        console.error('Error processing voice input:', error);
        return null;
    }
}

// Socket.IO connection handling
io.on('connection', async (socket) => {
    console.log('New client connected:', socket.id);

    try {
        // Initialize chat session with retry mechanism
        let chat;
        let retryCount = 0;
        const maxRetries = 3;

        while (retryCount < maxRetries) {
            try {
                chat = await chatModel.startChat({
                    history: [],
                    generationConfig: {
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 4096,
                    }
                });
                break;
            } catch (error) {
                console.error(`Retry ${retryCount + 1} failed:`, error);
                retryCount++;
                if (retryCount === maxRetries) {
                    throw new Error('Failed to initialize chat after multiple retries');
                }
                await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
            }
        }

        // Store chat session with improved error handling
        sessions.set(socket.id, {
            chat,
            lastInteraction: Date.now(),
            context: {},
            messageHistory: [],
            retryCount: 0
        });

        // Handle chat messages with improved error handling and retry mechanism
        socket.on('chat message', async (message) => {
            console.log('Received message from client:', message);
            const session = sessions.get(socket.id);
            
            if (!session) {
                socket.emit('ai response', 'Error: Session not found. Please refresh the page.');
                return;
            }

            try {
                session.lastInteraction = Date.now();
                session.messageHistory.push({ role: 'user', content: message });
                socket.emit('typing', true);

                const prompt = `Previous context: ${session.messageHistory.slice(-3).map(m => m.content).join('\n')}\n\nCurrent message: ${message}`;
                
                let response;
                let retryCount = 0;
                const maxRetries = 3;

                while (retryCount < maxRetries) {
                    try {
                        const result = await session.chat.sendMessage(prompt);
                        response = await result.response;
                        break;
                    } catch (error) {
                        console.error(`Retry ${retryCount + 1} failed:`, error);
                        retryCount++;
                        if (retryCount === maxRetries) {
                            throw new Error('Failed to get response after multiple retries');
                        }
                        await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
                    }
                }

                const text = response.text();
                session.messageHistory.push({ role: 'assistant', content: text });
                socket.emit('typing', false);
                socket.emit('ai response', text);
                socket.broadcast.emit('new message', { from: socket.id, content: text });

            } catch (error) {
                console.error('Error processing message:', error);
                socket.emit('typing', false);
                socket.emit('ai response', `Error: ${error.message}. Please try again.`);
                
                // Reset session if there's a critical error
                if (error.message.includes('Failed to get response after multiple retries')) {
                    sessions.delete(socket.id);
                    socket.emit('ai response', 'Session reset due to errors. Please refresh the page.');
                }
            }
        });

        // Handle screen content
        socket.on('screen content', async (imageData) => {
            try {
                console.log('Received screen content');
                const session = sessions.get(socket.id);
                if (session) {
                    session.context.lastScreenContent = imageData;
                    const analysis = await processScreenContent(imageData, socket.id);
                    socket.emit('ai response', analysis);
                }
            } catch (error) {
                console.error('Error handling screen content:', error);
                socket.emit('ai response', 'Error processing screen content: ' + error.message);
            }
        });

        // Handle voice input (experimental)
        socket.on('voice input', async (audioData) => {
            try {
                const result = await processVoiceInput(audioData);
                if (result) {
                    socket.emit('ai response', result);
                }
            } catch (error) {
                console.error('Error processing voice input:', error);
                socket.emit('ai response', 'Error processing voice input: ' + error.message);
            }
        });

        // Handle cursor position
        socket.on('cursor position', (position) => {
            socket.broadcast.emit('cursor move', position);
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
            sessions.delete(socket.id);
        });

    } catch (error) {
        console.error('Error initializing session:', error);
        socket.emit('ai response', 'Error initializing session. Please refresh the page and try again.');
    }
});

// Cleanup old sessions periodically
setInterval(() => {
    const now = Date.now();
    for (const [sessionId, session] of sessions.entries()) {
        if (now - session.lastInteraction > 30 * 60 * 1000) { // 30 minutes
            sessions.delete(sessionId);
        }
    }
}, 5 * 60 * 1000); // Check every 5 minutes

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Using Gemini 2.0 with experimental features');
}); 