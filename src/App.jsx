import "./App.css";
import { RecoilRoot } from "recoil";
import { Suspense } from "react";
import { useLocation } from "react-router-dom";
import AppRoutes from "./routes";
import Loading from "./components/common/Loading";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import SideNavbar from "./components/common/SideNavbar";
import SuccessModal from '/src/components/common/modal/SuccessModal';

// OpenVidu 관련 상수
const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'https://demos.openvidu.io/';

export default function App() {
  const location = useLocation();
  const hideFooterPaths = ["/join","/findpw","/findid", "/login","/documents","/challenge/create", "/video"];
  const hideSideNavbarPaths = ["/join","/findpw","/findid", "/login","/documents", "/video"];
  const hideHeaderPaths = ["/login","/findpw","/findid", "/documents", "/video"];

  const shouldHideFooter = hideFooterPaths.includes(location.pathname);
  const shouldHideSideNavbar = hideSideNavbarPaths.includes(location.pathname);
  const shouldHideHeader = hideHeaderPaths.includes(location.pathname);

  return (
    <RecoilRoot>
      <div className="h-screen w-full bg-gray-300 dark:bg-gray-800 relative ">  
        {!shouldHideHeader && <Header />}
        {!shouldHideSideNavbar && <SideNavbar />}
        {!shouldHideHeader && <main className=" bg-gray-100"> 
          {/* 모든 페이지에서 pt-16 (Header.jsx에서 헤더높이를 h-16으로 해둠) + bg-gray-100는 로그인페이지 배경색색 */}
        </main>}
          <Suspense fallback={<Loading />}>
            <AppRoutes />
          </Suspense>
          <SuccessModal/>
        {!shouldHideFooter && <Footer />}
      </div>
    </RecoilRoot>
  );
}