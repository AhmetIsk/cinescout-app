import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { getMovieDetailErrorMessage } from '../utils/api/errorHandlers';
import { createMovieDetailUrl } from '../utils/api/omdbApi';

// Episode type
export interface Episode {
  Title: string;
  Released: string;
  Episode: string;
  imdbRating: string;
  imdbID: string;
}

// Season type
export interface Season {
  seasonNumber: number;
  episodes: Episode[];
}

// Movie detail type
interface MovieDetail {
  imdbID: string;
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: { Source: string; Value: string }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  Type: string;
  totalSeasons?: string;
  seasons?: Season[];
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
}

// State for the movie detail
interface MovieDetailState {
  selectedMovie: MovieDetail | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  episodesStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  selectedSeason: number;
  loadedSeasons: number[]; // Keep track of seasons we've already loaded
}

const initialState: MovieDetailState = {
  selectedMovie: null,
  status: 'idle',
  error: null,
  episodesStatus: 'idle',
  selectedSeason: 1,
  loadedSeasons: [],
};

// Fetch season episodes thunk
export const fetchSeasonEpisodes = createAsyncThunk(
  'movieDetail/fetchSeasonEpisodes',
  async ({ id, seasonNumber }: { id: string; seasonNumber: number }, { rejectWithValue, getState }) => {
    try {
      // Check if we already have this season's data to prevent duplicate requests
      const state = getState() as { movieDetail: MovieDetailState };

      // If we've already loaded this season or it's in the selectedMovie's seasons array, don't fetch again
      if (state.movieDetail.loadedSeasons.includes(seasonNumber) ||
          state.movieDetail.selectedMovie?.seasons?.some(season => season.seasonNumber === seasonNumber)) {
        // Return the existing data to avoid duplicate requests
        const existingSeason = state.movieDetail.selectedMovie?.seasons?.find(
          season => season.seasonNumber === seasonNumber
        );

        if (existingSeason) {
          return existingSeason;
        }
      }

      // Create the URL with series ID and season number
      const url = `${process.env.REACT_APP_OMDB_API_URL}?apikey=${process.env.REACT_APP_OMDB_API_KEY}&i=${id}&Season=${seasonNumber}`;
      const response = await axios.get(url);

      // Handle API error responses
      if (response.data.Response === 'False') {
        return rejectWithValue({
          message: response.data.Error || `Could not load episodes for season ${seasonNumber}`
        });
      }

      return {
        seasonNumber,
        episodes: response.data.Episodes
      };
    } catch (error) {
      return rejectWithValue({
        message: getMovieDetailErrorMessage(error, id)
      });
    }
  }
);

// Fetch movie detail thunk
export const fetchMovieDetail = createAsyncThunk(
  'movieDetail/fetchMovieDetail',
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      const url = createMovieDetailUrl(id, true);
      const response = await axios.get(url);

      // Handle API error responses
      if (response.data.Response === 'False') {
        return rejectWithValue({
          message: response.data.Error || `Could not load details for movie ID: ${id}`
        });
      }

      // If it's a series and has seasons, fetch the first season
      if (response.data.Type === 'series' && response.data.totalSeasons) {
        // Dispatch to fetch first season episodes
        dispatch(fetchSeasonEpisodes({ id, seasonNumber: 1 }));
      }

      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: getMovieDetailErrorMessage(error, id)
      });
    }
  }
);

const movieDetailSlice = createSlice({
  name: 'movieDetail',
  initialState,
  reducers: {
    clearMovieDetail(state) {
      state.selectedMovie = null;
      state.status = 'idle';
      state.error = null;
      state.episodesStatus = 'idle';
      state.selectedSeason = 1;
      state.loadedSeasons = [];
    },
    setSelectedSeason(state, action: PayloadAction<number>) {
      state.selectedSeason = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetail.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => {
        state.selectedMovie = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchMovieDetail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? (action.payload as { message: string }).message :
                     action.error.message || "Failed to load movie details";
      })
      // Handle fetchSeasonEpisodes actions
      .addCase(fetchSeasonEpisodes.pending, (state) => {
        state.episodesStatus = 'loading';
      })
      .addCase(fetchSeasonEpisodes.fulfilled, (state, action) => {
        if (state.selectedMovie) {
          // Initialize seasons array if needed
          if (!state.selectedMovie.seasons) {
            state.selectedMovie.seasons = [];
          }

          // Find if this season already exists
          const existingSeasonIndex = state.selectedMovie.seasons.findIndex(
            season => season.seasonNumber === action.payload.seasonNumber
          );

          if (existingSeasonIndex >= 0) {
            // Update existing season
            state.selectedMovie.seasons[existingSeasonIndex] = action.payload;
          } else {
            // Add new season
            state.selectedMovie.seasons.push(action.payload);
          }

          // Add to loaded seasons tracking array
          if (!state.loadedSeasons.includes(action.payload.seasonNumber)) {
            state.loadedSeasons.push(action.payload.seasonNumber);
          }

          state.episodesStatus = 'succeeded';
        }
      })
      .addCase(fetchSeasonEpisodes.rejected, (state) => {
        state.episodesStatus = 'failed';
      });
  },
});

export const { clearMovieDetail, setSelectedSeason } = movieDetailSlice.actions;

export default movieDetailSlice.reducer;
