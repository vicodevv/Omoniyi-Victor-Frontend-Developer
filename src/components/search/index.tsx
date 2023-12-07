/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import { TextField, Button, CircularProgress } from '@mui/material';
import ResultGrid from '../grid';
import { useQuery } from 'react-query';
import { styled } from '@mui/system';
import { SpaceXService } from '../../service/spaceXService';

const CustomTextField = styled(TextField)({
  "& .MuiInputLabel-root": {
    color: '#fff',
  },
  "& .MuiFormLabel-root": {
    color: '#fff',
  },
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: '#fff',
  },
  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: '#fff',
  },
  "&.Mui-focused .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: '#fff',
  },
  "& .MuiInputBase-input": {
    color: '#fff',
  },
});

const Search: React.FC = () => {
  const [status, setStatus] = useState('');
  const [originalLaunch, setOriginalLaunch] = useState('');
  const [type, setType] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [searchClicked, setSearchClicked] = useState(false);


  const { data: capsules, isLoading, isError, refetch } = useQuery(
    ['capsules', { status, original_launch: originalLaunch, type }],
    () => SpaceXService.getCapsules({ status, original_launch: originalLaunch, type }),
    {
      enabled: searchClicked,
      initialData: [],
    }
  );

  const handleSearch = () => {
    setSearchClicked(true);
  };

  const handleInputChange = () => {
    setSearchClicked(false);
  };

  const handleItemClick = useCallback((item: any) => {
    setSelectedItem(item);
  }, []);

  // Use Effect to fetch all capsules when the component mounts
  useEffect(() => {
    SpaceXService.getCapsules().then((initialCapsules) => {
      // Set the initial data for the query
      refetch(initialCapsules);
    });
  }, [refetch]);

  return (
    <div className='flex flex-col items-center justify-center mt-20'>
      <h1 className='text-3xl font-bold font-CustomFont sans-serif'>Search Capsules</h1>
      <div className='flex space-x-4 flex-row items-center justify-center m-5 p-3 mr-3'>
        <CustomTextField
          label="Status"
          value={status}
          onChange={(e) => { setStatus(e.target.value); handleInputChange(); }}
          className='mr-5'
        />
        <CustomTextField
          value={originalLaunch}
          type='date'
          onChange={(e) => { setOriginalLaunch(e.target.value); handleInputChange(); }}
          className='mr-5'
        />
        <CustomTextField
          label="Type"
          value={type}
          onChange={(e) => { setType(e.target.value); handleInputChange(); }}
          className='mr-5'
        />
      </div>
      <Button
        color='warning'
        variant='outlined'
        onClick={handleSearch}
        className='mt-8'
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Search'}
      </Button>
      {capsules && (
        <ResultGrid
          data={capsules}
          itemsPerPage={12}
          onItemClick={handleItemClick}
        />
      )}
      {isError && <p>Error loading data</p>}
    </div>
  );
};

export default Search;