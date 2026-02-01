/**
 * Nauru country data with districts and cities
 */

import { Country } from './index';

export const nauru: Country = {
  code: 'NR',
  name: 'Nauru',
  flag: '🇳🇷',
  capital: 'Yaren',
  area: 21,
  currencySymbol: '$',
  officialLanguages: ['English', 'Nauruan'],
  demonym: 'Nauruan',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'USD', region: 'APAC' },
  divisions: [
    { code: 'YAR', name: 'Yaren', type: 'district',
      cities: [
        { code: 'YAREN', name: 'Yaren' },
        { code: 'AIWO', name: 'Aiwo' },
        { code: 'BUADA', name: 'Buada' },
        { code: 'ANETAN', name: 'Anetan' },
        { code: 'MENENG', name: 'Meneng' }
      ]
    },
    { code: 'AIW', name: 'Aiwo', type: 'district',
      cities: [
        { code: 'AIWO', name: 'Aiwo' },
        { code: 'BUADA', name: 'Buada' },
        { code: 'ANETAN', name: 'Anetan' },
        { code: 'MENENG', name: 'Meneng' },
        { code: 'YAREN', name: 'Yaren' }
      ]
    },
    { code: 'BUA', name: 'Buada', type: 'district',
      cities: [
        { code: 'BUADA', name: 'Buada' },
        { code: 'ANETAN', name: 'Anetan' },
        { code: 'MENENG', name: 'Meneng' },
        { code: 'YAREN', name: 'Yaren' },
        { code: 'AIWO', name: 'Aiwo' }
      ]
    },
    { code: 'ANE', name: 'Anetan', type: 'district',
      cities: [
        { code: 'ANETAN', name: 'Anetan' },
        { code: 'MENENG', name: 'Meneng' },
        { code: 'YAREN', name: 'Yaren' },
        { code: 'AIWO', name: 'Aiwo' },
        { code: 'BUADA', name: 'Buada' }
      ]
    },
    { code: 'MEN', name: 'Meneng', type: 'district',
      cities: [
        { code: 'MENENG', name: 'Meneng' },
        { code: 'YAREN', name: 'Yaren' },
        { code: 'AIWO', name: 'Aiwo' },
        { code: 'BUADA', name: 'Buada' },
        { code: 'ANETAN', name: 'Anetan' }
      ]
    }
  ]
};
