/**
 * Lesotho country data with districts and cities
 */

import { Country } from './index';

export const lesotho: Country = {
  code: 'LS',
  name: 'Lesotho',
  flag: '🇱🇸',
  capital: 'Maseru',
  area: 30355,
  currencySymbol: 'L',
  officialLanguages: ['Sesotho', 'English'],
  demonym: 'Mosotho',
  taxInfo: { standardRate: 14, taxName: 'VAT', currency: 'LSL', region: 'MEA' },
  divisions: [
    { code: 'MAS', name: 'Maseru', type: 'district',
      cities: [
        { code: 'MASERU', name: 'Maseru' },
        { code: 'MAFETENG', name: 'Mafeteng' },
        { code: 'LERIBE', name: 'Leribe' },
        { code: 'MOHALE', name: 'Mohale\'s Hoek' },
        { code: 'QUTHING', name: 'Quthing' },
        { code: 'BUTHA', name: 'Butha-Buthe' },
        { code: 'MOKHOTLONG', name: 'Mokhotlong' },
        { code: 'THABA', name: 'Thaba-Tseka' },
        { code: 'QACHAS', name: 'Qacha\'s Nek' },
        { code: 'ROMA', name: 'Roma' }
      ]
    },
    { code: 'BER', name: 'Berea', type: 'district',
      cities: [
        { code: 'TY', name: 'Teyateyaneng' },
        { code: 'MAPUTSOE', name: 'Maputsoe' },
        { code: 'MASERU', name: 'Maseru' },
        { code: 'MAFETENG', name: 'Mafeteng' },
        { code: 'LERIBE', name: 'Leribe' },
        { code: 'MOHALE', name: 'Mohale\'s Hoek' },
        { code: 'QUTHING', name: 'Quthing' },
        { code: 'BUTHA', name: 'Butha-Buthe' },
        { code: 'MOKHOTLONG', name: 'Mokhotlong' },
        { code: 'THABA', name: 'Thaba-Tseka' }
      ]
    },
    { code: 'BUT', name: 'Butha-Buthe', type: 'district',
      cities: [
        { code: 'BUTHA', name: 'Butha-Buthe' },
        { code: 'MOKHOTLONG', name: 'Mokhotlong' },
        { code: 'THABA', name: 'Thaba-Tseka' },
        { code: 'QACHAS', name: 'Qacha\'s Nek' },
        { code: 'ROMA', name: 'Roma' },
        { code: 'MASERU', name: 'Maseru' },
        { code: 'MAFETENG', name: 'Mafeteng' },
        { code: 'LERIBE', name: 'Leribe' },
        { code: 'MOHALE', name: 'Mohale\'s Hoek' },
        { code: 'QUTHING', name: 'Quthing' }
      ]
    },
    { code: 'LER', name: 'Leribe', type: 'district',
      cities: [
        { code: 'LERIBE', name: 'Leribe' },
        { code: 'MAPUTSOE', name: 'Maputsoe' },
        { code: 'TY', name: 'Teyateyaneng' },
        { code: 'MASERU', name: 'Maseru' },
        { code: 'MAFETENG', name: 'Mafeteng' },
        { code: 'MOHALE', name: 'Mohale\'s Hoek' },
        { code: 'QUTHING', name: 'Quthing' },
        { code: 'BUTHA', name: 'Butha-Buthe' },
        { code: 'MOKHOTLONG', name: 'Mokhotlong' },
        { code: 'THABA', name: 'Thaba-Tseka' }
      ]
    },
    { code: 'MAF', name: 'Mafeteng', type: 'district',
      cities: [
        { code: 'MAFETENG', name: 'Mafeteng' },
        { code: 'MASERU', name: 'Maseru' },
        { code: 'LERIBE', name: 'Leribe' },
        { code: 'MOHALE', name: 'Mohale\'s Hoek' },
        { code: 'QUTHING', name: 'Quthing' },
        { code: 'BUTHA', name: 'Butha-Buthe' },
        { code: 'MOKHOTLONG', name: 'Mokhotlong' },
        { code: 'THABA', name: 'Thaba-Tseka' },
        { code: 'QACHAS', name: 'Qacha\'s Nek' },
        { code: 'ROMA', name: 'Roma' }
      ]
    },
    { code: 'MOH', name: 'Mohale\'s Hoek', type: 'district',
      cities: [
        { code: 'MOHALE', name: 'Mohale\'s Hoek' },
        { code: 'QUTHING', name: 'Quthing' },
        { code: 'QACHAS', name: 'Qacha\'s Nek' },
        { code: 'ROMA', name: 'Roma' },
        { code: 'MASERU', name: 'Maseru' },
        { code: 'MAFETENG', name: 'Mafeteng' },
        { code: 'LERIBE', name: 'Leribe' },
        { code: 'BUTHA', name: 'Butha-Buthe' },
        { code: 'MOKHOTLONG', name: 'Mokhotlong' },
        { code: 'THABA', name: 'Thaba-Tseka' }
      ]
    },
    { code: 'MOK', name: 'Mokhotlong', type: 'district',
      cities: [
        { code: 'MOKHOTLONG', name: 'Mokhotlong' },
        { code: 'THABA', name: 'Thaba-Tseka' },
        { code: 'QACHAS', name: 'Qacha\'s Nek' },
        { code: 'ROMA', name: 'Roma' },
        { code: 'MASERU', name: 'Maseru' },
        { code: 'MAFETENG', name: 'Mafeteng' },
        { code: 'LERIBE', name: 'Leribe' },
        { code: 'MOHALE', name: 'Mohale\'s Hoek' },
        { code: 'QUTHING', name: 'Quthing' },
        { code: 'BUTHA', name: 'Butha-Buthe' }
      ]
    },
    { code: 'QAC', name: 'Qacha\'s Nek', type: 'district',
      cities: [
        { code: 'QACHAS', name: 'Qacha\'s Nek' },
        { code: 'ROMA', name: 'Roma' },
        { code: 'MASERU', name: 'Maseru' },
        { code: 'MAFETENG', name: 'Mafeteng' },
        { code: 'LERIBE', name: 'Leribe' },
        { code: 'MOHALE', name: 'Mohale\'s Hoek' },
        { code: 'QUTHING', name: 'Quthing' },
        { code: 'BUTHA', name: 'Butha-Buthe' },
        { code: 'MOKHOTLONG', name: 'Mokhotlong' },
        { code: 'THABA', name: 'Thaba-Tseka' }
      ]
    },
    { code: 'QUT', name: 'Quthing', type: 'district',
      cities: [
        { code: 'QUTHING', name: 'Quthing' },
        { code: 'QACHAS', name: 'Qacha\'s Nek' },
        { code: 'ROMA', name: 'Roma' },
        { code: 'MASERU', name: 'Maseru' },
        { code: 'MAFETENG', name: 'Mafeteng' },
        { code: 'LERIBE', name: 'Leribe' },
        { code: 'MOHALE', name: 'Mohale\'s Hoek' },
        { code: 'BUTHA', name: 'Butha-Buthe' },
        { code: 'MOKHOTLONG', name: 'Mokhotlong' },
        { code: 'THABA', name: 'Thaba-Tseka' }
      ]
    },
    { code: 'TAB', name: 'Thaba-Tseka', type: 'district',
      cities: [
        { code: 'THABA', name: 'Thaba-Tseka' },
        { code: 'QACHAS', name: 'Qacha\'s Nek' },
        { code: 'ROMA', name: 'Roma' },
        { code: 'MASERU', name: 'Maseru' },
        { code: 'MAFETENG', name: 'Mafeteng' },
        { code: 'LERIBE', name: 'Leribe' },
        { code: 'MOHALE', name: 'Mohale\'s Hoek' },
        { code: 'QUTHING', name: 'Quthing' },
        { code: 'BUTHA', name: 'Butha-Buthe' },
        { code: 'MOKHOTLONG', name: 'Mokhotlong' }
      ]
    },
    { code: 'ROM', name: 'Roma', type: 'district',
      cities: [
        { code: 'ROMA', name: 'Roma' },
        { code: 'MASERU', name: 'Maseru' },
        { code: 'MAFETENG', name: 'Mafeteng' },
        { code: 'LERIBE', name: 'Leribe' },
        { code: 'MOHALE', name: 'Mohale\'s Hoek' },
        { code: 'QUTHING', name: 'Quthing' },
        { code: 'QACHAS', name: 'Qacha\'s Nek' },
        { code: 'BUTHA', name: 'Butha-Buthe' },
        { code: 'MOKHOTLONG', name: 'Mokhotlong' },
        { code: 'THABA', name: 'Thaba-Tseka' }
      ]
    }
  ]
};

export default lesotho;
