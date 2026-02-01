/**
 * Australia country data with states, territories, and cities
 */

import { Country } from './index';

export const australia: Country = {
  code: 'AU',
  name: 'Australia',
  flag: '🇦🇺',
  capital: 'Canberra',
  area: 7692024,
  currencySymbol: '$',
  officialLanguages: ['English'],
  demonym: 'Australian',
  taxInfo: { standardRate: 10, taxName: 'GST', currency: 'AUD', region: 'APAC' },
  divisions: [
    { code: 'NSW', name: 'New South Wales', type: 'state',
      cities: [
        { code: 'SYD', name: 'Sydney' },
        { code: 'NEW', name: 'Newcastle' },
        { code: 'WOL', name: 'Wollongong' },
        { code: 'CAN', name: 'Canberra' },
        { code: 'CEN', name: 'Central Coast' }
      ]
    },
    { code: 'VIC', name: 'Victoria', type: 'state',
      cities: [
        { code: 'MEL', name: 'Melbourne' },
        { code: 'GEEL', name: 'Geelong' },
        { code: 'BALL', name: 'Ballarat' },
        { code: 'BEND', name: 'Bendigo' },
        { code: 'SHEPP', name: 'Shepparton' }
      ]
    },
    { code: 'QLD', name: 'Queensland', type: 'state',
      cities: [
        { code: 'BRI', name: 'Brisbane' },
        { code: 'GC', name: 'Gold Coast' },
        { code: 'SUN', name: 'Sunshine Coast' },
        { code: 'TOW', name: 'Townsville' },
        { code: 'CAIR', name: 'Cairns' }
      ]
    },
    { code: 'WA', name: 'Western Australia', type: 'state',
      cities: [
        { code: 'PER', name: 'Perth' },
        { code: 'BUN', name: 'Bunbury' },
        { code: 'GER', name: 'Geraldton' },
        { code: 'KAL', name: 'Kalgoorlie' },
        { code: 'ALB', name: 'Albany' }
      ]
    },
    { code: 'SA', name: 'South Australia', type: 'state',
      cities: [
        { code: 'ADE', name: 'Adelaide' },
        { code: 'MOUNT', name: 'Mount Gambier' },
        { code: 'WHY', name: 'Whyalla' },
        { code: 'PORT', name: 'Port Augusta' },
        { code: 'MUR', name: 'Murray Bridge' }
      ]
    },
    { code: 'TAS', name: 'Tasmania', type: 'state',
      cities: [
        { code: 'HOB', name: 'Hobart' },
        { code: 'LAUN', name: 'Launceston' },
        { code: 'BURN', name: 'Burnie' },
        { code: 'DEV', name: 'Devonport' },
        { code: 'ULV', name: 'Ulverstone' }
      ]
    },
    { code: 'NT', name: 'Northern Territory', type: 'territory',
      cities: [
        { code: 'DAR', name: 'Darwin' },
        { code: 'ALICE', name: 'Alice Springs' },
        { code: 'KATH', name: 'Katherine' },
        { code: 'TENN', name: 'Tennant Creek' },
        { code: 'PALM', name: 'Palmerston' }
      ]
    },
    { code: 'ACT', name: 'Australian Capital Territory', type: 'territory',
      cities: [
        { code: 'CANB', name: 'Canberra' },
        { code: 'QUEAN', name: 'Queanbeyan' },
        { code: 'YASS', name: 'Yass' },
        { code: 'GUNGA', name: 'Gungahlin' },
        { code: 'TUGG', name: 'Tuggeranong' }
      ]
    }
  ]
};

export default australia;
