/**
 * Papua New Guinea country data with provinces and cities
 */

import { Country } from './index';

export const papuanewguinea: Country = {
  code: 'PG',
  name: 'Papua New Guinea',
  flag: '🇵🇬',
  capital: 'Port Moresby',
  area: 462840,
  currencySymbol: 'K',
  officialLanguages: ['English', 'Tok Pisin', 'Hiri Motu', 'Papua New Guinean Sign Language'],
  demonym: 'Papua New Guinean',
  taxInfo: { standardRate: 10, taxName: 'VAT', currency: 'PGK', region: 'APAC' },
  divisions: [
    { code: 'POR', name: 'National Capital', type: 'province',
      cities: [
        { code: 'PORT MORESBY', name: 'Port Moresby' },
        { code: 'LAE', name: 'Lae' },
        { code: 'MOUNT HAGEN', name: 'Mount Hagen' },
        { code: 'MADANG', name: 'Madang' },
        { code: 'KOKOPO', name: 'Kokopo' }
      ]
    },
    { code: 'LAE', name: 'Morobe', type: 'province',
      cities: [
        { code: 'LAE', name: 'Lae' },
        { code: 'MOUNT HAGEN', name: 'Mount Hagen' },
        { code: 'MADANG', name: 'Madang' },
        { code: 'KOKOPO', name: 'Kokopo' },
        { code: 'PORT MORESBY', name: 'Port Moresby' }
      ]
    },
    { code: 'MOU', name: 'Western Highlands', type: 'province',
      cities: [
        { code: 'MOUNT HAGEN', name: 'Mount Hagen' },
        { code: 'MADANG', name: 'Madang' },
        { code: 'KOKOPO', name: 'Kokopo' },
        { code: 'PORT MORESBY', name: 'Port Moresby' },
        { code: 'LAE', name: 'Lae' }
      ]
    },
    { code: 'MAD', name: 'Madang', type: 'province',
      cities: [
        { code: 'MADANG', name: 'Madang' },
        { code: 'KOKOPO', name: 'Kokopo' },
        { code: 'PORT MORESBY', name: 'Port Moresby' },
        { code: 'LAE', name: 'Lae' },
        { code: 'MOUNT HAGEN', name: 'Mount Hagen' }
      ]
    },
    { code: 'KOK', name: 'East New Britain', type: 'province',
      cities: [
        { code: 'KOKOPO', name: 'Kokopo' },
        { code: 'PORT MORESBY', name: 'Port Moresby' },
        { code: 'LAE', name: 'Lae' },
        { code: 'MOUNT HAGEN', name: 'Mount Hagen' },
        { code: 'MADANG', name: 'Madang' }
      ]
    }
  ]
};
