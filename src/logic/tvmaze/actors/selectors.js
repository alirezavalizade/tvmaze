export function getShowInfo(state) {
  const { seasons, ...rest } = state.context.data;

  return rest;
}

export function getShowSeasons(state) {
  return state.context.data.seasons;
}

export function getEpisodesBySeasonsId(id) {
  return state => {
    return state.context.data.seasons.find(item => {
      return id === item.id;
    })?.episodes;
  };
}
