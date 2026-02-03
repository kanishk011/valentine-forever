import { useState, useEffect, useRef } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { loveLetter } from '../../data/loveData';
import { StepIndicator } from '../common';

const LoveLetter = ({ onNext, onPrev, currentStep, totalSteps }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const indexRef = useRef(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    const typeNextChar = () => {
      if (indexRef.current < loveLetter.length) {
        setDisplayedText(loveLetter.slice(0, indexRef.current + 1));
        indexRef.current += 1;

        const char = loveLetter[indexRef.current - 1];
        const delay = char === '\n' ? 60 : char === '.' ? 30 : char === ',' ? 20 : 8;

        setTimeout(typeNextChar, delay);

        // Auto scroll to bottom as text types
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      } else {
        setIsComplete(true);
      }
    };

    const startDelay = setTimeout(typeNextChar, 500);
    return () => clearTimeout(startDelay);
  }, []);

  const skipTyping = () => {
    setDisplayedText(loveLetter);
    setIsComplete(true);
    indexRef.current = loveLetter.length;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ height: '100%' }}
    >
      <Box
        sx={{
          height: '100vh',
          height: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Header - Fixed at top */}
        <Box
          sx={{
            textAlign: 'center',
            pt: 3,
            pb: 2,
            px: 2,
            flexShrink: 0,
            background: 'linear-gradient(180deg, rgba(26, 10, 20, 1) 0%, rgba(26, 10, 20, 0.9) 80%, transparent 100%)',
            zIndex: 10,
          }}
        >
          <Typography
            sx={{
              fontFamily: '"Sacramento", cursive',
              fontSize: { xs: '2rem', sm: '2.5rem' },
              color: '#ff6b9d',
            }}
          >
            A Letter For You
          </Typography>
        </Box>

        {/* Scrollable Letter Area */}
        <Box
          ref={scrollRef}
          onClick={!isComplete ? skipTyping : undefined}
          sx={{
            flex: 1,
            overflowY: 'scroll',
            overflowX: 'hidden',
            WebkitOverflowScrolling: 'touch',
            px: 2,
            pb: '180px',
            touchAction: 'pan-y',
            cursor: !isComplete ? 'pointer' : 'default',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <Box
            sx={{
              maxWidth: 500,
              mx: 'auto',
              width: '100%',
              py: 1,
            }}
          >
            {/* Letter Paper */}
            <Box
              sx={{
                background: 'linear-gradient(135deg, #fef6f0 0%, #fdf0e8 100%)',
                borderRadius: 3,
                p: { xs: 3, sm: 4 },
                position: 'relative',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
                minHeight: 400,
              }}
            >
              {/* Skip hint */}
              {!isComplete && (
                <Typography
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 15,
                    fontSize: '0.7rem',
                    color: 'rgba(100, 80, 80, 0.5)',
                  }}
                >
                  Tap to skip
                </Typography>
              )}

              {/* Letter content */}
              <Typography
                component="div"
                sx={{
                  fontFamily: '"Libre Baskerville", serif',
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  lineHeight: 2,
                  color: '#3d2a35',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {displayedText}
                {!isComplete && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    style={{
                      display: 'inline-block',
                      width: 2,
                      height: '1em',
                      background: '#ff6b9d',
                      marginLeft: 2,
                      verticalAlign: 'text-bottom',
                    }}
                  />
                )}
              </Typography>

              {/* Wax seal */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 20,
                  right: 25,
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #c4386e 0%, #ff6b9d 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 3px 10px rgba(196, 56, 110, 0.4)',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: '"Sacramento", cursive',
                    fontSize: '1.5rem',
                    color: '#fef6f0',
                  }}
                >
                  K
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Fixed Navigation at bottom */}
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(0deg, rgba(26, 10, 20, 1) 0%, rgba(26, 10, 20, 0.95) 70%, transparent 100%)',
            pt: 4,
            pb: 2,
            zIndex: 100,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              px: 3,
              mb: 6,
            }}
          >
            <IconButton
              onClick={onPrev}
              sx={{
                background: 'rgba(255, 107, 157, 0.2)',
                backdropFilter: 'blur(10px)',
                color: '#ff9fc4',
                width: 48,
                height: 48,
              }}
            >
              <ArrowBackIcon />
            </IconButton>

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
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                boxShadow: '0 4px 20px rgba(255, 107, 157, 0.4)',
              }}
            >
              Continue
              <ArrowForwardIcon sx={{ fontSize: 20 }} />
            </Box>
          </Box>

          <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
        </Box>
      </Box>
    </motion.div>
  );
};

export default LoveLetter;
