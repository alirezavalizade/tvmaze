import { assign, actions, spawn } from 'xstate';

import { showMachine } from './actors/show-machine';

import { getShows, getSearchResult } from './selectors';

const { send, cancel } = actions;

export const setShows = assign({
  shows({ shows }, event) {
    return {
      ...shows,
      [event.data.page]: event.data.data
    };
  }
});

export const toggleFilters = assign({
  showFilters({ showFilters }) {
    return !showFilters;
  }
});

export const hideFilters = assign({
  showFilters() {
    return false;
  }
});

export const setGenresFilter = assign({
  filters({ filters }, event) {
    if (filters.genres.includes(event.value)) {
      return {
        ...filters,
        genres: filters.genres.filter(item => {
          return item !== event.value;
        })
      };
    }

    return {
      ...filters,
      genres: [...filters.genres, event.value]
    };
  }
});

export const resetGenresFilter = assign({
  filters({ filters }) {
    return {
      ...filters,
      genres: []
    };
  }
});

export const setFilters = assign({
  filters({ filters }, event) {
    return {
      ...filters,
      ...event.value
    };
  }
});

export const increasePageNumber = assign({
  filters({ filters }) {
    return {
      ...filters,
      page: filters.page + 1
    };
  }
});

export const resetFilter = assign({
  filters() {
    return {
      query: '',
      page: 1,
      genres: []
    };
  }
});

export const setSearchResult = assign({
  searchResult({ searchResult }, event) {
    return {
      ...searchResult,
      [event.data.query]: event.data.data
    };
  }
});

export const cancelFetch = cancel('debounced-fetch');

export const sendFetch = send('FETCH', {
  delay: 500,
  id: 'debounced-fetch'
});

/**
 * Calling while state is viewing list
 */
export const setShowActorForListItem = assign({
  show(context, event) {
    const { showActors } = context;
    const { id } = event.value;

    if (showActors[id]) {
      return showActors[id];
    }

    const shows = getShows({ context });
    const initialState = shows.find(item => {
      return item.id === id;
    });

    const machine = showMachine.withContext({ data: initialState });

    return spawn(machine);
  }
});

/**
 * Calling while state is viewing search result
 */
export const setShowActorForSearchResult = assign({
  show(context, event) {
    const { showActors } = context;
    const { id } = event.value;

    if (showActors[id]) {
      return showActors[id];
    }

    const shows = getSearchResult({ context });
    const initialState = shows.find(item => {
      return item.id === id;
    });

    const machine = showMachine.withContext({ data: initialState });

    return spawn(machine);
  }
});

export const setShowToCache = assign({
  showActors({ showActors, show }) {
    const { id } = show.initialState.context.data;

    if (showActors[id]) {
      return showActors[id];
    }

    return {
      // caching previous machines
      ...showActors,
      [id]: show
    };
  }
});
