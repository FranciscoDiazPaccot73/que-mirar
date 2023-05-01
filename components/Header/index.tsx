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

  return (
    <header className="max-w-[850px] w-full md:flex md:px-4 md:mt-3 md:mx-auto md:mb-4">
      <div className="mt-4 w-full flex items-center justify-center md:mt-0 md:w-36 md:mr-6">
        <Image priority alt="Logo" height={80} src="/logo.webp" width={125} />
      </div>
      <div className="w-full relative md:flex md:justify-start">
        <AnimatePresence>
          <div className="flex w-full md:w-auto">
            <motion.button
              className={moviesButtonClasses}
              transition={transition}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTab(0)}
            >
              Peliculas
            </motion.button>
            <motion.button
              className={seriesButtonClasses}
              transition={transition}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
