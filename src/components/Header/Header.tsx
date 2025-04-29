import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  IconButton,
  Box,
  useTheme as useMuiTheme
} from '@mui/material';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import ThemeToggle from '@components/ThemeToggle';

const Header = () => {
  const navigate = useNavigate();
  const theme = useMuiTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: isDarkMode ? '#1a1a1a' : '#121212',
        color: '#ffffff',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/')}
          >
            <IconButton
              edge="start"
              color="inherit"
              sx={{ mr: 1 }}
              disableRipple
            >
              <LocalMoviesIcon sx={{ color: '#e50914' }} />
            </IconButton>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                fontWeight: 700,
                letterSpacing: '.1rem',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              CINE
              <Typography
                component="span"
                variant="h6"
                noWrap
                sx={{
                  color: '#e50914',
                  fontWeight: 800
                }}
              >
                SCOUT
              </Typography>
            </Typography>
          </Box>

          {/* Theme Toggle */}
          <ThemeToggle />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;