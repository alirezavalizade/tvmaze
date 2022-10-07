import React, { useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SLIDE } from '@/theme/framer-variants';

import { useKeyboard } from '@/hooks/dom/useKeyboard';

import { Portal } from '@/components/portal';

const Keyboard = ({ onClose }) => {
  // wait for animation to be finished
  useKeyboard(['Escape'], onClose, 'keyup');

  return null;
};

const FullScreenSlide = ({ children, isOpen, onClose, closeOnRouteChange }) => {
  return useMemo(() => {
    return (
      <AnimatePresence mode="wait" initial={false}>
        {isOpen ? (
          <Portal>
            <motion.div
              className="fixed left-0 right-0 top-[4.95rem] bottom-0 z-20 bg-black-900 flex flex-col overflow-auto"
              {...SLIDE}
            >
              <Keyboard
                onClose={onClose}
                closeOnRouteChange={closeOnRouteChange}
              />
              {React.cloneElement(children, { onClose })}
            </motion.div>
          </Portal>
        ) : null}
      </AnimatePresence>
    );
  }, [isOpen]);
};

FullScreenSlide.defaultProps = {};

export default FullScreenSlide;
