import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@redux/store';
import { setCurrentPage, fetchMovies } from '@redux/moviesSlice';
import { Pagination as MUIPagination, Box } from '@mui/material';

const Pagination = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentPage, totalResults } = useSelector((state: RootState) => state.movies);

  const resultsPerPage = 10;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    if (page !== currentPage) {
      dispatch(setCurrentPage(page));
      dispatch(fetchMovies());

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      my: 3,
      '& .MuiPagination-ul': {
        justifyContent: 'center'
      }
    }}>
      <MUIPagination
        count={totalPages > 100 ? 100 : totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        size="large"
        showFirstButton
        showLastButton
      />
    </Box>
  );
};

export default Pagination;
