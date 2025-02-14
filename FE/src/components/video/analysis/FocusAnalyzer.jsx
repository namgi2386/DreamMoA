import { useEffect, useRef } from "react";

const FocusAnalysis = ({ serverUrl }) => {
    const socketRef = useRef(null);
    const canvasRef = useRef(document.createElement("canvas"));
    const videoRef = useRef(null);
    const frameBuffer = useRef([]); // ✅ 프레임을 모아두는 버퍼
    const frameInterval = 100; // 🔥 100ms (1초에 10프레임 캡처)
    const batchSize = 10; // ✅ 10개의 프레임을 모아 한 번에 전송
    const mediaStreamRef = useRef(null); // ✅ WebRTC 스트림 추적용
    const intervalRef = useRef(null); // ✅ `setInterval` 추적용

    useEffect(() => {
        socketRef.current = new WebSocket(serverUrl);

        socketRef.current.onopen = () => {
            console.log("✅ WebSocket 연결 성공:", serverUrl);
            startWebRTCStream();
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
            } catch (error) {
                console.error("❌ WebSocket 데이터 오류:", error);
            }
        };

        return () => {
            stopWebRTCStream(); // ✅ WebRTC 스트림 종료
            closeWebSocket(); // ✅ WebSocket 닫기
            if (intervalRef.current) {
                clearInterval(intervalRef.current); // ✅ `setInterval` 정리
            }
        };
    }, [serverUrl]);

    // ✅ WebRTC 스트림을 시작하는 함수
    const startWebRTCStream = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            mediaStreamRef.current = stream;
            videoRef.current.srcObject = stream;
            startFrameCapture(); // ✅ 스트림 시작 후 프레임 캡처 시작
        } catch (error) {
            console.error("❌ WebRTC 스트림 오류:", error);
        }
    };

    // ✅ WebRTC 스트림을 중지하는 함수
    const stopWebRTCStream = () => {
        if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach(track => track.stop());
            mediaStreamRef.current = null;
            if (videoRef.current) {
                videoRef.current.srcObject = null; // ✅ 비디오 스트림 제거
            }
            console.log("🔴 WebRTC 스트림이 중지됨");
        }
    };

    // ✅ WebSocket을 안전하게 종료하는 함수
    const closeWebSocket = () => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.close();
            console.log("🔴 WebSocket이 안전하게 종료됨");
        }
    };

    // ✅ 일정 간격으로 프레임을 캡처하여 버퍼에 저장
    const startFrameCapture = () => {
        intervalRef.current = setInterval(() => {
            captureFrame();
        }, frameInterval);
    };

    // ✅ 프레임을 캡처하여 버퍼에 저장
    const captureFrame = () => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        canvas.width = 640;
        canvas.height = 480;
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

        // 캔버스를 Base64로 변환 후 버퍼에 저장
        canvas.toBlob(
            (blob) => {
                if (blob) {
                    const reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onloadend = () => {
                        const base64Frame = reader.result.split(",")[1]; // Base64 인코딩
                        frameBuffer.current.push(base64Frame);

                        // ✅ 일정 개수(batchSize)만큼 모이면 한 번에 전송
                        if (frameBuffer.current.length >= batchSize) {
                            sendBufferedFrames();
                        }
                    };
                }
            },
            "image/jpeg",
            0.7
        );
    };

    // ✅ 모인 프레임을 한 번에 WebSocket으로 전송
    const sendBufferedFrames = () => {
        if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
            console.warn("⚠️ WebSocket이 닫혀 있어 프레임을 전송할 수 없음.");
            return;
        }

        console.log(`📤 ${batchSize}개 프레임 한 번에 전송 중...`);

        // 🔥 JSON으로 변환하여 한 번에 전송
        socketRef.current.send(JSON.stringify({ frames: frameBuffer.current }));

        // ✅ 전송 후 버퍼 비우기
        frameBuffer.current = [];
    };

    return <video ref={videoRef} autoPlay playsInline style={{ display: "none" }} />;
};

export default FocusAnalysis;
