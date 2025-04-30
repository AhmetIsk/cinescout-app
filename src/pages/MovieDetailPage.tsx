import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@redux/store';
import { fetchMovieDetail, clearMovieDetail } from '@redux/movieDetailSlice';
import { resetMoviesState } from '@redux/moviesSlice';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  Breadcrumbs,
  Link as MuiLink,
  Container,
  Stack,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MovieDetailSkeleton from '@components/Skeleton/MovieDetailSkeleton';
import SeasonAccordion from '@components/SeasonAccordion';
import { ErrorDisplay } from '@utils/ui/errorDisplay';
import { formatRuntime } from '@utils/formatting/stringUtils';

const MovieDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { selectedMovie, status, error } = useSelector((state: RootState) => state.movieDetail);

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieDetail(id));
    }

    return () => {
      dispatch(clearMovieDetail());
    };
  }, [dispatch, id]);

  const handleBackClick = () => {
    dispatch(resetMoviesState());
    navigate('/');
  };

  const renderHeader = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
      <IconButton
        onClick={handleBackClick}
        size="small"
        sx={{ mr: 1, color: 'secondary.main' }}
        aria-label="back to search"
      >
        <ArrowBackIcon />
      </IconButton>
      <Breadcrumbs aria-label="breadcrumb">
        <MuiLink
          component="button"
          underline="hover"
          color="inherit"
          onClick={handleBackClick}
          sx={{ color: 'secondary.main' }}
        >
          Home
        </MuiLink>
        <Typography color="text.primary">
          {selectedMovie?.Title || 'Movie Details'}
        </Typography>
      </Breadcrumbs>
    </Box>
  );

  if (status === 'loading') {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton
            onClick={() => navigate('/')}
            size="small"
            sx={{ mr: 1, color: 'secondary.main' }}
            aria-label="back to search"
          >
            <ArrowBackIcon />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <MuiLink
              component="button"
              underline="hover"
              color="inherit"
              onClick={() => navigate('/')}
              sx={{ color: 'secondary.main' }}
            >
              Home
            </MuiLink>
            <Typography color="primary">Loading details...</Typography>
          </Breadcrumbs>
        </Box>
        <MovieDetailSkeleton />
      </Container>
    );
  }

  if (status === 'failed') {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton
            onClick={() => navigate('/')}
            size="small"
            sx={{ mr: 1, color: 'secondary.main' }}
            aria-label="back to search"
          >
            <ArrowBackIcon />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <MuiLink
              component="button"
              underline="hover"
              color="inherit"
              onClick={() => navigate('/')}
              sx={{ color: 'secondary.main' }}
            >
              Home
            </MuiLink>
            <Typography color="error">Error</Typography>
          </Breadcrumbs>
        </Box>

        <ErrorDisplay
          title="Unable to Load Movie Details"
          message={error}
          suggestion="Try going back to the home page and selecting a different movie."
          showButton={true}
          buttonText="Return to Search"
          onButtonClick={() => navigate('/')}
          type="error"
        />
      </Container>
    );
  }

  if (!selectedMovie) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton
            onClick={() => navigate('/')}
            size="small"
            sx={{ mr: 1, color: 'secondary.main' }}
            aria-label="back to search"
          >
            <ArrowBackIcon />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <MuiLink
              component="button"
              underline="hover"
              color="inherit"
              onClick={() => navigate('/')}
              sx={{ color: 'secondary.main' }}
            >
              Home
            </MuiLink>
            <Typography color="warning.dark">Not Found</Typography>
          </Breadcrumbs>
        </Box>

        <ErrorDisplay
          title="Movie Not Found"
          message="We couldn't find the movie you're looking for. It may have been removed or the ID is incorrect."
          suggestion="Please return to the home page and try searching for another movie."
          showButton={true}
          buttonText="Return to Search"
          onButtonClick={() => navigate('/')}
          type="warning"
        />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {renderHeader()}

      <Card elevation={3}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ p: { xs: 2, md: 3 } }}>
          <Stack sx={{ width: { xs: '100%', md: '33.33%' } }}>
            <CardMedia
              component="img"
              image={selectedMovie.Poster !== 'N/A' ? selectedMovie.Poster : '/placeholder.png'}
              alt={selectedMovie.Title}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 1,
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
              }}
            />
          </Stack>

          <Stack sx={{ width: { xs: '100%', md: '66.67%' } }}>
            <CardContent sx={{ p: { xs: 1, md: 2 }, '&:last-child': { pb: 3 } }}>
              <Typography variant="h4" gutterBottom color="secondary.main" fontWeight="bold">
                {selectedMovie.Title}
              </Typography>

              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Released: {selectedMovie.Released} | Runtime: {formatRuntime(selectedMovie.Runtime)}
                {selectedMovie.Type === 'series' && selectedMovie.totalSeasons && (
                  <> | Seasons: {selectedMovie.totalSeasons}</>
                )}
              </Typography>

              <Typography variant="body1" sx={{ my: 3 }}>
                {selectedMovie.Plot}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                <Typography component="span" fontWeight="bold">Genre:</Typography> {selectedMovie.Genre}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                <Typography component="span" fontWeight="bold">Director:</Typography> {selectedMovie.Director}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                <Typography component="span" fontWeight="bold">Actors:</Typography> {selectedMovie.Actors}
              </Typography>

              <Typography variant="h6" color="primary" sx={{ mt: 2, fontWeight: 'bold' }}>
                IMDb Rating: {selectedMovie.imdbRating}
              </Typography>
            </CardContent>
          </Stack>
        </Stack>
      </Card>

      {/* Season data for series */}
      {selectedMovie.Type === 'series' && selectedMovie.totalSeasons && (
        <Box sx={{ mt: 4 }}>
          <SeasonAccordion />
        </Box>
      )}
    </Container>
  );
};

export default MovieDetailPage;
