import { useEffect, useState, useMemo } from 'react';

export const useMatchers = (service, matcher) => {
  const [matches, setMatches] = useState(() => {
    const state = service?.state ?? service?.initialState;
    return matcher(state);
  });

  useEffect(() => {
    const { unsubscribe } = service.subscribe(state => {
      if (!state.changed) return;

      setMatches(matcher(state));
    });

    return () => unsubscribe();
  }, []);

  return useMemo(() => {
    return matches;
  }, [matches]);
};
