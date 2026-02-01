/**
 * Kuwait country data with governorates and cities
 */

import { Country } from './index';

export const kuwait: Country = {
  code: 'KW',
  name: 'Kuwait',
  flag: '🇰🇼',
  capital: 'Kuwait City',
  area: 17818,
  currencySymbol: 'د.ك',
  officialLanguages: ['Arabic', 'English'],
  demonym: 'Kuwaiti',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'USD', region: 'MEA' },
  divisions: [
    { code: 'KUW', name: 'Kuwait City', type: 'governorate',
      cities: [
        { code: 'KUWAIT', name: 'Kuwait City' },
        { code: 'HAWALLI', name: 'Hawalli' },
        { code: 'AHMADI', name: 'Ahmadi' },
        { code: 'FARWANIYA', name: 'Farwaniya' },
        { code: 'JABR', name: 'Jabriya' }
      ]
    },
    { code: 'HAW', name: 'Hawalli', type: 'governorate',
      cities: [
        { code: 'HAWALLI', name: 'Hawalli' },
        { code: 'AHMADI', name: 'Ahmadi' },
        { code: 'FARWANIYA', name: 'Farwaniya' },
        { code: 'JABR', name: 'Jabriya' },
        { code: 'KUWAIT', name: 'Kuwait City' }
      ]
    },
    { code: 'AHM', name: 'Ahmadi', type: 'governorate',
      cities: [
        { code: 'AHMADI', name: 'Ahmadi' },
        { code: 'FARWANIYA', name: 'Farwaniya' },
        { code: 'JABR', name: 'Jabriya' },
        { code: 'KUWAIT', name: 'Kuwait City' },
        { code: 'HAWALLI', name: 'Hawalli' }
      ]
    },
    { code: 'FAR', name: 'Farwaniya', type: 'governorate',
      cities: [
        { code: 'FARWANIYA', name: 'Farwaniya' },
        { code: 'JABR', name: 'Jabriya' },
        { code: 'KUWAIT', name: 'Kuwait City' },
        { code: 'HAWALLI', name: 'Hawalli' },
        { code: 'AHMADI', name: 'Ahmadi' }
      ]
    },
    { code: 'JAB', name: 'Jabriya', type: 'governorate',
      cities: [
        { code: 'JABR', name: 'Jabriya' },
        { code: 'KUWAIT', name: 'Kuwait City' },
        { code: 'HAWALLI', name: 'Hawalli' },
        { code: 'AHMADI', name: 'Ahmadi' },
        { code: 'FARWANIYA', name: 'Farwaniya' }
      ]
    }
  ]
};

export default kuwait;
