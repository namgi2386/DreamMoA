// src/routes/index.jsx
import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// 컴포넌트 import
import HomePage from '../pages/HomePage';
import Notfound from '../pages/Notfound';
import Loading from '../components/common/Loading';

// lazy 로드 컴포넌트
const TestPage = lazy(() => import('../pages/TestPage'));

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/TestPage" element={<TestPage />} />
      <Route path="/loadingtest" element={<Loading />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}