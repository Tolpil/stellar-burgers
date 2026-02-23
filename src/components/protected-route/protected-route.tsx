import React from 'react';
import { useSelector } from '../../services/store';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthChecked, user } = useSelector((state) => state.user);

  if (!isAuthChecked) {
    return null;
  }

  return user ? <>{children}</> : <Navigate to='/login' replace />;
};