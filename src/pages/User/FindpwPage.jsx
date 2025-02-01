import { Link, useNavigate } from "react-router-dom";
import testlogo from "/src/assets/logo/testlogo.png";
import { useState } from "react";
import authChangeApi from "../../services/api/authChangeApi.js";

export default function FindpwPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // 이메일 유효성 검증
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // 이메일 형식 검증
    if (!validateEmail(email)) {
      setError('올바른 이메일 형식이 아닙니다.');
      return;
    }

    try {
      setIsLoading(true);
      // API 호출 예시
      const response = await authChangeApi.checkUserEmail(email);

      // if (!data.exists) {
      //   setError('등록되지 않은 이메일입니다.');
      //   return;
      // }
      if (response.success) {  // 실제 응답 구조에 맞게 수정하세요
        // 성공 시 처리
        navigate('/documents', { state: { email } });
      } else {
        setError('등록되지 않은 이메일입니다.');
      }

    } catch (error) {
      setError('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-10 p-4 flex justify-start">
        <Link to="/">
          <img src={testlogo} alt="로고" className="h-10 w-auto" />
        </Link>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full relative bg-white p-8 rounded-lg shadow-lg">
          <div className="mb-6">
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              DreamMoa
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              비밀번호를 찾고자하는 이메일을 입력해주세요.
            </p>
          </div>

          <div className="mb-1">
            <label htmlFor="email" className="sr-only">이메일</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={handleChange}
              className={`appearance-none relative block w-full 
                px-5 py-3 border placeholder-gray-500 text-gray-900 
                border-2 rounded-md text-sm 
                focus:outline-none focus:ring-indigo-500 focus:border-my-blue-4 focus:z-10 
                ${!error ? 'border-gray-300' : 'border-my-red'}`}
              placeholder="이메일을 입력해주세요"
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="mb-3 text-my-red text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent 
              text-sm font-medium rounded-md text-white bg-my-blue-1 mb-6
              hover:bg-hmy-blue-1 focus:outline-none focus:ring-2 
              focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isLoading}
          >
            {isLoading ? '확인중...' : 'Continue'}
          </button>

          <div className="flex justify-center space-x-3 items-center">
            <Link to="/findid" className="text-xs text-my-blue-4 hover:text-hmy-blue-4">
              아이디가 기억나지 않나요?
            </Link>
            <Link to="/findid" className="text-sm text-my-blue-1 hover:text-hmy-blue-2">
              아이디 찾기
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}