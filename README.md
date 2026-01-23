# MindSet Design System - Documentation Hub

An intelligent documentation platform for the MindSet Design System, powered by Google Gemini with RAG (Retrieval-Augmented Generation) and live component generation.

## Overview

This project provides two main tools for working with the MindSet Design System:

1. **Chat Assistant** - AI-powered Q&A about the design system documentation
2. **Build Mode** - Generate and preview React components in real-time using natural language

## Features

### Chat Assistant
- Natural language queries about the Design System
- RAG implementation using LlamaIndex for accurate, context-aware responses
- Links to relevant documentation in responses
- Gemini 2.5 Pro for high-quality LLM responses

### Build Mode (Beta)
- Describe components in natural language and see them rendered live
- Powered by Sandpack for in-browser React rendering
- Uses `@sirlund/mindset-ui` npm package components
- Auto-loads component manifest for accurate prop suggestions
- Resizable code/preview panels
- Multiple layout options (side-by-side, top-bottom, preview-only)
- Persistent state across navigation
- Editable generated code with live preview updates

### Documentation Viewer
- Browse all design system documentation
- Markdown rendering with syntax highlighting
- Organized by categories (Foundations, Components)

### UI Features
- Collapsible sidebar for more workspace
- Dark/Light theme toggle
- Mobile responsive design
- State persistence (localStorage)

## Tech Stack

**Backend:**
- Node.js + Express
- LlamaIndex for RAG
- Google Gemini API (gemini-2.5-pro + text-embedding-004)

**Frontend:**
- React 19
- Vite
- Sandpack (live React preview)
- react-resizable-panels
- react-markdown
- Framer Motion

**Design System:**
- @sirlund/mindset-ui (npm package)
- Component manifest auto-sync

## Prerequisites

- Node.js 18+
- Google Gemini API key

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/sirlund/chatbot-gemini.git
   cd chatbot-gemini
   ```

2. Install dependencies:
   ```bash
   npm install
   cd client && npm install && cd ..
   ```

3. Create a `.env` file:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

4. Build the client:
   ```bash
   cd client && npm run build
   ```

5. Start the server:
   ```bash
   npm start
   ```

The app will be available at `http://localhost:3000`

## Development

Run server with auto-reload:
```bash
npm run dev
```

For client development (in separate terminal):
```bash
cd client && npm run dev
```

## Project Structure

```
├── server.js              # Express server + API endpoints
├── rag.js                 # RAG implementation with LlamaIndex
├── docs/                  # Design System documentation (markdown)
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Chat.jsx       # Chat assistant
│   │   │   ├── Build.jsx      # Build mode with Sandpack
│   │   │   ├── DocsViewer.jsx # Documentation viewer
│   │   │   ├── Layout.jsx     # App layout with sidebar
│   │   │   └── Sidebar.jsx    # Navigation sidebar
│   │   ├── App.jsx
│   │   └── index.css
│   └── dist/              # Built frontend
└── package.json
```

## API Endpoints

### POST /api/query
Query the Design System documentation.
```json
// Request
{ "question": "What are the button variants?" }

// Response
{ "response": "The Button component has these variants..." }
```

### POST /api/build
Generate component code from natural language.
```json
// Request
{ "prompt": "A primary button that says Submit" }

// Response
{ "code": "```jsx\nimport { Button }..." }
```

### GET /api/docs
List all documentation files.

### GET /api/docs/:slug
Get a specific documentation file content.

### GET /api/storybook/components
Get available components from Storybook index.

## Documentation Status

### Foundations
- [x] Design Tokens
- [x] Typography
- [x] Shadows
- [x] Icons (Tabler Icons)

### Components (Documented)
- [x] Avatar
- [x] Thumbnail
- [x] Badge
- [x] Banner Alert
- [x] Button

### Components (In @sirlund/mindset-ui)
- [x] Button (all variants)
- [x] Card (pricing)
- [x] Icon

## Roadmap

### Short Term
- [ ] Add more components to @sirlund/mindset-ui
- [ ] Citations in chat responses (show source documents)
- [ ] Dark mode support in Build Mode preview
- [ ] Export generated code as file

### Medium Term
- [ ] Component composition examples
- [ ] Figma integration (design to code)
- [ ] Share generated components via URL
- [ ] Version history for generated code

### Long Term
- [ ] Multi-file component generation
- [ ] Custom theme support in Build Mode
- [ ] Audio overview (NotebookLM style)
- [ ] Upload custom documentation

## Related Projects

- [@sirlund/mindset-ui](https://www.npmjs.com/package/@sirlund/mindset-ui) - React component library
- [MindSet Storybook](https://sirlund.github.io/mindset-design-system) - Component documentation

## License

MIT
