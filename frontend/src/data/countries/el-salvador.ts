/**
 * El Salvador country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const elsalvador: Country = {
  code: 'SV',
  name: 'El Salvador',
  provinces: [
    { code: 'SAN', name: 'San Salvador',
      cities: [
        { code: 'SAN', name: 'San Salvador', taxInfo: { taxName: 'No VAT', currency: 'USD', region: 'NA' }},
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

export default elsalvador;
