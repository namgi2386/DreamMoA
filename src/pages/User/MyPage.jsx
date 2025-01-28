import { useRecoilValue } from 'recoil';
import { userState } from "../../recoil/atoms/authState";
import { motion } from 'framer-motion';

import MyInfoCard from '../../components/mypage/MyInfoCard';
import ChallengeImages from '../../components/mypage/ChallengeImages';

export default function MyPage() {
  const userInfo = useRecoilValue(userState);

  return (
    <>
      <div className="bg-white">
        <div className={`max-w-5xl mx-auto pt-4 pb-20 min-h-screen px-20 bg-white`}>
          
          {/* 헤더 섹션 */}
          <div className="flex justify-between items-center  cursor-pointer pb-2">
            <h1 className="text-6xl font-bold mb-8">
              <span className="text-my-blue-4">{userInfo.nickname}</span>
              <span className="text-my-blue-1">&apos;s page</span>
            </h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-my-blue-1 text-white px-8 py-2 rounded-full mt-32"
            >
              edit
            </motion.button>
          </div>
          
          {/* 나의 정보 섹션 */}
          <MyInfoCard/>

          {/* 챌린지 섹션 */}
          <h1 className={`ml-4 mt-20 mb-4 bg-my-yellow px-4 py-2 rounded-xl  cursor-pointer transition-all duration-300
                        text-xl w-32 text-center hover:bg-my-yellow text-gray-900 bg-opacity-40 hover:bg-opacity-60  `}>challenge</h1>
          <ChallengeImages/>
        </div>
      </div>
    </>
  );
}