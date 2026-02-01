/**
 * Guadeloupe country data with arrondissements and cities
 */

import { Country } from './index';

export const guadeloupe: Country = {
  code: 'GP',
  name: 'Guadeloupe',
  flag: '🇬🇵',
  capital: 'Basse-Terre',
  area: 1628,
  currencySymbol: '€',
  officialLanguages: ['French', 'Guadeloupean Creole'],
  demonym: 'Guadeloupean',
  taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'EUR', region: 'LATAM' },
  divisions: [
    { code: 'BAS', name: 'Basse-Terre', type: 'arrondissement',
      cities: [
        { code: 'BASSE', name: 'Basse-Terre' },
        { code: 'POINTE', name: 'Pointe-à-Pitre' },
        { code: 'LE MOULE', name: 'Le Moule' },
        { code: 'SAINT-Claude', name: 'Saint-Claude' },
        { code: 'DESHAIES', name: 'Les Abymes' }
      ]
    },
    { code: 'POI', name: 'Pointe-à-Pitre', type: 'arrondissement',
      cities: [
        { code: 'POINTE', name: 'Pointe-à-Pitre' },
        { code: 'LE MOULE', name: 'Le Moule' },
        { code: 'SAINT-Claude', name: 'Saint-Claude' },
        { code: 'DESHAIES', name: 'Les Abymes' },
        { code: 'BASSE', name: 'Basse-Terre' }
      ]
    },
    { code: 'LE', name: 'Le Moule', type: 'arrondissement',
      cities: [
        { code: 'LE MOULE', name: 'Le Moule' },
        { code: 'SAINT-Claude', name: 'Saint-Claude' },
        { code: 'DESHAIES', name: 'Les Abymes' },
        { code: 'BASSE', name: 'Basse-Terre' },
        { code: 'POINTE', name: 'Pointe-à-Pitre' }
      ]
    },
    { code: 'SAI', name: 'Saint-Claude', type: 'arrondissement',
      cities: [
        { code: 'SAINT-Claude', name: 'Saint-Claude' },
        { code: 'DESHAIES', name: 'Les Abymes' },
        { code: 'BASSE', name: 'Basse-Terre' },
        { code: 'POINTE', name: 'Pointe-à-Pitre' },
        { code: 'LE MOULE', name: 'Le Moule' }
      ]
    },
    { code: 'DES', name: 'Les Abymes', type: 'arrondissement',
      cities: [
        { code: 'DESHAIES', name: 'Les Abymes' },
        { code: 'BASSE', name: 'Basse-Terre' },
        { code: 'POINTE', name: 'Pointe-à-Pitre' },
        { code: 'LE MOULE', name: 'Le Moule' },
        { code: 'SAINT-Claude', name: 'Saint-Claude' }
      ]
    }
  ]
};
