import { Link } from "react-router-dom";
import testlogo from "/src/assets/logo/testlogo.png";
import { useState } from "react";

export default function FindpwPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    console.log("비밀번호 찾기 페이지에서 아이디 체크");
    
    // const result = await login(formData);
    // if (result.success) {
    //   navigate('/'); // 로그인 성공 후 메인 페이지로 이동
    // } else {
    //   setError(result.error);
    // }
  };
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-10 p-4 flex justify-start">
        <Link to="/">
          <img src={testlogo} alt="로고" className="h-10 w-auto" />
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="">
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-3 bg-white p-8 rounded-lg shadow-lg">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 cursor-default">
                DreamMoa
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600 cursor-default">
              비밀번호를 찾고자하는 아이디를 입력해주세요.
              </p>
            </div>
            <div>
            <div>
              <label htmlFor="email" className="sr-only">이메일</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`appearance-none  relative block w-full 
                px-5 py-3 border  placeholder-gray-500 text-gray-900 
                border-2 rounded-md sm:text-sm text-sm
                focus:outline-none focus:ring-indigo-500 focus:border-my-blue-4 focus:z-10 
                ${!error ? 'border-gray-300' : 'border-my-red'} `}
                placeholder="Email"
              />
          </div>
            </div>
            <div className="flex justify-center space-x-3 items-center">
            <Link to="/findid" className="text-xs text-my-blue-4 hover:text-hmy-blue-4">아이디가 기억나지 않나요?</Link>
            <Link to="/findid" className="text-sm text-my-blue-1 hover:text-hmy-blue-2">아이디 찾기</Link>
            </div>
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">
            <p>아이디(로그인 전화번호, 로그인 전용 아이디) 또는 비밀번호가 </p>
              <p>잘못 되었습니다. 아이디와 비밀번호를 정확히 입력해 주세요.</p>
          </div>
        )}

        <div>
          <button
            type="submit"
            className="
            group relative w-full flex justify-center 
            py-2 px-4 border border-transparent text-sm font-medium 
            rounded-md text-white bg-my-blue-1 hover:bg-hmy-blue-1
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
          Log in
          </button>
        </div>
      </form>
    </>
  );
}