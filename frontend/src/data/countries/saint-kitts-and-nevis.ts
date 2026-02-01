/**
 * Saint Kitts and Nevis country data with parishes and cities
 */

import { Country } from './index';

export const saintkittsandnevis: Country = {
  code: 'KN',
  name: 'Saint Kitts and Nevis',
  flag: '🇰🇳',
  capital: 'Basseterre',
  area: 261,
  currencySymbol: '$',
  officialLanguages: ['English'],
  demonym: 'Kittitian',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'USD', region: 'MEA' },
  divisions: [
    { code: 'KITT', name: 'Saint Kitts', type: 'parish',
      cities: [
        { code: 'BASSERRE', name: 'Basseterre' },
        { code: 'CHARLESTOWN', name: 'Charlestown' },
        {code: 'CAYON', name: 'Cayon'},
        { code: 'SANDY', name: 'Sandy Point' },
        { code: 'OLD', name: 'Old Road Town' }
      ]
    },
    { code: 'NEV', name: 'Nevis', type: 'parish',
      cities: [
        { code: 'CHARLESTOWN', name: 'Charlestown' },
        { code: 'CAYON', name: 'Cayon' },
        { code: 'NEWCASTLE', name: 'Newcastle' },
        {code: 'GOLDENROCK', name: 'Golden Rock'},
        { code: 'GINGERLAND', name: 'Gingerland' }
      ]
    }
  ]
};

export default saintkittsandnevis;
