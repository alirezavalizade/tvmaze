import * as matchers from '@/logic/tvmaze/matchers';
import { getShowService } from '@/logic/tvmaze/selectors';
import { getShowInfo } from '@/logic/tvmaze/actors/selectors';

import { useCallback, useMemo } from 'react';
import { useSelector } from '@xstate/react';
import { useApp } from '@/context/AppContext';
import { useMatchers } from '@/hooks/xstate';

import FullScreenSlide from '@/components/ui/modal/FullScreenSlide';
import ShowListItem from '@/components/shows/ShowListItem';
import Seasons from '@/components/shows/Seasons';

const ShowInfo = () => {
  const { showsService } = useApp();
  const service = useSelector(showsService, getShowService);
  const data = useSelector(service, getShowInfo);

  return <ShowListItem className="p-4 md:p-12" data={data} fullDetail />;
};

const Show = () => {
  const { showsService } = useApp();
  const isViewingShowDetail = useMatchers(
    showsService,
    matchers.isViewingShowDetail
  );

  const onClose = useCallback(() => {
    showsService.send('TOGGLE_VIEW_SHOW_DETAIL');
  }, []);

  return useMemo(() => {
    return (
      <FullScreenSlide isOpen={isViewingShowDetail} onClose={onClose}>
        <>
          <ShowInfo />
          <Seasons />
        </>
      </FullScreenSlide>
    );
  }, [isViewingShowDetail]);
};

export default Show;
