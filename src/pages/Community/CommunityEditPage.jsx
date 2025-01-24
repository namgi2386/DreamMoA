import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil'; // useRecoilValue에서 변경
import { communityDetailState } from '../../recoil/atoms/communityState';
import CommunityForm from '../../components/community/CommunityForm';
import communityApi from '../../services/api/communityApi';

export default function CommunityEditPage() {
  const { id } = useParams();
  const [post, setPost] = useRecoilState(communityDetailState); // useRecoilValue에서 변경

  useEffect(() => {
    const fetchPost = async () => {
      if (!post) {
        const response = await communityApi.getDetail(id);
        setPost(response.data);
      }
    };
    fetchPost();
  }, [id, post, setPost]);

  if (!post) return null;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">글 수정</h1>
      <CommunityForm initialData={post} mode="edit" />
    </div>
  );
}