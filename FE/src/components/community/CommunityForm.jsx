import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import communityApi from "../../services/api/communityApi";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/atoms/authState";
import "react-quill/dist/quill.snow.css";
import "../../components/community/CommunityForm.css";
import ReactQuill from "react-quill";
import { Quill } from "react-quill";
import { ImageActions } from "@xeger/quill-image-actions";
import { ImageFormats } from "@xeger/quill-image-formats";

Quill.register("modules/imageActions", ImageActions);
Quill.register("modules/imageFormats", ImageFormats);

export default function CommunityForm({
  boardCategory,
  initialData,
  mode = "create",
}) {
  const navigate = useNavigate();
  const currentUser = useRecoilValue(userState);

  console.log("현재 로그인된 사용자 정보:", currentUser);

  const [formData, setFormData] = useState(() => ({
    category: initialData?.category || boardCategory || "", 
    title: initialData?.title || "",
    content: initialData?.content || "",
  }));

  useEffect(() => {
    if (mode === "edit" && initialData) {
      console.log("🔄 CommunityForm useEffect - initialData 업데이트됨:", initialData);
      setFormData({
        category: initialData.category || "",
        title: initialData.title || "",
        content: initialData.content || "",
      });
    }
  }, [mode, initialData]);

  console.log("📌 현재 formData:", formData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    try {
      await (mode === "create"
        ? communityApi.create(formData)
        : communityApi.update(initialData.postId, formData));

      if (mode === "edit") {
        navigate(`/community/detail/${initialData.postId}`);
      } else {
        const redirectUrl =
          formData.category === "자유" ? "/community/free" : "/community/qna";
        navigate(redirectUrl);
      }
    } catch (error) {
      console.error("게시글 작성/수정 실패:", error);
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      [{ align: [] }],
      ["clean"],
    ],
    imageActions: {},
    imageFormats: {},
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "height",
    "width",
    "align",
    "float",
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>카테고리: {formData.category}</div>

      <input
        type="text"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full p-2 border rounded"
        placeholder="제목"
      />

      <div className="bg-white border border-gray-300 rounded-lg shadow-md">
        <ReactQuill
          value={formData.content}
          onChange={(content) => setFormData({ ...formData, content })}
          modules={modules}
          formats={formats}
          placeholder="내용을 입력하세요"
          className="custom-quill-editor font-user-input"
        />
      </div>

      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        {mode === "create" ? "작성하기" : "수정하기"}
      </button>
    </form>
  );
}
