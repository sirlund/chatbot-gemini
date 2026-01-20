import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowUp, RotateCcw } from 'lucide-react';
import { Message } from './Message';
import { ThinkingIndicator } from './ThinkingIndicator';
import { cn } from '../lib/utils';

export function Chat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: '¡Hola! Soy un asistente impulsado por Gemini. ¿En qué puedo ayudarte?',
      isUser: false,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [models, setModels] = useState([]);
  const [currentModel, setCurrentModel] = useState('');

  const messagesEndRef = useRef(null);
  const scrollRef = useRef(null);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Load models
  useEffect(() => {
    fetch('/api/models')
      .then((res) => res.json())
      .then((data) => {
        setModels(data.models);
        setCurrentModel(data.current);
      })
      .catch(console.error);
  }, []);

  // Cooldown timer
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isWaiting) {
      setIsWaiting(false);
    }
  }, [cooldown, isWaiting]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading || isWaiting) return;

    const userMessage = {
      id: Date.now(),
      content: input.trim(),
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.content }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages((prev) => [
          ...prev,
          { id: Date.now(), content: data.response, isUser: false },
        ]);
      } else if (response.status === 429) {
        setIsWaiting(true);
        setCooldown(15);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            content: 'Rate limit alcanzado. Espera unos segundos...',
            isUser: false,
            isWarning: true,
          },
        ]);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          content: 'Error al procesar tu mensaje.',
          isUser: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = async () => {
    await fetch('/api/clear', { method: 'POST' });
    setMessages([
      {
        id: Date.now(),
        content: 'Conversación reiniciada. ¿En qué puedo ayudarte?',
        isUser: false,
      },
    ]);
  };

  const changeModel = async (model) => {
    setCurrentModel(model);
    await fetch('/api/models', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model }),
    });
    setMessages([
      {
        id: Date.now(),
        content: `Modelo: **${formatModelName(model)}**`,
        isUser: false,
      },
    ]);
  };

  const formatModelName = (model) => {
    return model.replace('gemini-', '').replace('-preview', '').replace('-001', '');
  };

  return (
    <div className="h-full flex flex-col bg-[#0a0a0a]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex-1 flex flex-col max-w-2xl w-full mx-auto min-h-0"
        style={{
          paddingTop: 'env(safe-area-inset-top)',
          paddingLeft: 'env(safe-area-inset-left)',
          paddingRight: 'env(safe-area-inset-right)',
        }}
      >
        {/* Header */}
        <header className="px-4 py-3 border-b border-white/[0.08] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <h1 className="text-base font-semibold text-white tracking-tight">Chat</h1>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={currentModel}
              onChange={(e) => changeModel(e.target.value)}
              className="bg-transparent border border-white/[0.1] rounded-lg px-2 py-2 text-xs text-white/70 outline-none focus:border-teal-500/50 cursor-pointer max-w-[110px]"
            >
              {models.map((model) => (
                <option key={model} value={model} className="bg-[#0a0a0a]">
                  {formatModelName(model)}
                </option>
              ))}
            </select>

            <button
              onClick={clearChat}
              className="p-2.5 rounded-xl border border-white/[0.1] active:bg-teal-500/10 text-white/50 active:text-teal-400 min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="messages-scroll px-3 py-4 space-y-4"
        >
          {messages.map((msg) => (
            <Message
              key={msg.id}
              content={msg.content}
              isUser={msg.isUser}
              isWarning={msg.isWarning}
            />
          ))}
          {isLoading && <ThinkingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Cooldown */}
        {isWaiting && cooldown > 0 && (
          <div className="px-4 py-2 border-t border-amber-500/20 shrink-0">
            <p className="text-xs text-amber-400/80 text-center">
              Espera {cooldown}s
            </p>
          </div>
        )}

        {/* Input */}
        <div
          className="p-3 border-t border-white/[0.08] shrink-0"
          style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}
        >
          <form onSubmit={sendMessage}>
            <div className="flex gap-2 items-end">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Mensaje..."
                disabled={isLoading || isWaiting}
                enterKeyHint="send"
                autoComplete="off"
                autoCorrect="on"
                autoCapitalize="sentences"
                className={cn(
                  'flex-1 bg-white/[0.05] border border-white/[0.08] rounded-2xl px-4 py-3 text-white text-base placeholder-white/30 outline-none focus:border-teal-500/40',
                  (isLoading || isWaiting) && 'opacity-50'
                )}
              />
              <button
                type="submit"
                disabled={isLoading || isWaiting || !input.trim()}
                className={cn(
                  'p-3 rounded-2xl bg-teal-500 text-white active:bg-teal-600 min-w-[48px] min-h-[48px] flex items-center justify-center',
                  (isLoading || isWaiting || !input.trim()) && 'opacity-30'
                )}
              >
                <ArrowUp className="w-5 h-5" strokeWidth={2.5} />
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
