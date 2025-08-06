//pentru a proteja rutele care necesită autentificare, veriifca daca exista un token JWT in localStorage, daca tokenul nu există, redirecționează utilizatorul către pagina de login
import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? <>{children}</> : <Navigate to="/login" replace />;
};
