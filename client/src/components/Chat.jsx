import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUp, Sparkles, Columns2, Columns3, ChevronDown } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MODELS = [
  { id: 'gemini-2.5-flash', label: '2.5-flash' },
  { id: 'gemini-2.5-pro', label: '2.5-pro' },
  { id: 'gemini-2.0-flash-001', label: '2.0-flash' },
  { id: 'gemini-2.0-flash-lite-001', label: '2.0-flash-lite' },
];

const WIDTH_MODES = ['compact', 'default', 'wide', 'full'];
const WIDTH_CLASSES = {
  compact: 'max-w-xl',
  default: 'max-w-2xl',
  wide: 'max-w-4xl',
  full: 'max-w-6xl',
};

const SUGGESTIONS = [
  '¿Cuál es el color de acento principal?',
  '¿Qué espaciado uso entre secciones?',
  '¿Cuál es el radius para botones?',
  '¿Qué tipografía usa el sistema?',
];

const STORAGE_KEY = 'mindset-chat-history';
const MODEL_STORAGE_KEY = 'mindset-chat-model';

export function Chat() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [model, setModel] = useState(() => {
    return localStorage.getItem(MODEL_STORAGE_KEY) || MODELS[0].id;
  });
  const [widthMode, setWidthMode] = useState('default');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const cycleWidth = () => {
    const currentIndex = WIDTH_MODES.indexOf(widthMode);
    const nextIndex = (currentIndex + 1) % WIDTH_MODES.length;
    setWidthMode(WIDTH_MODES[nextIndex]);
  };

  useEffect(() => {
    localStorage.setItem(MODEL_STORAGE_KEY, model);
  }, [model]);

  // Persist messages to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const clearHistory = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const sendMessage = async (text) => {
    const question = text || input.trim();
    if (!question || isLoading) return;

    const userMessage = { id: Date.now(), content: question, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, model }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages((prev) => [
          ...prev,
          { id: Date.now(), content: data.response, isUser: false },
        ]);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), content: 'Error al procesar tu consulta.', isUser: false, isError: true },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div className="chat-container">
      <div className={`chat-inner ${WIDTH_CLASSES[widthMode]} transition-all duration-300`}>
        {/* Toolbar */}
        <div className="chat-toolbar">
          <div className="chat-toolbar-title">
            <span className="chat-toolbar-dot" />
            <span>Chat</span>
          </div>
          <div className="chat-toolbar-actions">
            <button
              onClick={cycleWidth}
              className="chat-toolbar-btn"
              title={`Ancho: ${widthMode}`}
            >
              {widthMode === 'compact' || widthMode === 'default' ? (
                <Columns2 className="w-4 h-4" />
              ) : (
                <Columns3 className="w-4 h-4" />
              )}
              <span className="text-xs capitalize">{widthMode}</span>
            </button>
            <div className="chat-model-select">
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="chat-model-dropdown"
              >
                {MODELS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="chat-model-chevron" />
            </div>
            <button
              onClick={clearHistory}
              className="chat-toolbar-btn"
              title="Reiniciar conversación"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="chat-welcome"
            >
              <Sparkles className="w-8 h-8 text-[var(--accent)] mb-4" />
              <h2 className="text-lg font-medium text-[var(--content-primary)] mb-2">
                Consulta la documentación
              </h2>
              <p className="text-sm text-[var(--content-secondary)] text-center mb-6 max-w-sm">
                Pregunta sobre tokens, colores, espaciado, tipografía y más del MindSet Design System.
              </p>
              <div className="flex flex-wrap gap-2 justify-center max-w-md">
                {SUGGESTIONS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(s)}
                    className="chat-suggestion"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <Message key={msg.id} {...msg} />
              ))}
              {isLoading && <ThinkingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="chat-input-container">
          <form onSubmit={handleSubmit}>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pregunta sobre el Design System..."
                disabled={isLoading}
                className="chat-input"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="chat-submit-btn"
              >
                <ArrowUp className="w-5 h-5" strokeWidth={2.5} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function Message({ content, isUser, isError }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-start gap-3 ${isUser ? 'justify-end' : ''}`}
    >
      {!isUser && (
        <div className="w-7 h-7 rounded-md bg-[var(--accent-light)] flex items-center justify-center text-[var(--accent)] text-xs font-semibold shrink-0">
          M
        </div>
      )}
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-[var(--surface-layer-strong)] text-[var(--content-primary)] rounded-tr-md'
            : isError
            ? 'bg-[var(--feedback-negative-light)] border border-[var(--feedback-negative)]/20 text-[var(--feedback-negative)] rounded-tl-md'
            : 'bg-[var(--surface-layer)] text-[var(--content-primary)] rounded-tl-md'
        }`}
      >
        {isUser ? (
          <p className="text-sm">{content}</p>
        ) : (
          <div className="markdown-content text-sm">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ href, children }) => {
                  // Handle internal links (docs links)
                  if (href?.startsWith('/docs/')) {
                    return (
                      <Link to={href} className="text-[var(--accent)] hover:underline">
                        {children}
                      </Link>
                    );
                  }
                  return (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">
                      {children}
                    </a>
                  );
                },
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function ThinkingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-3"
    >
      <div className="w-7 h-7 rounded-md bg-[var(--accent-light)] flex items-center justify-center text-[var(--accent)] text-xs font-semibold shrink-0">
        M
      </div>
      <div className="bg-[var(--surface-layer)] rounded-2xl rounded-tl-md px-4 py-3">
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
