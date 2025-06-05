import { motion } from 'framer-motion';
import styled from 'styled-components';
import useSound from 'use-sound';
import { useEffect } from 'react';
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

const Text = styled(motion.h1)`
  font-family: 'Press Gothic', sans-serif;
  font-size: 2.5rem;
  position: relative;
  z-index: 2;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const StartScreen = ({ onStart }) => {
  const [playEnterSound] = useSound(enterSound);

  useEffect(() => {
    const handleAnyKeyPress = (event) => {
      // Evitar que se active con teclas modificadoras
      if (event.key !== 'Shift' && 
          event.key !== 'Control' && 
          event.key !== 'Alt' && 
          event.key !== 'Meta' && 
          event.key !== 'CapsLock' && 
          event.key !== 'Tab') {
        playEnterSound();
        onStart();
      }
    };

    window.addEventListener('keydown', handleAnyKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleAnyKeyPress);
    };
  }, [onStart, playEnterSound]);

  const handleClick = () => {
    playEnterSound();
    onStart();
  };

  return (
    <Container onClick={handleClick}>
      <Text
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        PRESS ANY BUTTON
      </Text>
    </Container>
  );
};

export default StartScreen; 