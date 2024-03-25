import React from 'react';
import Header from './Header';
import auth from '../services/auth';
import { Navigate, useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        auth.logout();
        navigate('/login');
    };

    // Check if the user is authenticated
    const isAuthenticated = auth.isAuthenticated();

    return (
        <div>
            <Header />
            {isAuthenticated ? (
                <>
                    <h1>Welcome to Paint Storage</h1>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <div>
                    <h1>You are not authenticated</h1>
                    <p>Please use one of the following credentials to log in:</p>
                    <ul>
                        <li>Username: john, Password: password1</li>
                        <li>Username: jane, Password: password2</li>
                        <li>Username: rajan, Password: password3</li>
                        <li>Username: adam, Password: password4</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Home;
