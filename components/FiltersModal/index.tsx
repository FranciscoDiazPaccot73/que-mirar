import { useContext, useState, FC } from 'react';
import { PageContext } from '@/context';
import Button from '../Button';
import Modal from '../Modal';

import FilterIcon from '../icons/Filter';

import { availableRegions } from '../../utils';
import Filters from '../Filters';

type FilterModalType = {
  onChangeRegion: (newRegion: any) => void;
  source: string;
};

const FilterModal: FC<FilterModalType> = ({ onChangeRegion, source }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const {
    state: { watchRegion = 'AR' },
  } = useContext(PageContext);

  const resetModal = () => {
    setModalOpen(false);
  };

  const handleChangeRegion = (e: { target: { value: string } }) => {
    const { value } = e.target;

    onChangeRegion(value);
    resetModal();
  };

  return (
    <div>
      <Button
        customClass="w-full"
        icon={<FilterIcon color="#b197ee" height={20} width={20} />}
        variant="transparent"
        onClick={() => setModalOpen(true)}
      />
      <Modal isOpen={modalOpen} resetModal={resetModal}>
        <>
          <p className="text-3xl mb-4">Filtros</p>
          <div className="relative overflow-hidden h-auto w-full">
            <div className="relative w-20 mt-4">
              <p className="text-[10px] absolute -top-4">Región</p>
              <select
                className="w-full cursor-pointer bg-transparent text-white outline-2 outline-transparent outline relative appearance-none h-8 border border-white border-opacity-30 px-3 rounded-sm after:url"
                value={watchRegion}
                onChange={handleChangeRegion}
              >
                {availableRegions.map((region: string) => (
                  <option key={region} className="text-white bg-secondary" value={region}>
                    {region}
                  </option>
                ))}
              </select>
              <img alt="Down chevron" className="float-right -mt-6 mr-2" src="/chevron-down.svg" />
            </div>
          </div>
          <Filters selectedFilter={resetModal} source={source} />
        </>
      </Modal>
    </div>
  );
};

export default FilterModal;
