import React, { useState, useContext } from 'react';
import API from '../api';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  async function handle(e){
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', { username, email, password });
      login(res.data.token, res.data.user);
      navigate('/');
    } catch (error) {
      setErr(error?.response?.data?.error || error.message);
    }
  }

  return (
    <div className="container" style={{padding:24}}>
      <h2>Register</h2>
      {err && <div style={{color:'red'}}>{err}</div>}
      <form onSubmit={handle} style={{maxWidth:480}}>
        <label>Username</label><input value={username} onChange={e=>setUsername(e.target.value)} required />
        <label>Email</label><input value={email} onChange={e=>setEmail(e.target.value)} required />
        <label>Password</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
