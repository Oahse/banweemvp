/**
 * Northern Mariana Islands country data with municipalities and cities
 */

import { Country } from './index';

export const northernmarianaislands: Country = {
  code: 'MP',
  name: 'Northern Mariana Islands',
  flag: '🇲🇵',
  capital: 'Saipan',
  area: 464,
  currencySymbol: '$',
  officialLanguages: ['English', 'Chamorro', 'Carolinian'],
  demonym: 'Northern Mariana Islander',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'USD', region: 'APAC' },
  divisions: [
    { code: 'SAI', name: 'Saipan', type: 'municipality',
      cities: [
        { code: 'SAIPAN', name: 'Saipan' },
        { code: 'TINIAN', name: 'Tinian' },
        { code: 'ROTA', name: 'Rota' },
        { code: 'AGRIHAN', name: 'Agrigan' },
        { code: 'PAGAN', name: 'Pagan' }
      ]
    },
    { code: 'TIN', name: 'Tinian', type: 'municipality',
      cities: [
        { code: 'TINIAN', name: 'Tinian' },
        { code: 'ROTA', name: 'Rota' },
        { code: 'AGRIHAN', name: 'Agrigan' },
        { code: 'PAGAN', name: 'Pagan' },
        { code: 'SAIPAN', name: 'Saipan' }
      ]
    },
    { code: 'ROT', name: 'Rota', type: 'municipality',
      cities: [
        { code: 'ROTA', name: 'Rota' },
        { code: 'AGRIHAN', name: 'Agrigan' },
        { code: 'PAGAN', name: 'Pagan' },
        { code: 'SAIPAN', name: 'Saipan' },
        { code: 'TINIAN', name: 'Tinian' }
      ]
    },
    { code: 'AGR', name: 'Agrigan', type: 'municipality',
      cities: [
        { code: 'AGRIHAN', name: 'Agrigan' },
        { code: 'PAGAN', name: 'Pagan' },
        { code: 'SAIPAN', name: 'Saipan' },
        { code: 'TINIAN', name: 'Tinian' },
        { code: 'ROTA', name: 'Rota' }
      ]
    }
  ]
};
