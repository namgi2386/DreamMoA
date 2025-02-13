import { useEffect, useRef } from "react";

const FocusAnalysis = ({ serverUrl }) => {
    const socketRef = useRef(null);
    const canvasRef = useRef(document.createElement("canvas")); // ✅ 캔버스를 사용해 프레임을 캡처
    const videoRef = useRef(null); // ✅ 비디오 엘리먼트 참조
    const frameInterval = 100; // 🔥 100ms마다 (1초에 10프레임) 전송

    useEffect(() => {
        socketRef.current = new WebSocket(serverUrl);

        socketRef.current.onopen = () => {
            console.log("✅ WebSocket 연결 성공:", serverUrl);
            waitForVideoElement(); // ✅ 비디오 렌더링될 때까지 대기 후 프레임 캡처 시작
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
                startFrameCapture(); // ✅ 비디오가 렌더링되면 프레임 전송 시작
            } else {
                setTimeout(checkVideo, 500); // ✅ 비디오가 없으면 500ms 후 다시 체크
            }
        };
        checkVideo();
    };

    // ✅ 일정 간격으로 프레임을 캡처하여 WebSocket으로 전송하는 함수
    const startFrameCapture = () => {
        setInterval(() => {
            sendFrame();
        }, frameInterval); // 🔥 1초에 10프레임만 전송하도록 조절
    };

    // ✅ 프레임을 캡처하여 WebSocket으로 전송하는 함수
    const sendFrame = () => {
        const videoElement = videoRef.current;
        if (!videoElement || !socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
            return;
        }

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        canvas.width = 640; // 🔥 해상도를 고정하여 YOLO 감지 성능 유지
        canvas.height = 480;
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

        // 캔버스를 Base64 이미지로 변환 후 WebSocket으로 전송
        canvas.toBlob(
            (blob) => {
                if (blob) {
                    const reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onloadend = () => {
                        const base64Frame = reader.result.split(",")[1]; // Base64 인코딩
                        socketRef.current.send(JSON.stringify({ frame: base64Frame }));
                    };
                }
            },
            "image/jpeg",
            0.8 // 🔥 JPEG 품질 조정 (0.8 정도 유지)
        );
    };

    return null;
};

export default FocusAnalysis;
