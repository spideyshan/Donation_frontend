import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Donate from './pages/Donate';
import Transparency from './pages/Transparency';
import Login from './pages/Login';
import Register from './pages/Register';
import MyDonations from './pages/MyDonations';
import AdminDonations from './pages/AdminDonations';
import ProtectedRoute from './components/ProtectedRoute';

export default function App(){
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/donate" element={<Donate/>} />
        <Route path="/transparency" element={<Transparency/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/my" element={<ProtectedRoute><MyDonations/></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminDonations/></ProtectedRoute>} />
      </Routes>
    </div>
  );
}
