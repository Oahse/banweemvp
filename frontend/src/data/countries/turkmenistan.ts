/**
 * Turkmenistan country data with regions and cities
 */

import { Country } from './index';

export const turkmenistan: Country = {
  code: 'TM',
  name: 'Turkmenistan',
  flag: '🇹🇲',
  capital: 'Ashgabat',
  area: 491200,
  currencySymbol: 'm',
  officialLanguages: ['Turkmen'],
  demonym: 'Turkmen',
  taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'TMT', region: 'APAC' },
  divisions: [
    { code: 'ASH', name: 'Ashgabat', type: 'region',
      cities: [
        { code: 'ASHGABAT', name: 'Ashgabat' },
        { code: 'TURKMENBASHI', name: 'Turkmenbashi' },
        { code: 'DASHOGUZ', name: 'Dashoguz' },
        { code: 'MARY', name: 'Mary' },
        { code: 'TEJEN', name: 'Tejen' }
      ]
    },
    { code: 'TUR', name: 'Turkmenbashi', type: 'region',
      cities: [
        { code: 'TURKMENBASHI', name: 'Turkmenbashi' },
        { code: 'DASHOGUZ', name: 'Dashoguz' },
        { code: 'MARY', name: 'Mary' },
        { code: 'TEJEN', name: 'Tejen' },
        { code: 'ASHGABAT', name: 'Ashgabat' }
      ]
    },
    { code: 'DAS', name: 'Dashoguz', type: 'region',
      cities: [
        { code: 'DASHOGUZ', name: 'Dashoguz' },
        { code: 'MARY', name: 'Mary' },
        { code: 'TEJEN', name: 'Tejen' },
        { code: 'ASHGABAT', name: 'Ashgabat' },
        { code: 'TURKMENBASHI', name: 'Turkmenbashi' }
      ]
    },
    { code: 'MAR', name: 'Mary', type: 'region',
      cities: [
        { code: 'MARY', name: 'Mary' },
        { code: 'TEJEN', name: 'Tejen' },
        { code: 'ASHGABAT', name: 'Ashgabat' },
        { code: 'TURKMENBASHI', name: 'Turkmenbashi' },
        { code: 'DASHOGUZ', name: 'Dashoguz' }
      ]
    },
    { code: 'TEJ', name: 'Tejen', type: 'region',
      cities: [
        { code: 'TEJEN', name: 'Tejen' },
        { code: 'ASHGABAT', name: 'Ashgabat' },
        { code: 'TURKMENBASHI', name: 'Turkmenbashi' },
        { code: 'DASHOGUZ', name: 'Dashoguz' },
        { code: 'MARY', name: 'Mary' }
      ]
    }
  ]
};

export default turkmenistan;
