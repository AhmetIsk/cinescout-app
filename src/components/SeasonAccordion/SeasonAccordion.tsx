import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '@redux/store';
import { fetchSeasonEpisodes, setSelectedSeason } from '@redux/movieDetailSlice';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Rating } from '@mui/material';

const SeasonAccordion = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedMovie, episodesStatus, selectedSeason } = useSelector(
    (state: RootState) => state.movieDetail
  );
  const [expanded, setExpanded] = useState<number | false>(false);

  // If not a series or no seasons, don't render
  if (!selectedMovie || selectedMovie.Type !== 'series' || !selectedMovie.totalSeasons) {
    return null;
  }

  const totalSeasons = parseInt(selectedMovie.totalSeasons, 10);

  const handleAccordionChange = (panel: number) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);

    if (isExpanded) {
      // If we don't have episodes for this season yet, fetch them
      dispatch(setSelectedSeason(panel));

      // Check if we already have the episodes for this season
      const hasSeasonData = selectedMovie.seasons?.some(
        season => season.seasonNumber === panel
      );

      if (!hasSeasonData) {
        dispatch(fetchSeasonEpisodes({ id: selectedMovie.imdbID, seasonNumber: panel }));
      }
    }
  };

  const handleEpisodeClick = (episodeId: string, seasonNumber: number, episodeNumber: string) => {
    navigate(`/episode/${selectedMovie.imdbID}?season=${seasonNumber}&episode=${episodeNumber}&episodeId=${episodeId}`);
  };

  // Create array of seasons from 1 to totalSeasons
  const seasons = Array.from({ length: totalSeasons }, (_, i) => i + 1);

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Seasons
      </Typography>

      {seasons.map(seasonNumber => {
        const seasonData = selectedMovie.seasons?.find(
          season => season.seasonNumber === seasonNumber
        );

        return (
          <Accordion
            key={seasonNumber}
            expanded={expanded === seasonNumber}
            onChange={handleAccordionChange(seasonNumber)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`season${seasonNumber}-content`}
              id={`season${seasonNumber}-header`}
            >
              <Typography>Season {seasonNumber}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {episodesStatus === 'loading' && selectedSeason === seasonNumber ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                  <CircularProgress size={24} />
                </Box>
              ) : !seasonData ? (
                <Typography>No episodes available</Typography>
              ) : (
                <TableContainer component={Paper}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell width="10%">Episode</TableCell>
                        <TableCell width="50%">Title</TableCell>
                        <TableCell width="20%">Air Date</TableCell>
                        <TableCell width="20%">Rating</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {seasonData.episodes.map(episode => (
                        <TableRow
                          key={episode.imdbID}
                          onClick={() => handleEpisodeClick(episode.imdbID, seasonNumber, episode.Episode)}
                          hover
                          sx={{
                            cursor: 'pointer',
                            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
                          }}
                        >
                          <TableCell>{episode.Episode}</TableCell>
                          <TableCell>{episode.Title}</TableCell>
                          <TableCell>{episode.Released}</TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Rating
                                value={Number(episode.imdbRating) / 2}
                                precision={0.5}
                                readOnly
                                size="small"
                              />
                              <Typography variant="body2" sx={{ ml: 1 }}>
                                {episode.imdbRating}/10
                              </Typography>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};

export default SeasonAccordion;