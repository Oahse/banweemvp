/**
 * Bosnia and Herzegovina country data with entities and cities
 */

import { Country } from './index';

export const bosniaandherzegovina: Country = {
  code: 'BA',
  name: 'Bosnia and Herzegovina',
  flag: '🇧🇦',
  capital: 'Sarajevo',
  area: 51197,
  currencySymbol: 'KM',
  officialLanguages: ['Bosnian', 'Croatian', 'Serbian'],
  demonym: 'Bosnian and Herzegovinian',
  taxInfo: { standardRate: 17, taxName: 'VAT', currency: 'BAM', region: 'EU' },
  divisions: [
    { code: 'SAR', name: 'Sarajevo', type: 'entity',
      cities: [
        { code: 'SARAJEVO', name: 'Sarajevo' },
        { code: 'BANJA LUKA', name: 'Banja Luka' },
        { code: 'TUZLA', name: 'Tuzla' },
        { code: 'ZENICA', name: 'Zenica' },
        { code: 'MOSTAR', name: 'Mostar' }
      ]
    },
    { code: 'BAN', name: 'Banja Luka', type: 'entity',
      cities: [
        { code: 'BANJA LUKA', name: 'Banja Luka' },
        { code: 'TUZLA', name: 'Tuzla' },
        { code: 'ZENICA', name: 'Zenica' },
        { code: 'MOSTAR', name: 'Mostar' },
        { code: 'SARAJEVO', name: 'Sarajevo' }
      ]
    },
    { code: 'TUZ', name: 'Tuzla', type: 'entity',
      cities: [
        { code: 'TUZLA', name: 'Tuzla' },
        { code: 'ZENICA', name: 'Zenica' },
        { code: 'MOSTAR', name: 'Mostar' },
        { code: 'SARAJEVO', name: 'Sarajevo' },
        { code: 'BANJA LUKA', name: 'Banja Luka' }
      ]
    },
    { code: 'ZEN', name: 'Zenica', type: 'entity',
      cities: [
        { code: 'ZENICA', name: 'Zenica' },
        { code: 'MOSTAR', name: 'Mostar' },
        { code: 'SARAJEVO', name: 'Sarajevo' },
        { code: 'BANJA LUKA', name: 'Banja Luka' },
        { code: 'TUZLA', name: 'Tuzla' }
      ]
    },
    { code: 'MOS', name: 'Mostar', type: 'entity',
      cities: [
        { code: 'MOSTAR', name: 'Mostar' },
        { code: 'SARAJEVO', name: 'Sarajevo' },
        { code: 'BANJA LUKA', name: 'Banja Luka' },
        { code: 'TUZLA', name: 'Tuzla' },
        { code: 'ZENICA', name: 'Zenica' }
      ]
    }
  ]
};
