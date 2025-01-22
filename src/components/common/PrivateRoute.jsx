// import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const { checkAuth } = useAuth();
  const location = useLocation();
  
  if (!checkAuth()) {
    // 현재 접근하려던 페이지 정보를 state로 전달하여 로그인 후 리다이렉션 가능하도록 함
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;