// components/video/chat/ChatInput.jsx
import { useEffect, useState } from 'react';
import { Paperclip, Smile, Bell } from 'lucide-react'; // lucide-react 아이콘 사용
import { WiDirectionUp } from "react-icons/wi";

  // ☆★☆★☆★ 채팅 입력창 ☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★

export default function ChatInput({ onSendMessage }) {
  const [chatInput, setChatInput] = useState('');

  // 메시지 전송 핸들러
  const chatRequest = (e) => {
    e.preventDefault(); // 새로고침 제거
    if (chatInput.trim()) {
      onSendMessage(chatInput); // 메세지 전송
      setChatInput('');
    }
  };
  const handleKeyDown = (e) => { // 엔터눌러도 전송
    if (e.key === 'Enter' && !e.shiftKey) { 
      e.preventDefault();
      chatRequest(e);
    }
  };
  useEffect(() => { // textarea 입력한만큼 늘어나도록
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }, [chatInput]);

  // 버튼 클릭 핸들러들 (현재는 console.log만)
  const handleClipClick = () => console.log('클립 버튼 클릭');
  const handleEmojiClick = () => console.log('이모지 버튼 클릭');
  const handleNotifyClick = () => console.log('알림 버튼 클릭');

  return (
    <div className="absolute bottom-0 w-full pt-4 pl-4 pr-4 border-t ">
      <div className="flex flex-col items-center  ">
        {/* 입력 section */}
        <form onSubmit={chatRequest}
          className="w-full p-1 rounded-2xl border border-my-blue-2 border-2 
          focus:outline-none focus:border-blue-500 flex ">
          {/* 입력 창 */}
          <textarea
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="대화를 입력하세요"
            style={{ height: 'auto', minHeight: '24px', maxHeight: '150px' }}
            className="bg-gray-100 w-full focus:outline-none ml-3 font-user-input resize-none overflow-hidden text-gray-800"
          />
          {/* 입력 버튼 */}
          <button  type="submit"
          className={`text-3xl  text-white rounded-xl hover:bg-my-blue-2 self-end h-7 flex items-center ${chatInput ? 'bg-my-blue-4' : 'bg-gray-300'}`}>
            <WiDirectionUp/>
          </button>
        </form>
        {/* 버튼 section */}
        <div className="flex  w-full gap-4 p-2">
          <button
            type="button"
            onClick={handleClipClick}
            className="text-gray-500 hover:text-gray-700"
          >
            <Paperclip size={20} />
          </button>
          <button
            type="button"
            onClick={handleEmojiClick}
            className="text-gray-500 hover:text-gray-700"
          >
            <Smile size={20} />
          </button>
          <button
            type="button"
            onClick={handleNotifyClick}
            className="text-gray-500 hover:text-gray-700"
          >
            <Bell size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
