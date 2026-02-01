/**
 * Lesotho country data with districts, cities, and tax information
 */

import { Country } from './index';

export const lesotho: Country = {
    code: 'LS',
    name: 'Lesotho',
    taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'LSL', region: 'MEA' },
    provinces: [
      { code: 'BE', name: 'Berea',
        cities: [
          { code: 'BE', name: 'Berea' },
          { code: 'MAPU', name: 'Maputsoe' },
          { code: 'Teya', name: 'Teyateyaneng' },
          { code: 'MAF', name: 'Mafeteng' },
          { code: 'MOHA', name: 'Mohale\'s Hoek' },
          { code: 'QUTH', name: 'Quthing' },
          { code: 'MOK', name: 'Mokhotlong' },
          { code: 'BUT', name: 'Butha-Buthe' },
          { code: 'LER', name: 'Leribe' },
          { code: 'MAS', name: 'Maseru' }
        ]
      },
      { code: 'BL', name: 'Butha-Buthe',
        cities: [
          { code: 'BL', name: 'Butha-Buthe' },
          { code: 'BE', name: 'Berea' },
          { code: 'MAPU', name: 'Maputsoe' },
          { code: 'Teya', name: 'Teyateyaneng' },
          { code: 'MAF', name: 'Mafeteng' },
          { code: 'MOHA', name: 'Mohale\'s Hoek' },
          { code: 'QUTH', name: 'Quthing' },
          { code: 'MOK', name: 'Mokhotlong' },
          { code: 'LER', name: 'Leribe' },
          { code: 'MAS', name: 'Maseru' }
        ]
      },
      { code: 'LE', name: 'Leribe',
        cities: [
          { code: 'LE', name: 'Leribe' },
          { code: 'BL', name: 'Butha-Buthe' },
          { code: 'BE', name: 'Berea' },
          { code: 'MAPU', name: 'Maputsoe' },
          { code: 'Teya', name: 'Teyateyaneng' },
          { code: 'MAF', name: 'Mafeteng' },
          { code: 'MOHA', name: 'Mohale\'s Hoek' },
          { code: 'QUTH', name: 'Quthing' },
          { code: 'MOK', name: 'Mokhotlong' },
          { code: 'MAS', name: 'Maseru' }
        ]
      },
      { code: 'MF', name: 'Mafeteng',
        cities: [
          { code: 'MF', name: 'Mafeteng' },
          { code: 'BL', name: 'Butha-Buthe' },
          { code: 'BE', name: 'Berea' },
          { code: 'MAPU', name: 'Maputsoe' },
          { code: 'Teya', name: 'Teyateyaneng' },
          { code: 'MOHA', name: 'Mohale\'s Hoek' },
          { code: 'QUTH', name: 'Quthing' },
          { code: 'MOK', name: 'Mokhotlong' },
          { code: 'LER', name: 'Leribe' },
          { code: 'MAS', name: 'Maseru' }
        ]
      },
      { code: 'MH', name: 'Mohale\'s Hoek',
        cities: [
          { code: 'MH', name: 'Mohale\'s Hoek' },
          { code: 'BL', name: 'Butha-Buthe' },
          { code: 'BE', name: 'Berea' },
          { code: 'MAPU', name: 'Maputsoe' },
          { code: 'Teya', name: 'Teyateyaneng' },
          { code: 'MAF', name: 'Mafeteng' },
          { code: 'QUTH', name: 'Quthing' },
          { code: 'MOK', name: 'Mokhotlong' },
          { code: 'LER', name: 'Leribe' },
          { code: 'MAS', name: 'Maseru' }
        ]
      },
      { code: 'MK', name: 'Mokhotlong',
        cities: [
          { code: 'MK', name: 'Mokhotlong' },
          { code: 'BL', name: 'Butha-Buthe' },
          { code: 'BE', name: 'Berea' },
          { code: 'MAPU', name: 'Maputsoe' },
          { code: 'Teya', name: 'Teyateyaneng' },
          { code: 'MAF', name: 'Mafeteng' },
          { code: 'MOHA', name: 'Mohale\'s Hoek' },
          { code: 'QUTH', name: 'Quthing' },
          { code: 'LER', name: 'Leribe' },
          { code: 'MAS', name: 'Maseru' }
        ]
      },
      { code: 'MS', name: 'Maseru',
        cities: [
          { code: 'MS', name: 'Maseru' },
          { code: 'BL', name: 'Butha-Buthe' },
          { code: 'BE', name: 'Berea' },
          { code: 'MAPU', name: 'Maputsoe' },
          { code: 'Teya', name: 'Teyateyaneng' },
          { code: 'MAF', name: 'Mafeteng' },
          { code: 'MOHA', name: 'Mohale\'s Hoek' },
          { code: 'QUTH', name: 'Quthing' },
          { code: 'MOK', name: 'Mokhotlong' },
          { code: 'LER', name: 'Leribe' }
        ]
      },
      { code: 'QT', name: 'Quthing',
        cities: [
          { code: 'QT', name: 'Quthing' },
          { code: 'BL', name: 'Butha-Buthe' },
          { code: 'BE', name: 'Berea' },
          { code: 'MAPU', name: 'Maputsoe' },
          { code: 'Teya', name: 'Teyateyaneng' },
          { code: 'MAF', name: 'Mafeteng' },
          { code: 'MOHA', name: 'Mohale\'s Hoek' },
          { code: 'MOK', name: 'Mokhotlong' },
          { code: 'LER', name: 'Leribe' },
          { code: 'MAS', name: 'Maseru' }
        ]
      },
      { code: 'QT2', name: 'Qacha\'s Nek',
        cities: [
          { code: 'QT2', name: 'Qacha\'s Nek' },
          { code: 'BL', name: 'Butha-Buthe' },
          { code: 'BE', name: 'Berea' },
          { code: 'MAPU', name: 'Maputsoe' },
          { code: 'Teya', name: 'Teyateyaneng' },
          { code: 'MAF', name: 'Mafeteng' },
          { code: 'MOHA', name: 'Mohale\'s Hoek' },
          { code: 'QUTH', name: 'Quthing' },
          { code: 'MOK', name: 'Mokhotlong' },
          { code: 'LER', name: 'Leribe' }
        ]
      },
      { code: 'TE', name: 'Thaba-Tseka',
        cities: [
          { code: 'TE', name: 'Thaba-Tseka' },
          { code: 'BL', name: 'Butha-Buthe' },
          { code: 'BE', name: 'Berea' },
          { code: 'MAPU', name: 'Maputsoe' },
          { code: 'Teya', name: 'Teyateyaneng' },
          { code: 'MAF', name: 'Mafeteng' },
          { code: 'MOHA', name: 'Mohale\'s Hoek' },
          { code: 'QUTH', name: 'Quthing' },
          { code: 'MOK', name: 'Mokhotlong' },
          { code: 'LER', name: 'Leribe' }
        ]
      }
    ]
  };
