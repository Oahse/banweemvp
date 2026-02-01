/**
 * British Indian Ocean Territory country data with islands and cities
 */

import { Country } from './index';

export const britishindianoceanterritory: Country = {
  code: 'IO',
  name: 'British Indian Ocean Territory',
  flag: '🇮🇴',
  capital: 'Diego Garcia',
  area: 60,
  currencySymbol: '$',
  officialLanguages: ['English'],
  demonym: 'British Indian Ocean Territory',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'USD', region: 'APAC' },
  divisions: [
    { code: 'DIE', name: 'Diego Garcia', type: 'island',
      cities: [
        { code: 'DIEGO', name: 'Diego Garcia' },
        { code: 'CAMP', name: 'Camp Justice' },
        { code: 'PLANT', name: 'Plantation' },
        { code: 'AIRFIELD', name: 'Airfield' },
        { code: 'HOUSING', name: 'Housing Area' }
      ]
    },
    { code: 'CAM', name: 'Camp Justice', type: 'island',
      cities: [
        { code: 'CAMP', name: 'Camp Justice' },
        { code: 'PLANT', name: 'Plantation' },
        { code: 'AIRFIELD', name: 'Airfield' },
        { code: 'HOUSING', name: 'Housing Area' },
        { code: 'DIEGO', name: 'Diego Garcia' }
      ]
    },
    { code: 'PLA', name: 'Plantation', type: 'island',
      cities: [
        { code: 'PLANT', name: 'Plantation' },
        { code: 'AIRFIELD', name: 'Airfield' },
        { code: 'HOUSING', name: 'Housing Area' },
        { code: 'DIEGO', name: 'Diego Garcia' },
        { code: 'CAMP', name: 'Camp Justice' }
      ]
    },
    { code: 'AIR', name: 'Airfield', type: 'island',
      cities: [
        { code: 'AIRFIELD', name: 'Airfield' },
        { code: 'HOUSING', name: 'Housing Area' },
        { code: 'DIEGO', name: 'Diego Garcia' },
        { code: 'CAMP', name: 'Camp Justice' },
        { code: 'PLANT', name: 'Plantation' }
      ]
    },
    { code: 'HOU', name: 'Housing Area', type: 'island',
      cities: [
        { code: 'HOUSING', name: 'Housing Area' },
        { code: 'DIEGO', name: 'Diego Garcia' },
        { code: 'CAMP', name: 'Camp Justice' },
        { code: 'PLANT', name: 'Plantation' },
        { code: 'AIRFIELD', name: 'Airfield' }
      ]
    }
  ]
};
