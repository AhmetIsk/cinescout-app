import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@redux/store';
import { setFilterYear, fetchMovies } from '@redux/moviesSlice';
import { TextField } from '@mui/material';

const YearFilter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [inputYear, setInputYear] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const year = e.target.value;
    setInputYear(year);

    if (year.length === 4 || year === '') {
      dispatch(setFilterYear(year));
      dispatch(fetchMovies());
    }
  };

  return (
    <TextField
      label="Filter by Year"
      variant="outlined"
      value={inputYear}
      onChange={handleChange}
      fullWidth
      style={{ marginBottom: '1rem' }}
      placeholder="e.g. 2010"
    />
  );
};

export default YearFilter;
