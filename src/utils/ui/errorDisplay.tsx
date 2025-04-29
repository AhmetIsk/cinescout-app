import React from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

interface ErrorDisplayProps {
  title: string;
  message: string | null;
  suggestion?: string;
  showButton?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
  type?: 'error' | 'warning' | 'info';
}

/**
 * Reusable error display component with customizable styling based on error type
 */
export const ErrorDisplay = ({
  title,
  message,
  suggestion,
  showButton = false,
  buttonText = "Try Again",
  onButtonClick,
  type = 'error'
}: ErrorDisplayProps) => {
  // Styling based on error type
  const getErrorStyles = () => {
    switch (type) {
      case 'error':
        return {
          backgroundColor: 'rgba(211, 47, 47, 0.05)',
          borderColor: 'rgba(211, 47, 47, 0.2)',
          color: 'error',
          icon: <ErrorOutlineIcon color="error" sx={{ mr: 1 }} />
        };
      case 'warning':
        return {
          backgroundColor: 'rgba(245, 124, 0, 0.05)',
          borderColor: 'rgba(245, 124, 0, 0.2)',
          color: 'warning.dark',
          icon: <SentimentDissatisfiedIcon color="warning" sx={{ mr: 1 }} />
        };
      case 'info':
        return {
          backgroundColor: 'rgba(2, 136, 209, 0.05)',
          borderColor: 'rgba(2, 136, 209, 0.2)',
          color: 'info.main',
          icon: <ErrorOutlineIcon color="info" sx={{ mr: 1 }} />
        };
      default:
        return {
          backgroundColor: 'rgba(211, 47, 47, 0.05)',
          borderColor: 'rgba(211, 47, 47, 0.2)',
          color: 'error',
          icon: <ErrorOutlineIcon color="error" sx={{ mr: 1 }} />
        };
    }
  };

  const styles = getErrorStyles();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: styles.backgroundColor,
        border: `1px solid ${styles.borderColor}`
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        {styles.icon}
        <Typography variant="h6" color={styles.color}>{title}</Typography>
      </Box>

      {message && <Typography variant="body1">{message}</Typography>}

      {suggestion && (
        <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
          {suggestion}
        </Typography>
      )}

      {showButton && onButtonClick && (
        <Button
          variant="outlined"
          color="primary"
          onClick={onButtonClick}
          sx={{ mt: 3 }}
        >
          {buttonText}
        </Button>
      )}
    </Paper>
  );
};