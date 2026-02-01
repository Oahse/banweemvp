/**
 * Palestine country data with governorates and cities
 */

import { Country } from './index';

export const palestine: Country = {
  code: 'PS',
  name: 'Palestine',
  flag: '🇵🇸',
  capital: 'Ramallah',
  area: 6220,
  currencySymbol: '₪',
  officialLanguages: ['Arabic', 'English'],
  demonym: 'Palestinian',
  taxInfo: { standardRate: 16, taxName: 'VAT', currency: 'ILS', region: 'MEA' },
  divisions: [
    { code: 'RAM', name: 'Ramallah', type: 'governorate',
      cities: [
        { code: 'RAMALLAH', name: 'Ramallah' },
        { code: 'AL-BIREH', name: 'Al-Bireh' },
        { code: 'BETHLEHEM', name: 'Bethlehem' },
        { code: 'JERICHO', name: 'Jericho' },
        { code: 'NABLUS', name: 'Nablus' }
      ]
    },
    { code: 'BIR', name: 'Al-Bireh', type: 'governorate',
      cities: [
        { code: 'AL-BIREH', name: 'Al-Bireh' },
        { code: 'BETHLEHEM', name: 'Bethlehem' },
        { code: 'JERICHO', name: 'Jericho' },
        { code: 'NABLUS', name: 'Nablus' },
        { code: 'RAMALLAH', name: 'Ramallah' }
      ]
    },
    { code: 'BET', name: 'Bethlehem', type: 'governorate',
      cities: [
        { code: 'BETHLEHEM', name: 'Bethlehem' },
        { code: 'JERICHO', name: 'Jericho' },
        { code: 'NABLUS', name: 'Nablus' },
        { code: 'RAMALLAH', name: 'Ramallah' },
        { code: 'AL-BIREH', name: 'Al-Bireh' }
      ]
    },
    { code: 'JER', name: 'Jericho', type: 'governorate',
      cities: [
        { code: 'JERICHO', name: 'Jericho' },
        { code: 'NABLUS', name: 'Nablus' },
        { code: 'RAMALLAH', name: 'Ramallah' },
        { code: 'AL-BIREH', name: 'Al-Bireh' },
        { code: 'BETHLEHEM', name: 'Bethlehem' }
      ]
    },
    { code: 'NAB', name: 'Nablus', type: 'governorate',
      cities: [
        { code: 'NABLUS', name: 'Nablus' },
        { code: 'RAMALLAH', name: 'Ramallah' },
        { code: 'AL-BIREH', name: 'Al-Bireh' },
        { code: 'BETHLEHEM', name: 'Bethlehem' },
        { code: 'JERICHO', name: 'Jericho' }
      ]
    }
  ]
};
