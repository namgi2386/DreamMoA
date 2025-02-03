import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import communityApi from "../../services/api/communityApi";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/atoms/authState";

export default function CommunityForm({ boardCategory, initialData, mode = "create" }) {
  const navigate = useNavigate();
  const currentUser = useRecoilValue(userState); // ✅ 현재 로그인한 유저 정보 가져오기
  console.log("현재 로그인된 사용자 정보:", currentUser);

  const [formData, setFormData] = useState({
    category: boardCategory ?? "", // props로 받은 '자유' 또는 '질문'
    title: "",
    content: "",
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData(initialData);
    }
  }, [mode, initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ 로그인 상태 확인
    if (!currentUser) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    try {
      await (mode === "create"
        ? communityApi.create(formData)
        : communityApi.update(initialData.postId, formData)
      );

      // 글 작성 후, 어느 게시판으로 갈지
      // formData.category === "자유" → "/community/free"
      // formData.category === "질문" → "/community/qna"
      if (mode === "edit") {
        // 수정 후, 상세 페이지로 이동
        navigate(`/community/detail/${initialData.postId}`);
      } else {
        // 새 글 작성 후, 게시판 목록으로 이동 (또는 방금 작성된 글 상세 페이지)
        const redirectUrl = formData.category === "자유" ? "/community/free" : "/community/qna";
        navigate(redirectUrl);
      }

    } catch (error) {
      console.error("게시글 작성/수정 실패:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 카테고리 선택
      <select
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        className="w-full p-2 border rounded"
      >
        <option value="자유">자유게시판</option>
        <option value="질문">질문게시판</option>
      </select> */}
      <div>카테고리: {formData.category}</div>

      <input
        type="text"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full p-2 border rounded"
        placeholder="제목"
      />
      <textarea
        value={formData.content}
        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        className="w-full p-2 border rounded h-48"
        placeholder="내용을 입력하세요"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {mode === "create" ? "작성하기" : "수정하기"}
      </button>
    </form>
  );
}
