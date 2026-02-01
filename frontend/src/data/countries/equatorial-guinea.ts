/**
 * Equatorial Guinea country data with provinces and cities
 */

import { Country } from './index';

export const equatorialGuinea: Country = {
    code: 'GQ',
    name: 'Equatorial Guinea',
    flag: '🇬🇶',
    capital: 'Malabo',
    area: 28051,
    currencySymbol: 'FCFA',
    officialLanguages: ['Spanish', 'French', 'Portuguese'],
    demonym: 'Equatoguinean',
    taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'XAF', region: 'MEA' },
    divisions: [
      { code: 'AN', name: 'Annobón', type: 'province',
        cities: [
          { code: 'SAN', name: 'San Antonio de Palé' },
          { code: 'MAL', name: 'Malabo' },
          { code: 'EVI', name: 'Evinayong' },
          { code: 'MIC', name: 'Micomeseng' },
          { code: 'MUS', name: 'Moka' }
        ]
      },
      { code: 'BI', name: 'Bioko Norte', type: 'province',
        cities: [
          { code: 'MAL', name: 'Malabo' },
          { code: 'REBOLA', name: 'Rebola' },
          { code: 'BASUPU', name: 'Basupu' },
          { code: 'SANTIAGO', name: 'Santiago de Baney' },
          { code: 'RIO', name: 'Río Campo' }
        ]
      },
      { code: 'BS', name: 'Bioko Sur', type: 'province',
        cities: [
          { code: 'LUBA', name: 'Luba' },
          { code: 'RIABALA', name: 'Riaba' },
          { code: 'MOCHA', name: 'Mocha' },
          { code: 'BOLANDO', name: 'Bolondo' },
          { code: 'BALACHA', name: 'Balacha' }
        ]
      },
      { code: 'CS', name: 'Centro Sur', type: 'province',
        cities: [
          { code: 'EVI', name: 'Evinayong' },
          { code: 'MIC', name: 'Micomeseng' },
          { code: 'BUE', name: 'Buea' },
          { code: 'SAG', name: 'Sagay' },
          { code: 'AKON', name: 'Akonibe' }
        ]
      },
      { code: 'KN', name: 'Kié-Ntem', type: 'province',
        cities: [
          { code: 'EVI', name: 'Evinayong' },
          { code: 'MIC', name: 'Micomeseng' },
          { code: 'BUE', name: 'Buea' },
          { code: 'SAG', name: 'Sagay' },
          { code: 'AKON', name: 'Akonibe' }
        ]
      },
      { code: 'LI', name: 'Litoral', type: 'province',
        cities: [
          { code: 'BATA', name: 'Bata' },
          { code: 'MBO', name: 'Mbini' },
          { code: 'MUS', name: 'Moka' },
          { code: 'BIS', name: 'Bisogo' },
          { code: 'MAL', name: 'Malabo' }
        ]
      },
      { code: 'WE', name: 'Wele-Nzas', type: 'province',
        cities: [
          { code: 'MONGOMO', name: 'Mongomo' },
          { code: 'AYENE', name: 'Ayene' },
          { code: 'ANISOC', name: 'Anisoc' },
          { code: 'NSOK', name: 'Nsok' },
          { code: 'ACUREN', name: 'Acurenam' }
        ]
      }
    ]
  };
