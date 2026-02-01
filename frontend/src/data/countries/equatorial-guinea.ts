/**
 * Equatorial Guinea country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const equatorialGuinea: Country = {
    code: 'GQ',
    name: 'Equatorial Guinea',
    taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'XAF', region: 'MEA' },
    provinces: [
      { code: 'AN', name: 'Annobón',
        cities: [
          { code: 'MAL', name: 'Malabo' },
          { code: 'EVI', name: 'Evinayong' },
          { code: 'MIC', name: 'Micomeseng' },
          { code: 'MUS', name: 'Moka' },
          { code: 'BATA', name: 'Bata' },
          { code: 'NUE', name: 'Niefang' },
          { code: 'SAG', name: 'Sagay' },
          { code: 'AKON', name: 'Akonibe' },
          { code: 'MVO', name: 'Mvo' },
          { code: 'BIS', name: 'Bisogo' }
        ]
      },
      { code: 'BI', name: 'Bioko',
        cities: [
          { code: 'MAL', name: 'Malabo' },
          { code: 'EVI', name: 'Evinayong' },
          { code: 'MIC', name: 'Micomeseng' },
          { code: 'MUS', name: 'Moka' },
          { code: 'BATA', name: 'Bata' },
          { code: 'NUE', name: 'Niefang' },
          { code: 'SAG', name: 'Sagay' },
          { code: 'AKON', name: 'Akonibe' },
          { code: 'MVO', name: 'Mvo' },
          { code: 'BIS', name: 'Bisogo' }
        ]
      },
      { code: 'CS', name: 'Centro Sur',
        cities: [
          { code: 'EVI', name: 'Evinayong' },
          { code: 'MIC', name: 'Micomeseng' },
          { code: 'BUE', name: 'Buea' },
          { code: 'SAG', name: 'Sagay' },
          { code: 'AKON', name: 'Akonibe' },
          { code: 'MVO', name: 'Mvo' },
          { code: 'BIS', name: 'Bisogo' },
          { code: 'MAL', name: 'Malabo' },
          { code: 'MUS', name: 'Moka' },
          { code: 'BATA', name: 'Bata' },
          { code: 'NUE', name: 'Niefang' }
        ]
      },
      { code: 'KN', name: 'Kié-Ntem',
        cities: [
          { code: 'EVI', name: 'Evinayong' },
          { code: 'MIC', name: 'Micomeseng' },
          { code: 'BUE', name: 'Buea' },
          { code: 'SAG', name: 'Sagay' },
          { code: 'AKON', name: 'Akonibe' },
          { code: 'MVO', name: 'Mvo' },
          { code: 'BIS', name: 'Bisogo' },
          { code: 'MAL', name: 'Malabo' },
          { code: 'MUS', name: 'Moka' },
          { code: 'BATA', name: 'Bata' },
          { code: 'NUE', name: 'Niefang' }
        ]
      },
      { code: 'LI', name: 'Litoral',
        cities: [
          { code: 'BATA', name: 'Bata' },
          { code: 'MBO', name: 'Mbini' },
          { code: 'MUS', name: 'Moka' },
          { code: 'BIS', name: 'Bisogo' },
          { code: 'MAL', name: 'Malabo' },
          { code: 'EVI', name: 'Evinayong' },
          { code: 'MIC', name: 'Micomeseng' },
          { code: 'BUE', name: 'Buea' },
          { code: 'SAG', name: 'Sagay' },
          { code: 'AKON', name: 'Akonibe' },
          { code: 'MVO', name: 'Mvo' }
        ]
      },
      { code: 'WE', name: 'Wele-Nzas',
        cities: [
          { code: 'MBO', name: 'Mbini' },
          { code: 'MUS', name: 'Moka' },
          { code: 'BIS', name: 'Bisogo' },
          { code: 'MAL', name: 'Malabo' },
          { code: 'EVI', name: 'Evinayong' },
          { code: 'MIC', name: 'Micomeseng' },
          { code: 'BUE', name: 'Buea' },
          { code: 'SAG', name: 'Sagay' },
          { code: 'AKON', name: 'Akonibe' },
          { code: 'MVO', name: 'Mvo' }
        ]
      }
    ]
  };
