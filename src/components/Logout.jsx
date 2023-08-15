import Cookies from 'js-cookie';
import { useAtom } from "jotai";
import { loginStateAtom } from './Atoms';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Logout = () => {
  const navigate = useNavigate();
  const [loginState, setLoginState] = useAtom(loginStateAtom);
  const cadegage = () => {
    Cookies.remove('token');
    Cookies.remove('username');
    Cookies.remove('userInfo');
    setLoginState({
      identifier: '',
      password: '',
      user: null,
      userId: null,
      username: null,
      isLogged: false,
      token: null
    });
    navigate('/');
  }
  return (
    <button onClick={cadegage}>Logout</button>
  );
}