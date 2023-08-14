import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { profileAtom } from './Atoms'

export const EditProfile = ({ profileData }) => {
  const [profile, setProfile] = useAtom(profileAtom);
  const [editingProfile, setEditingProfile] = useState(false);
  const [updatedUsername, setUpdatedUsername] = useState(profileData.username);
  const [updatedDescription, setUpdatedDescription] = useState(profileData.description);

  const handleUpdateProfile = () => {
    setProfile({ ...profile, username: updatedUsername, description: updatedDescription });
    setEditingProfile(false);
  };

  return (
    <div>
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
  );
};
