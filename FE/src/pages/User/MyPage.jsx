import { useRecoilValue, useSetRecoilState  } from 'recoil';
import { userState } from "../../recoil/atoms/authState";
import { motion, AnimatePresence  } from 'framer-motion';
import { useState } from 'react';
import { successModalState } from '/src/recoil/atoms/modalState';

import MyInfoCard from '../../components/mypage/MyInfoCard';
import ChallengeImages from '../../components/mypage/ChallengeImages';
import PasswordVerificationModal from '/src/components/common/modal/PasswordVerificationModal';
import authChangeApi from '../../services/api/authChangeApi';



export default function MyPage() {
  const userInfo = useRecoilValue(userState);
  const [isEditModeState, setIsEditModeState] = useState(false);
  const setSuccessModalState = useSetRecoilState(successModalState);
  const socialLoginDependency = localStorage.getItem('socialLoginDependency');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

// 수정/완료 버튼을 위한 핸들러
const handleEditMode = () => {
  setIsEditModeState(!isEditModeState);  // 현재 상태의 반대값으로 설정
  if (!isEditModeState) {
    // 수정 모드가 아닐 때 (즉, 수정 버튼을 누를 때)
    setIsPasswordModalOpen(true);
  } else {
    // 이미 수정 모드일 때 (즉, 완료 버튼을 누를 때)
    setIsEditModeState(false);
  }
}
//비밀번호 검증 함수
const handlePasswordVerify = async (password) => {
  try {
    const passcheckResponse = await authChangeApi.realCheckPassword(password);
    console.log("응답뭔데",passcheckResponse );
    
    setSuccessModalState({
      isOpen: true,
      message: '비밀번호가 일치합니다!',
      onCancel: () => {
        // 실행 취소 시 수행할 작업
        console.log('작업 취소됨');
      },
      isCancellable: false, // 실행 취소 버튼 표시 여부
    });
    handlePasswordVerified();
  } catch (error) {
    console.error('비밀번호 검증 실패:', error);
    setSuccessModalState({
      isOpen: true,
      message: '비밀번호가 일치하지 않습니다.',
      onCancel: () => {
        // 실행 취소 시 수행할 작업
        console.log('작업 취소됨');
      },
      isCancellable: false, // 실행 취소 버튼 표시 여부
    });
    setIsPasswordModalOpen(false);
    setIsEditModeState(false);
    return;
  }
  console.log('Password verification with:', password);
  
};
// 비밀번호 확인 성공 시 호출될 함수
const handlePasswordVerified = () => {
  setIsPasswordModalOpen(false);
  setIsEditModeState(true);
};

// 취소 버튼을 위한 핸들러
const handleCancel = () => {
  setIsEditModeState(false);  // 항상 false로 설정
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
              {socialLoginDependency==='false' && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className={`relative z-10 px-8 py-2 rounded-full mt-32 duration-300 font-bold tracking-wider text-xl
                    ${isEditModeState ? 'bg-my-yellow bg-opacity-50 text-black hover:bg-opacity-80' : 'bg-my-blue-1 text-white'}`}
                  onClick={handleEditMode}  // 상태에 따라 토글되도록 변경
                >
                  {isEditModeState ? 'completed' : 'edit'}
                </motion.button>
              )}
              
              {socialLoginDependency==='true' && (
                <div className={`relative z-10 px-8 py-1 my-1 rounded-full mt-32 font-bold tracking-wider text-xl cursor-default bg-gray-100`}>
                  Social Mode
                </div>
              )} 

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
                    onClick={handleCancel}  // 취소 버튼용 핸들러 사용
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
          {/* <div id="공통모달 successbutton 테스트용" className="flex justify-between">
            <button onClick={() => handleSuccess(true)} className="bg-green-100 p-1 mt-2">Test for success Button</button>
            <button onClick={() => handleSuccess(false)} className="bg-green-100 p-1 mt-2">Test for success Button2</button>
          </div> */}
        </div>
      </div>
      {/* 비밀번호 검증 모달 */}
      <PasswordVerificationModal
        isOpen={isPasswordModalOpen}
        onClose={() => {
          setIsPasswordModalOpen(false);
          setIsEditModeState(false);  // edit 모드도 함께 해제
        }}
        onVerify={handlePasswordVerify}
      />
    </>
  );
}