import { useRecoilValue } from 'recoil';
import { communityListState } from '../../recoil/atoms/communityState';
import CommunityItem from './CommunityItem';

export default function CommunityList() {
  const posts = useRecoilValue(communityListState);
  console.log('posts:', posts);

  return (
    <div className="space-y-4">
      {posts.map(post => (
        <CommunityItem key={post.postId} post={post} />
        
      ))}
    </div>
  );
}