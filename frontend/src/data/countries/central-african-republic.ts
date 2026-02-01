/**
 * Central African Republic country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const centralafricanrepublic: Country = {
  code: 'CF',
  name: 'Central African Republic',
  taxInfo: { standardRate: 19, taxName: 'VAT', currency: 'XAF', region: 'MEA' },
  provinces: [
    { code: 'BANGUI', name: 'Bangui',
      cities: [
        { code: 'BANGUI', name: 'Bangui' },
        { code: 'BERBERATI', name: 'Berberati' },
        { code: 'BOSSANGOA', name: 'Bossangoa' },
        { code: 'BAMBERI', name: 'Bambari' },
        { code: 'BOUAR', name: 'Bouar' },
        { code: 'BAMBARI', name: 'Bambari' },
        { code: 'KAGA', name: 'Kaga-Bandoro' },
        { code: 'MONGOU', name: 'Mongoumba' },
        { code: 'SIBUT', name: 'Sibut' },
        { code: 'BANGASSOU', name: 'Bangassou' }
      ]
    }
  ]
};

export default centralafricanrepublic;
