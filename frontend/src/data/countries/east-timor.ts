/**
 * East Timor country data with districts and cities
 */

import { Country } from './index';

export const easttimor: Country = {
  code: 'TL',
  name: 'East Timor',
  flag: '🇹🇱',
  capital: 'Dili',
  area: 14874,
  currencySymbol: '$',
  officialLanguages: ['Tetum', 'Portuguese'],
  demonym: 'Timorese',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'USD', region: 'APAC' },
  divisions: [
    { code: 'DIL', name: 'Dili', type: 'district',
      cities: [
        { code: 'DILI', name: 'Dili' },
        { code: 'BAUCAU', name: 'Baucau' },
        { code: 'SUAI', name: 'Suai' },
        { code: 'MALIANA', name: 'Maliana' },
        { code: 'AILEU', name: 'Aileu' }
      ]
    },
    { code: 'BAU', name: 'Baucau', type: 'district',
      cities: [
        { code: 'BAUCAU', name: 'Baucau' },
        { code: 'SUAI', name: 'Suai' },
        { code: 'MALIANA', name: 'Maliana' },
        { code: 'AILEU', name: 'Aileu' },
        { code: 'DILI', name: 'Dili' }
      ]
    },
    { code: 'SUA', name: 'Suai', type: 'district',
      cities: [
        { code: 'SUAI', name: 'Suai' },
        { code: 'MALIANA', name: 'Maliana' },
        { code: 'AILEU', name: 'Aileu' },
        { code: 'DILI', name: 'Dili' },
        { code: 'BAUCAU', name: 'Baucau' }
      ]
    },
    { code: 'MAL', name: 'Maliana', type: 'district',
      cities: [
        { code: 'MALIANA', name: 'Maliana' },
        { code: 'AILEU', name: 'Aileu' },
        { code: 'DILI', name: 'Dili' },
        { code: 'BAUCAU', name: 'Baucau' },
        { code: 'SUAI', name: 'Suai' }
      ]
    },
    { code: 'AIL', name: 'Aileu', type: 'district',
      cities: [
        { code: 'AILEU', name: 'Aileu' },
        { code: 'DILI', name: 'Dili' },
        { code: 'BAUCAU', name: 'Baucau' },
        { code: 'SUAI', name: 'Suai' },
        { code: 'MALIANA', name: 'Maliana' }
      ]
    }
  ]
};

export default easttimor;
