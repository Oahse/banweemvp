/**
 * Cameroon country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const cameroon: Country = {
  code: 'CM',
  name: 'Cameroon',
  taxInfo: { standardRate: 19.25, taxName: 'VAT', currency: 'XAF', region: 'MEA' },
  provinces: [
    { code: 'DOUALA', name: 'Littoral',
      cities: [
        { code: 'DOUALA', name: 'Douala' },
        { code: 'YAOUNDE', name: 'Yaoundé' },
        { code: 'BAFOUSSAM', name: 'Bafoussam' },
        { code: 'GAROUA', name: 'Garoua' },
        { code: 'MAROUA', name: 'Maroua' },
        { code: 'BAFANG', name: 'Bafang' },
        { code: 'KUMBA', name: 'Kumba' },
        { code: 'NGAOUNDERE', name: 'Ngaoundéré' },
        { code: 'BERTOUA', name: 'Bertoua' },
        { code: 'EDEA', name: 'Edéa' }
      ]
    }
  ]
};

export default cameroon;
