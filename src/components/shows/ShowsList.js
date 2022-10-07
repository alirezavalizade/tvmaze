import * as matchers from '@/logic/tvmaze/matchers';

import { getDynamicShowsWithFilter } from '@/logic/tvmaze/selectors';

import { useCallback } from 'react';
import { useApp } from '@/context/AppContext';
import { useMatchers } from '@/hooks/xstate';
import { useSelector } from '@xstate/react';

import { ReactComponent as MovieNight } from '@/theme/vectors/movie-night.svg';
import { ReactComponent as NoResultFound } from '@/theme/vectors/no-result-found.svg';

import { Box, Button, Text } from '@/components/ui';

import List from '@/components/ui/virtual/List';
import ShowListItem from '@/components/shows/ShowListItem';

const renderRow = ({ item, measure }) => {
  return <ShowListItem data={item} onImageLoaded={measure} />;
};

const Loading = () => {
  return (
    <Box className="flex flex-col items-center justify-center w-full md:w-1/2 xl:w-1/3 mx-auto flex-1 animate-pulse">
      <Text className="text-xl">Let&apos;s find something to watch!</Text>
      <Box className="w-full">
        <MovieNight />
      </Box>
    </Box>
  );
};

const NoResultFoundState = () => {
  return (
    <Box className="flex flex-col items-center justify-center w-full md:w-1/2 xl:w-1/3 mx-auto flex-1">
      <Box className="w-full">
        <NoResultFound />
      </Box>
      <Text className="text-xl">Ups!... no results found</Text>
    </Box>
  );
};

const ShowsList = () => {
  const { showsService } = useApp();
  const data = useSelector(showsService, getDynamicShowsWithFilter);

  const isSearching = useMatchers(showsService, matchers.isSearching);
  const isLoadingList = useMatchers(showsService, matchers.isLoadingList);
  const isLoadingSearchResult = useMatchers(
    showsService,
    matchers.isLoadingSearchResult
  );
  const isLoadingMoreData = useMatchers(
    showsService,
    matchers.isLoadingMoreData
  );

  const onClick = useCallback(() => {
    showsService.send('LOAD_MORE');
  }, []);

  if (!isLoadingMoreData) {
    if (isLoadingList || isLoadingSearchResult) {
      return <Loading />;
    }
  }

  if (isSearching && data?.length === 0) {
    return <NoResultFoundState />;
  }

  if (!data?.length) {
    return null;
  }

  return (
    <>
      <List
        data={data}
        overscanRowCount={20}
        forceUpdateId={data.length}
        renderRow={renderRow}
      />
      {isSearching ? null : (
        <Box className="flex items-center justify-center py-4 md:py-8">
          <Button
            size="lg"
            variant="info"
            className="uppercase"
            onClick={onClick}
            isLoading={isLoadingMoreData}
          >
            Load more
          </Button>
        </Box>
      )}
    </>
  );
};

export default ShowsList;
