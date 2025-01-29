import "./App.css";
import { RecoilRoot } from "recoil";
import { Suspense } from "react";
import { useLocation } from "react-router-dom";
import AppRoutes from "./routes";
import Loading from "./components/common/Loading";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import SideNavbar from "./components/common/SideNavbar";

export default function App() {
  const location = useLocation();
  const hideFooterPaths = ["/join", "/login"];
  const hideSideNavbarPaths = ["/join", "/login","/documents"];

  const shouldHideFooter = hideFooterPaths.includes(location.pathname);
  const shouldHideSideNavbar = hideSideNavbarPaths.includes(location.pathname);

  return (
    <RecoilRoot>
      <div className="h-screen w-screen bg-gray-300 dark:bg-gray-800 relative">  
        <Header />
        {!shouldHideSideNavbar && <SideNavbar />}
        <main className="flex-grow pt-16"> {/* 모든 페이지에서 pt-16 (Header.jsx에서 헤더높이를 h-16으로 해둠)  */}
          <Suspense fallback={<Loading />}>
            <AppRoutes />
          </Suspense>
        </main>
        {!shouldHideFooter && <Footer />}
      </div>
    </RecoilRoot>
  );
}