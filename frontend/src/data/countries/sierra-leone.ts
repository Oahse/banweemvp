/**
 * Sierra Leone country data with districts and cities
 */

import { Country } from './index';

export const sierraleone: Country = {
  code: 'SL',
  name: 'Sierra Leone',
  flag: '🇸🇱',
  capital: 'Freetown',
  area: 71740,
  currencySymbol: 'Le',
  officialLanguages: ['English'],
  demonym: 'Sierra Leonean',
  taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'SLL', region: 'MEA' },
  divisions: [
    { code: 'FRE', name: 'Freetown', type: 'district',
      cities: [
        { code: 'FREETOWN', name: 'Freetown' },
        { code: 'KENEMA', name: 'Kenema' },
        { code: 'BO', name: 'Bo' },
        { code: 'MAKENI', name: 'Makeni' },
        { code: 'KOIDU', name: 'Koidu' },
        { code: 'PORT', name: 'Port Loko' },
        { code: 'PANGUMA', name: 'Panguma' },
        { code: 'KABALA', name: 'Kabala' },
        { code: 'MAGBURAKA', name: 'Magburaka' },
        { code: 'WATERLOO', name: 'Waterloo' }
      ]
    },
    { code: 'BO', name: 'Bo', type: 'district',
      cities: [
        { code: 'BO', name: 'Bo' },
        { code: 'KENEMA', name: 'Kenema' },
        { code: 'MAKENI', name: 'Makeni' },
        { code: 'KOIDU', name: 'Koidu' },
        { code: 'PORT', name: 'Port Loko' },
        { code: 'PANGUMA', name: 'Panguma' },
        { code: 'KABALA', name: 'Kabala' },
        { code: 'MAGBURAKA', name: 'Magburaka' },
        { code: 'WATERLOO', name: 'Waterloo' }
      ]
    },
    { code: 'BON', name: 'Bombali', type: 'district',
      cities: [
        { code: 'MAGBURAKA', name: 'Magburaka' },
        { code: 'WATERLOO', name: 'Waterloo' },
        { code: 'KABALA', name: 'Kabala' },
        { code: 'KOIDU', name: 'Koidu' },
        { code: 'PORT', name: 'Port Loko' },
        { code: 'PANGUMA', name: 'Panguma' },
        { code: 'KENEMA', name: 'Kenema' },
        { code: 'MAKENI', name: 'Makeni' },
        { code: 'BO', name: 'Bo' }
      ]
    },
    { code: 'KEN', name: 'Kenema', type: 'district',
      cities: [
        { code: 'KENEMA', name: 'Kenema' },
        { code: 'MAKENI', name: 'Makeni' },
        { code: 'KOIDU', name: 'Koidu' },
        { code: 'PORT', name: 'Port Loko' },
        { code: 'PANGUMA', name: 'Panguma' },
        { code: 'KABALA', name: 'Kabala' },
        { code: 'MAGBURAKA', name: 'Magburaka' },
        { code: 'WATERLOO', name: 'Koidu' }
      ]
    },
    { code: 'KOI', name: 'Koinadugu', type: 'district',
      cities: [
        { code: 'KOIDU', name: 'Koidu' },
        { code: 'PORT', name: 'Port Loko' },
        { code: 'PANGUMA', name: 'Panguma' },
        { code: 'KABALA', name: 'Kabala' },
        { code: 'MAGBURAKA', name: 'Magburaka' },
        { code: 'WATERLOO', name: 'Waterloo' }
      ]
    },
    { code: 'MOY', name: 'Moyamba', type: 'district',
      cities: [
        { code: 'MOYAMBA', name: 'Moyamba' },
        { code: 'KOIDU', name: 'Koidu' },
        { code: 'PORT', name: 'Port Loko' },
        { code: 'PANGUMA', name: 'Panguma' },
        { code: 'KABALA', name: 'Kabala' },
        { code: 'MAGBURAKA', name: 'Magburaka' },
        { code: 'WATERLOO', name: 'Waterloo' }
      ]
    },
    { code: 'NOR', name: 'Northern', type: 'district',
      cities: [
        { code: 'MABOLE', name: 'Mabole' },
        { code: 'KABALA', name: 'Kabala' },
        { code: 'KOIDU', name: 'Koidu' },
        { code: 'PORT', name: 'Port Loko' },
        { code: 'PANGUMA', name: 'Panguma' },
        { code: 'KABALA', name: 'Kabala' },
        { code: 'MAGBURAKA', name: 'Magburaka' },
        { code: 'WATERLOO', name: 'Waterloo' }
      ]
    },
    { code: 'PUJ', name: 'Pujehun', type: 'district',
      cities: [
        { code: 'PUJEHUN', name: 'Pujehun' },
        { code: 'KABALA', name: 'Kabala' },
        { code: 'KOIDU', name: 'Koidu' },
        { code: 'PORT', name: 'Port Loko' },
        { code: 'PANGUMA', name: 'Panguma' },
        { code: 'KABALA', name: 'Kabala' },
        { code: 'MAGBURAKA', name: 'Magburaka' },
        { code: 'WATERLOO', name: 'Waterloo' }
      ]
    },
    {code: 'SOU', name: 'Southern', type: 'district',
      cities: [
        { code: 'BO', name: 'Bo' },
        { code: 'KENEMA', name: 'Kenema' },
        { code: 'MAKENI', name: 'Makeni' },
        { code: 'KOIDU', name: 'Koidu' },
        { code: 'PORT', name: 'Port Loko' },
        { code: 'PANGUMA', name: 'Panguma' },
        { code: 'KABALA', name: 'Kabala' },
        { code: 'MAGBURAKA', name: 'Magburaka' },
        { code: 'WATERLOO', name: 'Waterloo' }
      ]
    },
    { code: 'TON', name: 'Tonkolili', type: 'district',
      cities: [
        { code: 'TONKOLILI', name: 'Tonkolili' },
        { code: 'KOIDU', name: 'Koidu' },
        { code: 'PORT', name: 'Port Loko' },
        { code: 'PANGUMA', name: 'Panguma' },
        { code: 'KABALA', name: 'Kabala' },
        { code: 'MAGBURAKA', name: 'Magburaka' },
        { code: 'WATERLOO', name: 'Waterloo' }
      ]
    }
  ]
};

export default sierraleone;
