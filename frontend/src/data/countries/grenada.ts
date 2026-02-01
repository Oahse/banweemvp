/**
 * Grenada country data with parishes and cities
 */

import { Country } from './index';

export const grenada: Country = {
  code: 'GD',
  name: 'Grenada',
  flag: '🇬🇩',
  capital: 'St. George\'s',
  area: 344,
  currencySymbol: '$',
  officialLanguages: ['English', 'Grenadian Creole'],
  demonym: 'Grenadian',
  taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'XCD', region: 'NA' },
  divisions: [
    { code: 'STG', name: 'St. George\'s', type: 'parish',
      cities: [
        { code: 'STGEORGE', name: 'St. George\'s' },
        { code: 'GOUYAVE', name: 'Gouyave' },
        { code: 'GRENVILLE', name: 'Grenville' },
        { code: 'VICTORIA', name: 'Victoria' },
        { code: 'SAUTEURS', name: 'Sauteurs' }
      ]
    },
    { code: 'GOU', name: 'Gouyave', type: 'parish',
      cities: [
        { code: 'GOUYAVE', name: 'Gouyave' },
        { code: 'GRENVILLE', name: 'Grenville' },
        { code: 'VICTORIA', name: 'Victoria' },
        { code: 'SAUTEURS', name: 'Sauteurs' },
        { code: 'STGEORGE', name: 'St. George\'s' }
      ]
    },
    { code: 'GRE', name: 'Grenville', type: 'parish',
      cities: [
        { code: 'GRENVILLE', name: 'Grenville' },
        { code: 'VICTORIA', name: 'Victoria' },
        { code: 'SAUTEURS', name: 'Sauteurs' },
        { code: 'STGEORGE', name: 'St. George\'s' },
        { code: 'GOUYAVE', name: 'Gouyave' }
      ]
    },
    { code: 'VIC', name: 'Victoria', type: 'parish',
      cities: [
        { code: 'VICTORIA', name: 'Victoria' },
        { code: 'SAUTEURS', name: 'Sauteurs' },
        { code: 'STGEORGE', name: 'St. George\'s' },
        { code: 'GOUYAVE', name: 'Gouyave' },
        { code: 'GRENVILLE', name: 'Grenville' }
      ]
    },
    { code: 'SAU', name: 'Sauteurs', type: 'parish',
      cities: [
        { code: 'SAUTEURS', name: 'Sauteurs' },
        { code: 'STGEORGE', name: 'St. George\'s' },
        { code: 'GOUYAVE', name: 'Gouyave' },
        { code: 'GRENVILLE', name: 'Grenville' },
        { code: 'VICTORIA', name: 'Victoria' }
      ]
    }
  ]
};
