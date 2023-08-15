import React from 'react'
import { Link } from 'react-router-dom'
import { Logout } from './Logout';
import { useAtomValue } from 'jotai';
import { loginStateAtom } from './Atoms';

export const Navbar = () => {
  const profile = useAtomValue(loginStateAtom);

  return (
    <>
      <div className='flex gap-10'>
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        {profile.isLogged ? (
          <>
            <span>Hello, {profile.username} </span>
            <Link to="/profile">Profile</Link>
            <Logout/>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </>
  )
}
