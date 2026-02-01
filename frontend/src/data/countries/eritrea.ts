/**
 * Eritrea country data with regions and cities
 */

import { Country } from './index';

export const eritrea: Country = {
  code: 'ER',
  name: 'Eritrea',
  flag: '🇪🇷',
  capital: 'Asmara',
  area: 117600,
  currencySymbol: 'Nfk',
  officialLanguages: ['Tigrinya', 'Arabic', 'English'],
  demonym: 'Eritrean',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'USD', region: 'MEA' },
  divisions: [
    { code: 'ASM', name: 'Central', type: 'region',
      cities: [
        { code: 'ASMARA', name: 'Asmara' },
        { code: 'DEBUB', name: 'Debub' },
        { code: 'MAKEL', name: 'Mendefera' },
        { code: 'GHINDA', name: 'Ghinda' },
        { code: 'ADI', name: 'Adi Quala' }
      ]
    },
    { code: 'ANS', name: 'Anseba', type: 'region',
      cities: [
        { code: 'KEREN', name: 'Keren' },
        { code: 'HALHAL', name: 'Halhal' },
        { code: 'ASMARA', name: 'Asmara' },
        { code: 'DEBUB', name: 'Debub' },
        { code: 'MAKEL', name: 'Mendefera' }
      ]
    },
    { code: 'DEB', name: 'Debub', type: 'region',
      cities: [
        { code: 'DEBUB', name: 'Debub' },
        { code: 'MAKEL', name: 'Mendefera' },
        { code: 'GHINDA', name: 'Ghinda' },
        { code: 'ADI', name: 'Adi Quala' },
        { code: 'ASMARA', name: 'Asmara' }
      ]
    },
    { code: 'GAS', name: 'Gash-Barka', type: 'region',
      cities: [
        { code: 'BARENTU', name: 'Barentu' },
        { code: 'TESSENEY', name: 'Tessenei' },
        { code: 'GULU', name: 'Guluj' },
        { code: 'AGORDAT', name: 'Agordat' },
        { code: 'SABHA', name: 'Sabha' }
      ]
    },
    { code: 'GAS', name: 'Gash-Barka', type: 'region',
      cities: [
        { code: 'BARENTU', name: 'Barentu' },
        { code: 'TESSENEY', name: 'Tessenei' },
        { code: 'GULU', name: 'Guluj' },
        { code: 'AGORDAT', name: 'Agordat' },
        { code: 'SABHA', name: 'Sabha' }
      ]
    },
    { code: 'MAK', name: 'Southern Red Sea', type: 'region',
      cities: [
        { code: 'ASSAB', name: 'Assab' },
        { code: 'TIO', name: 'Tio' },
        { code: 'DUBARWA', name: 'Dubarwa' },
        { code: 'RAHAYTA', name: 'Rahayta' },
        { code: 'BEILUL', name: 'Beilul' }
      ]
    },
    { code: 'NORT', name: 'Northern Red Sea', type: 'region',
      cities: [
        { code: 'MASSAWA', name: 'Massawa' },
        { code: 'NACFA', name: 'Nacfa' },
        { code: 'KARORA', name: 'Karora' },
        { 'code': 'DHALA', name: 'Dahlak' },
        { code: 'GHINDA', name: 'Ghinda' }
      ]
    }
  ]
};

export default eritrea;
