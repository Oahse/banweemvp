/**
 * Vatican City country data with administrative areas and cities
 */

import { Country } from './index';

export const vaticancity: Country = {
  code: 'VA',
  name: 'Vatican City',
  flag: '🇻🇦',
  capital: 'Vatican City',
  area: 0.44,
  currencySymbol: '€',
  officialLanguages: ['Italian', 'Latin'],
  demonym: 'Vatican',
  taxInfo: { standardRate: 22, taxName: 'VAT', currency: 'EUR', region: 'EU' },
  divisions: [
    { code: 'VAT', name: 'Vatican City', type: 'administrative area',
      cities: [
        { code: 'VATICAN_CITY', name: 'Vatican City' },
        { code: 'ST_PETER_SQUARE', name: 'St. Peter\'s Square' },
        { code: 'SISTINE_CHAPEL', name: 'Sistine Chapel' },
        { code: 'VATICAN_MUSEUMS', name: 'Vatican Museums' },
        { code: 'APOSTOLIC_PALACE', name: 'Apostolic Palace' }
      ]
    }
  ]
};
