import { useState, useEffect, useRef } from 'react';
import useSound from 'use-sound';
import styled, { createGlobalStyle } from 'styled-components';
import StartScreen from './components/StartScreen';
import MainMenu from './components/MainMenu';
import BackgroundVideo from './components/BackgroundVideo';
import ProfileSection from './components/ProfileSection';
import SkillsSection from './components/SkillsSection';
import ProjectsMenu from './components/ProjectsMenu';
import ProjectDetails from './components/ProjectDetails';
import backgroundMusic from './assets/sounds/background-music.mp3';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.cdnfonts.com/css/press-gothic');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Press Gothic', sans-serif;
    overflow: hidden;
    background: #000;
    letter-spacing: 1px;
  }
`;

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const App = () => {
  const [gameState, setGameState] = useState('start');
  const [currentSection, setCurrentSection] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [playBackgroundMusic, { sound }] = useSound(backgroundMusic, {
    volume: 0.3,
    loop: true,
    interrupt: false
  });

  const handleStart = () => {
    playBackgroundMusic();
    setGameState('menu');
  };

  useEffect(() => {
    if (sound) {
      if (gameState === 'section' || gameState === 'projectsMenu' || gameState === 'project') {
        sound.fade(0.3, 0.15, 1000);
      } else {
        sound.fade(0.15, 0.3, 1000);
      }
    }
  }, [gameState, sound]);

  const handleMenuSelect = (section) => {
    setCurrentSection(section);
    if (section === 'projects') {
      setGameState('projectsMenu');
    } else {
      setGameState('section');
    }
  };

  const handleProjectSelect = (projectId) => {
    setSelectedProject(projectId);
    setGameState('project');
  };

  const handleBackToMenu = () => {
    setGameState('menu');
    setCurrentSection(null);
    setSelectedProject(null);
  };

  const handleBackToProjects = () => {
    setGameState('projectsMenu');
    setSelectedProject(null);
  };

  const renderContent = () => {
    switch (gameState) {
      case 'start':
        return <StartScreen onStart={handleStart} />;
      case 'menu':
        return <MainMenu onSelect={handleMenuSelect} />;
      case 'projectsMenu':
        return (
          <ProjectsMenu 
            onBack={handleBackToMenu} 
            onSelect={handleProjectSelect}
          />
        );
      case 'project':
        return (
          <ProjectDetails
            projectId={selectedProject}
            onBack={handleBackToProjects}
          />
        );
      case 'section':
        switch (currentSection) {
          case 'profile':
            return <ProfileSection onBack={handleBackToMenu} />;
          case 'skills':
            return <SkillsSection onBack={handleBackToMenu} />;
          default:
            return null;
        }
      default:
        return null;
    }
  };

  return (
    <AppContainer>
      <GlobalStyle />
      <BackgroundVideo />
      {renderContent()}
    </AppContainer>
  );
};

export default App;
