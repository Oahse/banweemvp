/**
 * Israel country data with districts and cities
 */

import { Country } from './index';

export const israel: Country = {
  code: 'IL',
  name: 'Israel',
  flag: '🇮🇱',
  capital: 'Jerusalem',
  area: 20770,
  currencySymbol: '₪',
  officialLanguages: ['Hebrew', 'Arabic'],
  demonym: 'Israeli',
  taxInfo: { standardRate: 17, taxName: 'VAT', currency: 'ILS', region: 'MEA' },
  divisions: [
    { code: 'JER', name: 'Jerusalem', type: 'district',
      cities: [
        { code: 'JERUSALEM', name: 'Jerusalem' },
        { code: 'TEL', name: 'Tel Aviv' },
        { code: 'HAIFA', name: 'Haifa' },
        { code: 'BEER', name: 'Beer Sheva' },
        { code: 'NETANYA', name: 'Netanya' }
      ]
    },
    { code: 'TEL', name: 'Tel Aviv', type: 'district',
      cities: [
        { code: 'TEL', name: 'Tel Aviv' },
        { code: 'HAIFA', name: 'Haifa' },
        { code: 'BEER', name: 'Beer Sheva' },
        { code: 'NETANYA', name: 'Netanya' },
        { code: 'JERUSALEM', name: 'Jerusalem' }
      ]
    },
    { code: 'HAI', name: 'Haifa', type: 'district',
      cities: [
        { code: 'HAIFA', name: 'Haifa' },
        { code: 'BEER', name: 'Beer Sheva' },
        { code: 'NETANYA', name: 'Netanya' },
        { code: 'JERUSALEM', name: 'Jerusalem' },
        { code: 'TEL', name: 'Tel Aviv' }
      ]
    },
    { code: 'BEE', name: 'Beer Sheva', type: 'district',
      cities: [
        { code: 'BEER', name: 'Beer Sheva' },
        { code: 'NETANYA', name: 'Netanya' },
        { code: 'JERUSALEM', name: 'Jerusalem' },
        { code: 'TEL', name: 'Tel Aviv' },
        { code: 'HAIFA', name: 'Haifa' }
      ]
    },
    { code: 'NET', name: 'Netanya', type: 'district',
      cities: [
        { code: 'NETANYA', name: 'Netanya' },
        { code: 'JERUSALEM', name: 'Jerusalem' },
        { code: 'TEL', name: 'Tel Aviv' },
        { code: 'HAIFA', name: 'Haifa' },
        { code: 'BEER', name: 'Beer Sheva' }
      ]
    }
  ]
};

export default israel;
