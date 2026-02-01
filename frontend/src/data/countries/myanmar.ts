/**
 * Myanmar country data with regions and cities
 */

import { Country } from './index';

export const myanmar: Country = {
  code: 'MM',
  name: 'Myanmar',
  flag: '🇲🇲',
  capital: 'Naypyidaw',
  area: 676578,
  currencySymbol: 'K',
  officialLanguages: ['Burmese'],
  demonym: 'Myanmar',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'USD', region: 'APAC' },
  divisions: [
    { code: 'NAY', name: 'Naypyidaw', type: 'region',
      cities: [
        { code: 'NAYPYIDAW', name: 'Naypyidaw' },
        { code: 'YANGON', name: 'Yangon' },
        { code: 'MANDALAY', name: 'Mandalay' },
        { code: 'BAGO', name: 'Bago' },
        { code: 'PATHEIN', name: 'Pathein' }
      ]
    },
    { code: 'YAN', name: 'Yangon', type: 'region',
      cities: [
        { code: 'YANGON', name: 'Yangon' },
        { code: 'MANDALAY', name: 'Mandalay' },
        { code: 'BAGO', name: 'Bago' },
        { code: 'PATHEIN', name: 'Pathein' },
        { code: 'NAYPYIDAW', name: 'Naypyidaw' }
      ]
    },
    { code: 'MAN', name: 'Mandalay', type: 'region',
      cities: [
        { code: 'MANDALAY', name: 'Mandalay' },
        { code: 'BAGO', name: 'Bago' },
        { code: 'PATHEIN', name: 'Pathein' },
        { code: 'NAYPYIDAW', name: 'Naypyidaw' },
        { code: 'YANGON', name: 'Yangon' }
      ]
    },
    { code: 'BAG', name: 'Bago', type: 'region',
      cities: [
        { code: 'BAGO', name: 'Bago' },
        { code: 'PATHEIN', name: 'Pathein' },
        { code: 'NAYPYIDAW', name: 'Naypyidaw' },
        { code: 'YANGON', name: 'Yangon' },
        { code: 'MANDALAY', name: 'Mandalay' }
      ]
    },
    { code: 'PAT', name: 'Pathein', type: 'region',
      cities: [
        { code: 'PATHEIN', name: 'Pathein' },
        { code: 'NAYPYIDAW', name: 'Naypyidaw' },
        { code: 'YANGON', name: 'Yangon' },
        { code: 'MANDALAY', name: 'Mandalay' },
        { code: 'BAGO', name: 'Bago' }
      ]
    }
  ]
};

export default myanmar;
