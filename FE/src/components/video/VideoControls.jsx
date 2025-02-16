import { IoIosSquareOutline } from "react-icons/io";
import { CiGrid41, CiGrid2H, CiGrid42 } from "react-icons/ci";
import { BsGrid1X2 } from "react-icons/bs";
import { LuScreenShare, LuScreenShareOff } from "react-icons/lu";
import useOpenViduSetting from "../../hooks/useOpenViduSetting";
import { useRecoilState } from "recoil";
import {
  scriptOnOffState,
  allSubtitlesState,
  processedSubtitlesState,
  showSubtitlesState
} from "../../recoil/atoms/challenge/ai/scriptState";
import { useState, useRef } from "react";
import axios from "axios";

export default function VideoControls({
  publisher,
  subscribers,
  onLeaveSession,
  currentLayout,
  onLayoutChange,
  isScreenSharing,
  onToggleScreenShare,
}) {
  const layouts = [
    { id: "default", icon: BsGrid1X2, label: "기본" },
    { id: "Dynamic", icon: CiGrid41, label: "Dynamic" },
    { id: "spotlight", icon: IoIosSquareOutline, label: "스포트라이트" },
    { id: "teaching", icon: CiGrid2H, label: "티칭" },
    { id: "mosaic", icon: CiGrid42, label: "모자이크" },
  ];

  const {
    micVolume,
    speakerVolume,
    isMicMuted,
    isCameraOff,
    adjustMicVolume,
    adjustSpeakerVolume,
    toggleMicMute,
    toggleCamera,
  } = useOpenViduSetting(publisher, subscribers);

  const [scriptOnOff, setScriptOnOff] = useRecoilState(scriptOnOffState);
  const [allSubtitles, setAllSubtitles] = useRecoilState(allSubtitlesState);
  const [processedSubtitles, setProcessedSubtitles] = useRecoilState(processedSubtitlesState);
  const [showSubtitles, setShowSubtitles] = useRecoilState(showSubtitlesState);
  const [sttState, setSttState] = useState("START");
  const [eventSource, setEventSource] = useState(null);
  const [showSummary, setShowSummary] = useState(false);

  // ✅ 전체 STT 데이터 저장용 ref (리렌더링 영향 안 받음)
  const totalDataRef = useRef("");

  const userId = publisher?.stream?.connection?.data
    ? JSON.parse(publisher.stream.connection.data).clientData.originalName
    : "unknown_user";

  const closeExistingEventSource = () => {
    if (eventSource) {
      eventSource.close();
      setEventSource(null);
    }
  };

  const preprocessText = (text) => {
    if (!text) return "";
  
    // 1. 특수문자 및 공백 정리
    let cleanedText = text.replace(/[^ㄱ-ㅎ가-힣0-9\s]/g, "").trim();
    cleanedText = cleanedText.replace(/\s+/g, " "); // 연속된 공백 제거
  
    // 2. 의미 없는 filler words 제거
    const stopwords = ["음", "어", "그", "이제", "뭐", "근데", "그래서"];
    cleanedText = cleanedText
      .split(" ")
      .filter((word) => !stopwords.includes(word))
      .join(" ");
  
    // 3. 중복 문장 제거 (이전 문장과 비교)
    const sentences = cleanedText.split(" ");
    const uniqueSentences = [...new Set(sentences)];
    cleanedText = uniqueSentences.join(" ");
  
    return cleanedText;
  };
  
  const getDisplayedText = (text) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.slice(-5).join(" "); // ✅ 최근 5개 단어만 표시
  };

  const startSTT = () => {
    console.log(`🎤 [${userId}] STT 시작 요청 보냄...`);
    closeExistingEventSource();

    const eventSrc = new EventSource(`http://localhost:8080/stt-start`);
    setEventSource(eventSrc);

    eventSrc.onmessage = (event) => {
      const rawText = event.data.trim();
      const processedText = preprocessText(rawText);

      console.log("📝 STT 원본:", rawText);
      console.log("📌 전처리된 STT:", processedText);

      // ✅ 전체 데이터 저장 (누적)
      totalDataRef.current += ` ${rawText}`.trim();

      // ✅ 검은 창 자막 업데이트
      setProcessedSubtitles((prev) => ({
        ...prev,
        [userId]: getDisplayedText(processedText),
      }));

      setAllSubtitles((prev) => ({
        ...prev,
        [userId]: rawText,
      }));
    };

    eventSrc.onerror = () => {
      eventSrc.close();
      setEventSource(null);
      setScriptOnOff((prev) => ({ ...prev, [userId]: false }));
      setSttState("START");
    };

    setScriptOnOff((prev) => ({ ...prev, [userId]: true }));
    setSttState("STOP");
  };
  const [summaryText, setSummaryText] = useState(""); // ✅ 요약된 STT 데이터 상태 추가

  const summarizeScript = async () => {
    try {
      console.log("📩 STT 데이터 요약 요청 중...");
  
      const response = await axios.post(
        "http://localhost:8080/gpt-summary",  // ✅ 엔드포인트 수정
        { script: totalDataRef.current },  // ✅ JSON 형식으로 데이터 전송
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoidGxzZG53bHMiLCJyb2xlIjoiUk9MRV9VU0VSIiwibmlja25hbWUiOiJ0bHNkbndscyIsInVzZXJJZCI6IjEiLCJzdWIiOiJ6ZWJyYTAzNDVAbmF2ZXIuY29tIiwiaWF0IjoxNzM5NzM0MDA2LCJleHAiOjE3Mzk3MzQ2MDZ9.5P5NxfqSgQeTo_iZi-4k-zHCBWWIYn4VlM45Sc8gMNU",
          },
        }
      );
  
      console.log("📜 STT 요약 결과:", response.data);  // ✅ 요약된 데이터 콘솔에 출력
    } catch (error) {
      console.error("❌ STT 요약 요청 실패:", error);
    }
  };
  
  
  const stopSTT = async () => {
    console.log(`🛑 [${userId}] STT 종료 요청 보냄...`);
    try {
      await axios.post("http://localhost:8080/stt-stop");
      closeExistingEventSource();
      setScriptOnOff((prev) => ({ ...prev, [userId]: false }));
      setSttState("START");
    } catch (error) {
      console.error("❌ STT 종료 요청 실패:", error);
    }
  };

  return (
    <div className="flex flex-row gap-4 items-center justify-between w-full p-4">
      {/* ✅ 마이크 & 스피커 컨트롤 */}
      <div className="flex gap-4 items-center">
        <button onClick={toggleMicMute} className={`p-2 rounded ${isMicMuted ? "bg-red-500" : "bg-blue-500"} text-white`}>
          {isMicMuted ? "마이크 켜기" : "마이크 끄기"}
        </button>
        <input type="range" min="0" max="1" step="0.01" value={micVolume} onChange={(e) => adjustMicVolume(parseFloat(e.target.value))} className="w-24" />

        <button onClick={toggleCamera} className={`p-2 rounded ${isCameraOff ? "bg-red-500" : "bg-blue-500"} text-white`}>
          {isCameraOff ? "카메라 켜기" : "카메라 끄기"}
        </button>
        <input type="range" min="0" max="1" step="0.01" value={speakerVolume} onChange={(e) => adjustSpeakerVolume(parseFloat(e.target.value))} className="w-24" />
      </div>

      {/* ✅ STT & 자막 버튼 */}
      <div className="flex gap-4 items-center">
        <button onClick={sttState === "START" ? startSTT : stopSTT} className="p-2 rounded bg-green-500 text-white">
          {sttState === "STOP" ? "자막 OFF" : "자막 ON"}
        </button>
        <button onClick={() => setShowSubtitles((prev) => ({ ...prev, [userId]: !prev[userId] }))} className="p-2 rounded bg-blue-500 text-white">
          {showSubtitles[userId] ? "자막 숨기기" : "자막 보기"}
        </button>
        <button onClick={summarizeScript} className="mt-4 bg-blue-500 text-white p-2 rounded">
          요약 보기
        </button>
      </div>

      {/* ✅ 요약 창 */}
      {showSummary && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center transition-opacity duration-300">
          <div className="bg-white p-6 rounded-lg max-w-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4 text-black">📜 STT 요약</h2>
            <p className="text-black">{summaryText || "요약된 내용이 없습니다."}</p>
            <button onClick={() => setShowSummary(false)} className="mt-4 bg-red-500 text-white p-2 rounded">
              닫기
            </button>
          </div>
        </div>
      )}

      {/* ✅ 나가기 버튼 */}
      <button onClick={onLeaveSession} className="p-2 bg-red-600 text-white rounded">
        나가기
      </button>
      

      {/* ✅ 화면 공유 버튼 */}
      <div className="flex gap-4 items-center">
        <button onClick={onToggleScreenShare} className="p-2 rounded bg-yellow-500 text-white">
          {isScreenSharing ? <LuScreenShareOff className="w-6 h-6" /> : <LuScreenShare className="w-6 h-6" />}
        </button>
      </div>
      {/* ✅ 그리드 스타일 조정 버튼 */}
      <div className="flex gap-2 items-center">
        {layouts.map(({ id, icon: Icon }) => (
          <button key={id} onClick={() => onLayoutChange(id)} className={`p-2 rounded ${currentLayout === id ? "bg-green-500 text-white" : "bg-gray-500 text-white"}`}>
            <Icon className="w-6 h-6" />
          </button>
        ))}
      </div>
    </div>
  );
}