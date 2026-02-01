/**
 * Tonga country data with divisions and cities
 */

import { Country } from './index';

export const tonga: Country = {
  code: 'TO',
  name: 'Tonga',
  flag: '🇹🇴',
  capital: 'Nukuʻalofa',
  area: 748,
  currencySymbol: 'T$',
  officialLanguages: ['Tongan', 'English'],
  demonym: 'Tongan',
  taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'TOP', region: 'APAC' },
  divisions: [
    { code: 'NUK', name: 'Tongatapu', type: 'division',
      cities: [
        { code: 'NUKUALOFA', name: 'Nukuʻalofa' },
        { code: 'NEIAFU', name: 'Neiafu' },
        { code: 'HAAPAI', name: 'Havelu' },
        { code: 'VAVAU', name: 'Vavaʻu' },
        { code: 'EUA', name: 'Eua' }
      ]
    },
    { code: 'NEI', name: 'Vavaʻu', type: 'division',
      cities: [
        { code: 'NEIAFU', name: 'Neiafu' },
        { code: 'HAAPAI', name: 'Havelu' },
        { code: 'VAVAU', name: 'Vavaʻu' },
        { code: 'EUA', name: 'Eua' },
        { code: 'NUKUALOFA', name: 'Nukuʻalofa' }
      ]
    },
    { code: 'HAA', name: 'Haʻapai', type: 'division',
      cities: [
        { code: 'HAAPAI', name: 'Havelu' },
        { code: 'VAVAU', name: 'Vavaʻu' },
        { code: 'EUA', name: 'Eua' },
        { code: 'NUKUALOFA', name: 'Nukuʻalofa' },
        { code: 'NEIAFU', name: 'Neiafu' }
      ]
    },
    { code: 'VAV', name: 'Vavaʻu', type: 'division',
      cities: [
        { code: 'VAVAU', name: 'Vavaʻu' },
        { code: 'EUA', name: 'Eua' },
        { code: 'NUKUALOFA', name: 'Nukuʻalofa' },
        { code: 'NEIAFU', name: 'Neiafu' },
        { code: 'HAAPAI', name: 'Havelu' }
      ]
    },
    { code: 'EU', name: 'ʻEua', type: 'division',
      cities: [
        { code: 'EUA', name: 'Eua' },
        { code: 'NUKUALOFA', name: 'Nukuʻalofa' },
        { code: 'NEIAFU', name: 'Neiafu' },
        { code: 'HAAPAI', name: 'Havelu' },
        { code: 'VAVAU', name: 'Vavaʻu' }
      ]
    }
  ]
};
