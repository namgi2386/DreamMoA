import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { HiMiniXMark } from "react-icons/hi2";

export default function TopLine({ isVisible, onClose }) {
  const [contentWidth, setContentWidth] = useState(0);
  const contentRef = useRef(null);
  
  const BannerContent = () => (
    <div className="flex items-center ">
      <span className="font-user-input text-sm">삼성청년 SW 아카데미 14기 모집 |</span>
      <span className="mx-4 font-user-input text-sm">모집기간 | 4월24일 ~5월8일</span>
      <span className="mx-4 font-user-input text-sm">장소 | 서울, 대전, 광주, 구미, 부울경(부산)</span>
    </div>
  );

  useEffect(() => {
    if (contentRef.current) {
      setContentWidth(contentRef.current.offsetWidth);
    }
  }, []);
  
  if (!isVisible ) return null;

  return (
    <>
      <div className="w-full h-5 bg-my-blue-1 border-t flex items-center overflow-hidden whitespace-nowrap relative">
        <motion.div
          className="flex gap-4"
          animate={{
            x: [0, -contentWidth]
          }}
          transition={{
            duration: 80,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <span ref={contentRef} className="text-white px-4   tracking-wider flex cursor-default">
            <BannerContent />
            <BannerContent />
          </span>
          <span className="text-white px-4 flex cursor-default">
            <BannerContent />
            <BannerContent />
          </span>
          <span className="text-white px-4 flex cursor-default">
            <BannerContent />
            <BannerContent />
          </span>
        </motion.div>
        <button 
        onClick={onClose}
        className="absolute h-full right-0 text-white pl-3 pr-3 bg-my-blue-1">
        <HiMiniXMark />
        </button>
      </div>
    </>
  );
}