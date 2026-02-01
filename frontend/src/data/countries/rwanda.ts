/**
 * Rwanda country data with provinces and cities
 */

import { Country } from './index';

export const rwanda: Country = {
  code: 'RW',
  name: 'Rwanda',
  flag: '🇷🇼',
  capital: 'Kigali',
  area: 26338,
  currencySymbol: 'RWF',
  officialLanguages: ['Kinyarwanda', 'English', 'French', 'Swahili'],
  demonym: 'Rwandan',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'USD', region: 'MEA' },
  divisions: [
    { code: 'KIG', name: 'Kigali', type: 'province',
      cities: [
        { code: 'KIGALI', name: 'Kigali' },
        { code: 'NYABUGOGO', name: 'Nyabugogo' },
        { code: 'KICUKIRO', name: 'Kicukiro' },
        { code: 'GASABO', name: 'Gasabo' },
        { code: 'NYARUGENGE', name: 'Nyarugenge' }
      ]
    },
    { code: 'NOR', name: 'Northern', type: 'province',
      cities: [
        { code: 'BYUMBA', name: 'Byumba' },
        { code: 'MUSANZE', name: 'Musanze' },
        { code: 'GICUMBI', name: 'Gicumbi' },
        { code: 'RULINDO', name: 'Rulindo' },
        { code: 'BURERA', name: 'Burera' }
      ]
    },
    { code: 'SOU', name: 'Southern', type: 'province',
      cities: [
        { code: 'NYANZA', name: 'Nyanza' },
        { code: 'HUYE', name: 'Huye' },
        { code: 'NYAMAGABE', name: 'Nyamagabe' },
        { code: 'GISUNYI', name: 'Gisinyi' },
        { code: 'NYARUGENGE', name: 'Nyarugenge' }
      ]
    },
    { code: 'EAS', name: 'Eastern', type: 'province',
      cities: [
        { code: 'RWAMAGANA', name: 'Rwamagana' },
        { code: 'KAYONZA', name: 'Kayonza' },
        { code: 'NGOMA', name: 'Ngoma' },
        { code: 'KIREHE', name: 'Kirehe' },
        { code: 'NYAGATARE', name: 'Nyagatare' }
      ]
    },
    { code: 'WES', name: 'Western', type: 'province',
      cities: [
        { code: 'KARONGI', name: 'Karongi' },
        { code: 'RUBAVU', name: 'Rubavu' },
        { code: 'RUSIZI', name: 'Rusizi' },
        { code: 'NYABIRU', name: 'Nyabiru' },
        { code: 'NYAMASHEKE', name: 'Nyamasheke' }
      ]
    }
  ]
};

export default rwanda;
