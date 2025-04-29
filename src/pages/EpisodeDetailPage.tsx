import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchEpisodeDetail, clearEpisodeDetail } from '../redux/episodeDetailSlice';
import {
  Container,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Breadcrumbs,
  Link,
  IconButton,
  Rating,
  Chip,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MovieDetailSkeleton from '../components/Skeleton/MovieDetailSkeleton';
import { ErrorDisplay } from '../utils/ui/errorDisplay';
import { formatRuntime } from '../utils/formatting/stringUtils';

const EpisodeDetailPage = () => {
  const { id } = useParams(); // This is now the series ID
  const [searchParams] = useSearchParams();
  const seasonParam = searchParams.get('season');
  const episodeParam = searchParams.get('episode');
  const episodeId = searchParams.get('episodeId');
  const [seriesName, setSeriesName] = useState('Series');

  const season = seasonParam ? parseInt(seasonParam, 10) : undefined;
  const episode = episodeParam || undefined;

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { episode: episodeDetail, status, error } = useSelector(
    (state: RootState) => state.episodeDetail
  );
  const { selectedMovie } = useSelector(
    (state: RootState) => state.movieDetail
  );

  useEffect(() => {
    // If we have an episodeId, fetch by that specific ID
    // Otherwise, use series ID with season and episode numbers
    if (episodeId) {
      dispatch(fetchEpisodeDetail({ id: episodeId }));
    } else if (id && season !== undefined && episode !== undefined) {
      dispatch(fetchEpisodeDetail({ id, season, episode }));
    }

    // Use the existing movie details if available, don't make a new request
    // We only need the title for navigation purposes

    return () => {
      dispatch(clearEpisodeDetail());
    };
  }, [dispatch, id, season, episode, episodeId]);

  // Update series name when episode or movie details change
  useEffect(() => {
    if (episodeDetail?.Title) {
      const parts = episodeDetail.Title.split(' - ');
      if (parts.length > 1) {
        setSeriesName(parts[0]);
      } else if (episodeDetail.seriesID === id) {
        // If the episode doesn't have the series name embedded, use what we know
        setSeriesName(selectedMovie?.Title || 'Series');
      }
    } else if (selectedMovie?.Title) {
      setSeriesName(selectedMovie.Title);
    }
  }, [episodeDetail, selectedMovie, id]);

  const handleBackClick = () => {
    // Navigate back to series detail page
    navigate(`/movie/${id}`);
  };

  const renderBreadcrumbs = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
      <IconButton
        onClick={handleBackClick}
        size="small"
        sx={{ mr: 1, color: 'secondary.main' }}
        aria-label="back to series"
      >
        <ArrowBackIcon />
      </IconButton>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          component="button"
          underline="hover"
          color="inherit"
          onClick={() => navigate('/')}
          sx={{ color: 'secondary.main' }}
        >
          Home
        </Link>
        <Link
          component="button"
          underline="hover"
          color="inherit"
          onClick={() => navigate(`/movie/${id}`)}
          sx={{ color: 'secondary.main' }}
        >
          {seriesName}
        </Link>
        <Typography color="text.primary">
          {episodeDetail ?
            `S${episodeDetail.Season}E${episodeDetail.Episode}: ${episodeDetail.Title.split(' - ')[1] || episodeDetail.Title}`
            : `Season ${season} Episode ${episode}`}
        </Typography>
      </Breadcrumbs>
    </Box>
  );

  if (status === 'loading') {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton
            onClick={handleBackClick}
            size="small"
            sx={{ mr: 1, color: 'secondary.main' }}
            aria-label="back"
          >
            <ArrowBackIcon />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              component="button"
              underline="hover"
              color="inherit"
              onClick={() => navigate('/')}
              sx={{ color: 'secondary.main' }}
            >
              Home
            </Link>
            <Link
              component="button"
              underline="hover"
              color="inherit"
              onClick={() => navigate(`/movie/${id}`)}
              sx={{ color: 'secondary.main' }}
            >
              {seriesName}
            </Link>
            <Typography color="primary">Loading episode details...</Typography>
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
            onClick={handleBackClick}
            size="small"
            sx={{ mr: 1, color: 'secondary.main' }}
            aria-label="back"
          >
            <ArrowBackIcon />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              component="button"
              underline="hover"
              color="inherit"
              onClick={() => navigate('/')}
              sx={{ color: 'secondary.main' }}
            >
              Home
            </Link>
            <Link
              component="button"
              underline="hover"
              color="inherit"
              onClick={() => navigate(`/movie/${id}`)}
              sx={{ color: 'secondary.main' }}
            >
              {seriesName}
            </Link>
            <Typography color="error">Error</Typography>
          </Breadcrumbs>
        </Box>

        <ErrorDisplay
          title="Unable to Load Episode Details"
          message={error}
          suggestion="Try going back to the series page."
          showButton={true}
          buttonText="Go Back"
          onButtonClick={handleBackClick}
          type="error"
        />
      </Container>
    );
  }

  if (!episodeDetail) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton
            onClick={handleBackClick}
            size="small"
            sx={{ mr: 1, color: 'secondary.main' }}
            aria-label="back"
          >
            <ArrowBackIcon />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              component="button"
              underline="hover"
              color="inherit"
              onClick={() => navigate('/')}
              sx={{ color: 'secondary.main' }}
            >
              Home
            </Link>
            <Link
              component="button"
              underline="hover"
              color="inherit"
              onClick={() => navigate(`/movie/${id}`)}
              sx={{ color: 'secondary.main' }}
            >
              {seriesName}
            </Link>
            <Typography color="warning.dark">Not Found</Typography>
          </Breadcrumbs>
        </Box>

        <ErrorDisplay
          title="Episode Not Found"
          message="We couldn't find the episode you're looking for. It may have been removed or the ID is incorrect."
          suggestion="Please return to the series page."
          showButton={true}
          buttonText="Go Back"
          onButtonClick={handleBackClick}
          type="warning"
        />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {renderBreadcrumbs()}

      <Card elevation={3}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ p: { xs: 2, md: 3 } }}>
          <Stack sx={{ width: { xs: '100%', md: '33.33%' } }}>
            <CardMedia
              component="img"
              image={episodeDetail.Poster !== 'N/A' ? episodeDetail.Poster : '/placeholder.png'}
              alt={episodeDetail.Title}
              sx={{
                width: '100%',
                objectFit: 'cover',
                borderRadius: 1,
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Rating
                value={Number(episodeDetail.imdbRating) / 2}
                precision={0.5}
                readOnly
                size="large"
              />
              <Typography variant="h6" sx={{ ml: 1 }}>
                {episodeDetail.imdbRating}/10
              </Typography>
            </Box>
          </Stack>

          <Stack sx={{ width: { xs: '100%', md: '66.67%' } }}>
            <CardContent sx={{ p: { xs: 1, md: 2 }, '&:last-child': { pb: 3 } }}>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                <Chip
                  label={`Season ${episodeDetail.Season}`}
                  color="primary"
                  size="small"
                />
                <Chip
                  label={`Episode ${episodeDetail.Episode}`}
                  color="secondary"
                  size="small"
                />
              </Box>

              <Typography variant="h4" gutterBottom color="secondary.main" fontWeight="bold">
                {episodeDetail.Title.split(' - ')[1] || episodeDetail.Title}
              </Typography>

              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Released: {episodeDetail.Released} | Runtime: {formatRuntime(episodeDetail.Runtime)}
              </Typography>

              <Typography variant="body1" paragraph sx={{ my: 3 }}>
                {episodeDetail.Plot}
              </Typography>

              <Typography variant="body2" color="text.secondary" paragraph>
                <Typography component="span" fontWeight="bold">Director:</Typography> {episodeDetail.Director}
              </Typography>

              <Typography variant="body2" color="text.secondary" paragraph>
                <Typography component="span" fontWeight="bold">Writer:</Typography> {episodeDetail.Writer}
              </Typography>

              <Typography variant="body2" color="text.secondary" paragraph>
                <Typography component="span" fontWeight="bold">Actors:</Typography> {episodeDetail.Actors}
              </Typography>
            </CardContent>
          </Stack>
        </Stack>
      </Card>
    </Container>
  );
};

export default EpisodeDetailPage;