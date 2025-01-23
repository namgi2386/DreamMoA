import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { authState } from '../recoil/atoms/authState';
import { authApi } from '../services/api/authApi';
import { authLoadingState } from '../recoil/atoms/authLoadingState';

const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const [isLoading, setIsLoading] = useRecoilState(authLoadingState);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      // console.log("initialize");
      
      try {
        const storedToken = localStorage.getItem('accessToken');
        if (storedToken && !auth.isAuthenticated) {
          // console.log("find accessToken");
          
          setAuth({
            isAuthenticated: true,
            accessToken: storedToken
          });
          // console.log(auth.isAuthenticated);
          // console.log(auth.accessToken);
          
        }
      } finally {
        setIsLoading(false);  // 인증 상태 확인 완료
      }
    };

    initializeAuth();
  }, [auth]);

  useEffect(() => {
    // console.log('Updated auth state:', auth);
  }, [auth]);


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
    console.log("인증상태체크");
    
    // 쿠키를 객체로 변환
    const cookies = Object.fromEntries(
      document.cookie.split(';')
        .map(cookie => {
          const [name, value] = cookie.trim().split('=');
          return [name, value];
        })
    );
    
    // console.log("Cookies:", cookies);
    return (auth.isAuthenticated && auth.accessToken) || cookies.access_token;
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