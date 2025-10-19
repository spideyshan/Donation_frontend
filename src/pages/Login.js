import React, { useState, useContext } from 'react';
import API from '../api';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  async function handle(e) {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      login(res.data.token, res.data.user);
      navigate('/');
    } catch (error) {
      const serverMsg =
        error?.response?.data?.error || error?.response?.data || error.message;
      console.error('Login error full:', error);
      setErr(typeof serverMsg === 'string' ? serverMsg : JSON.stringify(serverMsg));
    }
  }

  return (
    <div className="container" style={{ padding: 24 }}>
      <h2>Login</h2>
      {err && <div style={{ color: 'red' }}>{err}</div>}
      <form onSubmit={handle} style={{ maxWidth: 480 }}>
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
