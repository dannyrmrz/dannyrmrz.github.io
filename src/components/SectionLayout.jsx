import styled from 'styled-components';
import { motion } from 'framer-motion';
import useSound from 'use-sound';
import clickSound from '../assets/sounds/click.mp3';

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
    background: rgba(0, 0, 0, 0.75); // Overlay más oscuro
    z-index: 1;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  padding: 2rem;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
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

const Divider = styled(motion.div)`
  height: 1px;
  background: #fff;
  opacity: 0.3;
  margin: 1rem 0 2rem 0;
  width: 100%;
`;

const SectionLayout = ({ title, children, onBack }) => {
  const [playClickSound] = useSound(clickSound);

  const handleBack = () => {
    playClickSound();
    onBack();
  };

  return (
    <Container>
      <Content>
        <Header>
          <BackButton
            onClick={handleBack}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            ←
          </BackButton>
          <Title>{title}</Title>
        </Header>
        <Divider
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.5 }}
        />
        {children}
      </Content>
    </Container>
  );
};

export default SectionLayout; 