import { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { loveReasons } from '../../data/loveData';
import { StepIndicator } from '../common';

const LoveCards = ({ onNext, onPrev, currentStep, totalSteps }) => {
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const currentCard = loveReasons[cardIndex];

  const nextCard = () => {
    if (cardIndex < loveReasons.length - 1) {
      setIsFlipped(false);
      setTimeout(() => setCardIndex(cardIndex + 1), 200);
    } else {
      onNext();
    }
  };

  const prevCard = () => {
    if (cardIndex > 0) {
      setIsFlipped(false);
      setTimeout(() => setCardIndex(cardIndex - 1), 200);
    } else {
      onPrev();
    }
  };

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
          px: 2,
          py: 3,
          pb: 14,
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography
            sx={{
              fontFamily: '"Sacramento", cursive',
              fontSize: { xs: '2rem', sm: '2.5rem' },
              color: '#ff6b9d',
              mb: 0.5,
            }}
          >
            Why I Love You
          </Typography>
          <Typography
            sx={{
              color: 'rgba(255, 182, 193, 0.7)',
              fontSize: '0.85rem',
            }}
          >
            Reason {cardIndex + 1} of {loveReasons.length}
          </Typography>
        </Box>

        {/* Card */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={cardIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              style={{ width: '100%', maxWidth: 350, perspective: 1000 }}
            >
              <Box
                onClick={() => setIsFlipped(!isFlipped)}
                sx={{
                  height: { xs: 280, sm: 320 },
                  cursor: 'pointer',
                  position: 'relative',
                  transformStyle: 'preserve-3d',
                }}
              >
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Front */}
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backfaceVisibility: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 107, 157, 0.2)',
                      borderRadius: 4,
                      p: 3,
                    }}
                  >
                    <FavoriteIcon
                      sx={{
                        fontSize: 45,
                        color: '#ff6b9d',
                        mb: 2,
                      }}
                    />
                    <Typography
                      sx={{
                        fontFamily: '"Playfair Display", serif',
                        fontSize: { xs: '1.6rem', sm: '1.8rem' },
                        color: '#fff5f8',
                        textAlign: 'center',
                        fontWeight: 500,
                      }}
                    >
                      {currentCard.front}
                    </Typography>
                    <Typography
                      sx={{
                        color: 'rgba(255, 182, 193, 0.6)',
                        fontSize: '0.75rem',
                        mt: 3,
                        textTransform: 'uppercase',
                        letterSpacing: 1.5,
                      }}
                    >
                      Tap to reveal
                    </Typography>
                  </Box>

                  {/* Back */}
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'linear-gradient(135deg, #ff6b9d 0%, #c4386e 100%)',
                      borderRadius: 4,
                      p: 3,
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: '"Quicksand", sans-serif',
                        fontSize: { xs: '0.95rem', sm: '1.05rem' },
                        color: '#fff5f8',
                        textAlign: 'center',
                        lineHeight: 1.8,
                      }}
                    >
                      {currentCard.back}
                    </Typography>
                  </Box>
                </motion.div>
              </Box>
            </motion.div>
          </AnimatePresence>
        </Box>

        {/* Navigation */}
        <Box
          sx={{
            position: 'fixed',
            bottom: 70,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            px: 3,
          }}
        >
          <IconButton
            onClick={prevCard}
            sx={{
              background: 'rgba(255, 107, 157, 0.15)',
              color: '#ff9fc4',
            }}
          >
            <ArrowBackIcon />
          </IconButton>

          <Box
            onClick={nextCard}
            sx={{
              background: 'linear-gradient(135deg, #ff6b9d 0%, #ff9fc4 100%)',
              color: '#1a0a14',
              px: 3,
              py: 1,
              borderRadius: 25,
              cursor: 'pointer',
              fontFamily: '"Quicksand", sans-serif',
              fontWeight: 600,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            {cardIndex < loveReasons.length - 1 ? 'Next Reason' : 'Continue'}
            <ArrowForwardIcon sx={{ fontSize: 18 }} />
          </Box>
        </Box>

        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
      </Box>
    </motion.div>
  );
};

export default LoveCards;
