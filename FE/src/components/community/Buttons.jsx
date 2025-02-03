import { useNavigate } from "react-router-dom";

export default function Buttons({ postId, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-4 mt-6">
      {/* 수정 버튼 */}
      <button
        onClick={() => navigate(`/community/edit/${postId}`)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        수정
      </button>

      {/* 삭제 버튼 */}
      <button
        onClick={onDelete}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        삭제
      </button>
    </div>
  );
}
