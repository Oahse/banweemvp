/**
 * Guyana country data with regions and cities
 */

import { Country } from './index';

export const guyana: Country = {
  code: 'GY',
  name: 'Guyana',
  flag: '🇬🇾',
  capital: 'Georgetown',
  area: 214969,
  currencySymbol: 'G$',
  officialLanguages: ['English', 'Guyanese Creole', 'Indo-Guyanese'],
  demonym: 'Guyanese',
  taxInfo: { standardRate: 14, taxName: 'VAT', currency: 'GYD', region: 'LATAM' },
  divisions: [
    { code: 'GEO', name: 'Georgetown', type: 'region',
      cities: [
        { code: 'GEORGETOWN', name: 'Georgetown' },
        { code: 'LINDEN', name: 'Linden' },
        { code: 'NEW', name: 'New Amsterdam' },
        { code: 'ANNA', name: 'Anna Regina' },
        { code: 'BARTICA', name: 'Bartica' }
      ]
    },
    { code: 'LIN', name: 'Linden', type: 'region',
      cities: [
        { code: 'LINDEN', name: 'Linden' },
        { code: 'NEW', name: 'New Amsterdam' },
        { code: 'ANNA', name: 'Anna Regina' },
        { code: 'BARTICA', name: 'Bartica' },
        { code: 'GEORGETOWN', name: 'Georgetown' }
      ]
    },
    { code: 'NEW', name: 'New Amsterdam', type: 'region',
      cities: [
        { code: 'NEW', name: 'New Amsterdam' },
        { code: 'ANNA', name: 'Anna Regina' },
        { code: 'BARTICA', name: 'Bartica' },
        { code: 'GEORGETOWN', name: 'Georgetown' },
        { code: 'LINDEN', name: 'Linden' }
      ]
    },
    { code: 'ANN', name: 'Anna Regina', type: 'region',
      cities: [
        { code: 'ANNA', name: 'Anna Regina' },
        { code: 'BARTICA', name: 'Bartica' },
        { code: 'GEORGETOWN', name: 'Georgetown' },
        { code: 'LINDEN', name: 'Linden' },
        { code: 'NEW', name: 'New Amsterdam' }
      ]
    },
    { code: 'BAR', name: 'Bartica', type: 'region',
      cities: [
        { code: 'BARTICA', name: 'Bartica' },
        { code: 'GEORGETOWN', name: 'Georgetown' },
        { code: 'LINDEN', name: 'Linden' },
        { code: 'NEW', name: 'New Amsterdam' },
        { code: 'ANNA', name: 'Anna Regina' }
      ]
    }
  ]
};
