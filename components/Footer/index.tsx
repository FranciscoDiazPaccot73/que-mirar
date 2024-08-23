import Image from "next/image";

import Copyright from "../icons/Copyright";

const Footer = () => (
  <footer className="flex flex-1 items-center justify-center pt-4 pb-10 relative border-t border-purple-50 mb-28 md:mb-0">
    <div className="flex items-center justify-center flex-col text-lg">
      <a
        className="flex flex-grow items-center justify-center text-white"
        href="https://www.themoviedb.org"
        rel="noopener noreferrer"
        target="_blank"
      >
        Powered by
        <span className="ml-1">
          <Image
            alt="THE MOVIE DB"
            height={32}
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
            width={84}
          />
        </span>
      </a>
      <p className="text-center text-slate-500 text-[10px]">
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </p>
    </div>
    <div className="absolute right-4 text-[8px] flex bottom-[10px] text-purple">
      <span className="flex mr-2 items-center">
        <Copyright color="#b197ee" height={12} width={12} />
        <span className="ml-0.5">{`2022-${new Date().getFullYear()}`}</span>
      </span>
      Created by
      <a
        className="ml-1 font-bold"
        href="https://franciscodiazpaccot.dev"
        rel="noreferrer noopener"
        target="_blank"
      >
        Francisco Diaz Paccot
      </a>
    </div>
  </footer>
);

export default Footer;
