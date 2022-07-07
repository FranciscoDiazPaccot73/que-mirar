import axios from 'axios';

import { types } from './reducers';
import { trackEvent } from '../utils/trackers';

export const isFetching = (dispatch: any, value: boolean) => {
  dispatch({ type: types.FETCHING, value });
};

export const getInfo = async (dispatch: any, source: string) => {
  dispatch({ type: types.FETCHING, value: true });
  dispatch({ type: types.SET_CONTENT, content: null });
  let itWorked = true;

  try {
    const { data } = await axios.get(`/api?source=${source}`, { timeout: 8000 })

    dispatch({ type: types.SET_CONTENT, content: data });
    dispatch({ type: types.ALREADY_RECOMENDED, recomendedContent: data.id });
  } catch (err: any) {
    trackEvent('ERROR', 'getInfo')
    itWorked = false;
    if (err?.code === 'ECONNABORTED') getInfo(dispatch, source);
  }
  finally {
    dispatch({ type: types.FETCHING, value: false });
  }

  return itWorked;
};

export const getProviders = async (dispatch: any, source: string) => {
  try {
    const { data } = await axios.get(`/api/providers?source=${source}`, { timeout: 8000 })

    dispatch({ type: types.SET_PROVIDERS, providers: data });
  } catch (err) {
    trackEvent('ERROR', 'getProviders')
  }
};

export const getGenres = async (dispatch: any, source: string) => {
  try {
    const { data } = await axios.get(`/api/genres?source=${source}`, { timeout: 8000 })

    dispatch({ type: types.SET_GENRES, genres: data });
  } catch (err) {
    trackEvent('ERROR', 'getGenres')
  }
};

export const getRecomendation = async (dispatch: any, source: string, recomended: Array<number>, prev: any, provider?: any, genre?: number) => {
  dispatch({ type: types.FETCHING, value: true });
  dispatch({ type: types.SET_CONTENT, content: null });
  dispatch({ type: types.SET_NO_CONTENT, noContent: false });
  
  try {
    const formated = recomended.join('|');
    const { data } = await axios.get(`/api/recomendation?source=${source}&recomended=${formated}&provider=${provider ?? 0}${genre ? `&genre=${genre}` : ''}`, { timeout: 8000 })

    dispatch({ type: types.SET_CONTENT, content: data });
    dispatch({ type: types.ALREADY_RECOMENDED, recomendedContent: data.id });
    const prevContent = { ...data, source };
    dispatch({ type: types.PREV_CONTENT, prevContent });
  } catch (err) {
    if (prev?.source === source) {
      const prevContent = prev ? { ...prev, source } : null;
      dispatch({ type: types.SET_CONTENT, content: prevContent });
    } else {
      dispatch({ type: types.PREV_CONTENT, prevContent: null });
    }
    dispatch({ type: types.SET_NO_CONTENT, noContent: true });
    const trackWording = `getRecomendation-${source}-provider_${provider ?? 0}-genre_${genre ?? 'all'}`
    trackEvent('ERROR', trackWording)
  }
  finally {
    dispatch({ type: types.FETCHING, value: false });
  }
};

export const setContent = (dispatch: any, content: any) => {
  dispatch({ type: types.SET_CONTENT, content });
};

export const setRecomended = (dispatch: any, id: number) => {
  dispatch({ type: types.ALREADY_RECOMENDED, recomendedContent: id });
};

export const setProvider = (dispatch: any, id: number) => {
  dispatch({ type: types.SET_SELECTED_PROVIDER, selectedProvider: id });
};

export const setSelectedGenre = (dispatch: any, id: number|null) => {
  dispatch({ type: types.SET_SELECTED_GENRE, selectedGenre: id });
};
