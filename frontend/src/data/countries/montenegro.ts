/**
 * Montenegro country data with municipalities and cities
 */

import { Country } from './index';

export const montenegro: Country = {
  code: 'ME',
  name: 'Montenegro',
  flag: '🇲🇪',
  capital: 'Podgorica',
  area: 13812,
  currencySymbol: '€',
  officialLanguages: ['Montenegrin', 'Serbian', 'Bosnian', 'Albanian', 'Croatian'],
  demonym: 'Montenegrin',
  taxInfo: { standardRate: 21, taxName: 'VAT', currency: 'EUR', region: 'EU' },
  divisions: [
    { code: 'POD', name: 'Podgorica', type: 'municipality',
      cities: [
        { code: 'PODGORICA', name: 'Podgorica' },
        { code: 'NIKSIC', name: 'Nikšić' },
        { code: 'PLJEVLJA', name: 'Pljevlja' },
        { code: 'BIJELO POLJE', name: 'Bijelo Polje' },
        { code: 'BAR', name: 'Bar' }
      ]
    },
    { code: 'NIK', name: 'Nikšić', type: 'municipality',
      cities: [
        { code: 'NIKSIC', name: 'Nikšić' },
        { code: 'PLJEVLJA', name: 'Pljevlja' },
        { code: 'BIJELO POLJE', name: 'Bijelo Polje' },
        { code: 'BAR', name: 'Bar' },
        { code: 'PODGORICA', name: 'Podgorica' }
      ]
    },
    { code: 'PLJ', name: 'Pljevlja', type: 'municipality',
      cities: [
        { code: 'PLJEVLJA', name: 'Pljevlja' },
        { code: 'BIJELO POLJE', name: 'Bijelo Polje' },
        { code: 'BAR', name: 'Bar' },
        { code: 'PODGORICA', name: 'Podgorica' },
        { code: 'NIKSIC', name: 'Nikšić' }
      ]
    },
    { code: 'BIJ', name: 'Bijelo Polje', type: 'municipality',
      cities: [
        { code: 'BIJELO POLJE', name: 'Bijelo Polje' },
        { code: 'BAR', name: 'Bar' },
        { code: 'PODGORICA', name: 'Podgorica' },
        { code: 'NIKSIC', name: 'Nikšić' },
        { code: 'PLJEVLJA', name: 'Pljevlja' }
      ]
    },
    { code: 'BAR', name: 'Bar', type: 'municipality',
      cities: [
        { code: 'BAR', name: 'Bar' },
        { code: 'PODGORICA', name: 'Podgorica' },
        { code: 'NIKSIC', name: 'Nikšić' },
        { code: 'PLJEVLJA', name: 'Pljevlja' },
        { code: 'BIJELO POLJE', name: 'Bijelo Polje' }
      ]
    }
  ]
};
