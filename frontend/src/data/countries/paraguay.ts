/**
 * Paraguay country data with departments and cities
 */

import { Country } from './index';

export const paraguay: Country = {
  code: 'PY',
  name: 'Paraguay',
  flag: '🇵🇾',
  capital: 'Asunción',
  area: 406752,
  currencySymbol: '₲',
  officialLanguages: ['Spanish', 'Guaraní'],
  demonym: 'Paraguayan',
  taxInfo: { standardRate: 10, taxName: 'IVA', currency: 'PYG', region: 'LATAM' },
  divisions: [
    { code: 'ASU', name: 'Asunción', type: 'department',
      cities: [
        { code: 'ASUNCION', name: 'Asunción' },
        { code: 'CIUDAD DEL ESTE', name: 'Ciudad del Este' },
        { code: 'SAN LORENZO', name: 'San Lorenzo' },
        { code: 'LUQUE', name: 'Luque' },
        { code: 'CAPIATA', name: 'Capiatá' }
      ]
    },
    { code: 'CDE', name: 'Ciudad del Este', type: 'department',
      cities: [
        { code: 'CIUDAD DEL ESTE', name: 'Ciudad del Este' },
        { code: 'SAN LORENZO', name: 'San Lorenzo' },
        { code: 'LUQUE', name: 'Luque' },
        { code: 'CAPIATA', name: 'Capiatá' },
        { code: 'ASUNCION', name: 'Asunción' }
      ]
    },
    { code: 'SLO', name: 'San Lorenzo', type: 'department',
      cities: [
        { code: 'SAN LORENZO', name: 'San Lorenzo' },
        { code: 'LUQUE', name: 'Luque' },
        { code: 'CAPIATA', name: 'Capiatá' },
        { code: 'ASUNCION', name: 'Asunción' },
        { code: 'CIUDAD DEL ESTE', name: 'Ciudad del Este' }
      ]
    },
    { code: 'LUQ', name: 'Luque', type: 'department',
      cities: [
        { code: 'LUQUE', name: 'Luque' },
        { code: 'CAPIATA', name: 'Capiatá' },
        { code: 'ASUNCION', name: 'Asunción' },
        { code: 'CIUDAD DEL ESTE', name: 'Ciudad del Este' },
        { code: 'SAN LORENZO', name: 'San Lorenzo' }
      ]
    },
    { code: 'CAP', name: 'Capiatá', type: 'department',
      cities: [
        { code: 'CAPIATA', name: 'Capiatá' },
        { code: 'ASUNCION', name: 'Asunción' },
        { code: 'CIUDAD DEL ESTE', name: 'Ciudad del Este' },
        { code: 'SAN LORENZO', name: 'San Lorenzo' },
        { code: 'LUQUE', name: 'Luque' }
      ]
    }
  ]
};
