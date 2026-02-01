/**
 * Ireland country data with provinces and cities
 */

import { Country } from './index';

export const ireland: Country = {
  code: 'IE',
  name: 'Ireland',
  flag: '🇮🇪',
  capital: 'Dublin',
  area: 70273,
  currencySymbol: '€',
  officialLanguages: ['Irish', 'English'],
  demonym: 'Irish',
  taxInfo: { standardRate: 23, taxName: 'VAT', currency: 'EUR', region: 'EU' },
  divisions: [
    { code: 'DUB', name: 'Leinster', type: 'province',
      cities: [
        { code: 'DUBLIN', name: 'Dublin' },
        { code: 'CORK', name: 'Cork' },
        { code: 'GALWAY', name: 'Galway' },
        { code: 'LIMERICK', name: 'Limerick' },
        { code: 'WATERFORD', name: 'Waterford' }
      ]
    },
    { code: 'COR', name: 'Munster', type: 'province',
      cities: [
        { code: 'CORK', name: 'Cork' },
        { code: 'GALWAY', name: 'Galway' },
        { code: 'LIMERICK', name: 'Limerick' },
        { code: 'WATERFORD', name: 'Waterford' },
        { code: 'DUBLIN', name: 'Dublin' }
      ]
    },
    { code: 'GAL', name: 'Connacht', type: 'province',
      cities: [
        { code: 'GALWAY', name: 'Galway' },
        { code: 'LIMERICK', name: 'Limerick' },
        { code: 'WATERFORD', name: 'Waterford' },
        { code: 'DUBLIN', name: 'Dublin' },
        { code: 'CORK', name: 'Cork' }
      ]
    },
    { code: 'LIM', name: 'Ulster', type: 'province',
      cities: [
        { code: 'LIMERICK', name: 'Limerick' },
        { code: 'WATERFORD', name: 'Waterford' },
        { code: 'DUBLIN', name: 'Dublin' },
        { code: 'CORK', name: 'Cork' },
        { code: 'GALWAY', name: 'Galway' }
      ]
    },
    { code: 'WAT', name: 'Mide', type: 'province',
      cities: [
        { code: 'WATERFORD', name: 'Waterford' },
        { code: 'DUBLIN', name: 'Dublin' },
        { code: 'CORK', name: 'Cork' },
        { code: 'GALWAY', name: 'Galway' },
        { code: 'LIMERICK', name: 'Limerick' }
      ]
    }
  ]
};
