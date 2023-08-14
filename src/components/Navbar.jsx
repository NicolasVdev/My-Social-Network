import React from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated, logout } from '../utils/authUtils';
import { useNavigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { profileAtom } from './Atoms';

export const Navbar = () => {
  const profile = useAtomValue(profileAtom);
  const isLogged = isAuthenticated();
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
          <span>Hello, {profile.username} </span>
          <Link to="/profile">Profile</Link>
          <button onClick={Logout}>Logout</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </>
  )
}
