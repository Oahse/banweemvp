/**
 * El Salvador country data with departments, cities, and tax information
 */

import { Country } from './index';

export const elSalvador: Country = {
    code: 'SV',
    name: 'El Salvador',
    taxInfo: { standardRate: 13, taxName: 'VAT', currency: 'USD', region: 'LATAM' },
    provinces: [
      { code: 'SAN', name: 'San Salvador',
        cities: [
          { code: 'SAN', name: 'San Salvador' },
          { code: 'SANTA', name: 'Santa Tecla' },
          { code: 'SOYAPANGO', name: 'Soyapango' },
          { code: 'MEJICANOS', name: 'Mejicanos' },
          { code: 'SAN2', name: 'San Marcos' },
          { code: 'ILOPANGO', name: 'Ilopango' },
          { code: 'APOPA', name: 'Apopa' },
          { code: 'SANTIAGO', name: 'Santiago Texacuangos' },
          { code: 'CUSCATLAN', name: 'Cuscatancingo' },
          { code: 'DELGADO', name: 'Delgado' }
        ]
      }
    ]
};
