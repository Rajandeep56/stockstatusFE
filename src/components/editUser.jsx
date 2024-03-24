import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const EditUser = () => {
    const { id } = useParams();
    const [itemDetails, setItemDetails] = useState({
        permissions: []
    });
    const [updateClicked, setUpdateClicked] = useState(false);
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkYW0iLCJpYXQiOjE3MTEzMjA2NTJ9.LkmcOEHIi8i1Ppm-iOs38ysiKYyGw_CSOwo1yUij82M';
    const auth = { headers: {Authorization: `Bearer ${token}`}}
    
    useEffect(() => {
        fetchData(id);
    }, [id]);

    const fetchData = async (paramid) => {
        try {
            const response = await axios.get(`http://localhost:8088/api/users/${paramid}`, auth);
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
            await axios.patch(`http://localhost:8088/api/users/${id}`, itemDetails, auth);
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
                    Permissions:
                    <input type="text" name="permissions" value={itemDetails.permissions} onChange={handleInputChange} />
                </label>
                <button type="submit">Update</button>
            </form>
            {updateClicked && <p>Item details updated successfully.</p>}
            <Link to="/users">Back to User Details</Link>
        </div>
    );
};

export default EditUser;
