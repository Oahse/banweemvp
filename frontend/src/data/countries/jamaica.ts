/**
 * Jamaica country data with parishes and cities
 */

import { Country } from './index';

export const jamaica: Country = {
  code: 'JM',
  name: 'Jamaica',
  flag: '🇯🇲',
  capital: 'Kingston',
  area: 10991,
  currencySymbol: 'J$',
  officialLanguages: ['English', 'Jamaican Patois'],
  demonym: 'Jamaican',
  taxInfo: { standardRate: 15, taxName: 'GCT', currency: 'JMD', region: 'NA' },
  divisions: [
    { code: 'KIN', name: 'Kingston', type: 'parish',
      cities: [
        { code: 'KINGSTON', name: 'Kingston' },
        { code: 'SPANISH', name: 'Spanish Town' },
        { code: 'PORTMORE', name: 'Portmore' },
        { code: 'MONTEGO', name: 'Montego Bay' },
        { code: 'MAY', name: 'May Pen' }
      ]
    },
    { code: 'SPA', name: 'Spanish Town', type: 'parish',
      cities: [
        { code: 'SPANISH', name: 'Spanish Town' },
        { code: 'PORTMORE', name: 'Portmore' },
        { code: 'MONTEGO', name: 'Montego Bay' },
        { code: 'MAY', name: 'May Pen' },
        { code: 'KINGSTON', name: 'Kingston' }
      ]
    },
    { code: 'POR', name: 'Portmore', type: 'parish',
      cities: [
        { code: 'PORTMORE', name: 'Portmore' },
        { code: 'MONTEGO', name: 'Montego Bay' },
        { code: 'MAY', name: 'May Pen' },
        { code: 'KINGSTON', name: 'Kingston' },
        { code: 'SPANISH', name: 'Spanish Town' }
      ]
    },
    { code: 'MON', name: 'Montego Bay', type: 'parish',
      cities: [
        { code: 'MONTEGO', name: 'Montego Bay' },
        { code: 'MAY', name: 'May Pen' },
        { code: 'KINGSTON', name: 'Kingston' },
        { code: 'SPANISH', name: 'Spanish Town' },
        { code: 'PORTMORE', name: 'Portmore' }
      ]
    },
    { code: 'MAY', name: 'May Pen', type: 'parish',
      cities: [
        { code: 'MAY', name: 'May Pen' },
        { code: 'KINGSTON', name: 'Kingston' },
        { code: 'SPANISH', name: 'Spanish Town' },
        { code: 'PORTMORE', name: 'Portmore' },
        { code: 'MONTEGO', name: 'Montego Bay' }
      ]
    }
  ]
};
