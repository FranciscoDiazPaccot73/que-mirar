import { FC, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';
import classNames from 'classnames';
import dynamic from 'next/dynamic';

const Mobile = dynamic(() => import('./Mobile'));
const Desktop = dynamic(() => import('./Desktop'));

type HeaderProps = {
  handleTab: (tab: number) => Promise<void>,
  linkSelected?: number,
  device?: string,
}

const Header: FC<HeaderProps> = ({ device, linkSelected = 0, handleTab }) => {
  const [sliderDimensions, setSliderDimensions] = useState({
    width: 0,
    x: 0,
  });
  const moviesRef = useRef(null);
  const seriesRef = useRef(null);

  console.log(linkSelected, "LINK SELECTED")

  useEffect(() => {
    const activeTabNode = linkSelected === 0 ? moviesRef.current : seriesRef.current;
    if (activeTabNode?.offsetWidth) {
      setSliderDimensions({
        width: activeTabNode.offsetWidth,
        x: activeTabNode.offsetLeft,
      });
    }
  }, [linkSelected]);

  const transition = {
    duration: 0.2,
    ease: 'easeInOut',
    type: "spring",
  };

  return (
    <header>
      <div className='mt-4 w-full flex items-center justify-center' >
        <Image src="/logo.webp" priority height={80} width={125} alt="Logo" />
      </div>
      <div className="w-full">
        <div className='w-full relative'>
          <AnimatePresence>
            <div className="flex w-full">
              <motion.button
                className={classNames(
                  'w-full px-4 py-2 bg-transparent',
                  linkSelected === 0
                    ? 'text-purple'
                    : 'text-white'
                )}
                onClick={() => handleTab(0)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={transition}
                ref={moviesRef}
              >
                Peliculas
              </motion.button>
              <motion.button
                className={classNames(
                  'w-full px-4 py-2 bg-transparent',
                  linkSelected === 1
                  ? 'text-purple'
                  : 'text-white'
                )}
                onClick={() => handleTab(1)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={transition}
                ref={seriesRef}
              >
                Series
              </motion.button>
            </div>
            <motion.div
              className="absolute bottom-0 left-0 bg-blue-500 h-[2px] rounded-t-lg"
              style={{ width: sliderDimensions.width, x: sliderDimensions.x }}
              transition={transition}
            />
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
  /*
  <Tabs defaultIndex={linkSelected} colorScheme="purple" size="lg" isFitted onChange={a => handleTab(a)}>
    <TabList>
      <Tab isSelected={linkSelected === 0}>Peliculas</Tab>
      <Tab isSelected={linkSelected === 1}>Series</Tab>
    </TabList>
  </Tabs>*/
}
//{device === 'mobile' ? <Mobile {...props} /> : null}
//{device === 'desktop' ? <Desktop {...props} /> : null}

export default Header;
