import { Link, useNavigate, useLocation } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { authState, userState } from "../../recoil/atoms/authState";
import testlogo from "../../assets/logo/testlogo.png";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useRecoilValue(authState);
  const resetAuthState = useResetRecoilState(authState);
  const resetUserState = useResetRecoilState(userState);

  const handleAuthAction = () => {
    if (isAuthenticated) {
      resetAuthState();
      resetUserState();
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  // Login 페이지에서는 헤더 렌더링 안 함
  if (location.pathname === "/login") return null;

  return (
    <header
      className="flex justify-between items-center p-4"
      style={{ backgroundColor: "#003458" }}
    >
      <div>
        <Link to="/">
          <img src={testlogo} alt="로고" className="h-10 w-auto" />
        </Link>
      </div>
      <div>
        <button
          onClick={handleAuthAction}
          className="text-white px-4 py-2 rounded"
        >
          {isAuthenticated ? "로그아웃" : "로그인"}
        </button>
      </div>
    </header>
  );
};

export default Header;
