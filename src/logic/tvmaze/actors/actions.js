import { assign } from 'xstate';

export const setSeasons = assign({
  data({ data }, event) {
    return {
      ...data,
      seasons: event.data
    };
  }
});

export const setEpisodes = assign({
  data({ data }, event) {
    const seasons = data.seasons.map(item => {
      if (item.id === event.data.id) {
        return {
          ...item,
          episodes: event.data.data
        };
      }

      return item;
    });

    return {
      ...data,
      seasons
    };
  }
});
