import {Link} from 'react-router-dom';
import ThemeToggle from '../components/common/themeToggle';
import useAuth from '../hooks/useAuth';

export default function TestLayoutPage() {
  const { logout } = useAuth();
  return (
    <>
      <div className="flex space-x-3 justify-center mb-5 bg-green-300">
        <Link to={"/"}>Home</Link>
        <Link to={"/TestPage"}>TestPage</Link>
        <ThemeToggle/>
        <Link to={"/loadingtest"}>LoadingTest</Link>
        <button onClick={logout} className="border">Logout</button>
      </div>
    </>
  );
};
