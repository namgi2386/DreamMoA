import { useRecoilValue, useSetRecoilState  } from 'recoil';
import { userState } from "../../recoil/atoms/authState";
import { motion, AnimatePresence  } from 'framer-motion';
import { useState } from 'react';
import { successModalState } from '/src/recoil/atoms/modalState';

import MyInfoCard from '../../components/mypage/MyInfoCard';
import ChallengeImages from '../../components/mypage/ChallengeImages';


export default function MyPage() {
  const userInfo = useRecoilValue(userState);
  const [isEditModeState, setIsEditModeState] = useState(false);
  const setSuccessModalState = useSetRecoilState(successModalState);

  const isEditMode = () => {
    setIsEditModeState(prev => !prev);
  }

  const handleSuccess = (isCancellable) => {
    // 작업 완료 후
    setSuccessModalState({
      isOpen: true,
      message: "버튼이 눌렸습니다!",
      onCancel: () => {
        // 실행 취소 시 수행할 작업
        console.log('작업 취소됨');
      },
      isCancellable: Boolean(isCancellable), // 실행 취소 버튼 표시 여부
    });
  };

  return (
    <>
      <div className="bg-white">
        <div className={`max-w-5xl mx-auto pt-4 pb-20 min-h-screen px-20 bg-white`}>
          
          {/* 헤더 섹션 */}
          <div className="relative flex justify-between items-center pb-2">
            <h1 className="text-6xl font-bold mb-8">
              <span className="text-my-blue-4">{userInfo.nickname}</span>
              <span className="text-my-blue-1">&apos;s page</span>
            </h1>
            
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className={`relative z-10 px-8 py-2 rounded-full mt-32 duration-300 font-bold tracking-wider text-xl
                  ${isEditModeState ? 'bg-my-yellow bg-opacity-50 text-black hover:bg-opacity-80' : 'bg-my-blue-1 text-white'}`}
                onClick={() => isEditMode()}
              >
                {isEditModeState ? 'completed' : 'edit'}
              </motion.button>

              <AnimatePresence>
                {isEditModeState && (
                  <motion.button
                    initial={{ x: 0, opacity: 0 }}
                    whileHover={{ scale: 1.05 }}
                    animate={{ x: -180, opacity: 1 }}
                    exit={{ x: 0, opacity: 0 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                      delay: 0.1
                    }}
                    className="absolute z-0 right-0 top-32 px-8 py-2 rounded-full font-bold tracking-wider text-xl
                      bg-gray-200 text-gray-700"
                    onClick={() => isEditMode()}
                  >
                    cancel
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          {/* 나의 정보 섹션 */}
          <MyInfoCard isEditMode={isEditModeState} />

          {/* 챌린지 섹션 */}
          <h1 className={`ml-4 mt-20 mb-4 bg-my-yellow px-4 py-2 rounded-xl  cursor-pointer transition-all duration-300 font-bold tracking-wider
                        text-xl w-32 text-center hover:bg-my-yellow text-gray-900 bg-opacity-40 hover:bg-opacity-60  `}>challenge</h1>
          <ChallengeImages/>
          <div id="공통모달 successbutton 테스트용" className="flex justify-between">
            <button onClick={() => handleSuccess(true)} className="bg-green-100 p-1 mt-2">Test for success Button</button>
            <button onClick={() => handleSuccess(false)} className="bg-green-100 p-1 mt-2">Test for success Button2</button>
          </div>
        </div>
      </div>
      
    </>
  );
}