/**
 * United Arab Emirates country data with emirates, cities, and tax information
 */

import { Country } from './index';

export const unitedarabemirates: Country = {
  code: 'AE',
  name: 'United Arab Emirates',
  flag: '🇦🇪',
  capital: 'Abu Dhabi',
  area: 83600,
  currencySymbol: 'د.إ',
  officialLanguages: ['Arabic'],
  demonym: 'Emirati',
  taxInfo: { standardRate: 5, taxName: 'VAT', currency: 'AED', region: 'MEA' },
  divisions: [
    { code: 'AZ', name: 'Abu Dhabi', type: 'emirate',
      cities: [
        { code: 'AUH', name: 'Abu Dhabi' },
        { code: 'AZM', name: 'Al Ain' },
        { code: 'DHA', name: 'Al Dhafra' },
        { code: 'RUA', name: 'Ruweis' },
        { code: 'MAD', name: 'Madinat Zayed' }
      ]
    },
    { code: 'DU', name: 'Dubai', type: 'emirate',
      cities: [
        { code: 'DXB', name: 'Dubai' },
        { code: 'JBR', name: 'Jumeirah Beach Residence' },
        { code: 'MAR', name: 'Marina' },
        { code: 'BUS', name: 'Business Bay' },
        { code: 'DCC', name: 'Dubai Internet City' }
      ]
    },
    { code: 'SH', name: 'Sharjah', type: 'emirate',
      cities: [
        { code: 'SHJ', name: 'Sharjah' },
        { code: 'KHF', name: 'Kalba' },
        { code: 'KHK', name: 'Khor Fakkan' },
        { code: 'DIB', name: 'Dibba Al-Hisn' },
        { code: 'MAD', name: 'Madam' }
      ]
    },
    { code: 'AJ', name: 'Ajman', type: 'emirate',
      cities: [
        { code: 'AUJ', name: 'Ajman' },
        { code: 'MZA', name: 'Manama' },
        { code: 'MAS', name: 'Masfout' }
      ]
    },
    { code: 'FU', name: 'Fujairah', type: 'emirate',
      cities: [
        { code: 'FJR', name: 'Fujairah' },
        { code: 'DIB', name: 'Dibba' },
        { code: 'QID', name: 'Qidfa' },
        { code: 'BID', name: 'Bidiyah' }
      ]
    },
    { code: 'RA', name: 'Ras Al Khaimah', type: 'emirate',
      cities: [
        { code: 'RAK', name: 'Ras Al Khaimah' },
        { code: 'KHA', name: 'Khawr Khuwayr' },
        { code: 'JUL', name: 'Julfar' },
        { code: 'DAF', name: 'Al Dhait' }
      ]
    },
    { code: 'UQ', name: 'Umm Al Quwain', type: 'emirate',
      cities: [
        { code: 'UAQ', name: 'Umm Al Quwain' },
        { code: 'SAL', name: 'Salmah' },
        { code: 'KAD', name: 'Kadra' }
      ]
    }
  ]
};

export default unitedarabemirates;
