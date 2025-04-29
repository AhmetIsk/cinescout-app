import axios from 'axios';

/**
 * Base URL for the OMDB API
 */
export const OMDB_API_URL = 'https://www.omdbapi.com/';

/**
 * Creates a search URL for the OMDB API with the given parameters
 * @param searchQuery - The search term
 * @param page - Page number for pagination
 * @param type - Optional filter for content type (movie, series, episode)
 * @param year - Optional filter for year
 * @returns Full URL with parameters
 */
export const createSearchUrl = (
  searchQuery: string,
  page: number = 1,
  type?: 'movie' | 'series' | 'episode' | '',
  year?: string
): string => {
  const apiKey = process.env.REACT_APP_OMDB_API_KEY;
  if (!apiKey) {
    throw new Error("No API key provided");
  }

  const params = new URLSearchParams({
    apikey: apiKey,
    s: searchQuery,
    page: page.toString(),
  });

  // If searching for episodes, modify the search logic
  // For episodes, we should generally search for series first
  if (type === 'episode') {
    // When searching for episodes, we search for series but will handle display differently
    // The OMDB API's 's' parameter doesn't work well with type=episode
    params.append('type', 'series');
  } else if (type) {
    // For other types, add the filter normally
    params.append('type', type);
  }

  // Only add year filter if not empty
  if (year) params.append('y', year);

  return `${OMDB_API_URL}?${params.toString()}`;
};

/**
 * Creates a URL to search for episodes of a specific series
 * @param seriesTitle - The title of the series
 * @param season - Optional season number
 * @param episode - Optional episode number
 * @returns Full URL with parameters
 */
export const createEpisodeSearchUrl = (
  seriesTitle: string,
  season?: number,
  episode?: number
): string => {
  const apiKey = process.env.REACT_APP_OMDB_API_KEY;
  if (!apiKey) {
    throw new Error("No API key provided");
  }

  const params = new URLSearchParams({
    apikey: apiKey,
    t: seriesTitle,
  });

  if (season !== undefined) {
    params.append('Season', season.toString());
  }

  if (episode !== undefined) {
    params.append('Episode', episode.toString());
  }

  return `${OMDB_API_URL}?${params.toString()}`;
};

/**
 * Creates a movie detail URL for the OMDB API
 * @param imdbId - The IMDB ID of the movie
 * @param fullPlot - Whether to return the full plot or not
 * @returns Full URL with parameters
 */
export const createMovieDetailUrl = (imdbId: string, fullPlot: boolean = true): string => {
  const apiKey = process.env.REACT_APP_OMDB_API_KEY;
  if (!apiKey) {
    throw new Error("No API key provided");
  }

  const plotParam = fullPlot ? 'full' : 'short';
  return `${OMDB_API_URL}?apikey=${apiKey}&i=${imdbId}&plot=${plotParam}`;
};

/**
 * Validates the OMDB API key
 * @returns Promise resolving to true if valid, rejecting if invalid
 */
export const validateApiKey = async (): Promise<boolean> => {
  const apiKey = process.env.REACT_APP_OMDB_API_KEY;
  if (!apiKey) {
    throw new Error("No API key provided");
  }

  // Make a test request with a nonsense search that should return a valid response structure
  const response = await axios.get(`${OMDB_API_URL}?apikey=${apiKey}&s=test123`);

  if (response.data && (response.data.Response === 'True' || response.data.Response === 'False')) {
    return true;
  }

  throw new Error("Invalid API key");
};