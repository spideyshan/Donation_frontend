import React, { useState } from 'react';
import API from '../api';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '');

function DonateForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setStatus('Please enter a valid amount.');
      return;
    }
    setBusy(true);
    setStatus('Creating payment intent...');
    try {
      const { data } = await API.post('/payments/create-intent', {
        amount, donorName: name, message
      });
      const clientSecret = data.clientSecret;
      if (!clientSecret) {
        setStatus("Server didn't return a client secret. See server logs.");
        setBusy(false);
        return;
      }

      const card = elements.getElement(CardElement);
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card }
      });

      if (result.error) {
        setStatus('Payment failed: ' + result.error.message);
      } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
        setStatus('Payment succeeded — thank you! It may take a moment to appear in Transparency once approved.');
      } else {
        setStatus('Payment processing. Please wait.');
      }
    } catch (err) {
      setStatus('Error: ' + (err?.response?.data?.error || err.message));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{padding:24}}>
      <h2>Donate</h2>
      <form onSubmit={handleSubmit} style={{maxWidth:640}}>
        <label>Amount (USD)</label>
        <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="5.00" />

        <label>Name (optional)</label>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name (optional)" />

        <label>Message (optional)</label>
        <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Short message" />

        <label>Card</label>
        <div style={{padding:10,border:'1px solid #ddd', borderRadius:6}}>
          <CardElement />
        </div>

        <div style={{marginTop:12}}>
          <button type="submit" disabled={!stripe || busy}>{busy ? 'Processing...' : 'Pay'}</button>
        </div>

        {status && <div style={{marginTop:12}}>{status}</div>}
      </form>
    </div>
  );
}

export default function Donate() {
  return (
    <Elements stripe={stripePromise}>
      <DonateForm />
    </Elements>
  );
}
