const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const messages = document.getElementById('messages');
const sendBtn = document.getElementById('send-btn');
const clearBtn = document.getElementById('clear-btn');
const modelSelect = document.getElementById('model-select');

let isWaiting = false;
let cooldownSeconds = 0;

// Cargar modelos disponibles
async function loadModels() {
  try {
    const response = await fetch('/api/models');
    const data = await response.json();

    modelSelect.innerHTML = data.models.map(model => {
      const shortName = model.replace('gemini-', '').replace('-001', '');
      return `<option value="${model}" ${model === data.current ? 'selected' : ''}>${shortName}</option>`;
    }).join('');
  } catch (error) {
    console.error('Error al cargar modelos:', error);
  }
}

// Cambiar modelo
async function changeModel(model) {
  try {
    await fetch('/api/models', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model })
    });

    // Limpiar chat visualmente
    messages.innerHTML = `
      <div class="message bot">
        <div class="message-content">
          Modelo cambiado a ${model.replace('gemini-', '').replace('-001', '')}. ¿En qué puedo ayudarte?
        </div>
      </div>
    `;
  } catch (error) {
    console.error('Error al cambiar modelo:', error);
  }
}

// Evento de cambio de modelo
modelSelect.addEventListener('change', (e) => {
  changeModel(e.target.value);
});

// Cargar modelos al iniciar
loadModels();

// Agregar mensaje al chat
function addMessage(content, isUser, isWarning = false) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${isUser ? 'user' : 'bot'}${isWarning ? ' warning' : ''}`;

  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';
  if (isWarning) {
    contentDiv.id = 'warning-message';
  }
  contentDiv.textContent = content;

  messageDiv.appendChild(contentDiv);
  messages.appendChild(messageDiv);
  messages.scrollTop = messages.scrollHeight;

  return contentDiv;
}

// Mostrar indicador de escritura
function showTypingIndicator() {
  const typingDiv = document.createElement('div');
  typingDiv.className = 'message bot';
  typingDiv.id = 'typing';

  typingDiv.innerHTML = `
    <div class="message-content typing-indicator">
      <span></span>
      <span></span>
      <span></span>
    </div>
  `;

  messages.appendChild(typingDiv);
  messages.scrollTop = messages.scrollHeight;
}

// Ocultar indicador de escritura
function hideTypingIndicator() {
  const typing = document.getElementById('typing');
  if (typing) {
    typing.remove();
  }
}

// Iniciar cooldown con contador
function startCooldown(seconds) {
  isWaiting = true;
  cooldownSeconds = seconds;
  sendBtn.disabled = true;

  const warningEl = addMessage(`Espera ${cooldownSeconds} segundos...`, false, true);

  const interval = setInterval(() => {
    cooldownSeconds--;
    if (cooldownSeconds > 0) {
      warningEl.textContent = `Espera ${cooldownSeconds} segundos...`;
    } else {
      clearInterval(interval);
      warningEl.textContent = '¡Listo! Ya puedes enviar otro mensaje.';
      isWaiting = false;
      sendBtn.disabled = false;
      input.focus();

      // Remover el mensaje después de 2 segundos
      setTimeout(() => {
        const warningMsg = warningEl.parentElement;
        if (warningMsg) {
          warningMsg.remove();
        }
      }, 2000);
    }
  }, 1000);
}

// Enviar mensaje
async function sendMessage(message) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });

  const data = await response.json();

  if (response.ok) {
    return { success: true, response: data.response };
  } else if (response.status === 429) {
    return { success: false, isRateLimit: true, message: data.message };
  } else {
    return { success: false, message: data.error || 'Error al enviar mensaje' };
  }
}

// Manejar envío del formulario
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (isWaiting) return;

  const message = input.value.trim();
  if (!message) return;

  // Agregar mensaje del usuario
  addMessage(message, true);
  input.value = '';
  sendBtn.disabled = true;

  // Mostrar indicador de escritura
  showTypingIndicator();

  const result = await sendMessage(message);
  hideTypingIndicator();

  if (result.success) {
    addMessage(result.response, false);
    sendBtn.disabled = false;
  } else if (result.isRateLimit) {
    // Iniciar cooldown de 15 segundos
    startCooldown(15);
  } else {
    addMessage('Lo siento, hubo un error al procesar tu mensaje.', false);
    sendBtn.disabled = false;
  }

  if (!isWaiting) {
    input.focus();
  }
});

// Limpiar conversación
clearBtn.addEventListener('click', async () => {
  try {
    await fetch('/api/clear', { method: 'POST' });
    messages.innerHTML = `
      <div class="message bot">
        <div class="message-content">
          Hola, soy un chatbot impulsado por Gemini. ¿En qué puedo ayudarte?
        </div>
      </div>
    `;
  } catch (error) {
    console.error('Error al limpiar:', error);
  }
});
