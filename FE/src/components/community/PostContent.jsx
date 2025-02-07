//게시글의 제목, 작성자 정보, 본문 내용 표시
import DOMPurify from "dompurify";

export default function PostContent({
  title,
  userNickname,
  createdAt,
  content,
}) {
  return (
    <>
      {/* 제목 */}
      <h1 className="text-2xl font-bold">{title}</h1>

      {/* 작성자 & 날짜 */}
      <div className="text-sm text-gray-500 mt-2">
        작성자: {userNickname} • {new Date(createdAt).toLocaleString()}
      </div>

      {/* 본문 내용 */}
      <div
        className="mt-4 text-gray-700 text-xl font-normal not-italic"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(content).replace(/<i>|<\/i>|<em>|<\/em>/g, ""),
        }}
      ></div>
    </>
  );
}
