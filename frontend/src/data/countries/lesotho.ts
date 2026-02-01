/**
 * Lesotho country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const lesotho: Country = {
  code: 'LS',
  name: 'Lesotho',
  taxInfo: { standardRate: 14, taxName: 'VAT', currency: 'LSL', region: 'MEA' },
  provinces: [
    { code: 'MASERU', name: 'Maseru',
      cities: [
        { code: 'MASERU', name: 'Maseru' },
        { code: 'MAFETENG', name: 'Mafeteng' },
        { code: 'LERIBE', name: 'Leribe' },
        { code: 'MOHALE', name: 'Mohale\'s Hoek' },
        { code: 'QUTHING', name: 'Quthing' },
        { code: 'BUTHA', name: 'Butha-Buthe' },
        { code: 'MOKHOTLONG', name: 'Mokhotlong' },
        { code: 'THABA', name: 'Thaba-Tseka' },
        { code: 'QACHAS', name: 'Qacha\'s Nek' },
        { code: 'ROMA', name: 'Roma' }
      ]
    }
  ]
};

export default lesotho;
