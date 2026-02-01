/**
 * Kyrgyzstan country data with regions and cities
 */

import { Country } from './index';

export const kyrgyzstan: Country = {
  code: 'KG',
  name: 'Kyrgyzstan',
  flag: '🇰🇬',
  capital: 'Bishkek',
  area: 199951,
  currencySymbol: 'с',
  officialLanguages: ['Kyrgyz', 'Russian'],
  demonym: 'Kyrgyz',
  taxInfo: { standardRate: 12, taxName: 'VAT', currency: 'KGS', region: 'APAC' },
  divisions: [
    { code: 'BIS', name: 'Bishkek', type: 'region',
      cities: [
        { code: 'BISHKEK', name: 'Bishkek' },
        { code: 'OSH', name: 'Osh' },
        { code: 'JALAL', name: 'Jalal-Abad' },
        { code: 'KARAKOL', name: 'Karakol' },
        { code: 'NARYN', name: 'Naryn' }
      ]
    },
    { code: 'OSH', name: 'Osh', type: 'region',
      cities: [
        { code: 'OSH', name: 'Osh' },
        { code: 'JALAL', name: 'Jalal-Abad' },
        { code: 'KARAKOL', name: 'Karakol' },
        { code: 'NARYN', name: 'Naryn' },
        { code: 'BISHKEK', name: 'Bishkek' }
      ]
    },
    { code: 'JAL', name: 'Jalal-Abad', type: 'region',
      cities: [
        { code: 'JALAL', name: 'Jalal-Abad' },
        { code: 'KARAKOL', name: 'Karakol' },
        { code: 'NARYN', name: 'Naryn' },
        { code: 'BISHKEK', name: 'Bishkek' },
        { code: 'OSH', name: 'Osh' }
      ]
    },
    { code: 'KAR', name: 'Karakol', type: 'region',
      cities: [
        { code: 'KARAKOL', name: 'Karakol' },
        { code: 'NARYN', name: 'Naryn' },
        { code: 'BISHKEK', name: 'Bishkek' },
        { code: 'OSH', name: 'Osh' },
        { code: 'JALAL', name: 'Jalal-Abad' }
      ]
    },
    { code: 'NAR', name: 'Naryn', type: 'region',
      cities: [
        { code: 'NARYN', name: 'Naryn' },
        { code: 'BISHKEK', name: 'Bishkek' },
        { code: 'OSH', name: 'Osh' },
        { code: 'JALAL', name: 'Jalal-Abad' },
        { code: 'KARAKOL', name: 'Karakol' }
      ]
    }
  ]
};

export default kyrgyzstan;
