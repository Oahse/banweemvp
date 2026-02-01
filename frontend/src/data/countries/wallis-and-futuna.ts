/**
 * Wallis and Futuna country data with islands and cities
 */

import { Country } from './index';

export const wallisandfutuna: Country = {
  code: 'WF',
  name: 'Wallis and Futuna',
  flag: '🇼🇫',
  capital: 'Mata-Utu',
  area: 142,
  currencySymbol: '₣�',
  officialLanguages: ['Wallisian', 'Futunan', 'French'],
  demonym: 'Wallisian and Futunan',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'XPF', region: 'APAC' },
  divisions: [
    { code: 'MAT', name: 'Wallis', type: 'island',
      cities: [
        { code: 'MATA-UTU', name: 'Mata-Utu' },
        { code: 'FUTUNA', name: 'Futuna' },
        { code: 'ALENIPATA', name: 'Alofi' },
        { code: 'SIGAVE', name: 'Sigave' },
        { code: 'NUKUFETAO', name: 'Nukufetao' }
      ]
    },
    { code: 'FUT', name: 'Futuna', type: 'island',
      cities: [
        { code: 'FUTUNA', name: 'Futuna' },
        { code: 'ALENIPATA', name: 'Alofi' },
        { code: 'SIGAVE', name: 'Sigave' },
        { code: 'NUKUFETAO', name: 'Nukufetao' },
        { code: 'MATA-UTU', name: 'Mata-Utu' }
      ]
    },
    { code: 'ALE', name: 'Alofi', type: 'island',
      cities: [
        { code: 'ALENIPATA', name: 'Alofi' },
        { code: 'SIGAVE', name: 'Sigave' },
        { code: 'NUKUFETAO', name: 'Nukufetao' },
        { code: 'MATA-UTU', name: 'Mata-Utu' },
        { code: 'FUTUNA', name: 'Futuna' }
      ]
    },
    { code: 'SIG', name: 'Sigave', type: 'island',
      cities: [
        { code: 'SIGAVE', name: 'Sigave' },
        { code: 'NUKUFETAO', name: 'Nukufetao' },
        { code: 'MATA-UTU', name: 'Mata-Utu' },
        { code: 'FUTUNA', name: 'Futuna' },
        { code: 'ALENIPATA', name: 'Alofi' }
      ]
    },
    { code: 'NUK', name: 'Nukufetao', type: 'island',
      cities: [
        { code: 'NUKUFETAO', name: 'Nukufetao' },
        { code: 'MATA-UTU', name: 'Mata-Utu' },
        { code: 'FUTUNA', name: 'Futuna' },
        { code: 'ALENIPATA', name: 'Alofi' },
        { code: 'SIGAVE', name: 'Sigave' }
      ]
    }
  ]
};
