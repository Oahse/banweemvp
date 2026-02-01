/**
 * Fiji country data with divisions and cities
 */

import { Country } from './index';

export const fiji: Country = {
  code: 'FJ',
  name: 'Fiji',
  flag: '🇫🇯',
  capital: 'Suva',
  area: 18274,
  currencySymbol: '$',
  officialLanguages: ['English', 'Fijian', 'Hindi'],
  demonym: 'Fijian',
  taxInfo: { standardRate: 9, taxName: 'VAT', currency: 'FJD', region: 'APAC' },
  divisions: [
    { code: 'SUV', name: 'Central', type: 'division',
      cities: [
        { code: 'SUVA', name: 'Suva' },
        { code: 'LAUTOKA', name: 'Lautoka' },
        { code: 'NADI', name: 'Nadi' },
        { code: 'BA', name: 'Ba' },
        { code: 'TAVUA', name: 'Tavua' }
      ]
    },
    { code: 'LAU', name: 'Western', type: 'division',
      cities: [
        { code: 'LAUTOKA', name: 'Lautoka' },
        { code: 'NADI', name: 'Nadi' },
        { code: 'BA', name: 'Ba' },
        { code: 'TAVUA', name: 'Tavua' },
        { code: 'SUVA', name: 'Suva' }
      ]
    },
    { code: 'NAD', name: 'Northern', type: 'division',
      cities: [
        { code: 'NADI', name: 'Nadi' },
        { code: 'BA', name: 'Ba' },
        { code: 'TAVUA', name: 'Tavua' },
        { code: 'SUVA', name: 'Suva' },
        { code: 'LAUTOKA', name: 'Lautoka' }
      ]
    },
    { code: 'BA', name: 'Eastern', type: 'division',
      cities: [
        { code: 'BA', name: 'Ba' },
        { code: 'TAVUA', name: 'Tavua' },
        { code: 'SUVA', name: 'Suva' },
        { code: 'LAUTOKA', name: 'Lautoka' },
        { code: 'NADI', name: 'Nadi' }
      ]
    },
    { code: 'TAV', name: 'Southern', type: 'division',
      cities: [
        { code: 'TAVUA', name: 'Tavua' },
        { code: 'SUVA', name: 'Suva' },
        { code: 'LAUTOKA', name: 'Lautoka' },
        { code: 'NADI', name: 'Nadi' },
        { code: 'BA', name: 'Ba' }
      ]
    }
  ]
};
