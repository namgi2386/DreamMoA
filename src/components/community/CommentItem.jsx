import React, { useState } from "react";
import { userState } from "../../recoil/atoms/authState";
import communityApi from "../../services/api/communityApi";
import { useRecoilValue } from "recoil";

export default function CommentItem({ comment, postId, fetchComments, depth }) {
  const {
    commentId,
    nickname,
    content,
    createdAt,
    updatedAt,
    parentCommentId,
    replies,
  } = comment;

  const currentUser = useRecoilValue(userState);
  const isOwner = currentUser?.nickname === nickname;

  // 부모 댓글이 삭제되었을 경우의 표시
  const isDeleted = content === "댓글이 삭제되었습니다";

  console.log("현재 사용자:", currentUser);
  console.log("댓글 작성자 닉네임:", nickname);
  console.log("isOwner 값:", isOwner);

  // 수정/답글 모드 토글
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

  // 수정 시 사용할 댓글 내용
  const [editContent, setEditContent] = useState(content);
  // 대댓글 작성 시 사용할 입력값
  const [replyContent, setReplyContent] = useState("");

  // 댓글 수정 처리
  const handleUpdateComment = async () => {
    if (!editContent.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }
    try {
      await communityApi.updateComment(postId, commentId, {
        content: editContent,
      });
      setIsEditing(false);
      fetchComments(); // 업데이트 후 재조회
    } catch (error) {
      console.error("댓글 수정 실패:", error);
      alert("댓글 수정에 실패했습니다.");
    }
  };

  // 댓글 삭제 처리
  const handleDeleteComment = async () => {
    if (!window.confirm("정말 이 댓글을 삭제하시겠습니까?")) return;
    try {
      await communityApi.deleteComment(postId, commentId);
      fetchComments(); // 삭제 후 재조회
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
      alert("댓글 삭제에 실패했습니다.");
    }
  };

  // 대댓글 작성 처리
  const handleReplyComment = async () => {
    if (!replyContent.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }
    try {
      await communityApi.createComment(postId, {
        content: replyContent,
        parentCommentId: commentId, // 이 댓글의 자식
      });
      setReplyContent("");
      setIsReplying(false);
      fetchComments(); // 새로 작성 후 재조회
    } catch (error) {
      console.error("대댓글 작성 실패:", error);
      alert("대댓글 작성에 실패했습니다.");
    }
  };

  // '답글 달기' 버튼은 parentCommentId가 없는 경우에만 노출 (대댓글에는 달 수 없음)
  const showReplyButton = !parentCommentId;

  return (
    <div
      className="border-l border-gray-300 pl-4"
      style={{ marginLeft: depth * 10 }} // depth에 따라 왼쪽 들여쓰기
    >
      <div className="bg-gray-100 p-3 rounded">
        {/* 댓글 작성자 + 작성 시간 */}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-bold">{nickname}</span>{" "}
            <span className="text-sm text-gray-500">
              {createdAt?.slice(0, 10)} {createdAt?.slice(11, 16)}
              {updatedAt && updatedAt !== createdAt && (
                <span className="text-xs text-gray-400 ml-1">(수정됨)</span>
              )}
            </span>
          </div>

          {/* 본인이 작성한 댓글일 경우에만 수정/삭제 버튼 표시 */}
          {isOwner && (
            <div className="space-x-2 text-sm">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="inline-flex items-center hover:text-gray-800 transition"
              >
                ✎ 수정
              </button>
              <button
                onClick={handleDeleteComment}
                className="inline-flex items-center hover:text-gray-800 transition"
              >
                🗑 삭제
              </button>
            </div>
          )}
        </div>

        {/* 부모 댓글이 삭제된 경우 메시지 표시 */}
        {isDeleted ? (
          // ✅ (1) 댓글이 삭제되었을 때
          <p className="mt-2 text-gray-500 italic">댓글이 삭제되었습니다</p>
        ) : isEditing ? (
          // ✅ (2) 수정 중일 때
          <div className="mt-2">
            <textarea
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              rows={2}
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
            <div className="mt-1 space-x-2">
              <button
                onClick={handleUpdateComment}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                저장
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditContent(content);
                }}
                className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                취소
              </button>
            </div>
          </div>
        ) : (
          // ✅ (3) 일반 상태 (삭제도 아니고 수정 중도 아님)
          <p className="mt-2">{content}</p>
        )}

        {/* 대댓글 버튼 */}
        {!isEditing && showReplyButton && (
          <div className="flex items-center space-x-2 mt-2">
            <button
              onClick={() => setIsReplying(!isReplying)}
              className="text-sm text-blue-500 hover:underline"
            >
              답글 달기
            </button>
          </div>
        )}

        {/* 대댓글 작성 폼 */}
        {isReplying && showReplyButton && (
          <div className="mt-2">
            <textarea
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              rows={2}
              placeholder="대댓글을 작성하세요."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
            />
            <div className="mt-1 space-x-2">
              <button
                onClick={handleReplyComment}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                등록
              </button>
              <button
                onClick={() => {
                  setIsReplying(false);
                  setReplyContent("");
                }}
                className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                취소
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 자식 댓글(대댓글) 목록을 재귀적으로 렌더링 */}
      {replies && replies.length > 0 && (
        <div className="mt-2 space-y-2">
          {replies.map((reply) => (
            <CommentItem
              key={reply.commentId}
              comment={reply}
              postId={postId}
              fetchComments={fetchComments}
              depth={depth + 1} // 깊이를 1 증가
            />
          ))}
        </div>
      )}
    </div>
  );
}
