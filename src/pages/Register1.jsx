import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export const Register = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleRegistration = (e) => {
    e.preventDefault();
    const data = {
      username: username,
      email: email,
      password: password
    };
    
    fetch('http://localhost:1337/api/auth/local/register', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        response.json().then(data => {
          const token = data.token;
          const dataUsername = data.user.username;
          Cookies.set('token', token);
          Cookies.set('username', dataUsername)
          console.log(token);
          console.log(data);
          navigate('/')
        })
      } else {
        console.error('Registration failed');
      }
    })
  };
  return (
    <div>
      <h2>Registration Form</h2>
      <input type="text"
      placeholder='Username'
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      />
      <input type="text"
      placeholder='Email'
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      />
      <input type="text"
      placeholder='Password'
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegistration}>Register</button>
    </div>
  )
};
