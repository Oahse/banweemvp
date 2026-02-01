/**
 * Mayotte country data with departments and cities
 */

import { Country } from './index';

export const mayotte: Country = {
  code: 'YT',
  name: 'Mayotte',
  flag: '🇾🇹',
  capital: 'Mamoudzou',
  area: 374,
  currencySymbol: '€',
  officialLanguages: ['French'],
  demonym: 'Mahoran',
  taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'EUR', region: 'MEA' },
  divisions: [
    { code: 'MAM', name: 'Mamoudzou', type: 'department',
      cities: [
        { code: 'MAMOUDZOU', name: 'Mamoudzou' },
        { code: 'KOU', name: 'Koungou' },
        { code: 'DZA', name: 'Dzaoudzi' },
        { code: 'SADA', name: 'Sada' },
        { code: 'BANDRELE', name: 'Bandrele' }
      ]
    },
    { code: 'KOU', name: 'Koungou', type: 'department',
      cities: [
        { code: 'KOUNGOU', name: 'Koungou' },
        { code: 'DZA', name: 'Dzaoudzi' },
        { code: 'SADA', name: 'Sada' },
        { code: 'BANDRELE', name: 'Bandrele' },
        { code: 'MAMOUDZOU', name: 'Mamoudzou' }
      ]
    },
    { code: 'DZA', name: 'Dzaoudzi', type: 'department',
      cities: [
        { code: 'DZAUDZI', name: 'Dzaoudzi' },
        { code: 'SADA', name: 'Sada' },
        { code: 'BANDRELE', name: 'Bandrele' },
        { code: 'MAMOUDZOU', name: 'Mamoudzou' },
        { code: 'KOUNGOU', name: 'Koungou' }
      ]
    },
    { code: 'SAD', name: 'Sada', type: 'department',
      cities: [
        { code: 'SADA', name: 'Sada' },
        { code: 'BANDRELE', name: 'Bandrele' },
        { code: 'MAMOUDZOU', name: 'Mamoudzou' },
        { code: 'KOUNGOU', name: 'Koungou' },
        { code: 'DZAUDZI', name: 'Dzaoudzi' }
      ]
    },
    { code: 'BAN', name: 'Bandrele', type: 'department',
      cities: [
        { code: 'BANDRELE', name: 'Bandrele' },
        { code: 'MAMOUDZOU', name: 'Mamoudzou' },
        { code: 'KOUNGOU', name: 'Koungou' },
        { code: 'DZAUDZI', name: 'Dzaoudzi' },
        { code: 'SADA', name: 'Sada' }
      ]
    }
  ]
};

export default mayotte;
