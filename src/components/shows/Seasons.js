import { getShowService } from '@/logic/tvmaze/selectors';
import { getShowSeasons } from '@/logic/tvmaze/actors/selectors';

import { useSelector } from '@xstate/react';
import { useApp } from '@/context/AppContext';

import { Box, Heading } from '@/components/ui';

import LoadingState from '@/components/LoadingState';

import Season from './Season';

const Seasons = () => {
  const { showsService } = useApp();
  const service = useSelector(showsService, getShowService);
  const data = useSelector(service, getShowSeasons);

  return (
    <Box className="text-center md:text-left mt-4">
      <Heading
        as="h2"
        className="text-xl md:text-2xl lg:text-4xl px-4 md:px-12"
      >
        Seasons
      </Heading>

      {data ? (
        data.map(item => {
          return <Season key={item.id} data={item} />;
        })
      ) : (
        <LoadingState />
      )}
    </Box>
  );
};

export default Seasons;
