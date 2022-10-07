import { getShowService } from '@/logic/tvmaze/selectors';
import { getEpisodesBySeasonsId } from '@/logic/tvmaze/actors/selectors';

import { useEffect, useMemo } from 'react';
import { useApp } from '@/context/AppContext';

import { ReactComponent as PlayIcon } from '@/theme/vectors/play.svg';

import { Box, Heading, Text, Button } from '@/components/ui';
import { useSelector } from '@xstate/react';

import LoadingState from '@/components/LoadingState';

const Episode = ({ data }) => {
  return (
    <Box className="flex items-center space-x-4 p-4 rounded-md hover:bg-neutral-700 group">
      <Box>
        <Text>{data.number || '0'}.</Text>
      </Box>
      <Box className="flex-1 flex justify-between items-center truncate">
        <Text className="truncate">{data.name}</Text>
        <Box className="group-hover:opacity-100 opacity-60 transition-opacity duration-300">
          <Button
            as="a"
            href={data.url}
            target="_blank"
            variant="info"
            size="sm"
            className="uppercase"
            leftIcon={<PlayIcon className="w-6 h-6" />}
          >
            play
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

const Episodes = ({ seasonId }) => {
  const { showsService } = useApp();
  const service = useSelector(showsService, getShowService);
  const episodes = useSelector(service, getEpisodesBySeasonsId(seasonId));

  useEffect(() => {
    setTimeout(() => {
      service.send('LOAD_SEASON_EPISODE', { seasonId });
    }, 1000);
  }, []);

  return useMemo(() => {
    if (!episodes) {
      return <LoadingState />;
    }

    return (
      <Box className="space-y-4 mt-12">
        <Heading as="h3" className="text-xl">
          Episodes
        </Heading>

        {episodes.map(item => {
          return <Episode key={item.name} data={item} />;
        })}
      </Box>
    );
  }, [episodes?.length]);
};

export default Episodes;
