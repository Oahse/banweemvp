/**
 * New Caledonia country data with provinces and cities
 */

import { Country } from './index';

export const newcaledonia: Country = {
  code: 'NC',
  name: 'New Caledonia',
  flag: '🇳🇨',
  capital: 'Nouméa',
  area: 18575,
  currencySymbol: '₣�',
  officialLanguages: ['French', 'Noumea', 'Drehu', 'Paici', 'Javanese'],
  demonym: 'New Caledonian',
  taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'XPF', region: 'APAC' },
  divisions: [
    { code: 'NOU', name: 'Southern Province', type: 'province',
      cities: [
        { code: 'NOUMEA', name: 'Nouméa' },
        { code: 'DUMBEA', name: 'Dumbéa' },
        { code: 'THIO', name: 'Thio' },
        {code: 'LIFOU', name: 'Lifou' },
        { code: 'ILE DES PINS', name: 'Île des Pins' }
      ]
    },
    { code: 'DUM', name: 'North Province', type: 'province',
      cities: [
        { code: 'DUMBEA', name: 'Dumbéa' },
        { code: 'THIO', name: 'Thio' },
        { code: 'LIFOU', name: 'Lifou' },
        { code: 'ILE DES PINS', name: 'Île des Pins' },
        { code: 'NOUMEA', name: 'Nouméa' }
      ]
    },
    { code: 'THI', name: 'Loyalty Islands', type: 'province',
      cities: [
        { code: 'THIO', name: 'Thio' },
        { code: 'LIFOU', name: 'Lifou' },
        { code: 'ILE DES PINS', name: 'Île des Pins' },
        { code: 'NOUMEA', name: 'Nouméa' },
        { code: 'DUMBEA', name: 'Dumbéa' }
      ]
    },
    { code: 'LIF', name: 'Lifou', type: 'province',
      cities: [
        { code: 'LIFOU', name: 'Lifou' },
        { code: 'ILE DES PINS', name: 'Île des Pins' },
        { code: 'NOUMEA', name: 'Nouméa' },
        { code: 'DUMBEA', name: 'Dumbéa' },
        { code: 'THIO', name: 'Thio' }
      ]
    },
    { code: 'ILE', name: 'Île des Pins', type: 'province',
      cities: [
        { code: 'ILE DES PINS', name: 'Île des Pins' },
        { code: 'NOUMEA', name: 'Nouméa' },
        { code: 'DUMBEA', name: 'Dumbéa' },
        { code: 'THIO', name: 'Thio' },
        { code: 'LIFOU', name: 'Lifou' }
      ]
    }
  ]
};
