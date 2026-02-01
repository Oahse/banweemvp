/**
 * Saint Vincent and the Grenadines country data with parishes, cities, and tax information
 */

import { Country } from './index';

export const saintVincentAndTheGrenadines: Country = {
    code: 'VC',
    name: 'Saint Vincent and the Grenadines',
    taxInfo: { standardRate: 16, taxName: 'VAT', currency: 'XCD', region: 'LATAM' },
    provinces: [
      { code: 'KINGSTOWN', name: 'Kingstown',
        cities: [
          { code: 'KINGSTOWN', name: 'Kingstown' },
          { code: 'BARROUALIE', name: 'Barrouallie' },
          { code: 'GEORGETOWN', name: 'Georgetown' },
          { code: 'LAYOU', name: 'Layou' },
          { code: 'PORT', name: 'Port Elizabeth' },
          { code: 'CHATEAUBELAIR', name: 'Chateaubelair' },
          { code: 'BEQUIA', name: 'Bequia' },
          { code: 'UNION', name: 'Union Island' },
          { code: 'CANOUAN', name: 'Canouan' },
          { code: 'MUSTIQUE', name: 'Mustique' }
        ]
      }
    ]
};
