/**
 * El Salvador country data with departments and cities
 */

import { Country } from './index';

export const elsalvador: Country = {
  code: 'SV',
  name: 'El Salvador',
  flag: '🇸🇻',
  capital: 'San Salvador',
  area: 21041,
  currencySymbol: '$',
  officialLanguages: ['Spanish'],
  demonym: 'Salvadoran',
  taxInfo: { standardRate: 13, taxName: 'VAT', currency: 'USD', region: 'NA' },
  divisions: [
    { code: 'SAN', name: 'San Salvador', type: 'department',
      cities: [
        { code: 'SAN', name: 'San Salvador' },
        { code: 'SANTA', name: 'Santa Tecla' },
        { code: 'SOYAPANGO', name: 'Soyapango' },
        { code: 'MEJICANOS', name: 'Mejicanos' },
        { code: 'SAN2', name: 'San Marcos' }
      ]
    },
    { code: 'SANT', name: 'Santa Tecla', type: 'department',
      cities: [
        { code: 'SANTA', name: 'Santa Tecla' },
        { code: 'SOYAPANGO', name: 'Soyapango' },
        { code: 'MEJICANOS', name: 'Mejicanos' },
        { code: 'SAN2', name: 'San Marcos' },
        { code: 'SAN', name: 'San Salvador' }
      ]
    },
    { code: 'SOY', name: 'Soyapango', type: 'department',
      cities: [
        { code: 'SOYAPANGO', name: 'Soyapango' },
        { code: 'MEJICANOS', name: 'Mejicanos' },
        { code: 'SAN2', name: 'San Marcos' },
        { code: 'SAN', name: 'San Salvador' },
        { code: 'SANTA', name: 'Santa Tecla' }
      ]
    },
    { code: 'MEJ', name: 'Mejicanos', type: 'department',
      cities: [
        { code: 'MEJICANOS', name: 'Mejicanos' },
        { code: 'SAN2', name: 'San Marcos' },
        { code: 'SAN', name: 'San Salvador' },
        { code: 'SANTA', name: 'Santa Tecla' },
        { code: 'SOYAPANGO', name: 'Soyapango' }
      ]
    },
    { code: 'SAN2', name: 'San Marcos', type: 'department',
      cities: [
        { code: 'SAN2', name: 'San Marcos' },
        { code: 'SAN', name: 'San Salvador' },
        { code: 'SANTA', name: 'Santa Tecla' },
        { code: 'SOYAPANGO', name: 'Soyapango' },
        { code: 'MEJICANOS', name: 'Mejicanos' }
      ]
    }
  ]
};
