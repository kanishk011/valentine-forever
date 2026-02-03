import { Box } from '@mui/material';

const ImageWithFallback = ({
  src,
  alt,
  sx = {},
  ...props
}) => {
  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{
        objectFit: 'cover',
        objectPosition: 'center',
        ...sx,
      }}
      {...props}
    />
  );
};

export default ImageWithFallback;
