import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  IconButton,
  Box
} from '@mui/material';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ backgroundColor: '#121212' }}>
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
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
                color: 'white',
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
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;