#  cursor-canvas-Agent-


A powerful real-time application that combines Google's Gemini AI with screen sharing, interactive cursor canvas, and chat capabilities. This application enables users to share their screen, get AI-powered analysis, and have natural conversations with the Gemini AI model while providing interactive cursor visualization and tracking.

## 🌟 Features

- **Interactive Cursor Canvas System**
  - Real-time cursor position tracking and visualization
  - Dual cursor system (user cursor in blue, AI cursor in red)
  - Smooth cursor animations with interpolation
  - Cursor position synchronization across multiple users
  - Click-point visualization and tracking
  - Cursor trail effects for better visibility
  - Intelligent cursor movement based on AI responses
  - Screen coordinate mapping for accurate positioning

- **Advanced Screen Analysis**
  - Bounding box detection for UI elements
  - Element highlighting on cursor hover
  - Interactive region selection
  - Real-time screen element analysis
  - Automatic UI component detection
  - Visual feedback for detected elements
  - Coordinate-based element identification
  - Screen region annotation capabilities

- **Real-time Chat with Gemini AI**
  - Natural language conversations
  - Context-aware responses
  - Message history tracking
  - Real-time typing indicators
  - Cursor position-based contextual responses
  - Screen content analysis integration
  - Multi-modal interaction support

- **Screen Sharing Capabilities**
  - High-quality screen capture
  - Real-time screen analysis
  - Interactive cursor tracking
  - Bounding box detection for UI elements
  - Screen region selection
  - Multi-monitor support
  - Dynamic resolution adaptation
  - Low-latency streaming

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

1. **Interactive Cursor Features**
   - Move your mouse to see the blue user cursor
   - Watch the red AI cursor respond to interactions
   - Click to highlight specific screen regions
   - Use the cursor for precise element selection
   - Observe cursor animations during AI analysis
   - Experience synchronized cursor movements
   - See real-time bounding box detection

2. **Screen Sharing and Analysis**
   - Click the "Start Screen Share" button
   - Select the window/screen to share
   - Use the "Analyze Screen" button for AI analysis
   - Watch as the AI cursor identifies UI elements
   - See bounding boxes appear around detected components
   - Get real-time analysis of screen content
   - Use cursor to interact with detected elements

3. **Chat with AI**
   - Type messages in the chat input
   - Press Enter or click Send
   - View real-time AI responses

4. **Voice Input**
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
