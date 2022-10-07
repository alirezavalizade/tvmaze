import { getSelectedGenres, getGenres } from '@/logic/tvmaze/selectors';

import { useApp } from '@/context/AppContext';
import { useSelector } from '@xstate/react';

import { Box, Button, Text } from '@/components/ui';
import { useCallback } from 'react';

const Genres = () => {
  const { showsService } = useApp();
  const data = useSelector(showsService, getGenres);
  const selectedGenres = useSelector(showsService, getSelectedGenres);

  const onClick = useCallback(e => {
    showsService.send('SET_GENRES_FILTERS', { value: e.target.dataset.value });
  }, []);

  if (!data?.length) {
    return (
      <Box>
        <Text>No filters available.</Text>
      </Box>
    );
  }

  return (
    <Box className="snap-x snap-mandatory overflow-x-auto flex items-center space-x-4 py-1">
      {data.map(item => {
        const isSelected = selectedGenres.includes(item);

        return (
          <Box className="snap-start" key={item}>
            <Button
              size="md"
              variant={isSelected ? 'info' : 'inverted'}
              data-value={item}
              onClick={onClick}
            >
              {item}
            </Button>
          </Box>
        );
      })}
    </Box>
  );
};

const Filters = () => {
  return <Genres />;
};

export default Filters;
