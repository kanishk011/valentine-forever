import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useMemo } from 'react';

const FloatingHearts = ({ count = 5 }) => {
  const hearts = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      delay: Math.random() * 3,
      duration: 12 + Math.random() * 8,
      size: 10 + Math.random() * 12,
      opacity: 0.15 + Math.random() * 0.15,
    }));
  }, [count]);

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{
            x: `${heart.x}vw`,
            y: '105vh',
            opacity: 0,
          }}
          animate={{
            y: '-5vh',
            opacity: [0, heart.opacity, heart.opacity, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            left: 0,
          }}
        >
          <FavoriteIcon
            sx={{
              fontSize: heart.size,
              color: 'rgba(255, 107, 157, 0.4)',
            }}
          />
        </motion.div>
      ))}
    </Box>
  );
};

export default FloatingHearts;
