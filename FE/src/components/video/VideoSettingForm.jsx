import { useRecoilState } from 'recoil';
import {
  speakerOnState,
  selectedSpeakerState,
  speakerVolumeState,
  micOnState,
  selectedMicState,
  micVolumeState,
  cameraOnState,
  selectedCameraState
} from '../../recoil/atoms/challenge/video/deviceSettings';
import { useNavigate } from 'react-router-dom';
import useMediaStream  from '../../hooks/useMediaStream';
import { useEffect } from 'react';

import { IoVideocam } from "react-icons/io5";
import { IoVideocamOff } from "react-icons/io5";

export default function VideoSettingForm({ onJoin, isLoading }) {
  // Recoil states
  const [speakerOn, setSpeakerOn] = useRecoilState(speakerOnState);
  const [selectedSpeaker, setSelectedSpeaker] = useRecoilState(selectedSpeakerState);
  const [speakerVolume, setSpeakerVolume] = useRecoilState(speakerVolumeState);
  const [micOn, setMicOn] = useRecoilState(micOnState);
  const [selectedMic, setSelectedMic] = useRecoilState(selectedMicState);
  const [micVolume, setMicVolume] = useRecoilState(micVolumeState);
  const [cameraOn, setCameraOn] = useRecoilState(cameraOnState);
  const [selectedCamera, setSelectedCamera] = useRecoilState(selectedCameraState);
  const navigate = useNavigate();

  // useMediaStream 훅 사용
  const { stream, error, devices } = useMediaStream(cameraOn, selectedCamera);
  // 컴포넌트가 언마운트될 때 스트림 정리
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  // 더미 디바이스 리스트
  const dummyDevices = {
    speakers: ['기본값 - 스피커', 'USB 스피커', 'Bluetooth 스피커'],
    mics: ['기본값 - 마이크', 'USB 마이크', 'Bluetooth 마이크'],
    cameras: ['720p HD camera', '1080p FHD camera', 'USB 웹캠']
  };
  // 더미 디바이스 리스트를 실제 디바이스로 교체
  const devicesList = {
    // 스피커와 마이크는 기존 더미 데이터 유지
    speakers: dummyDevices.speakers,
    mics: dummyDevices.mics,
    // 카메라는 실제 디바이스 사용
    cameras: devices.videoDevices
  };
  

  // 핸들러 함수들
  const handleJoinRoom = () => {
    console.log('방 입장하기');
    onJoin();
  };

  const handleExit = () => {
    console.log('나가기');
    navigate('/documents');
  };
  // 폼 제출 핸들러
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onJoin();
  // };  

  return (
    <div className="flex justify-center items-center h-full bg-gray-900 w-full ">
      <div className="w-full max-w-4xl p-8 ">
        <div className="flex gap-8">
          {/* 비디오 화면 */}
          <div className="flex-1 aspect-video bg-gray-800 rounded-lg overflow-hidden border-2 border-blue-300">
            {cameraOn && stream ? (
              <video
                ref={(video) => {
                  if (video) {
                    video.srcObject = stream;
                  }
                }}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <img 
                  src="/src/assets/test/peaples/m6.jpeg" 
                  alt="Preview" 
                  className="rounded-full w-32 h-32 object-cover object-center" 
                />
              </div>
            )}
            {error && (
              <div className="absolute top-0 left-0 right-0 bg-red-500 text-white p-2 text-center">
                카메라 접근 오류: {error}
              </div>
            )}
          </div>
          {/* 컨트롤 패널 */}
          <div className="w-80 space-y-6 bg-gray-800 p-6 rounded-lg">
            {/* 스피커 설정 */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-white">스피커</h3>
                <button
                  onClick={() => setSpeakerOn(!speakerOn)}
                  className={`p-2 rounded ${speakerOn ? 'bg-blue-500' : 'bg-red-500'}`}
                >
                  {speakerOn ? '켜짐' : '꺼짐'}
                </button>
              </div>
              <select
                value={selectedSpeaker}
                onChange={(e) => setSelectedSpeaker(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white"
              >
                {dummyDevices.speakers.map((device) => (
                  <option key={device} value={device}>{device}</option>
                ))}
              </select>
              <input
                type="range"
                min="0"
                max="1"
                value={speakerVolume}
                onChange={(e) => setSpeakerVolume(Number(e.target.value))}
                className="w-full"
                disabled={isLoading}
              />
            </div>

            {/* 마이크 설정 */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-white">마이크</h3>
                <button
                  onClick={() => setMicOn(!micOn)}
                  className={`p-2 rounded ${micOn ? 'bg-blue-500' : 'bg-red-500'}`}
                >
                  {micOn ? '켜짐' : '꺼짐'}
                </button>
              </div>
              <select
                value={selectedMic}
                onChange={(e) => setSelectedMic(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white"
              >
                {dummyDevices.mics.map((device) => (
                  <option key={device} value={device}>{device}</option>
                ))}
              </select>
              <input
                type="range"
                min="0"
                max="1"
                value={micVolume}
                onChange={(e) => setMicVolume(Number(e.target.value))}
                className="w-full"
                disabled={isLoading}
              />
            </div>

            {/* 카메라 설정 - 스피커와 유사한 구조 */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-white">카메라</h3>
                <button
                  onClick={() => setCameraOn(!cameraOn)}
                  className={`p-2 rounded ${cameraOn ? 'bg-blue-500' : 'bg-red-500'}`}
                >
                  {cameraOn ? (<IoVideocam />) : (<IoVideocamOff />)}
                </button>
              </div>
                <select
                  value={selectedCamera}
                  onChange={(e) => setSelectedCamera(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                >
                  {devices.videoDevices.map((device) => (
                    <option key={device.deviceId} value={device.deviceId}>
                      {device.label}
                    </option>
                  ))}
                </select>
            </div>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleJoinRoom}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg"
          >
            {isLoading ? '연결 중...' : '챌린지 입장하기'}
          </button>
          <button
            onClick={handleExit}
            className="p-2 bg-red-500 text-white rounded-lg"
          >
            나가기
          </button>
        </div>
      </div>
    </div>
  );
};
