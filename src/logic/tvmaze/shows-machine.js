import { createMachine } from 'xstate';

import { loadShows, searchShows } from './http';

import * as actions from './actions';
import * as guards from './guards';

export const showsMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5gF8A0IB2B7CdGgBcA3AWwEMAvMAOgzAHcACWAsgsRgRnxAActYASwKCsGHgA9EAJgDsABmrzZ0gJwAWAGzTO0gKzqAHJ3QBPRJ0PU9qvZvmbVqlZ07zlyNCGLkqtBsys7IzSPPxCImKSMppWerJ6etKGeoaaBq6yZohp1prqAMyy6lqGqvnyep7oPpRgYQLCouJIIFII0iXWCUkpaRmcWSDmCAC0egXURQWc9urFBtKenkA */
  createMachine(
    {
      id: 'shows-machine',
      context: {
        searchResult: {},
        shows: {},
        // cache
        showActors: {},
        show: null,
        showFilters: false,
        filters: {
          query: '',
          page: 1,
          genres: []
        }
      },
      preserveActionOrder: true,
      predictableActionArguments: true,
      initial: 'viewing list',
      states: {
        'viewing list': {
          initial: 'initial',
          on: {
            SET_FILTERS: {
              actions: ['setFilters', 'cancelFetch', 'sendFetch']
            },
            TOGGLE_FILTERS: [
              {
                actions: ['toggleFilters', 'resetGenresFilter'],
                cond: ({ showFilters }) => showFilters
              },
              {
                actions: ['toggleFilters']
              }
            ],
            SET_GENRES_FILTERS: {
              actions: ['setGenresFilter']
            }
          },
          states: {
            initial: {
              after: [
                {
                  target: 'searching',
                  cond: 'hasQuery'
                },
                {
                  target: 'idle'
                }
              ]
            },

            idle: {
              initial: 'idle',
              on: {
                FETCH: [
                  {
                    target: '#shows-machine.viewing list.searching',
                    cond: 'hasQuery'
                  },
                  {
                    target: '#shows-machine.viewing list.idle.loading'
                  }
                ],
                TOGGLE_VIEW_SHOW_DETAIL: {
                  target: '#shows-machine.viewing show detail',
                  actions: ['setShowActorForListItem'],
                  cond: 'hasAnyShows'
                }
              },
              states: {
                idle: {
                  always: [
                    {
                      target: 'loaded',
                      cond: 'hasAnyShows'
                    },
                    {
                      target: 'loading'
                    }
                  ]
                },
                loading: {
                  invoke: {
                    src: ({ filters: { page } }) => {
                      return loadShows({ page });
                    },
                    onDone: {
                      target: 'loaded',
                      actions: ['setShows']
                    },
                    onError: {
                      target: 'failure'
                    }
                  }
                },
                loaded: {
                  on: {
                    LOAD_MORE: {
                      actions: [
                        'increasePageNumber',
                        'cancelFetch',
                        'sendFetch'
                      ]
                    }
                  }
                },
                failure: {
                  after: {
                    1_000: {
                      target: 'loading'
                    }
                  }
                }
              }
            },

            searching: {
              initial: 'loading',
              entry: ['resetGenresFilter'],
              on: {
                FETCH: [
                  {
                    target: '.loading',
                    cond: 'hasQuery'
                  },
                  {
                    target: '#shows-machine.viewing list.idle'
                  }
                ],
                TOGGLE_VIEW_SHOW_DETAIL: {
                  target: '#shows-machine.viewing show detail',
                  actions: ['setShowActorForSearchResult'],
                  cond: 'hasAnyShows'
                }
              },
              states: {
                entry: ['resetGenresFilter'],
                loading: {
                  invoke: {
                    src: ({ filters: { query } }) => {
                      return searchShows({ query });
                    },
                    onDone: {
                      target: 'loaded',
                      actions: ['setSearchResult']
                    },
                    onError: {
                      target: 'failure'
                    }
                  }
                },
                loaded: {
                  after: {
                    // refresh data
                    100_000: {
                      target: 'loading'
                    }
                  }
                },
                failure: {
                  after: {
                    1_000: {
                      target: 'loading'
                    }
                  }
                }
              }
            }
          }
        },
        'viewing show detail': {
          exit: ['setShowToCache'],
          on: {
            TOGGLE_VIEW_SHOW_DETAIL: {
              target: '#shows-machine.viewing list'
            },
            SET_FILTERS: {
              target: '#shows-machine.viewing list',
              actions: ['setFilters', 'cancelFetch', 'sendFetch']
            }
          }
        }
      }
    },
    {
      actions,
      guards
    }
  );
