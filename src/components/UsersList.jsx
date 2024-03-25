import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../services/auth';

const UsersList = () => {
    const [userList, setUserList] = useState([]);
    const [error, setError] = useState(null);

    const token = auth.getToken();
    const authheader = { headers: { Authorization: `Bearer ${token}` } };
    useEffect(() => {
        axios.get('https://stockstatus.onrender.com/api/users/',authheader).then(response => {
            setUserList(response.data);
        }).catch(error => {
            console.log(error);
            setError(error);
        });
    }, []);
    if (error && error.response && error.response.status === 403) {
        return <div>You don't have permission to view the user list.
            <Link to={`/`}>Back</Link>
        </div>;
    }

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {userList.map(item => (
                    <li key={item.id}>{item.username} {item.name} {item.age} {item.role} {item.permissions}<Link to={`/users/${item.id}/edit`}>Details</Link> </li>
                ))}
            </ul>
            <Link to={`/`}>Back</Link>

        </div>
    );
};

export default UsersList;
