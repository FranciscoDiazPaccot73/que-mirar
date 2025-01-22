import { ProviderType } from "@/components/Filters/Providers";
import { ContentInterface } from "@/pages/types";
import axios from "axios";

import { types } from "./reducers";

interface BaseContentInterface extends ContentInterface {
  flatrate: ProviderType;
}

const timeout = 20000;
let controller: AbortController | null;

export const isFetching = (dispatch: any, value: boolean) => {
  dispatch({ type: types.FETCHING, value });
};

export const setIsModalOpen = (dispatch: any, value: boolean) => {
  dispatch({ type: types.SET_SEARCH_MODAL_STATE, value });
};

export const getInfo = async (
  dispatch: any,
  source: string,
  timelapse: string
) => {
  dispatch({ type: types.FETCHING, value: true });
  dispatch({ type: types.SET_CONTENT, content: null });
  let itWorked = true;

  try {
    const { data } = await axios.get(
      `/api?source=${source}&time=${timelapse || "day"}`,
      { timeout }
    );

    const { result, rest } = data;

    dispatch({ type: types.SET_CONTENT, content: result });
    dispatch({ type: types.ALREADY_RECOMENDED, recomendedContent: data.id });
    dispatch({ type: types.SET_SIMILARS, similars: rest });

    return data.id;
  } catch (err: any) {
    itWorked = false;
    if (err?.code === "ECONNABORTED") getInfo(dispatch, source, timelapse);
  } finally {
    dispatch({ type: types.FETCHING, value: false });
  }

  return itWorked;
};

export const getMoreTrendings = async (
  dispatch: any,
  source: string,
  timelapse: string,
  page: number
) => {
  dispatch({ type: types.FETCHING, value: true });

  try {
    const { data } = await axios.get(
      `/api/trendings?source=${source}&time=${timelapse || "day"}&page=${
        page || 2
      }`,
      { timeout }
    );

    const { results } = data;

    dispatch({ type: types.UPDATE_SIMILARS, similars: results });
  } catch (err: any) {
    console.log(err);
  } finally {
    dispatch({ type: types.FETCHING, value: false });
  }
};

export const getProviders = async (dispatch: any, source: string) => {
  try {
    const { data } = await axios.get(`/api/providers?source=${source}`, {
      timeout,
    });

    dispatch({ type: types.SET_PROVIDERS, providers: data });
  } catch (err) {
    console.log(err);
  }
};

export const search = async (
  dispatch: any,
  source: string,
  query: string,
  region: string
) => {
  dispatch({ type: types.FETCHING, value: true });
  try {
    const { data } = await axios.get(
      `/api/search?source=${source}&region=${region}&q=${query}`,
      { timeout }
    );

    dispatch({ type: types.SET_SEARCH, search: data });
  } catch (err) {
    console.log(err);
  } finally {
    dispatch({ type: types.FETCHING, value: false });
  }
};

export const searchLocally = async (
  source: string,
  query: string,
  region: string
) => {
  return axios
    .get(`/api/search?source=${source}&region=${region}&q=${query}`, {
      timeout,
    })
    .then(({ data }) => data);
};

export const switchSearchValues = (dispatch: any, data: any) => {
  dispatch({ type: types.SET_SEARCH, search: data });
};

export const resetSearch = (dispatch: any) => {
  dispatch({ type: types.SET_SEARCH, search: null });
};

export const getGenres = async (dispatch: any, source: string) => {
  try {
    const { data } = await axios.get(`/api/genres?source=${source}`, {
      timeout,
    });

    dispatch({ type: types.SET_GENRES, genres: data });
  } catch (err) {
    console.log(err);
  }
};

export const resetGenres = (dispatch: any) => {
  dispatch({ type: types.SET_GENRES, genres: [] });
};

export const setSimilars = (dispatch: any, content: ContentInterface[]) => {
  dispatch({ type: types.SET_SIMILARS, similars: content });
};

export const getSimilars = async (
  dispatch: any,
  source: string,
  id: number,
  region: string
) => {
  if (controller) controller.abort();

  controller = new AbortController();
  const { signal } = controller;

  try {
    const { data } = await axios.get(
      `/api/similar?source=${source}&id=${id}&region=${region ?? "AR"}`,
      { timeout, signal }
    );

    dispatch({ type: types.SET_SIMILARS, similars: data });
  } catch (err) {
    console.log(err);
  } finally {
    controller = null;
  }
};

export const getContent = async (
  dispatch: any,
  source: string,
  id: number,
  region: string
) => {
  isFetching(dispatch, true);
  try {
    const { data } = await axios.get(
      `/api/content?source=${source}&id=${id}&region=${region ?? "AR"}`,
      { timeout }
    );

    dispatch({ type: types.SET_CONTENT, content: data });

    return { id: data.id, similars: data.similars };
  } catch (err) {
    console.log(err);

    return "";
  } finally {
    isFetching(dispatch, false);
  }
};

export const setSimilarToContent = (
  dispatch: any,
  similar: ContentInterface
) => {
  dispatch({ type: types.SET_SIMILAR_TO_CONTENT, similar });
};

