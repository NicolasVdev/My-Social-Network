import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './pages/Home'
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile'
import { Navbar } from './components/Navbar';

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
