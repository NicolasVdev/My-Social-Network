import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../utils/authUtils';
import { useNavigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { loginStateAtom } from './Atoms';

export const Navbar = () => {
  const profile = useAtomValue(loginStateAtom);
  // const isLogged = isAuthenticated();
  const navigate = useNavigate();


  const Logout = () => {
    logout();
    navigate('/')
  }
  return (
    <>
      <div className='flex gap-10'>
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        {profile.isLogged ? (
          <>
            <span>Hello, {profile.username} </span>
            <Link to="/profile">Profile</Link>
            <button onClick={Logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </>
  )
}
