import { OpenVidu } from 'openvidu-browser';
import { videoApi } from '../../services/api/videoApi';
import { useState, useEffect, useCallback } from 'react';
import UserVideoComponent from '../../components/video/UserVideo';

// const APPLICATION_SERVER_URL = import.meta.env.VITE_APP_OPENVIDU_URL;

const VideoRoom = () => {
    const [session, setSession] = useState(undefined);
    const [mainStreamManager, setMainStreamManager] = useState(undefined);
    const [publisher, setPublisher] = useState(undefined);
    const [subscribers, setSubscribers] = useState([]);
    const [currentVideoDevice, setCurrentVideoDevice] = useState(null);
    
    // OpenVidu 객체
    const OV = new OpenVidu();

    const [mySessionId, setMySessionId] = useState('SessionA');
    const [myUserName, setMyUserName] = useState('Participant' + Math.floor(Math.random() * 100));

    // Token 관련 함수들
    const createSession = async (sessionId) => {
        try {
            const response = await videoApi.createSession(sessionId);
            return response; // sessionId 반환
        } catch (error) {
            console.log('Session creation error:', error);
            throw error;
        }
    };

    const createToken = async (sessionId) => {
        try {
            const response = await videoApi.createToken(sessionId);
            return response; // token 반환
        } catch (error) {
            console.log('Token creation error:', error);
            throw error;
        }
    };

    const getToken = async () => {
        const sessionId = await createSession(mySessionId);
        return await createToken(sessionId);
    };

    // 컴포넌트 마운트/언마운트 처리
    useEffect(() => {
        window.addEventListener('beforeunload', onBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', onBeforeUnload);
            leaveSession();
        };
    }, []);

    const onBeforeUnload = useCallback(() => {
        leaveSession();
    }, []);

    // 세션 참가
    const joinSession = useCallback(async () => {
        const mySession = OV.initSession();

        mySession.on('streamCreated', (event) => {
            const subscriber = mySession.subscribe(event.stream, undefined);
            setSubscribers(prev => [...prev, subscriber]);
        });

        mySession.on('streamDestroyed', (event) => {
            deleteSubscriber(event.stream.streamManager);
        });

        mySession.on('exception', (exception) => {
            console.warn(exception);
        });

        try {
            const token = await getToken();
            await mySession.connect(token, { clientData: myUserName });

            const publisher = await OV.initPublisherAsync(undefined, {
                audioSource: undefined,
                videoSource: undefined,
                publishAudio: true,
                publishVideo: true,
                resolution: '640x480',
                frameRate: 30,
                insertMode: 'APPEND',
                mirror: false,
            });

            mySession.publish(publisher);

            const devices = await OV.getDevices();
            const videoDevices = devices.filter(device => device.kind === 'videoinput');
            const currentVideoDeviceId = publisher.stream.getMediaStream()
                .getVideoTracks()[0].getSettings().deviceId;
            const currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);

            setCurrentVideoDevice(currentVideoDevice);
            setMainStreamManager(publisher);
            setPublisher(publisher);
            setSession(mySession);

        } catch (error) {
            console.log('Error:', error);
        }
    }, [myUserName, mySessionId]);

    // 세션 나가기
    const leaveSession = useCallback(() => {
        if (session) {
            session.disconnect();
        }

        setSession(undefined);
        setSubscribers([]);
        setMySessionId('SessionA');
        setMyUserName('Participant' + Math.floor(Math.random() * 100));
        setMainStreamManager(undefined);
        setPublisher(undefined);
    }, [session]);

    // 카메라 전환
    const switchCamera = useCallback(async () => {
        try {
            const devices = await OV.getDevices();
            const videoDevices = devices.filter(device => device.kind === 'videoinput');

            if (videoDevices && videoDevices.length > 1) {
                const newVideoDevice = videoDevices.find(
                    device => device.deviceId !== currentVideoDevice.deviceId
                );

                if (newVideoDevice) {
                    const newPublisher = OV.initPublisher(undefined, {
                        videoSource: newVideoDevice.deviceId,
                        publishAudio: true,
                        publishVideo: true,
                        mirror: true
                    });

                    await session.unpublish(mainStreamManager);
                    await session.publish(newPublisher);

                    setCurrentVideoDevice(newVideoDevice);
                    setMainStreamManager(newPublisher);
                    setPublisher(newPublisher);
                }
            }
        } catch (e) {
            console.error(e);
        }
    }, [session, currentVideoDevice, mainStreamManager]);

    // 구독자 삭제
    const deleteSubscriber = useCallback((streamManager) => {
        setSubscribers(prev => prev.filter(sub => sub !== streamManager));
    }, []);

    // 메인 비디오 스트림 변경
    const handleMainVideoStream = useCallback((stream) => {
        if (mainStreamManager !== stream) {
            setMainStreamManager(stream);
        }
    }, [mainStreamManager]);

    return (
        <div className="w-full h-screen bg-gray-900 text-white p-4">
            {!session ? (
                <div className="flex flex-col items-center justify-center h-full">
                    <h1 className="text-2xl mb-8">화상 채팅 참가하기</h1>
                    <div className="w-96 p-6 bg-gray-800 rounded-lg">
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            joinSession();
                        }}>
                            <div className="mb-4">
                                <label className="block mb-2">이름:</label>
                                <input
                                    type="text"
                                    className="w-full p-2 bg-gray-700 rounded"
                                    value={myUserName}
                                    onChange={(e) => setMyUserName(e.target.value)}
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block mb-2">세션:</label>
                                <input
                                    type="text"
                                    className="w-full p-2 bg-gray-700 rounded"
                                    value={mySessionId}
                                    onChange={(e) => setMySessionId(e.target.value)}
                                />
                            </div>
                            <button 
                                type="submit"
                                className="w-full bg-blue-600 p-2 rounded hover:bg-blue-700"
                            >
                                참가하기
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="h-full">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-xl">세션: {mySessionId}</h1>
                        <div className="space-x-4">
                            <button
                                onClick={switchCamera}
                                className="bg-green-600 px-4 py-2 rounded"
                            >
                                카메라 전환
                            </button>
                            <button
                                onClick={leaveSession}
                                className="bg-red-600 px-4 py-2 rounded"
                            >
                                나가기
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 h-[calc(100%-80px)]">
                        {mainStreamManager && (
                            <div className="col-span-2 bg-gray-800 rounded">
                                <UserVideoComponent streamManager={mainStreamManager} />
                            </div>
                        )}
                        <div className="space-y-4">
                            {publisher && (
                                <div 
                                    onClick={() => handleMainVideoStream(publisher)}
                                    className="bg-gray-800 rounded cursor-pointer"
                                >
                                    <UserVideoComponent streamManager={publisher} />
                                </div>
                            )}
                            {subscribers.map((sub) => (
                                <div
                                    key={sub.stream.connection.connectionId}
                                    onClick={() => handleMainVideoStream(sub)}
                                    className="bg-gray-800 rounded cursor-pointer"
                                >
                                    <UserVideoComponent streamManager={sub} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoRoom;