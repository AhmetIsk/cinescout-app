import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material';
import { selectThemeMode } from '@redux/themeSlice';

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // Get theme mode from Redux store
  const mode = useSelector(selectThemeMode);

  // Create theme based on current mode
  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: '#e50914', // Netflix red
      },
      secondary: {
        main: mode === 'dark' ? '#fff' : '#121212',
      },
      background: {
        default: mode === 'dark' ? '#121212' : '#f5f5f5',
        paper: mode === 'dark' ? '#1e1e1e' : '#ffffff',
      },
      text: {
        primary: mode === 'dark' ? '#ffffff' : '#121212',
        secondary: mode === 'dark' ? '#b3b3b3' : '#666666',
      },
    },
    typography: {
      fontFamily: [
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif'
      ].join(','),
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' ? '#1e1e1e' : '#ffffff',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' ? '#1a1a1a' : '#ffffff',
            color: mode === 'dark' ? '#ffffff' : '#121212',
          },
        },
      },
    },
  });

  return (
    <MUIThemeProvider theme={theme}>
      {children}
    </MUIThemeProvider>
  );
};

export default ThemeProvider;