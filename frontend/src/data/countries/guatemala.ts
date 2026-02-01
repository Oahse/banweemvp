/**
 * Guatemala country data with departments and cities
 */

import { Country } from './index';

export const guatemala: Country = {
  code: 'GT',
  name: 'Guatemala',
  flag: '🇬🇹',
  capital: 'Guatemala City',
  area: 108889,
  currencySymbol: 'Q',
  officialLanguages: ['Spanish', 'Guatemalan Sign Language'],
  demonym: 'Guatemalan',
  taxInfo: { standardRate: 12, taxName: 'VAT', currency: 'GTQ', region: 'NA' },
  divisions: [
    { code: 'GUA', name: 'Guatemala', type: 'department',
      cities: [
        { code: 'GUA', name: 'Guatemala City' },
        { code: 'MIXCO', name: 'Mixco' },
        { code: 'VILLA', name: 'Villa Nueva' },
        { code: 'PETAPA', name: 'Petapa' },
        { code: 'SAN', name: 'San Miguel Petapa' }
      ]
    },
    { code: 'MIX', name: 'Mixco', type: 'department',
      cities: [
        { code: 'MIXCO', name: 'Mixco' },
        { code: 'VILLA', name: 'Villa Nueva' },
        { code: 'PETAPA', name: 'Petapa' },
        { code: 'SAN', name: 'San Miguel Petapa' },
        { code: 'GUA', name: 'Guatemala City' }
      ]
    },
    { code: 'VIL', name: 'Villa Nueva', type: 'department',
      cities: [
        { code: 'VILLA', name: 'Villa Nueva' },
        { code: 'PETAPA', name: 'Petapa' },
        { code: 'SAN', name: 'San Miguel Petapa' },
        { code: 'GUA', name: 'Guatemala City' },
        { code: 'MIXCO', name: 'Mixco' }
      ]
    },
    { code: 'PET', name: 'Petapa', type: 'department',
      cities: [
        { code: 'PETAPA', name: 'Petapa' },
        { code: 'SAN', name: 'San Miguel Petapa' },
        { code: 'GUA', name: 'Guatemala City' },
        { code: 'MIXCO', name: 'Mixco' },
        { code: 'VILLA', name: 'Villa Nueva' }
      ]
    },
    { code: 'SAN', name: 'San Miguel Petapa', type: 'department',
      cities: [
        { code: 'SAN', name: 'San Miguel Petapa' },
        { code: 'GUA', name: 'Guatemala City' },
        { code: 'MIXCO', name: 'Mixco' },
        { code: 'VILLA', name: 'Villa Nueva' },
        { code: 'PETAPA', name: 'Petapa' }
      ]
    }
  ]
};
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
