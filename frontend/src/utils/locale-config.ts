// Locale configuration
export const LOCALE_CONFIG = {
  defaultLocale: 'en-US',
  supportedLocales: ['en-US', 'fr-FR', 'ar-SA', 'nl-NL', 'sv-SE', 'nb-NO'],
  currencies: {
    'en-US': 'USD',
    'fr-FR': 'EUR',
    'ar-SA': 'SAR',
    'nl-NL': 'EUR',
    'sv-SE': 'SEK',
    'nb-NO': 'NOK',
  },
};

// Format currency helper function
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  });
  return formatter.format(amount);
}
