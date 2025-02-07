import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { communityListState } from "../../../recoil/atoms/communityState";
import CommunityList from "../../../components/community/CommunityList";
import SearchBar from "../../../components/community/SearchBar";
import SortButtons from "../../../components/community/SortButtons";
import Pagination from "../../../components/community/Pagination";
import { fetchPosts } from "../../../utils/fetchPosts";

export default function CommunityFreeListPage() {
  const setPosts = useSetRecoilState(communityListState);
  const location = useLocation();
  const navigate = useNavigate();

  // 현재 URL에서 page와 sortOption 값을 가져옴 (기본값: 최신순, 1페이지)
  const queryParams = new URLSearchParams(location.search);
  const currentPage = Number(queryParams.get("page")) || 1;
  const currentSort = queryParams.get("sort") || "최신순";

  const [sortOption, setSortOption] = useState(currentSort);
  const [totalPages, setTotalPages] = useState(1);

  console.log("📌 현재 URL에서 가져온 페이지 번호:", currentPage, "정렬 기준:", sortOption); // ✅ 디버깅 로그 추가

  // ✅ 정렬 옵션이 변경되면 `URL` 업데이트
  const handleSortChange = (newSort) => {
    setSortOption(newSort);
    navigate(`/community/free?page=1&sort=${newSort}`); // ✅ 정렬 변경 시 1페이지로 이동
  };

  // ✅ 페이지 변경 시 `URL` 업데이트
  const handlePageChange = (newPage) => {
    console.log("📌 페이지 변경:", newPage, "현재 정렬:", sortOption); // ✅ 디버깅 로그 추가
    navigate(`/community/free?page=${newPage}&sort=${sortOption}`);
  };

  // ✅ `sortOption`이나 `currentPage`가 변경될 때 API 호출
  useEffect(() => {
    console.log("📌 useEffect 실행됨 - 페이지:", currentPage, "정렬 기준:", sortOption);
    fetchPosts("자유", setPosts, sortOption, currentPage, setTotalPages);
  }, [sortOption, currentPage]); // ✅ currentPage 의존성 추가

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">자유게시판</h1>
        <Link to="/community/free/write" className="px-4 py-2 bg-blue-500 text-white rounded">
          글쓰기
        </Link>
      </div>

      {/* 검색 컴포넌트 */}
      <SearchBar
        onSearch={(query, tag) => fetchPosts("자유", setPosts, sortOption, currentPage, query, tag)}
      />

      {/* 정렬 버튼 (정렬 옵션 변경 시 `handleSortChange` 실행) */}
      <SortButtons sortOption={sortOption} setSortOption={handleSortChange} />

      <CommunityList sortOption={sortOption} />

      {/* ✅ Pagination에서 onPageChange를 `handlePageChange`로 전달 */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}