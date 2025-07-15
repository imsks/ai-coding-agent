# AI Coding Agent Frontend

A Claude-style AI Coding Agent UI built with React, TailwindCSS, Zustand, and Monaco Editor. This frontend connects to a FastAPI backend (Gemini 2.5 streaming) and lets users chat with an AI agent, view generated code artifacts, and preview code in a dynamic sidebar.

## Features

-   **Claude-style Layout**: Chat on the left, dynamic sidebar on the right
-   **Streaming AI Responses**: Real-time chat with Gemini 2.5 (free tier)
-   **Code Artifacts**: Syntax-highlighted Monaco editor, toggled sidebar
-   **Preview/Sandbox**: Toggle between code and live preview (HTML/CSS/JS)
-   **Artifact Button**: Appears when code is generated, opens sidebar
-   **Short-term Memory**: In-memory chat and artifact history
-   **Responsive Design**: Mobile-friendly, polished UI

## Tech Stack

-   **React** (TypeScript)
-   **TailwindCSS** (with ShadCN/UI, Radix UI)
-   **Zustand** (state management)
-   **Monaco Editor** (code view)
-   **Axios** (API calls)
-   **Vite** (build tool)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ai-coding-agent/frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure API Endpoint

By default, the frontend expects the backend at `http://localhost:8000`. To change this, create a `.env` file:

```bash
echo 'VITE_API_URL=http://localhost:8000' > .env
```

### 4. Run the Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) (or as shown in your terminal).

## Usage

-   Type a message in the chat and press Enter.
-   AI responses stream in real-time.
-   When a code artifact is generated, a "View Generated Artifact" button appears.
-   Click the button to open the sidebar and view the code or preview.
-   Use the toggle to switch between Code and Preview views.

## Project Structure

```
frontend/
├── src/
│   ├── components/      # UI components (Chat, Sidebar, Editor, etc.)
│   ├── store/           # Zustand state management
│   ├── services/        # API service (SSE streaming)
│   ├── utils/           # Utility functions (classNames, etc.)
│   ├── hooks/           # Custom React hooks
│   └── App.tsx          # Main app entry
├── public/
├── package.json
├── tailwind.config.js
└── README.md
```

## Extending/Customizing

-   **Add new UI components** in `src/components/`
-   **Change state logic** in `src/store/`
-   **Update API logic** in `src/services/api.ts`
-   **Add new hooks** in `src/hooks/`
-   **Style with Tailwind** in your components

## Deployment

-   Build for production:
    ```bash
    npm run build
    ```
-   Deploy the `dist/` folder to Vercel, Netlify, or your preferred host.

## How This Was Built

-   **Product Thinking**: UX modeled after Claude, with focus on clarity and usability
-   **Engineering Depth**: SSE streaming, modular state, code/preview toggles
-   **AI Integration**: Real-time Gemini 2.5, in-memory session
-   **Architecture**: Modular, scalable, easy to extend

## License

[Add your license here]
