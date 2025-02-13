import { useEffect, useRef } from "react";

const FocusAnalysis = ({ serverUrl }) => {
    const socketRef = useRef(null);
    const canvasRef = useRef(document.createElement("canvas"));
    const videoRef = useRef(null);
    const frameInterval = 100; // 🔥 1초에 10프레임 전송
    const isCapturing = useRef(false); // ✅ 중복 실행 방지
    const isSocketReady = useRef(true); // ✅ WebSocket 전송 속도 조절

    useEffect(() => {
        socketRef.current = new WebSocket(serverUrl);

        socketRef.current.onopen = () => {
            console.log("✅ WebSocket 연결 성공:", serverUrl);
            waitForVideoElement();
        };

        socketRef.current.onerror = (error) => console.error("❌ WebSocket 에러:", error);

        socketRef.current.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log("📡 집중도 분석 결과:", data.focus_prediction);
                console.log("📊 신뢰도:", data.confidence);
                console.log("📱 핸드폰 감지:", data.phone_detected ? "📱 감지됨" : "⭕ 미감지");
                console.log("👀 시선 방향:", data.eye_direction);
                console.log("🤖 머리 기울기:", data.head_tilt);
                console.log("----------------------------------------------------");

                // ✅ WebSocket 응답을 받은 후 다음 프레임을 전송할 준비 완료
                isSocketReady.current = true;
            } catch (error) {
                console.error("❌ WebSocket 데이터 오류:", error);
            }
        };

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, [serverUrl]);

    // ✅ 비디오가 렌더링될 때까지 대기하는 함수
    const waitForVideoElement = () => {
        const checkVideo = () => {
            const videoElement = document.querySelector("video");
            if (videoElement) {
                videoRef.current = videoElement;
                if (!isCapturing.current) {
                    startFrameCapture(); // ✅ 중복 실행 방지
                    isCapturing.current = true;
                }
            } else {
                setTimeout(checkVideo, 500);
            }
        };
        checkVideo();
    };

    // ✅ 일정 간격으로 프레임을 캡처하여 WebSocket으로 전송
    const startFrameCapture = () => {
        setInterval(() => {
            if (isSocketReady.current) {
                sendFrame();
            }
        }, frameInterval);
    };

    // ✅ 프레임을 캡처하여 WebSocket으로 전송
    const sendFrame = () => {
        const videoElement = videoRef.current;
        if (!videoElement || !socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
            return;
        }

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        canvas.width = 640; // ✅ 해상도 조절
        canvas.height = 480;
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

        // ✅ canvas.toDataURL()을 사용하여 동기적 변환 (속도 향상)
        const base64Frame = canvas.toDataURL("image/jpeg", 0.7).split(",")[1]; // 🔥 JPEG 품질 0.7로 낮춤

        // ✅ WebSocket으로 전송
        socketRef.current.send(JSON.stringify({ frame: base64Frame }));
    };

    return null;
};

export default FocusAnalysis;
