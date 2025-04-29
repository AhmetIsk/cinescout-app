import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '@redux/moviesSlice';
import movieDetailReducer from '@redux/movieDetailSlice';
import episodeDetailReducer from '@redux/episodeDetailSlice';
import themeReducer from '@redux/themeSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    movieDetail: movieDetailReducer,
    episodeDetail: episodeDetailReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
