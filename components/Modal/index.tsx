/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useContext, PropsWithChildren, FC, useEffect } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { PageContext } from '@/context';
import { setIsModalOpen as setIsOpen } from '@/context/actions';

interface ModalProps {
  resetModal: () => void;
  isOpen: boolean;
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({ children, resetModal, isOpen }) => {
  const { dispatch } = useContext(PageContext);

  useEffect(() => {
    const inputElement = document.getElementById('search-input');
    const body = document.getElementById('body');

    if (isOpen) {
      inputElement?.focus();

      body?.classList.add('scroll-disabled');
    } else {
      body?.classList.remove('scroll-disabled');
    }
  }, [isOpen]);

  const handleReset = () => {
    setIsOpen(dispatch, false);

    resetModal();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="z-20 fixed h-modal w-full flex justify-center top-0 left-0">
          <motion.div
            animate={{
              y: 0,
              opacity: 1,
            }}
            className="absolute t-0 z-10 p-7 h-full w-full max-w-xs rounded my-7 shadow-md bg-modal md:max-w-4xl"
            exit={{
              y: -50,
              opacity: 0,
            }}
            initial={{ y: 50, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
          >
            <div className="absolute bottom-0 left-0 z-20 bg-gradient-to-t from-modal via-modal h-14 w-full" />
            <button
              aria-label="Close modal"
              className="absolute top-0 right-0 -mt-4 -mr-4 bg-light-modal text-white border border-slate-600 bg-modal h-8 w-8 block mb-2 rounded-full"
              onClick={handleReset}
            >
              &times;
            </button>
            {children}
          </motion.div>
          <motion.div
            animate={{
              opacity: 1,
            }}
            className="bg-black-90 fixed h-full w-full flex items-center justify-center top-0 left-0"
            exit={{
              opacity: 0,
            }}
            initial={{ opacity: 0 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.2 }}
            onClick={handleReset}
          />
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
