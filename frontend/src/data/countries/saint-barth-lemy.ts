/**
 * Saint Barthélemy country data with arrondissements and cities
 */

import { Country } from './index';

export const saintbarthlemy: Country = {
  code: 'BL',
  name: 'Saint Barthélemy',
  flag: '🇧🇱',
  capital: 'Gustavia',
  area: 21,
  currencySymbol: '€',
  officialLanguages: ['French'],
  demonym: 'Barthélemois',
  taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'EUR', region: 'MEA' },
  divisions: [
    { code: 'GUS', name: 'Gustavia', type: 'arrondissement',
      cities: [
        { code: 'GUSTAVIA', name: 'Gustavia' },
        { code: 'SAINT', name: 'Saint-Jean' },
        { code: 'LORIENT', name: 'Lorient' },
        { code: 'GRAND', name: 'Grand Fond' },
        { code: 'ANSE', name: 'Anse des Cayes' }
      ]
    },
    { code: 'SAI', name: 'Saint-Jean', type: 'arrondissement',
      cities: [
        { code: 'SAINT', name: 'Saint-Jean' },
        { code: 'LORIENT', name: 'Lorient' },
        { code: 'GRAND', name: 'Grand Fond' },
        { code: 'ANSE', name: 'Anse des Cayes' },
        { code: 'GUSTAVIA', name: 'Gustavia' }
      ]
    },
    { code: 'LOR', name: 'Lorient', type: 'arrondissement',
      cities: [
        { code: 'LORIENT', name: 'Lorient' },
        { code: 'GRAND', name: 'Grand Fond' },
        { code: 'ANSE', name: 'Anse des Cayes' },
        { code: 'GUSTAVIA', name: 'Gustavia' },
        { code: 'SAINT', name: 'Saint-Jean' }
      ]
    },
    { code: 'GRA', name: 'Grand Fond', type: 'arrondissement',
      cities: [
        { code: 'GRAND', name: 'Grand Fond' },
        { code: 'ANSE', name: 'Anse des Cayes' },
        { code: 'GUSTAVIA', name: 'Gustavia' },
        { code: 'SAINT', name: 'Saint-Jean' },
        { code: 'LORIENT', name: 'Lorient' }
      ]
    },
    { code: 'ANS', name: 'Anse des Cayes', type: 'arrondissement',
      cities: [
        { code: 'ANSE', name: 'Anse des Cayes' },
        { code: 'GUSTAVIA', name: 'Gustavia' },
        { code: 'SAINT', name: 'Saint-Jean' },
        { code: 'LORIENT', name: 'Lorient' },
        { code: 'GRAND', name: 'Grand Fond' }
      ]
    }
  ]
};

export default saintbarthlemy;
