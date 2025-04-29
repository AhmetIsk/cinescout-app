# API Utilities

This directory contains utilities for interacting with external APIs, primarily the OMDB API.

## Files

- `errorHandlers.ts` - Centralized error handling for API requests
- `omdbApi.ts` - Utilities for creating OMDB API URLs and handling responses

## Usage

### Creating API URLs

```typescript
import { createSearchUrl, createMovieDetailUrl } from '@utils/api/omdbApi';

// For search
const searchUrl = createSearchUrl('Batman', 1, 'movie', '2005');

// For movie details
const detailUrl = createMovieDetailUrl('tt0372784', true);
```

### Error Handling

```typescript
import { getApiErrorMessage, getMovieDetailErrorMessage } from '@utils/api/errorHandlers';

try {
  // API call
} catch (error) {
  // For search errors
  const message = getApiErrorMessage(error);

  // For movie detail errors
  const detailMessage = getMovieDetailErrorMessage(error, 'tt0372784');
}
```

## Best Practices

1. Always handle errors from API requests
2. Use the utility functions to create URLs instead of hardcoding them
3. Add new utility functions as needed for different API endpoints
4. Keep API-specific logic isolated in these utilities