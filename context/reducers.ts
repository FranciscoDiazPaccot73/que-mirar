export const types = {
  FETCHING: 'FETCHING',
  SET_CONTENT: 'SET_CONTENT',
  ALREADY_RECOMENDED: 'ALREADY_RECOMENDED',
  PREV_CONTENT: 'PREV_CONTENT',
  SET_PROVIDERS: 'SET_PROVIDERS',
  SET_GENRES: 'SET_GENRES',
  SET_SELECTED_PROVIDER: 'SET_SELECTED_PROVIDER',
  SET_SELECTED_GENRE: 'SET_SELECTED_GENRE',
  SET_NO_CONTENT: 'SET_NO_CONTENT',
  SET_WATCH_REGION: 'SET_WATCH_REGION',
  SET_SIMILARS: 'SET_SIMILARS',
  SET_SEARCH: 'SET_SEARCH',
};

export const init = (config: any) => {
  return {
    ...config,
    BASE_IMAGE_URL: 'https://image.tmdb.org/t/p/w500',
  };
};

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case types.FETCHING: {
      return {...state, fetching: action.value}
    }
    case types.SET_CONTENT: {
      return {...state, content: action.content}
    }
    case types.PREV_CONTENT: {
      return {...state, prevContent: action.prevContent}
    }
    case types.SET_PROVIDERS: {
      return {...state, providers: action.providers}
    }
    case types.SET_GENRES: {
      return {...state, genres: action.genres}
    }
    case types.SET_WATCH_REGION: {
      return {...state, watchRegion: action.watchRegion}
    }
    case types.SET_SELECTED_PROVIDER: {
      return {...state, selectedProvider: action.selectedProvider}
    }
    case types.SET_SELECTED_GENRE: {
      return {...state, selectedGenre: action.selectedGenre}
    }
    case types.SET_NO_CONTENT: {
      return {...state, noContent: action.noContent}
    }
    case types.SET_SIMILARS: {
      return {...state, similars: action.similars}
    }
    case types.SET_SEARCH: {
      return {...state, searchResult: action.search}
    }
    case types.ALREADY_RECOMENDED: {
      const { recomendedContent = [] } = state;
      return {...state, recomendedContent: [...new Set([...recomendedContent, action.recomendedContent])]}
    }
    default:
      return null;
  }
};
