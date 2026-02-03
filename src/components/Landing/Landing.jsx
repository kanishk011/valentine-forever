import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { FloatingHearts, StepIndicator } from '../common';

const textLines = [
  { text: "Hi my love", delay: 0 },
  { text: "This is not just a website...", delay: 2 },
  { text: "This is my heart, written in code.", delay: 4 },
];

const Landing = ({ onNext, currentStep, totalSteps }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timers = [];

    textLines.forEach((_, index) => {
      if (index > 0) {
        timers.push(setTimeout(() => {
          setCurrentLine(index);
        }, textLines[index].delay * 1000));
      }
    });

    timers.push(setTimeout(() => {
      setShowButton(true);
    }, 6500));

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          minHeight: '100vh',
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          px: 3,
          pb: 12,
        }}
      >
        <FloatingHearts count={6} />

        {/* Subtle glow */}
        <Box
          sx={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '50%',
            background: 'radial-gradient(ellipse at center, rgba(255, 107, 157, 0.1) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />

        {/* Content */}
        <Box sx={{ textAlign: 'center', zIndex: 1, maxWidth: 500 }}>
          {/* Heart icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          >
            <FavoriteIcon
              sx={{
                fontSize: { xs: 50, sm: 60 },
                color: '#ff6b9d',
                mb: 3,
                filter: 'drop-shadow(0 0 15px rgba(255, 107, 157, 0.4))',
              }}
            />
          </motion.div>

          {/* Text lines */}
          {textLines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: currentLine >= index ? 1 : 0,
                y: currentLine >= index ? 0 : 20,
              }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <Typography
                sx={{
                  fontSize: index === 0
                    ? { xs: '2.5rem', sm: '3.5rem' }
                    : { xs: '1rem', sm: '1.2rem' },
                  fontFamily: index === 0 ? '"Sacramento", cursive' : '"Quicksand", sans-serif',
                  color: index === 0 ? '#ff6b9d' : '#ffb6c1',
                  mb: index === 0 ? 3 : 1.5,
                  fontWeight: index === 0 ? 400 : 300,
                  lineHeight: 1.4,
                }}
              >
                {line.text}
              </Typography>
            </motion.div>
          ))}

          {/* Begin button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: showButton ? 1 : 0,
              y: showButton ? 0 : 20,
            }}
            transition={{ duration: 0.6 }}
          >
            <Box
              onClick={onNext}
              sx={{
                mt: 5,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                background: 'linear-gradient(135deg, #ff6b9d 0%, #ff9fc4 100%)',
                color: '#1a0a14',
                px: 4,
                py: 1.5,
                borderRadius: 25,
                cursor: 'pointer',
                fontFamily: '"Quicksand", sans-serif',
                fontWeight: 600,
                fontSize: '1rem',
                boxShadow: '0 4px 25px rgba(255, 107, 157, 0.35)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:active': {
                  transform: 'scale(0.97)',
                },
              }}
            >
              Begin Our Story
              <FavoriteIcon sx={{ fontSize: 18 }} />
            </Box>
          </motion.div>
        </Box>

        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
      </Box>
    </motion.div>
  );
};

export default Landing;
