import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Stock from './pages/Stock/Stock';
import StockDetails from './components/StockDetails';
import EditStockDetails from './components/editStock';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/stock" element={<Stock />} />
        <Route path="/stock/:id" element={<StockDetails />} />
        <Route path="/stock/:id/edit" element={<EditStockDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
