import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { FC } from 'react';

type HeaderProps = {
  handleTab: (tab: number) => Promise<void>;
  linkSelected: number;
};

const transition = {
  duration: 0.2,
  ease: 'easeInOut',
  type: 'spring',
};

const Header: FC<HeaderProps> = ({ linkSelected = 0, handleTab }) => {
  const moviesButtonClasses = classNames(
    'w-full px-4 py-2 bg-transparent text-xl',
    linkSelected === 0 ? 'text-purple text-purple border-b-2 border-purple' : 'text-white',
  );
  const seriesButtonClasses = classNames(
    'w-full px-4 py-2 bg-transparent text-xl',
    linkSelected === 1 ? 'text-purple border-b-2 border-purple' : 'text-white',
  );

  const headerAfterClass = `after:h-6 after:bg-gradient-to-b after:from-[#1a202c] after:via-[#1a202c] after:w-full after:absolute after:left-0 after:-bottom-3 after:content-["''"] after:z-20`;

  return (
    <header className={`max-w-[850px] w-full flex px-4 pt-3 pb-4 z-10 fixed left-0 right-0 top-0 bg-main-bg mx-auto ${headerAfterClass}`}>
      <div className="flex items-center justify-center mt-0 w-36 mr-6">
        <Image priority alt="Logo" height={80} src="/logo.webp" width={125} />
      </div>
      <div className="w-full relative flex justify-start">
        <AnimatePresence>
          <div className="flex w-full md:w-auto">
            <motion.button
              className={moviesButtonClasses}
              transition={transition}
              whileHover={linkSelected !== 0 ? { scale: 1.05 } : {}}
              whileTap={linkSelected !== 0 ? { scale: 0.95 } : {}}
              onClick={() => handleTab(0)}
            >
              Peliculas
            </motion.button>
            <motion.button
              className={seriesButtonClasses}
              transition={transition}
              whileHover={linkSelected !== 1 ? { scale: 1.05 } : {}}
              whileTap={linkSelected !== 1 ? { scale: 0.95 } : {}}
              onClick={() => handleTab(1)}
            >
              Series
            </motion.button>
          </div>
          <div className="absolute bottom-0 left-0 bg-slate-700 h-[2px] w-full -z-10" />
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
