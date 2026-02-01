/**
 * Angola country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const angola: Country = {
  code: 'AO',
  name: 'Angola',
  taxInfo: { standardRate: 14, taxName: 'VAT', currency: 'AOA', region: 'MEA' },
  provinces: [
    { code: 'LUANDA', name: 'Luanda',
      cities: [
        { code: 'LUANDA', name: 'Luanda' },
        { code: 'HUAMBO', name: 'Huambo' },
        { code: 'LOBITO', name: 'Lobito' },
        { code: 'KUITO', name: 'Kuito' },
        { code: 'LUBANGO', name: 'Lubango' },
        { code: 'MALANJE', name: 'Malanje' },
        { code: 'NAMIBE', name: 'Namibe' },
        { code: 'SOYO', name: 'Soyo' },
        { code: 'CABINDA', name: 'Cabinda' },
        { code: 'SUMBE', name: 'Sumbe' }
      ]
    }
  ]
};

export default angola;
