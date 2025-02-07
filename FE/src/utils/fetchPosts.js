// src/utils/fetchPosts.js
import communityApi from "../services/api/communityApi";

/**
 * 게시글 데이터를 가져오는 함수
 *
 * @param {string} category - 예: "자유"
 * @param {Function} setPosts - 게시글 목록 상태 업데이트 함수
 * @param {string} sortOption - "최신순", "조회순", "인기순" 등
 * @param {number} currentPage - 현재 페이지 (1부터 시작)
 * @param {Function} setTotalPages - 전체 페이지 수 상태 업데이트 함수 (조회순일 때 사용)
 * @param {string} [searchQuery=""] - 제목 검색어
 * @param {string} [tagQuery=""] - 태그 검색어
 */
export const fetchPosts = async (
  category,
  setPosts,
  sortOption,
  currentPage = 1,
  setTotalPages = null,
  searchQuery = "",
  tagQuery = ""
) => {
  console.log(`${category} 게시판 데이터를 불러옵니다...`);
  if (sortOption === "조회순") {
    // 백엔드의 조회순 정렬 + 페이지네이션 API 사용 (페이지는 0부터 시작)
    try {
      const response = await communityApi.getSortedByViews(currentPage - 1, 7); // 페이지당 7개씩 조회
      // 백엔드가 Spring Data Page 객체 형식으로 반환한다고 가정: { content, totalPages, ... }
      let posts = response.data.content;
      
      // (옵션) 검색어/태그 필터링 – 백엔드에서 처리하지 않는다면 클라이언트에서 추가 필터링 가능
      if (searchQuery.trim()) {
        posts = posts.filter(post => post.title.includes(searchQuery));
      }
      if (tagQuery.trim()) {
        posts = posts.filter(post => post.tags && post.tags.includes(tagQuery));
      }
      
      // 상태 업데이트: 게시글 목록과 전체 페이지 수
      setPosts(posts);
      if (setTotalPages) setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("조회순 게시글 데이터 가져오기 에러:", error);
    }
  } else if (sortOption === "최신순") {
    // 최신순 정렬 처리: 백엔드 API 호출
    try {
      const response = await communityApi.getSortedByNewest(currentPage - 1, 7, category);
      let posts = response.data.content;
      // (옵션) 추가 필터링
      if (searchQuery.trim()) {
        posts = posts.filter(post => post.title.includes(searchQuery));
      }
      if (tagQuery.trim()) {
        posts = posts.filter(post => post.tags && post.tags.includes(tagQuery));
      }
      setPosts(posts);
      if (setTotalPages) setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("최신순 게시글 데이터 가져오기 에러:", error);
    }
  } else if (sortOption === "좋아요순") {
    // 최신순 정렬 처리: 백엔드 API 호출
    try {
      const response = await communityApi.getSortedByLikes(currentPage - 1, 7, category);
      let posts = response.data.content;
      // (옵션) 추가 필터링
      if (searchQuery.trim()) {
        posts = posts.filter(post => post.title.includes(searchQuery));
      }
      if (tagQuery.trim()) {
        posts = posts.filter(post => post.tags && post.tags.includes(tagQuery));
      }
      setPosts(posts);
      if (setTotalPages) setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("좋아요순 게시글 데이터 가져오기 에러:", error);
    }
  } else if (sortOption === "댓글순") {
    // 최신순 정렬 처리: 백엔드 API 호출
    try {
      const response = await communityApi.getSortedByComments(currentPage - 1, 7, category);
      let posts = response.data.content;
      // (옵션) 추가 필터링
      if (searchQuery.trim()) {
        posts = posts.filter(post => post.title.includes(searchQuery));
      }
      if (tagQuery.trim()) {
        posts = posts.filter(post => post.tags && post.tags.includes(tagQuery));
      }
      setPosts(posts);
      if (setTotalPages) setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("댓글순 게시글 데이터 가져오기 에러:", error);
    }
  }
};

// 정렬 함수
// const sortPosts = (posts, option) => {
//   switch (option) {
//     case "조회순":
//       return [...posts].sort((a, b) => b.viewCount - a.viewCount);
//     case "좋아요순":
//       return [...posts].sort((a, b) => b.likes - a.likes);
//     default: // 최신순
//       return [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//   }
// };
