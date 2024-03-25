import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import auth from '../services/auth';

const EditStockDetails = () => {
    const { id } = useParams();
    const [itemDetails, setItemDetails] = useState({
        color: '',
        brand: '',
        quantity: '',
        price_per_unit: '',
        expiration_date: ''
    });
    const availability = [
        "available",
        "out of stock",
        "running low"
    ];
    const [updateClicked, setUpdateClicked] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const token = auth.getToken();
    const authHeader = { headers: { Authorization: `Bearer ${token}` } };

    useEffect(() => {
        fetchData(id);
    }, [id]);

    const fetchData = async (paramid) => {
        try {
            const response = await axios.get(`https://stockstatus.onrender.com/api/list/${paramid}`, authHeader);
            const currentItem = response.data;
            if (currentItem) {
                setItemDetails(currentItem);
            }
        } catch (error) {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                setErrorMessage('You are not authorized for this operation.');
            } else {
                console.error('Error fetching item details:', error);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setItemDetails({ ...itemDetails, [name]: value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`https://stockstatus.onrender.com/api/list/${id}`, itemDetails, authHeader);
            setUpdateClicked(true);
        } catch (error) {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                setErrorMessage('You are not authorized for this operation.');
            } else {
                console.error('Error updating item details:', error);
            }
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Edit Stock Details</h2>
            <form onSubmit={handleSubmit}>
                <label style={{ marginBottom: '10px', display: 'block' }}>
                    Color:
                    <input type="text" name="color" value={itemDetails.color} onChange={handleInputChange} style={{ marginBottom: '10px' }} />
                </label>
                <label style={{ marginBottom: '10px', display: 'block' }}>
                    Brand:
                    <input type="text" name="brand" value={itemDetails.brand} onChange={handleInputChange} style={{ marginBottom: '10px' }} />
                </label>
                <label style={{ marginBottom: '10px', display: 'block' }}>
                    Quantity:
                    <input type="text" name="quantity" value={itemDetails.quantity} onChange={handleInputChange} style={{ marginBottom: '10px' }} />
                </label>
                <label style={{ marginBottom: '10px', display: 'block' }}>
                    Price Per Unit:
                    <input type="text" name="price_per_unit" value={itemDetails.price_per_unit} onChange={handleInputChange} style={{ marginBottom: '10px' }} />
                </label>
                <label style={{ marginBottom: '10px', display: 'block' }}>
                    Expiration Date:
                    <input type="text" name="expiration_date" value={itemDetails.expiration_date} onChange={handleInputChange} style={{ marginBottom: '10px' }} />
                </label>
                <p>Availability:</p>
                {availability.map(option => (
                    <label key={option} style={{ marginBottom: '10px', display: 'block' }}>
                        <input 
                            type="radio" 
                            name="availability" 
                            value={option} 
                            checked={itemDetails.availability === option} 
                            onChange={handleInputChange} 
                            style={{ marginBottom: '10px' }} 
                        />
                        {option}
                    </label>
                ))}
                <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', padding: '8px 16px', borderRadius: '4px', marginTop: '10px' }}>Update</button>
            </form>
            {errorMessage && (
                <p style={{ color: '#ff0000', marginTop: '10px' }}>{errorMessage}</p>
            )}
            {updateClicked && <p>Item details updated successfully.</p>}
            <Link to="/stock" style={{ display: 'block', marginTop: '20px', color: '#007bff', textDecoration: 'none' }}>Back to Stock Details</Link>
        </div>
    );
};

export default EditStockDetails;
