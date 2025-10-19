import React, { useEffect, useState } from 'react';
import API from '../api';
export default function AdminDonations(){
const [pending, setPending] = useState([]);
useEffect(()=>{ API.get('/admin/donations/pending').then(r=>setPending(r.data)).catch(()=>{}); }, []);
const act = async (id, action) => { await API.post(`/admin/donations/${id}/${action}`); setPending(p=>p.filter(x=>x._id!==id)); };
return (
<div className="container">
<h2>Admin — Pending Donations</h2>
<ul>{pending.map(d => (
<li key={d._id}>${d.amount} — {d.message}
<button onClick={()=>act(d._id,'approve')}>Approve</button>
<button onClick={()=>act(d._id,'reject')}>Reject</button>
</li>
))}</ul>
</div>
);
}