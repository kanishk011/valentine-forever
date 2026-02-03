import { useState, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { finalMessage } from '../../data/loveData';
import { StepIndicator } from '../common';

const FinalSurprise = ({ onPrev, currentStep, totalSteps }) => {
  const [hasAnswered, setHasAnswered] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [showFinal, setShowFinal] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [runAwayCount, setRunAwayCount] = useState(0);

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (hasAnswered && messageIndex < finalMessage.yesResponse.length - 1) {
      const timer = setTimeout(() => {
        setMessageIndex((prev) => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
    if (messageIndex === finalMessage.yesResponse.length - 1) {
      setTimeout(() => setShowFinal(true), 1500);
    }
  }, [hasAnswered, messageIndex]);

  // Move the No button away when mouse/touch approaches
  const moveNoButton = () => {
    // Random position - move anywhere on screen
    const maxX = windowSize.width * 0.6;
    const maxY = windowSize.height * 0.4;

    const newX = (Math.random() - 0.5) * maxX;
    const newY = (Math.random() - 0.5) * maxY;

    setNoButtonPosition({ x: newX, y: newY });
    setRunAwayCount((prev) => prev + 1);
  };

  const funnyMessages = [
    "Nice try! 😏",
    "Nope, not happening!",
    "You can't click me!",
    "Haha, try again!",
    "I'm too fast for you!",
    "Just say YES already! 💕",
    "The No button is shy!",
    "You really want to say No? 🥺",
    "Come on, click YES!",
    "I'll keep running! 🏃‍♂️",
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ width: '100%', height: '100%' }}
    >
      <Box
        sx={{
          minHeight: '100vh',
          minHeight: '100dvh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          px: 3,
          py: 3,
          pb: 10,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Confetti */}
        {hasAnswered && (
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={true}
            numberOfPieces={150}
            colors={['#ff6b9d', '#ff9fc4', '#ffb6c1', '#d4af37', '#fff']}
          />
        )}

        <AnimatePresence mode="wait">
          {!hasAnswered ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{
                textAlign: 'center',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {/* Heart animation */}
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <FavoriteIcon
                  sx={{
                    fontSize: { xs: 60, sm: 80 },
                    color: '#ff6b9d',
                    mb: 3,
                    filter: 'drop-shadow(0 0 20px rgba(255, 107, 157, 0.5))',
                  }}
                />
              </motion.div>

              {/* Question */}
              <Typography
                sx={{
                  fontFamily: '"Sacramento", cursive',
                  fontSize: { xs: '2.2rem', sm: '3rem' },
                  color: '#ff6b9d',
                  mb: 2,
                  lineHeight: 1.3,
                }}
              >
                Raghavi,
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: { xs: '1.3rem', sm: '1.8rem' },
                  color: '#fff5f8',
                  mb: 4,
                  lineHeight: 1.4,
                }}
              >
                Will you be my Valentine forever?
              </Typography>

              {/* Funny message when No button runs */}
              <Box sx={{ minHeight: 30, mb: 2 }}>
                {runAwayCount > 0 && (
                  <motion.div
                    key={runAwayCount}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Typography
                      sx={{
                        color: '#ffb6c1',
                        fontSize: '0.95rem',
                        fontStyle: 'italic',
                      }}
                    >
                      {funnyMessages[runAwayCount % funnyMessages.length]}
                    </Typography>
                  </motion.div>
                )}
              </Box>

              {/* Buttons */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 3,
                  position: 'relative',
                  width: '100%',
                  minHeight: 120,
                }}
              >
                {/* YES Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ zIndex: 10 }}
                >
                  <Box
                    onClick={() => setHasAnswered(true)}
                    sx={{
                      background: 'linear-gradient(135deg, #ff6b9d 0%, #ff9fc4 100%)',
                      color: '#1a0a14',
                      px: { xs: 4, sm: 5 },
                      py: { xs: 1.5, sm: 2 },
                      borderRadius: 30,
                      cursor: 'pointer',
                      fontFamily: '"Quicksand", sans-serif',
                      fontWeight: 700,
                      fontSize: { xs: '1.2rem', sm: '1.4rem' },
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      userSelect: 'none',
                      boxShadow: '0 0 30px rgba(255, 107, 157, 0.5)',
                    }}
                  >
                    YES
                    <FavoriteIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
                  </Box>
                </motion.div>

                {/* NO Button - Runs away! */}
                <motion.div
                  animate={{
                    x: noButtonPosition.x,
                    y: noButtonPosition.y,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 25,
                  }}
                  onMouseEnter={moveNoButton}
                  onTouchStart={moveNoButton}
                  style={{
                    zIndex: 5,
                    position: runAwayCount > 0 ? 'absolute' : 'relative',
                  }}
                >
                  <Box
                    sx={{
                      background: 'transparent',
                      border: '2px solid rgba(255, 107, 157, 0.4)',
                      color: '#ffb6c1',
                      px: { xs: 3, sm: 4 },
                      py: { xs: 1.2, sm: 1.5 },
                      borderRadius: 30,
                      cursor: 'pointer',
                      fontFamily: '"Quicksand", sans-serif',
                      fontWeight: 600,
                      fontSize: { xs: '1rem', sm: '1.2rem' },
                      userSelect: 'none',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    No
                  </Box>
                </motion.div>
              </Box>

              {/* Hint text */}
              {runAwayCount === 0 && (
                <Typography
                  sx={{
                    color: 'rgba(255, 182, 193, 0.5)',
                    fontSize: '0.75rem',
                    mt: 4,
                  }}
                >
                  (Try clicking No... I dare you 😉)
                </Typography>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="response"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ textAlign: 'center', maxWidth: 400 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={messageIndex}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.9 }}
                  transition={{ duration: 0.6 }}
                >
                  <Typography
                    sx={{
                      fontFamily: messageIndex === finalMessage.yesResponse.length - 1
                        ? '"Sacramento", cursive'
                        : '"Playfair Display", serif',
                      fontSize: messageIndex === finalMessage.yesResponse.length - 1
                        ? { xs: '2.5rem', sm: '3.5rem' }
                        : { xs: '1.5rem', sm: '2rem' },
                      color: '#ff6b9d',
                      minHeight: 100,
                    }}
                  >
                    {finalMessage.yesResponse[messageIndex]}
                  </Typography>
                </motion.div>
              </AnimatePresence>

              {showFinal && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Box
                    sx={{
                      mt: 4,
                      p: 3,
                      background: 'rgba(255, 107, 157, 0.1)',
                      borderRadius: 3,
                      border: '1px solid rgba(255, 107, 157, 0.2)',
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: '"Quicksand", sans-serif',
                        fontSize: '1rem',
                        color: '#ffb6c1',
                        fontStyle: 'italic',
                        lineHeight: 1.8,
                      }}
                    >
                      "This website ends here.
                      <br />
                      But our story never will."
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 3 }}>
                      {[0, 1, 2, 3, 4].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 1.5, delay: i * 0.15, repeat: Infinity }}
                        >
                          <FavoriteIcon sx={{ fontSize: 22, color: '#ff6b9d' }} />
                        </motion.div>
                      ))}
                    </Box>
                  </Box>

                  <Typography
                    sx={{
                      mt: 4,
                      color: 'rgba(255, 182, 193, 0.5)',
                      fontSize: '0.8rem',
                    }}
                  >
                    Made with love by Kanishk, just for Raghavi.
                  </Typography>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back button only before answering */}
        {!hasAnswered && (
          <Box
            sx={{
              position: 'fixed',
              bottom: 70,
              left: 20,
            }}
          >
            <IconButton
              onClick={onPrev}
              sx={{
                background: 'rgba(255, 107, 157, 0.15)',
                color: '#ff9fc4',
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          </Box>
        )}

        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
      </Box>
    </motion.div>
  );
};

export default FinalSurprise;
