import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export const Login = () => {

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      identifier: identifier,
      password: password
    };

    fetch('http://localhost:1337/api/auth/local', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        response.json().then(data => {

          Cookies.set('token', data.jwt);
          Cookies.set('username', data.user.username);

          console.log(data.jwt);
        
          navigate('/');
        });
      } else {
        console.error('Login failed');
      }
    });
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        Identifier (Username or Email):
        <input
          type="text"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleLogin}>Login</button>
    </form>
  );
};