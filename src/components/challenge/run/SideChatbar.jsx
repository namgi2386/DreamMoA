import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
// import { FaAngleDoubleLeft  } from "react-icons/fa";
import { HiOutlineChevronDoubleRight, HiOutlineChevronDoubleLeft } from "react-icons/hi";
import { WiDirectionUp } from "react-icons/wi";

export default function SideChatbar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
              {/* 채팅창 닫음상태 */}
      <motion.div id="innerSideNavbar" className="fixed right-0 top-1/2 z-40"
        animate={{ x: !isOpen ? 0 : 100 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        // 고정 오른쪽중앙 zindex40(채팅창보단 뒤) 
        // padding왼쪽으로 살짝 4xl크기 margin top 해서 살짝 아래로 이동시킴
      >
        <button className=' px-1 text-my-blue-4 text-4xl mt-2'
        onClick={() => setIsOpen(true)}>
          <HiOutlineChevronDoubleLeft/>
        </button>
      </motion.div>

              {/* 채팅창 열림상태 */}
      <motion.div
        initial={{ x: "100%" }} // 기본 100% 길이
        animate={{ x: isOpen ? 0 : "120%" }} // 오픈이면 전부보여줌 닫으면 오른쪽으로 120퍼 이동 
        transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }} //1.2초동안 0.1초딜레이 빠르게나오고늦게들어가기
        className="fixed top-0 right-0 w-96 h-screen bg-gray-100 rounded-l-3xl z-50 
          flex flex-col "
        // 고정 오른쪽 상단부터 너비96 높이100% 왼쪽라운드많이 zindex50
      >
                  {/* OnOff 채팅창버튼 */}
        <button onClick={() => setIsOpen(false)}>
          <div className="rounded-full bg-gray-100 text-my-blue-4 text-3xl 
              p-2 top-1/2 fixed -translate-x-6">
          <HiOutlineChevronDoubleRight/>
          </div>
        </button>
                  {/* 채팅창 헤더 */}
        <button onClick={() => setIsOpen(false)}>
          <X className="fixed top-0 right-0 -translate-x-2 translate-y-3 
            text-gray-500 hover:text-gray-700 " />
        </button>
        <div className="flex justify-center items-center w-11/12
          pb-3 mt-3 ">
          <h2 className="text-lg font-semibold ">SSAFY 알고리즘 스터디 방</h2>
        </div>

                  {/* 채팅창 메인구역 */}
        
        <div 
          className="h-[calc(100vh-180px)] overflow-y-auto p-4 flex-col break-words border-t" 
          style={{ fontFamily: "Cheetos" }}
        >
          <p style={{ fontFamily: "Cheetos" }}>
          Once when I was six years old I saw a magnificent picture in a book, called True Stories from Nature,
          about the primeval forest. It was a picture of a boa constrictor in the act of swallowing an animal. Here is a
          copy of the drawing.
          </p>
          <p style={{ fontFamily: "Cheetos" }}>
          In the book it said: &apos;&apos;Boa constrictors swallow their prey whole, without chewing it. After that they are not
          able to move, and they sleep through the six months that they need for digestion.&apos;&apos;
          I pondered deeply, then, over the adventures of the jungle. And after some work with a colored pencil I
          succeeded in making my first drawing. My Drawing Number One. It looked something like this:
          </p>
          <p style={{ fontFamily: "Cheetos" }}>
          I showed my masterpiece to the grown-ups, and asked them whether the drawing frightened them.
          But they answered: &quot;Frighten? Why should any one be frightened by a hat?&quot;
          My drawing was not a picture of a hat. It was a picture of a boa constrictor digesting an elephant. But since
          the grown-ups were not able to understand it, I made another drawing: I drew the inside of a boa
          constrictor, so that the grown-ups could see it clearly. They always need to have things explained. My
          Drawing Number Two looked like this:
          </p>
          <p>ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</p>
        </div>

                  {/* 채팅창 입력구역 */}
        <div className="absolute bottom-0 w-full pt-4 pl-4 pr-4 border-t ">
          <div className="flex flex-col items-center  ">
            <div className="w-full p-1 rounded-2xl border border-my-blue-2 border-2 
            focus:outline-none focus:border-blue-500 flex justify-between">
              <input
                type="text"
                placeholder="input"
                className="bg-gray-100 w-full focus:outline-none ml-3"
              />
              <button className="text-3xl bg-gray-300 text-white rounded-xl hover:bg-my-blue-4">
                <WiDirectionUp/>
              </button>
            </div>
            <div className="flex gap-1 w-full">
              <button className="p-2 text-gray-500 hover:text-gray-700">
                📎
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700">
                😊
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700">
                🔔
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};