/**
 * Azerbaijan country data with regions and cities
 */

import { Country } from './index';

export const azerbaijan: Country = {
  code: 'AZ',
  name: 'Azerbaijan',
  flag: '🇦🇿',
  capital: 'Baku',
  area: 86600,
  currencySymbol: '₼',
  officialLanguages: ['Azerbaijani'],
  demonym: 'Azerbaijani',
  taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'AZN', region: 'MEA' },
  divisions: [
    { code: 'BAK', name: 'Baku', type: 'region',
      cities: [
        { code: 'BAKU', name: 'Baku' },
        { code: 'GANJA', name: 'Ganja' },
        { code: 'SUMQAYIT', name: 'Sumqayit' },
        { code: 'MINGACHEVIR', name: 'Mingachevir' },
        { code: 'SHAKI', name: 'Shaki' }
      ]
    },
    { code: 'GAN', name: 'Ganja', type: 'region',
      cities: [
        { code: 'GANJA', name: 'Ganja' },
        { code: 'SUMQAYIT', name: 'Sumqayit' },
        { code: 'MINGACHEVIR', name: 'Mingachevir' },
        { code: 'SHAKI', name: 'Shaki' },
        { code: 'BAKU', name: 'Baku' }
      ]
    },
    { code: 'SUM', name: 'Sumqayit', type: 'region',
      cities: [
        { code: 'SUMQAYIT', name: 'Sumqayit' },
        { code: 'MINGACHEVIR', name: 'Mingachevir' },
        { code: 'SHAKI', name: 'Shaki' },
        { code: 'BAKU', name: 'Baku' },
        { code: 'GANJA', name: 'Ganja' }
      ]
    },
    { code: 'MIN', name: 'Mingachevir', type: 'region',
      cities: [
        { code: 'MINGACHEVIR', name: 'Mingachevir' },
        { code: 'SHAKI', name: 'Shaki' },
        { code: 'BAKU', name: 'Baku' },
        { code: 'GANJA', name: 'Ganja' },
        { code: 'SUMQAYIT', name: 'Sumqayit' }
      ]
    },
    { code: 'SHA', name: 'Shaki', type: 'region',
      cities: [
        { code: 'SHAKI', name: 'Shaki' },
        { code: 'BAKU', name: 'Baku' },
        { code: 'GANJA', name: 'Ganja' },
        { code: 'SUMQAYIT', name: 'Sumqayit' },
        { code: 'MINGACHEVIR', name: 'Mingachevir' }
      ]
    }
  ]
};

export default azerbaijan;
