/**
 * Saudi Arabia country data with regions, cities, and tax information
 */

import { Country } from './index';

export const saudiarabia: Country = {
  code: 'SA',
  name: 'Saudi Arabia',
  flag: '🇸🇦',
  capital: 'Riyadh',
  area: 2149690,
  currencySymbol: 'ر.س',
  officialLanguages: ['Arabic'],
  demonym: 'Saudi',
  taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'SAR', region: 'MEA' },
  divisions: [
    { code: 'RI', name: 'Riyadh', type: 'region',
      cities: [
        { code: 'RIY', name: 'Riyadh' },
        { code: 'DIR', name: 'Diriyah' },
        { code: 'AL', name: 'Al Kharj' },
        { code: 'MAJ', name: 'Majmaah' },
        { code: 'WAD', name: 'Wadi ad-Dawasir' }
      ]
    },
    { code: 'ME', name: 'Mecca', type: 'region',
      cities: [
        { code: 'MEC', name: 'Mecca' },
        { code: 'JED', name: 'Jeddah' },
        { code: 'TAI', name: 'Taif' },
        { code: 'RAB', name: 'Rabigh' },
        { code: 'YAN', name: 'Yanbu' }
      ]
    },
    { code: 'MD', name: 'Medina', type: 'region',
      cities: [
        { code: 'MED', name: 'Medina' },
        { code: 'YAN', name: 'Yanbu' },
        { code: 'MAH', name: 'Mahd adh Dhahab' },
        { code: 'HUN', name: 'Hunayn' },
        { code: 'BAD', name: 'Badr' }
      ]
    },
    { code: 'ES', name: 'Eastern', type: 'region',
      cities: [
        { code: 'DHA', name: 'Dammam' },
        { code: 'KHOB', name: 'Khobar' },
        { code: 'DHA2', name: 'Dhahran' },
        { code: 'HOF', name: 'Hofuf' },
        { code: 'JUB', name: 'Jubail' }
      ]
    },
    { code: 'AS', name: 'Asir', type: 'region',
      cities: [
        { code: 'ABI', name: 'Abha' },
        { code: 'KHA', name: 'Khamis Mushait' },
        { code: 'NAJ', name: 'Najran' },
        { code: 'BIS', name: 'Bisha' },
        { code: 'BAL', name: 'Balqarn' }
      ]
    },
    { code: 'TB', name: 'Tabuk', type: 'region',
      cities: [
        { code: 'TAB', name: 'Tabuk' },
        { code: 'TAY', name: 'Tayma' },
        { code: 'DUB', name: 'Dubaj' },
        { code: 'ALW', name: 'Al Wajh' },
        { code: 'HAQ', name: 'Haql' }
      ]
    },
    { code: 'HA', name: 'Hail', type: 'region',
      cities: [
        { code: 'HAI', name: 'Hail' },
        { code: 'BUR', name: 'Buraidah' },
        { code: 'UNA', name: 'Unayzah' },
        { code: 'HAA', name: 'Hafr Al-Batin' },
        { code: 'RAF', name: 'Rafha' }
      ]
    },
    { code: 'NA', name: 'Northern Borders', type: 'region',
      cities: [
        { code: 'ARA', name: 'Arar' },
        { code: 'RAF', name: 'Rafha' },
        { code: 'TUR', name: 'Turaif' },
        { code: 'AL', name: 'Al Uwayqilah' },
        { code: 'RAF2', name: 'Rafha Al-Jouf' }
      ]
    },
    { code: 'JA', name: 'Jawf', type: 'region',
      cities: [
        { code: 'SAK', name: 'Sakakah' },
        { code: 'DOU', name: 'Dumat Al-Jandal' },
        { code: 'QUR', name: 'Qurrayat' },
        { code: 'TUB', name: 'Tabarjal' },
        { code: 'ALJ', name: 'Al Jouf' }
      ]
    },
    { code: 'BA', name: 'Bahah', type: 'region',
      cities: [
        { code: 'BAH', name: 'Bahah' },
        { code: 'BAL', name: 'Baljurashi' },
        { code: 'ALQ', name: 'Al Qunfudhah' },
        { code: 'MAND', name: 'Mandq' },
        { code: 'QIL', name: 'Qilwah' }
      ]
    },
    { code: 'JZ', name: 'Jizan', type: 'region',
      cities: [
        { code: 'JIZ', name: 'Jizan' },
        { code: 'SAB', name: 'Sabya' },
        { code: 'ABU', name: 'Abu Arish' },
        { code: 'SAM', name: 'Samtah' },
        { code: 'FAR', name: 'Farasan' }
      ]
    },
    { code: 'NAJ', name: 'Najran', type: 'region',
      cities: [
        { code: 'NAJ', name: 'Najran' },
        { code: 'SHAR', name: 'Sharurah' },
        { code: 'HAB', name: 'Habuna' },
        { code: 'YAD', name: 'Yadmah' },
        { code: 'BAD', name: 'Badr Al-Janoob' }
      ]
    }
  ]
};

export default saudiarabia;
