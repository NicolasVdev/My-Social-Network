import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

export const Author = () => {
  const { username } = useParams();
  const [authorInfos, setAuthorInfos] = useState([]);
  const [authorPosts, setAuthorPosts] = useState([]);

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      console.error('token missing')
      return;
    }

  fetch(`http://localhost:1337/api/users/?filters[username][$eq]=${username}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setAuthorInfos(data[0]);
    })
    .catch(error => {
      console.error('Error fetching author info:', error);
    });

    fetch(`http://localhost:1337/api/posts?user.id=${username}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.data) {
        setAuthorPosts(data.data.map(post => post.attributes));
      } else {
        console.error('Data is missing');
      }
    })
    .catch(error => {
      console.error('Error fetching author posts:', error);
    });
  }, []);
  return (
    <div>
      {authorInfos && (
        <div className='py-3'>
          <h2 className='text-2xl font-bold'>{authorInfos.username}'s Profile</h2>
          <p>Description: {authorInfos.description}</p>
        </div>
      )}
      <h2 className='text-2xl font-bold'>{username}'s Posts</h2>
      {authorPosts.map(post => (
        <div key={post.id}>
          <p>{post.text}</p>
        </div>
      ))}
    </div>
  )
}
