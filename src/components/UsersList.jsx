import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UsersList = () => {
    const [userList, setUserList] = useState([]);
    //temp setup for auth
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkYW0iLCJpYXQiOjE3MTEzMTk1OTh9.tSy8ivUifBue2sV3r8gp49WhT7p-6vUOsjIkI_MyenA';
    const auth = { headers: {Authorization: `Bearer ${token}`}}
    useEffect(() => {
        axios.get('http://localhost:8088/api/users/',auth).then(response => {
            setUserList(response.data);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {userList.map(item => (
                    <li key={item.id}>{item.username} {item.name} {item.age} {item.role} {item.permissions}<Link to={`/users/${item.id}/edit`}>Details</Link> </li>
                ))}
            </ul>

        </div>
    );
};

export default UsersList;
