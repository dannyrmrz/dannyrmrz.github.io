import styled from 'styled-components';
import { motion } from 'framer-motion';
import SectionLayout from './SectionLayout';

const Description = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.8;
  max-width: 800px;
  opacity: 0.9;
  font-family: 'Press Gothic', sans-serif;
  letter-spacing: 1px;
`;

const ProfileSection = ({ onBack }) => {
  return (
    <SectionLayout title="Perfil" onBack={onBack}>
      <Description
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Currently pursuing a college degree in Computer Science at Universidad del Valle de Guatemala, 
        I have developed advanced knowledge in programming languages including C#, C++, Java, Python, 
        JavaScript, TypeScript, Kotlin, and CSS. I am experienced with modern frameworks such as React, 
        Svelte, Vue, and Jetpack Compose. My technical skill set also includes proficiency in analytics 
        management, basic accounting systems, and strong command of Microsoft Office tools. I possess 
        solid critical thinking skills, adaptability, and advanced English proficiency, which support 
        my ability to work effectively in technical environments.
      </Description>
    </SectionLayout>
  );
};

export default ProfileSection; 