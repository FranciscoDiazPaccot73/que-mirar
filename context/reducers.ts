export const types = {
  FETCHING: 'FETCHING',
  SET_CONTENT: 'SET_CONTENT',
  ALREADY_RECOMENDED: 'ALREADY_RECOMENDED',
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
    case types.ALREADY_RECOMENDED: {
      const { recomendedContent = [] } = state;
      return {...state, recomendedContent: [...new Set([...recomendedContent, action.recomendedContent])]}
    }
    default:
      return null;
  }
};
