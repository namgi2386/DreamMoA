import React from "react";

import DataLabel from "../common/DataLabel";

export default function ChallengeDataSection() {
    return (
        <div className="w-full h-full p-4">
          <div className="flex flex-col gap-4">
            {/* 1행 */}
            <div className="flex gap-4">
              {/* 오늘 공부 시간 */}
              <div className="w-2/5 bg-gray-200 p-4 flex flex-col items-center justify-center">
                <DataLabel label="오늘 공부 시간" />
                <div className="mt-2 text-2xl font-normal">
                  <p>100</p>
                </div>
              </div>
              {/* 한 달 평균 공부 시간 */}
              <div className="w-3/5 bg-gray-300 p-4 flex flex-col items-center justify-center">
                <DataLabel label="한 달 평균 공부 시간" />
                <div className="mt-2 text-2xl font-normal">
                  <p>100</p>
                </div>
              </div>
            </div>
            {/* 2행 */}
            <div className="flex gap-4">
              {/* 총 공부 시간 */}
              <div className="w-2/5 bg-gray-200 p-4 flex flex-col items-center justify-center">
                <DataLabel label="총 공부 시간" />
                <div className="mt-2 text-2xl font-normal">
                  <p>100</p>
                </div>
              </div>
              {/* 추가 데이터 (배찌가 들어갈 공간) */}
              <div className="w-3/5 bg-gray-300 p-4 flex items-center justify-center">
                <DataLabel label="추가 데이터" />
              </div>
            </div>
          </div>
        </div>
      );
  }