/**
 * Morocco country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const morocco: Country = {
  code: 'MA',
  name: 'Morocco',
  taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'MAD', region: 'MEA' },
  provinces: [
    { code: 'CASABLANCA', name: 'Casablanca-Settat',
      cities: [
        { code: 'CASA', name: 'Casablanca' },
        { code: 'RABAT', name: 'Rabat' },
        { code: 'MARRAKECH', name: 'Marrakech' },
        { code: 'FEZ', name: 'Fez' },
        { code: 'TANGIER', name: 'Tangier' },
        { code: 'SALE', name: 'Salé' },
        { code: 'MEKNES', name: 'Meknes' },
        { code: 'OUJDA', name: 'Oujda' },
        { code: 'KENITRA', name: 'Kenitra' },
        { code: 'TETOUAN', name: 'Tetouan' }
      ]
    }
  ]
};

export default morocco;
