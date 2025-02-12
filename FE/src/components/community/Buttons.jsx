import { useNavigate, useLocation } from "react-router-dom";

export default function Button({
  type,
  postId,
  onDelete,
  category,
  // page,
  // sortOption,
  // searchQuery,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  // const queryParams = new URLSearchParams(location.search);
  // const urlSort = queryParams.get("sort") || "최신순";
  // const urlSearch = queryParams.get("search") || "";

  // const pageToNavigate = page ?? Number(queryParams.get("page")) ?? 1;
  // const sortToNavigate = sortOption || urlSort;
  // const searchToNavigate = searchQuery || urlSearch;

  // console.log("📌 목록보기 버튼 클릭 시 이동할 페이지:", pageToNavigate, "정렬 기준:", sortToNavigate, "검색어:", searchToNavigate);

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
        // 전달된 state가 있고, from 값이 "list"인 경우에는 history.back()
        if (location.state && location.state.from === "list") {
          window.history.back();
        } else {
          let listUrl = "/community";
          if (category === "자유") listUrl = "/community/free";
          if (category === "질문") listUrl = "/community/qna";
          navigate(listUrl);
        }
        break;
      default:
        console.warn("Button type이 잘못 설정됨:", type);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 text-white rounded ${
        type === "edit" ? "bg-blue-500" : type === "delete" ? "bg-red-500" : "bg-gray-500"
      }`}
    >
      {type === "edit" ? "수정" : type === "delete" ? "삭제" : "목록보기"}
    </button>
  );
}
