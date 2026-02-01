/**
 * Oman country data with governorates and cities
 */

import { Country } from './index';

export const oman: Country = {
  code: 'OM',
  name: 'Oman',
  flag: '🇴🇲',
  capital: 'Muscat',
  area: 309500,
  currencySymbol: 'ر.ع.',
  officialLanguages: ['Arabic'],
  demonym: 'Omani',
  taxInfo: { standardRate: 5, taxName: 'VAT', currency: 'OMR', region: 'MEA' },
  divisions: [
    { code: 'MUS', name: 'Muscat', type: 'governorate',
      cities: [
        { code: 'MUSCAT', name: 'Muscat' },
        { code: 'SALALAH', name: 'Salalah' },
        { code: 'SUR', name: 'Sur' },
        { code: 'NAH', name: 'Nizwa' },
        { code: 'SOHAR', name: 'Sohar' }
      ]
    },
    { code: 'SAL', name: 'Salalah', type: 'governorate',
      cities: [
        { code: 'SALALAH', name: 'Salalah' },
        { code: 'SUR', name: 'Sur' },
        { code: 'NAH', name: 'Nizwa' },
        { code: 'SOHAR', name: 'Sohar' },
        { code: 'MUSCAT', name: 'Muscat' }
      ]
    },
    { code: 'SUR', name: 'Sur', type: 'governorate',
      cities: [
        { code: 'SUR', name: 'Sur' },
        { code: 'NAH', name: 'Nizwa' },
        { code: 'SOHAR', name: 'Sohar' },
        { code: 'MUSCAT', name: 'Muscat' },
        { code: 'SALALAH', name: 'Salalah' }
      ]
    },
    { code: 'NAH', name: 'Nizwa', type: 'governorate',
      cities: [
        { code: 'NAH', name: 'Nizwa' },
        { code: 'SOHAR', name: 'Sohar' },
        { code: 'MUSCAT', name: 'Muscat' },
        { code: 'SALALAH', name: 'Salalah' },
        { code: 'SUR', name: 'Sur' }
      ]
    },
    { code: 'SOH', name: 'Sohar', type: 'governorate',
      cities: [
        { code: 'SOHAR', name: 'Sohar' },
        { code: 'MUSCAT', name: 'Muscat' },
        { code: 'SALALAH', name: 'Salalah' },
        { code: 'SUR', name: 'Sur' },
        { code: 'NAH', name: 'Nizwa' }
      ]
    }
  ]
};

export default oman;
