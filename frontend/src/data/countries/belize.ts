/**
 * Belize country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const belize: Country = {
  code: 'BZ',
  name: 'Belize',
  provinces: [
    { code: 'BELIZE', name: 'Belize District',
      cities: [
        { code: 'BELIZE', name: 'Belize City', taxInfo: { taxName: 'No VAT', currency: 'USD', region: 'NA' }},
        { code: 'BELMOPAN', name: 'Belmopan' },
        { code: 'SAN', name: 'San Pedro' },
        { code: 'CAYE', name: 'Caye Caulker' },
        { code: 'BISTAR', name: 'Biscayne' },
        { code: 'LADY', name: 'Ladyville' },
        { code: 'HATTIE', name: 'Hattieville' },
        { code: 'BEMBOCK', name: 'Bembock' },
        { code: 'CROOKED', name: 'Crooked Tree' },
        { code: 'GALLEN', name: 'Gallen Junction' }
      ]
    },
    { code: 'ORANGE', name: 'Orange Walk District',
      cities: [
        { code: 'ORANGE', name: 'Orange Walk Town' },
        { code: 'COROZAL', name: 'Corozal Town' },
        { code: 'SAN', name: 'San Pablo' },
        { code: 'SAN2', name: 'San Jose' },
        { code: 'SAN3', name: 'San Roman' },
        { code: 'DOUGLAS', name: 'Douglas' },
        { code: 'SHIPYARD', name: 'Shipyard' },
        { code: 'INDIAN', name: 'Indian Church' },
        { code: 'GOLDEN', name: 'Golden Stream' },
        { code: 'TRIANGLE', name: 'Triangle' }
      ]
    }
  ]
};

export default belize;
