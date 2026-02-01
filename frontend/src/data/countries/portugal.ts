/**
 * Portugal country data with districts and cities
 */

import { Country } from './index';

export const portugal: Country = {
  code: 'PT',
  name: 'Portugal',
  flag: '🇵🇹',
  capital: 'Lisbon',
  area: 92090,
  currencySymbol: '€',
  officialLanguages: ['Portuguese'],
  demonym: 'Portuguese',
  taxInfo: { standardRate: 23, taxName: 'IVA', currency: 'EUR', region: 'EU' },
  divisions: [
    { code: 'LIS', name: 'Lisbon', type: 'district',
      cities: [
        { code: 'LISBON', name: 'Lisbon' },
        { code: 'PORTO', name: 'Porto' },
        { code: 'BRAGA', name: 'Braga' },
        { code: 'COIMBRA', name: 'Coimbra' },
        { code: 'FUNCHAL', name: 'Funchal' }
      ]
    },
    { code: 'POR', name: 'Porto', type: 'district',
      cities: [
        { code: 'PORTO', name: 'Porto' },
        { code: 'BRAGA', name: 'Braga' },
        { code: 'COIMBRA', name: 'Coimbra' },
        { code: 'FUNCHAL', name: 'Funchal' },
        { code: 'LISBON', name: 'Lisbon' }
      ]
    },
    { code: 'BRA', name: 'Braga', type: 'district',
      cities: [
        { code: 'BRAGA', name: 'Braga' },
        { code: 'COIMBRA', name: 'Coimbra' },
        { code: 'FUNCHAL', name: 'Funchal' },
        { code: 'LISBON', name: 'Lisbon' },
        { code: 'PORTO', name: 'Porto' }
      ]
    },
    { code: 'COI', name: 'Coimbra', type: 'district',
      cities: [
        { code: 'COIMBRA', name: 'Coimbra' },
        { code: 'FUNCHAL', name: 'Funchal' },
        { code: 'LISBON', name: 'Lisbon' },
        { code: 'PORTO', name: 'Porto' },
        { code: 'BRAGA', name: 'Braga' }
      ]
    },
    { code: 'FUN', name: 'Madeira', type: 'district',
      cities: [
        { code: 'FUNCHAL', name: 'Funchal' },
        { code: 'LISBON', name: 'Lisbon' },
        { code: 'PORTO', name: 'Porto' },
        { code: 'BRAGA', name: 'Braga' },
        { code: 'COIMBRA', name: 'Coimbra' }
      ]
    }
  ]
};
