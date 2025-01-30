// 좋아요 & 댓글 개수를 표시

import { FaRegThumbsUp, FaRegComment } from "react-icons/fa";

export default function PostStats({ likes, comments }) {
    return (
      <div className="flex items-center space-x-6 mt-6 text-gray-500">
        <span className="flex items-center gap-1">
          <FaRegThumbsUp /> {likes || 0} 좋아요
        </span>
        <span className="flex items-center gap-1">
          <FaRegComment /> {comments || 0} 댓글
        </span>
      </div>
    );
  }