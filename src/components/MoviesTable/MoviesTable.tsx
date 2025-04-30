import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  Typography,
  Box,
} from '@mui/material';
import { formatYear } from '@utils/formatting/stringUtils';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import TvIcon from '@mui/icons-material/Tv';
import { useNavigation } from '@utils/ui/useNavigation';

const MoviesTable = () => {
  const { movies } = useSelector((state: RootState) => state.movies);
  const { navigateToMovie } = useNavigation();

  const handleRowClick = (id: string) => {
    navigateToMovie(id);
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'movie':
        return <LocalMoviesIcon fontSize="small" />;
      case 'series':
        return <TvIcon fontSize="small" />;
      default:
        return null;
    }
  };

  return (
    <Card elevation={2}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.light' }}>
              <TableCell><Typography color="white" fontWeight="bold">Title</Typography></TableCell>
              <TableCell><Typography color="white" fontWeight="bold">Release Year</Typography></TableCell>
              <TableCell><Typography color="white" fontWeight="bold">Type</Typography></TableCell>
              <TableCell><Typography color="white" fontWeight="bold">IMDb ID</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((movie) => (
              <TableRow
                key={movie.imdbID}
                hover
                sx={{
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: 'rgba(229, 9, 20, 0.04)' }
                }}
                onClick={() => handleRowClick(movie.imdbID)}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {movie.Title}
                  </Box>
                </TableCell>
                <TableCell>{formatYear(movie.Year)}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {getTypeIcon(movie.Type)}
                    <Typography sx={{ textTransform: 'capitalize' }}>
                      {movie.Type}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{movie.imdbID}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default MoviesTable;
