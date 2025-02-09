import { motion } from "framer-motion";
import { useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { HiOutlineChevronDoubleRight, HiOutlineChevronDoubleLeft } from "react-icons/hi";
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import useOpenViduChat from '../../../hooks/useOpenViduChat';

  // ☆★☆★☆★ 채팅창main ☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★

const ChatPanel = ({ session, sessionTitle, isChatOpen, setIsChatOpen }) => {
  const { messages, sendMessage } = useOpenViduChat(session);
  const messagesEndRef = useRef(null);

  // 새 메시지가 올 때마다 스크롤을 맨 아래로
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  // 기본 스크롤 아래 유지
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      {/* 채팅창 닫음상태 */}
      <motion.div id="innerSideNavbar" className="fixed right-0 top-1/2 z-40"
        animate={{ x: !isChatOpen ? 0 : 100 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        // 고정 오른쪽중앙 zindex40(채팅창보단 뒤) 
        // padding왼쪽으로 살짝 4xl크기 margin top 해서 살짝 아래로 이동시킴
      >
        <button className=' px-1 text-my-blue-4 text-4xl mt-2'
        onClick={() => setIsChatOpen(true)}>
          <HiOutlineChevronDoubleLeft/>
        </button>
      </motion.div>
      {/* 채팅창 열림상태 */}
      <motion.div
        initial={{ x: "100%" }} // 기본 100% 길이
        animate={{ x: isChatOpen ? 0 : "120%" }} // 오픈이면 전부보여줌 닫으면 오른쪽으로 120퍼 이동 
        transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }} //1.2초동안 0.1초딜레이 빠르게나오고늦게들어가기
        className="fixed top-0 right-0 h-screen w-96 bg-gray-100 rounded-l-3xl z-50 
          flex flex-col " // 고정 오른쪽 상단부터 너비96 높이100% 왼쪽라운드많이 zindex50
      >
        {/* 열림상태 : OnOff 채팅창버튼 */}
        <button onClick={() => setIsChatOpen(false)}>
          <div className="rounded-full bg-gray-100 text-my-blue-4 text-3xl 
              p-2 top-1/2 fixed -translate-x-6">
          <HiOutlineChevronDoubleRight/>
          </div>
        </button>
        {/* 열림상태 : 헤더 */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-medium text-lg truncate text-gray-800">
            {sessionTitle || '채팅(session name : none)'}
          </h2>
          <button
            onClick={() => setIsChatOpen(false)}
            className=" text-gray-500  hover:bg-gray-100 rounded-full"
          >
            <X size={20} className='font-bold'/>
          </button>
        </div>
        {/* 열림상태 : 메시지 목록 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <ChatMessage 
              key={`${message.timestamp}-${index}`} 
              message={message} 
            />
          ))}
          <div ref={messagesEndRef} /> {/* 스크롤 위치 참조용 div */}
        </div>
        {/* 열림상태 : 입력창 */}
        <ChatInput onSendMessage={sendMessage} />
      </motion.div>
    </>
  );
};

export default ChatPanel;