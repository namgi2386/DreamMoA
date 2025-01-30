import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { Link } from "react-router-dom";
import { communityListState } from "../../../recoil/atoms/communityState";
import CommunityList from "../../../components/community/CommunityList";
import SearchBar from "../../../components/community/SearchBar";
import SortButtons from "../../../components/community/SortButtons";
import { fetchPosts } from "../../../utils/fetchPosts";

export default function CommunityFreeListPage() {
  const setPosts = useSetRecoilState(communityListState);
  const [sortOption, setSortOption] = useState("최신순"); // 기본 정렬: 최신순

  useEffect(() => {
    fetchPosts("자유", setPosts, sortOption); // ✅ 공통 함수 호출
  }, [sortOption]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">자유게시판</h1>
        <Link to="/community/write" className="px-4 py-2 bg-blue-500 text-white rounded">
          글쓰기
        </Link>
      </div>

      {/* 🔍 검색 컴포넌트 사용 */}
      <SearchBar onSearch={(query, tag) => fetchPosts("자유", setPosts, sortOption, query, tag)} />

      {/* ✅ 정렬 버튼 컴포넌트 사용 */}
      <SortButtons sortOption={sortOption} setSortOption={setSortOption} />

      <CommunityList />
    </div>
  );
}
