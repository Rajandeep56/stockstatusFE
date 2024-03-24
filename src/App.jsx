import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Stock from './pages/Stock/Stock';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/stock" element={<Stock />} />
      </Routes>
    </Router>
  );
}

export default App;
