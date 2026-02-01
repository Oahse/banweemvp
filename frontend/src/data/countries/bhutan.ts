/**
 * Bhutan country data with districts and cities
 */

import { Country } from './index';

export const bhutan: Country = {
  code: 'BT',
  name: 'Bhutan',
  flag: '🇧🇹',
  capital: 'Thimphu',
  area: 38394,
  currencySymbol: 'Nu.',
  officialLanguages: ['Dzongkha', 'English'],
  demonym: 'Bhutanese',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'BTN', region: 'APAC' },
  divisions: [
    { code: 'THI', name: 'Thimphu', type: 'district',
      cities: [
        { code: 'THIMPHU', name: 'Thimphu' },
        { code: 'PARO', name: 'Paro' },
        { code: 'PUNAKHA', name: 'Punakha' },
        { code: 'WANGDUE', name: 'Wangdue Phodrang' },
        { code: 'TRONGSA', name: 'Trongsa' }
      ]
    },
    { code: 'PAR', name: 'Paro', type: 'district',
      cities: [
        { code: 'PARO', name: 'Paro' },
        { code: 'PUNAKHA', name: 'Punakha' },
        { code: 'WANGDUE', name: 'Wangdue Phodrang' },
        { code: 'TRONGSA', name: 'Trongsa' },
        { code: 'THIMPHU', name: 'Thimphu' }
      ]
    },
    { code: 'PUN', name: 'Punakha', type: 'district',
      cities: [
        { code: 'PUNAKHA', name: 'Punakha' },
        { code: 'WANGDUE', name: 'Wangdue Phodrang' },
        { code: 'TRONGSA', name: 'Trongsa' },
        { code: 'THIMPHU', name: 'Thimphu' },
        { code: 'PARO', name: 'Paro' }
      ]
    },
    { code: 'WAN', name: 'Wangdue Phodrang', type: 'district',
      cities: [
        { code: 'WANGDUE', name: 'Wangdue Phodrang' },
        { code: 'TRONGSA', name: 'Trongsa' },
        { code: 'THIMPHU', name: 'Thimphu' },
        { code: 'PARO', name: 'Paro' },
        { code: 'PUNAKHA', name: 'Punakha' }
      ]
    },
    { code: 'TRO', name: 'Trongsa', type: 'district',
      cities: [
        { code: 'TRONGSA', name: 'Trongsa' },
        { code: 'THIMPHU', name: 'Thimphu' },
        { code: 'PARO', name: 'Paro' },
        { code: 'PUNAKHA', name: 'Punakha' },
        { code: 'WANGDUE', name: 'Wangdue Phodrang' }
      ]
    }
  ]
};
