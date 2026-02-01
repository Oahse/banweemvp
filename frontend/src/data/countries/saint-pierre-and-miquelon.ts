/**
 * Saint Pierre and Miquelon country data with communes and cities
 */

import { Country } from './index';

export const saintpierreandmiquelon: Country = {
  code: 'PM',
  name: 'Saint Pierre and Miquelon',
  flag: '🇵🇲',
  capital: 'Saint-Pierre',
  area: 242,
  currencySymbol: '€',
  officialLanguages: ['French'],
  demonym: 'Saint-Pierrais',
  taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'EUR', region: 'MEA' },
  divisions: [
    { code: 'PIE', name: 'Saint-Pierre', type: 'commune',
      cities: [
        { code: 'SAINT', name: 'Saint-Pierre' },
        { code: 'MIQUELON', name: 'Miquelon' },
        { code: 'LANG', name: 'Langlade' },
        { code: 'ILE', name: 'Île-aux-Marins' },
        { code: 'ANSE', name: 'Anse à Henri' }
      ]
    },
    { code: 'MIQ', name: 'Miquelon', type: 'commune',
      cities: [
        { code: 'MIQUELON', name: 'Miquelon' },
        { code: 'LANG', name: 'Langlade' },
        { code: 'ILE', name: 'Île-aux-Marins' },
        { code: 'ANSE', name: 'Anse à Henri' },
        { code: 'SAINT', name: 'Saint-Pierre' }
      ]
    },
    { code: 'LAN', name: 'Langlade', type: 'commune',
      cities: [
        { code: 'LANG', name: 'Langlade' },
        { code: 'ILE', name: 'Île-aux-Marins' },
        { code: 'ANSE', name: 'Anse à Henri' },
        { code: 'SAINT', name: 'Saint-Pierre' },
        { code: 'MIQUELON', name: 'Miquelon' }
      ]
    },
    { code: 'ILE', name: 'Île-aux-Marins', type: 'commune',
      cities: [
        { code: 'ILE', name: 'Île-aux-Marins' },
        { code: 'ANSE', name: 'Anse à Henri' },
        { code: 'SAINT', name: 'Saint-Pierre' },
        { code: 'MIQUELON', name: 'Miquelon' },
        { code: 'LANG', name: 'Langlade' }
      ]
    },
    { code: 'ANS', name: 'Anse à Henri', type: 'commune',
      cities: [
        { code: 'ANSE', name: 'Anse à Henri' },
        { code: 'SAINT', name: 'Saint-Pierre' },
        { code: 'MIQUELON', name: 'Miquelon' },
        { code: 'LANG', name: 'Langlade' },
        { code: 'ILE', name: 'Île-aux-Marins' }
      ]
    }
  ]
};

export default saintpierreandmiquelon;
