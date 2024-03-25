import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import auth from '../services/auth';

const StockDetails = () => {
    const [itemDetails, setItemDetails] = useState({
        color: '',
        brand: '',
        quantity: '',
        price_per_unit: '',
        expiration_date: '',
        availability: ''
    });
    
    const { id } = useParams();

    useEffect(() => {
        fetchData(id);
    }, [id]);
    const token = auth.getToken();
    const authheader = { headers: { Authorization: `Bearer ${token}` } };
    const fetchData = async (paramId) => {
        try {
            const response = await axios.get(`https://stockstatus.onrender.com/api/list/${paramId}`,authheader);
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
            <p>Availablity: {itemDetails.availability}</p>
            <Link to={`/stock/${id}/edit`}>Edit</Link>
            <Link to={`/stock`}>Back</Link>
        </div>
    );
};

export default StockDetails;
