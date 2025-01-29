import { useRecoilState } from 'recoil';
import { userState } from "../../recoil/atoms/authState";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from 'react';
import { FaCamera } from "react-icons/fa";
import getUserApi from '../../services/api/getUserApi';

// 프로필 기본 이미지
import defaultUserImageOrange from '/src/assets/default/defaultUserImageOrange.png'

// 중복되는 CSS 변수분리
const totalBackGroundColor = "bg-white"
const tagBodyStyles = 'flex items-center gap-12'
const tagTitleStyles = `bg-my-blue-3 px-4 py-2 rounded-xl  cursor-pointer transition-all duration-300
                        text-xl w-32 text-center hover:bg-my-yellow text-gray-900 hover:bg-opacity-30`
const tagContentStyles = 'text-gray-800 cursor-pointer text-xl'




export default function MyInfoCard({ isEditMode }) {
  const [userInfo, setUserInfo] = useRecoilState(userState); //회원정보 불러오기
  const [inputValue , setInputValue] = useState(null); // 닉네임 입력값
  const [isPasswordMode, setIsPasswordMode] = useState(false); // 패스워드변경 화면 on off
  const fileInputRef = useRef(null);

  // 사진변경 클릭버튼 로직
  const handleImageClick = () => {
    if (isEditMode && !isPasswordMode) {
      fileInputRef.current.click();
    }
  };
  // 사진변경 실제 로직
  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    console.log("Selected File:", file);  // 선택된 파일 확인
    console.log("Current userInfo:", userInfo);  // 현재 userInfo 상태 확인

    if (file) {
      try {
        // 서버에 이미지 업로드
        const response = await getUserApi.uploadProfileImage(file , userInfo);
  
        // 서버에서 받은 이미지 URL로 프로필 업데이트
        if (response.data.imageUrl) {
          setUserInfo({
            ...userInfo,
            profilePictureUrl: response.data.imageUrl
          });
        }
      } catch (error) {
        console.error('프론트에서 이미지 변경 실패:', error);
      }
    }
  };

  // 닉네임 중복확인 로직 
  const handleDuplicateCheck = (inputValue) => {
    console.log(inputValue);
  };

  // 화면 렌더링시 초기상태 
  useEffect(() => {
    setInputValue(null)
    setIsPasswordMode(false)
  },[isEditMode])

  // 비밀번호 변경 상태에서 "저장","취소버튼" 로직
  const passwordChangeButton = (type) => {
    if (type === 'save') {
      console.log('저장');
    } else if (type === 'cancel') {
      console.log('취소');
    } else {
      console.log('뭘 누른거야');
    }
    setInputValue(null)
    setIsPasswordMode(false)
  }

  // 기본화면 or 수정화면 or 비밀번호변경화면 전환 로직
  const renderContent = () => {
    // 기본화면
    if (!isEditMode) {
      return (
        <motion.div
        key="edit"
        className="flex-1 py-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
      >
        <div className="flex flex-col h-full justify-between py-8 gap-8 lg:gap-0 ml-8 lg:ml-16">
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
      )
    }
    // 비밀번호 변경화면
    if (isPasswordMode) {
      return (
        <div>
          <motion.div
            key="passwordchange"
            className="flex-1 h-full pt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <>
              <h1 className="text-2xl ml-4 mb-2 cursor-default">보안 설정</h1>
              <div className='border mx-4 rounded-xl border-2 border-gray-200'>
                <div className="flex flex-col h-full justify-between py-3 gap-8 lg:gap-4 ml-4 lg:ml-12">
                  <div className={`flex items-center gap-2     `}>
                    <span className={` pl-3 py-2 rounded-xl  cursor-pointer transition-all duration-300
                            text-xl w-80 text-start text-gray-900  `}>
                      현재 비밀번호
                    </span>
                    <input type="text" placeholder='paa' className={` pl-2 border border-2 focus:border-my-blue-4 mr-2 py-1 rounded-md w-full focus:outline-none`}
                  onChange={(e) => setInputValue(e.target.value)}/>
                  </div>
                  <div className={`flex items-center gap-2     `}>
                    <span className={` pl-3 py-2 rounded-xl  cursor-pointer transition-all duration-300
                            text-xl w-80 text-start text-gray-900  `}>
                      새 패스워드
                    </span>
                    <input type="text" placeholder='ssw' className={` pl-2 border border-2 focus:border-my-blue-4 mr-2 py-1 rounded-md w-full focus:outline-none`}
                  onChange={(e) => setInputValue(e.target.value)}/>
                  </div>
                  <div className={`flex items-center gap-2     `}>
                    <span className={` pl-3 py-2 rounded-xl  cursor-pointer transition-all duration-300
                            text-xl w-80 text-start text-gray-900  `}>
                      새로운 패스워드 확인
                    </span>
                    <input type="text" placeholder='ordd' className={`pl-2 border border-2 focus:border-my-blue-4 mr-2 py-1 rounded-md  w-full focus:outline-none`}
                  onChange={(e) => setInputValue(e.target.value)}/>
                  </div>
                </div>
              </div>
              <div className=' gap-4 mx-4 flex justify-end '>
                <button className={`bg-my-blue-4 px-4 py-1 mt-2 rounded-xl  cursor-pointer transition-all duration-300
                    text-xl w-42 text-center hover:bg-my-blue-1 hover:text-white text-gray-900  whitespace-nowrap`}
                    onClick={()=> passwordChangeButton('cancel')}
                >취소
                </button>
                <button className={`bg-my-blue-4 px-4 py-1 mt-2 rounded-xl  cursor-pointer transition-all duration-300
                    text-xl w-42 text-center hover:bg-my-blue-1 hover:text-white text-gray-900  whitespace-nowrap`}
                    onClick={()=> passwordChangeButton('save')}
                >저장
                </button>
              </div>
            </>
          </motion.div>
        </div>
      )
    }
    // 수정화면
    return (
      <motion.div
      key="view"
      className="flex-1 py-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
    >
      <div className="flex flex-col h-full justify-between py-2 gap-8 lg:gap-0 ml-8 lg:ml-16">
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
                    text-xl w-42 text-center hover:bg-my-blue-1 hover:text-white text-gray-900  whitespace-nowrap`}
                  onClick={()=> setIsPasswordMode(true)}>
            password change
          </span>
        </div>
      </div>
    </motion.div>
    )
  }

  return (
    <>
      <div className={`flex flex-col lg:flex-row rounded-3xl border border-2 border-gray-300 p-1 ${totalBackGroundColor}`}>
          {/* 왼쪽 이미지 */}
          <div className="relative h-72 rounded-3xl overflow-hidden w-full lg:w-72  aspect-square flex-shrink-0 duration-500">
            {/* 기본화면 이미지 */}
            <img src={`${userInfo.profilePictureUrl ? userInfo.profilePictureUrl : defaultUserImageOrange }`} 
              alt="Profile" className={`w-full h-full object-cover transition-transform duration-500 hover:scale-110`}
            />
            {/* 수정화면 이미지 */}
            {isEditMode && !isPasswordMode && (
              <>
                {/* 뒷배경 흐리게 */}
                <div 
                  className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/30 hover:bg-black/40 duration-300"
                  onClick={handleImageClick}
                  >
                  {/* 카메라 아이콘 */}
                  <FaCamera
                    size={48} 
                    className="text-gray-100 hover:text-gray-300 transition-colors duration-300"
                    />
                </div>
                {/* 사진업로드 */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </>
            )}
          </div>
          {/* 오른쪽 개인정보들 */}
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
      </div>
    </>
  );
}