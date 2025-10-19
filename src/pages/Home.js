// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home(){
  return (
    <div style={{padding:24}}>
      <h1>Welcome to the Donation Site</h1>
      <p>Thanks for building this! Use the donate page to contribute — transparency page shows approved donations.</p>

      <div style={{marginTop:20, display:'flex', gap:12}}>
        <Link to="/donate"><button>Donate now</button></Link>
        <Link to="/transparency"><button>Transparency</button></Link>
        <Link to="/my"><button>My donations</button></Link>
      </div>

      <section style={{marginTop:28}}>
        <h3>Notes</h3>
        <ul>
          <li>Payments use Stripe PaymentIntents (server creates client_secret).</li>
          <li>Donors' sensitive info is encrypted on the backend.</li>
          <li>Admin users can approve/reject donations from the admin page.</li>
        </ul>
      </section>
    </div>
  );
}
