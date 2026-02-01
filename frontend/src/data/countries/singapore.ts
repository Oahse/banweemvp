/**
 * Singapore country data with regions and cities
 */

import { Country } from './index';

export const singapore: Country = {
  code: 'SG',
  name: 'Singapore',
  flag: '🇸🇬',
  capital: 'Singapore',
  area: 719,
  currencySymbol: 'S$',
  officialLanguages: ['English', 'Mandarin', 'Malay', 'Tamil'],
  demonym: 'Singaporean',
  taxInfo: { standardRate: 8, taxName: 'GST', currency: 'SGD', region: 'APAC' },
  divisions: [
    { code: 'CEN', name: 'Central', type: 'region',
      cities: [
        { code: 'SINGAPORE', name: 'Singapore' },
        { code: 'ORCHARD', name: 'Orchard' },
        { code: 'MARINA', name: 'Marina Bay' },
        { code: 'RAFFLES', name: 'Raffles Place' },
        { code: 'CHINATOWN', name: 'Chinatown' }
      ]
    },
    { code: 'EAS', name: 'East', type: 'region',
      cities: [
        { code: 'EAST', name: 'East Singapore' },
        { code: 'BEDOK', name: 'Bedok' },
        { code: 'TAMPINES', name: 'Tampines' },
        { code: 'PASIR', name: 'Pasir Ris' },
        { code: 'CHANGI', name: 'Changi' }
      ]
    },
    { code: 'WES', name: 'West', type: 'region',
      cities: [
        { code: 'WEST', name: 'West Singapore' },
        { code: 'JURONG', name: 'Jurong' },
        { code: 'BUKIT', name: 'Bukit Timah' },
        { code: 'CLEMENTI', name: 'Clementi' },
        { code: 'QUEEN', name: 'Queenstown' }
      ]
    },
    { code: 'NOR', name: 'North', type: 'region',
      cities: [
        { code: 'NORTH', name: 'North Singapore' },
        { code: 'WOODLANDS', name: 'Woodlands' },
        { code: 'YISHUN', name: 'Yishun' },
        { code: 'SEMBAWANG', name: 'Sembawang' },
        { code: 'MANDAI', name: 'Mandai' }
      ]
    },
    { code: 'NOR-EAS', name: 'Northeast', type: 'region',
      cities: [
        { code: 'NORTHEAST', name: 'Northeast Singapore' },
        { code: 'ANG', name: 'Ang Mo Kio' },
        { code: 'HOUGANG', name: 'Hougang' },
        { code: 'SERANGOON', name: 'Serangoon' },
        { code: 'PUNGGOL', name: 'Punggol' }
      ]
    }
  ]
};

export default singapore;
