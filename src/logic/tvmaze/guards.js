export const hasAnyShows = ({ shows }) => {
  return Object.keys(shows).length > 0;
};

export const hasQuery = ({ filters }) => {
  return filters.query !== '';
};
