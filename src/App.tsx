import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { VendorsPage } from './pages/VendorsPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vendors/:category" element={<VendorsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;