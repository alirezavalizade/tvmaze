import { useReducer } from 'react';

const isBoolean = value => typeof value === 'boolean';

const toggleReducer = (state, nextValue) => {
  return isBoolean(nextValue) ? nextValue : !state;
};

export const useToggle = initialValue => {
  return useReducer(toggleReducer, initialValue);
};
