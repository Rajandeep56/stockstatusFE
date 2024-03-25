import React, { useState } from 'react';
import auth from '../services/auth';
import { Navigate ,useNavigate } from 'react-router-dom';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    if (auth.isAuthenticated()) {
        return <Navigate to="/" />;
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const token = await auth.login(username, password);
            console.log('Logged in successfully. Token:', token);
            navigate('/')
                } catch (error) {
            setError('Invalid username or password');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <button type="submit">Login</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default Login;
