import { useRecoilValue } from 'recoil';
import { userState } from "../../recoil/atoms/authState";
import { motion } from 'framer-motion';

import defaultUserImageOrange from '/src/assets/default/defaultUserImageOrange.png' //기본프로필필이미지
import ChallengeImages from '../../components/mypage/ChallengeImages';

const totalBackGroundColor = "bg-white"
const tagBodyStyles = 'flex items-center gap-12'
const tagTitleStyles = `bg-my-blue-3 px-4 py-2 rounded-xl  cursor-pointer transition-all duration-300
                        text-xl w-32 text-center hover:bg-my-yellow text-gray-900 hover:bg-opacity-30`
const tagContentStyles = 'text-gray-800 cursor-pointer text-xl'


export default function MyPage() {
  const userInfo = useRecoilValue(userState);

  return (
    <>
      <div className={`${totalBackGroundColor}`}>
        <div className={`max-w-5xl mx-auto pt-4 pb-20 min-h-screen px-20 ${totalBackGroundColor}`}>
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
          {/* 카드 섹션*/}
          <div className={`flex flex-col lg:flex-row gap-8 lg:gap-16
                        border border-2 border-gray-300 p-1 ${totalBackGroundColor} 
                        rounded-3xl cursor-pointer`}>
            {/* 왼쪽 이미지 */}
              <div className="h-72 rounded-3xl overflow-hidden w-full lg:w-72  aspect-square flex-shrink-0 duration-500">
                <img src={`${userInfo.profilePictureUrl ? userInfo.profilePictureUrl : defaultUserImageOrange }`} 
                  alt="Profile" className="w-full h-full object-cover
                  transition-transform duration-500 hover:scale-110" />
              </div>
            {/* 오른쪽 개인정보들 */}
            <div className="flex-1 py-3 ">
              <div className="flex flex-col h-full justify-between py-8 gap-8 lg:gap-0">
                {/* 이름 */}
                <div className={`${tagBodyStyles}`}>
                  <span className={`${tagTitleStyles}`}>
                    name
                  </span>
                  <span className={`${tagContentStyles}`}>{userInfo.name}</span>
                </div>

                {/* 닉네임 */}
                <div className={`${tagBodyStyles}`}>
                  <span className={`${tagTitleStyles}`}>
                    nickname
                  </span>
                  <span className={`${tagContentStyles}`}>{userInfo.nickname}</span>
                </div>

                {/* 이메일 */}
                <div className={`${tagBodyStyles}`}>
                  <span className={`${tagTitleStyles}`}>
                    email
                  </span>
                  <span className={`${tagContentStyles}`}>{userInfo.email}</span>
                </div>

              </div>
            </div>
          </div>
          {/* 챌린지 섹션 */}
          <h1 className={`ml-4 mt-20 mb-4 bg-my-yellow px-4 py-2 rounded-xl  cursor-pointer transition-all duration-300
                        text-xl w-32 text-center hover:bg-my-yellow text-gray-900 bg-opacity-40 hover:bg-opacity-60  `}>challenge</h1>
          <ChallengeImages/>
        </div>
      </div>
    </>
  );
}