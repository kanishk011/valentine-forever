import { useState, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { getTimeRemaining } from '../../utils/helpers';
import { countdownDate, anniversaryDate } from '../../data/loveData';
import { StepIndicator } from '../common';

const Countdown = ({ onNext, onPrev, currentStep, totalSteps }) => {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(countdownDate));

  // Calculate years together
  const yearsTogetherMs = new Date() - anniversaryDate;
  const yearsTogether = Math.floor(yearsTogetherMs / (1000 * 60 * 60 * 24 * 365));
  const daysExtra = Math.floor((yearsTogetherMs % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining(countdownDate));
    }, 1000);
    return () => clearInterval(timer);
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
          px: 2,
          py: 3,
          pb: 14,
        }}
      >
        {/* Time Together */}
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography
            sx={{
              fontFamily: '"Sacramento", cursive',
              fontSize: { xs: '2rem', sm: '2.5rem' },
              color: '#ff6b9d',
              mb: 1,
            }}
          >
            Our Journey Together
          </Typography>

          <Box
            sx={{
              background: 'rgba(255, 107, 157, 0.1)',
              borderRadius: 3,
              p: 3,
              border: '1px solid rgba(255, 107, 157, 0.15)',
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontSize: { xs: '2.5rem', sm: '3rem' },
                color: '#ff6b9d',
                fontWeight: 600,
              }}
            >
              {yearsTogether} Years
            </Typography>
            <Typography
              sx={{
                color: '#ffb6c1',
                fontSize: '1rem',
              }}
            >
              and {daysExtra} beautiful days
            </Typography>
            <Typography
              sx={{
                color: 'rgba(255, 182, 193, 0.6)',
                fontSize: '0.8rem',
                mt: 1,
              }}
            >
              Since June 11, 2020
            </Typography>
          </Box>
        </Box>

        {/* Valentine's Countdown */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            sx={{
              color: '#ffb6c1',
              fontSize: '0.9rem',
              mb: 2,
              fontStyle: 'italic',
            }}
          >
            {timeLeft.isComplete ? "It's Valentine's Day!" : "Until Valentine's Day 2025"}
          </Typography>

          {!timeLeft.isComplete ? (
            <Box
              sx={{
                display: 'flex',
                gap: { xs: 1.5, sm: 2 },
                justifyContent: 'center',
              }}
            >
              {[
                { value: timeLeft.days, label: 'Days' },
                { value: timeLeft.hours, label: 'Hours' },
                { value: timeLeft.minutes, label: 'Min' },
                { value: timeLeft.seconds, label: 'Sec' },
              ].map((item, index) => (
                <Box key={index} sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 107, 157, 0.2)',
                      borderRadius: 2,
                      px: { xs: 1.5, sm: 2.5 },
                      py: { xs: 1.5, sm: 2 },
                      minWidth: { xs: 55, sm: 70 },
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: '"Playfair Display", serif',
                        fontSize: { xs: '1.5rem', sm: '2rem' },
                        color: '#ff6b9d',
                        fontWeight: 600,
                      }}
                    >
                      {String(item.value).padStart(2, '0')}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      color: 'rgba(255, 182, 193, 0.6)',
                      fontSize: '0.7rem',
                      mt: 0.5,
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          ) : (
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <FavoriteIcon
                sx={{
                  fontSize: 60,
                  color: '#ff6b9d',
                }}
              />
            </motion.div>
          )}
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
            onClick={onPrev}
            sx={{
              background: 'rgba(255, 107, 157, 0.15)',
              color: '#ff9fc4',
            }}
          >
            <ArrowBackIcon />
          </IconButton>

          <Box
            onClick={onNext}
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
            One Last Thing
            <ArrowForwardIcon sx={{ fontSize: 18 }} />
          </Box>
        </Box>

        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
      </Box>
    </motion.div>
  );
};

export default Countdown;
