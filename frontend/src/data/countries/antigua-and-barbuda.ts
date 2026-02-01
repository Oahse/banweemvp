/**
 * Antigua and Barbuda country data with parishes, cities, and tax information
 */

import { Country } from './index';

export const antiguaAndBarbuda: Country = {
    code: 'AG',
    name: 'Antigua and Barbuda',
    taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'XCD', region: 'LATAM' },
    provinces: [
      { code: 'ST', name: 'St. John\'s',
        cities: [
          { code: 'ST', name: 'St. John\'s' },
          { code: 'CODRINGTON', name: 'Codrington' },
          { code: 'LIBERTA', name: 'Liberta' },
          { code: 'BOLANS', name: 'Bolans' },
          { code: 'ALL', name: 'All Saints' },
          { code: 'SEATON', name: 'Seaton' },
          { code: 'POTTERS', name: 'Potters Village' },
          { code: 'SWETES', name: 'Swetes' },
          { code: 'PARHAM', name: 'Parham' },
          { code: 'OLYMPUS', name: 'Olympus' }
        ]
      }
    ]
};
