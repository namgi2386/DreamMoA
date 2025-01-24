import { Link } from 'react-router-dom';

export default function CommunityItem({ post }) {
  return (
    <Link to={`/community/detail/${post.postId}`}>
      <div className="p-4 border rounded-lg hover:bg-gray-50">
        <h3 className="text-sm font-semibold">{post.userNickname}</h3>
        <h3 className="text-sm font-semibold">{post.category}</h3>
        <h3 className="text-lg font-semibold">{post.title}</h3>
        <div className="mt-2 text-gray-600">{post.content}</div>
        <div className="mt-2 text-sm text-gray-500">
          <span>{post.author}</span>
          <span className="mx-2">·</span>
          <span>{post.createdAt}</span>
        </div>
      </div>
    </Link>
  );
}