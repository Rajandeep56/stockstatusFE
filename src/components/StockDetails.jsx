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
    const [errorMessage, setErrorMessage] = useState('');
    const { id } = useParams();

    useEffect(() => {
        fetchData(id);
    }, [id]);

    const token = auth.getToken();
    const authHeader = { headers: { Authorization: `Bearer ${token}` } };

    const fetchData = async (paramId) => {
        try {
            const response = await axios.get(`https://stockstatus.onrender.com/api/list/${paramId}`, authHeader);
            const currentItem = response.data;
            setItemDetails(currentItem);
        } catch (error) {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                setErrorMessage('You are not authorized for this operation.');
            } else {
                console.error('Error fetching item details:', error);
            }
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Stock Details</h2>
            {errorMessage && (
                <div style={{ backgroundColor: '#ffcccc', color: '#ff0000', padding: '10px', borderRadius: '5px', marginBottom: '20px' }}>
                    {errorMessage}
                </div>
            )}
            <p>Color: {itemDetails.color}</p>
            <p>Brand: {itemDetails.brand}</p>
            <p>Quantity: {itemDetails.quantity}</p>
            <p>Price Per Unit: {itemDetails.price_per_unit}</p>
            <p>Expiration Date: {itemDetails.expiration_date}</p>
            <p>Availablity: {itemDetails.availability}</p>
            <Link to={`/stock/${id}/edit`} style={{ marginRight: '10px' }}>Edit</Link>
            <Link to={`/stock`}>Back</Link>
        </div>
    );
};

export default StockDetails;
