/**
 * Albania country data with counties and cities
 */

import { Country } from './index';

export const albania: Country = {
  code: 'AL',
  name: 'Albania',
  flag: '🇦🇱',
  capital: 'Tirana',
  area: 28748,
  currencySymbol: 'L',
  officialLanguages: ['Albanian'],
  demonym: 'Albanian',
  taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'ALL', region: 'EU' },
  divisions: [
    { code: 'TIR', name: 'Tirana', type: 'county',
      cities: [
        { code: 'TIRANA', name: 'Tirana' },
        { code: 'DURRES', name: 'Durrës' },
        { code: 'VLORA', name: 'Vlorë' },
        { code: 'SHKODER', name: 'Shkodër' },
        { code: 'ELBASAN', name: 'Elbasan' }
      ]
    },
    { code: 'DUR', name: 'Durrës', type: 'county',
      cities: [
        { code: 'DURRES', name: 'Durrës' },
        { code: 'VLORA', name: 'Vlorë' },
        { code: 'SHKODER', name: 'Shkodër' },
        { code: 'ELBASAN', name: 'Elbasan' },
        { code: 'TIRANA', name: 'Tirana' }
      ]
    },
    { code: 'VLO', name: 'Vlorë', type: 'county',
      cities: [
        { code: 'VLORA', name: 'Vlorë' },
        { code: 'SHKODER', name: 'Shkodër' },
        { code: 'ELBASAN', name: 'Elbasan' },
        { code: 'TIRANA', name: 'Tirana' },
        { code: 'DURRES', name: 'Durrës' }
      ]
    },
    { code: 'SHK', name: 'Shkodër', type: 'county',
      cities: [
        { code: 'SHKODER', name: 'Shkodër' },
        { code: 'ELBASAN', name: 'Elbasan' },
        { code: 'TIRANA', name: 'Tirana' },
        { code: 'DURRES', name: 'Durrës' },
        { code: 'VLORA', name: 'Vlorë' }
      ]
    },
    { code: 'ELB', name: 'Elbasan', type: 'county',
      cities: [
        { code: 'ELBASAN', name: 'Elbasan' },
        { code: 'TIRANA', name: 'Tirana' },
        { code: 'DURRES', name: 'Durrës' },
        { code: 'VLORA', name: 'Vlorë' },
        { code: 'SHKODER', name: 'Shkodër' }
      ]
    }
  ]
};
