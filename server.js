const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

if (!process.env.GEMINI_API_KEY) {
  console.error('Error: GEMINI_API_KEY no está configurada');
  process.exit(1);
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/dist')));

// RAG - lazy load
let ragModule = null;
async function getRAG() {
  if (!ragModule) {
    console.log('Initializing RAG...');
    ragModule = require('./rag');
    await ragModule.getIndex();
    console.log('RAG ready');
  }
  return ragModule;
}

// Endpoint para consultas del Design System
app.post('/api/query', async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'La pregunta es requerida' });
    }

    const rag = await getRAG();
    const response = await rag.queryRAG(question);

    res.json({ response });
  } catch (error) {
    console.error('Error en RAG:', error);

    if (error.status === 429) {
      return res.status(429).json({ error: 'Rate limit alcanzado. Espera unos segundos.' });
    }

    res.status(500).json({ error: 'Error al procesar tu consulta' });
  }
});

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`MindSet DS Docs → http://localhost:${PORT}`);
});
