import React, { useContext, useEffect } from 'react';
import { useInterpret } from '@xstate/react';

// Let's assume all this logic is an external package - regardless of the any ui framework
import { showsMachine } from '@/logic/tvmaze/shows-machine';

export const AppContext = React.createContext({});

export const AppProvider = ({ children }) => {
  const showsService = useInterpret(showsMachine, { devTools: true });

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      showsService.onTransition(console.log);
    }
  }, []);

  return (
    <AppContext.Provider value={{ showsService }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
