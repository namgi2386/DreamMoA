import { useEffect, useRef } from 'react';

const UserVideoComponent = ({ streamManager }) => {
    const videoRef = useRef();

    useEffect(() => {
        if (streamManager && videoRef.current) {
            streamManager.addVideoElement(videoRef.current);
        }
    }, [streamManager]);

    return (
        <video autoPlay={true} ref={videoRef} className="w-full h-full rounded" />
    );
};

export default UserVideoComponent;