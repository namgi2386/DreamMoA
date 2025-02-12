import { useEffect, useRef } from "react";
import * as poseDetection from "@tensorflow-models/pose-detection";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

const FocusAnalysis = ({ videoRef, socket }) => {
    const detectorRef = useRef(null);  // 🔥 Mediapipe 포즈 감지 모델
    const yoloModelRef = useRef(null); // 🔥 YOLO 휴대폰 감지 모델

    useEffect(() => {
        // ✅ Mediapipe & YOLO 모델 로드
        const loadModels = async () => {
            detectorRef.current = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet);
            yoloModelRef.current = await cocoSsd.load();
        };
        loadModels();

        // ✅ 1초마다 프레임 캡처 및 데이터 전송
        const captureFrames = async () => {
            if (!videoRef.current || !detectorRef.current || !yoloModelRef.current) return;

            let frameData = [];
            let phoneDetected = 0; // 🔥 한 번이라도 감지되면 1로 설정

            for (let i = 0; i < 30; i++) { // 🔥 30 프레임(대략 1초 동안) 저장
                const pose = await detectorRef.current.estimatePoses(videoRef.current.video);
                const objects = await yoloModelRef.current.detect(videoRef.current.video);

                const frame = {
                    frame_index: i,
                    head_x: pose[0]?.keypoints[0]?.x || 0,
                    head_y: pose[0]?.keypoints[0]?.y || 0,
                    neck_x: ((pose[0]?.keypoints[5]?.x || 0) + (pose[0]?.keypoints[6]?.x || 0)) / 2,
                    neck_y: ((pose[0]?.keypoints[5]?.y || 0) + (pose[0]?.keypoints[6]?.y || 0)) / 2,
                    shoulder_left_x: pose[0]?.keypoints[5]?.x || 0,
                    shoulder_left_y: pose[0]?.keypoints[5]?.y || 0,
                    shoulder_right_x: pose[0]?.keypoints[6]?.x || 0,
                    shoulder_right_y: pose[0]?.keypoints[6]?.y || 0,
                    wrist_left_x: pose[0]?.keypoints[9]?.x || 0,
                    wrist_left_y: pose[0]?.keypoints[9]?.y || 0,
                    wrist_right_x: pose[0]?.keypoints[10]?.x || 0,
                    wrist_right_y: pose[0]?.keypoints[10]?.y || 0,
                    head_tilt: pose[0]?.keypoints[0]?.z || 0,
                    eye_direction: ((pose[0]?.keypoints[1]?.x || 0) + (pose[0]?.keypoints[2]?.x || 0)) / 2,
                    phone_detected: objects.some((obj) => obj.class === "cell phone") ? 1 : 0
                };

                if (frame.phone_detected === 1) {
                    phoneDetected = 1;
                }

                frameData.push(frame);
                await new Promise(r => setTimeout(r, 33)); // 🔥 30fps 기준 약 33ms 대기
            }

            // ✅ WebSocket 전송 데이터
            const payload = {
                timestamp: Date.now(),
                frame_data: frameData, // 🔥 30프레임 전체 포함
                phone_detected_percentage: phoneDetected, // 🔥 1초 동안 한 번이라도 감지되면 1
                head_tilt: frameData[frameData.length - 1].head_tilt, // 🔥 마지막 프레임 값
                eye_direction: frameData[frameData.length - 1].eye_direction // 🔥 마지막 프레임 값
            };

            console.log("📡 보낼 데이터:", payload);
            socket.emit("send_focus_data", payload);
        };

        // ✅ 1초마다 실행
        const interval = setInterval(captureFrames, 1000);
        
        return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
    }, [videoRef, socket]);

    return null;
};

export default FocusAnalysis;
