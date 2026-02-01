/**
 * Uzbekistan country data with regions and cities
 */

import { Country } from './index';

export const uzbekistan: Country = {
  code: 'UZ',
  name: 'Uzbekistan',
  flag: '🇺🇿',
  capital: 'Tashkent',
  area: 447400,
  currencySymbol: 'сўм',
  officialLanguages: ['Uzbek', 'Russian'],
  demonym: 'Uzbek',
  taxInfo: { standardRate: 12, taxName: 'VAT', currency: 'UZS', region: 'APAC' },
  divisions: [
    { code: 'TAS', name: 'Tashkent', type: 'region',
      cities: [
        { code: 'TASHKENT', name: 'Tashkent' },
        { code: 'SAMARKAND', name: 'Samarkand' },
        { code: 'BUKHARA', name: 'Bukhara' },
        { code: 'ANDIJAN', name: 'Andijan' },
        { code: 'FERGANA', name: 'Fergana' }
      ]
    },
    { code: 'SAM', name: 'Samarkand', type: 'region',
      cities: [
        { code: 'SAMARKAND', name: 'Samarkand' },
        { code: 'BUKHARA', name: 'Bukhara' },
        { code: 'ANDIJAN', name: 'Andijan' },
        { code: 'FERGANA', name: 'Fergana' },
        { code: 'TASHKENT', name: 'Tashkent' }
      ]
    },
    { code: 'BUK', name: 'Bukhara', type: 'region',
      cities: [
        { code: 'BUKHARA', name: 'Bukhara' },
        { code: 'ANDIJAN', name: 'Andijan' },
        { code: 'FERGANA', name: 'Fergana' },
        { code: 'TASHKENT', name: 'Tashkent' },
        { code: 'SAMARKAND', name: 'Samarkand' }
      ]
    },
    { code: 'AND', name: 'Andijan', type: 'region',
      cities: [
        { code: 'ANDIJAN', name: 'Andijan' },
        { code: 'FERGANA', name: 'Fergana' },
        { code: 'TASHKENT', name: 'Tashkent' },
        { code: 'SAMARKAND', name: 'Samarkand' },
        { code: 'BUKHARA', name: 'Bukhara' }
      ]
    },
    { code: 'FER', name: 'Fergana', type: 'region',
      cities: [
        { code: 'FERGANA', name: 'Fergana' },
        { code: 'TASHKENT', name: 'Tashkent' },
        { code: 'SAMARKAND', name: 'Samarkand' },
        { code: 'BUKHARA', name: 'Bukhara' },
        { code: 'ANDIJAN', name: 'Andijan' }
      ]
    }
  ]
};

export default uzbekistan;
