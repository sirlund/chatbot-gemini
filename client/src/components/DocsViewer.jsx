import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'motion/react';
import { ArrowLeft, FileText } from 'lucide-react';

export function DocsViewer() {
  const { slug } = useParams();
  const [doc, setDoc] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(`/api/docs/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error('Document not found');
        return res.json();
      })
      .then((data) => {
        setDoc(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [slug]);

  if (isLoading) {
    return (
      <div className="docs-viewer">
        <div className="docs-loading">
          <div className="docs-loading-spinner" />
          <span>Loading documentation...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="docs-viewer">
        <div className="docs-error">
          <FileText className="docs-error-icon" />
          <h2>Document not found</h2>
          <p>The document "{slug}" could not be found.</p>
          <Link to="/" className="docs-error-link">
            <ArrowLeft className="docs-error-link-icon" />
            Back to Chat
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="docs-viewer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="docs-header">
        <span className="docs-category">{doc.category}</span>
      </div>
      <article className="docs-content markdown-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{doc.content}</ReactMarkdown>
      </article>
    </motion.div>
  );
}
