import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
const StockList = () => {
    const [stockList, setStockList] = useState([]);
    //temp setup for auth
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImphbmUiLCJpYXQiOjE3MTEzMTMxNTR9.bY2mHQa-e_lltaGtfc_8Cgs9S2EM5yFy9_p4_6vUkIQ';
    const auth = { headers: {Authorization: `Bearer ${token}`}}
    useEffect(() => {
        axios.get('http://localhost:8088/api/list',auth).then(response => {
            setStockList(response.data);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    return (
        <div>
            <h1>Stock List</h1>
            <ul>
                {stockList.map(item => (
                    <li key={item.id}>{item.brand} {item.price_per_unit} {item.expiration_date} {item.quantity}</li>
                    
                ))}
            </ul>
        </div>
    );
};

export default StockList;
