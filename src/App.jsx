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
      <div className="h-screen w-screen bg-gray-300 dark:bg-gray-800 relative">  {/* 남기 확인 요망 */}
        <Header />
        {!shouldHideSideNavbar && <SideNavbar />}
        <main className="flex-grow pt-20">
          <Suspense fallback={<Loading />}>
            <AppRoutes />
          </Suspense>
        </main>
        {!shouldHideFooter && <Footer />}
      </div>
    </RecoilRoot>
  );
}