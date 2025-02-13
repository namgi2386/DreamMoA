import { useState } from "react";
import { Calendar } from 'primereact/calendar';

// PrimeReact 스타일을 여기에서만 import (전역 적용 X)
import 'primereact/resources/themes/lara-light-indigo/theme.css';  
import 'primereact/resources/primereact.min.css';  
import 'primeicons/primeicons.css';  

export default function CalendarSection({value, onChange, mode}) {
  //오늘 날짜를 maxDate로 지정정
  const today = new Date();

  return (
    <div className="bg-white p-6 shadow-md rounded-lg w-full min-w-[450px] max-w-[480px] overflow-hidden"> 
      {/* min-w 값을 450px로 늘려서 캘린더가 좁아지지 않도록 설정 */}
      <h2 className="text-lg font-bold mb-4">
      {mode === "date" ? "📅 달력" : "🏆 챌린지 달력"}
        </h2> 

      {/* 캘린더 크기를 넓혀 요일이 한 줄에 표시되도록 수정 */}
      <Calendar 
        value={value} 
        onChange={onChange}
        inline
        maxDate={today} //오늘 날짜 이후는 선택할 수 없음음
        className="w-[450px] max-w-full"
      />
    </div>
  );
}
