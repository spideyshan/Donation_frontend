import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

export default function Navbar(){
  const { user, logout } = useContext(AuthContext);

  // Debug: show what the Navbar sees from AuthContext
  console.log('Navbar: AuthContext.user =', user);

  const nav = useNavigate();

  return (
    <nav style={{padding:12, background:'#fff', borderBottom:'1px solid #eee'}}>
      <div style={{maxWidth:960, margin:'0 auto', display:'flex', alignItems:'center', gap:12}}>
        <div style={{flex:1}}>
          <Link to="/" style={{marginRight:12}}>Home</Link>
          <Link to="/donate" style={{marginRight:12}}>Donate</Link>
          <Link to="/transparency" style={{marginRight:12}}>Transparency</Link>
        </div>

        <div>
          {user ? (
            <>
              <Link to="/my" style={{marginRight:12}}>My Donations</Link>
              {user.role === 'admin' && <Link to="/admin" style={{marginRight:12}}>Admin</Link>}
              <button onClick={() => { logout(); nav('/'); }} style={{marginLeft:8}}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{marginRight:12}}>Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
