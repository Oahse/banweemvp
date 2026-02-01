/**
 * Venezuela country data with states and cities
 */

import { Country } from './index';

export const venezuela: Country = {
  code: 'VE',
  name: 'Venezuela',
  flag: '🇻🇪',
  capital: 'Caracas',
  area: 916445,
  currencySymbol: 'Bs',
  officialLanguages: ['Spanish'],
  demonym: 'Venezuelan',
  taxInfo: { standardRate: 16, taxName: 'IVA', currency: 'VES', region: 'LATAM' },
  divisions: [
    { code: 'CAR', name: 'Caracas', type: 'state',
      cities: [
        { code: 'CARACAS', name: 'Caracas' },
        { code: 'MARACAIBO', name: 'Maracaibo' },
        { code: 'VALENCIA', name: 'Valencia' },
        { code: 'BARQUISIMETO', name: 'Barquisimeto' },
        { code: 'MARACAY', name: 'Maracay' }
      ]
    },
    { code: 'MAR', name: 'Maracaibo', type: 'state',
      cities: [
        { code: 'MARACAIBO', name: 'Maracaibo' },
        { code: 'VALENCIA', name: 'Valencia' },
        { code: 'BARQUISIMETO', name: 'Barquisimeto' },
        { code: 'MARACAY', name: 'Maracay' },
        { code: 'CARACAS', name: 'Caracas' }
      ]
    },
    { code: 'VAL', name: 'Valencia', type: 'state',
      cities: [
        { code: 'VALENCIA', name: 'Valencia' },
        { code: 'BARQUISIMETO', name: 'Barquisimeto' },
        { code: 'MARACAY', name: 'Maracay' },
        { code: 'CARACAS', name: 'Caracas' },
        { code: 'MARACAIBO', name: 'Maracaibo' }
      ]
    },
    { code: 'BAR', name: 'Barquisimeto', type: 'state',
      cities: [
        { code: 'BARQUISIMETO', name: 'Barquisimeto' },
        { code: 'MARACAY', name: 'Maracay' },
        { code: 'CARACAS', name: 'Caracas' },
        { code: 'MARACAIBO', name: 'Maracaibo' },
        { code: 'VALENCIA', name: 'Valencia' }
      ]
    },
    { code: 'MARA', name: 'Maracay', type: 'state',
      cities: [
        { code: 'MARACAY', name: 'Maracay' },
        { code: 'CARACAS', name: 'Caracas' },
        { code: 'MARACAIBO', name: 'Maracaibo' },
        { code: 'VALENCIA', name: 'Valencia' },
        { code: 'BARQUISIMETO', name: 'Barquisimeto' }
      ]
    }
  ]
};
