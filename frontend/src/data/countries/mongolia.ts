/**
 * Mongolia country data with provinces and cities
 */

import { Country } from './index';

export const mongolia: Country = {
  code: 'MN',
  name: 'Mongolia',
  flag: '🇲🇳',
  capital: 'Ulaanbaatar',
  area: 1564110,
  currencySymbol: '₮',
  officialLanguages: ['Mongolian'],
  demonym: 'Mongolian',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'USD', region: 'APAC' },
  divisions: [
    { code: 'ULA', name: 'Ulaanbaatar', type: 'province',
      cities: [
        { code: 'ULAANBAATAR', name: 'Ulaanbaatar' },
        { code: 'DARKHAN', name: 'Darkhan' },
        { code: 'ERDENET', name: 'Erdenet' },
        { code: 'CHOIBALSAN', name: 'Choibalsan' },
        { code: 'MONGOL', name: 'Mongol' }
      ]
    },
    { code: 'DAR', name: 'Darkhan', type: 'province',
      cities: [
        { code: 'DARKHAN', name: 'Darkhan' },
        { code: 'ERDENET', name: 'Erdenet' },
        { code: 'CHOIBALSAN', name: 'Choibalsan' },
        { code: 'MONGOL', name: 'Mongol' },
        { code: 'ULAANBAATAR', name: 'Ulaanbaatar' }
      ]
    },
    { code: 'ERD', name: 'Erdenet', type: 'province',
      cities: [
        { code: 'ERDENET', name: 'Erdenet' },
        { code: 'CHOIBALSAN', name: 'Choibalsan' },
        { code: 'MONGOL', name: 'Mongol' },
        { code: 'ULAANBAATAR', name: 'Ulaanbaatar' },
        { code: 'DARKHAN', name: 'Darkhan' }
      ]
    },
    { code: 'CHO', name: 'Choibalsan', type: 'province',
      cities: [
        { code: 'CHOIBALSAN', name: 'Choibalsan' },
        { code: 'MONGOL', name: 'Mongol' },
        { code: 'ULAANBAATAR', name: 'Ulaanbaatar' },
        { code: 'DARKHAN', name: 'Darkhan' },
        { code: 'ERDENET', name: 'Erdenet' }
      ]
    },
    { code: 'MON', name: 'Mongol', type: 'province',
      cities: [
        { code: 'MONGOL', name: 'Mongol' },
        { code: 'ULAANBAATAR', name: 'Ulaanbaatar' },
        { code: 'DARKHAN', name: 'Darkhan' },
        { code: 'ERDENET', name: 'Erdenet' },
        { code: 'CHOIBALSAN', name: 'Choibalsan' }
      ]
    }
  ]
};

export default mongolia;
