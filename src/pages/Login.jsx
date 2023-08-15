import React from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useAtom, useSetAtom } from 'jotai';
import { loginStateAtom } from '../components/Atoms';


export const Login = () => {

  const [loginState, setLoginState] = useAtom(loginStateAtom);
  const setProfile = useSetAtom(loginStateAtom);
  
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
          const userInfo = {
            token: data.jwt,
            username: data.user.username,
            userId: data.user.id
          };
          Cookies.set('userInfo', JSON.stringify(userInfo))
          Cookies.set('token', data.jwt);
          Cookies.set('username', data.user.username);
          const dataUser = data.user;
          console.log(data.jwt);
          setProfile({user: dataUser, userId: dataUser.id, username: dataUser.username, isLogged: true, token: data.jwt});
          
        
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