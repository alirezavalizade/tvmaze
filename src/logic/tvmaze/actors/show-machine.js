import { createMachine } from 'xstate';

import { loadShowSeasons, loadShowSeasonEpisodes } from '../http';

import * as actions from './actions';

export const showMachine = createMachine(
  {
    id: 'show-machine',
    context: {
      data: null
    },
    preserveActionOrder: true,
    predictableActionArguments: true,
    initial: 'loadingSeasons',
    states: {
      loadingSeasons: {
        invoke: {
          src({ data }) {
            return loadShowSeasons({ id: data.id });
          },
          onDone: {
            target: 'loaded',
            actions: ['setSeasons']
          },
          onError: {
            after: {
              1_000: {
                target: 'loadingSeasons'
              }
            }
          }
        }
      },
      loadingEpisodes: {
        invoke: {
          src(_, event) {
            return loadShowSeasonEpisodes({ id: event.seasonId });
          },
          onDone: {
            target: 'loaded',
            actions: ['setEpisodes']
          },
          onError: {
            after: {
              1_000: {
                target: 'loadingEpisodes'
              }
            }
          }
        }
      },
      loaded: {
        on: {
          LOAD_SEASON_EPISODE: {
            target: 'loadingEpisodes'
          }
        }
      }
    }
  },
  {
    actions
  }
);
