import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { Link } from 'react-router-dom';
import { communityListState } from '../../recoil/atoms/communityState';
import CommunityList from '../../components/community/CommunityList';
import communityApi from '../../services/api/communityApi';



export default function CommunityListPage() {
  const setPosts = useSetRecoilState(communityListState);

  useEffect(() => {
    const fetchPosts = async () => {
      console.log("커뮤니티 api 요청 보내기");
      
      const response = await communityApi.getList();
      console.log("응답도착" + response);
      
      setPosts(response.data);
    };
    fetchPosts();
  }, [setPosts]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">커뮤니티</h1>
        <Link to="/community/write" className="px-4 py-2 bg-blue-500 text-white rounded">
          글쓰기
        </Link>
      </div>
      <CommunityList />
    </div>
  );
}