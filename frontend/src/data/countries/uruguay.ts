/**
 * Uruguay country data with departments and cities
 */

import { Country } from './index';

export const uruguay: Country = {
  code: 'UY',
  name: 'Uruguay',
  flag: '🇺🇾',
  capital: 'Montevideo',
  area: 176215,
  currencySymbol: '$',
  officialLanguages: ['Spanish'],
  demonym: 'Uruguayan',
  taxInfo: { standardRate: 22, taxName: 'IVA', currency: 'UYU', region: 'LATAM' },
  divisions: [
    { code: 'MON', name: 'Montevideo', type: 'department',
      cities: [
        { code: 'MONTEVIDEO', name: 'Montevideo' },
        { code: 'SALTO', name: 'Salto' },
        { code: 'PAYSANDU', name: 'Paysandú' },
        { code: 'LAS PIEDRAS', name: 'Las Piedras' },
        { code: 'RIVERA', name: 'Rivera' }
      ]
    },
    { code: 'SAL', name: 'Salto', type: 'department',
      cities: [
        { code: 'SALTO', name: 'Salto' },
        { code: 'PAYSANDU', name: 'Paysandú' },
        { code: 'LAS PIEDRAS', name: 'Las Piedras' },
        { code: 'RIVERA', name: 'Rivera' },
        { code: 'MONTEVIDEO', name: 'Montevideo' }
      ]
    },
    { code: 'PAY', name: 'Paysandú', type: 'department',
      cities: [
        { code: 'PAYSANDU', name: 'Paysandú' },
        { code: 'LAS PIEDRAS', name: 'Las Piedras' },
        { code: 'RIVERA', name: 'Rivera' },
        { code: 'MONTEVIDEO', name: 'Montevideo' },
        { code: 'SALTO', name: 'Salto' }
      ]
    },
    { code: 'LAS', name: 'Las Piedras', type: 'department',
      cities: [
        { code: 'LAS PIEDRAS', name: 'Las Piedras' },
        { code: 'RIVERA', name: 'Rivera' },
        { code: 'MONTEVIDEO', name: 'Montevideo' },
        { code: 'SALTO', name: 'Salto' },
        { code: 'PAYSANDU', name: 'Paysandú' }
      ]
    },
    { code: 'RIV', name: 'Rivera', type: 'department',
      cities: [
        { code: 'RIVERA', name: 'Rivera' },
        { code: 'MONTEVIDEO', name: 'Montevideo' },
        { code: 'SALTO', name: 'Salto' },
        { code: 'PAYSANDU', name: 'Paysandú' },
        { code: 'LAS PIEDRAS', name: 'Las Piedras' }
      ]
    }
  ]
};
