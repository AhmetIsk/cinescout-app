import { useNavigate } from 'react-router-dom';

/**
 * Custom hook for common navigation functions across the app
 * Ensures consistent navigation behavior
 */
export const useNavigation = () => {
  const navigate = useNavigate();

  /**
   * Navigate to home while preserving state
   */
  const navigateToHome = () => {
    navigate('/');
  };

  /**
   * Navigate to movie detail page
   */
  const navigateToMovie = (id: string) => {
    navigate(`/movie/${id}`);
  };

  /**
   * Navigate to episode detail page
   */
  const navigateToEpisode = (
    seriesId: string,
    seasonNumber: number,
    episodeNumber: string,
    episodeId: string,
    seriesTitle: string = ''
  ) => {
    navigate(`/episode/${seriesId}?season=${seasonNumber}&episode=${episodeNumber}&episodeId=${episodeId}`, {
        state: { seriesTitle }
      }
    );
  };

  return {
    navigateToHome,
    navigateToMovie,
    navigateToEpisode
  };
};