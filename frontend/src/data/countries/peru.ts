/**
 * Peru country data with regions and cities
 */

import { Country } from './index';

export const peru: Country = {
  code: 'PE',
  name: 'Peru',
  flag: '🇵🇪',
  capital: 'Lima',
  area: 1285216,
  currencySymbol: 'S/',
  officialLanguages: ['Spanish', 'Quechua', 'Aymara'],
  demonym: 'Peruvian',
  taxInfo: { standardRate: 18, taxName: 'IGV', currency: 'PEN', region: 'LATAM' },
  divisions: [
    { code: 'LIM', name: 'Lima', type: 'region',
      cities: [
        { code: 'LIMA', name: 'Lima' },
        { code: 'AREQUIPA', name: 'Arequipa' },
        { code: 'TRUJILLO', name: 'Trujillo' },
        { code: 'CHICLAYO', name: 'Chiclayo' },
        { code: 'HUANCAYO', name: 'Huancayo' }
      ]
    },
    { code: 'ARE', name: 'Arequipa', type: 'region',
      cities: [
        { code: 'AREQUIPA', name: 'Arequipa' },
        { code: 'TRUJILLO', name: 'Trujillo' },
        { code: 'CHICLAYO', name: 'Chiclayo' },
        { code: 'HUANCAYO', name: 'Huancayo' },
        { code: 'LIMA', name: 'Lima' }
      ]
    },
    { code: 'TRU', name: 'Trujillo', type: 'region',
      cities: [
        { code: 'TRUJILLO', name: 'Trujillo' },
        { code: 'CHICLAYO', name: 'Chiclayo' },
        { code: 'HUANCAYO', name: 'Huancayo' },
        { code: 'LIMA', name: 'Lima' },
        { code: 'AREQUIPA', name: 'Arequipa' }
      ]
    },
    { code: 'CHI', name: 'Chiclayo', type: 'region',
      cities: [
        { code: 'CHICLAYO', name: 'Chiclayo' },
        { code: 'HUANCAYO', name: 'Huancayo' },
        { code: 'LIMA', name: 'Lima' },
        { code: 'AREQUIPA', name: 'Arequipa' },
        { code: 'TRUJILLO', name: 'Trujillo' }
      ]
    },
    { code: 'HUA', name: 'Huancayo', type: 'region',
      cities: [
        { code: 'HUANCAYO', name: 'Huancayo' },
        { code: 'LIMA', name: 'Lima' },
        { code: 'AREQUIPA', name: 'Arequipa' },
        { code: 'TRUJILLO', name: 'Trujillo' },
        { code: 'CHICLAYO', name: 'Chiclayo' }
      ]
    }
  ]
};
