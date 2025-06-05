import styled from 'styled-components';
import { motion } from 'framer-motion';
import SectionLayout from './SectionLayout';

const ProjectContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 800px;
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.8;
  opacity: 0.9;
  font-family: 'Press Gothic', sans-serif;
  letter-spacing: 1px;
`;

const projectData = {
  erp: {
    title: 'ERP',
    description: 'Sistema de planificación de recursos empresariales (ERP) desarrollado con React y Node.js. Incluye módulos de gestión de inventario, contabilidad, recursos humanos y generación de reportes. Implementa autenticación JWT y manejo de roles de usuario.'
  },
  amiibo: {
    title: 'Amiibo',
    description: 'Aplicación web que consume la API de Amiibo de Nintendo para mostrar información detallada sobre las figuras Amiibo. Desarrollada con Vue.js, implementa filtrado dinámico, búsqueda en tiempo real y visualización de detalles de cada figura.'
  },
  calculator: {
    title: 'Calculadora',
    description: 'Calculadora científica web desarrollada con Svelte. Incluye funciones básicas y avanzadas, historial de operaciones, temas personalizables y soporte para atajos de teclado. Diseñada con un enfoque en la accesibilidad y la experiencia de usuario.'
  }
};

const ProjectSection = ({ projectId, onBack }) => {
  const project = projectData[projectId];

  if (!project) return null;

  return (
    <SectionLayout title={project.title} onBack={onBack}>
      <ProjectContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Description>
          {project.description}
        </Description>
      </ProjectContainer>
    </SectionLayout>
  );
};

export default ProjectSection; 