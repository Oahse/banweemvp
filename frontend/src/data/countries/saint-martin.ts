/**
 * Saint Martin country data with arrondissements and cities
 */

import { Country } from './index';

export const saintmartin: Country = {
  code: 'MF',
  name: 'Saint Martin',
  flag: '🇲🇫',
  capital: 'Marigot',
  area: 54,
  currencySymbol: '€',
  officialLanguages: ['French', 'English'],
  demonym: 'Saint-Martinois',
  taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'EUR', region: 'MEA' },
  divisions: [
    { code: 'MAR', name: 'Marigot', type: 'arrondissement',
      cities: [
        { code: 'MARIGOT', name: 'Marigot' },
        { code: 'GRAND', name: 'Grand Case' },
        { code: 'QUARTIER', name: 'Quartier d\'Orléans' },
        { code: 'SIMPSON', name: 'Simpson Bay' },
        { code: 'LOWLANDS', name: 'Lowlands' }
      ]
    },
    { code: 'GRA', name: 'Grand Case', type: 'arrondissement',
      cities: [
        { code: 'GRAND', name: 'Grand Case' },
        { code: 'QUARTIER', name: 'Quartier d\'Orléans' },
        { code: 'SIMPSON', name: 'Simpson Bay' },
        { code: 'LOWLANDS', name: 'Lowlands' },
        { code: 'MARIGOT', name: 'Marigot' }
      ]
    },
    { code: 'QUA', name: 'Quartier d\'Orléans', type: 'arrondissement',
      cities: [
        { code: 'QUARTIER', name: 'Quartier d\'Orléans' },
        { code: 'SIMPSON', name: 'Simpson Bay' },
        { code: 'LOWLANDS', name: 'Lowlands' },
        { code: 'MARIGOT', name: 'Marigot' },
        { code: 'GRAND', name: 'Grand Case' }
      ]
    },
    { code: 'SIM', name: 'Simpson Bay', type: 'arrondissement',
      cities: [
        { code: 'SIMPSON', name: 'Simpson Bay' },
        { code: 'LOWLANDS', name: 'Lowlands' },
        { code: 'MARIGOT', name: 'Marigot' },
        { code: 'GRAND', name: 'Grand Case' },
        { code: 'QUARTIER', name: 'Quartier d\'Orléans' }
      ]
    },
    { code: 'LOW', name: 'Lowlands', type: 'arrondissement',
      cities: [
        { code: 'LOWLANDS', name: 'Lowlands' },
        { code: 'MARIGOT', name: 'Marigot' },
        { code: 'GRAND', name: 'Grand Case' },
        { code: 'QUARTIER', name: 'Quartier d\'Orléans' },
        { code: 'SIMPSON', name: 'Simpson Bay' }
      ]
    }
  ]
};

export default saintmartin;
