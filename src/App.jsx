import { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Box } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import theme from './theme/theme';
import PasswordGate from './components/PasswordGate';
import Landing from './components/Landing';
import Timeline from './components/Timeline';
import Gallery from './components/Gallery';
import MemoryGame from './components/MemoryGame';
import LoveLetter from './components/LoveLetter';
import LoveCards from './components/LoveCards';
import Countdown from './components/Countdown';
import FinalSurprise from './components/FinalSurprise';

const steps = [
  { id: 0, component: Landing, name: 'landing' },
  { id: 1, component: Timeline, name: 'timeline' },
  { id: 2, component: Gallery, name: 'gallery' },
  { id: 3, component: MemoryGame, name: 'game' },
  { id: 4, component: LoveLetter, name: 'letter' },
  { id: 5, component: LoveCards, name: 'cards' },
  { id: 6, component: Countdown, name: 'countdown' },
  { id: 7, component: FinalSurprise, name: 'final' },
];

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Check if already unlocked in this session
  useEffect(() => {
    const unlocked = sessionStorage.getItem('valentineUnlocked');
    if (unlocked === 'true') {
      setIsUnlocked(true);
    }
  }, []);

  const goToNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const goToPrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const CurrentComponent = steps[currentStep].component;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          minHeight: '100dvh',
          background: 'linear-gradient(135deg, #1a0a14 0%, #2d1f2d 50%, #1a0a14 100%)',
          position: 'relative',
          overflowX: 'hidden',
          overflowY: 'auto',
        }}
      >
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            <PasswordGate key="password" onUnlock={() => setIsUnlocked(true)} />
          ) : (
            <CurrentComponent
              key={currentStep}
              onNext={goToNext}
              onPrev={goToPrev}
              currentStep={currentStep}
              totalSteps={steps.length}
            />
          )}
        </AnimatePresence>
      </Box>
    </ThemeProvider>
  );
}

export default App;
