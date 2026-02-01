/**
 * American Samoa country data with districts and cities
 */

import { Country } from './index';

export const americansamoa: Country = {
  code: 'AS',
  name: 'American Samoa',
  flag: '🇦🇸',
  capital: 'Pago Pago',
  area: 199,
  currencySymbol: '$',
  officialLanguages: ['English', 'Samoan'],
  demonym: 'American Samoan',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'USD', region: 'APAC' },
  divisions: [
    { code: 'TUTU', name: 'Tutuila', type: 'district',
      cities: [
        { code: 'PAGO_PAGO', name: 'Pago Pago' },
        { code: 'TAFUNA', name: 'Tafuna' },
        { code: 'LEONE', name: 'Leone' },
        { code: 'MANUA', name: 'Manu\'a' },
        { code: 'SWAIN', name: 'Swain' }
      ]
    },
    { code: 'TAF', name: 'Western', type: 'district',
      cities: [
        { code: 'TAFUNA', name: 'Tafuna' },
        { code: 'LEONE', name: 'Leone' },
        { code: 'MANUA', name: 'Manu\'a' },
        { code: 'SWAIN', name: 'Swain' },
        { code: 'PAGO_PAGO', name: 'Pago Pago' }
      ]
    },
    { code: 'MAN', name: 'Manu\'a', type: 'district',
      cities: [
        { code: 'MANUA', name: 'Manu\'a' },
        { code: 'SWAIN', name: 'Swain' },
        { code: 'PAGO_PAGO', name: 'Pago Pago' },
        { code: 'TAFUNA', name: 'Tafuna' },
        { code: 'LEONE', name: 'Leone' }
      ]
    },
    { code: 'SWA', name: 'Swain', type: 'district',
      cities: [
        { code: 'SWAIN', name: 'Swain' },
        { code: 'PAGO_PAGO', name: 'Pago Pago' },
        { code: 'TAFUNA', name: 'Tafuna' },
        { code: 'LEONE', name: 'Leone' },
        { code: 'MANUA', name: 'Manu\'a' }
      ]
    }
  ]
};
