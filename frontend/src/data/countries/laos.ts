/**
 * Laos country data with provinces and cities
 */

import { Country } from './index';

export const laos: Country = {
  code: 'LA',
  name: 'Laos',
  flag: '🇱🇦',
  capital: 'Vientiane',
  area: 236800,
  currencySymbol: '₭',
  officialLanguages: ['Lao'],
  demonym: 'Laotian',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'USD', region: 'APAC' },
  divisions: [
    { code: 'VIE', name: 'Vientiane', type: 'province',
      cities: [
        { code: 'VIENTIANE', name: 'Vientiane' },
        { code: 'LUANG', name: 'Luang Prabang' },
        { code: 'SAVANNAKHET', name: 'Savannakhet' },
        { code: 'PAKSE', name: 'Pakse' },
        { code: 'THAKHAEK', name: 'Thakhek' }
      ]
    },
    { code: 'LUA', name: 'Luang Prabang', type: 'province',
      cities: [
        { code: 'LUANG', name: 'Luang Prabang' },
        { code: 'SAVANNAKHET', name: 'Savannakhet' },
        { code: 'PAKSE', name: 'Pakse' },
        { code: 'THAKHAEK', name: 'Thakhek' },
        { code: 'VIENTIANE', name: 'Vientiane' }
      ]
    },
    { code: 'SAV', name: 'Savannakhet', type: 'province',
      cities: [
        { code: 'SAVANNAKHET', name: 'Savannakhet' },
        { code: 'PAKSE', name: 'Pakse' },
        { code: 'THAKHAEK', name: 'Thakhek' },
        { code: 'VIENTIANE', name: 'Vientiane' },
        { code: 'LUANG', name: 'Luang Prabang' }
      ]
    },
    { code: 'PAK', name: 'Pakse', type: 'province',
      cities: [
        { code: 'PAKSE', name: 'Pakse' },
        { code: 'THAKHAEK', name: 'Thakhek' },
        { code: 'VIENTIANE', name: 'Vientiane' },
        { code: 'LUANG', name: 'Luang Prabang' },
        { code: 'SAVANNAKHET', name: 'Savannakhet' }
      ]
    },
    { code: 'THA', name: 'Thakhek', type: 'province',
      cities: [
        { code: 'THAKHAEK', name: 'Thakhek' },
        { code: 'VIENTIANE', name: 'Vientiane' },
        { code: 'LUANG', name: 'Luang Prabang' },
        { code: 'SAVANNAKHET', name: 'Savannakhet' },
        { code: 'PAKSE', name: 'Pakse' }
      ]
    }
  ]
};

export default laos;
