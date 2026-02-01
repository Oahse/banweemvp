/**
 * Malta country data with regions and cities
 */

import { Country } from './index';

export const malta: Country = {
  code: 'MT',
  name: 'Malta',
  flag: '🇲🇹',
  capital: 'Valletta',
  area: 316,
  currencySymbol: '€',
  officialLanguages: ['Maltese', 'English'],
  demonym: 'Maltese',
  taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'EUR', region: 'EU' },
  divisions: [
    { code: 'VAL', name: 'Northern Harbour', type: 'region',
      cities: [
        { code: 'VALLETTA', name: 'Valletta' },
        { code: 'SLIEMA', name: 'Sliema' },
        { code: 'ST. JULIANS', name: 'St. Julian\'s' },
        { code: 'BIRKIRKARA', name: 'Birkirkara' },
        { code: 'MOSTA', name: 'Mosta' }
      ]
    },
    { code: 'SLI', name: 'Southern Harbour', type: 'region',
      cities: [
        { code: 'SLIEMA', name: 'Sliema' },
        { code: 'ST. JULIANS', name: 'St. Julian\'s' },
        { code: 'BIRKIRKARA', name: 'Birkirkara' },
        { code: 'MOSTA', name: 'Mosta' },
        { code: 'VALLETTA', name: 'Valletta' }
      ]
    },
    { code: 'STJ', name: 'Western', type: 'region',
      cities: [
        { code: 'ST. JULIANS', name: 'St. Julian\'s' },
        { code: 'BIRKIRKARA', name: 'Birkirkara' },
        { code: 'MOSTA', name: 'Mosta' },
        { code: 'VALLETTA', name: 'Valletta' },
        { code: 'SLIEMA', name: 'Sliema' }
      ]
    },
    { code: 'BIR', name: 'Northern', type: 'region',
      cities: [
        { code: 'BIRKIRKARA', name: 'Birkirkara' },
        { code: 'MOSTA', name: 'Mosta' },
        { code: 'VALLETTA', name: 'Valletta' },
        { code: 'SLIEMA', name: 'Sliema' },
        { code: 'ST. JULIANS', name: 'St. Julian\'s' }
      ]
    },
    { code: 'MOS', name: 'Southern', type: 'region',
      cities: [
        { code: 'MOSTA', name: 'Mosta' },
        { code: 'VALLETTA', name: 'Valletta' },
        { code: 'SLIEMA', name: 'Sliema' },
        { code: 'ST. JULIANS', name: 'St. Julian\'s' },
        { code: 'BIRKIRKARA', name: 'Birkirkara' }
      ]
    }
  ]
};
