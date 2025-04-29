import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './moviesSlice';
import movieDetailReducer from './movieDetailSlice';
import episodeDetailReducer from './episodeDetailSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    movieDetail: movieDetailReducer,
    episodeDetail: episodeDetailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
