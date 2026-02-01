/**
 * Chile country data with regions and cities
 */

import { Country } from './index';

export const chile: Country = {
  code: 'CL',
  name: 'Chile',
  flag: '🇨🇱',
  capital: 'Santiago',
  area: 756102,
  currencySymbol: '$',
  officialLanguages: ['Spanish'],
  demonym: 'Chilean',
  taxInfo: { standardRate: 19, taxName: 'VAT', currency: 'CLP', region: 'LATAM' },
  divisions: [
    { code: 'SCL', name: 'Santiago Metropolitan', type: 'region',
      cities: [
        { code: 'SANTIAGO', name: 'Santiago' },
        { code: 'VALPARAISO', name: 'Valparaíso' },
        { code: 'CONCEPCION', name: 'Concepción' },
        { code: 'LA SERENA', name: 'La Serena' },
        { code: 'ANTOFAGASTA', name: 'Antofagasta' }
      ]
    },
    { code: 'VAL', name: 'Valparaíso', type: 'region',
      cities: [
        { code: 'VALPARAISO', name: 'Valparaíso' },
        { code: 'CONCEPCION', name: 'Concepción' },
        { code: 'LA SERENA', name: 'La Serena' },
        { code: 'ANTOFAGASTA', name: 'Antofagasta' },
        { code: 'SANTIAGO', name: 'Santiago' }
      ]
    },
    { code: 'CON', name: 'Concepción', type: 'region',
      cities: [
        { code: 'CONCEPCION', name: 'Concepción' },
        { code: 'LA SERENA', name: 'La Serena' },
        { code: 'ANTOFAGASTA', name: 'Antofagasta' },
        { code: 'SANTIAGO', name: 'Santiago' },
        { code: 'VALPARAISO', name: 'Valparaíso' }
      ]
    },
    { code: 'LAS', name: 'La Serena', type: 'region',
      cities: [
        { code: 'LA SERENA', name: 'La Serena' },
        { code: 'ANTOFAGASTA', name: 'Antofagasta' },
        { code: 'SANTIAGO', name: 'Santiago' },
        { code: 'VALPARAISO', name: 'Valparaíso' },
        { code: 'CONCEPCION', name: 'Concepción' }
      ]
    },
    { code: 'ANT', name: 'Antofagasta', type: 'region',
      cities: [
        { code: 'ANTOFAGASTA', name: 'Antofagasta' },
        { code: 'SANTIAGO', name: 'Santiago' },
        { code: 'VALPARAISO', name: 'Valparaíso' },
        { code: 'CONCEPCION', name: 'Concepción' },
        { code: 'LA SERENA', name: 'La Serena' }
      ]
    }
  ]
};
