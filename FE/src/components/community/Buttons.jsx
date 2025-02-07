import { useNavigate, useLocation } from "react-router-dom";

export default function Button({ type, postId, onDelete, category, page, sortOption }) {
  const navigate = useNavigate();
  const location = useLocation();

  const urlSort = new URLSearchParams(location.search).get("sort") || "최신순";
  const pageToNavigate = page !== undefined ? page : Number(new URLSearchParams(location.search).get("page")) || 1;
  const sortToNavigate = sortOption || urlSort; // ✅ sortOption 유지


  console.log("📌 목록보기 버튼 클릭 시 이동할 페이지:", pageToNavigate, "정렬 기준:", sortToNavigate); // ✅ 디버깅 로그 추가


  const handleClick = () => {
    switch (type) {
      case "edit":
        navigate(`/community/edit/${postId}`);
        break;
      case "delete":
        if (window.confirm("정말 삭제하시겠습니까?")) {
          onDelete();
        }
        break;
      case "back":
        // ✅ page 값이 없으면 기본 1페이지로 설정
        let listUrl = "/community";
        if (category === "자유") listUrl = "/community/free";
        if (category === "질문") listUrl = "/community/qna";

        navigate(`${listUrl}?page=${pageToNavigate}&sort=${sortToNavigate}`); // ✅ page 값이 undefined 방지
        break;
      default:
        console.warn("Button type이 잘못 설정됨:", type);
    }
  };

  const buttonConfig = {
    edit: { label: "수정", style: "bg-blue-500" },
    delete: { label: "삭제", style: "bg-red-500" },
    back: { label: "목록보기", style: "bg-gray-500" },
  };

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 text-white rounded ${buttonConfig[type]?.style || "bg-gray-400"}`}
    >
      {buttonConfig[type]?.label || "버튼"}
    </button>
  );
}
