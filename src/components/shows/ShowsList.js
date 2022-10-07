import * as matchers from '@/logic/tvmaze/matchers';

import { getDynamicShowsWithFilter } from '@/logic/tvmaze/selectors';

import { useCallback } from 'react';
import { useApp } from '@/context/AppContext';
import { useMatchers } from '@/hooks/xstate';
import { useSelector } from '@xstate/react';

import { ReactComponent as NoResultFound } from '@/theme/vectors/no-result-found.svg';

import { Box, Button, Text } from '@/components/ui';

import List from '@/components/ui/virtual/List';
import ShowListItem from '@/components/shows/ShowListItem';

const renderRow = ({ item, measure }) => {
  return <ShowListItem data={item} onImageLoaded={measure} />;
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

const ListBody = ({ isLoadingMoreData }) => {
  const { showsService } = useApp();
  const isSearching = useMatchers(showsService, matchers.isSearching);

  const data = useSelector(showsService, getDynamicShowsWithFilter);

  const onClick = useCallback(() => {
    showsService.send('LOAD_MORE');
  }, []);

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

const ShowsList = () => {
  const { showsService } = useApp();
  const isLoading = useMatchers(showsService, matchers.isLoading);
  const isLoadingMoreData = useMatchers(
    showsService,
    matchers.isLoadingMoreData
  );

  if (!isLoadingMoreData) {
    if (isLoading) {
      return null;
    }
  }

  return <ListBody isLoadingMoreData={isLoadingMoreData} />;
};

export default ShowsList;
