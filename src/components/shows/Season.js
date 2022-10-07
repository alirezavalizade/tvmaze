import { FADE_SLOW } from '@/theme/framer-variants';

import cx from 'classnames';
import { getYear } from '@/functions/date';

import { useMemo } from 'react';
import { useToggle } from '@/hooks/useToggle';

import { ReactComponent as ArrowDownIcon } from '@/theme/vectors/arrow-down.svg';
import { AnimatePresence, motion } from 'framer-motion';
import { Box, Heading, Image, Button, Text } from '@/components/ui';

import Episodes from './Episodes';

const Season = ({ data }) => {
  const [showEpisodes, toggle] = useToggle(false);

  return useMemo(() => {
    return (
      <Box
        className={cx('group transition-colors duration-300 p-4 md:p-12', {
          'bg-neutral-900': showEpisodes,
          'hover:bg-neutral-900': !showEpisodes
        })}
      >
        <Box className="flex flex-col md:flex-row items-center rounded-md mb-4 md:mb-0 space-y-8 md:space-y-0 md:space-x-8">
          <Box className="w-40 rounded-md overflow-hidden aspect-[9_/_12] bg-neutral-700">
            {data.image?.original && (
              <Image src={data.image?.original} alt={data.number} />
            )}
          </Box>
          <Box className="flex flex-col items-center flex-1 self-stretch md:py-4 md:items-start">
            <Box className="flex-1 space-y-4 text-center md:text-left">
              <Heading as="h2" className="text-lg md:text-xl lg:text-2xl">
                Season {data.number} ({getYear(data.premiereDate)})
              </Heading>
              {data.episodeOrder ? (
                <Text className="opacity-90">{data.episodeOrder} Episodes</Text>
              ) : null}
            </Box>

            <Box
              className={cx(
                'w-full sm:w-auto group-hover:opacity-100 opacity-80 transition-opacity duration-300',
                {
                  'opacity-100': showEpisodes
                }
              )}
            >
              <Button
                variant="info"
                size="sm"
                className="uppercase !rounded-md mt-4 md:mt-0 !w-full"
                rightIcon={
                  <ArrowDownIcon
                    className={cx(
                      'w-6 h-6 transform-gpu transition-transform duration-300',
                      {
                        'rotate-180': showEpisodes
                      }
                    )}
                  />
                }
                onClick={toggle}
              >
                view episodes
              </Button>
            </Box>
          </Box>
        </Box>

        <AnimatePresence initial mode="wait">
          {showEpisodes ? (
            <motion.div {...FADE_SLOW}>
              <Episodes seasonId={data.id} />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Box>
    );
  }, [showEpisodes]);
};

export default Season;
