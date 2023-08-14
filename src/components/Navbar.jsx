import React from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated, logout } from '../utils/authUtils';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const username = Cookies.get('username');
  console.log(username)
  const isLogged = isAuthenticated();
  console.log(isLogged);

  const navigate = useNavigate();

  const Logout = () => {
    logout();
    navigate('/')
  }
  return (
    <>
       <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      {isLogged ? (
        <>
          <span>Hello, {username}</span>
          <Link to="/profile">Profile</Link>
          <button onClick={Logout}>Logout</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </>
  )
}
