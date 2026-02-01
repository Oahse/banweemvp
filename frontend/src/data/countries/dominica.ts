/**
 * Dominica country data with parishes, cities, and tax information
 */

import { Country } from './index';

export const dominica: Country = {
  code: 'DM',
  name: 'Dominica',
  flag: '🇩🇲',
  capital: 'Roseau',
  area: 751,
  currencySymbol: '$',
  officialLanguages: ['English'],
  demonym: 'Dominican',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'XCD', region: 'NA' },
  divisions: [
    { code: 'SA', name: 'Saint Andrew', type: 'parish',
      cities: [
        { code: 'MA', name: 'Marigot' },
        { code: 'WE', name: 'Wesley' }
      ]
    },
    { code: 'SD', name: 'Saint David', type: 'parish',
      cities: [
        { code: 'RO', name: 'Roseau' },
        { code: 'CA', name: 'Castle Bruce' }
      ]
    },
    { code: 'SG', name: 'Saint George', type: 'parish',
      cities: [
        { code: 'RO2', name: 'Roseau' },
        { code: 'PO', name: 'Portsmouth' }
      ]
    },
    { code: 'SJ', name: 'Saint John', type: 'parish',
      cities: [
        { code: 'PO2', name: 'Portsmouth' },
        { code: 'CO', name: 'Colihaut' }
      ]
    },
    { code: 'SJ2', name: 'Saint Joseph', type: 'parish',
      cities: [
        { code: 'SJ3', name: 'Saint Joseph' },
        { code: 'SA2', name: 'Salisbury' }
      ]
    },
    { code: 'SL', name: 'Saint Luke', type: 'parish',
      cities: [
        { code: 'PO3', name: 'Pointe Michel' },
        { code: 'SO', name: 'Soufrière' }
      ]
    },
    { code: 'SM', name: 'Saint Mark', type: 'parish',
      cities: [
        { code: 'SU', name: 'Savanne Paille' },
        { code: 'SC', name: 'Scotts Head' }
      ]
    },
    { code: 'SP', name: 'Saint Patrick', type: 'parish',
      cities: [
        { code: 'GR', name: 'Grand Bay' },
        { code: 'LA', name: 'La Plaine' }
      ]
    },
    { code: 'TE', name: 'Saint Paul', type: 'parish',
      cities: [
        { code: 'CO2', name: 'Coconut Hill' },
        { code: 'MA2', name: 'Mahaut' }
      ]
    },
    { code: 'PE', name: 'Saint Peter', type: 'parish',
      cities: [
        { code: 'PE2', name: 'Petite Savanne' },
        { code: 'BE', name: 'Berekua' }
      ]
    }
  ]
};

export default dominica;
