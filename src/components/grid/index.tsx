import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Pagination, Modal, Box } from '@mui/material';

interface ResultGridProps {
  data: any[];
  itemsPerPage: number;
  onItemClick: (item: any) => void;
}

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

  const handleCardClick = (item: any) => {
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
            <Card onClick={() => handleCardClick(item)} style={{ cursor: 'pointer' }} className='h-[12.75rem]'>
              <CardContent>
                <Typography variant="h6" component="div">
                  CAPSULE: {item.capsule_serial}
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
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box>
            <Typography variant="h5" component="div" className='mb-2'>
              Item Details
            </Typography>
            <table>
              <tbody>
                <tr>
                  <td>ID:</td>
                  <td>{selectedItem.id}</td>
                </tr>
                <tr>
                  <td>Serial:</td>
                  <td>{selectedItem.capsule_serial}</td>
                </tr>
                <tr>
                  <td>Status:</td>
                  <td>{selectedItem.status}</td>
                </tr>
                <tr>
                  <td>Type:</td>
                  <td>{selectedItem.type}</td>
                </tr>
                <tr>
                  <td>Reuse Count:</td>
                  <td>{selectedItem.reuse_count}</td>
                </tr>
              </tbody>
            </table>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default ResultGrid;
