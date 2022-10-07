export const FADE_SLOW = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.4 }
};

export const SLIDE = {
  initial: { opacity: 0.5, y: '100%' },
  animate: { opacity: 1, y: 0.1 },
  exit: { opacity: 1, y: '100%' },
  transition: {
    type: 'spring',
    stiffness: 200,
    damping: 29
  }
};
