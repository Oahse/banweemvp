/**
 * Bolivia country data with departments and cities
 */

import { Country } from './index';

export const bolivia: Country = {
  code: 'BO',
  name: 'Bolivia',
  flag: '🇧🇴',
  capital: 'La Paz',
  area: 1098581,
  currencySymbol: 'Bs',
  officialLanguages: ['Spanish', 'Quechua', 'Aymara', 'Guaraní'],
  demonym: 'Bolivian',
  taxInfo: { standardRate: 13, taxName: 'IVA', currency: 'BOB', region: 'LATAM' },
  divisions: [
    { code: 'LP', name: 'La Paz', type: 'department',
      cities: [
        { code: 'LA PAZ', name: 'La Paz' },
        { code: 'SANTA CRUZ', name: 'Santa Cruz de la Sierra' },
        { code: 'COCHABAMBA', name: 'Cochabamba' },
        { code: 'SUCRE', name: 'Sucre' },
        { code: 'ORURO', name: 'Oruro' }
      ]
    },
    { code: 'SC', name: 'Santa Cruz', type: 'department',
      cities: [
        { code: 'SANTA CRUZ', name: 'Santa Cruz de la Sierra' },
        { code: 'COCHABAMBA', name: 'Cochabamba' },
        { code: 'SUCRE', name: 'Sucre' },
        { code: 'ORURO', name: 'Oruro' },
        { code: 'LA PAZ', name: 'La Paz' }
      ]
    },
    { code: 'CB', name: 'Cochabamba', type: 'department',
      cities: [
        { code: 'COCHABAMBA', name: 'Cochabamba' },
        { code: 'SUCRE', name: 'Sucre' },
        { code: 'ORURO', name: 'Oruro' },
        { code: 'LA PAZ', name: 'La Paz' },
        { code: 'SANTA CRUZ', name: 'Santa Cruz de la Sierra' }
      ]
    },
    { code: 'SU', name: 'Sucre', type: 'department',
      cities: [
        { code: 'SUCRE', name: 'Sucre' },
        { code: 'ORURO', name: 'Oruro' },
        { code: 'LA PAZ', name: 'La Paz' },
        { code: 'SANTA CRUZ', name: 'Santa Cruz de la Sierra' },
        { code: 'COCHABAMBA', name: 'Cochabamba' }
      ]
    },
    { code: 'OR', name: 'Oruro', type: 'department',
      cities: [
        { code: 'ORURO', name: 'Oruro' },
        { code: 'LA PAZ', name: 'La Paz' },
        { code: 'SANTA CRUZ', name: 'Santa Cruz de la Sierra' },
        { code: 'COCHABAMBA', name: 'Cochabamba' },
        { code: 'SUCRE', name: 'Sucre' }
      ]
    }
  ]
};
