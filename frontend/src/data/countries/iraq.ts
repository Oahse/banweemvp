/**
 * Iraq country data with governorates and cities
 */

import { Country } from './index';

export const iraq: Country = {
  code: 'IQ',
  name: 'Iraq',
  flag: '🇮🇶',
  capital: 'Baghdad',
  area: 438317,
  currencySymbol: 'ع.د',
  officialLanguages: ['Arabic', 'Kurdish'],
  demonym: 'Iraqi',
  taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'IQD', region: 'MEA' },
  divisions: [
    { code: 'BAG', name: 'Baghdad', type: 'governorate',
      cities: [
        { code: 'BAGHDAD', name: 'Baghdad' },
        { code: 'BASRA', name: 'Basra' },
        { code: 'MOSUL', name: 'Mosul' },
        { code: 'ERBIL', name: 'Erbil' },
        { code: 'SULAYMANIYAH', name: 'Sulaymaniyah' }
      ]
    },
    { code: 'BAS', name: 'Basra', type: 'governorate',
      cities: [
        { code: 'BASRA', name: 'Basra' },
        { code: 'MOSUL', name: 'Mosul' },
        { code: 'ERBIL', name: 'Erbil' },
        { code: 'SULAYMANIYAH', name: 'Sulaymaniyah' },
        { code: 'BAGHDAD', name: 'Baghdad' }
      ]
    },
    { code: 'MOS', name: 'Mosul', type: 'governorate',
      cities: [
        { code: 'MOSUL', name: 'Mosul' },
        { code: 'ERBIL', name: 'Erbil' },
        { code: 'SULAYMANIYAH', name: 'Sulaymaniyah' },
        { code: 'BAGHDAD', name: 'Baghdad' },
        { code: 'BASRA', name: 'Basra' }
      ]
    },
    { code: 'ERB', name: 'Erbil', type: 'governorate',
      cities: [
        { code: 'ERBIL', name: 'Erbil' },
        { code: 'SULAYMANIYAH', name: 'Sulaymaniyah' },
        { code: 'BAGHDAD', name: 'Baghdad' },
        { code: 'BASRA', name: 'Basra' },
        { code: 'MOSUL', name: 'Mosul' }
      ]
    },
    { code: 'SUL', name: 'Sulaymaniyah', type: 'governorate',
      cities: [
        { code: 'SULAYMANIYAH', name: 'Sulaymaniyah' },
        { code: 'BAGHDAD', name: 'Baghdad' },
        { code: 'BASRA', name: 'Basra' },
        { code: 'MOSUL', name: 'Mosul' },
        { code: 'ERBIL', name: 'Erbil' }
      ]
    }
  ]
};

export default iraq;
