import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const VideoContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const BackgroundVideo = () => {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const video = videoRef.current;
    
    if (video) {
      video.play().catch(err => {
        console.error("Error al reproducir el video:", err);
        setError(err);
      });
    }
  }, []);

  const handleLoadedData = () => {
    setIsLoaded(true);
    console.log("Video cargado correctamente");
  };

  const handleError = (e) => {
    console.error("Error en el video:", e);
    setError(e);
  };

  return (
    <VideoContainer>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={handleLoadedData}
        onError={handleError}
      >
        <source src="/BackgroundVideo.mp4" type="video/mp4" />
        Tu navegador no soporta el elemento de video.
      </video>
      {error && <div style={{ color: 'red', position: 'fixed', bottom: 10, left: 10 }}>
        Error al cargar el video: {error.message}
      </div>}
    </VideoContainer>
  );
};

export default BackgroundVideo; 