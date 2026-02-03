import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff6b9d',
      light: '#ff9fc4',
      dark: '#c4386e',
    },
    secondary: {
      main: '#b76e9b',
      light: '#e99dcb',
      dark: '#86426d',
    },
    background: {
      default: '#1a0a14',
      paper: 'rgba(26, 10, 20, 0.9)',
    },
    text: {
      primary: '#fff5f8',
      secondary: '#ffb6c1',
    },
  },
  typography: {
    fontFamily: '"Quicksand", "Helvetica", sans-serif',
    h1: {
      fontFamily: '"Sacramento", cursive',
      fontWeight: 400,
      letterSpacing: '0.02em',
    },
    h2: {
      fontFamily: '"Sacramento", cursive',
      fontWeight: 400,
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 500,
    },
    h4: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 500,
    },
    h5: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 400,
    },
    h6: {
      fontFamily: '"Quicksand", sans-serif',
      fontWeight: 500,
    },
    body1: {
      fontFamily: '"Quicksand", sans-serif',
      fontSize: '1rem',
      lineHeight: 1.7,
      fontWeight: 400,
    },
    body2: {
      fontFamily: '"Quicksand", sans-serif',
      fontSize: '0.9rem',
    },
    button: {
      fontFamily: '"Quicksand", sans-serif',
      fontWeight: 600,
      letterSpacing: '0.05em',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: 'smooth',
        },
        body: {
          background: 'linear-gradient(135deg, #1a0a14 0%, #2d1f2d 50%, #1a0a14 100%)',
          minHeight: '100vh',
          overflowX: 'hidden',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '25px',
          textTransform: 'none',
          padding: '10px 28px',
          fontSize: '1rem',
        },
      },
    },
  },
});

export const colors = {
  rose: '#ff6b9d',
  roseLight: '#ff9fc4',
  roseDark: '#c4386e',
  lavender: '#b76e9b',
  lavenderLight: '#e99dcb',
  gold: '#d4af37',
  goldLight: '#f4e4bc',
  cream: '#fff5f8',
  blush: '#ffb6c1',
  deepPurple: '#2d1f2d',
  midnight: '#1a0a14',
};

export default theme;
