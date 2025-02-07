import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil'; // useRecoilValue에서 변경
import { communityDetailState } from '../../recoil/atoms/communityState';
import CommunityForm from '../../components/community/CommunityForm';
import communityApi from '../../services/api/communityApi';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

console.log("CommunityEditPage 렌더링");

export default function CommunityEditPage() {
  console.log("CommunityEditPage 렌더링");

  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await communityApi.getDetail(id);
      console.log("CommunityEditPage - Fetched post:", response.data); // 응답 전체 로그 찍기
      setPost(response.data);
    };
    fetchPost();
  }, [id]);

  if (!post) return null;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">글 수정</h1>
      <CommunityForm key={post.postId} initialData={post} mode="edit" />
    </div>
  );
}