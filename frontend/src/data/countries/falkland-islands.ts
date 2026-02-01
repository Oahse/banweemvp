/**
 * Falkland Islands country data with islands and cities
 */

import { Country } from './index';

export const falklandislands: Country = {
  code: 'FK',
  name: 'Falkland Islands',
  flag: '🇫🇰',
  capital: 'Stanley',
  area: 12173,
  currencySymbol: '£',
  officialLanguages: ['English'],
  demonym: 'Falkland Islander',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'FKP', region: 'LATAM' },
  divisions: [
    { code: 'STAN', name: 'Stanley', type: 'island',
      cities: [
        { code: 'STANLEY', name: 'Stanley' },
        { code: 'GOOSE GREEN', name: 'Goose Green' },
        { code: 'PORT HOWARD', name: 'Port Howard' },
        { code: 'PEBBLE ISLAND', name: 'Pebble Island' },
        { code: 'CARCASS ISLAND', name: 'Carcass Island' }
      ]
    },
    { code: 'GOOSE', name: 'Goose Green', type: 'island',
      cities: [
        { code: 'GOOSE GREEN', name: 'Goose Green' },
        { code: 'PORT HOWARD', name: 'Port Howard' },
        { code: 'PEBBLE ISLAND', name: 'Pebble Island' },
        { code: 'CARCASS ISLAND', name: 'Carcass Island' },
        { code: 'STANLEY', name: 'Stanley' }
      ]
    },
    { code: 'PORT', name: 'Port Howard', type: 'island',
      cities: [
        { code: 'PORT HOWARD', name: 'Port Howard' },
        { code: 'PEBBLE ISLAND', name: 'Pebble Island' },
        { code: 'CARCASS ISLAND', name: 'Carcass Island' },
        { code: 'STANLEY', name: 'Stanley' },
        { code: 'GOOSE GREEN', name: 'Goose Green' }
      ]
    },
    { code: 'PEBBLE', name: 'Pebble Island', type: 'island',
      cities: [
        { code: 'PEBBLE ISLAND', name: 'Pebble Island' },
        { code: 'CARCASS ISLAND', name: 'Carcass Island' },
        { code: 'STANLEY', name: 'Stanley' },
        { code: 'GOOSE GREEN', name: 'Goose Green' },
        { code: 'PORT HOWARD', name: 'Port Howard' }
      ]
    },
    { code: 'CARCASS', name: 'Carcass Island', type: 'island',
      cities: [
        { code: 'CARCASS ISLAND', name: 'Carcass Island' },
        { code: 'STANLEY', name: 'Stanley' },
        { code: 'GOOSE GREEN', name: 'Goose Green' },
        { code: 'PORT HOWARD', name: 'Port Howard' },
        { code: 'PEBBLE ISLAND', name: 'Pebble Island' }
      ]
    }
  ]
};
