import React from "react";
import DataLabel from "../common/DataLabel";

export default function DateDataSection({ studyItems = [], challengeItems = [] }) {
    const totalCells = 6;
    // 지정된 인덱스
    const challengeIndices = [1, 2, 4, 5]; // 챌린지 데이터 표시할 셀
    const studyIndices = [0, 3]; // 공부시간 데이터 표시할 셀
  
    // 디자인에 맞춘 배경 색상 배열 (총 6셀)
    const bgClasses = [
      "bg-gray-200", // 셀 0 (공부시간)
      "bg-gray-300", // 셀 1 (챌린지)
      "bg-gray-200", // 셀 2 (챌린지)
      "bg-gray-300", // 셀 3 (공부시간)
      "bg-gray-200", // 셀 4 (챌린지)
      "bg-gray-300", // 셀 5 (챌린지)
    ];
  
    return (
      <div className="w-full h-full p-4">
        <div className="grid grid-cols-3 grid-rows-2 gap-4">
          {Array.from({ length: totalCells }).map((_, index) => {
            // 챌린지 데이터 셀
            if (challengeIndices.includes(index)) {
              const challengeIndex = challengeIndices.indexOf(index); // 1→0, 2→1, 4→2, 5→3
              const item = challengeItems[challengeIndex];
              return (
                <div
                  key={index}
                  className={`w-full h-full p-4 flex flex-col items-center justify-center ${bgClasses[index]}`}
                >
                  {item ? (
                    <>
                      <DataLabel label={item.label} />
                      <div className="mt-2 text-2xl font-normal">
                        <p>{item.value}</p>
                      </div>
                    </>
                  ) : (
                    // 데이터가 없더라도 그리드 틀을 유지
                    <div className="invisible">Placeholder</div>
                  )}
                </div>
              );
            }
            // 공부시간 데이터 셀
            else if (studyIndices.includes(index)) {
              // index 0 → studyItems[0], index 3 → studyItems[1]
              const studyIndex = index === 0 ? 0 : 1;
              const item = studyItems[studyIndex];
              return (
                <div
                  key={index}
                  className={`w-full h-full p-4 flex flex-col items-center justify-center ${bgClasses[index]}`}
                >
                  {item ? (
                    <>
                      <DataLabel label={item.label} />
                      <div className="mt-2 text-2xl font-normal">
                        <p>{item.value}</p>
                      </div>
                    </>
                  ) : (
                    <div className="invisible">Placeholder</div>
                  )}
                </div>
              );
            }
            // (예상치 못한 경우)
            return (
              <div key={index} className={`w-full h-full p-4 ${bgClasses[index]}`}>
                <div className="invisible">Placeholder</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }