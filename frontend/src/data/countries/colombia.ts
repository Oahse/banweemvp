/**
 * Colombia country data with departments and cities
 */

import { Country } from './index';

export const colombia: Country = {
  code: 'CO',
  name: 'Colombia',
  flag: '🇨🇴',
  capital: 'Bogotá',
  area: 1141748,
  currencySymbol: '$',
  officialLanguages: ['Spanish'],
  demonym: 'Colombian',
  taxInfo: { standardRate: 19, taxName: 'IVA', currency: 'COP', region: 'LATAM' },
  divisions: [
    { code: 'BOG', name: 'Bogotá', type: 'department',
      cities: [
        { code: 'BOGOTA', name: 'Bogotá' },
        { code: 'MEDELLIN', name: 'Medellín' },
        { code: 'CALI', name: 'Cali' },
        { code: 'BARRANQUILLA', name: 'Barranquilla' },
        { code: 'CARTAGENA', name: 'Cartagena' }
      ]
    },
    { code: 'MED', name: 'Medellín', type: 'department',
      cities: [
        { code: 'MEDELLIN', name: 'Medellín' },
        { code: 'CALI', name: 'Cali' },
        { code: 'BARRANQUILLA', name: 'Barranquilla' },
        { code: 'CARTAGENA', name: 'Cartagena' },
        { code: 'BOGOTA', name: 'Bogotá' }
      ]
    },
    { code: 'CAL', name: 'Cali', type: 'department',
      cities: [
        { code: 'CALI', name: 'Cali' },
        { code: 'BARRANQUILLA', name: 'Barranquilla' },
        { code: 'CARTAGENA', name: 'Cartagena' },
        { code: 'BOGOTA', name: 'Bogotá' },
        { code: 'MEDELLIN', name: 'Medellín' }
      ]
    },
    { code: 'BAR', name: 'Barranquilla', type: 'department',
      cities: [
        { code: 'BARRANQUILLA', name: 'Barranquilla' },
        { code: 'CARTAGENA', name: 'Cartagena' },
        { code: 'BOGOTA', name: 'Bogotá' },
        { code: 'MEDELLIN', name: 'Medellín' },
        { code: 'CALI', name: 'Cali' }
      ]
    },
    { code: 'CAR', name: 'Cartagena', type: 'department',
      cities: [
        { code: 'CARTAGENA', name: 'Cartagena' },
        { code: 'BOGOTA', name: 'Bogotá' },
        { code: 'MEDELLIN', name: 'Medellín' },
        { code: 'CALI', name: 'Cali' },
        { code: 'BARRANQUILLA', name: 'Barranquilla' }
      ]
    }
  ]
};
