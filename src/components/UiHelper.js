// src/components/UiHelpers.js
import React from 'react';

export function Loader({ text = 'Loading...' }) {
  return <div style={{padding:20, textAlign:'center'}}>{text}</div>;
}

export function Money({ amount, currency = 'usd' }) {
  const val = Number(amount) || 0;
  return <span>${(val).toFixed(2)} {currency.toUpperCase()}</span>;
}
