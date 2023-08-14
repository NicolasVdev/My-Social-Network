import React from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { atom, useAtom } from 'jotai';

export const loginStateAtom = atom({
  identifier: '',
  password: '',
});

export const Login = () => {

  const [loginState, setLoginState] = useAtom(loginStateAtom);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      identifier: loginState.identifier,
      password: loginState.password
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
          value={loginState.identifier}
          onChange={(e) => setLoginState({ ...loginState, identifier: e.target.value })}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={loginState.password}
          onChange={(e) => setLoginState({ ...loginState, password: e.target.value })}
        />
      </label>
      <br />
      <button onClick={handleLogin}>Login</button>
    </form>
  );
};