import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Hammer, ArrowUp, Copy, Check, ExternalLink, Loader2 } from 'lucide-react';

const STORYBOOK_URL = 'https://sirlund.github.io/mindset-design-system';

const SUGGESTIONS = [
  'Un formulario de login con inputs y botón primario',
  'Una card de pricing con título, precio y features',
  'Una toolbar con IconButtons para edición de texto',
  'Un header con logo, navegación y botón de acción',
];

export function Build() {
  const [components, setComponents] = useState([]);
  const [isLoadingComponents, setIsLoadingComponents] = useState(true);
  const [prompt, setPrompt] = useState('');
  const [code, setCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

  useEffect(() => {
    fetch('/api/storybook/components')
      .then((res) => res.json())
      .then((data) => {
        setComponents(data.components || []);
        setIsLoadingComponents(false);
      })
      .catch((err) => {
        console.error('Error loading components:', err);
        setIsLoadingComponents(false);
      });
  }, []);

  const generateCode = async (text) => {
    const userPrompt = text || prompt.trim();
    if (!userPrompt || isGenerating) return;

    setIsGenerating(true);
    setCode('');
    setSelectedStory(null);

    try {
      const response = await fetch('/api/build', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userPrompt, components }),
      });

      const data = await response.json();

      if (response.ok) {
        setCode(data.code);
        // Try to find a relevant story to preview
        const relevantComponent = components.find((c) =>
          userPrompt.toLowerCase().includes(c.name.toLowerCase())
        );
        if (relevantComponent?.stories[0]) {
          setSelectedStory(relevantComponent.stories[0]);
        }
      } else {
        setCode(`// Error: ${data.error}`);
      }
    } catch (error) {
      setCode('// Error al generar código');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generateCode();
  };

  const copyCode = () => {
    // Extract code from markdown code block
    const codeMatch = code.match(/```(?:tsx?|jsx?)?\n([\s\S]*?)```/);
    const cleanCode = codeMatch ? codeMatch[1] : code;
    navigator.clipboard.writeText(cleanCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStoryUrl = (storyId) => {
    return `${STORYBOOK_URL}/?path=/story/${storyId}`;
  };

  return (
    <div className="build-container">
      <div className="build-inner">
        {/* Header */}
        <div className="build-header">
          <div className="build-header-title">
            <Hammer className="w-5 h-5 text-[var(--accent)]" />
            <span>Build Mode</span>
            <span className="build-badge">Beta</span>
          </div>
          {!isLoadingComponents && (
            <div className="build-components-count">
              {components.length} componentes disponibles
            </div>
          )}
        </div>

        {/* Main content */}
        <div className="build-content">
          {!code && !isGenerating ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="build-welcome"
            >
              <Hammer className="w-8 h-8 text-[var(--accent)] mb-4" />
              <h2 className="text-lg font-medium text-[var(--content-primary)] mb-2">
                Genera componentes React
              </h2>
              <p className="text-sm text-[var(--content-secondary)] text-center mb-6 max-w-sm">
                Describe lo que necesitas y generaré código usando los componentes del MindSet Design System.
              </p>

              {/* Available components */}
              <div className="build-available-components">
                <span className="text-xs text-[var(--content-tertiary)] mb-2">Componentes disponibles:</span>
                <div className="flex flex-wrap gap-1 justify-center">
                  {components.map((c) => (
                    <span key={c.name} className="build-component-tag">
                      {c.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Suggestions */}
              <div className="flex flex-wrap gap-2 justify-center max-w-lg mt-6">
                {SUGGESTIONS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setPrompt(s);
                      generateCode(s);
                    }}
                    className="build-suggestion"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="build-result">
              {/* Code panel */}
              <div className="build-code-panel">
                <div className="build-panel-header">
                  <span>Código generado</span>
                  <button onClick={copyCode} className="build-copy-btn">
                    {copied ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    {copied ? 'Copiado' : 'Copiar'}
                  </button>
                </div>
                <div className="build-code-content">
                  {isGenerating ? (
                    <div className="build-loading">
                      <Loader2 className="w-6 h-6 animate-spin text-[var(--accent)]" />
                      <span>Generando código...</span>
                    </div>
                  ) : (
                    <pre className="build-code">
                      <code>{code}</code>
                    </pre>
                  )}
                </div>
              </div>

              {/* Preview panel */}
              <div className="build-preview-panel">
                <div className="build-panel-header">
                  <span>Preview (Storybook)</span>
                  {selectedStory && (
                    <a
                      href={getStoryUrl(selectedStory.id)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="build-external-link"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Abrir en Storybook
                    </a>
                  )}
                </div>
                <div className="build-preview-content">
                  {selectedStory ? (
                    <iframe
                      src={`${STORYBOOK_URL}/iframe.html?id=${selectedStory.id}&viewMode=story`}
                      title="Storybook Preview"
                      className="build-iframe"
                    />
                  ) : (
                    <div className="build-no-preview">
                      <p className="text-sm text-[var(--content-secondary)]">
                        Selecciona un componente para ver el preview
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {components.slice(0, 4).map((c) => (
                          <button
                            key={c.name}
                            onClick={() => setSelectedStory(c.stories[0])}
                            className="build-preview-btn"
                          >
                            {c.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="build-input-container">
          <form onSubmit={handleSubmit}>
            <div className="flex gap-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe el componente que necesitas..."
                disabled={isGenerating}
                className="build-input"
              />
              <button
                type="submit"
                disabled={isGenerating || !prompt.trim()}
                className="build-submit-btn"
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
