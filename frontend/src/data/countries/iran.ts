/**
 * Iran country data with provinces and cities
 */

import { Country } from './index';

export const iran: Country = {
  code: 'IR',
  name: 'Iran',
  flag: '🇮🇷',
  capital: 'Tehran',
  area: 1648195,
  currencySymbol: '﷼',
  officialLanguages: ['Persian'],
  demonym: 'Iranian',
  taxInfo: { standardRate: 9, taxName: 'VAT', currency: 'IRR', region: 'MEA' },
  divisions: [
    { code: 'TEH', name: 'Tehran', type: 'province',
      cities: [
        { code: 'TEHRAN', name: 'Tehran' },
        { code: 'REY', name: 'Rey' },
        { code: 'SHAM', name: 'Shahrak-e Gharb' },
        { code: 'PARDIS', name: 'Pardis' },
        { code: 'SHAHR', name: 'Shahrak-e Andisheh' }
      ]
    },
    { code: 'ALB', name: 'Alborz', type: 'province',
      cities: [
        { code: 'KARAJ', name: 'Karaj' },
        { code: 'HASHT', name: 'Hashtgerd' },
        { code: 'NAZAR', name: 'Nazarabad' },
        { code: 'SAVAD', name: 'Savojbolagh' },
        { code: 'TEHRAN', name: 'Tehran' }
      ]
    },
    { code: 'ARD', name: 'Ardabil', type: 'province',
      cities: [
        { code: 'ARDABIL', name: 'Ardabil' },
        { code: 'PARS', name: 'Parsabad' },
        { code: 'ASLAND', name: 'Aslanduz' },
        { code: 'GERMI', name: 'Germi' },
        { code: 'KHOR', name: 'Khor' }
      ]
    },
    { code: 'EA', name: 'East Azerbaijan', type: 'province',
      cities: [
        { code: 'TABRIZ', name: 'Tabriz' },
        { code: 'MARAGHEH', name: 'Maragheh' },
        { code: 'MARAND', name: 'Marand' },
        { code: 'MIANEH', name: 'Mianeh' },
        { code: 'BOSTAN', name: 'Bostanabad' }
      ]
    },
    { code: 'BU', name: 'Bushehr', type: 'province',
      cities: [
        { code: 'BUSHEHR', name: 'Bushehr' },
        { code: 'BORAZ', name: 'Borazjan' },
        { code: 'GENAVEH', name: 'Genaveh' },
        { code: 'DEYLAM', name: 'Deylam' },
        { code: 'KANGAN', name: 'Kangan' }
      ]
    }
  ]
};

export default iran;
