import { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { Hammer, ArrowUp, Copy, Check, Loader2, RotateCcw, Columns2, Rows2, Square } from 'lucide-react';
import { SandpackProvider, SandpackCodeEditor, SandpackPreview, useSandpack } from '@codesandbox/sandpack-react';
import { Panel, Group as PanelGroup, Separator as PanelResizeHandle } from 'react-resizable-panels';

// Component to sync code changes to parent
function CodeSyncer({ onCodeChange }) {
  const { sandpack } = useSandpack();

  useEffect(() => {
    const code = sandpack.files['/App.js']?.code || '';
    onCodeChange(code);
  }, [sandpack.files, onCodeChange]);

  return null;
}

const SUGGESTIONS = [
  'Un botón accent que dice "Hola Mundo"',
  'Tres cards de pricing comparando planes Free, Pro y Team',
  'Una toolbar con IconButtons para bold, italic y underline',
  'Un card con avatar, nombre de usuario y botón de seguir',
];

const DEFAULT_CODE = `export default function App() {
  return (
    <div style={{ padding: '24px' }}>
      <p>Genera un componente para ver el preview</p>
    </div>
  );
}`;

const LAYOUTS = {
  horizontal: { direction: 'horizontal', icon: Columns2, label: 'Side by side' },
  vertical: { direction: 'vertical', icon: Rows2, label: 'Top/bottom' },
  previewOnly: { direction: 'preview', icon: Square, label: 'Preview only' },
};

export function Build() {
  const [components, setComponents] = useState([]);
  const [isLoadingComponents, setIsLoadingComponents] = useState(true);
  const [prompt, setPrompt] = useState(() => {
    return localStorage.getItem('buildPrompt') || '';
  });
  const [code, setCode] = useState(() => {
    return localStorage.getItem('buildCode') || '';
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [layout, setLayout] = useState(() => {
    return localStorage.getItem('buildLayout') || 'horizontal';
  });

  // Persist state to localStorage
  useEffect(() => {
    localStorage.setItem('buildLayout', layout);
  }, [layout]);

  useEffect(() => {
    localStorage.setItem('buildPrompt', prompt);
  }, [prompt]);

  useEffect(() => {
    localStorage.setItem('buildCode', code);
  }, [code]);

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

  const extractCode = (rawCode) => {
    // Extract code from markdown code block if present
    const codeMatch = rawCode.match(/```(?:tsx?|jsx?)?\n([\s\S]*?)```/);
    let cleanCode = codeMatch ? codeMatch[1] : rawCode;

    // Remove TypeScript type/interface definitions (multi-line)
    cleanCode = cleanCode.replace(/^(type|interface)\s+\w+\s*=?\s*\{[^}]*\};?\s*$/gm, '');
    cleanCode = cleanCode.replace(/^(type|interface)\s+\w+\s*=\s*[^;]+;\s*$/gm, '');

    // Separate imports from the rest of the code
    const lines = cleanCode.split('\n');
    const imports = [];
    const rest = [];
    let inTypeBlock = false;
    let braceCount = 0;

    for (const line of lines) {
      const trimmed = line.trim();

      // Track multi-line type/interface blocks
      if (trimmed.startsWith('type ') || trimmed.startsWith('interface ')) {
        inTypeBlock = true;
        braceCount = (line.match(/{/g) || []).length - (line.match(/}/g) || []).length;
        if (braceCount <= 0) inTypeBlock = false;
        continue;
      }

      if (inTypeBlock) {
        braceCount += (line.match(/{/g) || []).length - (line.match(/}/g) || []).length;
        if (braceCount <= 0) inTypeBlock = false;
        continue;
      }

      if (trimmed.startsWith('import ')) {
        // Skip React imports (Sandpack handles these)
        if (!line.includes("from 'react'") && !line.includes('from "react"')) {
          imports.push(line);
        }
      } else {
        rest.push(line);
      }
    }

    let codeBody = rest.join('\n').trim();

    // Remove TypeScript type annotations
    codeBody = codeBody.replace(/:\s*React\.FC\b(<[^>]+>)?/g, '');
    codeBody = codeBody.replace(/:\s*FC\b(<[^>]+>)?/g, '');
    codeBody = codeBody.replace(/:\s*\w+\[\]/g, ''); // array types like : string[]
    codeBody = codeBody.replace(/\s*:\s*\{\s*\w+\s*:\s*\w+\s*(;\s*\w+\s*:\s*\w+\s*)*\}/g, ''); // inline object types

    // Ensure there's an export default
    if (!codeBody.includes('export default')) {
      // Find the main component and add export default
      codeBody = codeBody.replace(/^(const|function)\s+(\w+)/, 'export default $1 $2');
    }

    // Combine imports and code
    const finalCode = [...imports, '', codeBody].join('\n').trim();

    return finalCode;
  };

  const generateCode = async (text) => {
    const userPrompt = text || prompt.trim();
    if (!userPrompt || isGenerating) return;

    setIsGenerating(true);
    setCode('');

    try {
      const response = await fetch('/api/build', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userPrompt, components }),
      });

      const data = await response.json();

      if (response.ok) {
        const cleanCode = extractCode(data.code);
        setCode(cleanCode);
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
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setCode('');
    setPrompt('');
    localStorage.removeItem('buildCode');
    localStorage.removeItem('buildPrompt');
  };

  const handleCodeChange = useCallback((newCode) => {
    if (newCode !== code) {
      setCode(newCode);
    }
  }, [code]);

  const sandpackFiles = {
    '/App.js': code || DEFAULT_CODE,
    '/index.js': `import '@sirlund/mindset-ui/dist/styles.css';
import App from './App';
import { createRoot } from 'react-dom/client';

// Force light mode for consistent rendering
document.documentElement.setAttribute('data-theme', 'light');

const root = createRoot(document.getElementById('root'));
root.render(<App />);`,
  };

  const sandpackOptions = {
    externalResources: [
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
    ],
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
          <div className="flex items-center gap-3">
            {code && (
              <>
                {/* Layout selector */}
                <div className="build-layout-selector">
                  {Object.entries(LAYOUTS).map(([key, { icon: Icon, label }]) => (
                    <button
                      key={key}
                      onClick={() => setLayout(key)}
                      className={`build-layout-btn ${layout === key ? 'active' : ''}`}
                      title={label}
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  ))}
                </div>
                <button onClick={reset} className="build-reset-btn">
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </button>
              </>
            )}
            {!isLoadingComponents && (
              <div className="build-components-count">
                {components.length} componentes
              </div>
            )}
          </div>
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
                Describe lo que necesitas y lo renderizaré usando los componentes del MindSet Design System.
              </p>

              {/* Available components */}
              <div className="build-available-components">
                <span className="text-xs text-[var(--content-secondary)] mb-2">Componentes disponibles:</span>
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
          ) : isGenerating ? (
            <div className="build-loading-full">
              <Loader2 className="w-8 h-8 animate-spin text-[var(--accent)]" />
              <span className="text-[var(--content-secondary)]">Generando componente...</span>
            </div>
          ) : (
            <SandpackProvider
              template="react"
              theme="dark"
              files={sandpackFiles}
              customSetup={{
                dependencies: {
                  '@sirlund/mindset-ui': 'latest',
                  'lucide-react': 'latest',
                },
              }}
              options={sandpackOptions}
            >
              <CodeSyncer onCodeChange={handleCodeChange} />
              {layout === 'previewOnly' ? (
                <div className="build-result build-result-single">
                  <div className="build-preview-panel">
                    <div className="build-panel-header">
                      <span>Preview</span>
                    </div>
                    <SandpackPreview
                      showNavigator={false}
                      showRefreshButton={true}
                      style={{ flex: 1 }}
                    />
                  </div>
                </div>
              ) : (
                <PanelGroup
                  orientation={layout === 'vertical' ? 'vertical' : 'horizontal'}
                  className="build-result"
                >
                  <Panel defaultSize={50} minSize={20} className="build-code-panel">
                    <div className="build-panel-header">
                      <span>Código</span>
                      <button onClick={copyCode} className="build-copy-btn">
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied ? 'Copiado' : 'Copiar'}
                      </button>
                    </div>
                    <SandpackCodeEditor
                      showLineNumbers
                      showTabs={false}
                      style={{ flex: 1 }}
                    />
                  </Panel>
                  <PanelResizeHandle className="build-resize-handle" />
                  <Panel defaultSize={50} minSize={20} className="build-preview-panel">
                    <div className="build-panel-header">
                      <span>Preview</span>
                    </div>
                    <SandpackPreview
                      showNavigator={false}
                      showRefreshButton={true}
                      style={{ flex: 1 }}
                    />
                  </Panel>
                </PanelGroup>
              )}
            </SandpackProvider>
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
