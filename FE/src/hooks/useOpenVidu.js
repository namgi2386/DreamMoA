// hooks/useOpenVidu.js
import { useState, useCallback, useRef } from 'react';
import { OpenVidu } from 'openvidu-browser';
import { videoApi } from '../services/api/videoApi';

const useOpenVidu = () => {
  // 상태 관리
  const [session, setSession] = useState(undefined); // OpenVidu 세션 객체
  const [mainStreamManager, setMainStreamManager] = useState(undefined); // 메인 화면에 표시될 스트림
  const [publisher, setPublisher] = useState(undefined); // 자신의 비디오 스트림
  const [subscribers, setSubscribers] = useState([]); // 다른 참가자들의 스트림 배열
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null); // 현재 사용 중인 카메라 장치
  const [isLoading, setIsLoading] = useState(false); // 로딩상태관리
  const [error, setError] = useState(null); // 에러상태관리 

  // ▽▼▽▼▽ 기본 함수(환경설정 및 세션연결 등) (57 Line부터 실사용기능 함수나옴) ▽▼▽▼▽▼▽▼▽▼▽▼▽▼▽▼▽▼▽▼▽▼▽▼

  // 에러 초기화 함수
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // OpenVidu 객체는 useRef로 관리
  const OV = useRef(new OpenVidu());
  // 개발환경인 경우
  OV.current.setAdvancedConfiguration({
    websocket: `wss://dreammoa.duckdns.org:443/openvidu`,
    mediaServer: 'https://localhost:8080'
})

  // 세션참여에 필요한 토큰 가져오기 위에서 정의한 두개의 함수 여기서 사용함 세션만들고 토큰받아오고 토큰 리턴해주고.
  const getToken = async (sessionId) => {
    return await videoApi.getToken(sessionId);
};
  
  // ▽▼▽▼▽▼▽▼▽▼▽▼▽▼ 아래 부터가 진짜 기능들 ▽▼▽▼▽▼▽▼▽▼▽▼▽▼▽▼▽▼▽▼▽▼▽▼▽▼▽▼▽▼▽▼

  // ☆★☆★☆★ 세션 연결 함수 (방생성 방참가) ☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★
  const connectSession = useCallback(async (sessionName, userName) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const mySession = OV.current.initSession();
  
      // 다른 참가자의 스트림이 생성될 때 : 스트림 생성 이벤트 핸들러
      mySession.on('streamCreated', (event) => {
        const subscriber = mySession.subscribe(event.stream, undefined);
        setSubscribers(prev => [...prev, subscriber]);
      });
  
      // 참가자가 나갈 때 : 스트림 제거 이벤트 핸들러
      mySession.on('streamDestroyed', (event) => {
        setSubscribers(prev => prev.filter(sub => sub !== event.stream.streamManager));
      });
  
      // 예외 처리 핸들러
      mySession.on('exception', (exception) => {
        console.warn('OpenVidu 예외:', exception);
      });
      
      // 토큰 발급 및 연결 (세션+토큰발급 하기)
      const token = await getToken(sessionName);
      console.log("토큰줘", token , userName ); // 토큰 도착 성공
      console.log("마이세션", mySession);
      
      
      await mySession.connect(token, { clientData: userName }); // 
      console.log("컴백");
      

      // 게시자 초기화 (자신의 비디오 스트림 설정)
      const publisher = await OV.current.initPublisherAsync(undefined, {
        audioSource: undefined,  // 기본 마이크
        videoSource: undefined,  // 기본 카메라
        publishAudio: true,      // 오디오 활성화
        publishVideo: true,      // 비디오 활성화
        resolution: '640x480',   // 해상도
        frameRate: 30,           // FPS
        insertMode: 'APPEND',    
        mirror: true,           // 미러링 비활성화
      });

      // 스트림 발행( 나의 비디오 스트림 설정으로 )
      await mySession.publish(publisher);

      // 비디오 장치 정보 설정
      const devices = await OV.current.getDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      const currentVideoDeviceId = publisher.stream.getMediaStream()
        .getVideoTracks()[0].getSettings().deviceId;
      const currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);

      // 상태 업데이트
      setCurrentVideoDevice(currentVideoDevice);
      setMainStreamManager(publisher);
      setPublisher(publisher);
      setSession(mySession);

    } catch (error) {
      console.error('세션 연결 오류:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 세션 나가기 : 모든 상태를 초기화하고 연결 종료
  const disconnectSession = useCallback(() => {
    if (session) {
      //세션 끊어버리기 
      session.disconnect();
      // 상태 초기화
      setSession(undefined);
      setSubscribers([]);
      setMainStreamManager(undefined);
      setPublisher(undefined);
    }
  }, [session]);


   // 카메라 전환 함수 : 사용 가능한 다른 카메라로 전환
  const switchCamera = useCallback(async () => {
    try {
      const devices = await OV.current.getDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');

      if (videoDevices && videoDevices.length > 1) {
        const newVideoDevice = videoDevices.find(
          device => device.deviceId !== currentVideoDevice.deviceId
        );

        if (newVideoDevice) {
          // 새로운 비디오 스트림 생성
          const newPublisher = OV.current.initPublisher(undefined, {
            videoSource: newVideoDevice.deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true
          });
          // 스트림 교체
          await session.unpublish(mainStreamManager);  // 기존 세션 헤제
          await session.publish(newPublisher); // 새로운 세션 연결
          // 상태 업데이트
          setCurrentVideoDevice(newVideoDevice);
          setMainStreamManager(newPublisher);
          setPublisher(newPublisher);
        }
      }
    } catch (error) {
      console.error('카메라 전환 오류:', error);
      throw error;
    }
  }, [session, currentVideoDevice, mainStreamManager]);

  // 메인 비디오 스트림 변경 함수
  const updateMainStreamManager = useCallback((stream) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  }, [mainStreamManager]);

  return {
    session, // OpenVidu 세션 객체
    mainStreamManager, // // 메인 화면에 표시될 스트림
    publisher, // 게시자 초기화 (자신의 비디오 스트림 설정)
    subscribers, // 다른 스트림 유저정보들
    connectSession, // 세션 연결
    disconnectSession, // 세션 헤제
    switchCamera, // 카메라전환
    updateMainStreamManager, // 메인스트림교체
    isLoading, // 로딩
    error, // 에러
    clearError // 에러초기화
  };
};

export default useOpenVidu;