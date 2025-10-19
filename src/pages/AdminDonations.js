import React, { useEffect, useState } from 'react';
import API from '../api';
import { Loader, Money } from '../components/UiHelpers';

export default function AdminDonations(){
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    let mounted = true;
    API.get('/admin/donations/pending').then(r => {
      if (!mounted) return;
      setPending(r.data || []);
    }).catch(e => setErr(e?.response?.data?.error || e.message)).finally(() => setLoading(false));
    return () => { mounted = false; };
  }, []);

  const act = async (id, action) => {
    try {
      await API.post(`/admin/donations/${id}/${action}`);
      setPending(p => p.filter(x => x._id !== id));
    } catch (e) {
      setErr(e?.response?.data?.error || e.message);
    }
  };

  if (loading) return <Loader />;

  return (
    <div style={{padding:24}}>
      <h2>Admin — Pending Donations</h2>
      {err && <div style={{color:'red'}}>{err}</div>}
      {pending.length === 0 ? <p>No pending donations.</p> : (
        <ul style={{listStyle:'none', padding:0}}>
          {pending.map(d => (
            <li key={d._id} style={{marginBottom:12, padding:12, border:'1px solid #eee', borderRadius:6}}>
              <div><strong>Amount:</strong> <Money amount={d.amount} currency={d.currency} /></div>
              <div><strong>Message:</strong> {d.message || '—'}</div>
              <div style={{fontSize:12, color:'#666'}}>Created: {new Date(d.createdAt).toLocaleString()}</div>
              <div style={{marginTop:8}}>
                <button onClick={() => act(d._id, 'approve')} style={{marginRight:8}}>Approve</button>
                <button onClick={() => act(d._id, 'reject')}>Reject</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
