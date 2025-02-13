export default function ComponentButton({ text, isDate, date, mode, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="px-6 py-3 bg-blue-300 text-white rounded-md text-center min-w-[150px] text-3xl"
    >
      {isDate 
        ? (mode === "date" 
              ? (date ? formatDate(date) : "날짜 선택") 
              : "챌린지명" // 챌린지 모드라면 여기서 챌린지명을 표시 (추후 state나 props로 받아올 수 있음)
          )
        : text}
    </button>
  );
}

// 날짜를 "YYYY.MM.DD" 형식으로 변환하는 함수
function formatDate(date) {
  if (!date) return ""; // 날짜가 없으면 빈 문자열 반환
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0"); // 두 자리 수 유지
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}
