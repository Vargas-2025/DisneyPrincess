// Root application.
// Set up React Router
// NavBar and Footer are outside <Routes> so they persist across all pages

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Global Bootstrap styles

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CollectionPage from './pages/CollectionPage';
import AddPrincessPage from './pages/AddPrincessPage';
import EditPrincessPage from './pages/EditPrincessPage';

export default function App() {
  return (
    // BrowserRouter enables client-side routing 
    <BrowserRouter>
      {/* NavBar is outside <Routes> so it persists across all pages */}
      <NavBar />

      {/* main wraps all page content and grows to fill (flexbox in index.css) */}
      <main>
        <Routes>
          {/* Page 1 — Landing page */}
          <Route path="/" element={<HomePage />} />

          {/* Page 2 — Full collection with Read and Delete */}
          <Route path="/collection" element={<CollectionPage />} />

          {/* Page 3 — Add a new princess (Create) */}
          <Route path="/add" element={<AddPrincessPage />} />

          {/* Page 4 — Edit an existing princess (Update); :id matches the MockAPI id */}
          <Route path="/edit/:id" element={<EditPrincessPage />} />
        </Routes>
      </main>

      {/* Footer is outside <Routes> so it persists across all pages */}
      <Footer />
    </BrowserRouter>
  );
}
