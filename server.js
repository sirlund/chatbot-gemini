const express = require('express');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Verificar que existe la API key
if (!process.env.GEMINI_API_KEY) {
  console.error('Error: GEMINI_API_KEY no está configurada en el archivo .env');
  process.exit(1);
}

// Configurar Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Modelos disponibles
const AVAILABLE_MODELS = [
  'gemini-3-flash-preview',
  'gemini-3-pro-preview',
  'gemini-2.0-flash-001',
  'gemini-2.0-flash-lite-001'
];

let currentModel = 'gemini-3-flash-preview';

function getModel() {
  return genAI.getGenerativeModel({ model: currentModel });
}

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/dist')));

// Historial de conversación (en memoria, se pierde al reiniciar)
let chatHistory = [];

// Endpoint para el chat
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'El mensaje es requerido' });
    }

    // Crear chat con historial
    const chat = getModel().startChat({
      history: chatHistory,
    });

    // Enviar mensaje y obtener respuesta
    const result = await chat.sendMessage(message);
    const response = result.response.text();

    // Actualizar historial
    chatHistory.push(
      { role: 'user', parts: [{ text: message }] },
      { role: 'model', parts: [{ text: response }] }
    );

    res.json({ response });
  } catch (error) {
    console.error('Error al comunicarse con Gemini:', error);

    // Detectar error de rate limiting
    if (error.status === 429) {
      return res.status(429).json({
        error: 'rate_limit',
        message: 'Has alcanzado el límite de solicitudes. Espera unos segundos antes de enviar otro mensaje.'
      });
    }

    res.status(500).json({ error: 'Error al procesar tu mensaje' });
  }
});

// Endpoint para limpiar historial
app.post('/api/clear', (req, res) => {
  chatHistory = [];
  res.json({ message: 'Historial limpiado' });
});

// Endpoint para obtener modelos disponibles
app.get('/api/models', (req, res) => {
  res.json({
    models: AVAILABLE_MODELS,
    current: currentModel
  });
});

// Endpoint para cambiar modelo
app.post('/api/models', (req, res) => {
  const { model } = req.body;

  if (!AVAILABLE_MODELS.includes(model)) {
    return res.status(400).json({ error: 'Modelo no válido' });
  }

  currentModel = model;
  // El historial se mantiene al cambiar modelo
  res.json({ message: 'Modelo cambiado', current: currentModel });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
