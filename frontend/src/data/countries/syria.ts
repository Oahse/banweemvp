/**
 * Syria country data with governorates and cities
 */

import { Country } from './index';

export const syria: Country = {
  code: 'SY',
  name: 'Syria',
  flag: '🇸🇾',
  capital: 'Damascus',
  area: 185180,
  currencySymbol: '£S',
  officialLanguages: ['Arabic'],
  demonym: 'Syrian',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'USD', region: 'MEA' },
  divisions: [
    { code: 'DAM', name: 'Damascus', type: 'governorate',
      cities: [
        { code: 'DAMASCUS', name: 'Damascus' },
        { code: 'ALEPPO', name: 'Aleppo' },
        { code: 'HOMS', name: 'Homs' },
        { code: 'LATAKIA', name: 'Latakia' },
        { code: 'HAMA', name: 'Hama' }
      ]
    },
    { code: 'ALE', name: 'Aleppo', type: 'governorate',
      cities: [
        { code: 'ALEPPO', name: 'Aleppo' },
        { code: 'HOMS', name: 'Homs' },
        { code: 'LATAKIA', name: 'Latakia' },
        { code: 'HAMA', name: 'Hama' },
        { code: 'DAMASCUS', name: 'Damascus' }
      ]
    },
    { code: 'HOM', name: 'Homs', type: 'governorate',
      cities: [
        { code: 'HOMS', name: 'Homs' },
        { code: 'LATAKIA', name: 'Latakia' },
        { code: 'HAMA', name: 'Hama' },
        { code: 'DAMASCUS', name: 'Damascus' },
        { code: 'ALEPPO', name: 'Aleppo' }
      ]
    },
    { code: 'LAT', name: 'Latakia', type: 'governorate',
      cities: [
        { code: 'LATAKIA', name: 'Latakia' },
        { code: 'HAMA', name: 'Hama' },
        { code: 'DAMASCUS', name: 'Damascus' },
        { code: 'ALEPPO', name: 'Aleppo' },
        { code: 'HOMS', name: 'Homs' }
      ]
    },
    { code: 'HAM', name: 'Hama', type: 'governorate',
      cities: [
        { code: 'HAMA', name: 'Hama' },
        { code: 'DAMASCUS', name: 'Damascus' },
        { code: 'ALEPPO', name: 'Aleppo' },
        { code: 'HOMS', name: 'Homs' },
        { code: 'LATAKIA', name: 'Latakia' }
      ]
    }
  ]
};

export default syria;
