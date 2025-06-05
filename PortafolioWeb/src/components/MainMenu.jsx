import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import useSound from 'use-sound';
import clickSound from '../assets/sounds/click.mp3';
import enterSound from '../assets/sounds/enter.mp3';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  padding-left: 10%;
  color: #fff;
  position: relative;
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

const menuItems = [
  { id: 'profile', label: 'Perfil' },
  { id: 'projects', label: 'Proyectos' },
  { id: 'skills', label: 'Habilidades' }
];

const MainMenu = ({ onSelect }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [playClickSound] = useSound(clickSound);
  const [playEnterSound] = useSound(enterSound);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch(e.key) {
        case 'ArrowUp':
          playClickSound();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : menuItems.length - 1));
          break;
        case 'ArrowDown':
          playClickSound();
          setSelectedIndex((prev) => (prev < menuItems.length - 1 ? prev + 1 : 0));
          break;
        case 'Enter':
          playEnterSound();
          onSelect(menuItems[selectedIndex].id);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, playClickSound, playEnterSound, onSelect]);

  return (
    <Container>
      <MenuList>
        {menuItems.map((item, index) => (
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
    </Container>
  );
};

export default MainMenu; 