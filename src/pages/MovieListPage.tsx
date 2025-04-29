import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchMovies } from '../redux/moviesSlice';
import SearchBar from '../components/SearchBar/SearchBar';
import TypeFilter from '../components/TypeFilter/TypeFilter';
import YearFilter from '../components/YearFilter/YearFilter';
import MoviesTable from '../components/MoviesTable/MoviesTable';
import Pagination from '../components/Pagination/Pagination';
import { Box, CircularProgress, Container } from '@mui/material';
import { ErrorDisplay } from '../utils/ui/errorDisplay';

const MovieListPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, status, error } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMovies());
    }
  }, [dispatch, status]);

  const renderContent = () => {
    if (status === 'loading') {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress color="primary" />
        </Box>
      );
    }

    if (status === 'failed') {
      return (
        <Box sx={{ py: 4 }}>
          <ErrorDisplay
            title="Search Error"
            message={error}
            suggestion="Try adjusting your search criteria or try again later."
            type="error"
          />
        </Box>
      );
    }

    if (movies.length === 0) {
      return (
        <Box sx={{ py: 4 }}>
          <ErrorDisplay
            title="No Movies Found"
            message="We couldn't find any movies matching your search criteria."
            suggestion="Try changing your search terms or removing some filters."
            type="warning"
          />
        </Box>
      );
    }

    return (
      <>
        <MoviesTable />
        <Pagination />
      </>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <SearchBar />
        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
          <Box sx={{ flex: 1 }}>
            <TypeFilter />
          </Box>
          <Box sx={{ flex: 1 }}>
            <YearFilter />
          </Box>
        </Box>
      </Box>

      {renderContent()}
    </Container>
  );
};

export default MovieListPage;
