import React, { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { Navigate } from 'react-router-dom';
export default function ProtectedRoute({ children, adminOnly = false }) {
const { user } = useContext(AuthContext);
if (!user) return <Navigate to="/login" replace />;
if (adminOnly && user.role !== 'admin') return <Navigate to="/" replace />;
return children;
}