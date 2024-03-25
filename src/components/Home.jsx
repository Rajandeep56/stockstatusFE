import React from 'react';
import Header from './Header';
import auth from '../services/auth';
import { Navigate ,useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        auth.logout();
        navigate('/login');
    };
  return (
    <div>
        <Header/>
      <h1>Welcome to Paint Storage</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
