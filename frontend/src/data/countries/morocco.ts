/**
 * Morocco country data with regions, cities, and tax information
 */

import { Country } from './index';

export const morocco: Country = {
    code: 'MA',
    name: 'Morocco',
    taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'MAD', region: 'MEA' },
    provinces: [
      { code: 'CAS', name: 'Casablanca-Settat',
        cities: [
          { code: 'CAS', name: 'Casablanca' },
          { code: 'SET', name: 'Settat' },
          { code: 'MOH', name: 'Mohammedia' },
          { code: 'ELJ', name: 'El Jadida' },
          { code: 'BER', name: 'Berrechid' },
          { code: 'BEN', name: 'Benslimane' },
          { code: 'KHO', name: 'Khouribga' },
          { code: 'SIDI', name: 'Sidi Bennour' },
          { code: 'AZE', name: 'Azemmour' },
          { code: 'NOU', name: 'Nouaceur' }
        ]
      },
      { code: 'RAB', name: 'Rabat-Salé-Kénitra',
        cities: [
          { code: 'RAB', name: 'Rabat' },
          { code: 'SAL', name: 'Salé' },
          { code: 'KEN', name: 'Kénitra' },
          { code: 'TEM', name: 'Temara' },
          { code: 'SIDI', name: 'Sidi Slimane' },
          { code: 'KHE', name: 'Khemisset' },
          { code: 'SKH', name: 'Skhirate-Témara' },
          { code: 'SIDI2', name: 'Sidi Kacem' },
          { code: 'ROM', name: 'Rommani' },
          { code: 'SALE', name: 'Sale' }
        ]
      },
      { code: 'FES', name: 'Fès-Meknès',
        cities: [
          { code: 'FES', name: 'Fès' },
          { code: 'MEK', name: 'Meknès' },
          { code: 'MOU', name: 'Moulay Yacoub' },
          { code: 'IFE', name: 'Ifrane' },
          { code: 'TAZ', name: 'Taza' },
          { code: 'BOU', name: 'Boulemane' },
          { code: 'SEF', name: 'Sefrou' },
          { code: 'ELH', name: 'El Hajeb' },
          { code: 'TAZA2', name: 'Taounate' },
          { code: 'MIS', name: 'Missour' }
        ]
      },
      { code: 'MARR', name: 'Marrakech-Safi',
        cities: [
          { code: 'MAR', name: 'Marrakech' },
          { code: 'SAF', name: 'Safi' },
          { code: 'ALH', name: 'Al Haouz' },
          { code: 'CHI', name: 'Chichaoua' },
          { code: 'ESS', name: 'Essaouira' },
          { code: 'REH', name: 'Rehamna' },
          { code: 'YOUS', name: 'Youssoufia' },
          { code: 'KEL', name: 'Kelaat Sraghna' },
          { code: 'ELK', name: 'El Kelaa des Sraghna' },
          { code: 'SIDI3', name: 'Sidi Bennour' }
        ]
      },
      { code: 'TAN', name: 'Tangier-Tétouan-Al Hoceima',
        cities: [
          { code: 'TAN', name: 'Tangier' },
          { code: 'TET', name: 'Tétouan' },
          { code: 'ALH2', name: 'Al Hoceima' },
          { code: 'LAR', name: 'Larache' },
          { code: 'OUJ', name: 'Oujda' },
          { code: 'NAD', name: 'Nador' },
          { code: 'BER2', name: 'Berkane' },
          { code: 'TAU', name: 'Taourirt' },
          { code: 'JER', name: 'Jerada' },
          { code: 'FIG', name: 'Figuig' }
        ]
      },
      { code: 'ORI', name: 'Oriental',
        cities: [
          { code: 'OUJ', name: 'Oujda' },
          { code: 'NAD', name: 'Nador' },
          { code: 'BER2', name: 'Berkane' },
          { code: 'TAU', name: 'Taourirt' },
          { code: 'JER', name: 'Jerada' },
          { code: 'FIG', name: 'Figuig' },
          { code: 'GUER', name: 'Guercif' },
          { code: 'JRA', name: 'Jrada' },
          { code: 'AIN', name: 'Ain Beni Mathar' },
          { code: 'DEB', name: 'Debdou' }
        ]
      },
      { code: 'SOU', name: 'Souss-Massa',
        cities: [
          { code: 'AGA', name: 'Agadir' },
          { code: 'INE', name: 'Inezgane-Ait Melloul' },
          { code: 'TAR', name: 'Taroudant' },
          { code: 'TIZ', name: 'Tiznit' },
          { code: 'OUAR', name: 'Ouarzazate' },
          { code: 'ZAG', name: 'Zagora' },
          { code: 'CHT', name: 'Chtouka Ait Baha' },
          { code: 'TATA', name: 'Tata' },
          { code: 'SIDI4', name: 'Sidi Ifni' },
          { code: 'TIZ2', name: 'Tiznit' }
        ]
      },
      { code: 'DRS', name: 'Drâa-Tafilalet',
        cities: [
          { code: 'OUAR', name: 'Ouarzazate' },
          { code: 'ZAG', name: 'Zagora' },
          { code: 'ERR', name: 'Errachidia' },
          { code: 'TIN', name: 'Tinghir' },
          { code: 'MID', name: 'Midelt' },
          { code: 'AZI', name: 'Azilal' },
          { code: 'BEN2', name: 'Beni Mellal' },
          { code: 'KHE2', name: 'Khenifra' },
          { code: 'KHEN', name: 'Khenifra' },
          { code: 'AZIL', name: 'Azilal' }
        ]
      },
      { code: 'GUE', name: 'Guelmim-Oued Noun',
        cities: [
          { code: 'GUE', name: 'Guelmim' },
          { code: 'SIDI5', name: 'Sidi Ifni' },
          { code: 'TAN2', name: 'Tan-Tan' },
          { code: 'LAAY', name: 'Laayoune' },
          { code: 'BOU2', name: 'Boujdour' },
          { code: 'TAR2', name: 'Tarfaya' },
          { code: 'ESM', name: 'Es-Semara' },
          { code: 'GUE2', name: 'Guelmim' },
          { code: 'ASSA', name: 'Assa-Zag' },
          { code: 'TATA2', name: 'Tata' }
        ]
      },
      { code: 'LAA', name: 'Laâyoune-Sakia El Hamra',
        cities: [
          { code: 'LAA', name: 'Laayoune' },
          { code: 'BOU2', name: 'Boujdour' },
          { code: 'TAR2', name: 'Tarfaya' },
          { code: 'ESM', name: 'Es-Semara' },
          { code: 'GUE2', name: 'Guelmim' },
          { code: 'ASSA', name: 'Assa-Zag' },
          { code: 'TATA2', name: 'Tata' },
          { code: 'TAN2', name: 'Tan-Tan' },
          { code: 'SIDI5', name: 'Sidi Ifni' },
          { code: 'GUE', name: 'Guelmim' }
        ]
      },
      { code: 'DAD', name: 'Dakhla-Oued Ed-Dahab',
        cities: [
          { code: 'DAK', name: 'Dakhla' },
          { code: 'AOU', name: 'Aousserd' },
          { code: 'BOU3', name: 'Boujdour' },
          { code: 'LAA2', name: 'Laayoune' },
          { code: 'TAR3', name: 'Tarfaya' },
          { code: 'ESM2', name: 'Es-Semara' },
          { code: 'GUE3', name: 'Guelmim' },
          { code: 'ASSA2', name: 'Assa-Zag' },
          { code: 'TATA3', name: 'Tata' },
          { code: 'TAN3', name: 'Tan-Tan' }
        ]
      },
      { code: 'BER3', name: 'Béni Mellal-Khénifra',
        cities: [
          { code: 'BEN2', name: 'Beni Mellal' },
          { code: 'KHE2', name: 'Khenifra' },
          { code: 'AZI', name: 'Azilal' },
          { code: 'KHEN', name: 'Khenifra' },
          { code: 'AZIL', name: 'Azilal' },
          { code: 'FQU', name: 'Fquih Ben Salah' },
          { code: 'SOU2', name: 'Sidi Slimane' },
          { code: 'KHO2', name: 'Khouribga' },
          { code: 'BER4', name: 'Berrani' },
          { code: 'SIDI6', name: 'Sidi Bennour' }
        ]
      }
    ]
  };
