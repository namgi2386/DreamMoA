import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/atoms/authState";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import MyInfoCard from "../../components/mypage/MyInfoCard";
import ChallengeImages from "../../components/mypage/ChallengeImages";
import PasswordVerificationModal from "/src/components/common/modal/PasswordVerificationModal";
import authChangeApi from "../../services/api/authChangeApi";

import EditableTagList from "../../components/common/tags/EdittableTagList";

export default function MyPage() {
  const userInfo = useRecoilValue(userState);
  const [isEditModeState, setIsEditModeState] = useState(false);
  const [isEdittagState, setIsEdittagState] = useState(false);
  const socialLoginDependency = localStorage.getItem("socialLoginDependency");
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(1);

  // 수정/완료 버튼을 위한 핸들러
  const handleEditMode = () => {
    if (!isEditModeState) {
      // 수정 모드가 아닐 때 (즉, 수정 버튼을 누를 때)
      setIsPasswordModalOpen(true);
      if (isVerified === 2) {
        setIsEditModeState(!isEditModeState); // 현재 상태의 반대값으로 설정
      }
    } else {
      // 이미 수정 모드일 때 (즉, 완료 버튼을 누를 때)
      setIsEditModeState(!isEditModeState); // 현재 상태의 반대값으로 설정
      setIsVerified(1);
      setIsEditModeState(false);
    }
  };
  //비밀번호 검증 함수
  const handlePasswordVerify = async (password) => {
    try {
      const passcheckResponse = await authChangeApi.realCheckPassword(password);
      console.log("응답뭔데", passcheckResponse);
      setIsVerified(2);
      handlePasswordVerified();
    } catch (error) {
      console.error("비밀번호 검증 실패:", error);
      setIsVerified(3);
      setIsEditModeState(false);
      return;
    }
    console.log("Password verification with:", password);
  };
  // 비밀번호 확인 성공 시 호출될 함수
  const handlePasswordVerified = () => {
    setIsPasswordModalOpen(false);
    setIsEditModeState(true);
  };

  // 취소 버튼을 위한 핸들러
  const handleCancel = () => {
    setIsEditModeState(false); // 항상 false로 설정
  };

  // tag 수정/완료 버튼을 위한 핸들러
  const handleEdittag = () => {
    if (!isEdittagState) {
      // 수정 모드가 아닐 때 (즉, 수정 버튼을 누를 때)
      setIsEdittagState(!isEdittagState); // 현재 상태의 반대값으로 설정
      console.log("수정모드 아닐때");
    } else {
      // 이미 수정 모드일 때 (즉, 완료 버튼을 누를 때)
      setIsEdittagState(!isEdittagState); // 현재 상태의 반대값으로 설정
      setIsEdittagState(false);
    }
    console.log("태그 수정모드", isEdittagState);
  };

  // 취소 버튼을 위한 핸들러
  const handleCanceltag = () => {
    setIsEdittagState(false); // 항상 false로 설정
  };

  return (
    <>
      <div className="bg-white">
        <div
          className={`max-w-5xl mx-auto pt-4 pb-20 min-h-screen px-20 bg-white`}
        >
          {/* 헤더 섹션 */}
          <div className="relative flex justify-between items-center pb-2">
            <h1 className="text-6xl font-bold mb-8">
              <span className="text-my-blue-4">{userInfo.nickname}</span>
              <span className="text-my-blue-1">&apos;s page</span>
            </h1>

            <div className="relative">
              {socialLoginDependency === "false" && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className={`relative z-10 px-8 py-2 rounded-full mt-32 duration-300 font-bold tracking-wider text-xl
                    ${
                      isEditModeState
                        ? "bg-my-yellow bg-opacity-50 text-black hover:bg-opacity-80"
                        : "bg-my-blue-1 text-white"
                    }`}
                  onClick={handleEditMode} // 상태에 따라 토글되도록 변경
                >
                  {isEditModeState ? "completed" : "edit"}
                </motion.button>
              )}

              {socialLoginDependency === "true" && (
                <div
                  className={`relative z-10 px-8 py-1 my-1 rounded-full mt-32 font-bold tracking-wider text-xl cursor-default bg-gray-100`}
                >
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
                      delay: 0.1,
                    }}
                    className="absolute z-0 right-0 top-32 px-8 py-2 rounded-full font-bold tracking-wider text-xl
                      bg-gray-200 text-gray-700"
                    onClick={handleCancel} // 취소 버튼용 핸들러 사용
                  >
                    cancel
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* 나의 정보 섹션 */}
          <MyInfoCard
            isEditMode={isEditModeState}
            setIsEditModeState={setIsEditModeState}
            isVerified={isVerified}
            setIsVerified={setIsVerified}
          />

          {/* 관심 태그 섹션 */}
          <div className="flex justify-between items-center mt-20 mb-4">
            <h1
              className="bg-blue-200 px-4 py-2 rounded-xl cursor-pointer transition-all duration-300 font-bold tracking-wider
              text-xl w-32 text-center text-gray-900 bg-opacity-30 hover:bg-opacity-60"
            >
              관심 태그
            </h1>

            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className={`relative z-10 px-8 py-2 rounded-full duration-300 font-bold tracking-wider text-xl
        ${
          isEdittagState
            ? "bg-my-yellow bg-opacity-50 text-black hover:bg-opacity-80"
            : "bg-my-blue-1 text-white"
        }`}
                onClick={handleEdittag}
              >
                {isEdittagState ? "completed" : "edit"}
              </motion.button>

              <AnimatePresence>
                {isEdittagState && (
                  <motion.button
                    initial={{ x: 0, opacity: 0 }}
                    whileHover={{ scale: 1.05 }}
                    animate={{ x: -180, opacity: 1 }}
                    exit={{ x: 0, opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                      delay: 0.1,
                    }}
                    className="absolute z-0 right-0 top-0 px-8 py-2 rounded-full font-bold tracking-wider text-xl
            bg-gray-200 text-gray-700"
                    onClick={handleCanceltag}
                  >
                    cancel
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
          <EditableTagList
            isEdittag={isEdittagState}
            setIsEdittag={setIsEdittagState}
          />
          {/* 챌린지 섹션 */}
          <h1
            className={`ml-4 mt-20 mb-4 bg-blue-200 px-4 py-2 rounded-xl  cursor-pointer transition-all duration-300 font-bold tracking-wider
                        text-xl w-32 text-center text-gray-900 bg-opacity-30 hover:bg-opacity-60  `}
          >
            challenge
          </h1>
          <ChallengeImages />
        </div>
      </div>
      {/* 비밀번호 검증 모달 */}
      <PasswordVerificationModal
        isOpen={isPasswordModalOpen}
        onClose={() => {
          setIsPasswordModalOpen(false);
          setIsEditModeState(false); // edit 모드도 함께 해제
        }}
        onVerify={handlePasswordVerify}
        isVerified={isVerified}
        setIsVerified={setIsVerified}
      />
    </>
  );
}
