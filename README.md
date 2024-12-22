# Gemini Real-time Chat & Screen Share Assistant

A powerful real-time application that combines Google's Gemini AI with screen sharing and interactive chat capabilities. This application enables users to share their screen, get AI-powered analysis, and have natural conversations with the Gemini AI model.

## 🌟 Features

- **Real-time Chat with Gemini AI**
  - Natural language conversations
  - Context-aware responses
  - Message history tracking
  - Real-time typing indicators

- **Screen Sharing Capabilities**
  - High-quality screen capture
  - Real-time screen analysis
  - Interactive cursor tracking
  - Bounding box detection for UI elements

- **Voice Input Support**
  - Voice message recording
  - Speech-to-text conversion (experimental)
  - Voice command recognition

- **Interactive UI**
  - Modern and responsive design
  - Smooth animations
  - Real-time cursor visualization
  - Split-screen layout

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- Google Cloud Platform account with Gemini API access

### Installation

1. Clone the repository:
```bash
git clone https://github.com/saurav-shakya/cursor-canvas-Agent-.git
cd cursor-canvas-Agent-
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
PORT=3000
GEMINI_API_KEY=your_api_key_here
```

4. Start the server:
```bash
node server.js
```

5. Open your browser and navigate to:
```
http://localhost:3000
```

## 💡 Usage

1. **Start Screen Sharing**
   - Click the "Start Screen Share" button
   - Select the window/screen to share
   - Use the "Analyze Screen" button for AI analysis

2. **Chat with AI**
   - Type messages in the chat input
   - Press Enter or click Send
   - View real-time AI responses

3. **Voice Input**
   - Click the microphone button
   - Record your message
   - Wait for AI response

## 🛠️ Technologies Used

- **Frontend**
  - HTML5, CSS3, JavaScript
  - Socket.IO Client
  - Canvas API
  - MediaStream API

- **Backend**
  - Node.js
  - Express.js
  - Socket.IO
  - Google Generative AI (Gemini)

## 🔒 Security

- Environment variables for sensitive data
- Safety settings for AI responses
- Secure WebSocket connections
- Session management

## ⚙️ Configuration

The application can be configured through the following environment variables:
- `PORT`: Server port (default: 3000)
- `GEMINI_API_KEY`: Your Google Gemini API key

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Generative AI team for Gemini API
- Socket.IO team for real-time capabilities
- Open source community for various tools and libraries

## 📞 Support

For support, please open an issue in the GitHub repository or contact the maintainers.
