import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import auth from '../services/auth';

const StockList = () => {
    const [stockList, setStockList] = useState([]);
    const token = auth.getToken();
    console.log(token);
    const authheader = { headers: { Authorization: `Bearer ${token}` } };

    useEffect(() => {
        if (token) {
            axios.get('http://localhost:8088/api/list', authheader)
                .then(response => {
                    setStockList(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [token]);

   
    return (
        <div>
            <h1>Stock List</h1>
            <ul>
                {stockList.map(item => (
                    <li key={item.id}>{item.color} {item.quantity} <Link to={`/stock/${item.id}`}>Details</Link></li>
                ))}
            </ul>
        </div>
    );
};

export default StockList;
