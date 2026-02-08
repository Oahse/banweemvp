import React, { createContext, ReactNode } from 'react';
import { formatCurrency as formatCurrencyUtil, formatNumber, formatPercentage } from '../../../i18n';

interface LocaleContextType {
  formatCurrency: (amount: number, currency?: string) => string;
  formatNumber: (num: number, options?: Intl.NumberFormatOptions) => string;
  formatPercentage: (value: number, decimals?: number) => string;
  locale: string;
  currency: string;
  countryCode: string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const locale = 'en-US';

  const value: LocaleContextType = {
    formatCurrency: (amount, currency = 'USD') =>
      formatCurrencyUtil(amount, currency, locale),
    formatNumber: (num, options) =>
      formatNumber(num, locale, options),
    formatPercentage: (value, decimals = 0) =>
      formatPercentage(value, locale, decimals),
    locale,
    currency: 'USD',
    countryCode: 'US',
  };

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = (): LocaleContextType => {
  const context = React.useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};
