import styled from 'styled-components';
import { motion } from 'framer-motion';
import SectionLayout from './SectionLayout';

const SkillsContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 800px;
`;

const SkillCategory = styled(motion.div)`
  margin-bottom: 3rem;
`;

const CategoryTitle = styled.h2`
  font-family: 'Press Gothic', sans-serif;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  letter-spacing: 1px;
  opacity: 0.9;
`;

const SkillItem = styled(motion.div)`
  margin-bottom: 1.5rem;
`;

const SkillHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-family: 'Press Gothic', sans-serif;
  letter-spacing: 1px;
`;

const SkillName = styled.span`
  font-size: 1.2rem;
  opacity: 0.9;
`;

const SkillPercentage = styled.span`
  font-size: 1.2rem;
  opacity: 0.7;
`;

const ProgressBarBackground = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
`;

const ProgressBarFill = styled(motion.div)`
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 2px;
`;

const LanguagesList = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
`;

const LanguageItem = styled(motion.div)`
  font-family: 'Press Gothic', sans-serif;
  font-size: 1.2rem;
  padding: 0.8rem 1.2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  text-align: center;
  letter-spacing: 1px;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const frameworks = [
  { name: 'React', percentage: 90 },
  { name: 'Vue', percentage: 80 },
  { name: 'Svelte', percentage: 75 },
  { name: 'Jetpack Compose', percentage: 50 }
];

const languages = [
  'C++', 'C#', 'Java', 'Javascript', 'Python', 'CSS'
];

const SkillsSection = ({ onBack }) => {
  return (
    <SectionLayout title="Habilidades" onBack={onBack}>
      <SkillsContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <SkillCategory>
          <CategoryTitle>Frameworks</CategoryTitle>
          {frameworks.map((skill, index) => (
            <SkillItem
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <SkillHeader>
                <SkillName>{skill.name}</SkillName>
                <SkillPercentage>{skill.percentage}%</SkillPercentage>
              </SkillHeader>
              <ProgressBarBackground>
                <ProgressBarFill
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.percentage}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </ProgressBarBackground>
            </SkillItem>
          ))}
        </SkillCategory>

        <SkillCategory>
          <CategoryTitle>Lenguajes de Programación</CategoryTitle>
          <LanguagesList>
            {languages.map((language, index) => (
              <LanguageItem
                key={language}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {language}
              </LanguageItem>
            ))}
          </LanguagesList>
        </SkillCategory>
      </SkillsContainer>
    </SectionLayout>
  );
};

export default SkillsSection; 