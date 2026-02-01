/**
 * Liechtenstein country data with municipalities and cities
 */

import { Country } from './index';

export const liechtenstein: Country = {
  code: 'LI',
  name: 'Liechtenstein',
  flag: '🇱🇮',
  capital: 'Vaduz',
  area: 160,
  currencySymbol: 'CHF',
  officialLanguages: ['German'],
  demonym: 'Liechtensteiner',
  taxInfo: { standardRate: 7.7, taxName: 'VAT', currency: 'CHF', region: 'EU' },
  divisions: [
    { code: 'VAD', name: 'Vaduz', type: 'municipality',
      cities: [
        { code: 'VADUZ', name: 'Vaduz' },
        { code: 'SCHAAN', name: 'Schaan' },
        { code: 'BALZERS', name: 'Balzers' },
        { code: 'Triesen', name: 'Triesen' },
        { code: 'ESCHEN', name: 'Eschen' }
      ]
    },
    { code: 'SCH', name: 'Schaan', type: 'municipality',
      cities: [
        { code: 'SCHAAN', name: 'Schaan' },
        { code: 'BALZERS', name: 'Balzers' },
        { code: 'Triesen', name: 'Triesen' },
        { code: 'ESCHEN', name: 'Eschen' },
        { code: 'VADUZ', name: 'Vaduz' }
      ]
    },
    { code: 'BAL', name: 'Balzers', type: 'municipality',
      cities: [
        { code: 'BALZERS', name: 'Balzers' },
        { code: 'Triesen', name: 'Triesen' },
        { code: 'ESCHEN', name: 'Eschen' },
        { code: 'VADUZ', name: 'Vaduz' },
        { code: 'SCHAAN', name: 'Schaan' }
      ]
    },
    { code: 'TRI', name: 'Triesen', type: 'municipality',
      cities: [
        { code: 'Triesen', name: 'Triesen' },
        { code: 'ESCHEN', name: 'Eschen' },
        { code: 'VADUZ', name: 'Vaduz' },
        { code: 'SCHAAN', name: 'Schaan' },
        { code: 'BALZERS', name: 'Balzers' }
      ]
    },
    { code: 'ESC', name: 'Eschen', type: 'municipality',
      cities: [
        { code: 'ESCHEN', name: 'Eschen' },
        { code: 'VADUZ', name: 'Vaduz' },
        { code: 'SCHAAN', name: 'Schaan' },
        { code: 'BALZERS', name: 'Balzers' },
        { code: 'Triesen', name: 'Triesen' }
      ]
    }
  ]
};
