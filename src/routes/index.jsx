import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

// 컴포넌트 import
import HomePage from "../pages/HomePage";
import Notfound from "../pages/Notfound";
import Loading from "../components/common/Loading";
import LoginPage from "../pages/User/LoginPage";
import PrivateRoute from "../components/common/PrivateRoute";
import JoinPage from "../pages/User/JoinPage";
import MyPage from "../pages/User/MyPage";
import FindidPage from "../pages/User/FindidPage";
import FindpwPage from "../pages/User/FindpwPage";
import DashBoardPage from "../pages/User/DashBoardPage";
import CommunityListPage from "../pages/Community/CommunityListPage";
import CommunityDetailPage from "../pages/Community/CommunityDetailPage";
import ChallengeListPage from "../pages/Challenge/ChallengeListPage";
import ChallengeDetailPage from "../pages/Challenge/ChallengeDetailPage";
import ChallengeCreatePage from "../pages/Challenge/ChallengeCreatePage";
import ChallengeMeetPage from "../pages/Challenge/ChallengeMeetPage";

// lazy 로드 컴포넌트
const TestPage = lazy(() => import("../pages/TestPage"));

export default function AppRoutes() {
  return (
    <Routes>
      {/* 메인 페이지 */}
      <Route path="/" element={<HomePage />} />
      {/* 회원 */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/join" element={<JoinPage />} />
      <Route path="/TestPage" element={<TestPage />} />
      <Route path="/mypage" element={<MyPage />} /> {/* /user-Info */}
      <Route path="/findid" element={<FindidPage />} /> {/* 아이디 찾기 */}
      <Route path="/findpw" element={<FindpwPage />} /> {/* 비밀번호 찾기 */}
      <Route path="/dashboard" element={<DashBoardPage />} /> {/*대시보드 */}
      {/* 게시판 */}
      <Route path="/community/list" element={<CommunityListPage />} />
      <Route path="/community/:id" element={<CommunityDetailPage />} />
      {/* 챌린지 */}
      <Route path="/challenge/list" element={<ChallengeListPage />} />
      <Route path="/challenge/detail/:id" element={<ChallengeDetailPage />} />
      <Route path="/challenge/create" element={<ChallengeCreatePage />} /> {/* 챌린지 만들기 */}
      <Route path="/challenge/meet" element={<ChallengeMeetPage />} /> {/* 챌린지 미팅 */}
      <Route
        path="/loadingtest"
        element={
          <PrivateRoute>
            <Loading />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}
