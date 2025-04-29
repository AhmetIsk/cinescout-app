/**
 * Truncates a string to a maximum length and adds ellipsis if needed
 * @param text - The string to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated string with ellipsis if needed
 */
export const truncateString = (text: string, maxLength: number): string => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Formats a year string for display, handling edge cases
 * @param year - Year string from API
 * @returns Formatted year string or placeholder if undefined
 */
export const formatYear = (year?: string): string => {
  if (!year) return 'N/A';

  // Some APIs return year ranges like "2019-2022" for TV shows
  // We'll just return the full string in those cases
  return year;
};

/**
 * Capitalizes the first letter of each word in a string
 * @param text - The string to capitalize
 * @returns String with first letter of each word capitalized
 */
export const capitalizeWords = (text: string): string => {
  if (!text) return '';
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Formats runtime for display
 * @param runtime - Runtime string (e.g., "120 min")
 * @returns Formatted runtime or N/A if not available
 */
export const formatRuntime = (runtime?: string): string => {
  if (!runtime) return 'N/A';

  // If runtime is already formatted as "X min", return as is
  if (runtime.includes('min')) return runtime;

  // If it's just a number, assume it's minutes
  const minutes = parseInt(runtime, 10);
  if (isNaN(minutes)) return runtime;

  // Format as hours and minutes
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes > 0 ? remainingMinutes + 'm' : ''}`;
  }

  return `${minutes}m`;
};