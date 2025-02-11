// hooks/ai/useAIDetectionSocket.js

import { useEffect, useRef, useState } from 'react';

const useAIDetectionSocket = (sessionId, userId, isEnabled = true) => {
  // WebSocket 연결 객체 참조
  const socketRef = useRef(null);
  // 연결 상태 관리
  const [isConnected, setIsConnected] = useState(false);
  // AI 분석 결과 상태 관리
  const [aiResult, setAiResult] = useState(null);

  useEffect(() => {
    // isEnabled가 false면 연결을 시도하지 않음
    if (!isEnabled) return;

    // WebSocket 연결 생성 함수
    const connectSocket = () => {
      try {
        // ★★웹소켓 서버 URL을 본인의 서버 URL로 수정★★
        socketRef.current = new WebSocket('ws://your-server-url/ai-detection');

        // 연결 성공 시 핸들러
        socketRef.current.onopen = () => {
          console.log('AI Detection WebSocket Connected');
          setIsConnected(true);
          
          // 연결 직후 사용자 식별 정보 전송
          const initData = {
            type: 'init',
            sessionId: sessionId,
            userId: userId,
            // ★★필요한 경우 인증 토큰 추가★★
            // authToken: localStorage.getItem('token')
          };
          socketRef.current.send(JSON.stringify(initData));
        };

        // 서버로부터 메시지 수신 핸들러
        socketRef.current.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            setAiResult(data);
          } catch (error) {
            console.error('Error parsing AI result:', error);
          }
        };

        // 연결 종료 핸들러
        socketRef.current.onclose = () => {
          console.log('AI Detection WebSocket Disconnected');
          setIsConnected(false);
          
          // 자동 재연결 시도
          if (isEnabled) {
            setTimeout(connectSocket, 3000);
          }
        };

        // 에러 핸들러
        socketRef.current.onerror = (error) => {
          console.error('WebSocket Error:', error);
          setIsConnected(false);
        };
      } catch (error) {
        console.error('Error creating WebSocket:', error);
      }
    };

    connectSocket();

    // 컴포넌트 언마운트 또는 isEnabled 변경 시 연결 종료
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, [sessionId, userId, isEnabled]);

  // 프레임 전송 함수
  const sendFrame = (frameData) => {
    if (!isEnabled) return;
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      try {
        const message = {
          type: 'frame',
          sessionId: sessionId,
          userId: userId,
          frame: frameData
        };
        socketRef.current.send(JSON.stringify(message));
      } catch (error) {
        console.error('Error sending frame:', error);
      }
    }
  };

  return {
    isConnected: isEnabled && isConnected,
    sendFrame,
    aiResult: isEnabled ? aiResult : null
  };
};

export default useAIDetectionSocket;