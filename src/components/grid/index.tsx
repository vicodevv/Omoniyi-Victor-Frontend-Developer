import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Pagination, DialogTitle } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const [open, setOpen] = React.useState(false);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

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
      <Grid container spacing={2} className='p-10'>
        {currentItems.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
            <Card onClick={() => handleClickOpen(item)} style={{ cursor: 'pointer' }} className='h-600 flex flex-col items-start justify-between m-1 p-1 h-17rem w-full max-w-35rem rounded-4 bg-white shadow-md transition-all duration-300 ease-in-out cursor-pointer'>
              <CardContent>
                <Typography variant="h6" component="div" className='flex justify-center items-center align-middle self-center py-12'>
                  {item.capsule_serial} <ArrowOutwardIcon className='ml-2' />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination Controls */}
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(event, page) => handlePageChange(page)}
        className='mb-9 flex justify-center items-center'
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
