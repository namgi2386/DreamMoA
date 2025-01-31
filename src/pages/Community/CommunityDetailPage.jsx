import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import communityApi from "../../services/api/communityApi";
import { userState } from "../../recoil/atoms/authState";
import Buttons from "../../components/community/Buttons";
import { useRecoilValue } from "recoil";
import PostContent from "../../components/community/PostContent";
import PostStats from "../../components/community/PostStats";
import CommentSection from "../../components/community/CommentSection";

export default function CommunityDetailPage() {
  const { postId } = useParams(); // URL에서 postId 가져오기
  console.log("postId:", postId);
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  
  const currentUser = useRecoilValue(userState); // ✅ 로그인한 사용자 정보 가져오기

  console.log("현재 Recoil userState 값:", currentUser);

  // ✅ 로그인한 사용자 닉네임과 게시글 작성자의 닉네임 비교
  const isOwner = post && currentUser?.nickname === post?.userNickname;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log(`Fetching post with ID: ${postId}`);
        const response = await communityApi.getDetail(postId);
        console.log("응답 데이터:", response.data);
        setPost(response.data);
      } catch (error) {
        console.error("게시글을 불러오는 중 오류 발생:", error);
      }
    };

    fetchPost();
  }, [postId]);

  // ✅ 게시글 삭제 함수 (삭제 후 해당 게시판 목록으로 이동)
  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await communityApi.delete(postId);  // API 요청
        alert("게시글이 삭제되었습니다.");

        // ✅ 카테고리에 따라 다른 경로로 이동
        if (post.category === "자유") {
          navigate("/community/free"); // 자유게시판으로 이동
        } else if (post.category === "질문") {
          navigate("/community/qna"); // 질문게시판으로 이동
        } 
      } catch (error) {
        console.error("게시글 삭제 실패:", error);
      }
    }
  };


  // ✅ 디버깅 로그
  console.log("현재 로그인한 사용자 닉네임:", currentUser?.nickname);
  console.log("게시글 작성자 닉네임:", post?.userNickname);
  console.log("isOwner 값:", isOwner);


  if (!post) {
    return <p className="text-center text-gray-500">게시글을 불러오는 중...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded">
      <PostContent
        title={post.title}
        userNickname={post.userNickname}
        createdAt={post.createdAt}
        content={post.content}
      />

      <PostStats likes={post.likes} comments={post.comments} />

      {/* 로그인한 사용자가 작성한 글일 경우에만 수정/삭제 버튼 표시 */}
      {isOwner && <Buttons postId={postId} onDelete={handleDelete} />}

      <CommentSection />
    </div>
  );
}
