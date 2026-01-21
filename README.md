# MindSet Design System Docs Chatbot

A chatbot powered by Google Gemini with RAG (Retrieval-Augmented Generation) for querying Design System documentation.

## Features

- Chat interface for querying Design System documentation
- RAG implementation using LlamaIndex for accurate, context-aware responses
- Gemini 2.0 Flash for fast LLM responses
- React 19 frontend with Tailwind CSS

## Tech Stack

**Backend:**
- Node.js + Express
- LlamaIndex for RAG
- Google Gemini API (LLM + embeddings)

**Frontend:**
- React 19
- Vite
- Tailwind CSS
- react-markdown for rendering responses

## Prerequisites

- Node.js 18+
- Google Gemini API key

## Setup

1. Clone the repository

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

4. Build the client:
   ```bash
   npm run build
   ```

5. Start the server:
   ```bash
   npm start
   ```

The app will be available at `http://localhost:3000`

## Development

Run the server with auto-reload:
```bash
npm run dev
```

For client development, navigate to the `client` folder:
```bash
cd client
npm run dev
```

## Project Structure

```
├── server.js          # Express server
├── rag.js             # RAG implementation with LlamaIndex
├── docs/              # Design System documentation (markdown)
├── client/            # React frontend
│   ├── src/
│   └── dist/          # Built frontend
└── package.json
```

## Documentation Status

### Foundations
- [x] Design Tokens
- [x] Typography
- [x] Shadows
- [x] Icons (Tabler Icons)

### Components
- [x] Avatar
- [x] Thumbnail
- [x] Badge
- [x] Banner Alert
- [x] Button (base)
- [ ] Button variants (Icon Button, Destructive)
- [ ] Cards
- [ ] Canvas
- [ ] Chat
- [ ] Chip
- [ ] Forms
- [ ] Layout Elements
- [ ] Content
- [ ] Menu
- [ ] Modal
- [ ] Progress Bar
- [ ] Sidebar
- [ ] Table
- [ ] Tabs
- [ ] Toast
- [ ] Tooltips
- [ ] Tree

## Roadmap

- [ ] Citas/referencias en respuestas (mostrar de qué documento viene la info)
- [ ] Soporte para Gemini 3 Pro (cuando llamaindex lo soporte)
- [ ] Upload de documentos por UI
- [ ] Audio overview (estilo NotebookLM)

## API

### POST /api/query

Query the Design System documentation.

**Request:**
```json
{
  "question": "How do I use the Button component?"
}
```

**Response:**
```json
{
  "response": "The Button component..."
}
```
