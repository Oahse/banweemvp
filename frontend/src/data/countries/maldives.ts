/**
 * Maldives country data with atolls and cities
 */

import { Country } from './index';

export const maldives: Country = {
  code: 'MV',
  name: 'Maldives',
  flag: '🇲🇻',
  capital: 'Malé',
  area: 298,
  currencySymbol: 'Rf',
  officialLanguages: ['Dhivehi'],
  demonym: 'Maldivian',
  taxInfo: { standardRate: 6, taxName: 'GST', currency: 'MVR', region: 'APAC' },
  divisions: [
    { code: 'MAL', name: 'Malé', type: 'atoll',
      cities: [
        { code: 'MALE', name: 'Malé' },
        { code: 'ADDU', name: 'Addu City' },
        { code: 'FUVAMULAH', name: 'Fuvahmulah' },
        { code: 'HITHADHOO', name: 'Hithadhoo' },
        { code: 'KULHUDHUFFUSHI', name: 'Kulhudhuffushi' }
      ]
    },
    { code: 'ADD', name: 'Addu', type: 'atoll',
      cities: [
        { code: 'ADDU', name: 'Addu City' },
        { code: 'FUVAMULAH', name: 'Fuvahmulah' },
        { code: 'HITHADHOO', name: 'Hithadhoo' },
        { code: 'KULHUDHUFFUSHI', name: 'Kulhudhuffushi' },
        { code: 'MALE', name: 'Malé' }
      ]
    },
    { code: 'FUV', name: 'Fuvahmulah', type: 'atoll',
      cities: [
        { code: 'FUVAMULAH', name: 'Fuvahmulah' },
        { code: 'HITHADHOO', name: 'Hithadhoo' },
        { code: 'KULHUDHUFFUSHI', name: 'Kulhudhuffushi' },
        { code: 'MALE', name: 'Malé' },
        { code: 'ADDU', name: 'Addu City' }
      ]
    },
    { code: 'HIT', name: 'Hithadhoo', type: 'atoll',
      cities: [
        { code: 'HITHADHOO', name: 'Hithadhoo' },
        { code: 'KULHUDHUFFUSHI', name: 'Kulhudhuffushi' },
        { code: 'MALE', name: 'Malé' },
        { code: 'ADDU', name: 'Addu City' },
        { code: 'FUVAMULAH', name: 'Fuvahmulah' }
      ]
    },
    { code: 'KUL', name: 'Kulhudhuffushi', type: 'atoll',
      cities: [
        { code: 'KULHUDHUFFUSHI', name: 'Kulhudhuffushi' },
        { code: 'MALE', name: 'Malé' },
        { code: 'ADDU', name: 'Addu City' },
        { code: 'FUVAMULAH', name: 'Fuvahmulah' },
        { code: 'HITHADHOO', name: 'Hithadhoo' }
      ]
    }
  ]
};

export default maldives;