export const resetValues = (dispatch: any) => {
  dispatch({ type: types.SET_CONTENT, content: null });
  dispatch({ type: types.SET_NO_CONTENT, noContent: null });
  dispatch({ type: types.SET_SIMILARS, similars: null });
};

export const getInitialRecomendations = async (
  dispatch: any,
  source: string,
  provider?: string | number,
  watchRegion?: string,
  genre?: number,
  gte?: number
  // eslint-disable-next-line consistent-return
) => {
  isFetching(dispatch, true);
  try {
    const params = new URLSearchParams({
      source,
      provider: provider?.toString() ?? "0",
      genre: genre?.toString() || "",
      region: watchRegion || "AR",
      gte: gte?.toString() || "6",
    });

    const { data } = await axios.get(`/api/recomendation-initial?${params}`, {
      timeout,
    });

    dispatch({
      type: types.SET_INITIAL_RECOMENDATIONS,
      nextRecomendations: data,
    });

    return data;
  } catch (err: any) {
    console.log(err);
  } finally {
    isFetching(dispatch, false);
  }
};

export const setNextRecomendation = (dispatch: any, recomendation: any) => {
  dispatch({
    type: types.SET_INITIAL_RECOMENDATIONS,
    nextRecomendations: recomendation,
  });
};

export const setTimeframe = (dispatch: any, frame: string) => {
  dispatch({ type: types.SET_TIME_FRAME, selectedTimeframe: frame });
};

export const getNextRecomendationCached = async (
  dispatch: any,
  source: string,
  id: number,
  baseContent: BaseContentInterface,
  watchRegion?: string
) => {
  dispatch({ type: types.FETCHING, value: true });
  resetValues(dispatch);

  try {
    const { data } = await axios.get(
      `/api/recomendation-next?source=${source}&id=${id}&region=${watchRegion}`,
      {
        timeout,
      }
    );

    const providers = baseContent.flatrate;

    const newContent = { ...baseContent, ...data, providers };

    dispatch({ type: types.SET_CONTENT, content: newContent });

    return { id: data.id, similars: data.similars };
  } catch (err: any) {
    console.log(err);

    return "";
  } finally {
    dispatch({ type: types.FETCHING, value: false });
  }
};

export const getRecomendation = async (
  dispatch: any,
  source: string,
  recomended: number[],
  prev: any,
  provider?: any,
  genre?: number | null,
  watchRegion?: string,
  gte?: number,
  saveContent?: boolean
) => {
  try {
    dispatch({ type: types.FETCHING, value: true });
    if (saveContent) {
      resetValues(dispatch);
    }
    const formated = recomended.join("|");
    const params = new URLSearchParams({
      source,
      recomended: formated,
      provider: provider ?? "0",
      genre: genre?.toString() || "",
      region: watchRegion || "AR",
      gte: gte?.toString() || "6",
    });

    const { data } = await axios.get(
      `/api/recomendation?${params.toString()}`,
      { timeout }
    );

    if (saveContent) dispatch({ type: types.SET_CONTENT, content: data });
    dispatch({ type: types.SET_NEXT_RECOMENDATIONS, nextRecomendations: data });
    dispatch({ type: types.ALREADY_RECOMENDED, recomendedContent: data.id });
    const prevContent = { ...data, source };

    dispatch({ type: types.PREV_CONTENT, prevContent });

    return { id: data.id, similars: data.similars };
  } catch (err: any) {
    let noContentObj = {
      message: "No hay contenido para tu búsqueda.",
      type: "error",
    };

    if (err?.response?.status === 404) {
      noContentObj = {
        message: err.response.data?.noResult ?? "",
        type: "warning",
      };
    } else if (prev?.source === source) {
      const prevContent = prev ? { ...prev, source } : null;

      dispatch({ type: types.SET_CONTENT, content: prevContent });
    } else {
      dispatch({ type: types.PREV_CONTENT, prevContent: null });
    }
    dispatch({ type: types.SET_NO_CONTENT, noContent: noContentObj });

    console.log(err);

    return "";
  } finally {
    dispatch({ type: types.FETCHING, value: false });
  }
};

export const setContent = (dispatch: any, content: ContentInterface) => {
  dispatch({ type: types.SET_CONTENT, content });
};

export const setRecomended = (dispatch: any, id: number) => {
  dispatch({ type: types.ALREADY_RECOMENDED, recomendedContent: id });
};

export const setProvider = (dispatch: any, id: number) => {
  dispatch({ type: types.SET_SELECTED_PROVIDER, selectedProvider: id });
};

export const setGte = (dispatch: any, value: number) => {
  dispatch({ type: types.SET_SELECTED_GTE, selectedGte: value });
};

export const setWatchRegion = (dispatch: any, value: string) => {
  dispatch({ type: types.SET_WATCH_REGION, watchRegion: value });
};

export const setSelectedGenre = (dispatch: any, id: number | null) => {
  dispatch({ type: types.SET_SELECTED_GENRE, selectedGenre: id });
};

export const setLastSearch = (dispatch: any, lastSearch: any) => {
  dispatch({ type: types.SET_LAST_SEARCH, lastSearch });
};
