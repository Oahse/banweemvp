/**
 * Guatemala country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const guatemala: Country = {
  code: 'GT',
  name: 'Guatemala',
  provinces: [
    { code: 'GUATEMALA', name: 'Guatemala',
      cities: [
        { code: 'GUA', name: 'Guatemala City', taxInfo: { taxName: 'No VAT', currency: 'USD', region: 'NA' }},
        { code: 'MIXCO', name: 'Mixco' },
        { code: 'VILLA', name: 'Villa Nueva' },
        { code: 'PETAPA', name: 'Petapa' },
        { code: 'SAN', name: 'San Miguel Petapa' },
        { code: 'QUETZAL', name: 'Puerto Quetzal' },
        { code: 'ANTIGUA', name: 'Antigua Guatemala' },
        { code: 'ESCUINTLA', name: 'Escuintla' },
        { code: 'MADRID', name: 'Ciudad de Madrid' },
        { code: 'SANTA', name: 'Santa Catarina Pinula' }
      ]
    },
    { code: 'QUICHE', name: 'Quiché',
      cities: [
        { code: 'SANTA', name: 'Santa Cruz del Quiché' },
        { code: 'CHICHICASTENANGO', name: 'Chichicastenango' },
        { code: 'NEBAJ', name: 'Nebaj' },
        { code: 'SACAPULAS', name: 'Sacapulas' },
        { code: 'CUNEN', name: 'Cunén' },
        { code: 'JOYABAJ', name: 'Joyabaj' },
        { code: 'ZACAPA', name: 'Zacapa' },
        { code: 'CHICAMAN', name: 'Chicamán' },
        { code: 'IXCAN', name: 'Ixcan' },
        { code: 'UCU', name: 'Uspantán' }
      ]
    }
  ]
};

export default guatemala;
