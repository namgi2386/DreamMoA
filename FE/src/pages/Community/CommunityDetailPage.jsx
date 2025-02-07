import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import communityApi from "../../services/api/communityApi";
import { userState } from "../../recoil/atoms/authState";
import Button from "../../components/community/Buttons";
import { useRecoilValue } from "recoil";
import PostContent from "../../components/community/PostContent";
import PostStats from "../../components/community/PostStats";
import CommentSection from "../../components/community/CommentSection";

export default function CommunityDetailPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [post, setPost] = useState(null);
  const currentUser = useRecoilValue(userState);

  const isOwner = post && currentUser?.nickname === post?.userNickname;

  // ✅ `state.sortOption`이 없으면 URL에서 `?sort=` 값 가져오기
  const queryParams = new URLSearchParams(location.search);
  const urlPage = queryParams.get("page") || "1";
  const urlSort = queryParams.get("sort") || "최신순"; // ✅ 기본값 최신순
  const currentPage = location.state?.page !== undefined ? location.state.page : Number(urlPage);
  const currentSort = location.state?.sortOption || urlSort; // ✅ sortOption 유지

  console.log("📌 목록보기 버튼 클릭 시 이동할 페이지:", currentPage, "정렬 기준:", currentSort); // ✅ 디버깅 로그 추가

  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log(`Fetching post with ID: ${postId}`);
        const response = await communityApi.getDetail(postId);
        setPost(response.data);
      } catch (error) {
        console.error("게시글을 불러오는 중 오류 발생:", error);
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return <p className="text-center text-gray-500">게시글을 불러오는 중...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded">
      {/* 제목 + 목록보기 버튼 (우측 상단) */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <Button type="back" category={post.category} page={currentPage} sortOption={currentSort}/> {/* ✅ 현재 페이지 값 전달 */}
      </div>

      <PostContent
        userNickname={post.userNickname}
        createdAt={post.createdAt}
        content={post.content}
      />

      <PostStats postId={postId} likes={post.likes} comments={post.comments} />

      {isOwner && (
        <div className="flex space-x-4 mt-6">
          <Button type="edit" postId={postId} />
          <Button type="delete" postId={postId} onDelete={() => console.log("삭제 기능")} />
        </div>
      )}

      <CommentSection postId={postId} />
    </div>
  );
}
