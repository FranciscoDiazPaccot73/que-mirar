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
};

export const init = (config: any) => {
  return {
    ...config,
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
    case types.SET_SELECTED_PROVIDER: {
      return {...state, selectedProvider: action.selectedProvider}
    }
    case types.SET_SELECTED_GENRE: {
      return {...state, selectedGenre: action.selectedGenre}
    }
    case types.SET_NO_CONTENT: {
      return {...state, noContent: action.noContent}
    }
    case types.ALREADY_RECOMENDED: {
      const { recomendedContent = [] } = state;
      return {...state, recomendedContent: [...new Set([...recomendedContent, action.recomendedContent])]}
    }
    default:
      return null;
  }
};
