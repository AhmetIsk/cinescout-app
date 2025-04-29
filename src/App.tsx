import { Route, Routes } from 'react-router-dom';
import MovieListPage from '@pages/MovieListPage';
import MovieDetailPage from '@pages/MovieDetailPage';
import EpisodeDetailPage from '@pages/EpisodeDetailPage';
import Header from '@components/Header';
import { Box, CssBaseline } from '@mui/material';
import ThemeProvider from '@utils/ui/ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: 'background.default',
            color: 'text.primary'
          }}
        >
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
