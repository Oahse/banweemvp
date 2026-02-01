/**
 * Georgia country data with regions and cities
 */

import { Country } from './index';

export const georgia: Country = {
  code: 'GE',
  name: 'Georgia',
  flag: '🇬🇪',
  capital: 'Tbilisi',
  area: 69700,
  currencySymbol: '₾',
  officialLanguages: ['Georgian'],
  demonym: 'Georgian',
  taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'GEL', region: 'MEA' },
  divisions: [
    { code: 'TBI', name: 'Tbilisi', type: 'region',
      cities: [
        { code: 'TBILISI', name: 'Tbilisi' },
        { code: 'KUTAISI', name: 'Kutaisi' },
        { code: 'BATUMI', name: 'Batumi' },
        { code: 'RUSTAVI', name: 'Rustavi' },
        { code: 'ZUGDIDI', name: 'Zugdidi' }
      ]
    },
    { code: 'KUT', name: 'Kutaisi', type: 'region',
      cities: [
        { code: 'KUTAISI', name: 'Kutaisi' },
        { code: 'BATUMI', name: 'Batumi' },
        { code: 'RUSTAVI', name: 'Rustavi' },
        { code: 'ZUGDIDI', name: 'Zugdidi' },
        { code: 'TBILISI', name: 'Tbilisi' }
      ]
    },
    { code: 'BAT', name: 'Batumi', type: 'region',
      cities: [
        { code: 'BATUMI', name: 'Batumi' },
        { code: 'RUSTAVI', name: 'Rustavi' },
        { code: 'ZUGDIDI', name: 'Zugdidi' },
        { code: 'TBILISI', name: 'Tbilisi' },
        { code: 'KUTAISI', name: 'Kutaisi' }
      ]
    },
    { code: 'RUS', name: 'Rustavi', type: 'region',
      cities: [
        { code: 'RUSTAVI', name: 'Rustavi' },
        { code: 'ZUGDIDI', name: 'Zugdidi' },
        { code: 'TBILISI', name: 'Tbilisi' },
        { code: 'KUTAISI', name: 'Kutaisi' },
        { code: 'BATUMI', name: 'Batumi' }
      ]
    },
    { code: 'ZUG', name: 'Zugdidi', type: 'region',
      cities: [
        { code: 'ZUGDIDI', name: 'Zugdidi' },
        { code: 'TBILISI', name: 'Tbilisi' },
        { code: 'KUTAISI', name: 'Kutaisi' },
        { code: 'BATUMI', name: 'Batumi' },
        { code: 'RUSTAVI', name: 'Rustavi' }
      ]
    }
  ]
};

export default georgia;
