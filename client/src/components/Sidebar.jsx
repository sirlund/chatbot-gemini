import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { MessageSquare, FileText, Sun, Moon } from 'lucide-react';

export function Sidebar({ isDark, onToggleTheme }) {
  const [docs, setDocs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/docs')
      .then((res) => res.json())
      .then((data) => {
        setDocs(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error loading docs:', err);
        setIsLoading(false);
      });
  }, []);

  // Group docs by category
  const groupedDocs = docs.reduce((acc, doc) => {
    if (!acc[doc.category]) acc[doc.category] = [];
    acc[doc.category].push(doc);
    return acc;
  }, {});

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">M</div>
          <div className="sidebar-logo-text">
            <span className="sidebar-logo-title">MindSet DS</span>
            <span className="sidebar-logo-subtitle">Documentation</span>
          </div>
        </div>
        <button
          onClick={onToggleTheme}
          className="sidebar-theme-toggle"
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </button>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/"
          className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
          end
        >
          <MessageSquare className="sidebar-item-icon" />
          <span>Chat Assistant</span>
        </NavLink>

        {isLoading ? (
          <div className="sidebar-loading">Loading...</div>
        ) : (
          Object.entries(groupedDocs).map(([category, categoryDocs]) => (
            <div key={category} className="sidebar-section">
              <h3 className="sidebar-section-title">{category}</h3>
              {categoryDocs.map((doc) => (
                <NavLink
                  key={doc.slug}
                  to={`/docs/${doc.slug}`}
                  className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
                >
                  <FileText className="sidebar-item-icon" />
                  <span>{doc.title}</span>
                </NavLink>
              ))}
            </div>
          ))
        )}
      </nav>
    </aside>
  );
}
