import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { loginStateAtom } from './Atoms'; // Assurez-vous de remplacer le chemin avec le bon emplacement de votre atom

export const ListPosts = () => {
  const [posts, setPosts] = useState([]);
  const [postCount, setPostCount] = useState(0);
  const [loginState] = useAtom(loginStateAtom);

  const reloadPostsList = () => {
    const token = loginState.token;

    fetch('http://localhost:1337/api/posts?populate=*', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.meta.pagination.total) {
        setPostCount(data.meta.pagination.total);
      } else {
        console.error('Total count is missing');
      }
      
      if (data.data) {
        setPosts(data.data.map(post => post.attributes));
      } else {
        console.error('Data is missing');
      }
    })
    .catch(error => {
      console.error('Error fetching posts:', error);
    });
  };

  const handleDelete = (postId) => {

    fetch(`http://localhost:1337/api/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${loginState.token}`
      }
    })
    .then(response => {
      console.log(postId)
      if (response.ok) {
        console.log('Post deleted successfully');
        reloadPostsList();
      } else {
        console.error('Failed to delete post');
      }
    })
    .catch(error => {
      console.error('Error deleting post:', error);
    });
  };

  useEffect(() => {
    reloadPostsList();
  }, []);

  return (
    <div>
      <h2>List of Posts</h2>
      <p>Total Posts: {postCount}</p>
      {posts.map(post => (
        <div className='py-3' key={post.id}>
          <p>{post.text}</p>
          <p>Username: {post.user.data.attributes.username}</p>
          <p>Likes: {post.like || 0}</p>
          {post.user.data.id === loginState.userId ? (
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          ) : null}
        </div>
      ))}
    </div>
  );
};
