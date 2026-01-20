import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowUp, Sparkles, Sun, Moon, Columns2, Columns3 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const WIDTH_MODES = {
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

export function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [widthMode, setWidthMode] = useState('default');
  const messagesEndRef = useRef(null);

  const cycleWidth = () => {
    const modes = Object.keys(WIDTH_MODES);
    const currentIndex = modes.indexOf(widthMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setWidthMode(modes[nextIndex]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

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
        body: JSON.stringify({ question }),
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
    <div className="h-full flex flex-col bg-[var(--surface-bg)]">
      <div className={`flex-1 flex flex-col ${WIDTH_MODES[widthMode]} w-full mx-auto min-h-0 transition-all duration-300`}>
        {/* Header */}
        <header className="px-4 py-4 border-b border-[var(--stroke-subtle)] shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[var(--accent)] flex items-center justify-center">
                <span className="text-white font-semibold text-sm">M</span>
              </div>
              <div>
                <h1 className="text-base font-semibold text-[var(--content-primary)]">MindSet DS</h1>
                <p className="text-xs text-[var(--content-secondary)]">Design System Documentation</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={cycleWidth}
                className="p-2.5 rounded-lg border border-[var(--stroke-subtle)] hover:bg-[var(--surface-layer)] transition-colors hidden sm:flex items-center gap-1.5"
                title={`Ancho: ${widthMode}`}
              >
                {widthMode === 'compact' || widthMode === 'default' ? (
                  <Columns2 className="w-4 h-4 text-[var(--content-secondary)]" />
                ) : (
                  <Columns3 className="w-4 h-4 text-[var(--content-secondary)]" />
                )}
                <span className="text-xs text-[var(--content-secondary)] capitalize">{widthMode}</span>
              </button>
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2.5 rounded-lg border border-[var(--stroke-subtle)] hover:bg-[var(--surface-layer)] transition-colors"
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-[var(--content-secondary)]" />
                ) : (
                  <Moon className="w-4 h-4 text-[var(--content-secondary)]" />
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-full flex flex-col items-center justify-center"
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
                    className="px-3 py-2 text-xs text-[var(--content-secondary)] bg-[var(--surface-layer)] hover:bg-[var(--surface-layer-strong)] border border-[var(--stroke-subtle)] rounded-lg transition-colors"
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
        <div className="p-4 border-t border-[var(--stroke-subtle)] shrink-0">
          <form onSubmit={handleSubmit}>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pregunta sobre el Design System..."
                disabled={isLoading}
                className="flex-1 bg-[var(--surface-input)] border border-[var(--stroke-subtle)] rounded-xl px-4 py-3 text-[var(--content-primary)] text-sm placeholder-[var(--content-disabled)] outline-none focus:border-[var(--accent)]/50 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-3 rounded-xl bg-[var(--accent)] text-white disabled:opacity-30 hover:brightness-110 transition-all"
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
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
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
