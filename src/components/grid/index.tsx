import React, { useState } from 'react';
import { Pagination, Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

interface ResultGridProps {
  data: any[];
  itemsPerPage: number;
  onItemClick: (item: any) => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ResultGrid: React.FC<ResultGridProps> = ({ data, itemsPerPage, onItemClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [open, setOpen] = useState(false);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.max(Math.ceil(data.length / itemsPerPage));

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleClickOpen = (item: any) => {
    setSelectedItem(item);
    setOpen(true);
    onItemClick(item);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  return (
    <div>
      <div className='grid grid-cols-4 gap-y-5 gap-x-10 mt-10 items-center max-lg:grid-cols-2 px-5 max-sm:grid-cols-1'>
        {currentItems.map((item) => (
          <div key={item.id}>
            <div onClick={() => handleClickOpen(item)} style={{ cursor: 'pointer', backgroundColor: 'black' }} className='h-[12.75rem] bg-black border-[0.5px] mb-9 border-white border-solid w-[250px] flex justify-center items-center'>
              <div>
                <p className='text-white'>
                  {item.capsule_serial} <ArrowOutwardIcon className='ml-2' />
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(event, page) => handlePageChange(page)}
        className='mb-9 flex justify-center items-center bg-white'
      />

      {/* Modal for displaying item details */}
      {selectedItem && (
        <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        className='flex justify-center items-center'
        >
          <DialogTitle className='text-center'>Item Details</DialogTitle>
          <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div className='flex flex-col justify-center items-center'>
              <div className='flex flex-row justify-center items-center'>
                <p className='font-bold'>Capsule Serial: </p>
                <p className='ml-2'>{selectedItem.capsule_serial}</p>
              </div>
              <div className='flex flex-row justify-center items-center'>
                <p className='font-bold'>Capsule ID: </p>
                <p className='ml-2'>{selectedItem.capsule_id}</p>
              </div>
              <div className='flex flex-row justify-center items-center'>
                <p className='font-bold'>Status: </p>
                <p className='ml-2'>{selectedItem.status}</p>
              </div>
              <div className='flex flex-row justify-center items-center'>
                <p className='font-bold'>Original Launch: </p>
                <p className='ml-2'>{selectedItem.original_launch}</p>
              </div>
              <div className='flex flex-row justify-center items-center'>
                <p className='font-bold'>Type: </p>
                <p className='ml-2'>{selectedItem.type}</p>
              </div>
            </div>
          </DialogContentText>
          </DialogContent>
          </Dialog>
      )}
    </div>
  );
};

export default ResultGrid;
