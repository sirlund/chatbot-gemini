const express = require('express');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Docs configuration - categorize documents
const DOCS_CONFIG = {
  foundations: ['design-tokens', 'typography', 'shadows', 'icons'],
  components: ['avatar', 'badge', 'banner', 'button', 'thumbnail'],
};

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
    const { question, model } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'La pregunta es requerida' });
    }

    const rag = await getRAG();
    const response = await rag.queryRAG(question, model);

    res.json({ response });
  } catch (error) {
    console.error('Error en RAG:', error);

    if (error.status === 429) {
      return res.status(429).json({ error: 'Rate limit alcanzado. Espera unos segundos.' });
    }

    res.status(500).json({ error: 'Error al procesar tu consulta' });
  }
});

// Helper to extract title from markdown
function extractTitle(content) {
  const match = content.match(/^#\s+MindSet Design System\s+-\s+(.+)$/m);
  if (match) return match[1].trim();
  const h1Match = content.match(/^#\s+(.+)$/m);
  return h1Match ? h1Match[1].trim() : 'Untitled';
}

// Helper to get category for a slug
function getCategory(slug) {
  if (DOCS_CONFIG.foundations.includes(slug)) return 'Foundations';
  if (DOCS_CONFIG.components.includes(slug)) return 'Components';
  return 'Other';
}

// GET /api/docs - List all documents
app.get('/api/docs', (req, res) => {
  try {
    const docsPath = path.join(__dirname, 'docs');
    const files = fs.readdirSync(docsPath).filter((f) => f.endsWith('.md'));

    const docs = files.map((file) => {
      const slug = file.replace('.md', '');
      const content = fs.readFileSync(path.join(docsPath, file), 'utf-8');
      const title = extractTitle(content);
      const category = getCategory(slug);
      return { slug, title, category };
    });

    // Sort by category order and then alphabetically within category
    const categoryOrder = ['Foundations', 'Components', 'Other'];
    docs.sort((a, b) => {
      const catDiff = categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
      if (catDiff !== 0) return catDiff;
      return a.title.localeCompare(b.title);
    });

    res.json(docs);
  } catch (error) {
    console.error('Error listing docs:', error);
    res.status(500).json({ error: 'Error listing documents' });
  }
});

// GET /api/docs/:slug - Get single document content
app.get('/api/docs/:slug', (req, res) => {
  try {
    const { slug } = req.params;
    const filePath = path.join(__dirname, 'docs', `${slug}.md`);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Document not found' });
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const title = extractTitle(content);
    const category = getCategory(slug);

    res.json({ slug, title, category, content });
  } catch (error) {
    console.error('Error reading doc:', error);
    res.status(500).json({ error: 'Error reading document' });
  }
});

// Serve React app (SPA catch-all)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`MindSet DS Docs → http://localhost:${PORT}`);
});
