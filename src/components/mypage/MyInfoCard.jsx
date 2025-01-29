import { useRecoilValue } from 'recoil';
import { userState } from "../../recoil/atoms/authState";
import { motion, AnimatePresence } from "framer-motion";

import defaultUserImageOrange from '/src/assets/default/defaultUserImageOrange.png'
import { useEffect, useState } from 'react';

const totalBackGroundColor = "bg-white"
const tagBodyStyles = 'flex items-center gap-12'
const tagTitleStyles = `bg-my-blue-3 px-4 py-2 rounded-xl  cursor-pointer transition-all duration-300
                        text-xl w-32 text-center hover:bg-my-yellow text-gray-900 hover:bg-opacity-30`
const tagContentStyles = 'text-gray-800 cursor-pointer text-xl'

export default function MyInfoCard({ isEditMode }) {
  const userInfo = useRecoilValue(userState);
  const [inputValue , setInputValue] = useState(null);

  const handleDuplicateCheck = (inputValue) => {
    console.log(inputValue);
  };
  useEffect(() => {
    setInputValue(null)
  },[isEditMode])

  return (
    <>
      {/* 카드 섹션*/}
      <div className={`flex flex-col lg:flex-row gap-8 lg:gap-16
                    border border-2 border-gray-300 p-1 ${totalBackGroundColor} 
                    rounded-3xl `}>
        {/* 왼쪽 이미지 */}
          <div className="h-72 rounded-3xl overflow-hidden w-full lg:w-72  aspect-square flex-shrink-0 duration-500">
            <img src={`${userInfo.profilePictureUrl ? userInfo.profilePictureUrl : defaultUserImageOrange }`} 
              alt="Profile" className="w-full h-full object-cover
              transition-transform duration-500 hover:scale-110" />
          </div>
        
        {/* 오른쪽 개인정보들 */}
        <AnimatePresence mode="wait">
          {!isEditMode ? (
          <motion.div
            key="edit"
            className="flex-1 py-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <div className="flex flex-col h-full justify-between py-8 gap-8 lg:gap-0 ">
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
          </motion.div>
        ) : (
          <motion.div
            key="view"
            className="flex-1 py-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <div className="flex flex-col h-full justify-between py-2 gap-8 lg:gap-0 ">
              {/* 이름 */}
              <div className={`${tagBodyStyles} bg-gray-300 rounded-xl mr-3 hover:bg-gray-400 duration-300 cursor-pointer`}>
                <span className={` px-4 py-2 rounded-xl  cursor-pointer transition-all duration-300
                        text-xl w-32 text-center text-gray-900  `}>
                  name
                </span>
                <span className={`${tagContentStyles} `}>{userInfo.name}</span>
              </div>
              {/* 닉네임 */}
              <div className={`flex items-center pr-3  w-full justify-between `}>
                <div className="flex items-center gap-12 text-xl border border-4 hover:border-my-blue-4 focus-within:border-my-blue-4 w-full mr-8 pr-3 rounded-xl  text-gray-900  transition-all duration-300">
                  <span className={` text-center w-32  px-4 py-2 cursor-pointer`}>
                    nickname
                  </span>
                  <input type="text" placeholder={userInfo.nickname} className={` w-full focus:outline-none`}
                    onChange={(e) => setInputValue(e.target.value)}/>
                </div>
                <span className={`bg-gray-300 px-4 py-2 rounded-xl  cursor-pointer transition-all duration-300
                        text-xl w-32 text-center  text-white  whitespace-nowrap
                        ${inputValue 
                          ? 'bg-my-blue-4 hover:bg-hmy-blue-4 cursor-pointer' 
                          : 'bg-gray-300 cursor-not-allowed'
                        }`}
                        onClick={inputValue ? () => handleDuplicateCheck(inputValue) : undefined}
                >
                  중복 확인
                </span>
              </div>

              {/* 이메일 */}
              <div className={`${tagBodyStyles} bg-gray-300 rounded-xl mr-3 hover:bg-gray-400 duration-300 cursor-pointer`}>
                <span className={` px-4 py-2 rounded-xl   transition-all duration-300
                        text-xl w-32 text-center  text-gray-900 `}>
                  email
                </span>
                <span className={`${tagContentStyles}`}>{userInfo.email}</span>
              </div>
              {/* 비번교체 */}
              <div className={`${tagBodyStyles}  mr-3 justify-end `}>
                <span className={`bg-gray-200 px-4 py-1 rounded-xl  cursor-pointer transition-all duration-300
                          text-xl w-42 text-center hover:bg-my-blue-1 hover:text-white text-gray-900  whitespace-nowrap`}>
                    password change
                </span>
              </div>
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </>
  );
}