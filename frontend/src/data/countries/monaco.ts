/**
 * Monaco country data with wards, cities, and tax information
 */

import { Country } from './index';

export const monaco: Country = {
  code: 'MC',
  name: 'Monaco',
  taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'EUR', region: 'EU' },
  provinces: [
    { code: 'MONACO_VILLE', name: 'Monaco-Ville',
      cities: [
        { code: 'MONACO_VILLE', name: 'Monaco-Ville' },
        { code: 'LE_PORTIER', name: 'Le Portier' },
        { code: 'LA_CONDAMINE', name: 'La Condamine' }
      ]
    },
    { code: 'MONTE_CARLO', name: 'Monte Carlo',
      cities: [
        { code: 'MONTE_CARLO', name: 'Monte Carlo' },
        { code: 'LARVOTTO', name: 'Larvotto' },
        { code: 'SAINT_ROMAN', name: 'Saint Roman' }
      ]
    },
    { code: 'LA_CONDAMINE', name: 'La Condamine',
      cities: [
        { code: 'LA_CONDAMINE', name: 'La Condamine' },
        { code: 'LES_MONEGHETTI', name: 'Les Moneghetti' },
        { code: 'LES_REVOIRES', name: 'Les Révoires' }
      ]
    },
    { code: 'FONTVIEILLE', name: 'Fontvieille',
      cities: [
        { code: 'FONTVIEILLE', name: 'Fontvieille' },
        { code: 'LE_PORTIER', name: 'Le Portier' }
      ]
    }
  ]
};

export default monaco;
