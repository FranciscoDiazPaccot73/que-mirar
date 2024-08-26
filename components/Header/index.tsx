"use client";

import { useContext } from "react";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { PageContext } from "@/context";
import { resetGenres, resetValues } from "@/context/actions";
import { Monitor, Film } from "lucide-react";

const transition = {
  duration: 0.2,
  ease: "easeInOut",
  type: "spring",
};

const Header = () => {
  const { dispatch } = useContext(PageContext);
  const { pathname } = useRouter();

  const isMovies = pathname?.includes("movies");
  const moviesButtonClasses = classNames(
    "w-full bg-transparent text-xl",
    isMovies ? "text-purple text-purple border-b-2 border-purple" : "text-white"
  );
  const seriesButtonClasses = classNames(
    "w-full bg-transparent text-xl",
    !isMovies ? "text-purple border-b-2 border-purple" : "text-white"
  );

  const LINKS = [
    {
      name: "Series",
      link: "/",
      icon: Monitor,
      color: !isMovies ? "#B794F4" : "#ffffff",
      bgColor: !isMovies ? "#B794F412" : "",
    },
    {
      name: "Peliculas",
      link: "/movies",
      icon: Film,
      color: isMovies ? "#B794F4" : "#ffffff",
      bgColor: isMovies ? "#B794F412" : "",
    },
  ];

  // const headerAfterClass = `after:h-6 after:bg-gradient-to-b after:from-[#1a202c] after:via-[#1a202c] after:w-full after:absolute after:left-0 after:-bottom-3 after:content-["''"] after:z-20`;

  const handleClick = () => {
    resetValues(dispatch);
    resetGenres(dispatch);
  };

  return (
    <header className="max-w-[1000px] w-full flex md:px-4 md:pt-3 md:pb-4 z-10 md:fixed left-0 right-0 top-0 bg-main-bg mx-auto">
      <div className="flex items-center justify-center mt-6 md:mt-0 w-36 mx-auto md:mx-0 md:mr-6">
        <Image priority alt="Logo" height={80} src="/logo.webp" width={125} />
      </div>
      <div className="hidden w-full relative md:flex justify-start">
        <AnimatePresence>
          <div className="flex w-full md:w-auto">
            <motion.button
              className={moviesButtonClasses}
              transition={transition}
              whileHover={!isMovies ? { scale: 1.05 } : {}}
              whileTap={!isMovies ? { scale: 0.95 } : {}}
              onClick={handleClick}
            >
              <Link className="px-4 py-2" href="/movies">
                Peliculas
              </Link>
            </motion.button>
            <motion.button
              className={seriesButtonClasses}
              transition={transition}
              whileHover={isMovies ? { scale: 1.05 } : {}}
              whileTap={isMovies ? { scale: 0.95 } : {}}
              onClick={handleClick}
            >
              <Link className="h-full px-4 py-2" href="/">
                Series
              </Link>
            </motion.button>
          </div>
          <div className="absolute bottom-0 left-0 bg-slate-700 h-[2px] w-full -z-10" />
        </AnimatePresence>
      </div>
      <div className="md:hidden z-20 fle justify-center fixed w-full bottom-0 bg-main-bg border border-t border-purple-12">
        <div className="flex w-full flex-1">
          {LINKS.map((link) => {
            return (
              <a
                key={link.name}
                aria-label={`${link.name} page`}
                className="items-center flex justify-center relative w-full py-3"
                href={link.link}
                style={{ backgroundColor: link.bgColor }}
              >
                <div className="items-center h-12 flex font-semibold justify-center w-full">
                  <Link
                    className="px-4 py-2 flex flex-col items-center text-xs"
                    href={link.link}
                    style={{ color: link.color }}
                  >
                    <link.icon className="w-8 h-8" />
                    {link.name}
                  </Link>
                  <span className="hidden">{link.name}</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Header;
