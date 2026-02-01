/**
 * Moldova country data with districts and cities
 */

import { Country } from './index';

export const moldova: Country = {
  code: 'MD',
  name: 'Moldova',
  flag: '🇲🇩',
  capital: 'Chișinău',
  area: 33846,
  currencySymbol: 'L',
  officialLanguages: ['Moldovan', 'Romanian', 'Russian', 'Gagauz'],
  demonym: 'Moldovan',
  taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'MDL', region: 'EU' },
  divisions: [
    { code: 'CHI', name: 'Chișinău', type: 'district',
      cities: [
        { code: 'CHISINAU', name: 'Chișinău' },
        { code: 'BALTI', name: 'Bălți' },
        { code: 'TIRASPOL', name: 'Tiraspol' },
        { code: 'BENDER', name: 'Bender' },
        { code: 'RIBNITA', name: 'Rîbnița' }
      ]
    },
    { code: 'BAL', name: 'Bălți', type: 'district',
      cities: [
        { code: 'BALTI', name: 'Bălți' },
        { code: 'TIRASPOL', name: 'Tiraspol' },
        { code: 'BENDER', name: 'Bender' },
        { code: 'RIBNITA', name: 'Rîbnița' },
        { code: 'CHISINAU', name: 'Chișinău' }
      ]
    },
    { code: 'TIR', name: 'Tiraspol', type: 'district',
      cities: [
        { code: 'TIRASPOL', name: 'Tiraspol' },
        { code: 'BENDER', name: 'Bender' },
        { code: 'RIBNITA', name: 'Rîbnița' },
        { code: 'CHISINAU', name: 'Chișinău' },
        { code: 'BALTI', name: 'Bălți' }
      ]
    },
    { code: 'BEN', name: 'Bender', type: 'district',
      cities: [
        { code: 'BENDER', name: 'Bender' },
        { code: 'RIBNITA', name: 'Rîbnița' },
        { code: 'CHISINAU', name: 'Chișinău' },
        { code: 'BALTI', name: 'Bălți' },
        { code: 'TIRASPOL', name: 'Tiraspol' }
      ]
    },
    { code: 'RIB', name: 'Rîbnița', type: 'district',
      cities: [
        { code: 'RIBNITA', name: 'Rîbnița' },
        { code: 'CHISINAU', name: 'Chișinău' },
        { code: 'BALTI', name: 'Bălți' },
        { code: 'TIRASPOL', name: 'Tiraspol' },
        { code: 'BENDER', name: 'Bender' }
      ]
    }
  ]
};
