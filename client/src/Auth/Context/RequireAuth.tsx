import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  const location = useLocation();


  if (!auth.token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};
