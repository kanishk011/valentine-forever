import { Box } from '@mui/material';
import { motion } from 'framer-motion';

const StepIndicator = ({ currentStep, totalSteps }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 1,
        zIndex: 100,
        padding: '8px 16px',
        borderRadius: 20,
        background: 'rgba(26, 10, 20, 0.6)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {Array.from({ length: totalSteps }, (_, i) => (
        <motion.div
          key={i}
          animate={{
            scale: currentStep === i ? 1 : 0.8,
            opacity: currentStep === i ? 1 : 0.4,
          }}
          transition={{ duration: 0.3 }}
        >
          <Box
            sx={{
              width: currentStep === i ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background: currentStep === i
                ? 'linear-gradient(90deg, #ff6b9d, #ff9fc4)'
                : 'rgba(255, 107, 157, 0.3)',
              transition: 'width 0.3s ease',
            }}
          />
        </motion.div>
      ))}
    </Box>
  );
};

export default StepIndicator;
