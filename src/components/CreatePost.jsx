import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useAtom } from 'jotai';
import { profileAtom } from './Atoms';

export const CreatePost = () => {
  const [newPostText, setNewPostText] = useState('');
  const [profile] = useAtom(profileAtom);
  const userId = profile.userId;
  console.log(profile);

  const handleCreatePost = () => {
    const token = Cookies.get('token');
    if (!token) {
      console.error('JWT token missing');
      return;
    }

    const data = {
      text: newPostText,
      user: userId
    };

    fetch('http://localhost:1337/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        console.log('Post created successfully');
        setNewPostText('');
      } else {
        console.error('Failed to create post');
      }
    })
    .catch(error => {
      console.error('Error creating post:', error);
    });
  };

  return (
    <div>
      <h2>Create a post</h2>
      <textarea
        value={newPostText}
        onChange={(e) => setNewPostText(e.target.value)}
        placeholder="Write your post..."
      />
      <button onClick={handleCreatePost}>Submit</button>
    </div>
  );
};