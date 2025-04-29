import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { getApiErrorMessage } from '../utils/api/errorHandlers';
import { createSearchUrl } from '../utils/api/omdbApi';

// Movie type (basic for now)
interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

// State for the movies list
interface MoviesState {
  movies: Movie[];
  searchQuery: string;
  filterYear: string;
  filterType: 'movie' | 'series' | 'episode' | '';
  currentPage: number;
  totalResults: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MoviesState = {
  movies: [],
  searchQuery: 'Pokemon', // Default search on load
  filterYear: '',
  filterType: '',
  currentPage: 1,
  totalResults: 0,
  status: 'idle',
  error: null,
};

// Fetch movies thunk
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { movies: MoviesState };
      const { searchQuery, filterYear, filterType, currentPage } = state.movies;

      const url = createSearchUrl(searchQuery, currentPage, filterType, filterYear);
      const response = await axios.get(url);

      // Handle API error responses
      if (response.data.Response === 'False') {
        return rejectWithValue({
          message: response.data.Error || "Unknown error occurred"
        });
      }

      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: getApiErrorMessage(error)
      });
    }
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      state.currentPage = 1; // Reset to page 1
    },
    setFilterYear(state, action: PayloadAction<string>) {
      state.filterYear = action.payload;
      state.currentPage = 1;
    },
    setFilterType(state, action: PayloadAction<'movie' | 'series' | 'episode' | ''>) {
      state.filterType = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        if (action.payload.Response === 'True') {
          state.movies = action.payload.Search || [];
          state.totalResults = parseInt(action.payload.totalResults, 10);
          state.status = 'succeeded';
        } else {
          state.movies = [];
          state.totalResults = 0;
          state.status = 'failed';
          // This shouldn't normally be reached due to our rejectWithValue above
          state.error = action.payload.Error || 'Unknown error';
        }
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.movies = [];
        state.error = action.payload ? (action.payload as { message: string }).message :
                      action.error.message || "Something went wrong";
      });
  },
});

export const { setSearchQuery, setFilterYear, setFilterType, setCurrentPage } = moviesSlice.actions;

export default moviesSlice.reducer;
