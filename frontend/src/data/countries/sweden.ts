/**
 * Sweden country data with counties and cities
 */

import { Country } from './index';

export const sweden: Country = {
  code: 'SE',
  name: 'Sweden',
  flag: '🇸🇪',
  capital: 'Stockholm',
  area: 450295,
  currencySymbol: 'kr',
  officialLanguages: ['Swedish'],
  demonym: 'Swedish',
  taxInfo: { standardRate: 25, taxName: 'Moms', currency: 'SEK', region: 'EU' },
  divisions: [
    { code: 'STO', name: 'Stockholm', type: 'county',
      cities: [
        { code: 'STOCKHOLM', name: 'Stockholm' },
        { code: 'GOTHENBURG', name: 'Gothenburg' },
        { code: 'MALMO', name: 'Malmö' },
        { code: 'UPPSALA', name: 'Uppsala' },
        { code: 'VASTERAS', name: 'Västerås' }
      ]
    },
    { code: 'GOT', name: 'Västra Götaland', type: 'county',
      cities: [
        { code: 'GOTHENBURG', name: 'Gothenburg' },
        { code: 'MALMO', name: 'Malmö' },
        { code: 'UPPSALA', name: 'Uppsala' },
        { code: 'VASTERAS', name: 'Västerås' },
        { code: 'STOCKHOLM', name: 'Stockholm' }
      ]
    },
    { code: 'MAL', name: 'Skåne', type: 'county',
      cities: [
        { code: 'MALMO', name: 'Malmö' },
        { code: 'UPPSALA', name: 'Uppsala' },
        { code: 'VASTERAS', name: 'Västerås' },
        { code: 'STOCKHOLM', name: 'Stockholm' },
        { code: 'GOTHENBURG', name: 'Gothenburg' }
      ]
    },
    { code: 'UPP', name: 'Uppsala', type: 'county',
      cities: [
        { code: 'UPPSALA', name: 'Uppsala' },
        { code: 'VASTERAS', name: 'Västerås' },
        { code: 'STOCKHOLM', name: 'Stockholm' },
        { code: 'GOTHENBURG', name: 'Gothenburg' },
        { code: 'MALMO', name: 'Malmö' }
      ]
    },
    { code: 'VAS', name: 'Västmanland', type: 'county',
      cities: [
        { code: 'VASTERAS', name: 'Västerås' },
        { code: 'STOCKHOLM', name: 'Stockholm' },
        { code: 'GOTHENBURG', name: 'Gothenburg' },
        { code: 'MALMO', name: 'Malmö' },
        { code: 'UPPSALA', name: 'Uppsala' }
      ]
    }
  ]
};
