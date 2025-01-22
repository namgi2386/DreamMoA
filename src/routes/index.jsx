import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// 컴포넌트 import
import HomePage from '../pages/HomePage';
import Notfound from '../pages/Notfound';
import Loading from '../components/common/Loading';
import LoginPage from '../pages/LoginPage';
import PrivateRoute from '../components/common/PrivateRoute';

// lazy 로드 컴포넌트
const TestPage = lazy(() => import('../pages/TestPage'));

export default function AppRoutes() {
  // LoginPage 라우트주소 추가
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/TestPage" element={<TestPage />} />
      <Route path="/loadingtest" element={<PrivateRoute><Loading /></PrivateRoute>} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}