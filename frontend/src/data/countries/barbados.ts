/**
 * Barbados country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const barbados: Country = {
  code: 'BB',
  name: 'Barbados',
  provinces: [
    { code: 'BRIDGETOWN', name: 'Bridgetown',
      cities: [
        { code: 'BRIDGETOWN', name: 'Bridgetown', taxInfo: { taxName: 'No VAT', currency: 'USD', region: 'NA' }},
        { code: 'SPRING', name: 'Spring Garden' },
        { code: 'HASTINGS', name: 'Hastings' },
        { code: 'OISTINS', name: 'Oistins' },
        { code: 'HOLETOWN', name: 'Holetown' },
        { code: 'PAYNES', name: 'Paynes Bay' },
        { code: 'BATH', name: 'Bathsheba' },
        { code: 'SPEIGHTSTOWN', name: 'Speightstown' },
        { code: 'ST', name: 'St. Lawrence' },
        { code: 'ST2', name: 'St. James' }
      ]
    }
  ]
};

export default barbados;
