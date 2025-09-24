import { motion } from 'framer-motion';
import styled from 'styled-components';
import useSound from 'use-sound';
import clickSound from '../assets/sounds/click.mp3';
import { useEffect } from 'react';
import SectionLayout from './SectionLayout';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  color: #fff;
  
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.75);
    z-index: 1;
  }
`;

const HeaderSection = styled.div`
  position: absolute;
  top: 2rem;
  left: 0;
  right: 0;
  z-index: 2;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
  padding: 0 2rem;
`;

const DividerContainer = styled.div`
  padding: 0 2rem;
`;

const Divider = styled(motion.div)`
  height: 1px;
  background: #fff;
  opacity: 0.3;
  width: 100%;
`;

const BackButton = styled(motion.button)`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  opacity: 0.7;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const Title = styled.h1`
  font-family: 'Press Gothic', sans-serif;
  font-size: 2.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 0;
`;

const ContentContainer = styled.div`
  display: flex;
  gap: 2rem;
  max-width: 1600px;
  margin: 0;
`;

const TextContent = styled(motion.div)`
  flex: 1;
  font-size: 1.1rem;
  line-height: 1.6;
  letter-spacing: 0.5px;
`;

const ImageContainer = styled(motion.div)`
  flex: 0 0 400px;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

const OverlayText = styled.span`
  color: white;
  font-size: 1.2rem;
  text-align: center;
  font-family: 'Press Gothic', sans-serif;
`;

const VideoContainer = styled(motion.div)`
  margin-top: 2rem;
  width: 100%;
  max-width: 800px;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  overflow: hidden;
`;

const ProjectVideo = styled.video`
  width: 100%;
  height: auto;
  display: block;
  background: #000;
`;

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

const VideoOverlayText = styled.span`
  color: white;
  font-size: 1.2rem;
  text-align: center;
  font-family: 'Press Gothic', sans-serif;
`;

const projectData = {
  erp: {
    title: 'ERP',
    description: 'Sistema de gestión empresarial (ERP) para EconoFarma, una farmacia ubicada en el interior de Guatemala, con el objetivo de automatizar sus operaciones clave como ventas, inventario, contabilidad, documentación sanitaria y gestión de proveedores. La aplicación está diseñada para mejorar la eficiencia operativa y la toma de decisiones estratégicas, adaptándose a las necesidades de distintos roles dentro de la farmacia. Para el frontend se utilizó React 19 con Vite 6.2 y el plugin oficial de React, mientras que el backend fue construido con Express 5.1, PostgreSQL como base de datos (a través del cliente pg 8.13.3), y herramientas complementarias como dotenv para variables de entorno, cors para manejo de acceso HTTP y nodemon para recarga automática durante el desarrollo.',
    image: '/src/assets/images/erp-preview.png',
    video: '/src/assets/videos/ERPvideo.mp4',
    repoUrl: 'https://github.com/DufreyM/ERP-frontend.git'
  },
  calculator: {
    title: 'Calculadora',
    description: 'Calculadora web interactiva, utilizando React para la construcción de componentes y Vite como empaquetador para un desarrollo rápido y eficiente. La aplicación permite realizar operaciones aritméticas básicas a través de una interfaz moderna, responsiva e intuitiva.',
    image: 'images/calculator-preview.png',
    video: 'videos/calculadoravideo.mp4',
    repoUrl: 'https://github.com/dannyrmrz/CalculadoraSi.git'
  },
  amiibo: {
    title: 'Amiibo Snatch',
    description: 'Aplicación interactiva que permite la lectura de figuras Amiibo mediante tecnología NFC, mostrando automáticamente en pantalla el perfil del personaje detectado. El proyecto se desarrolló principalmente en C++ y C para la comunicación con el lector NFC y el procesamiento de bajo nivel, mientras que JavaScript, HTML y CSS conforman el frontend encargado de la visualización de los perfiles. Adicionalmente, se empleó Python para tareas auxiliares de integración y manejo de datos. La aplicación combina hardware y software para crear una experiencia inmersiva de detección y visualización de figuras Amiibo.',
    image: '/src/assets/images/amiibo.jpeg',
    video: '/videos/amiibovideo.mp4',
    repoUrl: 'https://github.com/PeDro0210/Amiibo-Snatch'
  }
};

const ProjectDetails = ({ projectId, onBack }) => {
  const project = projectData[projectId];
  const [playClickSound] = useSound(clickSound);

  if (!project) return null;

  const handleBack = () => {
    playClickSound();
    if (typeof onBack === 'function') {
      onBack();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto-play video when component mounts
  useEffect(() => {
    const video = document.getElementById(`project-video-${projectId}`);
    if (video) {
      console.log('Video element found:', video);
      console.log('Video src:', video.src);
      video.play().catch(error => {
        console.log('Auto-play was prevented:', error);
      });
    } else {
      console.log('Video element not found for project:', projectId);
    }
  }, [projectId]);

  return (
    <SectionLayout title={project.title} onBack={onBack}>
      <ContentContainer>
        <TextContent
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {project.description}
        </TextContent>
        <ImageContainer
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ProjectImage 
            src={project.image} 
            alt={project.title}
            onClick={() => window.open(project.repoUrl, '_blank')}
          />
          <ImageOverlay onClick={() => window.open(project.repoUrl, '_blank')}>
            <OverlayText>Ir al repositorio de Github</OverlayText>
          </ImageOverlay>
        </ImageContainer>
      </ContentContainer>
      {project.video && (
        <VideoContainer
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <ProjectVideo
            id={`project-video-${projectId}`}
            src={project.video}
            controls
            loop
            muted
            playsInline
            preload="metadata"
          />
          <VideoOverlay>
            <VideoOverlayText>Video Demostrativo</VideoOverlayText>
          </VideoOverlay>
        </VideoContainer>
      )}
    </SectionLayout>
  );
};

export default ProjectDetails; 