import axios from 'axios';

import { trackEvent } from '../utils/trackers';
import { types } from './reducers';

export const isFetching = (dispatch: any, value: boolean) => {
  dispatch({ type: types.FETCHING, value });
};

export const getInfo = async (dispatch: any, source: string) => {
  dispatch({ type: types.FETCHING, value: true });
  dispatch({ type: types.SET_CONTENT, content: null });
  let itWorked = true;

  try {
    const { data } = await axios.get(`/api?source=${source}`, { timeout: 8000 });

    const { result, rest } = data;

    dispatch({ type: types.SET_CONTENT, content: result });
    dispatch({ type: types.ALREADY_RECOMENDED, recomendedContent: data.id });
    dispatch({ type: types.SET_SIMILARS, similars: rest });

    return data.id;
  } catch (err: any) {
    trackEvent('ERROR', 'getInfo');
    itWorked = false;
    if (err?.code === 'ECONNABORTED') getInfo(dispatch, source);
  } finally {
    dispatch({ type: types.FETCHING, value: false });
  }

  return itWorked;
};

export const getProviders = async (dispatch: any, source: string) => {
  try {
    const { data } = await axios.get(`/api/providers?source=${source}`, { timeout: 8000 });

    dispatch({ type: types.SET_PROVIDERS, providers: data });
  } catch (err) {
    trackEvent('ERROR', 'getProviders');
  }
};

export const search = async (dispatch: any, source: string, query: string, region: string) => {
  dispatch({ type: types.FETCHING, value: true });
  try {
    const { data } = await axios.get(`/api/search?source=${source}&region=${region}&q=${query}`, { timeout: 8000 });

    dispatch({ type: types.SET_SEARCH, search: data });
  } catch (err) {
    trackEvent('ERROR', 'getProviders');
  } finally {
    dispatch({ type: types.FETCHING, value: false });
  }
};

export const resetSearch = (dispatch: any) => {
  dispatch({ type: types.SET_SEARCH, search: null });
};

export const getGenres = async (dispatch: any, source: string) => {
  try {
    const { data } = await axios.get(`/api/genres?source=${source}`, { timeout: 8000 });

    dispatch({ type: types.SET_GENRES, genres: data });
  } catch (err) {
    trackEvent('ERROR', 'getGenres');
  }
};

export const setSimilars = (dispatch: any, content: any) => {
  dispatch({ type: types.SET_SIMILARS, similars: content });
};

export const getSimilars = async (dispatch: any, source: any, id: string, region: string) => {
  try {
    const { data } = await axios.get(`/api/similar?source=${source}&id=${id}&region=${region}`, { timeout: 8000 });

    dispatch({ type: types.SET_SIMILARS, similars: data });
  } catch (err) {
    trackEvent('ERROR', 'getGenres');
  }
};

export const getContent = async (dispatch: any, source: any, id: string, region: string) => {
  try {
    const { data } = await axios.get(`/api/content?source=${source}&id=${id}&region=${region}`, { timeout: 8000 });

    dispatch({ type: types.SET_CONTENT, content: data });

    return data.id;
  } catch (err) {
    trackEvent('ERROR', 'getGenres');

    return '';
  }
};

export const getRecomendation = async (
  dispatch: any,
  source: string,
  recomended: Array<number>,
  prev: any,
  provider?: any,
  genre?: number | null,
  watchRegion?: string,
) => {
  dispatch({ type: types.FETCHING, value: true });
  dispatch({ type: types.SET_CONTENT, content: null });
  dispatch({ type: types.SET_NO_CONTENT, noContent: null });
  dispatch({ type: types.SET_SIMILARS, similars: null });

  try {
    const formated = recomended.join('|');
    const { data } = await axios.get(
      `/api/recomendation?source=${source}&recomended=${formated}&provider=${provider ?? 0}${
        genre ? `&genre=${genre}` : ''
      }&region=${watchRegion}`,
      { timeout: 8000 },
    );

    dispatch({ type: types.SET_CONTENT, content: data });
    dispatch({ type: types.ALREADY_RECOMENDED, recomendedContent: data.id });
    const prevContent = { ...data, source };

    dispatch({ type: types.PREV_CONTENT, prevContent });

    return data.id;
  } catch (err: any) {
    let noContentObj = {
      message: 'No hay contenido para tu búsqueda.',
      type: 'error',
    };

    if (err?.response?.status === 404) {
      noContentObj = {
        message: err.response.data?.noResult ?? '',
        type: 'warning',
      };
    } else if (prev?.source === source) {
      const prevContent = prev ? { ...prev, source } : null;

      dispatch({ type: types.SET_CONTENT, content: prevContent });
    } else {
      dispatch({ type: types.PREV_CONTENT, prevContent: null });
    }
    dispatch({ type: types.SET_NO_CONTENT, noContent: noContentObj });
    const searchParam =
      err?.response?.data?.search && typeof err?.response?.data?.search === 'number' ? err?.response?.data?.search : 'error';
    const trackWording = `getRecomendation-${source}-provider_${provider ?? 0}-genre_${genre ?? 'all'}-gte_${searchParam}`;

    trackEvent('ERROR', trackWording);

    return '';
  } finally {
    dispatch({ type: types.FETCHING, value: false });
  }
};

export const setContent = (dispatch: any, content: any) => {
  dispatch({ type: types.SET_CONTENT, content });
};

export const setRecomended = (dispatch: any, id: number) => {
  console.log('ACTION', id);
  dispatch({ type: types.ALREADY_RECOMENDED, recomendedContent: id });
};

export const setProvider = (dispatch: any, id: number) => {
  dispatch({ type: types.SET_SELECTED_PROVIDER, selectedProvider: id });
};

export const setWatchRegion = (dispatch: any, value: string) => {
  dispatch({ type: types.SET_WATCH_REGION, watchRegion: value });
};

export const setSelectedGenre = (dispatch: any, id: number | null) => {
  dispatch({ type: types.SET_SELECTED_GENRE, selectedGenre: id });
};
