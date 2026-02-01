/**
 * Costa Rica country data with provinces and cities
 */

import { Country } from './index';

export const costarica: Country = {
  code: 'CR',
  name: 'Costa Rica',
  flag: '🇨🇷',
  capital: 'San José',
  area: 51100,
  currencySymbol: '₡',
  officialLanguages: ['Spanish'],
  demonym: 'Costa Rican',
  taxInfo: { standardRate: 13, taxName: 'VAT', currency: 'CRC', region: 'NA' },
  divisions: [
    { code: 'SAN', name: 'San José', type: 'province',
      cities: [
        { code: 'SAN', name: 'San José' },
        { code: 'ALAJUELA', name: 'Alajuela' },
        { code: 'CARTAGO', name: 'Cartago' },
        { code: 'HEREDIA', name: 'Heredia' },
        { code: 'PUNTARENAS', name: 'Puntarenas' }
      ]
    },
    { code: 'ALA', name: 'Alajuela', type: 'province',
      cities: [
        { code: 'ALAJUELA', name: 'Alajuela' },
        { code: 'CARTAGO', name: 'Cartago' },
        { code: 'HEREDIA', name: 'Heredia' },
        { code: 'PUNTARENAS', name: 'Puntarenas' },
        { code: 'SAN', name: 'San José' }
      ]
    },
    { code: 'CAR', name: 'Cartago', type: 'province',
      cities: [
        { code: 'CARTAGO', name: 'Cartago' },
        { code: 'HEREDIA', name: 'Heredia' },
        { code: 'PUNTARENAS', name: 'Puntarenas' },
        { code: 'SAN', name: 'San José' },
        { code: 'ALAJUELA', name: 'Alajuela' }
      ]
    },
    { code: 'HER', name: 'Heredia', type: 'province',
      cities: [
        { code: 'HEREDIA', name: 'Heredia' },
        { code: 'PUNTARENAS', name: 'Puntarenas' },
        { code: 'SAN', name: 'San José' },
        { code: 'ALAJUELA', name: 'Alajuela' },
        { code: 'CARTAGO', name: 'Cartago' }
      ]
    },
    { code: 'PUN', name: 'Puntarenas', type: 'province',
      cities: [
        { code: 'PUNTARENAS', name: 'Puntarenas' },
        { code: 'SAN', name: 'San José' },
        { code: 'ALAJUELA', name: 'Alajuela' },
        { code: 'CARTAGO', name: 'Cartago' },
        { code: 'HEREDIA', name: 'Heredia' }
      ]
    }
  ]
};
