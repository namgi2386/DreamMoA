const MainHero = () => {
  return (
    <div className="bg-[#003458] text-white py-20 px-10 flex items-center justify-between">
      <div className="w-1/2 space-y-6">
        <h1 className="text-5xl font-bold text-[#F9F871]">
          스마트한 학습, 똑똑한 성장
        </h1>
        <p className="text-xl text-[#DBF2FF]">
          AI 기술로 당신의 학습을 혁신적으로 지원합니다.
        </p>
        <button className="bg-[#3F628A] px-6 py-3 rounded-lg hover:bg-opacity-80 transition">
          지금 시작하기
        </button>
      </div>
      <div className="w-1/2 flex justify-end">
        {/* 학습 이미지 또는 애니메이션 */}
      </div>
    </div>
  );
};

export default MainHero;