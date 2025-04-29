import { Route, Routes } from 'react-router-dom';
import MovieListPage from './pages/MovieListPage';
import MovieDetailPage from './pages/MovieDetailPage';
import EpisodeDetailPage from './pages/EpisodeDetailPage';
import Header from './components/Header/Header';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';

// Create a theme with our color palette
const theme = createTheme({
  palette: {
    primary: {
      main: '#e50914', // Netflix red
    },
    secondary: {
      main: '#121212', // Dark black
    },
    background: {
      default: '#f5f5f5',
    }
  },
  typography: {
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<MovieListPage />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />
            <Route path="/episode/:id" element={<EpisodeDetailPage />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
