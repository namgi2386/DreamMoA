import LoginForm from '../components/auth/LoginForm.jsx';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            로그인
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            서비스를 이용하기 위해 로그인해주세요
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;