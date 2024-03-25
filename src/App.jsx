import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Stock from './pages/Stock/Stock';
import Users from './pages/Users/Users';
import StockDetails from './components/StockDetails';
import EditStockDetails from './components/editStock';
import EditUser from './components/editUser';
import Login from './components/Login';
import Home from './components/Home';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/stock/:id" element={<StockDetails />} />
        <Route path="/stock/:id/edit" element={<EditStockDetails />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id/edit" element={<EditUser />} />
      </Routes>
    </Router>
  );
}

export default App;
