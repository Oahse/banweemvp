/**
 * Comoros country data with islands and cities
 */

import { Country } from './index';

export const comoros: Country = {
  code: 'KM',
  name: 'Comoros',
  flag: '🇰🇲',
  capital: 'Moroni',
  area: 1862,
  currencySymbol: 'KMF',
  officialLanguages: ['Comorian', 'Arabic', 'French'],
  demonym: 'Comorian',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'USD', region: 'MEA' },
  divisions: [
    { code: 'NGA', name: 'Grande Comore', type: 'island',
      cities: [
        { code: 'MORONI', name: 'Moroni' },
        { code: 'MUTSAMUDU', name: 'Mutsamudu' },
        { code: 'DOMONI', name: 'Domoni' },
        { code: 'FOMBONI', name: 'Fomboni' },
        { code: 'MITSAMIHOULI', name: 'Mitsamiouli' }
      ]
    },
    { code: 'ANJ', name: 'Anjouan', type: 'island',
      cities: [
        { code: 'MUTSAMUDU', name: 'Mutsamudu' },
        { code: 'DOMONI', name: 'Domoni' },
        { code: 'FOMBONI', name: 'Fomboni' },
        { code: 'MITSAMIHOULI', name: 'Mitsamiouli' },
        { code: 'MRAMANI', name: 'Mramani' }
      ]
    },
    { code: 'MOE', name: 'Mohéli', type: 'island',
      cities: [
        { code: 'FOMBONI', name: 'Fomboni' },
        { code: 'MITSAMIHOULI', name: 'Mitsamiouli' },
        { code: 'MRAMANI', name: 'Mramani' },
        { code: 'WANI', name: 'Wani' },
        { code: 'HOUMBO', name: 'Houmbou' }
      ]
    }
  ]
};

export default comoros;
