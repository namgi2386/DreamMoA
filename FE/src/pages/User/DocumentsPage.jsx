import SideChatbar from "../../components/challenge/run/SideChatbar";
import EndButton from "../../components/challenge/finish/EndButton";
import { Link } from "react-router-dom";
import testlogo from "../../assets/logo/testlogo.png";
import CallThePoliceModal from "../../components/common/modal/CallThePoliceModal";
import { useState } from "react";
import { useRecoilValue } from 'recoil';
import { selectedTagsState } from '/src/recoil/atoms/tags/selectedTagsState';
import TagSelector from "../../components/common/tags/TagSelector";

export default function DocumentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedTags = useRecoilValue(selectedTagsState);
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-10 p-4 flex justify-start">
        <Link to="/">
          <img src={testlogo} alt="로고" className="h-10 w-auto" />
        </Link>
        <Link to="/challenge/create">
          <img src={testlogo} alt="챌린지 만들기" className="h-10 w-auto" />
        </Link>
      </div>
      <EndButton/>
      <SideChatbar/>
      <div className="min-h-screen w-full bg-gray-200 flex flex-col gap-10 items-center justify-center">
        <p>documents</p>


        <CallThePoliceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        reportType="POST" // "POST", "USER", "COMMENT", "CHALLENGE"
        targetId="1" // 여기 api연동 (게시글id,댓글id,챌린지id) 꼭! 게시글먼저쓴뒤에 신고테스트
        />
        <button onClick={() => setIsModalOpen(true)}>
          신고하기테스트버튼
        </button>
        <div>
          <h2>선택된 태그:</h2>
          <div className="flex gap-2">
            {selectedTags.map((tag) => (
              <span 
                key={tag} 
                className="px-2 py-1 bg-blue-500 text-white rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
        <TagSelector/>

      </div>
    </>
  );
}