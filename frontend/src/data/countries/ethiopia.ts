/**
 * Ethiopia country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const ethiopia: Country = {
  code: 'ET',
  name: 'Ethiopia',
  taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'ETB', region: 'MEA' },
  provinces: [
    { code: 'ADDIS', name: 'Addis Ababa',
      cities: [
        { code: 'ADDIS', name: 'Addis Ababa' },
        { code: 'DIRE', name: 'Dire Dawa' },
        { code: 'MEKELE', name: 'Mekelle' },
        { code: 'BAHIR', name: 'Bahir Dar' },
        { code: 'GONDAR', name: 'Gondar' },
        { code: 'JIMMA', name: 'Jimma' },
        { code: 'HAWASSA', name: 'Hawassa' },
        { code: 'ADAMA', name: 'Adama' },
        { code: 'SHASHAMENE', name: 'Shashamene' },
        { code: 'DEBRE', name: 'Debre Berhan' }
      ]
    }
  ]
};

export default ethiopia;
