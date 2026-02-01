/**
 * Tunisia country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const tunisia: Country = {
  code: 'TN',
  name: 'Tunisia',
  taxInfo: { standardRate: 19, taxName: 'VAT', currency: 'TND', region: 'MEA' },
  provinces: [
    { code: 'TUNIS', name: 'Tunis',
      cities: [
        { code: 'TUNIS', name: 'Tunis' },
        { code: 'SFAX', name: 'Sfax' },
        { code: 'Sousse', name: 'Sousse' },
        { code: 'KAIROUAN', name: 'Kairouan' },
        { code: 'BIZERTE', name: 'Bizerte' },
        { code: 'GABES', name: 'Gabès' },
        { code: 'ARIANA', name: 'Ariana' },
        { code: 'BEN', name: 'Ben Arous' },
        { code: 'MONASTIR', name: 'Monastir' },
        { code: 'NABEUL', name: 'Nabeul' }
      ]
    }
  ]
};

export default tunisia;
