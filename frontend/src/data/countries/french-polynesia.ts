/**
 * French Polynesia country data with archipelagos and cities
 */

import { Country } from './index';

export const frenchpolynesia: Country = {
  code: 'PF',
  name: 'French Polynesia',
  flag: '🇵🇫',
  capital: 'Papeete',
  area: 4167,
  currencySymbol: '₣�',
  officialLanguages: ['French', 'Tahitian'],
  demonym: 'French Polynesian',
  taxInfo: { standardRate: 16, taxName: 'VAT', currency: 'XPF', region: 'APAC' },
  divisions: [
    { code: 'PAP', name: 'Windward Islands', type: 'archipelago',
      cities: [
        { code: 'PAPEETE', name: 'Papeete' },
        { code: 'BORA BORA', name: 'Bora Bora' },
        { code: 'MOOREA', name: 'Moorea' },
        { code: 'HUAHINE', name: 'Huahine' },
        { code: 'RAIATEA', name: 'Raitea' }
      ]
    },
    { code: 'BOR', name: 'Leeward Islands', type: 'archipelago',
      cities: [
        { code: 'BORA BORA', name: 'Bora Bora' },
        { code: 'MOOREA', name: 'Moorea' },
        { code: 'HUAHINE', name: 'Huahine' },
        { code: 'RAIATEA', name: 'Raitea' },
        { code: 'PAPEETE', name: 'Papeete' }
      ]
    },
    { code: 'MOO', name: 'Society Islands', type: 'archipelago',
      cities: [
        { code: 'MOOREA', name: 'Moorea' },
        { code: 'HUAHINE', name: 'Huahine' },
        { code: 'RAIATEA', name: 'Raitea' },
        { code: 'PAPEETE', name: 'Papeete' },
        { code: 'BORA BORA', name: 'Bora Bora' }
      ]
    },
    { code: 'HUA', name: 'Austral Islands', type: 'archipelago',
      cities: [
        { code: 'HUAHINE', name: 'Huahine' },
        { code: 'RAIATEA', name: 'Raitea' },
        { code: 'PAPEETE', name: 'Papeete' },
        { code: 'BORA BORA', name: 'Bora Bora' },
        { code: 'MOOREA', name: 'Moorea' }
      ]
    },
    { code: 'RAI', name: 'Marquesas Islands', type: 'archipelago',
      cities: [
        { code: 'RAIATEA', name: 'Raitea' },
        { code: 'PAPEETE', name: 'Papeete' },
        { code: 'BORA BORA', name: 'Bora Bora' },
        { code: 'MOOREA', name: 'Moorea' },
        { code: 'HUAHINE', name: 'Huahine' }
      ]
    }
  ]
};
