/**
 * Tanzania country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const tanzania: Country = {
  code: 'TZ',
  name: 'Tanzania',
  taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'TZS', region: 'MEA' },
  provinces: [
    { code: 'DAR', name: 'Dar es Salaam',
      cities: [
        { code: 'DAR', name: 'Dar es Salaam' },
        { code: 'MWANZA', name: 'Mwanza' },
        { code: 'ARUSHA', name: 'Arusha' },
        { code: 'DODOMA', name: 'Dodoma' },
        { code: 'MBEYA', name: 'Mbeya' },
        { code: 'TANGA', name: 'Tanga' },
        { code: 'MOROGORO', name: 'Morogoro' },
        { code: 'IRINGA', name: 'Iringa' },
        { code: 'KIGOMA', name: 'Kigoma' },
        { code: 'TABORA', name: 'Tabora' }
      ]
    }
  ]
};

export default tanzania;
