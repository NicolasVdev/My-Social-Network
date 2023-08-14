import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

export const Profile = () => {
  const [profileData, setProfileData] = useState('');
  const [editingProfile, setEditingProfile] = useState(false);
  const [updatedUsername, setUpdatedUsername] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const token = Cookies.get('token');

    fetch('http://localhost:1337/api/users/me', {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      setProfileData(data);
      setUserId(data.id);
      console.log(data.id);    
    })
    .catch(error => {
      console.error('Error fetching profile:', error);
    });
  }, []);

  const handleUpdateProfile = () => {
    const token = Cookies.get('token');
  
    const updatedData = {
      username: updatedUsername,
      description: updatedDescription
    };
  
    fetch(`http://localhost:1337/api/users/${userId}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updatedData)
    })
    .then(response => {
      if (response.ok) {
        console.log('Profile updated successfully');
        setProfileData({ ...profileData, username: updatedUsername, description: updatedDescription });
        setEditingProfile(false);
      } else {
        console.error('Profile update failed');
      }
    });
  };

  return (
    <div>
      <h2>Profile</h2>
      {profileData && (
        <div>
          <p>Username: {profileData.username}</p>
          <p>Description: {profileData.description}</p>
          {editingProfile ? (
            <div>
              <input
                type="text"
                placeholder="New Username"
                value={updatedUsername}
                onChange={(e) => setUpdatedUsername(e.target.value)}
              />
              <input
                type="text"
                placeholder="New Description"
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
              />
              <button onClick={handleUpdateProfile}>Update Profile</button>
            </div>
          ) : (
            <button onClick={() => setEditingProfile(true)}>Edit My Profile</button>
          )}
        </div>
      )}
    </div>
  );
};
