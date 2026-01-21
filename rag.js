const {
  Document,
  VectorStoreIndex,
  Settings,
  MarkdownNodeParser,
} = require('llamaindex');
const { Gemini, GeminiEmbedding } = require('@llamaindex/google');
const fs = require('fs');
const path = require('path');

// Configure Gemini as LLM and embedding model
function initRAG() {
  Settings.llm = new Gemini({
    apiKey: process.env.GEMINI_API_KEY,
    model: 'gemini-2.5-pro',
  });

  Settings.embedModel = new GeminiEmbedding({
    apiKey: process.env.GEMINI_API_KEY,
    model: 'text-embedding-004',
  });
}

// Load documents from docs folder
async function loadDocuments() {
  const docsPath = path.join(__dirname, 'docs');
  const files = fs.readdirSync(docsPath).filter((f) => f.endsWith('.md'));

  const documents = [];
  for (const file of files) {
    const content = fs.readFileSync(path.join(docsPath, file), 'utf-8');
    documents.push(
      new Document({
        text: content,
        metadata: { filename: file },
      })
    );
  }

  console.log(`Loaded ${documents.length} documents`);
  return documents;
}

// Create vector index from documents
let index = null;

async function getIndex() {
  if (index) return index;

  initRAG();
  const documents = await loadDocuments();

  console.log('Creating vector index...');
  index = await VectorStoreIndex.fromDocuments(documents, {
    nodeParser: new MarkdownNodeParser(),
  });
  console.log('Vector index ready');

  return index;
}

// Document slug mapping for links
const DOC_SLUGS = {
  'design-tokens': ['tokens', 'espaciado', 'escala', 'scale', 'gap', 'padding', 'margin'],
  'typography': ['tipografía', 'fuente', 'font', 'texto', 'heading', 'label'],
  'shadows': ['sombra', 'shadow', 'elevación', 'elevation'],
  'icons': ['icono', 'icon'],
  'avatar': ['avatar'],
  'badge': ['badge', 'insignia', 'etiqueta'],
  'banner': ['banner', 'alerta', 'notificación'],
  'button': ['botón', 'button', 'cta'],
  'thumbnail': ['thumbnail', 'miniatura', 'imagen'],
};

// Build prompt with doc links instruction
function buildSystemPrompt() {
  const docsList = Object.entries(DOC_SLUGS)
    .map(([slug]) => `- /docs/${slug}`)
    .join('\n');

  return `Eres un asistente experto en el MindSet Design System. Tu rol es responder preguntas ÚNICAMENTE basándote en la documentación proporcionada.

REGLAS CRÍTICAS:
1. Responde SOLO con información que esté explícitamente en el contexto proporcionado
2. Si la información no está en el contexto, di claramente "No encuentro esa información en la documentación"
3. NUNCA inventes valores, tokens o especificaciones que no estén documentados
4. Si hay ambigüedad, menciona exactamente lo que dice la documentación
5. Cuando menciones un token (ej: --color-gray-800), incluye su valor si está documentado (ej: #1f2937)
6. Para tokens semánticos, explica qué valor base tienen (ej: --color-content-inverted → white)

Cuando menciones componentes o secciones, incluye links markdown. Links disponibles:
${docsList}

Responde de forma clara y concisa en español.`;
}

// Query the index
async function queryRAG(question, modelId) {
  const idx = await getIndex();

  // Update LLM if different model requested
  if (modelId && modelId !== Settings.llm.model) {
    Settings.llm = new Gemini({
      apiKey: process.env.GEMINI_API_KEY,
      model: modelId,
    });
  }

  const queryEngine = idx.asQueryEngine({
    similarityTopK: 8,
  });

  const systemPrompt = buildSystemPrompt();

  const response = await queryEngine.query({
    query: `${systemPrompt}\n\nPregunta del usuario: ${question}`,
  });

  return response.toString();
}

// Get relevant context without LLM response (for custom prompts)
async function getContext(question, topK = 3) {
  const idx = await getIndex();
  const retriever = idx.asRetriever({ similarityTopK: topK });
  const nodes = await retriever.retrieve(question);

  return nodes.map((node) => ({
    text: node.node.text,
    score: node.score,
  }));
}

module.exports = { queryRAG, getContext, getIndex };
