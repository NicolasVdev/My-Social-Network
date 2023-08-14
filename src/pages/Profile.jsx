import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import Cookies from 'js-cookie';
import { profileAtom } from '../components/Atoms';
import { EditProfile } from '../components/EditProfile';

export const Profile = () => {
  const [profileData] = useAtom(profileAtom);

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
    })
    .catch(error => {
      console.error('Error fetching profile:', error);
    });
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      {profileData && (
        <div>
          <p>Username: {profileData.username}</p>
          <p>Description: {profileData.description}</p>
          <EditProfile profileData={profileData} />
        </div>
      )}
    </div>
  );
};
