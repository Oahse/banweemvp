/**
 * Cambodia country data with provinces and cities
 */

import { Country } from './index';

export const cambodia: Country = {
  code: 'KH',
  name: 'Cambodia',
  flag: '🇰🇭',
  capital: 'Phnom Penh',
  area: 181035,
  currencySymbol: '៛',
  officialLanguages: ['Khmer'],
  demonym: 'Cambodian',
  taxInfo: { standardRate: 10, taxName: 'VAT', currency: 'KHR', region: 'APAC' },
  divisions: [
    { code: 'PHN', name: 'Phnom Penh', type: 'province',
      cities: [
        { code: 'PHNOM', name: 'Phnom Penh' },
        { code: 'SIEM', name: 'Siem Reap' },
        { code: 'BATTAMBANG', name: 'Battambang' },
        { code: 'KOMPONG', name: 'Kompong Cham' },
        { code: 'KOMPONG', name: 'Kompong Speu' }
      ]
    },
    { code: 'SIE', name: 'Siem Reap', type: 'province',
      cities: [
        { code: 'SIEM', name: 'Siem Reap' },
        { code: 'BATTAMBANG', name: 'Battambang' },
        { code: 'KOMPONG', name: 'Kompong Cham' },
        { code: 'KOMPONG', name: 'Kompong Speu' },
        { code: 'PHNOM', name: 'Phnom Penh' }
      ]
    },
    { code: 'BAT', name: 'Battambang', type: 'province',
      cities: [
        { code: 'BATTAMBANG', name: 'Battambang' },
        { code: 'KOMPONG', name: 'Kompong Cham' },
        { code: 'KOMPONG', name: 'Kompong Speu' },
        { code: 'PHNOM', name: 'Phnom Penh' },
        { code: 'SIEM', name: 'Siem Reap' }
      ]
    },
    { code: 'KOM', name: 'Kompong Cham', type: 'province',
      cities: [
        { code: 'KOMPONG', name: 'Kompong Cham' },
        { code: 'KOMPONG', name: 'Kompong Speu' },
        { code: 'PHNOM', name: 'Phnom Penh' },
        { code: 'SIEM', name: 'Siem Reap' },
        { code: 'BATTAMBANG', name: 'Battambang' }
      ]
    },
    { code: 'KOM', name: 'Kompong Speu', type: 'province',
      cities: [
        { code: 'KOMPONG', name: 'Kompong Speu' },
        { code: 'PHNOM', name: 'Phnom Penh' },
        { code: 'SIEM', name: 'Siem Reap' },
        { code: 'BATTAMBANG', name: 'Battambang' },
        { code: 'KOMPONG', name: 'Kompong Cham' }
      ]
    }
  ]
};

export default cambodia;
