import { useState } from 'react';
import { Box, Typography, Modal, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { galleryImages } from '../../data/loveData';
import { StepIndicator, ImageWithFallback } from '../common';

const Gallery = ({ onNext, onPrev, currentStep, totalSteps }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [direction, setDirection] = useState(0);

  const openCarousel = (index) => {
    setSelectedIndex(index);
    setDirection(0);
  };

  const closeCarousel = () => {
    setSelectedIndex(null);
  };

  const goToNextImage = () => {
    if (selectedIndex < galleryImages.length - 1) {
      setDirection(1);
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const goToPrevImage = () => {
    if (selectedIndex > 0) {
      setDirection(-1);
      setSelectedIndex(selectedIndex - 1);
    }
  };

  // Swipe handlers for mobile
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    e.currentTarget.touchStartX = touch.clientX;
  };

  const handleTouchEnd = (e) => {
    const touch = e.changedTouches[0];
    const diff = e.currentTarget.touchStartX - touch.clientX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNextImage();
      } else {
        goToPrevImage();
      }
    }
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const currentImage = selectedIndex !== null ? galleryImages[selectedIndex] : null;

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
              mb: 0.5,
            }}
          >
            Our Moments
          </Typography>
          <Typography
            sx={{
              color: 'rgba(255, 182, 193, 0.7)',
              fontSize: '0.85rem',
            }}
          >
            Tap any image to view
          </Typography>
        </Box>

        {/* Scrollable Gallery Area */}
        <Box
          sx={{
            flex: 1,
            overflowY: 'scroll',
            overflowX: 'hidden',
            WebkitOverflowScrolling: 'touch',
            px: 2,
            pb: '180px',
            touchAction: 'pan-y',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 2,
              maxWidth: 450,
              mx: 'auto',
              width: '100%',
              py: 1,
            }}
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => openCarousel(index)}
                style={{ touchAction: 'manipulation' }}
              >
                <Box
                  sx={{
                    aspectRatio: '1',
                    borderRadius: 3,
                    overflow: 'hidden',
                    border: '1px solid rgba(255, 107, 157, 0.2)',
                    cursor: 'pointer',
                    position: 'relative',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                    background: 'linear-gradient(135deg, rgba(255, 107, 157, 0.1) 0%, rgba(183, 110, 155, 0.1) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ImageWithFallback
                    src={image.src}
                    alt={image.caption}
                    loading="lazy"
                    draggable={false}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      pointerEvents: 'none',
                    }}
                  />
                  {/* Overlay gradient */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '60%',
                      background: 'linear-gradient(transparent, rgba(26, 10, 20, 0.9))',
                      display: 'flex',
                      alignItems: 'flex-end',
                      p: 1.5,
                    }}
                  >
                    <Typography
                      sx={{
                        color: '#fff5f8',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        lineHeight: 1.3,
                      }}
                    >
                      {image.caption}
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Box>

        {/* Carousel Modal */}
        <Modal open={selectedIndex !== null} onClose={closeCarousel}>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(26, 10, 20, 0.98)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              outline: 'none',
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Close button */}
            <IconButton
              onClick={closeCarousel}
              sx={{
                position: 'absolute',
                top: 15,
                right: 15,
                color: '#ff9fc4',
                zIndex: 10,
                background: 'rgba(26, 10, 20, 0.7)',
                '&:hover': {
                  background: 'rgba(26, 10, 20, 0.9)',
                },
              }}
            >
              <CloseIcon />
            </IconButton>

            {/* Image counter */}
            <Box
              sx={{
                position: 'absolute',
                top: 20,
                left: '50%',
                transform: 'translateX(-50%)',
                color: 'rgba(255, 182, 193, 0.7)',
                fontSize: '0.9rem',
                zIndex: 10,
              }}
            >
              {selectedIndex !== null ? `${selectedIndex + 1} / ${galleryImages.length}` : ''}
            </Box>

            {/* Image area */}
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                px: 2,
                pt: 6,
              }}
            >
              {/* Previous button */}
              {selectedIndex > 0 && (
                <IconButton
                  onClick={goToPrevImage}
                  sx={{
                    position: 'absolute',
                    left: 10,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#ff9fc4',
                    background: 'rgba(255, 107, 157, 0.2)',
                    zIndex: 10,
                    '&:hover': {
                      background: 'rgba(255, 107, 157, 0.3)',
                    },
                  }}
                >
                  <ChevronLeftIcon />
                </IconButton>
              )}

              {/* Next button */}
              {selectedIndex < galleryImages.length - 1 && (
                <IconButton
                  onClick={goToNextImage}
                  sx={{
                    position: 'absolute',
                    right: 10,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#ff9fc4',
                    background: 'rgba(255, 107, 157, 0.2)',
                    zIndex: 10,
                    '&:hover': {
                      background: 'rgba(255, 107, 157, 0.3)',
                    },
                  }}
                >
                  <ChevronRightIcon />
                </IconButton>
              )}

              {/* Animated image */}
              <AnimatePresence mode="wait" custom={direction}>
                {currentImage && (
                  <motion.div
                    key={selectedIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ImageWithFallback
                      src={currentImage.src}
                      alt={currentImage.caption}
                      sx={{
                        maxWidth: '100%',
                        maxHeight: '60vh',
                        objectFit: 'contain',
                        borderRadius: 2,
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>

            {/* Caption area */}
            <Box sx={{ p: 3, textAlign: 'center', pb: 4 }}>
              <FavoriteIcon sx={{ color: '#ff6b9d', mb: 1, fontSize: 28 }} />
              <AnimatePresence mode="wait">
                {currentImage && (
                  <motion.div
                    key={selectedIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Typography
                      sx={{
                        fontFamily: '"Playfair Display", serif',
                        fontSize: '1.1rem',
                        color: '#ff9fc4',
                        fontStyle: 'italic',
                      }}
                    >
                      {currentImage.caption}
                    </Typography>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Swipe hint */}
              <Typography
                sx={{
                  color: 'rgba(255, 182, 193, 0.4)',
                  fontSize: '0.75rem',
                  mt: 2,
                }}
              >
                Swipe or tap arrows to navigate
              </Typography>
            </Box>

            {/* Dot indicators */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 1,
                pb: 3,
              }}
            >
              {galleryImages.map((_, index) => (
                <Box
                  key={index}
                  onClick={() => {
                    setDirection(index > selectedIndex ? 1 : -1);
                    setSelectedIndex(index);
                  }}
                  sx={{
                    width: index === selectedIndex ? 20 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: index === selectedIndex
                      ? 'linear-gradient(135deg, #ff6b9d 0%, #ff9fc4 100%)'
                      : 'rgba(255, 107, 157, 0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </Box>
          </Box>
        </Modal>

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

export default Gallery;
