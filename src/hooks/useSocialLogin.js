// hooks/useSocialLogin.js
import { useEffect } from 'react';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { authState, userState } from '../recoil/atoms/authState';
import getUserApi from '../services/api/getUserApi';

export const useSocialLogin = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const setUserInfo = useSetRecoilState(userState);

  useEffect(() => {
    const processSocialLogin = async () => {
      const socialLoginPending = localStorage.getItem('socialLoginPending');
      
      if (socialLoginPending === 'true') {
        try {
          const userResponse = await getUserApi.getUserInfo();
          
          setAuth({
            isAuthenticated: true,
            accessToken: userResponse.data.accessToken
          });
          
          setUserInfo(userResponse.data);
          
          localStorage.removeItem('socialLoginPending');
          
          console.log('소셜 로그인 처리 완료');
          
        } catch (error) {
          console.error('소셜 로그인 처리 중 에러:', error);
          localStorage.removeItem('socialLoginPending');
        }
      }
    };

    processSocialLogin();
  }, [setAuth, setUserInfo]);
};