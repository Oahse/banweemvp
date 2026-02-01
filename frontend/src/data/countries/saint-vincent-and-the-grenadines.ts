/**
 * Saint Vincent and the Grenadines country data with parishes and cities
 */

import { Country } from './index';

export const saintvincentandthegrenadines: Country = {
  code: 'VC',
  name: 'Saint Vincent and the Grenadines',
  flag: '🇻🇨',
  capital: 'Kingstown',
  area: 389,
  currencySymbol: '$',
  officialLanguages: ['English'],
  demonym: 'Vincentian',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'USD', region: 'MEA' },
  divisions: [
    { code: 'KIN', name: 'Kingstown', type: 'parish',
      cities: [
        { code: 'KINGSTOWN', name: 'Kingstown' },
        { code: 'ARROW', name: 'Arrow' },
        { code: 'GEORGE', name: 'George' },
        { code: 'CHARLOTTE', name: 'Charlotte' },
        { code: 'GRENADINES', name: 'Grenadines' }
      ]
    },
    { code: 'ARR', name: 'Arrow', type: 'parish',
      cities: [
        { code: 'ARROW', name: 'Arrow' },
        { code: 'GEORGE', name: 'George' },
        { code: 'CHARLOTTE', name: 'Charlotte' },
        { code: 'GRENADINES', name: 'Grenadines' },
        { code: 'KINGSTOWN', name: 'Kingstown' }
      ]
    },
    { code: 'GEO', name: 'George', type: 'parish',
      cities: [
        { code: 'GEORGE', name: 'George' },
        { code: 'CHARLOTTE', name: 'Charlotte' },
        { code: 'GRENADINES', name: 'Grenadines' },
        { code: 'KINGSTOWN', name: 'Kingstown' },
        { code: 'ARROW', name: 'Arrow' }
      ]
    },
    { code: 'CHA', name: 'Charlotte', type: 'parish',
      cities: [
        { code: 'CHARLOTTE', name: 'Charlotte' },
        { code: 'GRENADINES', name: 'Grenadines' },
        { code: 'KINGSTOWN', name: 'Kingstown' },
        { code: 'ARROW', name: 'Arrow' },
        { code: 'GEORGE', name: 'George' }
      ]
    },
    { code: 'GRE', name: 'Grenadines', type: 'parish',
      cities: [
        { code: 'GRENADINES', name: 'Grenadines' },
        { code: 'KINGSTOWN', name: 'Kingstown' },
        { code: 'ARROW', name: 'Arrow' },
        { code: 'GEORGE', name: 'George' },
        { code: 'CHARLOTTE', name: 'Charlotte' }
      ]
    }
  ]
};

export default saintvincentandthegrenadines;
