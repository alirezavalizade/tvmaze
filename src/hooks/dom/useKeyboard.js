import { useEffect, useCallback } from 'react';

export const useKeyboard = (keys, fn, type = 'keydown') => {
  const handleKeyboard = useCallback(
    event => {
      if (keys.length === 0) {
        fn(event);
        return;
      }

      if (keys.includes(event.key)) {
        fn(event);
      }
    },
    [keys, fn]
  );

  useEffect(() => {
    window.addEventListener(type, handleKeyboard);

    return () => {
      window.removeEventListener(type, handleKeyboard);
    };
  }, [keys, fn, handleKeyboard, type]);

  return null;
};
