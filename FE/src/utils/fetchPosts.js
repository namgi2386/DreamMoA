import communityApi from "../services/api/communityApi";

export const fetchPosts = async (category, setPosts, sortOption, searchQuery = "", tagQuery = "") => {
  console.log(`${category} 게시판 데이터를 불러옵니다...`);
  const response = await communityApi.getList(category);

  let filteredPosts = response.data.filter(post => post.category === category);

  // 제목 검색 필터링
  if (searchQuery.trim()) {
    filteredPosts = filteredPosts.filter(post => post.title.includes(searchQuery));
  }

  // 태그 검색 필터링
  if (tagQuery.trim()) {
    filteredPosts = filteredPosts.filter(post => post.tags && post.tags.includes(tagQuery));
  }

  // 정렬 기준 적용
  setPosts(sortPosts(filteredPosts, sortOption));
};

// 정렬 함수
const sortPosts = (posts, option) => {
  switch (option) {
    case "조회순":
      return [...posts].sort((a, b) => b.viewCount - a.viewCount);
    case "인기순":
      return [...posts].sort((a, b) => b.likes - a.likes);
    default: // 최신순
      return [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
};
