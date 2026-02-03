import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { IconButton } from '@mui/material';
import { timelineEvents } from '../../data/loveData';
import { StepIndicator, ImageWithFallback } from '../common';

const Timeline = ({ onNext, onPrev, currentStep, totalSteps }) => {
  const [eventIndex, setEventIndex] = useState(0);
  const currentEvent = timelineEvents[eventIndex];

  const nextEvent = () => {
    if (eventIndex < timelineEvents.length - 1) {
      setEventIndex(eventIndex + 1);
    } else {
      onNext();
    }
  };

  const prevEvent = () => {
    if (eventIndex > 0) {
      setEventIndex(eventIndex - 1);
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
          position: 'relative',
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
            Our Love Story
          </Typography>
          <Typography
            sx={{
              color: 'rgba(255, 182, 193, 0.7)',
              fontSize: '0.85rem',
            }}
          >
            {eventIndex + 1} of {timelineEvents.length}
          </Typography>
        </Box>

        {/* Event Card */}
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={eventIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              style={{ width: '100%', maxWidth: 400 }}
            >
              <Box
                sx={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 107, 157, 0.15)',
                  borderRadius: 4,
                  overflow: 'hidden',
                }}
              >
                {/* GIF Image */}
                <Box
                  sx={{
                    height: { xs: 220, sm: 280 },
                    background: 'linear-gradient(135deg, rgba(255, 107, 157, 0.15) 0%, rgba(183, 110, 155, 0.15) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <ImageWithFallback
                    src={currentEvent.image}
                    alt={currentEvent.title}
                    fallbackIndex={currentEvent.id}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      objectPosition: 'center',
                    }}
                  />
                </Box>

                {/* Content */}
                <Box sx={{ p: 3 }}>
                  <Typography
                    sx={{
                      color: '#ff6b9d',
                      fontSize: '0.75rem',
                      letterSpacing: 1.5,
                      textTransform: 'uppercase',
                      mb: 1,
                    }}
                  >
                    {currentEvent.date}
                  </Typography>

                  <Typography
                    sx={{
                      fontFamily: '"Playfair Display", serif',
                      fontSize: { xs: '1.4rem', sm: '1.6rem' },
                      color: '#fff5f8',
                      mb: 2,
                      fontWeight: 500,
                    }}
                  >
                    {currentEvent.title}
                  </Typography>

                  <Typography
                    sx={{
                      color: '#ffb6c1',
                      fontSize: { xs: '0.9rem', sm: '0.95rem' },
                      lineHeight: 1.7,
                    }}
                  >
                    {currentEvent.description}
                  </Typography>
                </Box>
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
            onClick={prevEvent}
            sx={{
              background: 'rgba(255, 107, 157, 0.15)',
              color: '#ff9fc4',
              '&:hover': { background: 'rgba(255, 107, 157, 0.25)' },
            }}
          >
            <ArrowBackIcon />
          </IconButton>

          <Box
            onClick={nextEvent}
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
            {eventIndex < timelineEvents.length - 1 ? 'Next Memory' : 'Continue'}
            <ArrowForwardIcon sx={{ fontSize: 18 }} />
          </Box>
        </Box>

        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
      </Box>
    </motion.div>
  );
};

export default Timeline;
