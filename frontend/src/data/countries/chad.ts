/**
 * Chad country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const chad: Country = {
  code: 'TD',
  name: 'Chad',
  taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'XAF', region: 'MEA' },
  provinces: [
    { code: 'NDJAMENA', name: 'N\'Djamena',
      cities: [
        { code: 'NDJAMENA', name: 'N\'Djamena' },
        { code: 'MOUNDOU', name: 'Moundou' },
        { code: 'SARH', name: 'Sarh' },
        { code: 'ABECHE', name: 'Abéché' },
        { code: 'DOBA', name: 'Doba' },
        { code: 'KELLO', name: 'Kéllé' },
        { code: 'BILTINE', name: 'Biltine' },
        { code: 'FAYA', name: 'Faya-Largeau' },
        { code: 'BONGOR', name: 'Bongor' },
        { code: 'MASSAGUET', name: 'Massaguet' }
      ]
    }
  ]
};

export default chad;
