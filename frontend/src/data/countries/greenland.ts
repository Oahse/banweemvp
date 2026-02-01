/**
 * Greenland country data with municipalities and cities
 */

import { Country } from './index';

export const greenland: Country = {
  code: 'GL',
  name: 'Greenland',
  flag: '🇬🇱',
  capital: 'Nuuk',
  area: 2166086,
  currencySymbol: 'kr',
  officialLanguages: ['Greenlandic', 'Danish'],
  demonym: 'Greenlandic',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'DKK', region: 'APAC' },
  divisions: [
    { code: 'NUU', name: 'Nuuk', type: 'municipality',
      cities: [
        { code: 'NUUK', name: 'Nuuk' },
        { code: 'ILULISSAT', name: 'Ilulissat' },
        { code: 'TASIILAQ', name: 'Tasiilaq' },
        { code: 'QEQERTARSUAQ', name: 'Qeqertarsuaq' },
        { code: 'QASOQ', name: 'Qasoq' }
      ]
    },
    { code: 'ILU', name: 'Ilulissat', type: 'municipality',
      cities: [
        { code: 'ILULISSAT', name: 'Ilulissat' },
        { code: 'TASIILAQ', name: 'Tasiilaq' },
        { code: 'QEQERTARSUAQ', name: 'Qeqertarsuq' },
        { code: 'QASOQ', name: 'Qasoq' },
        { code: 'NUUK', name: 'Nuuk' }
      ]
    },
    { code: 'TAS', name: 'Tasiilaq', type: 'municipality',
      cities: [
        { code: 'TASIILAQ', name: 'Tasiilaq' },
        { code: 'QEQERTARSUAQ', name: 'Qeqertarsuq' },
        { code: 'QASOQ', name: 'Qasoq' },
        { code: 'NUUK', name: 'Nuuk' },
        { code: 'ILULISSAT', name: 'Ilulissat' }
      ]
    },
    { code: 'QEQ', name: 'Qeqertarsuq', type: 'municipality',
      cities: [
        { code: 'QEQERTARSUAQ', name: 'Qeqertarsuq' },
        { code: 'QASOQ', name: 'Qasoq' },
        { code: 'NUUK', name: 'Nuuk' },
        { code: 'ILULISSAT', name: 'Ilulissat' },
        { code: 'TASIILAQ', name: 'Tasiilaq' }
      ]
    }
  ]
};

export default greenland;
