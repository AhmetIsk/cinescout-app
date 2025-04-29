import axios from 'axios';

/**
 * Converts API and network errors into user-friendly messages
 * @param error - The error object from API call or other error
 * @returns A human-readable error message
 */
export const getApiErrorMessage = (error: any): string => {
  if (axios.isAxiosError(error)) {
    const statusCode = error.response?.status;

    if (statusCode === 401) {
      return "Authentication failed. Please check your API key.";
    } else if (statusCode === 404) {
      return "The requested resource could not be found.";
    } else if (statusCode === 429) {
      return "Too many requests. Please try again later.";
    } else if (statusCode && statusCode >= 500) {
      return "The movie database is currently unavailable. Please try again later.";
    }
  }

  // Handle OMDb specific error messages
  if (error.message && typeof error.message === 'string') {
    if (error.message.includes('No API key')) {
      return "Missing API key. Please provide a valid API key.";
    }
    if (error.message.includes('Invalid API key')) {
      return "Your API key is invalid. Please check your configuration.";
    }
  }

  // Default error message
  return "Something went wrong. Please try again later.";
};

/**
 * Gets a user-friendly error message for movie detail errors
 * @param error - The error object from API call
 * @param movieId - Optional movie ID for context in error messages
 * @returns A human-readable error message
 */
export const getMovieDetailErrorMessage = (error: any, movieId?: string): string => {
  if (axios.isAxiosError(error)) {
    const statusCode = error.response?.status;

    if (statusCode === 401) {
      return "Authentication failed. Please check your API key.";
    } else if (statusCode === 404) {
      return `Movie details could not be found${movieId ? ` for ID: ${movieId}` : ''}.`;
    } else if (statusCode === 429) {
      return "Too many requests. Please try again later.";
    } else if (statusCode && statusCode >= 500) {
      return "The movie database is currently unavailable. Please try again later.";
    }
  }

  // Handle OMDb specific error messages
  if (error.message && typeof error.message === 'string') {
    if (error.message.includes('No API key')) {
      return "Missing API key. Please provide a valid API key.";
    }
    if (error.message.includes('Invalid API key')) {
      return "Your API key is invalid. Please check your configuration.";
    }
    if (error.message.includes('Movie not found')) {
      return `Movie not found${movieId ? ` with ID: ${movieId}` : ''}. Please check the ID and try again.`;
    }
  }

  // Default error message
  return "Could not load movie details. Please try again later.";
};