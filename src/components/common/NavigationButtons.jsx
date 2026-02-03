import { Box, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const NavigationButtons = ({ onPrev, onNext, showPrev = true, showNext = true, nextLabel }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 70,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        gap: 3,
        zIndex: 100,
        px: 3,
      }}
    >
      {showPrev && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <IconButton
            onClick={onPrev}
            sx={{
              background: 'rgba(255, 107, 157, 0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 107, 157, 0.2)',
              color: '#ff9fc4',
              width: 50,
              height: 50,
              '&:hover': {
                background: 'rgba(255, 107, 157, 0.25)',
              },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </motion.div>
      )}

      {showNext && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Box
            onClick={onNext}
            sx={{
              background: 'linear-gradient(135deg, #ff6b9d 0%, #ff9fc4 100%)',
              color: '#1a0a14',
              px: 4,
              py: 1.5,
              borderRadius: 25,
              cursor: 'pointer',
              fontFamily: '"Quicksand", sans-serif',
              fontWeight: 600,
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              boxShadow: '0 4px 20px rgba(255, 107, 157, 0.3)',
            }}
          >
            {nextLabel || 'Continue'}
            <ArrowForwardIcon sx={{ fontSize: 18 }} />
          </Box>
        </motion.div>
      )}
    </Box>
  );
};

export default NavigationButtons;
