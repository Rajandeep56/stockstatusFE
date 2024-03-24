import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const EditStockDetails = () => {
    const { id } = useParams();
    const [itemDetails, setItemDetails] = useState({
        color: '',
        brand: '',
        quantity: '',
        price_per_unit: '',
        expiration_date: ''
    });
    const [updateClicked, setUpdateClicked] = useState(false);
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImphbmUiLCJpYXQiOjE3MTEzMTMxNTR9.bY2mHQa-e_lltaGtfc_8Cgs9S2EM5yFy9_p4_6vUkIQ';
    const auth = { headers: {Authorization: `Bearer ${token}`}}
    
    useEffect(() => {
        fetchData(id);
    }, [id]);

    const fetchData = async (paramid) => {
        try {
            const response = await axios.get(`http://localhost:8088/api/list/${paramid}`, auth);
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
            await axios.patch(`http://localhost:8088/api/list/${id}`, itemDetails, auth);
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
                <button type="submit">Update</button>
            </form>
            {updateClicked && <p>Item details updated successfully.</p>}
            <Link to="/stock">Back to Stock Details</Link>
        </div>
    );
};

export default EditStockDetails;
