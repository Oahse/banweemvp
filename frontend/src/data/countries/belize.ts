/**
 * Belize country data with districts and cities
 */

import { Country } from './index';

export const belize: Country = {
  code: 'BZ',
  name: 'Belize',
  flag: '🇧🇿',
  capital: 'Belmopan',
  area: 22966,
  currencySymbol: 'BZ$',
  officialLanguages: ['English'],
  demonym: 'Belizean',
  taxInfo: { standardRate: 12, taxName: 'GST', currency: 'BZD', region: 'NA' },
  divisions: [
    { code: 'BEL', name: 'Belize District', type: 'district',
      cities: [
        { code: 'BELIZE', name: 'Belize City' },
        { code: 'BELMOPAN', name: 'Belmopan' },
        { code: 'SAN', name: 'San Pedro' },
        { code: 'CAYE', name: 'Caye Caulker' },
        { code: 'LADY', name: 'Ladyville' }
      ]
    },
    { code: 'CAY', name: 'Cayo District', type: 'district',
      cities: [
        { code: 'BELMOPAN', name: 'Belmopan' },
        { code: 'SAN', name: 'San Pedro' },
        { code: 'CAYE', name: 'Caye Caulker' },
        { code: 'LADY', name: 'Ladyville' },
        { code: 'BELIZE', name: 'Belize City' }
      ]
    },
    { code: 'COR', name: 'Corozal District', type: 'district',
      cities: [
        { code: 'COROZAL', name: 'Corozal Town' },
        { code: 'ORANGE', name: 'Orange Walk' },
        { code: 'BELIZE', name: 'Belize City' },
        { code: 'BELMOPAN', name: 'Belmopan' },
        { code: 'SAN', name: 'San Pedro' }
      ]
    },
    { code: 'ORA', name: 'Orange Walk District', type: 'district',
      cities: [
        { code: 'ORANGE', name: 'Orange Walk' },
        { code: 'BELIZE', name: 'Belize City' },
        { code: 'BELMOPAN', name: 'Belmopan' },
        { code: 'SAN', name: 'San Pedro' },
        { code: 'CAYE', name: 'Caye Caulker' }
      ]
    },
    { code: 'STAN', name: 'Stann Creek District', type: 'district',
      cities: [
        { code: 'DANGRIGA', name: 'Dangriga' },
        { code: 'PLACENCIA', name: 'Placencia' },
        { code: 'BELIZE', name: 'Belize City' },
        { code: 'BELMOPAN', name: 'Belmopan' },
        { code: 'SAN', name: 'San Pedro' }
      ]
    }
  ]
};
