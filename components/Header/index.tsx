import { useContext } from 'react';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { PageContext } from '@/context';
import { resetValues } from '@/context/actions';

const transition = {
  duration: 0.2,
  ease: 'easeInOut',
  type: 'spring',
};

const Header = () => {
  const { dispatch } = useContext(PageContext);
  const { pathname } = useRouter();

  const isMovies = pathname?.includes('movies');
  const moviesButtonClasses = classNames(
    'w-full bg-transparent text-xl',
    isMovies ? 'text-purple text-purple border-b-2 border-purple' : 'text-white',
  );
  const seriesButtonClasses = classNames(
    'w-full bg-transparent text-xl',
    !isMovies ? 'text-purple border-b-2 border-purple' : 'text-white',
  );

  // const headerAfterClass = `after:h-6 after:bg-gradient-to-b after:from-[#1a202c] after:via-[#1a202c] after:w-full after:absolute after:left-0 after:-bottom-3 after:content-["''"] after:z-20`;

  const handleClick = () => resetValues(dispatch);

  return (
    <header className="max-w-[1000px] w-full flex px-4 pt-3 pb-4 z-10 fixed left-0 right-0 top-0 bg-transparent mx-auto">
      <div className="flex items-center justify-center mt-0 w-36 mr-6">
        <Image priority alt="Logo" height={80} src="/logo.webp" width={125} />
      </div>
      <div className="w-full relative flex justify-start">
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
    </header>
  );
};

export default Header;
