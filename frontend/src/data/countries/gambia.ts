/**
 * Gambia country data with regions, cities, and tax information
 */

import { Country } from './index';

export const gambia: Country = {
    code: 'GM',
    name: 'Gambia',
    taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'GMD', region: 'MEA' },
    provinces: [
      { code: 'BAN', name: 'Banjul',
        cities: [
          { code: 'BAN', name: 'Banjul' },
          { code: 'SER', name: 'Serrekunda' },
          { code: 'BAK', name: 'Bakau' },
          { code: 'SUK', name: 'Sukuta' },
          { code: 'BRI', name: 'Brikama' },
          { code: 'KOT', name: 'Kotu' },
          { code: 'LON', name: 'Lamin' },
          { code: 'FAR', name: 'Farafenni' },
          { code: 'GES', name: 'Gesse' },
          { code: 'JAN', name: 'Janjanbureh' }
        ]
      },
      { code: 'KAN', name: 'Kanifing',
        cities: [
          { code: 'SER', name: 'Serrekunda' },
          { code: 'BAK', name: 'Bakau' },
          { code: 'SUK', name: 'Sukuta' },
          { code: 'KOT', name: 'Kotu' },
          { code: 'LON', name: 'Lamin' },
          { code: 'BAN', name: 'Banjul' },
          { code: 'BRI', name: 'Brikama' },
          { code: 'FAR', name: 'Farafenni' },
          { code: 'GES', name: 'Gesse' },
          { code: 'JAN', name: 'Janjanbureh' }
        ]
      },
      { code: 'NBR', name: 'North Bank',
        cities: [
          { code: 'FAR', name: 'Farafenni' },
          { code: 'GES', name: 'Gesse' },
          { code: 'JAN', name: 'Janjanbureh' },
          { code: 'KER', name: 'Kerewan' },
          { code: 'NIA', name: 'Niamina' },
          { code: 'SAB', name: 'Sabach' },
          { code: 'SER', name: 'Serrekunda' },
          { code: 'BAK', name: 'Bakau' },
          { code: 'SUK', name: 'Sukuta' },
          { code: 'BAN', name: 'Banjul' }
        ]
      },
      { code: 'LOW', name: 'Lower River',
        cities: [
          { code: 'MANS', name: 'Mansa Konko' },
          { code: 'KUN', name: 'Kuntaur' },
          { code: 'JAR', name: 'Jarra' },
          { code: 'SIB', name: 'Sibito' },
          { code: 'WUL', name: 'Wuli' },
          { code: 'FAR', name: 'Farafenni' },
          { code: 'GES', name: 'Gesse' },
          { code: 'JAN', name: 'Janjanbureh' },
          { code: 'KER', name: 'Kerewan' },
          { code: 'NIA', name: 'Niamina' }
        ]
      },
      { code: 'CEN', name: 'Central River',
        cities: [
          { code: 'JAN', name: 'Janjanbureh' },
          { code: 'KER', name: 'Kerewan' },
          { code: 'NIA', name: 'Niamina' },
          { code: 'SAB', name: 'Sabach' },
          { code: 'FUL', name: 'Fulladu' },
          { code: 'JAM', name: 'James Island' },
          { code: 'KUN', name: 'Kuntaur' },
          { code: 'MANS', name: 'Mansa Konko' },
          { code: 'JAR', name: 'Jarra' },
          { code: 'SIB', name: 'Sibito' }
        ]
      },
      { code: 'UPR', name: 'Upper River',
        cities: [
          { code: 'BAS', name: 'Basse' },
          { code: 'KUN', name: 'Kuntaur' },
          { code: 'FUL', name: 'Fulladu' },
          { code: 'JAM', name: 'James Island' },
          { code: 'MANS', name: 'Mansa Konko' },
          { code: 'JAR', name: 'Jarra' },
          { code: 'SIB', name: 'Sibito' },
          { code: 'WUL', name: 'Wuli' },
          { code: 'JAN', name: 'Janjanbureh' },
          { code: 'KER', name: 'Kerewan' }
        ]
      },
      { code: 'WES', name: 'Western',
        cities: [
          { code: 'BRI', name: 'Brikama' },
          { code: 'SER', name: 'Serrekunda' },
          { code: 'BAK', name: 'Bakau' },
          { code: 'SUK', name: 'Sukuta' },
          { code: 'KOT', name: 'Kotu' },
          { code: 'LON', name: 'Lamin' },
          { code: 'BAN', name: 'Banjul' },
          { code: 'FAR', name: 'Farafenni' },
          { code: 'GES', name: 'Gesse' },
          { code: 'JAN', name: 'Janjanbureh' }
        ]
      }
    ]
  };
