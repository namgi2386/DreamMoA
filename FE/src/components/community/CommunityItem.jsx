import { Link, useLocation } from "react-router-dom";
import { FaRegThumbsUp, FaRegComment } from "react-icons/fa";
import DOMPurify from "dompurify";

export default function CommunityItem({ post }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = queryParams.get("page") || "1";
  const currentSort = queryParams.get("sort") || "최신순"; // ✅ 현재 정렬 옵션 가져오기

  console.log("📌 CommunityItem 렌더링됨 - 현재 페이지:", currentPage, "정렬 기준:", currentSort); // ✅ 디버깅 로그 추가

  return (
    <Link 
    to={`/community/detail/${post.postId}`}
    state={{ page: Number(currentPage), sortOption: currentSort, category: post.category }}
    className="block">
      <div className="p-4 border-b border-gray-300 hover:bg-gray-50 transition">
        {/* 사용자 닉네임 및 카테고리
        <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
          <span className="font-semibold">{post.userNickname}</span>
          <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">{post.category}</span>
        </div> */}

        {/* 게시글 제목 */}
        <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>

        {/* 본문 내용 일부 (100자까지만 표시) */}
        <div
          className="mt-2 text-gray-600 text-sm line-clamp-2 not-italic font-normal"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              (post.content.length > 100
                ? post.content.substring(0, 100) + "..."
                : post.content
              ).replace(/<i>|<\/i>|<em>|<\/em>/g, "")
            ),
          }}
        ></div>

        {/* 태그 (나중에 추가 가능) */}
        <div className="flex gap-2 mt-2">
          {post.tags?.map((tag) => (
            <span
              key={tag}
              className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 좋아요 & 댓글 수 */}
        <div className="flex justify-between items-center mt-3 text-gray-500 text-sm">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1">
              <FaRegThumbsUp /> {post.likes || 0}
            </span>
            <span className="flex items-center gap-1">
              <FaRegComment /> {post.comments || 0}
            </span>
          </div>
          <span className="text-xs">{post.createdAt}</span>
        </div>
      </div>
    </Link>
  );
}
