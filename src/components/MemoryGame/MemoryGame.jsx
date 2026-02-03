import { useState, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ReplayIcon from '@mui/icons-material/Replay';
import { images } from '../../data/loveData';
import { StepIndicator } from '../common';

// Game images - using 6 pairs (12 cards total)
const gameImages = [
  { id: 1, src: images.lateNightTexts, name: 'Late Nights' },
  { id: 2, src: images.cheekBite, name: 'Playful' },
  { id: 3, src: images.netflixTogether, name: 'Netflix' },
  { id: 4, src: images.hairKnot, name: 'Care' },
  { id: 5, src: images.gymCouple, name: 'Gym' },
  { id: 6, src: images.sunsetKiss, name: 'Sunset' },
];

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const MemoryGame = ({ onNext, onPrev, currentStep, totalSteps }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  // Initialize game
  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    // Create pairs of cards
    const cardPairs = gameImages.flatMap((img, index) => [
      { ...img, uniqueId: `${img.id}-a`, pairId: img.id },
      { ...img, uniqueId: `${img.id}-b`, pairId: img.id },
    ]);
    setCards(shuffleArray(cardPairs));
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setGameComplete(false);
  };

  const handleCardClick = (uniqueId, pairId) => {
    if (isChecking) return;
    if (flippedCards.length === 2) return;
    if (flippedCards.includes(uniqueId)) return;
    if (matchedPairs.includes(pairId)) return;

    const newFlipped = [...flippedCards, uniqueId];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      setIsChecking(true);

      const firstCard = cards.find(c => c.uniqueId === newFlipped[0]);
      const secondCard = cards.find(c => c.uniqueId === newFlipped[1]);

      if (firstCard.pairId === secondCard.pairId) {
        // Match found!
        setTimeout(() => {
          setMatchedPairs([...matchedPairs, firstCard.pairId]);
          setFlippedCards([]);
          setIsChecking(false);

          // Check if game is complete
          if (matchedPairs.length + 1 === gameImages.length) {
            setGameComplete(true);
          }
        }, 600);
      } else {
        // No match - flip back
        setTimeout(() => {
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  };

  const isCardFlipped = (uniqueId, pairId) => {
    return flippedCards.includes(uniqueId) || matchedPairs.includes(pairId);
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
        {/* Header */}
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
            Memory Game
          </Typography>
          <Typography
            sx={{
              color: 'rgba(255, 182, 193, 0.7)',
              fontSize: '0.85rem',
            }}
          >
            Find all the matching pairs!
          </Typography>

          {/* Stats */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 1 }}>
            <Typography sx={{ color: '#ff9fc4', fontSize: '0.9rem' }}>
              Moves: {moves}
            </Typography>
            <Typography sx={{ color: '#ff9fc4', fontSize: '0.9rem' }}>
              Pairs: {matchedPairs.length}/{gameImages.length}
            </Typography>
          </Box>
        </Box>

        {/* Game Grid */}
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            px: 2,
            pb: '180px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: { xs: 1.5, sm: 2 },
              maxWidth: 350,
              width: '100%',
            }}
          >
            {cards.map((card) => {
              const isFlipped = isCardFlipped(card.uniqueId, card.pairId);
              const isMatched = matchedPairs.includes(card.pairId);

              return (
                <motion.div
                  key={card.uniqueId}
                  initial={{ scale: 0, rotateY: 180 }}
                  animate={{ scale: 1, rotateY: 0 }}
                  transition={{ delay: Math.random() * 0.3, duration: 0.4 }}
                >
                  <Box
                    onClick={() => handleCardClick(card.uniqueId, card.pairId)}
                    sx={{
                      aspectRatio: '1',
                      perspective: '1000px',
                      cursor: isMatched ? 'default' : 'pointer',
                    }}
                  >
                    <motion.div
                      animate={{ rotateY: isFlipped ? 180 : 0 }}
                      transition={{ duration: 0.4 }}
                      style={{
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      {/* Card Back */}
                      <Box
                        sx={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          backfaceVisibility: 'hidden',
                          borderRadius: 2,
                          background: 'linear-gradient(135deg, #ff6b9d 0%, #ff9fc4 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 15px rgba(255, 107, 157, 0.3)',
                          border: '2px solid rgba(255, 255, 255, 0.2)',
                        }}
                      >
                        <FavoriteIcon sx={{ fontSize: 30, color: 'rgba(255, 255, 255, 0.8)' }} />
                      </Box>

                      {/* Card Front */}
                      <Box
                        sx={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          backfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)',
                          borderRadius: 2,
                          overflow: 'hidden',
                          boxShadow: isMatched
                            ? '0 0 20px rgba(255, 107, 157, 0.6)'
                            : '0 4px 15px rgba(0, 0, 0, 0.3)',
                          border: isMatched
                            ? '2px solid #ff6b9d'
                            : '2px solid rgba(255, 107, 157, 0.3)',
                        }}
                      >
                        <Box
                          component="img"
                          src={card.src}
                          alt={card.name}
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                        {isMatched && (
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: 'rgba(255, 107, 157, 0.2)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <FavoriteIcon sx={{ fontSize: 30, color: '#ff6b9d' }} />
                          </Box>
                        )}
                      </Box>
                    </motion.div>
                  </Box>
                </motion.div>
              );
            })}
          </Box>
        </Box>

        {/* Game Complete Modal */}
        <AnimatePresence>
          {gameComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(26, 10, 20, 0.95)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 200,
              }}
            >
              <motion.div
                initial={{ scale: 0.8, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Box sx={{ textAlign: 'center', p: 4 }}>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <FavoriteIcon sx={{ fontSize: 60, color: '#ff6b9d', mb: 2 }} />
                  </motion.div>

                  <Typography
                    sx={{
                      fontFamily: '"Sacramento", cursive',
                      fontSize: '2.5rem',
                      color: '#ff6b9d',
                      mb: 1,
                    }}
                  >
                    You Did It!
                  </Typography>

                  <Typography
                    sx={{
                      color: '#ffb6c1',
                      fontSize: '1rem',
                      mb: 1,
                    }}
                  >
                    You found all the pairs in {moves} moves!
                  </Typography>

                  <Typography
                    sx={{
                      color: 'rgba(255, 182, 193, 0.7)',
                      fontSize: '0.9rem',
                      fontStyle: 'italic',
                      mb: 3,
                    }}
                  >
                    Just like you found me
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                    <IconButton
                      onClick={initializeGame}
                      sx={{
                        background: 'rgba(255, 107, 157, 0.2)',
                        color: '#ff9fc4',
                        '&:hover': { background: 'rgba(255, 107, 157, 0.3)' },
                      }}
                    >
                      <ReplayIcon />
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
                </Box>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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

            <IconButton
              onClick={initializeGame}
              sx={{
                background: 'rgba(255, 107, 157, 0.2)',
                backdropFilter: 'blur(10px)',
                color: '#ff9fc4',
                width: 48,
                height: 48,
              }}
            >
              <ReplayIcon />
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
              Skip
              <ArrowForwardIcon sx={{ fontSize: 20 }} />
            </Box>
          </Box>

          <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
        </Box>
      </Box>
    </motion.div>
  );
};

export default MemoryGame;
