/**
 * Jordan country data with governorates and cities
 */

import { Country } from './index';

export const jordan: Country = {
  code: 'JO',
  name: 'Jordan',
  flag: '🇯🇴',
  capital: 'Amman',
  area: 89342,
  currencySymbol: 'د.أ',
  officialLanguages: ['Arabic'],
  demonym: 'Jordanian',
  taxInfo: { standardRate: 16, taxName: 'VAT', currency: 'JOD', region: 'MEA' },
  divisions: [
    { code: 'AMM', name: 'Amman', type: 'governorate',
      cities: [
        { code: 'AMMAN', name: 'Amman' },
        { code: 'IRBID', name: 'Irbid' },
        { code: 'ZARQA', name: 'Zarqa' },
        { code: 'AQABA', name: 'Aqaba' },
        { code: 'MAFRAQ', name: 'Mafraq' }
      ]
    },
    { code: 'IRB', name: 'Irbid', type: 'governorate',
      cities: [
        { code: 'IRBID', name: 'Irbid' },
        { code: 'ZARQA', name: 'Zarqa' },
        { code: 'AQABA', name: 'Aqaba' },
        { code: 'MAFRAQ', name: 'Mafraq' },
        { code: 'AMMAN', name: 'Amman' }
      ]
    },
    { code: 'ZAR', name: 'Zarqa', type: 'governorate',
      cities: [
        { code: 'ZARQA', name: 'Zarqa' },
        { code: 'AQABA', name: 'Aqaba' },
        { code: 'MAFRAQ', name: 'Mafraq' },
        { code: 'AMMAN', name: 'Amman' },
        { code: 'IRBID', name: 'Irbid' }
      ]
    },
    { code: 'AQA', name: 'Aqaba', type: 'governorate',
      cities: [
        { code: 'AQABA', name: 'Aqaba' },
        { code: 'MAFRAQ', name: 'Mafraq' },
        { code: 'AMMAN', name: 'Amman' },
        { code: 'IRBID', name: 'Irbid' },
        { code: 'ZARQA', name: 'Zarqa' }
      ]
    },
    { code: 'MAF', name: 'Mafraq', type: 'governorate',
      cities: [
        { code: 'MAFRAQ', name: 'Mafraq' },
        { code: 'AMMAN', name: 'Amman' },
        { code: 'IRBID', name: 'Irbid' },
        { code: 'ZARQA', name: 'Zarqa' },
        { code: 'AQABA', name: 'Aqaba' }
      ]
    }
  ]
};

export default jordan;
