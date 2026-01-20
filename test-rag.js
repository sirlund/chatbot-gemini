// Test script para probar RAG
require('dotenv').config();

const { queryRAG, getContext } = require('./rag');

async function test() {
  console.log('Testing RAG with MindSet Design System docs...\n');

  const questions = [
    '¿Cuál es el color de acento principal?',
    '¿Qué espaciado debo usar entre secciones?',
    '¿Cuál es el radius para botones?',
  ];

  for (const q of questions) {
    console.log(`Q: ${q}`);
    try {
      const answer = await queryRAG(q);
      console.log(`A: ${answer}\n`);
    } catch (error) {
      console.error(`Error: ${error.message}\n`);
    }
  }
}

test();
