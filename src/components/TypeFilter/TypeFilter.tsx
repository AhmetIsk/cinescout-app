import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { setFilterType, fetchMovies } from '../../redux/moviesSlice';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

const TypeFilter: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filterType } = useSelector((state: RootState) => state.movies);

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setFilterType(event.target.value as 'movie' | 'series' | 'episode' | ''));
    dispatch(fetchMovies());
  };

  return (df
    <FormControl variant="outlined" fullWidth style={{ marginBottom: '1rem' }}>
      <InputLabel>Type</InputLabel>
      <Select
        value={filterType}
        onChange={handleChange}
        label="Type"
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="movie">Movie</MenuItem>
        <MenuItem value="series">Series</MenuItem>
        <MenuItem value="episode">Episode</MenuItem>
      </Select>
    </FormControl>
  );
};

export default TypeFilter;
