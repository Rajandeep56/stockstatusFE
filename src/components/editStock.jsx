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
    const token = auth.getToken();
    const authheader = { headers: { Authorization: `Bearer ${token}` } };
    useEffect(() => {
        fetchData(id);
    }, [id]);

    const fetchData = async (paramid) => {
        try {
            const response = await axios.get(`https://stockstatus.onrender.com/api/list/${paramid}`, authheader);
            const currentItem = response.data;
            if (currentItem) {
                setItemDetails(currentItem);
            }
        } catch (error) {
            console.error('Error fetching item details:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setItemDetails({ ...itemDetails, [name]: value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`https://stockstatus.onrender.com/api/list/${id}`, itemDetails, authheader);
            setUpdateClicked(true);
        } catch (error) {
            console.error('Error updating item details:', error);
        }
    };

    return (
        <div>
            <h2>Edit Stock Details</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Color:
                    <input type="text" name="color" value={itemDetails.color} onChange={handleInputChange} />
                </label>
                <label>
                    Brand:
                    <input type="text" name="brand" value={itemDetails.brand} onChange={handleInputChange} />
                </label>
                <label>
                    Quantity:
                    <input type="text" name="quantity" value={itemDetails.quantity} onChange={handleInputChange} />
                </label>
                <label>
                    Price Per Unit:
                    <input type="text" name="price_per_unit" value={itemDetails.price_per_unit} onChange={handleInputChange} />
                </label>
                <label>
                    Expiration Date:
                    <input type="text" name="expiration_date" value={itemDetails.expiration_date} onChange={handleInputChange} />
                </label>
                <p>Availability:</p>
                {availability.map(option => (
                    <label key={option}>
                        <input 
                            type="radio" 
                            name="availability" 
                            value={option} 
                            checked={itemDetails.availability === option} 
                            onChange={handleInputChange} 
                        />
                        {option}
                    </label>
                ))}
                <button type="submit">Update</button>
            </form>
            {updateClicked && <p>Item details updated successfully.</p>}
            <Link to="/stock">Back to Stock Details</Link>
        </div>
    );
};

export default EditStockDetails;
