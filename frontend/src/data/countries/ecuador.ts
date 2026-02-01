/**
 * Ecuador country data with provinces and cities
 */

import { Country } from './index';

export const ecuador: Country = {
  code: 'EC',
  name: 'Ecuador',
  flag: '🇪🇨',
  capital: 'Quito',
  area: 283561,
  currencySymbol: '$',
  officialLanguages: ['Spanish', 'Quechua', 'Shuar'],
  demonym: 'Ecuadorian',
  taxInfo: { standardRate: 12, taxName: 'IVA', currency: 'USD', region: 'LATAM' },
  divisions: [
    { code: 'QUI', name: 'Quito', type: 'province',
      cities: [
        { code: 'QUITO', name: 'Quito' },
        { code: 'GUAYAQUIL', name: 'Guayaquil' },
        { code: 'CUENCA', name: 'Cuenca' },
        { code: 'SANTO DOMINGO', name: 'Santo Domingo' },
        { code: 'MACHALA', name: 'Machala' }
      ]
    },
    { code: 'GUA', name: 'Guayaquil', type: 'province',
      cities: [
        { code: 'GUAYAQUIL', name: 'Guayaquil' },
        { code: 'CUENCA', name: 'Cuenca' },
        { code: 'SANTO DOMINGO', name: 'Santo Domingo' },
        { code: 'MACHALA', name: 'Machala' },
        { code: 'QUITO', name: 'Quito' }
      ]
    },
    { code: 'CUE', name: 'Cuenca', type: 'province',
      cities: [
        { code: 'CUENCA', name: 'Cuenca' },
        { code: 'SANTO DOMINGO', name: 'Santo Domingo' },
        { code: 'MACHALA', name: 'Machala' },
        { code: 'QUITO', name: 'Quito' },
        { code: 'GUAYAQUIL', name: 'Guayaquil' }
      ]
    },
    { code: 'SAN', name: 'Santo Domingo', type: 'province',
      cities: [
        { code: 'SANTO DOMINGO', name: 'Santo Domingo' },
        { code: 'MACHALA', name: 'Machala' },
        { code: 'QUITO', name: 'Quito' },
        { code: 'GUAYAQUIL', name: 'Guayaquil' },
        { code: 'CUENCA', name: 'Cuenca' }
      ]
    },
    { code: 'MAC', name: 'Machala', type: 'province',
      cities: [
        { code: 'MACHALA', name: 'Machala' },
        { code: 'QUITO', name: 'Quito' },
        { code: 'GUAYAQUIL', name: 'Guayaquil' },
        { code: 'CUENCA', name: 'Cuenca' },
        { code: 'SANTO DOMINGO', name: 'Santo Domingo' }
      ]
    }
  ]
};
