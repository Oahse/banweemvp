/**
 * Puerto Rico country data with municipalities and cities
 */

import { Country } from './index';

export const puertorico: Country = {
  code: 'PR',
  name: 'Puerto Rico',
  flag: '🇵🇷',
  capital: 'San Juan',
  area: 8870,
  currencySymbol: '$',
  officialLanguages: ['Spanish', 'English'],
  demonym: 'Puerto Rican',
  taxInfo: { standardRate: 11.5, taxName: 'VAT', currency: 'USD', region: 'APAC' },
  divisions: [
    { code: 'SAN', name: 'San Juan', type: 'municipality',
      cities: [
        { code: 'SAN_JUAN', name: 'San Juan' },
        { code: 'BAYAMON', name: 'Bayamón' },
        { code: 'CAROLINA', name: 'Carolina' },
        { code: 'PONCE', name: 'Ponce' },
        { code: 'CAGUAS', name: 'Caguas' }
      ]
    },
    { code: 'BAY', name: 'Bayamón', type: 'municipality',
      cities: [
        { code: 'BAYAMON', name: 'Bayamón' },
        { code: 'CAROLINA', name: 'Carolina' },
        { code: 'PONCE', name: 'Ponce' },
        { code: 'CAGUAS', name: 'Caguas' },
        { code: 'GUAYNABO', name: 'Guaynabo' }
      ]
    },
    { code: 'CAR', name: 'Carolina', type: 'municipality',
      cities: [
        { code: 'CAROLINA', name: 'Carolina' },
        { code: 'PONCE', name: 'Ponce' },
        { code: 'CAGUAS', name: 'Caguas' },
        { code: 'GUAYNABO', name: 'Guaynabo' },
        { code: 'MAYAGUEZ', name: 'Mayagüez' }
      ]
    },
    { code: 'PON', name: 'Ponce', type: 'municipality',
      cities: [
        { code: 'PONCE', name: 'Ponce' },
        { code: 'CAGUAS', name: 'Caguas' },
        { code: 'GUAYNABO', name: 'Guaynabo' },
        { code: 'MAYAGUEZ', name: 'Mayagüez' },
        { code: 'ARECIBO', name: 'Arecibo' }
      ]
    },
    { code: 'CAG', name: 'Caguas', type: 'municipality',
      cities: [
        { code: 'CAGUAS', name: 'Caguas' },
        { code: 'GUAYNABO', name: 'Guaynabo' },
        { code: 'MAYAGUEZ', name: 'Mayagüez' },
        { code: 'ARECIBO', name: 'Arecibo' },
        { code: 'SAN_JUAN', name: 'San Juan' }
      ]
    }
  ]
};
