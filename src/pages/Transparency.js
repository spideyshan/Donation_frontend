// src/pages/Transparency.js
import React, { useEffect, useState } from 'react';
import API from '../api';
import { Loader, Money } from '../components/UiHelpers';

export default function Transparency(){
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    let mounted = true;
    API.get('/donations/public').then(r => {
      if (!mounted) return;
      setList(r.data || []);
    }).catch(e => {
      setErr(e?.response?.data?.error || e.message || 'Failed to load');
    }).finally(() => setLoading(false));
    return () => { mounted = false; };
  }, []);

  if (loading) return <Loader />;

  return (
    <div style={{padding:24}}>
      <h2>Transparency — approved donations</h2>
      {err && <div style={{color:'red'}}>{err}</div>}
      {list.length === 0 ? <p>No donations approved yet.</p> : (
        <ul style={{listStyle:'none', padding:0}}>
          {list.map(d => (
            <li key={d._id} style={{marginBottom:12, padding:12, border:'1px solid #eee', borderRadius:6}}>
              <div><strong>Amount:</strong> <Money amount={d.amount} currency={d.currency} /></div>
              <div><strong>Message:</strong> {d.message || '—'}</div>
              <div style={{fontSize:12, color:'#666'}}>On {new Date(d.createdAt).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
