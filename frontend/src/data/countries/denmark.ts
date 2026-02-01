/**
 * Denmark country data with regions and cities
 */

import { Country } from './index';

export const denmark: Country = {
  code: 'DK',
  name: 'Denmark',
  flag: '🇩🇰',
  capital: 'Copenhagen',
  area: 43094,
  currencySymbol: 'kr',
  officialLanguages: ['Danish'],
  demonym: 'Danish',
  taxInfo: { standardRate: 25, taxName: 'Moms', currency: 'DKK', region: 'EU' },
  divisions: [
    { code: 'CPH', name: 'Copenhagen', type: 'region',
      cities: [
        { code: 'COPENHAGEN', name: 'Copenhagen' },
        { code: 'AARHUS', name: 'Aarhus' },
        { code: 'ODENSE', name: 'Odense' },
        { code: 'AALBORG', name: 'Aalborg' },
        { code: 'ESBJERG', name: 'Esbjerg' }
      ]
    },
    { code: 'AAR', name: 'Aarhus', type: 'region',
      cities: [
        { code: 'AARHUS', name: 'Aarhus' },
        { code: 'ODENSE', name: 'Odense' },
        { code: 'AALBORG', name: 'Aalborg' },
        { code: 'ESBJERG', name: 'Esbjerg' },
        { code: 'COPENHAGEN', name: 'Copenhagen' }
      ]
    },
    { code: 'ODE', name: 'Odense', type: 'region',
      cities: [
        { code: 'ODENSE', name: 'Odense' },
        { code: 'AALBORG', name: 'Aalborg' },
        { code: 'ESBJERG', name: 'Esbjerg' },
        { code: 'COPENHAGEN', name: 'Copenhagen' },
        { code: 'AARHUS', name: 'Aarhus' }
      ]
    },
    { code: 'AAL', name: 'Aalborg', type: 'region',
      cities: [
        { code: 'AALBORG', name: 'Aalborg' },
        { code: 'ESBJERG', name: 'Esbjerg' },
        { code: 'COPENHAGEN', name: 'Copenhagen' },
        { code: 'AARHUS', name: 'Aarhus' },
        { code: 'ODENSE', name: 'Odense' }
      ]
    },
    { code: 'ESB', name: 'Esbjerg', type: 'region',
      cities: [
        { code: 'ESBJERG', name: 'Esbjerg' },
        { code: 'COPENHAGEN', name: 'Copenhagen' },
        { code: 'AARHUS', name: 'Aarhus' },
        { code: 'ODENSE', name: 'Odense' },
        { code: 'AALBORG', name: 'Aalborg' }
      ]
    }
  ]
};
