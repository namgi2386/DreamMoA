import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { authState } from '../recoil/atoms/authState';
import { authApi } from '../services/api/authApi';

const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();

  // 로그인 함수
  const login = async (credentials) => {
    try {
      const response = await authApi.login(credentials);
      if (response && response.accessToken) {
        setAuth({
          isAuthenticated: true,
          accessToken: response.accessToken
        });
        return { success: true };
      }
      return { success: false, error: '로그인에 실패했습니다.' };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || '로그인 중 오류가 발생했습니다.'
      };
    }
  };

  // 로그아웃 함수
  const logout = async () => {
    try {
      await authApi.logout();
      setAuth({
        isAuthenticated: false,
        accessToken: null
      });
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // 에러가 발생하더라도 로컬의 인증 상태는 초기화
      setAuth({
        isAuthenticated: false,
        accessToken: null
      });
      navigate('/login');
    }
  };

  // 인증 상태 확인 함수
  const checkAuth = () => {
    return auth.isAuthenticated && auth.accessToken;
  };

  // 로그인 상태에서 접근 불가능한 페이지 처리 (예: 로그인 페이지)
  const redirectIfAuthenticated = (path = '/') => {
    if (checkAuth()) {
      navigate(path);
      return true;
    }
    return false;
  };

  // 비로그인 상태에서 접근 불가능한 페이지 처리
  const requireAuth = (path = '/login') => {
    if (!checkAuth()) {
      navigate(path);
      return false;
    }
    return true;
  };

  return {
    auth,
    login,
    logout,
    checkAuth,
    redirectIfAuthenticated,
    requireAuth
  };
};

export default useAuth;