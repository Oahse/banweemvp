/**
 * Monaco country data with wards and cities
 */

import { Country } from './index';

export const monaco: Country = {
  code: 'MC',
  name: 'Monaco',
  flag: '🇲🇨',
  capital: 'Monaco',
  area: 2,
  currencySymbol: '€',
  officialLanguages: ['French'],
  demonym: 'Monegasque',
  taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'EUR', region: 'EU' },
  divisions: [
    { code: 'MON', name: 'Monaco-Ville', type: 'ward',
      cities: [
        { code: 'MONACO-VILLE', name: 'Monaco-Ville' },
        { code: 'MONTE-CARLO', name: 'Monte Carlo' },
        { code: 'LA CONDAMINE', name: 'La Condamine' },
        { code: 'FONTVIEILLE', name: 'Fontvieille' },
        { code: 'LARVOTTO', name: 'Larvotto' }
      ]
    },
    { code: 'MONTE', name: 'Monte Carlo', type: 'ward',
      cities: [
        { code: 'MONTE-CARLO', name: 'Monte Carlo' },
        { code: 'LA CONDAMINE', name: 'La Condamine' },
        { code: 'FONTVIEILLE', name: 'Fontvieille' },
        { code: 'LARVOTTO', name: 'Larvotto' },
        { code: 'MONACO-VILLE', name: 'Monaco-Ville' }
      ]
    },
    { code: 'LAC', name: 'La Condamine', type: 'ward',
      cities: [
        { code: 'LA CONDAMINE', name: 'La Condamine' },
        { code: 'FONTVIEILLE', name: 'Fontvieille' },
        { code: 'LARVOTTO', name: 'Larvotto' },
        { code: 'MONACO-VILLE', name: 'Monaco-Ville' },
        { code: 'MONTE-CARLO', name: 'Monte Carlo' }
      ]
    },
    { code: 'FON', name: 'Fontvieille', type: 'ward',
      cities: [
        { code: 'FONTVIEILLE', name: 'Fontvieille' },
        { code: 'LARVOTTO', name: 'Larvotto' },
        { code: 'MONACO-VILLE', name: 'Monaco-Ville' },
        { code: 'MONTE-CARLO', name: 'Monte Carlo' },
        { code: 'LA CONDAMINE', name: 'La Condamine' }
      ]
    },
    { code: 'LAR', name: 'Larvotto', type: 'ward',
      cities: [
        { code: 'LARVOTTO', name: 'Larvotto' },
        { code: 'MONACO-VILLE', name: 'Monaco-Ville' },
        { code: 'MONTE-CARLO', name: 'Monte Carlo' },
        { code: 'LA CONDAMINE', name: 'La Condamine' },
        { code: 'FONTVIEILLE', name: 'Fontvieille' }
      ]
    }
  ]
};
