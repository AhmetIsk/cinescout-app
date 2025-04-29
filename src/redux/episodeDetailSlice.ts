import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getMovieDetailErrorMessage } from '@utils/api/errorHandlers';

// Episode detail type
export interface EpisodeDetail {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Season: string;
  Episode: string;
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
  imdbID: string;
  seriesID: string;
  Type: string;
}

// State for the episode detail
interface EpisodeDetailState {
  episode: EpisodeDetail | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: EpisodeDetailState = {
  episode: null,
  status: 'idle',
  error: null,
};

// Fetch episode detail thunk
export const fetchEpisodeDetail = createAsyncThunk(
  'episodeDetail/fetchEpisodeDetail',
  async (
    { id, season, episode }: { id: string; season?: number; episode?: string },
    { rejectWithValue }
  ) => {
    try {
      // Create URL based on whether we have season and episode numbers
      let url = `${process.env.REACT_APP_OMDB_API_URL}?apikey=${process.env.REACT_APP_OMDB_API_KEY}&i=${id}`;

      // If we have season and episode, add them to the query
      if (season !== undefined && episode !== undefined) {
        url += `&Season=${season}&Episode=${episode}`;
      }

      const response = await axios.get(url);

      // Handle API error responses
      if (response.data.Response === 'False') {
        return rejectWithValue({
          message: response.data.Error || `Could not load details for episode ID: ${id}`
        });
      }

      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: getMovieDetailErrorMessage(error, id)
      });
    }
  }
);

const episodeDetailSlice = createSlice({
  name: 'episodeDetail',
  initialState,
  reducers: {
    clearEpisodeDetail(state) {
      state.episode = null;
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEpisodeDetail.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchEpisodeDetail.fulfilled, (state, action) => {
        state.episode = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchEpisodeDetail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? (action.payload as { message: string }).message :
                     action.error.message || "Failed to load episode details";
      });
  },
});

export const { clearEpisodeDetail } = episodeDetailSlice.actions;

export default episodeDetailSlice.reducer;