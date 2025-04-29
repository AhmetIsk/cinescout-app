// src/redux/movieDetailSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { getMovieDetailErrorMessage } from '../utils/api/errorHandlers';
import { createMovieDetailUrl } from '../utils/api/omdbApi';

// Episode type
interface Episode {
  Title: string;
  Released: string;
  Episode: string;
  imdbRating: string;
  imdbID: string;
}

// Season type
interface Season {
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
  episodesStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MovieDetailState = {
  selectedMovie: null,
  status: 'idle',
  episodesStatus: 'idle',
  error: null,
};

// Fetch season data for a TV series
export const fetchSeasonEpisodes = createAsyncThunk(
  'movieDetail/fetchSeasonEpisodes',
  async ({ seriesID, seasonNumber }: { seriesID: string, seasonNumber: number }, { rejectWithValue }) => {
    try {
      const apiKey = process.env.REACT_APP_OMDB_API_KEY;
      if (!apiKey) {
        throw new Error("No API key provided");
      }

      // Fetch the season data
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${apiKey}&i=${seriesID}&Season=${seasonNumber}`
      );

      if (response.data.Response === 'False') {
        return rejectWithValue({
          message: response.data.Error || `Could not load episodes for season ${seasonNumber}`
        });
      }

      // Format the season data
      return {
        seasonNumber,
        episodes: response.data.Episodes || []
      };
    } catch (error) {
      return rejectWithValue({
        message: getMovieDetailErrorMessage(error)
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

      // If this is a TV series, fetch the first season's episodes
      if (response.data.Type === 'series' && response.data.totalSeasons) {
        // Fetch season 1 episodes
        dispatch(fetchSeasonEpisodes({
          seriesID: id,
          seasonNumber: 1
        }));
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
      state.episodesStatus = 'idle';
      state.error = null;
    },
    setSelectedSeason(state, action: PayloadAction<number>) {
      // This will be used to track the currently selected season
      // for the UI when we implement season switching
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetail.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => {
        state.selectedMovie = {
          ...action.payload,
          seasons: [] // Initialize empty seasons array for TV series
        };
        state.status = 'succeeded';
      })
      .addCase(fetchMovieDetail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? (action.payload as { message: string }).message :
                     action.error.message || "Failed to load movie details";
      })
      .addCase(fetchSeasonEpisodes.pending, (state) => {
        state.episodesStatus = 'loading';
      })
      .addCase(fetchSeasonEpisodes.fulfilled, (state, action) => {
        if (state.selectedMovie) {
          // Initialize seasons array if it doesn't exist
          if (!state.selectedMovie.seasons) {
            state.selectedMovie.seasons = [];
          }

          // Add the season data
          const existingSeasonIndex = state.selectedMovie.seasons.findIndex(
            s => s.seasonNumber === action.payload.seasonNumber
          );

          if (existingSeasonIndex >= 0) {
            // Update existing season
            state.selectedMovie.seasons[existingSeasonIndex] = action.payload;
          } else {
            // Add new season
            state.selectedMovie.seasons.push(action.payload);
          }
        }
        state.episodesStatus = 'succeeded';
      })
      .addCase(fetchSeasonEpisodes.rejected, (state) => {
        state.episodesStatus = 'failed';
      });
  },
});

export const { clearMovieDetail, setSelectedSeason } = movieDetailSlice.actions;

export default movieDetailSlice.reducer;
