import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { PiSirenFill } from "react-icons/pi";

export default function ReportModal({ isOpen, onClose, reportType, targetId }) {
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [comment, setComment] = useState('');

  const reportReasons = [
    { id: 1, label: '스팸 홍보/도배' },
    { id: 2, label: '욕설/협오/차별적 표현' },
    { id: 3, label: '개인정보 노출' },
    { id: 4, label: '불법 정보 공유' },
    { id: 5, label: '음란물/성적인 콘텐츠' },
  ];

  const handleReasonToggle = (reasonId) => {
    setSelectedReasons(prev =>
      prev.includes(reasonId)
        ? prev.filter(id => id !== reasonId)
        : [...prev, reasonId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API 호출 로직
    console.log({
      reportType,
      targetId,
      reasons: selectedReasons,
      comment
    });
    
    setSelectedReasons([]);
    setComment('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="bg-white rounded-lg shadow-lg w-80"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <span className="text-my-red text-2xl"><PiSirenFill /></span>
                <h2 className="text-lg font-medium">게시글 신고하기</h2>
              </div>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4">
              <div className="space-y-2 mb-4 ">
                {reportReasons.map((reason) => (
                  <label key={reason.id} className="flex items-center gap-2 cursor-pointer ">
                    <input
                      type="checkbox"
                      checked={selectedReasons.includes(reason.id)}
                      onChange={() => handleReasonToggle(reason.id)}
                      className={`w-4 h-4 rounded `}
                    />
                    <span className="text-sm">{reason.label}</span>
                  </label>
                ))}
              </div>
              
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full h-24 p-2 text-sm border rounded-lg resize-none mb-4"
                placeholder="신고 내용을 입력해주세요."
              />
              
              <button
                type="submit"
                className={`w-full py-2 rounded-lg text-sm ${
                  selectedReasons.length === 0 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-200 hover:bg-gray-300'
                }`}
                disabled={selectedReasons.length === 0}
              >
                신고
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}