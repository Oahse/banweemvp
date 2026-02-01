/**
 * Namibia country data with regions and cities
 */

import { Country } from './index';

export const namibia: Country = {
  code: 'NA',
  name: 'Namibia',
  flag: '🇳🇦',
  capital: 'Windhoek',
  area: 825418,
  currencySymbol: 'N$',
  officialLanguages: ['English'],
  demonym: 'Namibian',
  taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'NAD', region: 'MEA' },
  divisions: [
    { code: 'WIN', name: 'Windhoek', type: 'region',
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
    },
    { code: 'ER', name: 'Erongo', type: 'region',
      cities: [
        { code: 'SWAKOPMUND', name: 'Swakopmund' },
        { code: 'WALVIS', name: 'Walvis Bay' },
        { code: 'OTJIWARONGO', name: 'Otjiwarongo' },
        { code: 'RUNDU', name: 'Rundu' },
        { code: 'WITVLEI', name: 'Witvlei' },
        { code: 'OKAHANDJA', name: 'Okahandja' },
        { code: 'KEETMANSHOOP', name: 'Keetmanshoop' },
        { code: 'MARIENTAL', name: 'Mariental' },
        { code: 'LUDERITZ', name: 'Lüderitz' },
        { code: 'WINDHOEK', name: 'Windhoek' }
      ]
    },
    { code: 'HA', name: 'Hardap', type: 'region',
      cities: [
        { code: 'MARIENTAL', name: 'Mariental' },
        { code: 'KEETMANSHOOP', name: 'Keetmanshoop' },
        { code: 'LUDERITZ', name: 'Lüderitz' },
        { code: 'WINDHOEK', name: 'Windhoek' },
        { code: 'SWAKOPMUND', name: 'Swakopmund' },
        { code: 'WALVIS', name: 'Walvis Bay' },
        { code: 'OTJIWARONGO', name: 'Otjiwarongo' },
        { code: 'RUNDU', name: 'Rundu' },
        { code: 'WITVLEI', name: 'Witvlei' },
        { code: 'OKAHANDJA', name: 'Okahandja' }
      ]
    },
    { code: 'KA', name: 'Kavango', type: 'region',
      cities: [
        { code: 'RUNDU', name: 'Rundu' },
        { code: 'WINDHOEK', name: 'Windhoek' },
        { code: 'SWAKOPMUND', name: 'Swakopmund' },
        { code: 'WALVIS', name: 'Walvis Bay' },
        { code: 'OTJIWARONGO', name: 'Otjiwarongo' },
        { code: 'WITVLEI', name: 'Witvlei' },
        { code: 'OKAHANDJA', name: 'Okahandja' },
        { code: 'KEETMANSHOOP', name: 'Keetmanshoop' },
        { code: 'MARIENTAL', name: 'Mariental' },
        { code: 'LUDERITZ', name: 'Lüderitz' }
      ]
    },
    { code: 'KH', name: 'Kunene', type: 'region',
      cities: [
        { code: 'OTJIWARONGO', name: 'Otjiwarongo' },
        { code: 'RUNDU', name: 'Rundu' },
        { code: 'WINDHOEK', name: 'Windhoek' },
        { code: 'SWAKOPMUND', name: 'Swakopmund' },
        { code: 'WALVIS', name: 'Walvis Bay' },
        { code: 'WITVLEI', name: 'Witvlei' },
        { code: 'OKAHANDJA', name: 'Okahandja' },
        { code: 'KEETMANSHOOP', name: 'Keetmanshoop' },
        { code: 'MARIENTAL', name: 'Mariental' },
        { code: 'LUDERITZ', name: 'Lüderitz' }
      ]
    },
    { code: 'KH', name: 'Karas', type: 'region',
      cities: [
        { code: 'KEETMANSHOOP', name: 'Keetmanshoop' },
        { code: 'LUDERITZ', name: 'Lüderitz' },
        { code: 'WINDHOEK', name: 'Windhoek' },
        { code: 'SWAKOPMUND', name: 'Swakopmund' },
        { code: 'WALVIS', name: 'Walvis Bay' },
        { code: 'OTJIWARONGO', name: 'Otjiwarongo' },
        { code: 'RUNDU', name: 'Rundu' },
        { code: 'WITVLEI', name: 'Witvlei' },
        { code: 'OKAHANDJA', name: 'Okahandja' },
        { code: 'MARIENTAL', name: 'Mariental' }
      ]
    },
    { code: 'KH', name: 'Kavango East', type: 'region',
      cities: [
        { code: 'RUNDU', name: 'Rundu' },
        { code: 'WINDHOEK', name: 'Windhoek' },
        { code: 'SWAKOPMUND', name: 'Swakopmund' },
        { code: 'WALVIS', name: 'Walvis Bay' },
        { code: 'OTJIWARONGO', name: 'Otjiwarongo' },
        { code: 'WITVLEI', name: 'Witvlei' },
        { code: 'OKAHANDJA', name: 'Okahandja' },
        { code: 'KEETMANSHOOP', name: 'Keetmanshoop' },
        { code: 'MARIENTAL', name: 'Mariental' },
        { code: 'LUDERITZ', name: 'Lüderitz' }
      ]
    },
    { code: 'KH', name: 'Kavango West', type: 'region',
      cities: [
        { code: 'RUNDU', name: 'Rundu' },
        { code: 'WINDHOEK', name: 'Windhoek' },
        { code: 'SWAKOPMUND', name: 'Swakopmund' },
        { code: 'WALVIS', name: 'Walvis Bay' },
        { code: 'OTJIWARONGO', name: 'Otjiwarongo' },
        { code: 'WITVLEI', name: 'Witvlei' },
        { code: 'OKAHANDJA', name: 'Okahandja' },
        { code: 'KEETMANSHOOP', name: 'Keetmanshoop' },
        { code: 'MARIENTAL', name: 'Mariental' },
        { code: 'LUDERITZ', name: 'Lüderitz' }
      ]
    },
    { code: 'OM', name: 'Omusati', type: 'region',
      cities: [
        { code: 'OTJIWARONGO', name: 'Otjiwarongo' },
        { code: 'RUNDU', name: 'Rundu' },
        { code: 'WINDHOEK', name: 'Windhoek' },
        { code: 'SWAKOPMUND', name: 'Swakopmund' },
        { code: 'WALVIS', name: 'Walvis Bay' },
        { code: 'WITVLEI', name: 'Witvlei' },
        { code: 'OKAHANDJA', name: 'Okahandja' },
        { code: 'KEETMANSHOOP', name: 'Keetmanshoop' },
        { code: 'MARIENTAL', name: 'Mariental' },
        { code: 'LUDERITZ', name: 'Lüderitz' }
      ]
    },
    { code: 'OH', name: 'Omaheke', type: 'region',
      cities: [
        { code: 'OTJIWARONGO', name: 'Otjiwarongo' },
        { code: 'RUNDU', name: 'Rundu' },
        { code: 'WINDHOEK', name: 'Windhoek' },
        { code: 'SWAKOPMUND', name: 'Swakopmund' },
        { code: 'WALVIS', name: 'Walvis Bay' },
        { code: 'WITVLEI', name: 'Witvlei' },
        { code: 'OKAHANDJA', name: 'Okahandja' },
        { code: 'KEETMANSHOOP', name: 'Keetmanshoop' },
        { code: 'MARIENTAL', name: 'Mariental' },
        { code: 'LUDERITZ', name: 'Lüderitz' }
      ]
    },
    { code: 'OS', name: 'Oshana', type: 'region',
      cities: [
        { code: 'OTJIWARONGO', name: 'Otjiwarongo' },
        { code: 'RUNDU', name: 'Rundu' },
        { code: 'WINDHOEK', name: 'Windhoek' },
        { code: 'SWAKOPMUND', name: 'Swakopmund' },
        { code: 'WALVIS', name: 'Walvis Bay' },
        { code: 'WITVLEI', name: 'Witvlei' },
        { code: 'OKAHANDJA', name: 'Okahandja' },
        { code: 'KEETMANSHOOP', name: 'Keetmanshoop' },
        { code: 'MARIENTAL', name: 'Mariental' },
        { code: 'LUDERITZ', name: 'Lüderitz' }
      ]
    },
    { code: 'OT', name: 'Otjozondjupa', type: 'region',
      cities: [
        { code: 'OTJIWARONGO', name: 'Otjiwarongo' },
        { code: 'RUNDU', name: 'Rundu' },
        { code: 'WINDHOEK', name: 'Windhoek' },
        { code: 'SWAKOPMUND', name: 'Swakopmund' },
        { code: 'WALVIS', name: 'Walvis Bay' },
        { code: 'WITVLEI', name: 'Witvlei' },
        { code: 'OKAHANDJA', name: 'Okahandja' },
        { code: 'KEETMANSHOOP', name: 'Keetmanshoop' },
        { code: 'MARIENTAL', name: 'Mariental' },
        { code: 'LUDERITZ', name: 'Lüderitz' }
      ]
    },
    { code: 'ZA', name: 'Zambezi', type: 'region',
      cities: [
        { code: 'RUNDU', name: 'Rundu' },
        { code: 'WINDHOEK', name: 'Windhoek' },
        { code: 'SWAKOPMUND', name: 'Swakopmund' },
        { code: 'WALVIS', name: 'Walvis Bay' },
        { code: 'OTJIWARONGO', name: 'Otjiwarongo' },
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
