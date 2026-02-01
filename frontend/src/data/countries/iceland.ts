/**
 * Iceland country data with regions and cities
 */

import { Country } from './index';

export const iceland: Country = {
  code: 'IS',
  name: 'Iceland',
  flag: '🇮🇸',
  capital: 'Reykjavik',
  area: 103000,
  currencySymbol: 'kr',
  officialLanguages: ['Icelandic'],
  demonym: 'Icelander',
  taxInfo: { standardRate: 24, taxName: 'VAT', currency: 'ISK', region: 'EU' },
  divisions: [
    { code: 'REY', name: 'Capital Region', type: 'region',
      cities: [
        { code: 'REYKJAVIK', name: 'Reykjavik' },
        { code: 'KOPAVOGUR', name: 'Kopavogur' },
        { code: 'HAVERFJORDUR', name: 'Hafnarfjörður' },
        { code: 'AKUREYRI', name: 'Akureyri' },
        { code: 'REYKJANESBAER', name: 'Reykjanesbær' }
      ]
    },
    { code: 'KOP', name: 'Southern Peninsula', type: 'region',
      cities: [
        { code: 'KOPAVOGUR', name: 'Kopavogur' },
        { code: 'HAVERFJORDUR', name: 'Hafnarfjörður' },
        { code: 'AKUREYRI', name: 'Akureyri' },
        { code: 'REYKJANESBAER', name: 'Reykjanesbær' },
        { code: 'REYKJAVIK', name: 'Reykjavik' }
      ]
    },
    { code: 'HAV', name: 'West', type: 'region',
      cities: [
        { code: 'HAVERFJORDUR', name: 'Hafnarfjörður' },
        { code: 'AKUREYRI', name: 'Akureyri' },
        { code: 'REYKJANESBAER', name: 'Reykjanesbær' },
        { code: 'REYKJAVIK', name: 'Reykjavik' },
        { code: 'KOPAVOGUR', name: 'Kopavogur' }
      ]
    },
    { code: 'AKU', name: 'North', type: 'region',
      cities: [
        { code: 'AKUREYRI', name: 'Akureyri' },
        { code: 'REYKJANESBAER', name: 'Reykjanesbær' },
        { code: 'REYKJAVIK', name: 'Reykjavik' },
        { code: 'KOPAVOGUR', name: 'Kopavogur' },
        { code: 'HAVERFJORDUR', name: 'Hafnarfjörður' }
      ]
    },
    { code: 'REY', name: 'Southwest', type: 'region',
      cities: [
        { code: 'REYKJANESBAER', name: 'Reykjanesbær' },
        { code: 'REYKJAVIK', name: 'Reykjavik' },
        { code: 'KOPAVOGUR', name: 'Kopavogur' },
        { code: 'HAVERFJORDUR', name: 'Hafnarfjörður' },
        { code: 'AKUREYRI', name: 'Akureyri' }
      ]
    }
  ]
};
