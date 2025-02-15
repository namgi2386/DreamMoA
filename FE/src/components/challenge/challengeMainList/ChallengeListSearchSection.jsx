import { useEffect, useState } from "react";
import challengeApi from "../../../services/api/challengeApi";
import { tagApi } from "../../../services/api/tagApi";
import { IoSearch } from "react-icons/io5";
import { X } from 'lucide-react';
import { useRecoilState } from 'recoil';
import { 
  searchForChallengeInputState,
  popularChallengesState, 
  runningChallengesState, 
  recruitingChallengesState,
  searchForChallengeTagState, 
} from '../../../recoil/atoms/challenge/challengeListState';


export default function ChallengeListSearchSection() {
  // 챌린지 목록 상태 관리
  const [inputValue, setInputValue] = useRecoilState(searchForChallengeInputState);
  const [popularChallenges, setPopularChallenges] = useRecoilState(popularChallengesState);
  const [runningChallenges, setRunningChallenges] = useRecoilState(runningChallengesState);
  const [recruitingChallenges, setRecruitingChallenges] = useRecoilState(recruitingChallengesState);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [myTags, setMyTags] = useRecoilState(searchForChallengeTagState);

  // 챌린지 데이터 가져오기
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        tagApi.getUserTags()
        const storedTags = localStorage.getItem('selectedTags'); // 내태그
        if (storedTags) {
          const parsedTags = JSON.parse(storedTags);
          setMyTags(parsedTags);
          // parsedTags를 직접 사용하여 API 호출
          const response = await challengeApi.getSearchedChallenges(
            inputValue || '',           // keyword parameter
            parsedTags.length > 0 ? parsedTags.join(',') : undefined  // tags parameter 태그가 없으면 undefined
          );
          console.log(response.data.popularChallenges);
          
          setPopularChallenges(response.data.popularChallenges);
          setRunningChallenges(response.data.runningChallenges);
          setRecruitingChallenges(response.data.recruitingChallenges);
        }
      } catch (err) {
        setError('챌린지 목록을 불러오는데 실패했습니다.');
        console.log("챌린지목록 불러오기실패:",err);
      } finally {
        setLoading(false);
      }
    };
    fetchChallenges();
  }, []);

  // if (loading) {
  //   return (
  //     <div className="min-h-screen w-full bg-rose-200 flex items-center justify-center">
  //       <p className="text-lg">로딩 중...</p>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="relative flex  flex-col w-full h-60 cursor-default mt-5 justify-center items-center">
  //       <p className="text-lg text-red-600">{error}</p>
  //     </div>
  //   );
  // }

  // 검색 버튼 클릭 핸들러
  const handleSearchClick = async () => {
    try {
      setLoading(true); // 로딩 상태 시작
      
      const storedTags = localStorage.getItem('selectedTags');
      const parsedTags = storedTags ? JSON.parse(storedTags) : [];
      
      // API 호출
      const response = await challengeApi.getSearchedChallenges(
        inputValue || undefined,           // 입력값이 있을 때만 전송
        parsedTags.length > 0 ? parsedTags.join(',') : undefined  // 태그가 있을 때만 전송
      );
      
      // 결과 업데이트
      setPopularChallenges(response.data.popularChallenges);
      setRunningChallenges(response.data.runningChallenges);
      setRecruitingChallenges(response.data.recruitingChallenges);  
      
    } catch (err) {
      setError('챌린지 검색에 실패했습니다.');
      console.log("챌린지 검색 실패:", err);
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
  };

  const ClickSearchClearButton = () => {
    setInputValue('')
  }

  useEffect(() => {
    if(inputValue === '') {
      handleSearchClick()
    }
  }, [inputValue])

  return (
    <>
      <div className="relative flex  flex-col w-full h-60 cursor-default mt-5">
        {/* 왼쪽 Start Your Challenge 섹션 */}
        <div className="flex">
          <div className="flex bg-my-blue-1 px-4 h-10 justify-between items-center w-full  rounded-lg transition-all duration-300 ">
            <div className=" w-full mr-1 flex gap-1 items-center text-white">
              <IoSearch className="text-xl"/>
              <input type="text"   
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="bg-my-blue-1 focus:outline-none min-w-0 text-white border rounded-sm border-gray-600 py-0.5 flex-shrink w-full" 
              />
            </div>
            <button onClick={ClickSearchClearButton} className=" hover:rotate-90 transition-transform duration-300 text-white "><X size={24} /></button>
          </div>
          <div className="w-80 md:w-60 transition-all duration-300">

          </div>
        </div>

        {/* 오른쪽 카드 영역 (임시 검은색 배경) */}
        <div className="flex-1 bg-[#FEFDD5] rounded-r-lg mr-1 text-white 
          opacity-0 sm:opacity-100 invisible sm:visible transition duration-800 overflow-hidden"> {/* overflow-auto를 overflow-hidden으로 변경 */}
          <div className="w-full h-full flex items-center">
            <div>asdasd</div>
          </div>
        </div>

        {/* Create 버튼 */}
        <div className="absolute -top-0 right-0 flex justify-center items-center bg-white rounded-t-lg rounded-bl-lg pr-1 transition duration-300">
          <button
            onClick={handleSearchClick}
            className=" bg-gradient-to-b from-hmy-blue-1 to-hmy-blue-2 text-white text-2xl px-12 py-6 rounded-lg hover:bg-hmy-blue-1 transition-colors "
          >
            search
            {/* {loading ? 'loadin':'search'}
            {!loading && error ? error:''} */}
          </button>
        </div>
      </div>
    </>
  );
};