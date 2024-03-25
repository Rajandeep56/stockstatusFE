import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import auth from '../services/auth';

const StockList = () => {
    const [stockList, setStockList] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const token = auth.getToken();
    const authHeader = { headers: { Authorization: `Bearer ${token}` } };

    useEffect(() => {
        if (token) {
            axios.get('https://stockstatus.onrender.com/api/list', authHeader)
                .then(response => {
                    setStockList(response.data);
                })
                .catch(error => {
                    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                        setErrorMessage('You are not authorized for this operation.');
                    } else {
                        console.log(error);
                    }
                });
        }
    }, [token]);

    const handleQuantityChange = (id, quantity) => {
        const newStockList = stockList.map(item => {
            if (item.id === id) {
                return { ...item, quantity: quantity };
            }
            return item;
        });
        setStockList(newStockList);
        axios.patch(`https://stockstatus.onrender.com/api/list/${id}`, { quantity: quantity }, authHeader)
            .then(response => {
                console.log('Quantity updated successfully:', response.data);
            })
            .catch(error => {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    setErrorMessage('You are not authorized for this operation.');
                } else {
                    console.log('Error updating quantity:', error);
                }
            });
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Stock List</h1>
            {errorMessage && (
                <div style={{ backgroundColor: '#ffcccc', color: '#ff0000', padding: '10px', borderRadius: '5px', marginBottom: '20px' }}>
                    {errorMessage}
                </div>
            )}
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {stockList.map(item => (
                    <li key={item.id} style={{ backgroundColor: '#f3f3f3', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <p style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>{item.color}</p>
                                <p style={{ color: '#666' }}>{item.availability}</p>
                            </div>
                            <div>
                                <p style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>{item.quantity}</p>
                            </div>
                            <div>
                                <button style={{ backgroundColor: '#007bff', color: '#fff', padding: '8px 16px', borderRadius: '4px', marginRight: '8px' }} onClick={() => handleQuantityChange(item.id, parseInt(item.quantity) - 1)}>-</button>
                                <Link to={`/stock/${item.id}`} style={{ color: '#007bff', textDecoration: 'none' }}>Details</Link>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StockList;
