/**
 * Svalbard and Jan Mayen country data with islands and cities
 */

import { Country } from './index';

export const svalbardandjanmayen: Country = {
  code: 'SJ',
  name: 'Svalbard and Jan Mayen',
  flag: '🇸🇯',
  capital: 'Longyearbyen',
  area: 62022,
  currencySymbol: 'kr',
  officialLanguages: ['Norwegian', 'Russian'],
  demonym: 'Svalbardian',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'NOK', region: 'EU' },
  divisions: [
    { code: 'LON', name: 'Longyearbyen', type: 'island',
      cities: [
        { code: 'LONGYEARBYEN', name: 'Longyearbyen' },
        { code: 'NY-ÅLESUND', name: 'Ny-Ålesund' },
        { code: 'PYRAMIDEN', name: 'Pyramiden' },
        { code: 'HOPEN', name: 'Hopen' },
        { code: 'NY-ÅLESUND', name: 'Ny-Ålesund' }
      ]
    },
    { code: 'NY', name: 'Ny-Ålesund', type: 'island',
      cities: [
        { code: 'NY-ÅLESUND', name: 'Ny-Ålesund' },
        { code: 'PYRAMIDEN', name: 'Pyramiden' },
        { code: 'HOPEN', name: 'Hopen' },
        { code: 'LONGYEARBYEN', name: 'Longyearbyen' },
        { code: 'NY-ÅLESUND', name: 'Ny-Ålesund' }
      ]
    },
    { code: 'PYR', name: 'Pyramiden', type: 'island',
      cities: [
        { code: 'PYRAMIDEN', name: 'Pyramiden' },
        { code: 'HOPEN', name: 'Hopen' },
        { code: 'LONGYEARBYEN', name: 'Longyearbyen' },
        { code: 'NY-ÅLESUND', name: 'Ny-Ålesund' },
        { code: 'NY-ÅLESUND', name: 'Ny-Ålesund' }
      ]
    },
    { code: 'HOP', name: 'Hopen', type: 'island',
      cities: [
        { code: 'HOPEN', name: 'Hopen' },
        { code: 'LONGYEARBYEN', name: 'Longyearbyen' },
        { code: 'NY-ÅLESUND', name: 'Ny-Ålesund' },
        { code: 'PYRAMIDEN', name: 'Pyramiden' },
        { code: 'NY-ÅLESUND', name: 'Ny-Ålesund' }
      ]
    }
  ]
};
