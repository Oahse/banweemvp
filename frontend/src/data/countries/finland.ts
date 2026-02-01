/**
 * Finland country data with regions and cities
 */

import { Country } from './index';

export const finland: Country = {
  code: 'FI',
  name: 'Finland',
  flag: '🇫🇮',
  capital: 'Helsinki',
  area: 338424,
  currencySymbol: '€',
  officialLanguages: ['Finnish', 'Swedish'],
  demonym: 'Finnish',
  taxInfo: { standardRate: 25.5, taxName: 'ALV', currency: 'EUR', region: 'EU' },
  divisions: [
    { code: 'HEL', name: 'Helsinki', type: 'region',
      cities: [
        { code: 'HELSINKI', name: 'Helsinki' },
        { code: 'TAMPERE', name: 'Tampere' },
        { code: 'TURKU', name: 'Turku' },
        { code: 'OULU', name: 'Oulu' },
        { code: 'VANTAA', name: 'Vantaa' }
      ]
    },
    { code: 'TAM', name: 'Tampere', type: 'region',
      cities: [
        { code: 'TAMPERE', name: 'Tampere' },
        { code: 'TURKU', name: 'Turku' },
        { code: 'OULU', name: 'Oulu' },
        { code: 'VANTAA', name: 'Vantaa' },
        { code: 'HELSINKI', name: 'Helsinki' }
      ]
    },
    { code: 'TUR', name: 'Turku', type: 'region',
      cities: [
        { code: 'TURKU', name: 'Turku' },
        { code: 'OULU', name: 'Oulu' },
        { code: 'VANTAA', name: 'Vantaa' },
        { code: 'HELSINKI', name: 'Helsinki' },
        { code: 'TAMPERE', name: 'Tampere' }
      ]
    },
    { code: 'OUL', name: 'Oulu', type: 'region',
      cities: [
        { code: 'OULU', name: 'Oulu' },
        { code: 'VANTAA', name: 'Vantaa' },
        { code: 'HELSINKI', name: 'Helsinki' },
        { code: 'TAMPERE', name: 'Tampere' },
        { code: 'TURKU', name: 'Turku' }
      ]
    },
    { code: 'VAN', name: 'Vantaa', type: 'region',
      cities: [
        { code: 'VANTAA', name: 'Vantaa' },
        { code: 'HELSINKI', name: 'Helsinki' },
        { code: 'TAMPERE', name: 'Tampere' },
        { code: 'TURKU', name: 'Turku' },
        { code: 'OULU', name: 'Oulu' }
      ]
    }
  ]
};
