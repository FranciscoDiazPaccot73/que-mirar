import { FC, useEffect, useRef, useState, RefObject } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import classNames from 'classnames';

type HeaderProps = {
  handleTab: (tab: number) => Promise<void>;
  linkSelected: number;
};

type MoviesRefType = RefObject<HTMLButtonElement>;
type SeriesRefType = RefObject<HTMLButtonElement>;

const transition = {
  duration: 0.2,
  ease: 'easeInOut',
  type: 'spring',
};

const Header: FC<HeaderProps> = ({ linkSelected = 0, handleTab }) => {
  const [sliderDimensions, setSliderDimensions] = useState({
    width: 0,
    x: 0,
  });
  const moviesRef: MoviesRefType = useRef<HTMLButtonElement>(null);
  const seriesRef: SeriesRefType = useRef<HTMLButtonElement>(null);

  const moviesButtonClasses = classNames('w-full px-4 py-2 bg-transparent text-xl', linkSelected === 0 ? 'text-purple' : 'text-white');
  const seriesButtonClasses = classNames('w-full px-4 py-2 bg-transparent text-xl', linkSelected === 1 ? 'text-purple' : 'text-white');

  useEffect(() => {
    const activeTabNode = linkSelected === 0 ? moviesRef.current : seriesRef.current;

    if (activeTabNode?.offsetWidth) {
      setSliderDimensions({
        width: activeTabNode.offsetWidth,
        x: activeTabNode.offsetLeft,
      });
    }
  }, [linkSelected]);

  return (
    <header className="max-w-[850px] w-full md:flex md:px-4 md:mt-3 md:mx-auto md:mb-4">
      <div className="mt-4 w-full flex items-center justify-center md:mt-0 md:w-36 md:mr-6">
        <Image priority alt="Logo" height={80} src="/logo.webp" width={125} />
      </div>
      <div className="w-full relative md:flex md:justify-start">
        <AnimatePresence>
          <div className="flex w-full md:w-auto">
            <motion.button
              ref={moviesRef}
              className={moviesButtonClasses}
              transition={transition}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTab(0)}
            >
              Peliculas
            </motion.button>
            <motion.button
              ref={seriesRef}
              className={seriesButtonClasses}
              transition={transition}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTab(1)}
            >
              Series
            </motion.button>
          </div>
          <div className="absolute bottom-0 left-0 bg-slate-700 h-[2px] w-full" />
          <motion.div
            className="absolute bottom-0 left-0 bg-purple h-[2px] rounded-t-lg"
            style={{ width: sliderDimensions.width, x: sliderDimensions.x }}
            transition={transition}
          />
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
