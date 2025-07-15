# AI Coding Agent Backend

A FastAPI-based backend service that provides a chat interface using Google's Gemini AI model. This service handles real-time streaming responses for an AI coding assistant.

## Features

-   **FastAPI Framework**: Modern, fast web framework for building APIs
-   **Google Gemini AI Integration**: Uses Gemini 1.5 Flash model for AI responses
-   **Real-time Streaming**: Server-Sent Events (SSE) for live chat responses
-   **Session Management**: In-memory chat history per session
-   **Environment Configuration**: Secure API key management

## Prerequisites

-   Python 3.8 or higher
-   pip (Python package installer)
-   Google AI API key

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ai-coding-agent/backend
```

### 2. Create Virtual Environment

```bash
# Create virtual environment
python -m venv .venv

# Activate virtual environment
# On macOS/Linux:
source .venv/bin/activate
# On Windows:
# .venv\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Environment Setup

Create a `.env` file in the backend directory:

```bash
# Copy the example environment file
cp env.example .env

# Or create it manually
touch .env
```

Add your Google AI API key to the `.env` file:

```
GOOGLE_API_KEY=your_google_ai_api_key_here
```

**Note**: You'll need to obtain a Google AI API key from the [Google AI Studio](https://makersuite.google.com/app/apikey).

## Running the Project

### Development Server

```bash
# Start the development server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The server will start on `http://localhost:8000`

### Production Server

```bash
# Start the production server
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## API Endpoints

### POST `/api/chat`

Send a chat message and receive streaming AI responses.

**Request Body:**

```json
{
    "session_id": "string",
    "message": "string"
}
```

**Response:** Server-Sent Events (SSE) stream with AI responses.

## Project Structure

```
backend/
├── app/
│   ├── main.py          # FastAPI application entry point
│   ├── deps.py          # Dependencies and AI model configuration
│   ├── schemas.py       # Pydantic models
│   └── routers/
│       └── chat.py      # Chat API endpoints
├── tests/
│   └── test_chat.py     # Basic API tests
├── requirements.txt      # Python dependencies
├── env.example          # Environment variables template
└── README.md           # This file
```

## Dependencies

-   **FastAPI**: Web framework for building APIs
-   **Uvicorn**: ASGI server for running FastAPI
-   **python-dotenv**: Environment variable management
-   **google-generativeai**: Google AI SDK for Gemini integration

## Development

### Adding New Dependencies

```bash
pip install <package-name>
pip freeze > requirements.txt
```

### Running Tests

```bash
# Run tests (when implemented)
python -m pytest
```

## Troubleshooting

### Common Issues

1. **ModuleNotFoundError**: Make sure you're in the virtual environment

    ```bash
    source .venv/bin/activate
    ```

2. **API Key Error**: Ensure your `.env` file contains the correct Google AI API key

    ```
    GOOGLE_API_KEY=your_actual_api_key
    ```

3. **Port Already in Use**: Change the port number
    ```bash
    uvicorn app.main:app --reload --port 8001
    ```

## Security Notes

-   Never commit your `.env` file to version control
-   Keep your API keys secure and rotate them regularly
-   The current implementation uses in-memory storage - consider using a database for production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

[Add your license information here]
