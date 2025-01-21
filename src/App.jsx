import './App.css'
import { RecoilRoot } from 'recoil';
import { Suspense } from 'react';
import AppRoutes from './routes';
import Loading from './components/common/Loading';
import TestLayoutPage from './pages/TestLayoutPage';

export default function App() {
  return (
    <RecoilRoot>
      <div className="min-h-screen bg-gray-300 dark:bg-gray-800">
        <div className="mx-auto max-w-[1000px] min-h-screen bg-white dark:bg-gray-900 dark:text-gray-100">
          <Suspense fallback={<Loading/>}>
            <TestLayoutPage/>
            <AppRoutes />
          </Suspense>
        </div>
      </div>
    </RecoilRoot>
  );
}