import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState, userState } from "../../recoil/atoms/authState";
import testlogo from "../../assets/logo/testlogo.png";
import useAuth from "../../hooks/useAuth";
import { RiAdminFill } from "react-icons/ri";

const Header = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  const { isAuthenticated } = useRecoilValue(authState);
  // const resetAuthState = useResetRecoilState(authState);
  // const resetUserState = useResetRecoilState(userState);

  const { logout } = useAuth();
  const [UserInfo , setUserInfo] = useRecoilState(userState);

  // const handleAuthAction = () => {
  //   if (isAuthenticated) {
  //     resetAuthState();
  //     resetUserState();
  //     navigate("/login");
  //   } else {
  //     navigate("/login");
  //   }
  // };
  const handleLogout = async () => {
    if (isAuthenticated) {
      try {
        await logout();
        setUserInfo(null);
        navigate("/login");
      } catch (error) {
        console.error('Logout error:', error);
      }
    } else {
      navigate("/login");
    }
  };

  // Login 페이지에서는 헤더 렌더링 안 함
  // if (location.pathname === "/login") return null;

  return (
    <header
      // className="flex justify-between items-center p-4"
      className=" top-0 left-0 right-0 flex justify-between items-center p-4 z-[9999] h-16 bg-gradient-to-b from-hmy-blue-1 to-hmy-blue-2"
      // 모든 페이지에서 pt-16적용중(App.jsx) (Header.jsx에서 헤더높이를 h-16으로 해둠)
      // style={{ backgroundColor: "#003458" }}
    >
      <div>
        <Link to="/">
          <img src={testlogo} alt="로고" className="h-10 w-auto" />
        </Link>
      </div>
      <div className="flex ">
        {/* 관리자버튼추가 */}
        {UserInfo && UserInfo.role === "ADMIN" ? 
                <div>
                <Link to="/admin">
                  <RiAdminFill className="h-10 w-auto text-white" />
                </Link>
              </div> 
              : ''
        }
        <button
          onClick={handleLogout}
          className="text-white px-4 py-2 rounded"
        >
          {UserInfo ? "로그아웃" : "로그인"}
        </button>
      </div>
    </header>
  );
};

export default Header;
