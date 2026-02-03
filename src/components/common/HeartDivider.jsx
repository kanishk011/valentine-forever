import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import FavoriteIcon from '@mui/icons-material/Favorite';

const HeartDivider = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        py: 4,
      }}
    >
      <Box
        sx={{
          flex: 1,
          maxWidth: 150,
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(255, 107, 157, 0.5))',
        }}
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <FavoriteIcon
          sx={{
            color: '#ff6b9d',
            fontSize: 24,
            filter: 'drop-shadow(0 0 10px rgba(255, 107, 157, 0.5))',
          }}
        />
      </motion.div>
      <Box
        sx={{
          flex: 1,
          maxWidth: 150,
          height: 1,
          background: 'linear-gradient(90deg, rgba(255, 107, 157, 0.5), transparent)',
        }}
      />
    </Box>
  );
};

export default HeartDivider;
