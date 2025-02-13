import TitleSection from "../../components/dashboard/TitleSection";
import ComponentButton from "../../components/dashboard/ComponentButton";
import DataSection from "../../components/dashboard/DataSection";
import ChartSection from "../../components/dashboard/ChartSection";
import QuoteSection from "../../components/dashboard/QuoteSection";
import CalendarSection from "../../components/dashboard/CalendarSection";
import ChallengeDataSection from "../../components/dashboard/challenge/ChallengeDataSection";
import DateDataSection from "../../components/dashboard/date/DateDataSection";

import { useState } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [dashboardType, setDashboardType] = useState("date");


  // 테스트용 임시 데이터
  // 공부시간 데이터: 1행 1열 (오늘 공부 시간), 2행 1열 (총 공부 시간)
  const testStudyItems = [
    { label: "오늘 공부 시간", value: "120분" },
    { label: "총 공부 시간", value: "500분" },
  ];

  // 챌린지 데이터: 순서대로 1행2열, 1행3열, 2행2열, 2행3열에 매핑됨
  const testChallengeItems = [
    { label: "챌린지 항목 1", value: "값 1" },
    { label: "챌린지 항목 2", value: "값 2" },
    { label: "챌린지 항목 3", value: "값 3" },
    { label: "챌린지 항목 4", value: "값 4" },
  ];

  return (
    <div className="w-full h-screen p-4 flex flex-col bg-white">
      {/* Title 영역 */}
      <div className="w-full h-24 flex items-center  justify-center text-xl font-bold">
        Title 영역
      </div>

      {/* Content 영역 */}
      <div className="w-full h-3/4 mt-4 flex h-full">
        {/* Section 1 (60%) */}
        <div className="pl-32 bg-green-100 w-3/5 h-full flex flex-col">
          {/* Component 영역 */}
          <div className="w-full  h-1/6 ">
            <div className="flex items-center justify-between text-lg bg-red-100 h-full">
              {/* 왼쪽: 날짜 표시 버튼 */}
              <ComponentButton isDate date={date} mode={dashboardType} />
              {/* 오른쪽: 모드 전환 버튼 */}
              <ComponentButton
                text={dashboardType === "date" ? "날짜별" : "챌린지별"}
                onClick={() =>
                  setDashboardType(
                    dashboardType === "date" ? "challenge" : "date"
                  )
                }
              />
            </div>
          </div>

          {/* Data + Chart 영역 */}
          <div className="w-full flex flex-col h-5/6 bg-blue-100">
            {dashboardType === "date" ? (
              <>
                <div className="w-full h-1/3">
                <DateDataSection
                    studyItems={testStudyItems}
                    challengeItems={testChallengeItems}
                  />
                </div>
                <div className="w-full flex items-center justify-center text-lg h-2/3">
                  Chart 영역
                </div>
              </>
            ) : (
              <>
                {/* 챌린지 모드에서 Data 영역: ChallengeDataSection 컴포넌트를 사용 */}
                <div className="w-full h-1/3">
                  <ChallengeDataSection />
                </div>
                <div className="w-full flex items-center justify-center text-lg h-2/3">
                  챌린지 차트 영역
                </div>
              </>
            )}
          </div>
        </div>

        {/* Section 2 (40%) */}
        <div className="w-2/5 flex flex-col -ml-8">
          {/* Component 영역 */}
          <div className="w-full flex items-center justify-center text-lg h-1/6">
            Component 영역
          </div>

          {/* Quote + Calendar 영역 */}
          <div className="w-full flex items-start justify-center  text-lg h-5/6">
            <div>
              <div className="w-full flex items-center justify-center text-lg h-1/3">
                <QuoteSection />
              </div>
              <div className="w-full flex items-end bg-yellow-100 justify-center text-lg h-2/3 mt-10">
                {/* 날짜별 모드에서만 캘린더 표시 (챌린지 모드라면 다른 방식의 세부 캘린더를 사용하도록 수정 가능) */}
                {dashboardType === "date" && (
                  <CalendarSection
                    value={date}
                    onChange={(e) => {
                      console.log("선택한 날짜:", e.value);
                      setDate(e.value);
                    }}
                    mode={dashboardType}
                    inline
                    showButtonBar
                  />
                )}
                {dashboardType === "challenge" && (
                  // 챌린지 모드에서도 기본 캘린더를 표시하되, 모드 prop을 통해 내부 렌더링을 다르게 함
                  <CalendarSection
                    value={date}
                    onChange={(e) => {
                      console.log("챌린지 모드에서 선택한 날짜:", e.value);
                      setDate(e.value);
                    }}
                    mode={dashboardType}
                    inline
                    showButtonBar
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
