import { useState } from 'react';
import { Box, Typography, TextField, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LockIcon from '@mui/icons-material/Lock';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { FloatingHearts } from '../common';

// Change this password to whatever you want
const SECRET_PASSWORD = "iloveyou";

const PasswordGate = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.toLowerCase() === SECRET_PASSWORD.toLowerCase()) {
      // Save to session so refresh doesn't require password again
      sessionStorage.setItem('valentineUnlocked', 'true');
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: 3,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <FloatingHearts count={5} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', width: '100%', maxWidth: 350 }}
      >
        {/* Lock Icon */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(255, 107, 157, 0.2) 0%, rgba(183, 110, 155, 0.2) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
              border: '2px solid rgba(255, 107, 157, 0.3)',
            }}
          >
            <LockIcon sx={{ fontSize: 40, color: '#ff6b9d' }} />
          </Box>
        </motion.div>

        {/* Title */}
        <Typography
          sx={{
            fontFamily: '"Sacramento", cursive',
            fontSize: { xs: '2.5rem', sm: '3rem' },
            color: '#ff6b9d',
            mb: 1,
          }}
        >
          A Secret Awaits
        </Typography>

        <Typography
          sx={{
            color: 'rgba(255, 182, 193, 0.8)',
            fontSize: '0.95rem',
            mb: 4,
            fontFamily: '"Quicksand", sans-serif',
          }}
        >
          Enter the password to unlock your surprise
        </Typography>

        {/* Password Form */}
        <motion.form
          onSubmit={handleSubmit}
          animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          <TextField
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            placeholder="Enter password..."
            autoFocus
            fullWidth
            error={error}
            helperText={error ? "Wrong password, try again!" : ""}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 3,
                color: '#fff5f8',
                fontFamily: '"Quicksand", sans-serif',
                '& fieldset': {
                  borderColor: 'rgba(255, 107, 157, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 107, 157, 0.5)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ff6b9d',
                },
              },
              '& .MuiInputBase-input': {
                textAlign: 'center',
                fontSize: '1.1rem',
                py: 1.5,
              },
              '& .MuiFormHelperText-root': {
                textAlign: 'center',
                color: '#ff6b9d',
              },
            }}
          />

          <Box
            component="button"
            type="submit"
            sx={{
              background: 'linear-gradient(135deg, #ff6b9d 0%, #ff9fc4 100%)',
              color: '#1a0a14',
              border: 'none',
              px: 4,
              py: 1.5,
              borderRadius: 25,
              cursor: 'pointer',
              fontFamily: '"Quicksand", sans-serif',
              fontWeight: 600,
              fontSize: '1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              boxShadow: '0 4px 20px rgba(255, 107, 157, 0.4)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 6px 25px rgba(255, 107, 157, 0.5)',
              },
              '&:active': {
                transform: 'scale(0.98)',
              },
            }}
          >
            Unlock
            <FavoriteIcon sx={{ fontSize: 18 }} />
          </Box>
        </motion.form>

        {/* Hint */}
        <Typography
          sx={{
            mt: 4,
            color: 'rgba(255, 182, 193, 0.4)',
            fontSize: '0.75rem',
            fontStyle: 'italic',
          }}
        >
          Hint: What do I always say to you?
        </Typography>
      </motion.div>
    </Box>
  );
};

export default PasswordGate;
