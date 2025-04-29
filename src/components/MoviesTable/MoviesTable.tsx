import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
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
  Alert,
  Chip,
} from '@mui/material';
import { formatYear } from '../../utils/formatting/stringUtils';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import TvIcon from '@mui/icons-material/Tv';

const MoviesTable: React.FC = () => {
  const { movies, filterType } = useSelector((state: RootState) => state.movies);
  const navigate = useNavigate();

  const handleRowClick = (id: string) => {
    navigate(`/movie/${id}`);
  };

  // Get appropriate icon for the content type
  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'movie':
        return <LocalMoviesIcon fontSize="small" />;
      case 'series':
        return <TvIcon fontSize="small" />;
      case 'episode':
        return <LiveTvIcon fontSize="small" />;
      default:
        return null;
    }
  };

  // Display a special info message for episode searches
  const isEpisodeSearch = filterType === 'episode';

  return (
    <Card elevation={2}>
      <Box sx={{ p: 2, borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
        <Typography variant="h6" color="secondary.main">
          Results ({movies.length})
        </Typography>
      </Box>

      {isEpisodeSearch && (
        <Alert
          severity="info"
          sx={{ mx: 2, mt: 1, mb: 0 }}
          variant="outlined"
        >
          Showing series results. To find specific episodes, try searching for a series title like "Game of Thrones".
          View series details to see episodes.
        </Alert>
      )}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'secondary.light' }}>
              <TableCell><Typography fontWeight="bold">Title</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Release Year</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Type</Typography></TableCell>
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
                    {isEpisodeSearch && (
                      <Chip
                        size="small"
                        label="Series"
                        color="primary"
                        variant="outlined"
                        sx={{ ml: 1 }}
                      />
                    )}
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default MoviesTable;
