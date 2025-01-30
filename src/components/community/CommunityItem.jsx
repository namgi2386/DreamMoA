import { Link } from 'react-router-dom';
import { FaRegThumbsUp, FaRegComment } from 'react-icons/fa';

export default function CommunityItem({ post }) {
  return (
    <Link to={`/community/detail/${post.postId}`} className="block">
      <div className="p-4 border-b border-gray-300 hover:bg-gray-50 transition">
        {/* 사용자 닉네임 및 카테고리
        <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
          <span className="font-semibold">{post.userNickname}</span>
          <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">{post.category}</span>
        </div> */}

        {/* 게시글 제목 */}
        <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>

        {/* 본문 내용 일부 (100자까지만 표시) */}
        <p className="mt-2 text-gray-600 text-sm line-clamp-2">
          {post.content.length > 100 ? `${post.content.substring(0, 100)}...` : post.content}
        </p>

        {/* 태그 (나중에 추가 가능) */}
        <div className="flex gap-2 mt-2">
          {post.tags?.map(tag => (
            <span key={tag} className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded">
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
