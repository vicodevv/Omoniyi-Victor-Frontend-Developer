/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useCallback } from 'react';
import { TextField, Button, CircularProgress } from '@mui/material';
import { SpaceXService } from '../../service/spaceXService';
import ResultGrid from '../grid';

const Search: React.FC = () => {
  const [status, setStatus] = useState('');
  const [originalLaunch, setOriginalLaunch] = useState('');
  const [type, setType] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const { data: capsules, isError } = SpaceXService.useGetCapsules({
    status: status || undefined,
    original_launch: originalLaunch || undefined,
    type: type || undefined,
  });

  const handleSearch = async () => {
    setIsLoading(true); // Set loading to true when starting the search
      try {
        await SpaceXService.getCapsules({
          status: status || undefined,
          original_launch: originalLaunch || undefined,
          type: type || undefined,
        });
      } catch (error) {
        console.log(error);
      }
  };

  const handleItemClick = useCallback((item: any) => {
    setSelectedItem(item);
    setModalOpen(true);
  }, []);

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className='flex flex-col items-center justify-center mt-20'>
      <h1 className='text-3xl font-bold font-CustomFont sans-serif'>Search Capsules</h1>
      <div className='flex space-x-4 flex-row items-center justify-center mt-5 p-3 mr-3'>
        <TextField
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className='mr-5'
        />
        <TextField
          value={originalLaunch}
          type='date'
          onChange={(e) => setOriginalLaunch(e.target.value)}
        />
        <TextField
          label="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        className='mt-5 mb-5'
      >
        Search
      </Button>

      {isLoading && <CircularProgress className='mt-3' />}

      {isError && <p>Error loading data</p>}

      {capsules && (
        <ResultGrid
          data={capsules}
          itemsPerPage={12}
          onItemClick={handleItemClick}
        />
      )}
    </div>
  );
};

export default Search;
