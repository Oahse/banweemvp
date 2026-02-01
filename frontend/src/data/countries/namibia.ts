/**
 * Namibia country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const namibia: Country = {
  code: 'NA',
  name: 'Namibia',
  taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'NAD', region: 'MEA' },
  provinces: [
    { code: 'WINDHOEK', name: 'Windhoek',
      cities: [
        { code: 'WINDHOEK', name: 'Windhoek' },
        { code: 'SWAKOPMUND', name: 'Swakopmund' },
        { code: 'WALVIS', name: 'Walvis Bay' },
        { code: 'OTJIWARONGO', name: 'Otjiwarongo' },
        { code: 'RUNDU', name: 'Rundu' },
        { code: 'WITVLEI', name: 'Witvlei' },
        { code: 'OKAHANDJA', name: 'Okahandja' },
        { code: 'KEETMANSHOOP', name: 'Keetmanshoop' },
        { code: 'MARIENTAL', name: 'Mariental' },
        { code: 'LUDERITZ', name: 'Lüderitz' }
      ]
    }
  ]
};

export default namibia;
