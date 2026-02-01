/**
 * Micronesia country data with states and cities
 */

import { Country } from './index';

export const micronesia: Country = {
  code: 'FM',
  name: 'Micronesia',
  flag: '🇫🇲',
  capital: 'Palikir',
  area: 702,
  currencySymbol: '$',
  officialLanguages: ['English'],
  demonym: 'Micronesian',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'USD', region: 'APAC' },
  divisions: [
    { code: 'PAL', name: 'Pohnpei', type: 'state',
      cities: [
        { code: 'PALIKIR', name: 'Palikir' },
        { code: 'KOLONIA', name: 'Kolonia' },
        { code: 'TAK', name: 'Tak', },
        { code: 'MADOLENIHMW', name: 'Madolenihmw' },
        { code: 'KITTI', name: 'Kitti' }
      ]
    },
    { code: 'KOL', name: 'Chuuk', type: 'state',
      cities: [
        { code: 'KOLONIA', name: 'Kolonia' },
        { code: 'TAK', name: 'Tak' },
        { code: 'MADOLENIHMW', name: 'Madolenihmw' },
        { code: 'KITTI', name: 'Kitti' },
        { code: 'PALIKIR', name: 'Palikir' }
      ]
    },
    { code: 'TAK', name: 'Yap', type: 'state',
      cities: [
        { code: 'TAK', name: 'Tak' },
        { code: 'MADOLENIHMW', name: 'Madolenihmw' },
        { code: 'KITTI', name: 'Kitti' },
        { code: 'PALIKIR', name: 'Palikir' },
        { code: 'KOLONIA', name: 'Kolonia' }
      ]
    },
    { code: 'MAD', name: 'Kosrae', type: 'state',
      cities: [
        { code: 'MADOLENIHMW', name: 'Madolenihmw' },
        { code: 'KITTI', name: 'Kitti' },
        { code: 'PALIKIR', name: 'Palikir' },
        { code: 'KOLONIA', name: 'Kolonia' },
        { code: 'TAK', name: 'Tak' }
      ]
    },
    { code: 'KIT', name: 'Yap', type: 'state',
      cities: [
        { code: 'KITTI', name: 'Kitti' },
        { code: 'PALIKIR', name: 'Palikir' },
        { code: 'KOLONIA', name: 'Kolonia' },
        { code: 'TAK', name: 'Tak' },
        { code: 'MADOLENIHMW', name: 'Madolenihmw' }
      ]
    }
  ]
};
