import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Chat } from './components/Chat';
import { DocsViewer } from './components/DocsViewer';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Chat />} />
          <Route path="docs/:slug" element={<DocsViewer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
