import * as matchers from '@/logic/tvmaze/matchers';

import { getShowFiltersValue } from '@/logic/tvmaze/selectors';

import { useCallback } from 'react';
import { useApp } from '@/context/AppContext';
import { useSelector } from '@xstate/react';
import { useMatchers } from '@/hooks/xstate';

import { ReactComponent as Logo } from '@/theme/vectors/swr.svg';
import { ReactComponent as CloseIcon } from '@/theme/vectors/close.svg';
import { ReactComponent as FilterIcon } from '@/theme/vectors/filter.svg';

import { Box, Icon, IconButton } from '@/components/ui';

import SearchForm from '@/components/shows/SearchForm';
import Filters from '@/components/shows/Filters';

const ModalControl = () => {
  const { showsService } = useApp();
  const isViewingShowDetail = useMatchers(
    showsService,
    matchers.isViewingShowDetail
  );

  const onClick = useCallback(() => {
    showsService.send('TOGGLE_VIEW_SHOW_DETAIL');
  }, []);

  return (
    <Box className="flex items-center justify-end">
      {isViewingShowDetail ? (
        <IconButton size="lg" onClick={onClick}>
          <CloseIcon className="w-6 h-6" />
        </IconButton>
      ) : null}
    </Box>
  );
};

const TopNav = () => {
  const { showsService } = useApp();
  const showFilters = useSelector(showsService, getShowFiltersValue);
  const isViewingShowDetail = useMatchers(
    showsService,
    matchers.isViewingShowDetail
  );

  const toggleFilters = useCallback(() => {
    showsService.send('TOGGLE_FILTERS');
  }, []);

  return (
    <Box className="space-y-4">
      <Box className="grid grid-cols-[1fr_auto_1fr] h-12">
        <Box className="flex justify-start">
          <Icon>
            <Logo className="w-12 h-12 hidden sm:block" />
          </Icon>
        </Box>
        <Box className="flex items-center space-x-2">
          <SearchForm />

          <IconButton
            size="lg"
            className="bg-white-900 text-black-900"
            onClick={toggleFilters}
            isDisabled={isViewingShowDetail}
            variant="inverted"
          >
            {showFilters && !isViewingShowDetail ? (
              <CloseIcon className="w-6 h-6" />
            ) : (
              <FilterIcon className="w-6 h-6" />
            )}
          </IconButton>
        </Box>
        <ModalControl />
      </Box>

      {showFilters ? <Filters /> : null}
    </Box>
  );
};

export default TopNav;
