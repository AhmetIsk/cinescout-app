import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { setSearchQuery, fetchMovies } from '../../redux/moviesSlice';
import { TextField, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validateAndSearch = () => {
    // Trim to check if string is empty or just whitespace
    if (!inputValue.trim()) {
      setError('Please enter a search term');
      return;
    }

    // Clear any previous error
    setError(null);

    // Dispatch the search
    dispatch(setSearchQuery(inputValue));
    dispatch(fetchMovies());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      validateAndSearch();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // Clear error when user starts typing
    if (error && newValue.trim()) {
      setError(null);
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex' }}>
        <TextField
          label="Search Movies"
          variant="outlined"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          fullWidth
          required
          error={!!error}
          helperText={error}
          placeholder="Enter movie title..."
          InputProps={{
            sx: {
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              '& .MuiOutlinedInput-notchedOutline': {
                borderRight: 0
              }
            }
          }}
        />
        <IconButton
          onClick={validateAndSearch}
          aria-label="search"
          sx={{
            backgroundColor: 'primary.main',
            borderRadius: '0 4px 4px 0',
            color: 'white',
            height: 56,
            width: 56,
            '&:hover': {
              backgroundColor: 'primary.dark',
            }
          }}
        >
          <SearchIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SearchBar;
