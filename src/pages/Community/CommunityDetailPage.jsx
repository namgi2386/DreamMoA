import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { communityDetailState } from '../../recoil/atoms/communityState';
import communityApi from '../../services/api/communityApi';

export default function CommunityDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useRecoilState(communityDetailState);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await communityApi.getDetail(id);
      setPost(response.data);
    };
    fetchPost();
  }, [id, setPost]);

  const handleDelete = async () => {
    await communityApi.delete(id);
    navigate('/community/list');
  };

  if (!post) return null;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1>detail</h1>
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <div className="mb-4 text-gray-600">{post.content}</div>
      <div>
        글 작성자 번호 : {post.userId}
      </div>
      <div>
        현재 접속자 번호 : 아직 못찾음 (유저정보조회기능 구현 후 본인글 아니면 수정버튼 안보이도록 수정할 예정)
      </div>
      <div className="flex justify-end space-x-2">
        <div >
        <button onClick={() => navigate(`/community/edit/${id}`)} 
                className="px-4 py-2 bg-gray-500 text-white rounded">
          수정
        </button>
        <button onClick={handleDelete} 
                className="px-4 py-2 bg-red-500 text-white rounded">
          삭제
        </button>
        </div>
      </div>
    </div>
  );
}