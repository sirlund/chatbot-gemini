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
    model: 'gemini-2.0-flash-001',
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

// Query the index
async function queryRAG(question) {
  const idx = await getIndex();
  const queryEngine = idx.asQueryEngine({
    similarityTopK: 5,
  });

  const response = await queryEngine.query({
    query: question,
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
