/**
 * Puerto Rico country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const puertorico: Country = {
  code: 'PR',
  name: 'Puerto Rico',
  provinces: [
    { code: 'SAN', name: 'San Juan',
      cities: [
        { code: 'SAN', name: 'San Juan', taxInfo: { taxName: 'No VAT', currency: 'USD', region: 'NA' }},
        { code: 'BAYAMON', name: 'Bayamón' },
        { code: 'CAROLINA', name: 'Carolina' },
        { code: 'PONCE', name: 'Ponce' },
        { code: 'CAGUAS', name: 'Caguas' },
        { code: 'GUAYNABO', name: 'Guaynabo' },
        { code: 'MAYAGUEZ', name: 'Mayagüez' },
        { code: 'ARECIBO', name: 'Arecibo' },
        { code: 'TOA', name: 'Toa Baja' },
        { code: 'CANOVANAS', name: 'Canóvanas' }
      ]
    }
  ]
};

export default puertorico;
