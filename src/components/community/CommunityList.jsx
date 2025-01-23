import { useRecoilValue } from 'recoil';
import { communityListState } from '../../recoil/atoms/communityState';
import CommunityItem from './CommunityItem';

export default function CommunityList() {
  const posts = useRecoilValue(communityListState);

  return (
    <div className="space-y-4">
      {posts.map(post => (
        <CommunityItem key={post.id} post={post} />
      ))}
    </div>
  );
}