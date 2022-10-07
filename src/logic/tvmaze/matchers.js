export function isViewingList(state) {
  return state.matches('viewing list.idle');
}

export function isLoadingList(state) {
  return state.matches('viewing list.idle.loading');
}

export function isLoadingMoreData(state) {
  return isLoadingList(state) && state.context.filters.page > 1;
}

export function isSearching(state) {
  return state.matches('viewing list.searching');
}

export function isViewingShowDetail(state) {
  return state.matches('viewing show detail');
}

export function isLoadingSearchResult(state) {
  return state.matches('viewing list.searching.loading');
}
