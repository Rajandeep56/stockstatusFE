import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import auth from '../services/auth';

const StockList = () => {
    const [stockList, setStockList] = useState([]);
    const token = auth.getToken();
    const authHeader = { headers: { Authorization: `Bearer ${token}` } };

    useEffect(() => {
        if (token) {
            axios.get('https://stockstatus.onrender.com/api/list', authHeader)
                .then(response => {
                    setStockList(response.data);
                })
                .catch(error => {
                    console.log(error);
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
        axios.patch(`https://stockstatus.onrender.com/api/list/${id}`, {quantity: quantity}, authHeader)
            .then(response => {
                console.log('Quantity updated successfully:', response.data);
            })
            .catch(error => {
                console.log('Error updating quantity:', error);
            });
    };
    return (
        <div>
            <h1>Stock List</h1>
            <ul>
                {stockList.map(item => (
                    <li key={item.id}>{item.color} {item.availability} {item.quantity}  
                    <button onClick={() => handleQuantityChange(item.id, parseInt(item.quantity) - 1)}>-</button><Link to={`/stock/${item.id}`}>Details</Link> </li>
                ))}
            </ul>
        </div>
    );
};

export default StockList;
