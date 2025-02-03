import { useState } from "react";
import { MapPin, Star, Users, Book, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const ConstellationFooter = () => {
  const [activeDream, setActiveDream] = useState(null);
  const [userDeterminations] = useState([
    { id: 1, text: "오늘의 나는 어제의 나와 싸운다", x: 30, y: 30 },
    { id: 2, text: "영어 시험 900점!", x: 60, y: 60 },
    { id: 3, text: "프로그래머 되기", x: 20, y: 70 },
  ]);

  // 메뉴 별자리 연결 선
  const renderConstellationLines = () => (
    <svg className="absolute inset-0 pointer-events-none">
      <line
        x1="30%"
        y1="40%"
        x2="60%"
        y2="70%"
        stroke="#F5CBA7"
        strokeWidth="2"
        opacity="0.5"
      />
      <line
        x1="60%"
        y1="70%"
        x2="20%"
        y2="80%"
        stroke="#F5CBA7"
        strokeWidth="2"
        opacity="0.5"
      />
      <line
        x1="20%"
        y1="80%"
        x2="30%"
        y2="40%"
        stroke="#F5CBA7"
        strokeWidth="2"
        opacity="0.5"
      />
    </svg>
  );

  return (
    <footer
      className="relative bg-[#1E1F26] text-white p-8 overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at center, #003458 0%, rgba(15,15,20,1) 100%)",
      }}
    >
      {/* Starry Background with Subtle Movement */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/70 rounded-full animate-pulse"
            style={{
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Constellation Lines */}
      {renderConstellationLines()}

      <div className="container mx-auto grid grid-cols-3 relative z-10">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[#F5CBA7]">꿈모아</h2>
          <p className="text-sm text-gray-300">
            모든 학습자의 꿈을 함께 모아 이루는 공간
          </p>
          <div className="flex space-x-4 mt-4">
            <Users className="text-[#C4C4C4]" />
            <Book className="text-[#C4C4C4]" />
            <MapPin className="text-[#C4C4C4]" />
          </div>
        </div>

        {/* Interactive Dream Map */}
        <div className="relative h-64">
          <div>
            {userDeterminations.map((pin) => (
              <div
                key={pin.id}
                className="absolute cursor-pointer hover:scale-125 transition-transform"
                style={{
                  left: `${pin.x}%`,
                  top: `${pin.y}%`,
                }}
                onMouseEnter={() => setActiveDream(pin)}
                onMouseLeave={() => setActiveDream(null)}
              >
                <Star
                  className="text-yellow-400"
                  fill={activeDream?.id === pin.id ? "#F5CBA7" : "none"}
                />
              </div>
            ))}
          </div>
          {/* Dream Message Overlay */}
          {activeDream && (
            <div
              className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-center transform transition-all duration-300 ease-in-out"
              style={{
                opacity: activeDream ? 1 : 0,
                transform: activeDream ? "translateY(0)" : "translateY(20px)",
                overflow: "hidden", // 내용 잘릴 경우 숨김
                whiteSpace: "nowrap",
                textOverflow: "ellipsis", // 초과 텍스트 '...'
              }}
            >
              {activeDream.text}
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl mb-4 text-[#F5CBA7]">바로가기</h3>
          <ul className="space-y-2">
            {[
              { name: "이용약관", icon: <ChevronRight size={16} /> },
              { name: "FAQ", icon: <ChevronRight size={16} /> },
              {
                name: "QnA게시판",
                icon: <ChevronRight size={16} />,
                path: "/community/qna",
              },
              {
                name: "자유게시판",
                icon: <ChevronRight size={16} />,
                path: "/community/free",
              },
              { name: "개인정보처리방침", icon: <ChevronRight size={16} /> },
            ].map((link) => (
              <li
                key={link.name}
                className="flex items-center space-x-2 hover:text-[#F5CBA7] cursor-pointer"
              >
                {link.icon}
                {link.path ? (
                  <Link to={link.path} className="hover:underline">
                    {link.name}
                  </Link> // ✅ Link 적용
                ) : (
                  <span>{link.name}</span>
                )}
                {/* <span>{link.name}</span> */}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center mt-8 pt-4 border-t border-gray-700 text-sm text-gray-400">
        © 2024 꿈모아. All rights reserved.
      </div>
    </footer>
  );
};

export default ConstellationFooter;
