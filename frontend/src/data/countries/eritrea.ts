/**
 * Eritrea country data with regions, cities, and tax information
 */

import { Country } from './index';

export const eritrea: Country = {
    code: 'ER',
    name: 'Eritrea',
    taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'ERN', region: 'MEA' },
    provinces: [
      { code: 'MA', name: 'Maekel',
        cities: [
          { code: 'ASM', name: 'Asmara' },
          { code: 'TSO', name: 'Tsorona' },
          { code: 'ADI', name: 'Adi Quala' },
          { code: 'BER', name: 'Berik' },
          { code: 'GUL', name: 'Guluj' },
          { code: 'KOR', name: 'Koron' },
          { code: 'MEN', name: 'Mendefera' },
          { code: 'SERA', name: 'Serha' },
          { code: 'WEA', name: 'Wea' },
          { code: 'ZAWA', name: 'Zawa' }
        ]
      },
      { code: 'AN', name: 'Anseba',
        cities: [
          { code: 'KER', name: 'Keren' },
          { code: 'HAG', name: 'Hagaz' },
          { code: 'HAL', name: 'Halhal' },
          { code: 'ASM', name: 'Asmat' },
          { code: 'ELA', name: 'Elabered' },
          { code: 'GEH', name: 'Geleb' },
          { code: 'SAB', name: 'Sabe' },
          { code: 'TSE', name: 'Tseazega' },
          { code: 'ADK', name: 'Adi Keyh' },
          { code: 'FIL', name: 'Filfil' }
        ]
      },
      { code: 'DK', name: 'Debub',
        cities: [
          { code: 'MEN', name: 'Mendefera' },
          { code: 'ADI', name: 'Adi Ugri' },
          { code: 'ARE', name: 'Areza' },
          { code: 'DEK', name: 'Deki' },
          { code: 'EMI', name: 'Emberemi' },
          { code: 'GUL', name: 'Guluj' },
          { code: 'KOR', name: 'Koron' },
          { code: 'MAI', name: 'Mai Dima' },
          { code: 'SEN', name: 'Senafe' },
          { code: 'TSO', name: 'Tsorona' }
        ]
      },
      { code: 'GB', name: 'Gash-Barka',
        cities: [
          { code: 'BAR', name: 'Barentu' },
          { code: 'TES', name: 'Tesenei' },
          { code: 'AKO', name: 'Akordat' },
          { code: 'AGO', name: 'Agordat' },
          { code: 'GUL', name: 'Guluj' },
          { code: 'HAL', name: 'Halhal' },
          { code: 'KOR', name: 'Koron' },
          { code: 'MEN', name: 'Mendefera' },
          { code: 'SAB', name: 'Sabe' },
          { code: 'TSE', name: 'Tseazega' }
        ]
      },
      { code: 'SK', name: 'Southern Red Sea',
        cities: [
          { code: 'ASS', name: 'Assab' },
          { code: 'BEI', name: 'Beilul' },
          { code: 'DUB', name: 'Dubsi' },
          { code: 'GEL', name: 'Gelalo' },
          { code: 'HAF', name: 'Hafun' },
          { code: 'RAH', name: 'Rahaita' },
          { code: 'TAI', name: 'Tio' },
          { code: 'ZUL', name: 'Zula' },
          { code: 'ADI', name: 'Adi Keyh' },
          { code: 'SEN', name: 'Senafe' }
        ]
      },
      { code: 'NR', name: 'Northern Red Sea',
        cities: [
          { code: 'MAS', name: 'Massawa' },
          { code: 'GHI', name: 'Ghinda' },
          { code: 'NAC', name: 'Nacfa' },
          { code: 'ADI', name: 'Adi Keyh' },
          { code: 'BEI', name: 'Beilul' },
          { code: 'DUB', name: 'Dubsi' },
          { code: 'GEL', name: 'Gelalo' },
          { code: 'HAF', name: 'Hafun' },
          { code: 'RAH', name: 'Rahaita' },
          { code: 'TAI', name: 'Tio' }
        ]
      }
    ]
  };
