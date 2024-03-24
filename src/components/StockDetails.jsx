import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 
import { Link } from 'react-router-dom';


const StockDetails = () => {
    const [itemDetails, setItemDetails] = useState({
        color: '',
        brand: '',
        quantity: '',
        price_per_unit: '',
        expiration_date: ''
    });

    const { id } = useParams();

    useEffect(() => {
        fetchData(id);
    }, [id]);
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImphbmUiLCJpYXQiOjE3MTEzMTMxNTR9.bY2mHQa-e_lltaGtfc_8Cgs9S2EM5yFy9_p4_6vUkIQ';
    const auth = { headers: {Authorization: `Bearer ${token}`}}
    const fetchData = async (paramId) => {
        try {
            const response = await axios.get(`http://localhost:8088/api/list/${paramId}`,auth);
            const currentItem = response.data;
            setItemDetails(currentItem);
        } catch (error) {
            console.error('Error fetching item details:', error);
        }
    };

    return (
        <div>
            <h2>Stock Details</h2>
            <p>Color: {itemDetails.color}</p>
            <p>Brand: {itemDetails.brand}</p>
            <p>Quantity: {itemDetails.quantity}</p>
            <p>Price Per Unit: {itemDetails.price_per_unit}</p>
            <p>Expiration Date: {itemDetails.expiration_date}</p>
            <Link to={`/stock/${id}/edit`}>Edit</Link>
        </div>
    );
};

export default StockDetails;
