/**
 * Panama country data with provinces and cities
 */

import { Country } from './index';

export const panama: Country = {
  code: 'PA',
  name: 'Panama',
  flag: '🇵🇦',
  capital: 'Panama City',
  area: 75417,
  currencySymbol: 'B/.',
  officialLanguages: ['Spanish', 'English'],
  demonym: 'Panamanian',
  taxInfo: { standardRate: 7, taxName: 'ITBMS', currency: 'PAB', region: 'NA' },
  divisions: [
    { code: 'PAN', name: 'Panamá', type: 'province',
      cities: [
        { code: 'PANAMA', name: 'Panama City' },
        { code: 'COLON', name: 'Colón' },
        { code: 'DAVID', name: 'David' },
        { code: 'SANTIAGO', name: 'Santiago' },
        { code: 'CHITRE', name: 'Chitré' },
        { code: 'BOCAS', name: 'Bocas del Toro' },
        { code: 'PENONOME', name: 'Penonomé' },
        { code: 'TOLE', name: 'Tolé' }
      ]
    },
    { code: 'COL', name: 'Colón', type: 'province',
      cities: [
        { code: 'COLON', name: 'Colón' },
        { code: 'DAVID', name: 'David' },
        { code: 'SANTIAGO', name: 'Santiago' },
        { code: 'CHITRE', name: 'Chitré' },
        { code: 'BOCAS', name: 'Bocas del Toro' },
        { code: 'PENONOME', name: 'Penonomé' },
        { code: 'TOLE', name: 'Tolé' },
        { code: 'PANAMA', name: 'Panama City' }
      ]
    },
    { code: 'DAV', name: 'David', type: 'province',
      cities: [
        { code: 'DAVID', name: 'David' },
        { code: 'SANTIAGO', name: 'Santiago' },
        { code: 'CHITRE', name: 'Chitré' },
        { code: 'BOCAS', name: 'Bocas del Toro' },
        { code: 'PENONOME', name: 'Penonomé' },
        { code: 'TOLE', name: 'Tolé' },
        { code: 'PANAMA', name: 'Panama City' },
        { code: 'COLON', name: 'Colón' }
      ]
    },
    { code: 'SAN', name: 'Santiago', type: 'province',
      cities: [
        { code: 'SANTIAGO', name: 'Santiago' },
        { code: 'CHITRE', name: 'Chitré' },
        { code: 'BOCAS', name: 'Bocas del Toro' },
        { code: 'PENONOME', name: 'Penonomé' },
        { code: 'TOLE', name: 'Tolé' },
        { code: 'PANAMA', name: 'Panama City' },
        { code: 'COLON', name: 'Colón' },
        { code: 'DAVID', name: 'David' }
      ]
    },
    { code: 'CHI', name: 'Chitré', type: 'province',
      cities: [
        { code: 'CHITRE', name: 'Chitré' },
        { code: 'BOCAS', name: 'Bocas del Toro' },
        { code: 'PENONOME', name: 'Penonomé' },
        { code: 'TOLE', name: 'Tolé' },
        { code: 'PANAMA', name: 'Panama City' },
        { code: 'COLON', name: 'Colón' },
        { code: 'DAVID', name: 'David' },
        { code: 'SANTIAGO', name: 'Santiago' }
      ]
    },
    { code: 'BOC', name: 'Bocas del Toro', type: 'province',
      cities: [
        { code: 'BOCAS', name: 'Bocas del Toro' },
        { code: 'PENONOME', name: 'Penonomé' },
        { code: 'TOLE', name: 'Tolé' },
        { code: 'PANAMA', name: 'Panama City' },
        { code: 'COLON', name: 'Colón' },
        { code: 'DAVID', name: 'David' },
        { code: 'SANTIAGO', name: 'Santiago' },
        { code: 'CHITRE', name: 'Chitré' }
      ]
    },
    { code: 'PEN', name: 'Penonomé', type: 'province',
      cities: [
        { code: 'PENONOME', name: 'Penonomé' },
        { code: 'TOLE', name: 'Tolé' },
        { code: 'PANAMA', name: 'Panama City' },
        { code: 'COLON', name: 'Colón' },
        { code: 'DAVID', name: 'David' },
        { code: 'SANTIAGO', name: 'Santiago' },
        { code: 'CHITRE', name: 'Chitré' },
        { code: 'BOCAS', name: 'Bocas del Toro' }
      ]
    },
    { code: 'TOL', name: 'Tolé', type: 'province',
      cities: [
        { code: 'TOLE', name: 'Tolé' },
        { code: 'PANAMA', name: 'Panama City' },
        { code: 'COLON', name: 'Colón' },
        { code: 'DAVID', name: 'David' },
        { code: 'SANTIAGO', name: 'Santiago' },
        { code: 'CHITRE', name: 'Chitré' },
        { code: 'BOCAS', name: 'Bocas del Toro' },
        { code: 'PENONOME', name: 'Penonomé' }
      ]
    }
  ]
};
