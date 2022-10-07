import memoize from 'lodash/memoize';
import uniq from 'lodash/uniq';

import * as matchers from '@/logic/tvmaze/matchers';

function filterShowsByGenres(data, genres) {
  return data.filter(item => {
    if (!Array.isArray(item.genres)) {
      return false;
    }

    return item.genres.some(genre => {
      return genres.includes(genre);
    });
  });
}

export function getDefaultShowsMemoize(state) {
  return Object.values(state.context.shows).reduce((acc, item) => {
    return [...acc, ...item];
  }, []);
}

export const getShows = memoize(getDefaultShowsMemoize);

export function getShowService(state) {
  return state.context.show;
}

export function getSelectedGenres(state) {
  return state.context.filters.genres;
}

export function getSearchResult(state) {
  const { query } = state.context.filters;

  return state.context.searchResult[query];
}

export function getDynamicShows(state) {
  if (matchers.isSearching(state) || state.context.filters.query) {
    return getSearchResult(state);
  }

  const shows = getShows(state);

  return shows;
}

export function getDynamicShowsWithFilter(state) {
  const selectedGenres = getSelectedGenres(state);
  const shows = getDynamicShows(state);

  if (selectedGenres?.length && shows?.length) {
    return filterShowsByGenres(shows, selectedGenres);
  }

  return shows;
}

export function getShowFiltersValue(state) {
  return state.context.showFilters;
}

export function getGenres(state) {
  const shows = getDynamicShows(state);

  if (!shows) {
    return [];
  }

  const genres = shows
    .map(item => {
      return item.genres;
    })
    .flat();

  return uniq(genres);
}
