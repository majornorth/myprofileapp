import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = ({ userId }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get(`/user/${userId}`)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => console.error('Error fetching user data:', error));
              
    }, [userId]);

    const handleUpdateProfile = (updatedData) => {
        axios.put(`/user/${userId}`, updatedData)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => console.error('Error updating profile:', error));
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <h1>User Profile</h1>
            <p>Username: {user.username}</p>
            <p>Bio: {user.bio}</p>
            {/* Add form or inputs to update profile here */}
            {/* Implement the upload/delete photo functionality */}
        </div>
    );
};

export default UserProfile;
