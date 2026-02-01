/**
 * Slovenia country data with regions and cities
 */

import { Country } from './index';

export const slovenia: Country = {
  code: 'SI',
  name: 'Slovenia',
  flag: '🇸🇮',
  capital: 'Ljubljana',
  area: 20273,
  currencySymbol: '€',
  officialLanguages: ['Slovene'],
  demonym: 'Slovene',
  taxInfo: { standardRate: 22, taxName: 'VAT', currency: 'EUR', region: 'EU' },
  divisions: [
    { code: 'LJU', name: 'Ljubljana', type: 'region',
      cities: [
        { code: 'LJUBLJANA', name: 'Ljubljana' },
        { code: 'MARIBOR', name: 'Maribor' },
        { code: 'CELIJE', name: 'Celje' },
        { code: 'KOPER', name: 'Koper' },
        { code: 'NOVO MESTO', name: 'Novo Mesto' }
      ]
    },
    { code: 'MAR', name: 'Maribor', type: 'region',
      cities: [
        { code: 'MARIBOR', name: 'Maribor' },
        { code: 'CELIJE', name: 'Celje' },
        { code: 'KOPER', name: 'Koper' },
        { code: 'NOVO MESTO', name: 'Novo Mesto' },
        { code: 'LJUBLJANA', name: 'Ljubljana' }
      ]
    },
    { code: 'CEL', name: 'Celje', type: 'region',
      cities: [
        { code: 'CELIJE', name: 'Celje' },
        { code: 'KOPER', name: 'Koper' },
        { code: 'NOVO MESTO', name: 'Novo Mesto' },
        { code: 'LJUBLJANA', name: 'Ljubljana' },
        { code: 'MARIBOR', name: 'Maribor' }
      ]
    },
    { code: 'KOP', name: 'Koper', type: 'region',
      cities: [
        { code: 'KOPER', name: 'Koper' },
        { code: 'NOVO MESTO', name: 'Novo Mesto' },
        { code: 'LJUBLJANA', name: 'Ljubljana' },
        { code: 'MARIBOR', name: 'Maribor' },
        { code: 'CELIJE', name: 'Celje' }
      ]
    },
    { code: 'NOV', name: 'Novo Mesto', type: 'region',
      cities: [
        { code: 'NOVO MESTO', name: 'Novo Mesto' },
        { code: 'LJUBLJANA', name: 'Ljubljana' },
        { code: 'MARIBOR', name: 'Maribor' },
        { code: 'CELIJE', name: 'Celje' },
        { code: 'KOPER', name: 'Koper' }
      ]
    }
  ]
};
