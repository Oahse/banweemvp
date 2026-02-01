/**
 * Serbia country data with districts and cities
 */

import { Country } from './index';

export const serbia: Country = {
  code: 'RS',
  name: 'Serbia',
  flag: '🇷🇸',
  capital: 'Belgrade',
  area: 88361,
  currencySymbol: 'din',
  officialLanguages: ['Serbian'],
  demonym: 'Serbian',
  taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'RSD', region: 'EU' },
  divisions: [
    { code: 'BEL', name: 'Belgrade', type: 'district',
      cities: [
        { code: 'BELGRADE', name: 'Belgrade' },
        { code: 'NOVI SAD', name: 'Novi Sad' },
        { code: 'NIS', name: 'Niš' },
        { code: 'KRAGUJEVAC', name: 'Kragujevac' },
        { code: 'SUBOTICA', name: 'Subotica' }
      ]
    },
    { code: 'NOV', name: 'Novi Sad', type: 'district',
      cities: [
        { code: 'NOVI SAD', name: 'Novi Sad' },
        { code: 'NIS', name: 'Niš' },
        { code: 'KRAGUJEVAC', name: 'Kragujevac' },
        { code: 'SUBOTICA', name: 'Subotica' },
        { code: 'BELGRADE', name: 'Belgrade' }
      ]
    },
    { code: 'NIS', name: 'Niš', type: 'district',
      cities: [
        { code: 'NIS', name: 'Niš' },
        { code: 'KRAGUJEVAC', name: 'Kragujevac' },
        { code: 'SUBOTICA', name: 'Subotica' },
        { code: 'BELGRADE', name: 'Belgrade' },
        { code: 'NOVI SAD', name: 'Novi Sad' }
      ]
    },
    { code: 'KRA', name: 'Kragujevac', type: 'district',
      cities: [
        { code: 'KRAGUJEVAC', name: 'Kragujevac' },
        { code: 'SUBOTICA', name: 'Subotica' },
        { code: 'BELGRADE', name: 'Belgrade' },
        { code: 'NOVI SAD', name: 'Novi Sad' },
        { code: 'NIS', name: 'Niš' }
      ]
    },
    { code: 'SUB', name: 'Subotica', type: 'district',
      cities: [
        { code: 'SUBOTICA', name: 'Subotica' },
        { code: 'BELGRADE', name: 'Belgrade' },
        { code: 'NOVI SAD', name: 'Novi Sad' },
        { code: 'NIS', name: 'Niš' },
        { code: 'KRAGUJEVAC', name: 'Kragujevac' }
      ]
    }
  ]
};
