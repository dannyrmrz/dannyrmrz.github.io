import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import useSound from 'use-sound';
import clickSound from '../assets/sounds/click.mp3';
import enterSound from '../assets/sounds/enter.mp3';

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

const MenuContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 10%;
`;

const MenuList = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const MenuItem = styled(motion.h2)`
  font-family: 'Press Gothic', sans-serif;
  font-size: 2.5rem;
  cursor: pointer;
  opacity: ${props => props.$selected ? 1 : 0.4};
  transition: opacity 0.3s ease;
  letter-spacing: 2px;
  text-transform: uppercase;

  &:hover {
    opacity: 1;
  }
`;

const projectItems = [
  { id: 'erp', label: 'ERP' },
  { id: 'calculator', label: 'Calculadora' }
];

const ProjectsMenu = ({ onBack, onSelect }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [playClickSound] = useSound(clickSound);
  const [playEnterSound] = useSound(enterSound);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch(e.key) {
        case 'ArrowUp':
          playClickSound();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : projectItems.length - 1));
          break;
        case 'ArrowDown':
          playClickSound();
          setSelectedIndex((prev) => (prev < projectItems.length - 1 ? prev + 1 : 0));
          break;
        case 'Enter':
          playEnterSound();
          onSelect(projectItems[selectedIndex].id);
          break;
        case 'Escape':
          playClickSound();
          onBack();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, playClickSound, playEnterSound, onSelect, onBack]);

  return (
    <Container>
      <HeaderSection>
        <Header>
          <BackButton
            onClick={() => {
              playClickSound();
              onBack();
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            ←
          </BackButton>
          <Title>Proyectos</Title>
        </Header>
        <DividerContainer>
          <Divider
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.5 }}
          />
        </DividerContainer>
      </HeaderSection>
      <MenuContainer>
        <MenuList>
          {projectItems.map((item, index) => (
            <MenuItem
              key={item.id}
              $selected={index === selectedIndex}
              onMouseEnter={() => {
                if (index !== selectedIndex) {
                  playClickSound();
                  setSelectedIndex(index);
                }
              }}
              onClick={() => {
                playEnterSound();
                onSelect(item.id);
              }}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: index === selectedIndex ? 1 : 0.4 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {item.label}
            </MenuItem>
          ))}
        </MenuList>
      </MenuContainer>
    </Container>
  );
};

export default ProjectsMenu; 