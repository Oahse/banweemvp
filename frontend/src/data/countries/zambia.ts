/**
 * Zambia country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const zambia: Country = {
  code: 'ZM',
  name: 'Zambia',
  taxInfo: { standardRate: 16, taxName: 'VAT', currency: 'ZMW', region: 'MEA' },
  provinces: [
    { code: 'LUSAKA', name: 'Lusaka',
      cities: [
        { code: 'LUSAKA', name: 'Lusaka' },
        { code: 'KITWE', name: 'Kitwe' },
        { code: 'NDOLA', name: 'Ndola' },
        { code: 'KABWE', name: 'Kabwe' },
        { code: 'CHINGOLA', name: 'Chingola' },
        { code: 'MUFULIRA', name: 'Mufulira' },
        { code: 'LIVINGSTONE', name: 'Livingstone' },
        { code: 'LUANSHYA', name: 'Luanshya' },
        { code: 'KASAMA', name: 'Kasama' },
        { code: 'CHIPATA', name: 'Chipata' }
      ]
    }
  ]
};

export default zambia;
