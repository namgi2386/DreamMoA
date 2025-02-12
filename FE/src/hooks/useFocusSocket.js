import { useState, useEffect } from "react";
import io from "socket.io-client";

const useFocusSocket = (serverUrl) => {
    const [focusData, setFocusData] = useState(null);
    const socket = io(serverUrl, { transports: ["websocket"] });

    useEffect(() => {
        socket.on("connect", () => {
            console.log("✅ WebSocket 연결 성공:", serverUrl);
        });

        socket.on("focus_result", (data) => {
            console.log("📡 받은 집중 예측 결과:", data.focus_prediction);
            setFocusData(data.focus_prediction);  // 🔥 0 or 1 저장
        });

        socket.on("error", (err) => {
            console.error("❌ WebSocket 에러 발생:", err);
        });

        socket.on("disconnect", () => {
            console.log("🔴 WebSocket 연결 종료");
        });

        return () => {
            socket.disconnect();
        };
    }, [serverUrl]);

    return { focusData, socket };
};

export default useFocusSocket;
