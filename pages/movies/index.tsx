/* eslint-disable prettier/prettier */
import type { NextPage } from "next";
import { useContext, useEffect, useState } from "react";

import ContentTitle from "@components/ContentTitle";
import Layout from "@components/Layout";

import { updateParams } from "@utils/index";

import {
  resetValues,
  setContent,
  setLastSearch,
  setRecomended,
  setSimilars,
  setWatchRegion,
} from "@store/actions";
import { PageContext } from "@store/index";
import { AnimatePresence, motion } from "framer-motion";
import { useLocalStorage } from "@/hooks";
import { DynamicHead } from "@/components/DynamicHead";
import { getdata } from "../api";

import { ContentInterface } from "../types";
import { getContentApi } from "../api/content";

type MoviesTrendsProps = {
  region: string;
  source: string;
  initialTab: number;
  initialResult: ContentInterface;
  initialRest: ContentInterface[];
};

const MoviesTrends: NextPage<MoviesTrendsProps> = ({
  region,
  initialResult,
  initialRest,
}) => {
  const {
    dispatch,
    state: { content, isModalOpen, watchRegion = "AR" },
  } = useContext(PageContext);
  const { storage } = useLocalStorage();
  const [source, setSource] = useState("movie");

  useEffect(() => {
    if (region) {
      setWatchRegion(dispatch, region);
    }
  }, [region]);

  useEffect(() => {
    setContent(dispatch, initialResult);
    setRecomended(dispatch, initialResult.id);
    setSimilars(dispatch, initialRest);

    const params: any = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop: any) => searchParams.get(prop),
    });

    if (params.source || params.region || params.id) {
      setSource(params.source || "tv");
      setWatchRegion(dispatch, params.region || "AR");
    }

    updateParams({
      newSource: source,
      newWatchRegion: watchRegion,
      id: initialResult.id.toString(),
    });
    const lastSearch = storage.get("qpv-lastSearch");

    if (lastSearch) {
      setLastSearch(dispatch, lastSearch);
    }
  }, []);

  const handleRegion = async (newRegion: string) => {
    resetValues(dispatch);
    window.location.assign(`/movies/recomendations?region=${newRegion}`);
  };

  return (
    <>
      <DynamicHead
        image={content?.poster_path || content?.backdrop_path}
        title={content?.title}
      />
      <main className="relative flex flex-1 flex-col mx-auto max-w-[565px] min-h-main pt-6 pb-8 md:max-w-[1000px] md:min-h-main-desktop md:px-8 md:pt-4 md:pb-12 md:mt-28">
        <ContentTitle
          search="trends"
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
            <Layout search="trends" source={source} />
          </motion.div>
        </AnimatePresence>
      </main>
    </>
  );
};

export async function getServerSideProps(context: {
  query: { id?: string; source?: string; region?: string };
}) {
  const promises = [];

  promises.push(await getdata({ source: "movie" }));
  const { id, source = "movie", region = "AR" } = context.query;
  let result;

  if (id) {
    promises.push(await getContentApi({ source, id, region }));
  }
  const [data, content] = await Promise.allSettled(promises);

  if (content?.status === "fulfilled") {
    result = content.value;
  } else {
    result = data.status === "fulfilled" ? data.value.result : [];
  }

  const rest = data.status === "fulfilled" ? data.value.rest : [];

  return {
    props: {
      initialResult: JSON.parse(JSON.stringify(result)),
      initialRest: JSON.parse(JSON.stringify(rest)),
    },
  };
}

export default MoviesTrends;
