import { types } from './reducers';
import axios from 'axios';

export const isFetching = (dispatch: any, value: boolean) => {
  dispatch({ type: types.FETCHING, value });
};

export const getInfo = async (dispatch: any, source: string) => {
  dispatch({ type: types.FETCHING, value: true });
  dispatch({ type: types.SET_CONTENT, content: null });

  try {
    const { data } = await axios.get(`/api?source=${source}`)

    dispatch({ type: types.SET_CONTENT, content: data });
    dispatch({ type: types.ALREADY_RECOMENDED, recomendedContent: data.id });
  } catch (err) {}
  finally {
    dispatch({ type: types.FETCHING, value: false });
  }
};

export const getRecomendation = async (dispatch: any, source: string, recomended: Array<number>) => {
  dispatch({ type: types.FETCHING, value: true });
  dispatch({ type: types.SET_CONTENT, content: null });
  
  try {
    const formated = recomended.join('|');
    const { data } = await axios.get(`/api/recomendation?source=${source}&recomended=${formated}`)

    dispatch({ type: types.SET_CONTENT, content: data });
    dispatch({ type: types.ALREADY_RECOMENDED, recomendedContent: data.id });
  } catch (err) {}
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
