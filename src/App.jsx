import './App.css'
import { RecoilRoot } from 'recoil';
import { Routes, Route} from 'react-router-dom';
import { lazy , Suspense } from 'react';

import HomePage from './pages/HomePage';
import Loading from './components/common/Loading';
import Notfound from './pages/Notfound';
import TestLayoutPage from './pages/TestLayoutPage';

// 자주 사용하지 않는 페이지는 lazy 로드
const TestPage = lazy(() => import('./pages/TestPage'));

export default function App() {
  return (
    <RecoilRoot>
      <div className="min-h-screen bg-gray-300 dark:bg-gray-800">
        <div className="mx-auto max-w-[1000px] min-h-screen bg-white dark:bg-gray-900 dark:text-gray-100">
          <Suspense fallback={<Loading/>}>
            <TestLayoutPage/>
            <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/TestPage" element={<TestPage />}/>
              {/* 로딩페이지 화면 테스트 */}
              <Route path="/loadingtest" element={<Loading/>}/>
              <Route path='*' element={<Notfound/>}/>
            </Routes>
          </Suspense>
        </div>
      </div>
    </RecoilRoot>
  );
}