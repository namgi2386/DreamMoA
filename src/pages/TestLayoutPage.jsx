import {Link} from 'react-router-dom';
import ThemeToggle from '../components/common/themeToggle';

export default function TestLayoutPage() {
  return (
    <>
      <div className="flex space-x-3 justify-center mb-5 bg-green-300">
        <Link to={"/"}>Home</Link>
        <Link to={"/TestPage"}>TestPage</Link>
        <ThemeToggle/>
        <Link to={"/loadingtest"}>LoadingTest</Link>
      </div>
    </>
  );
};
