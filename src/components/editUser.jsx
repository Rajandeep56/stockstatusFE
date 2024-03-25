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
    const availablePermissions = [
        "view_users",
        "editupdate_users",
        "view_stock",
        "edit_stock"
    ];
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
    const handleAddPermission = async (permission) => {
        try {
            const updatedPermissions = [...itemDetails.permissions, permission];
            setItemDetails({ ...itemDetails, permissions: updatedPermissions });
        } catch (error) {
            console.error('Error adding permission:', error);
        }
    };
    const handleRemovePermission = async (permission) => {
        try {
            const updatedPermissions = itemDetails.permissions.filter(p => p !== permission);
            setItemDetails({ ...itemDetails, permissions: updatedPermissions });
        } catch (error) {
            console.error('Error removing permission:', error);
        }
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
                <div>
                    <h3>Current Permissions:</h3>
                    <ul>
                        {(Array.isArray(itemDetails.permissions) ? itemDetails.permissions : [itemDetails.permissions]).map(permission => (
                            <li key={permission}>
                                {permission} 
                                <button type="button" onClick={() => handleRemovePermission(permission)}>Remove</button>
                            </li>
                        ))}
                    </ul>

                </div>
                <div>
                    <h3>Available Permissions:</h3>
                    <ul>
                        {availablePermissions.map(permission => (
                            <li key={permission}>
                                {permission} 
                                {!itemDetails.permissions.includes(permission) && (
                                    <button type="button" onClick={() => handleAddPermission(permission)}>Add</button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <label>
                        Enable:
                        <input type="radio" name="status" value="enable" checked={itemDetails.status === 'enable'} onChange={handleInputChange} />
                    </label>
                    <label>
                        Disable:
                        <input type="radio" name="status" value="disable" checked={itemDetails.status === 'disable'} onChange={handleInputChange} />
                    </label>
                </div>
                <button type="submit">Update</button>
            </form>
            {updateClicked && <p>Item details updated successfully.</p>}
            <Link to="/users">Back to User Details</Link>
        </div>
    );
};

export default EditUser;
