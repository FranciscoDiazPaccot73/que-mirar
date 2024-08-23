/* eslint-disable prettier/prettier */
import type { NextPage } from "next";
import { useContext, useEffect, useRef, useState } from "react";

import ContentTitle from "@components/ContentTitle";
import Layout from "@components/Layout";

import { updateParams } from "@utils/index";

import {
  getNextRecomendationCached,
  getRecomendation,
  getSimilars,
  resetValues,
  setContent,
  setRecomended,
  setWatchRegion,
  getInitialRecomendations,
  setNextRecomendation,
  setLastSearch,
} from "@store/actions";
import { PageContext } from "@store/index";
import { AnimatePresence, motion } from "framer-motion";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { DynamicHead } from "@/components/DynamicHead";
import { ContentInterface } from "./types";
import { getContentApi } from "./api/content";

type TvRecoProps = {
  region: string;
  source: string;
  initialTab: number;
  initialResult: ContentInterface;
};

const TvReco: NextPage<TvRecoProps> = ({ initialResult }) => {
  const {
    dispatch,
    state: {
      content,
      isModalOpen,
      watchRegion = "AR",
      selectedGenre,
      selectedProvider = 0,
      recomendedContent = [],
      prevContent,
      nextRecomendations,
    },
  } = useContext(PageContext);
  const { storage } = useLocalStorage();
  const [source, setSource] = useState("tv");
  const alreadyFetch = useRef(false);

  const getInitialData = async () => {
    const recomendationsData = await getInitialRecomendations(
      dispatch,
      "tv",
      0,
      "AR"
    );
    const [first, second] = recomendationsData;

    const firstResult = initialResult ?? first;

    setContent(dispatch, firstResult);
    setRecomended(dispatch, firstResult.id);
    getSimilars(dispatch, source, firstResult.id, watchRegion);
    setNextRecomendation(dispatch, [second]);

    const params: any = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop: any) => searchParams.get(prop),
    });

    if (params.source || params.region || params.id) {
      setSource(params.source || "tv");
      setWatchRegion(dispatch, params.region || "AR");
    }

    updateParams({
      newSource: params.source || source,
      newWatchRegion: params.region || watchRegion,
      id: params.id || initialResult?.id.toString(),
    });
  };

  useEffect(() => {
    if (!alreadyFetch.current) {
      alreadyFetch.current = true;
      getInitialData();
    }

    const lastSearch = storage.get("qpv-lastSearch");

    if (lastSearch) {
      setLastSearch(dispatch, lastSearch);
    }
  }, []);

  const nextRecomendation = async () => {
    window.scrollTo(0, 0);
    resetValues(dispatch);
    const [next] = nextRecomendations;
    const newId = await getNextRecomendationCached(
      dispatch,
      source,
      next.id,
      next,
      watchRegion
    );

    updateParams({ newSource: source, newWatchRegion: watchRegion, id: newId });
    getSimilars(dispatch, source, newId, watchRegion);
    getRecomendation(
      dispatch,
      source,
      recomendedContent,
      prevContent,
      selectedProvider,
      selectedGenre,
      watchRegion
    );
  };

  const handleRegion = async (newRegion: string) => {
    resetValues(dispatch);
    setWatchRegion(dispatch, newRegion);
    const newId = await getRecomendation(
      dispatch,
      source,
      recomendedContent,
      prevContent,
      selectedProvider,
      selectedGenre,
      newRegion,
      true
    );

    getSimilars(dispatch, source, content.id, watchRegion);
    updateParams({ newSource: source, newWatchRegion: newRegion, id: newId });
  };

  return (
    <>
      <DynamicHead title={content?.title} />
      <main className="relative flex flex-1 flex-col mx-auto max-w-[565px] min-h-main pt-6 pb-8 md:max-w-[1000px] md:min-h-main-desktop md:px-8 md:pt-4 md:pb-12 md:mt-28">
        <ContentTitle
          search="recomendations"
          source={source}
          watchRegion={watchRegion ?? "AR"}
          onChangeRegion={handleRegion}
        />
        <AnimatePresence>
          <motion.div
            animate={
              isModalOpen
                ? { scale: 0.95, opacity: 0.5 }
                : { scale: 1, opacity: 1 }
            }
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          >
            <Layout
              nextRecomendation={nextRecomendation}
              search="recomendations"
              source={source}
            />
          </motion.div>
        </AnimatePresence>
      </main>
    </>
  );
};

export async function getServerSideProps(context: {
  query: { id?: string; source?: string; region?: string };
}) {
  const { id, source = "tv", region = "AR" } = context.query;
  let result;

  if (id) {
    result = await getContentApi({ source, id, region });
  }

  return {
    props: {
      initialResult: result ? JSON.parse(JSON.stringify(result)) : null,
    },
  };
}

export default TvReco;
