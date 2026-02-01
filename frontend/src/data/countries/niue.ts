/**
 * Niue country data with villages and cities
 */

import { Country } from './index';

export const niue: Country = {
  code: 'NU',
  name: 'Niue',
  flag: '🇳🇺',
  capital: 'Alofi',
  area: 261,
  currencySymbol: '$',
  officialLanguages: ['English', 'Niuean'],
  demonym: 'Niuean',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'NZD', region: 'APAC' },
  divisions: [
    { code: 'ALO', name: 'Alofi', type: 'village',
      cities: [
        { code: 'ALOFI', name: 'Alofi' },
        { code: 'ALOFI-SOUTH', name: 'Alofi South' },
        { code: 'ALOFI-NORTH', name: 'Alofi North' },
        { code: 'ALOFI-EAST', name: 'Alofi East' },
        { code: 'ALOFI-WEST', name: 'Alofi West' }
      ]
    },
    { code: 'HAK', name: 'Hakupu', type: 'village',
      cities: [
        { code: 'HAKUPU', name: 'Hakupu' },
        { code: 'ALOFI-SOUTH', name: 'Alofi South' },
        { code: 'ALOFI-NORTH', name: 'Alofi North' },
        { code: 'ALOFI-EAST', name: 'Alofi East' },
        { code: 'ALOFI-WEST', name: 'Alofi West' }
      ]
    },
    { code: 'LAK', name: 'Lakepa', type: 'village',
      cities: [
        { code: 'LAKEPA', name: 'Lakepa' },
        { code: 'ALOFI-SOUTH', name: 'Alofi South' },
        { code: 'ALOFI-NORTH', name: 'Alofi North' },
        { code: 'ALOFI-EAST', name: 'Alofi East' },
        { code: 'ALOFI-WEST', name: 'Alofi West' }
      ]
    },
    { code: 'LIK', name: 'Liku', type: 'village',
      cities: [
        { code: 'LIKU', name: 'Liku' },
        { code: 'ALOFI-SOUTH', name: 'Alofi South' },
        { code: 'ALOFI-NORTH', name: 'Alofi North' },
        { code: 'ALOFI-EAST', name: 'Alofi East' },
        { code: 'ALOFI-WEST', name: 'Alofi West' }
      ]
    },
    { code: 'MUT', name: 'Mutalau', type: 'village',
      cities: [
        { code: 'MUTALAU', name: 'Mutalau' },
        { code: 'ALOFI-SOUTH', name: 'Alofi South' },
        { code: 'ALOFI-NORTH', name: 'Alofi North' },
        { code: 'ALOFI-EAST', name: 'Alofi East' },
        { code: 'ALOFI-WEST', name: 'Alofi West' }
      ]
    }
  ]
};
