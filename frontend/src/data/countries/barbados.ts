/**
 * Barbados country data with parishes, cities, and tax information
 */

import { Country } from './index';

export const barbados: Country = {
    code: 'BB',
    name: 'Barbados',
    taxInfo: { standardRate: 17.5, taxName: 'VAT', currency: 'BBD', region: 'LATAM' },
    provinces: [
      { code: 'BRIDGETOWN', name: 'Bridgetown',
        cities: [
          { code: 'BRIDGETOWN', name: 'Bridgetown' },
          { code: 'HOLETOWN', name: 'Holetown' },
          { code: 'SPRING', name: 'Spring Garden' },
          { code: 'PAYNES', name: 'Paynes Bay' },
          { code: 'BATH', name: 'Bathsheba' },
          { code: 'SPEIGHTSTOWN', name: 'Speightstown' },
          { code: 'ST', name: 'St. Lawrence' },
          { code: 'ST2', name: 'St. James' }
        ]
      }
    ]
};
