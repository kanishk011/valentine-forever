import { Box, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { useScrollAnimation, fadeInUp } from '../../hooks/useScrollAnimation';

const SectionWrapper = ({
  children,
  id,
  minHeight = '100vh',
  background = 'transparent',
  sx = {},
  containerMaxWidth = 'lg',
  noPadding = false,
}) => {
  const { ref, controls } = useScrollAnimation(0.1);

  return (
    <Box
      id={id}
      component="section"
      sx={{
        minHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background,
        py: noPadding ? 0 : { xs: 8, md: 12 },
        ...sx,
      }}
    >
      <Container maxWidth={containerMaxWidth}>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
        >
          {children}
        </motion.div>
      </Container>
    </Box>
  );
};

export default SectionWrapper;
