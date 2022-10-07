import sanitize from 'sanitize-html';
import cx from 'classnames';
import { getYear } from '@/functions/date';

import { useCallback, useEffect } from 'react';
import { useApp } from '@/context/AppContext';

import { Box, Image, Heading, Button, Text } from '@/components/ui';

import Tags from '@/components/Tags';
import Rate from '@/components/Rate';

const ShowListItem = ({ data, onImageLoaded, fullDetail, className }) => {
  const { showsService } = useApp();

  const onClick = useCallback(() => {
    showsService.send('TOGGLE_VIEW_SHOW_DETAIL', { value: data });
  }, []);

  useEffect(() => {
    // measure
    if (onImageLoaded) {
      onImageLoaded();
    }
  }, []);

  return (
    <Box
      className={cx(
        'flex flex-col md:flex-row items-center rounded-md mb-4 md:mb-0 space-y-8 md:space-y-0 md:space-x-8',
        className,
        {
          'p-4 md:p-8 hover:bg-neutral-800': !fullDetail
        }
      )}
    >
      <Box className="w-full sm:w-44 md:w-52 xl:w-56 rounded-md overflow-hidden aspect-[9_/_13] bg-neutral-700">
        {data.image?.original && (
          <Image src={data.image?.original} alt={data.name} />
        )}
      </Box>
      <Box className="flex flex-col items-center flex-1 self-stretch md:py-4 md:items-start">
        <Box className="flex-1 space-y-4 text-center md:text-left">
          <Heading as="h2" className="text-lg md:text-xl lg:text-2xl">
            {data.name} ({getYear(data.premiered)}) - {data.status}
          </Heading>
          {data.network ? (
            <Box>
              <Text>
                Network:{' '}
                <Box
                  as={data.network.officialSite ? 'a' : 'span'}
                  href={data.network.officialSite}
                  target="_blank"
                  className={data.network.officialSite ? 'underline' : ''}
                  rel="noreferrer"
                >
                  {data.network.name}
                </Box>{' '}
                - {data.network?.country?.name}
              </Text>
            </Box>
          ) : null}
          <Box className="flex items-center justify-center md:justify-start space-x-4">
            {data.rating.average ? <Rate>{data.rating.average}</Rate> : null}
            <Tags data={data.genres} />
          </Box>
          <Box
            dangerouslySetInnerHTML={{ __html: sanitize(data.summary) }}
            className={fullDetail ? '' : 'line-clamp-4 md:line-clamp-3'}
          />
        </Box>

        {fullDetail ? null : (
          <Box className="w-full sm:w-auto">
            <Button
              variant="info"
              size="sm"
              className="uppercase !rounded-md mt-4 md:mt-0 !w-full"
              onClick={onClick}
            >
              view more
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ShowListItem;
