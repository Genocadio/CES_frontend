/**
 * Formats a date string into a human-readable relative time
 * @param dateString - ISO date string or Date object
 * @returns Formatted relative time string
 */
export const formatRelativeTime = (dateString: string | Date): string => {
  try {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
    
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diff / (1000 * 60));
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);
    
    // For today: show minutes or hours
    if (diffDays === 0) {
      if (diffMinutes < 1) {
        return 'Just now';
      } else if (diffMinutes < 60) {
        return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
      } else {
        return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
      }
    }
    
    // For yesterday
    if (diffDays === 1) {
      return 'Yesterday';
    }
    
    // For this week
    if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    }
    
    // For this month
    if (diffWeeks < 4) {
      return `${diffWeeks} week${diffWeeks !== 1 ? 's' : ''} ago`;
    }
    
    // For this year
    if (diffMonths < 12) {
      return `${diffMonths} month${diffMonths !== 1 ? 's' : ''} ago`;
    }
    
    // For older dates
    return `${diffYears} year${diffYears !== 1 ? 's' : ''} ago`;
    
  } catch (error) {
    console.error('Error formatting date:', dateString, error);
    return 'Invalid date';
  }
};

/**
 * Formats a date string into a human-readable relative time with language support
 * @param dateString - ISO date string or Date object
 * @param language - Language code for translations
 * @param getTranslation - Translation function
 * @returns Formatted relative time string
 */
export const formatRelativeTimeWithLanguage = (
  dateString: string | Date, 
  language: string, 
  getTranslation: (key: string, language: string) => string
): string => {
  try {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
    
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diff / (1000 * 60));
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);
    
    // For today: show minutes or hours
    if (diffDays === 0) {
      if (diffMinutes < 1) {
        return getTranslation('justNow', language);
      } else if (diffMinutes < 60) {
        return `${diffMinutes} ${getTranslation('minutesAgo', language)}`;
      } else {
        return `${diffHours} ${getTranslation('hoursAgo', language)}`;
      }
    }
    
    // For yesterday
    if (diffDays === 1) {
      return 'Yesterday';
    }
    
    // For this week
    if (diffDays < 7) {
      return `${diffDays} ${getTranslation('daysAgo', language)}`;
    }
    
    // For this month
    if (diffWeeks < 4) {
      return `${diffWeeks} weeks ago`;
    }
    
    // For this year
    if (diffMonths < 12) {
      return `${diffMonths} months ago`;
    }
    
    // For older dates
    return `${diffYears} years ago`;
    
  } catch (error) {
    console.error('Error formatting date:', dateString, error);
    return 'Invalid date';
  }
};
