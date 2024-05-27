export const types = {
  FETCHING: "FETCHING",
  SET_CONTENT: "SET_CONTENT",
  ALREADY_RECOMENDED: "ALREADY_RECOMENDED",
  PREV_CONTENT: "PREV_CONTENT",
  SET_PROVIDERS: "SET_PROVIDERS",
  SET_GENRES: "SET_GENRES",
  SET_SELECTED_PROVIDER: "SET_SELECTED_PROVIDER",
  SET_SELECTED_GENRE: "SET_SELECTED_GENRE",
  SET_NO_CONTENT: "SET_NO_CONTENT",
  SET_WATCH_REGION: "SET_WATCH_REGION",
  SET_SIMILARS: "SET_SIMILARS",
  SET_SEARCH: "SET_SEARCH",
  SET_SIMILAR_TO_CONTENT: "SET_SIMILAR_TO_CONTENT",
  SET_NEXT_RECOMENDATIONS: "SET_NEXT_RECOMENDATIONS",
  SET_INITIAL_RECOMENDATIONS: "SET_INITIAL_RECOMENDATIONS",
  SET_SEARCH_MODAL_STATE: "SET_SEARCH_MODAL_STATE",
  SET_TIME_FRAME: "SET_TIME_FRAME",
  SET_LAST_SEARCH: "SET_LAST_SEARCH",
  UPDATE_SIMILARS: "UPDATE_SIMILARS",
};

const DEFAULT_PROVIDERS = [
  {
    logo_path: "/dQeAar5H991VYporEjUspolDarG.jpg",
    provider_name: "Amazon Prime Video",
    provider_id: 119,
  },
  {
    logo_path: "/cv5S44vHpNoGj7wby6390AyhEkH.jpg",
    provider_name: "Star Plus",
    provider_id: 619,
  },
  {
    logo_path: "/h5DcR0J2EESLitnhR8xLG1QymTE.jpg",
    provider_name: "Paramount Plus",
    provider_id: 531,
  },
  {
    logo_path: "/fksCUZ9QDWZMUwL2LgMtLckROUN.jpg",
    provider_name: "Max",
    provider_id: 1899,
  },
  {
    logo_path: "/97yvRBw1GzX7fXprcF80er19ot.jpg",
    provider_name: "Disney Plus",
    provider_id: 337,
  },
  {
    logo_path: "/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg",
    provider_name: "Netflix",
    provider_id: 8,
  },
  {
    logo_path: "/mXeC4TrcgdU6ltE9bCBCEORwSQR.jpg",
    provider_name: "Crunchyroll",
    provider_id: 283,
  },
];

export const init = (config: any) => {
  return {
    ...config,
    BASE_IMAGE_URL: "https://image.tmdb.org/t/p/w500",
    selectedTimeframe: "day",
    providers: DEFAULT_PROVIDERS,
  };
};

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case types.FETCHING: {
      return { ...state, fetching: action.value };
    }
    case types.SET_SEARCH_MODAL_STATE: {
      return { ...state, isModalOpen: action.value };
    }
    case types.SET_INITIAL_RECOMENDATIONS: {
      return { ...state, nextRecomendations: action.nextRecomendations };
    }
    case types.SET_NEXT_RECOMENDATIONS: {
      const { nextRecomendations = [] } = state;

      const currentRecomendations = [...nextRecomendations];

      if (currentRecomendations.length) currentRecomendations.shift();

      const newRecomendations = [
        ...currentRecomendations,
        action.nextRecomendations,
      ];

      return { ...state, nextRecomendations: newRecomendations };
    }
    case types.SET_CONTENT: {
      return { ...state, content: action.content };
    }
    case types.SET_TIME_FRAME: {
      return { ...state, selectedTimeframe: action.selectedTimeframe };
    }
    case types.PREV_CONTENT: {
      return { ...state, prevContent: action.prevContent };
    }
    case types.SET_PROVIDERS: {
      return { ...state, providers: action.providers };
    }
    case types.SET_GENRES: {
      return { ...state, genres: action.genres };
    }
    case types.SET_WATCH_REGION: {
      return { ...state, watchRegion: action.watchRegion };
    }
    case types.SET_SELECTED_PROVIDER: {
      return { ...state, selectedProvider: action.selectedProvider };
    }
    case types.SET_SELECTED_GENRE: {
      return { ...state, selectedGenre: action.selectedGenre };
    }
    case types.SET_NO_CONTENT: {
      return { ...state, noContent: action.noContent };
    }
    case types.SET_SIMILAR_TO_CONTENT: {
      return { ...state, content: action.similar };
    }
    case types.SET_SIMILARS: {
      return { ...state, similars: action.similars };
    }
    case types.UPDATE_SIMILARS: {
      return { ...state, similars: action.similars };
    }
    case types.SET_SEARCH: {
      return { ...state, searchResult: action.search };
    }
    case types.ALREADY_RECOMENDED: {
      const { recomendedContent = [] } = state;
      const combinedContent = [...recomendedContent, action.recomendedContent];
      const uniqueContent = Object.keys(
        combinedContent.reduce((result, item) => {
          // eslint-disable-next-line no-param-reassign
          result[item] = true;

          return result;
        }, {})
      );

      return { ...state, recomendedContent: uniqueContent };
    }
    case types.SET_LAST_SEARCH: {
      return { ...state, lastSearch: action.lastSearch };
    }
    default:
      return null;
  }
};
