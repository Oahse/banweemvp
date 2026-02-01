/**
 * Sri Lanka country data with provinces and cities
 */

import { Country } from './index';

export const srilanka: Country = {
  code: 'LK',
  name: 'Sri Lanka',
  flag: '🇱🇰',
  capital: 'Colombo',
  area: 65610,
  currencySymbol: 'Rs',
  officialLanguages: ['Sinhala', 'Tamil', 'English'],
  demonym: 'Sri Lankan',
  taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'LKR', region: 'APAC' },
  divisions: [
    { code: 'COL', name: 'Colombo', type: 'province',
      cities: [
        { code: 'COLOMBO', name: 'Colombo' },
        { code: 'KANDY', name: 'Kandy' },
        { code: 'GALLE', name: 'Galle' },
        { code: 'JAFFNA', name: 'Jaffna' },
        { code: 'TRINCOMALEE', name: 'Trincomalee' }
      ]
    },
    { code: 'KAN', name: 'Kandy', type: 'province',
      cities: [
        { code: 'KANDY', name: 'Kandy' },
        { code: 'GALLE', name: 'Galle' },
        { code: 'JAFFNA', name: 'Jaffna' },
        { code: 'TRINCOMALEE', name: 'Trincomalee' },
        { code: 'COLOMBO', name: 'Colombo' }
      ]
    },
    { code: 'GAL', name: 'Galle', type: 'province',
      cities: [
        { code: 'GALLE', name: 'Galle' },
        { code: 'JAFFNA', name: 'Jaffna' },
        { code: 'TRINCOMALEE', name: 'Trincomalee' },
        { code: 'COLOMBO', name: 'Colombo' },
        { code: 'KANDY', name: 'Kandy' }
      ]
    },
    { code: 'JAF', name: 'Jaffna', type: 'province',
      cities: [
        { code: 'JAFFNA', name: 'Jaffna' },
        { code: 'TRINCOMALEE', name: 'Trincomalee' },
        { code: 'COLOMBO', name: 'Colombo' },
        { code: 'KANDY', name: 'Kandy' },
        { code: 'GALLE', name: 'Galle' }
      ]
    },
    { code: 'TRI', name: 'Trincomalee', type: 'province',
      cities: [
        { code: 'TRINCOMALEE', name: 'Trincomalee' },
        { code: 'COLOMBO', name: 'Colombo' },
        { code: 'KANDY', name: 'Kandy' },
        { code: 'GALLE', name: 'Galle' },
        { code: 'JAFFNA', name: 'Jaffna' }
      ]
    }
  ]
};

export default srilanka;
