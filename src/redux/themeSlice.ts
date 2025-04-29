import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaletteMode } from '@mui/material';
import { RootState } from '@redux/store';

// Get initial theme from localStorage or default to light
const getInitialTheme = (): PaletteMode => {
  if (typeof window === 'undefined') return 'light';
  const savedMode = localStorage.getItem('theme-mode');
  return (savedMode === 'dark' || savedMode === 'light') ? savedMode as PaletteMode : 'light';
};

interface ThemeState {
  mode: PaletteMode;
}

const initialState: ThemeState = {
  mode: getInitialTheme(),
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme-mode', state.mode);
      }
    },
    setTheme: (state, action: PayloadAction<PaletteMode>) => {
      state.mode = action.payload;
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme-mode', state.mode);
      }
    },
  },
});

// Export actions and reducer
export const { toggleTheme, setTheme } = themeSlice.actions;

// Selector
export const selectThemeMode = (state: RootState) => state.theme.mode;

export default themeSlice.reducer;