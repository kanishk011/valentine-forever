import { useCallback, useMemo } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { Box } from '@mui/material';

const ParticleBackground = ({ variant = 'hearts' }) => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const heartsConfig = useMemo(() => ({
    fullScreen: false,
    background: {
      color: {
        value: 'transparent',
      },
    },
    fpsLimit: 60,
    particles: {
      color: {
        value: ['#ff6b9d', '#ff9fc4', '#ffb6c1', '#e99dcb'],
      },
      move: {
        direction: 'top',
        enable: true,
        outModes: {
          default: 'out',
        },
        random: true,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 30,
      },
      opacity: {
        value: { min: 0.3, max: 0.7 },
        animation: {
          enable: true,
          speed: 0.5,
          sync: false,
        },
      },
      shape: {
        type: 'heart',
      },
      size: {
        value: { min: 8, max: 20 },
        animation: {
          enable: true,
          speed: 2,
          sync: false,
        },
      },
      wobble: {
        enable: true,
        distance: 10,
        speed: 10,
      },
    },
    detectRetina: true,
  }), []);

  const sparklesConfig = useMemo(() => ({
    fullScreen: false,
    background: {
      color: {
        value: 'transparent',
      },
    },
    fpsLimit: 60,
    particles: {
      color: {
        value: ['#ffffff', '#ff6b9d', '#d4af37', '#ff9fc4'],
      },
      move: {
        direction: 'none',
        enable: true,
        outModes: {
          default: 'bounce',
        },
        random: true,
        speed: 0.5,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 1000,
        },
        value: 50,
      },
      opacity: {
        value: { min: 0.1, max: 0.8 },
        animation: {
          enable: true,
          speed: 1,
          sync: false,
        },
      },
      shape: {
        type: 'star',
      },
      size: {
        value: { min: 1, max: 4 },
        animation: {
          enable: true,
          speed: 2,
          sync: false,
        },
      },
      twinkle: {
        particles: {
          enable: true,
          frequency: 0.05,
          opacity: 1,
        },
      },
    },
    detectRetina: true,
  }), []);

  const config = variant === 'hearts' ? heartsConfig : sparklesConfig;

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Particles
        id={`particles-${variant}`}
        init={particlesInit}
        options={config}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </Box>
  );
};

export default ParticleBackground;
