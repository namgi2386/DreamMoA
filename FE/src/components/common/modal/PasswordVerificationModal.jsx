import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function PasswordVerificationModal({ isOpen, onClose, onVerify }) {
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onVerify(password);
    setPassword('');  // 입력 필드 초기화
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="bg-white p-8 rounded-2xl shadow-lg w-96"
          >
            <h2 className="text-2xl font-bold text-center mb-6">비밀번호 확인</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-my-blue-1"
                placeholder="비밀번호를 입력하세요"
                autoFocus
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg duration-200"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-my-blue-1 text-white hover:bg-opacity-90 rounded-lg duration-200"
                >
                  확인
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}