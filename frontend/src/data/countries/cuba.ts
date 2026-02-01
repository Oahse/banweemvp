/**
 * Cuba country data with provinces and cities
 */

import { Country } from './index';

export const cuba: Country = {
  code: 'CU',
  name: 'Cuba',
  flag: '🇨🇺',
  capital: 'Havana',
  area: 109884,
  currencySymbol: '₱',
  officialLanguages: ['Spanish'],
  demonym: 'Cuban',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'USD', region: 'NA' },
  divisions: [
    { code: 'HAV', name: 'La Habana', type: 'province',
      cities: [
        { code: 'HAVANA', name: 'Havana' },
        { code: 'SANTIAGO', name: 'Santiago de Cuba' },
        { code: 'CAMAGUEY', name: 'Camagüey' },
        { code: 'HOLGUIN', name: 'Holguín' },
        { code: 'GUANTANAMO', name: 'Guantánamo' }
      ]
    },
    { code: 'SAN', name: 'Santiago de Cuba', type: 'province',
      cities: [
        { code: 'SANTIAGO', name: 'Santiago de Cuba' },
        { code: 'CAMAGUEY', name: 'Camagüey' },
        { code: 'HOLGUIN', name: 'Holguín' },
        { code: 'GUANTANAMO', name: 'Guantánamo' },
        { code: 'HAVANA', name: 'Havana' }
      ]
    },
    { code: 'CAM', name: 'Camagüey', type: 'province',
      cities: [
        { code: 'CAMAGUEY', name: 'Camagüey' },
        { code: 'HOLGUIN', name: 'Holguín' },
        { code: 'GUANTANAMO', name: 'Guantánamo' },
        { code: 'HAVANA', name: 'Havana' },
        { code: 'SANTIAGO', name: 'Santiago de Cuba' }
      ]
    },
    { code: 'HOL', name: 'Holguín', type: 'province',
      cities: [
        { code: 'HOLGUIN', name: 'Holguín' },
        { code: 'GUANTANAMO', name: 'Guantánamo' },
        { code: 'HAVANA', name: 'Havana' },
        { code: 'SANTIAGO', name: 'Santiago de Cuba' },
        { code: 'CAMAGUEY', name: 'Camagüey' }
      ]
    },
    { code: 'GUA', name: 'Guantánamo', type: 'province',
      cities: [
        { code: 'GUANTANAMO', name: 'Guantánamo' },
        { code: 'HAVANA', name: 'Havana' },
        { code: 'SANTIAGO', name: 'Santiago de Cuba' },
        { code: 'CAMAGUEY', name: 'Camagüey' },
        { code: 'HOLGUIN', name: 'Holguín' }
      ]
    }
  ]
};
