/**
 * Suriname country data with districts and cities
 */

import { Country } from './index';

export const suriname: Country = {
  code: 'SR',
  name: 'Suriname',
  flag: '🇸🇷',
  capital: 'Paramaribo',
  area: 163820,
  currencySymbol: '$',
  officialLanguages: ['Dutch', 'Sranan Tongo', 'Surinamese Hindustani', 'Javanese'],
  demonym: 'Surinamese',
  taxInfo: { standardRate: 10, taxName: 'VAT', currency: 'SRD', region: 'LATAM' },
  divisions: [
    { code: 'PAR', name: 'Paramaribo', type: 'district',
      cities: [
        { code: 'PARAMARIBO', name: 'Paramaribo' },
        { code: 'NIEUW', name: 'Nieuw Nickerie' },
        { code: 'MAROWIJNE', name: 'Marowijne' },
        { code: 'PARBO', name: 'Parbo' },
        { code: 'WAGENINGEN', name: 'Wageningen' }
      ]
    },
    { code: 'NIE', name: 'Nieuw Nickerie', type: 'district',
      cities: [
        { code: 'NIEUW', name: 'Nieuw Nickerie' },
        { code: 'MAROWIJNE', name: 'Marowijne' },
        { code: 'PARBO', name: 'Parbo' },
        { code: 'WAGENINGEN', name: 'Wageningen' },
        { code: 'PARAMARIBO', name: 'Paramaribo' }
      ]
    },
    { code: 'MAR', name: 'Marowijne', type: 'district',
      cities: [
        { code: 'MAROWIJNE', name: 'Marowijne' },
        { code: 'PARBO', name: 'Parbo' },
        { code: 'WAGENINGEN', name: 'Wageningen' },
        { code: 'PARAMARIBO', name: 'Paramaribo' },
        { code: 'NIEUW', name: 'Nieuw Nickerie' }
      ]
    },
    { code: 'PAR', name: 'Parbo', type: 'district',
      cities: [
        { code: 'PARBO', name: 'Parbo' },
        { code: 'WAGENINGEN', name: 'Wageningen' },
        { code: 'PARAMARIBO', name: 'Paramaribo' },
        { code: 'NIEUW', name: 'Nieuw Nickerie' },
        { code: 'MAROWIJNE', name: 'Marowijne' }
      ]
    },
    { code: 'WAG', name: 'Wageningen', type: 'district',
      cities: [
        { code: 'WAGENINGEN', name: 'Wageningen' },
        { code: 'PARAMARIBO', name: 'Paramaribo' },
        { code: 'NIEUW', name: 'Nieuw Nickerie' },
        { code: 'MAROWIJNE', name: 'Marowijne' },
        { code: 'PARBO', name: 'Parbo' }
      ]
    }
  ]
};
