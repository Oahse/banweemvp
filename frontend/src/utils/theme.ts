// Theme utilities
export const defaultTheme = {
  colors: {
    primary: '#10b981',
    secondary: '#6b7280',
    background: '#ffffff',
    surface: '#f9fafb',
    text: '#111827',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
};

export const themeUtils = {
  getEffectiveTheme: (theme: 'light' | 'dark' | 'system') => {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return theme;
  },

  applyTheme: (theme: 'light' | 'dark' | 'system') => {
    const effectiveTheme = themeUtils.getEffectiveTheme(theme);
    document.documentElement.classList.toggle('dark', effectiveTheme === 'dark');
  },

  watchSystemTheme: (callback: (isDark: boolean) => void) => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => callback(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  },
};