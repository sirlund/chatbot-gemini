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

// Storybook configuration
const STORYBOOK_URL = 'https://sirlund.github.io/mindset-design-system';
let storybookCache = null;
let storybookCacheTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// GET /api/storybook/components - Get components from Storybook
app.get('/api/storybook/components', async (req, res) => {
  try {
    const now = Date.now();
    if (storybookCache && (now - storybookCacheTime) < CACHE_TTL) {
      return res.json(storybookCache);
    }

    const response = await fetch(`${STORYBOOK_URL}/index.json`);
    if (!response.ok) throw new Error('Failed to fetch Storybook index');

    const data = await response.json();

    // Parse components from index
    const components = {};
    for (const [id, entry] of Object.entries(data.entries || {})) {
      if (entry.type === 'story' && entry.title?.includes('/')) {
        const componentName = entry.title.split('/').pop();
        if (!components[componentName]) {
          components[componentName] = {
            name: componentName,
            stories: [],
            path: entry.importPath,
          };
        }
        components[componentName].stories.push({
          id: entry.id,
          name: entry.name,
          title: entry.title,
        });
      }
    }

    storybookCache = {
      url: STORYBOOK_URL,
      components: Object.values(components),
      timestamp: now,
    };
    storybookCacheTime = now;

    res.json(storybookCache);
  } catch (error) {
    console.error('Error fetching Storybook:', error);
    res.status(500).json({ error: 'Error fetching Storybook components' });
  }
});

// POST /api/build - Generate component code
app.post('/api/build', async (req, res) => {
  try {
    const { prompt, components } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const rag = await getRAG();

    // Build context with available components
    const componentList = components?.map(c =>
      `- ${c.name}: variantes disponibles: ${c.stories.map(s => s.name).join(', ')}`
    ).join('\n') || '';

    const systemPrompt = `Eres un experto en React y el MindSet Design System.
Tu tarea es generar código JSX funcional que use los componentes disponibles.

COMPONENTES DISPONIBLES:
${componentList}

REGLAS ESTRICTAS:
1. Genera SOLO código JSX, sin TypeScript (no uses : tipo ni interface/type)
2. Importa desde '@sirlund/mindset-ui'
3. El componente principal debe llamarse App y tener export default
4. Usa estilos inline con style={{}} cuando necesites layout (flexbox, gap, padding)
5. NO uses componentes que no estén en la lista
6. Responde SOLO con un bloque de código markdown, sin explicaciones

Ejemplo de estructura esperada:
\`\`\`jsx
import { Button } from '@sirlund/mindset-ui';

export default function App() {
  return (
    <div style={{ padding: '24px' }}>
      <Button variant="accent">Click me</Button>
    </div>
  );
}
\`\`\``;

    const response = await rag.generateCode(prompt, systemPrompt);

    res.json({ code: response });
  } catch (error) {
    console.error('Error en build:', error);
    res.status(500).json({ error: 'Error generating code' });
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
