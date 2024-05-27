// import { useState, FC } from 'react';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Filter as FilterIcon } from 'lucide-react';

// import Filters from '../Filters';

// type FilterModalType = {
//   onChangeRegion: (newRegion: any) => void;
//   source: string;
// };

// const FilterModal: FC<FilterModalType> = ({ onChangeRegion, source }) => {
//   const [modalOpen, setModalOpen] = useState(false);

//   const resetModal = () => {
//     setModalOpen(false);
//   };

//   const handleDialogChange = (newValue: boolean) => {
//     setModalOpen(newValue)
//   }

//   return (
//     <Dialog open={modalOpen} onOpenChange={handleDialogChange}>
//       <DialogTrigger asChild>
//         <Button
//           className="p-2 hover:bg-purple-12"
//           size="sm"
//           variant="ghost"
//           onClick={() => handleDialogChange(true)}
//         >
//           <FilterIcon className="h-4 w-4 text-purple" />
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="max-h-modal">
//         <DialogHeader>
//           <DialogTitle className='text-3xl'>Filtros</DialogTitle>
//         </DialogHeader>
//         <Filters selectedFilter={resetModal} source={source} onChangeRegion={onChangeRegion} />
//       </DialogContent>
//     </Dialog>
//   )
// };

// export default FilterModal;
