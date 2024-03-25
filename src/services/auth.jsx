import axios from 'axios';

const login = async (username, password) => {
    try {
        const response = await axios.post('https://stockstatus.onrender.com/login', { username, password });
        const { token } = response.data;
        sessionStorage.setItem('token', token);
        return token;
    } catch (error) {
        throw error;
    }
};

const logout = () => {
    sessionStorage.removeItem('token');
};

const getToken = () => {
    return sessionStorage.getItem('token');
};

const isAuthenticated = () => {
    return sessionStorage.getItem('token') !== null;
};

export default {
    login,
    logout,getToken,
    isAuthenticated
};