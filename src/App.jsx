import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './pages/Home'
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile'
import { Navbar } from './components/Navbar';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { loginStateAtom } from './components/Atoms';
import { Author } from './pages/Author';

function App() {
  const [loginState, setLoginState] = useAtom(loginStateAtom);

  useEffect(() => {
    const cookieInfo = Cookies.get('userInfo')
    if (cookieInfo) {
      const userInfo = JSON.parse(cookieInfo)
      setLoginState({
        isLogged: true,
        token: userInfo.token,
        userId: userInfo.userId,
        username: userInfo.username
      });
    }
  }, []);
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user/:username" element={<Author />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
