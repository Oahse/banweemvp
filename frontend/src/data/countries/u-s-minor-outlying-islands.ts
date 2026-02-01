/**
 * U.S. Minor Outlying Islands country data with territories and cities
 */

import { Country } from './index';

export const usminoroutlyingislands: Country = {
  code: 'UM',
  name: 'U.S. Minor Outlying Islands',
  flag: '🇺🇸',
  capital: 'Pago Pago',
  area: 3444,
  currencySymbol: '$',
  officialLanguages: ['English', 'Samoan', 'Chamorro', 'Carolinian', 'Marshallese', 'Palauan', 'Tongan'],
  demonym: 'American',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'USD', region: 'APAC' },
  divisions: [
    { code: 'AS', name: 'American Samoa', type: 'territory',
      cities: [
        { code: 'PAGO_PAGO', name: 'Pago Pago' },
        { code: 'TAFUNA', name: 'Tafuna' },
        { code: 'LEONE', name: 'Leone' },
        { code: 'MANU_A', name: 'Manu'a' },
        { code: 'SWAIN', name: 'Swain' }
      ]
    },
    { code: 'GU', name: 'Guam', type: 'territory',
      cities: [
        { code: 'HAGATNA', name: 'Hagåtña' },
        { code: 'DUMONT', name: 'Dumont' },
        { code: 'YIGO', name: 'Yigo' },
        { code: 'INARJAL', name: 'Inarajal' },
        { code: 'SANTA RITA', name: 'Santa Rita' },
        { code: 'MERIZO', name: 'Merizo' }
      ]
    },
    { code: 'MP', name: 'Northern Mariana Islands', type: 'territory',
      cities: [
        { code: 'SAIPAN', name: 'Saipan' },
        { code: 'TINIAN', name: 'Tinian' },
        { code: 'ROTA', name: 'Rota' },
        { code: 'SAIPAN', name: 'Saipan' },
        { code: 'TINIAN', name: 'Tinian' },
        { code: 'ROTA', name: 'Rota' }
      ]
    },
    { code: 'MP', name: 'Northern Mariana Islands', type: 'territory',
      cities: [
        { code: 'SAIPAN', name: 'Saipan' },
        { code: 'TINIAN', name: 'Tinian' },
        { code: 'ROTA', name: 'Rota' },
        { code: 'SAIPAN', name: 'Saipan' },
        { code: 'TINIAN', name: 'Tinian' },
        { code: 'ROTA', name: 'Rota' }
      ]
    }
  ]
};
