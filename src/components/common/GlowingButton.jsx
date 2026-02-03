import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #ff6b9d 0%, #ff9fc4 50%, #ffb6c1 100%)',
  color: '#1a0a14',
  fontWeight: 600,
  fontSize: '1.2rem',
  padding: '16px 48px',
  borderRadius: '50px',
  textTransform: 'none',
  position: 'relative',
  overflow: 'hidden',
  border: 'none',
  cursor: 'pointer',
  fontFamily: '"Cormorant Garamond", serif',
  letterSpacing: '0.05em',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
    transition: 'left 0.5s ease',
  },
  '&:hover::before': {
    left: '100%',
  },
  '&:hover': {
    background: 'linear-gradient(135deg, #ff9fc4 0%, #ffb6c1 50%, #ff6b9d 100%)',
  },
}));

const GlowingButton = ({ children, onClick, ...props }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        boxShadow: [
          '0 0 20px rgba(255, 107, 157, 0.4), 0 0 40px rgba(255, 107, 157, 0.2)',
          '0 0 30px rgba(255, 107, 157, 0.6), 0 0 60px rgba(255, 107, 157, 0.4)',
          '0 0 20px rgba(255, 107, 157, 0.4), 0 0 40px rgba(255, 107, 157, 0.2)',
        ],
      }}
      transition={{
        boxShadow: {
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }}
      style={{ borderRadius: '50px', display: 'inline-block' }}
    >
      <StyledButton onClick={onClick} {...props}>
        {children}
      </StyledButton>
    </motion.div>
  );
};

export default GlowingButton;
