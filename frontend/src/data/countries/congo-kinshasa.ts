/**
 * Congo - Kinshasa country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const congoKinshasa: Country = {
    code: 'CD',
    name: 'Congo - Kinshasa',
    taxInfo: { standardRate: 16, taxName: 'VAT', currency: 'CDF', region: 'MEA' },
    provinces: [
      { code: 'KIN', name: 'Kinshasa',
        cities: [
          { code: 'KIN', name: 'Kinshasa' },
          { code: 'BAND', name: 'Bandundu' },
          { code: 'BENI', name: 'Beni' },
          { code: 'BOM', name: 'Boma' },
          { code: 'BUK', name: 'Bukavu' },
          { code: 'BUT', name: 'Buta' },
          { code: 'GEM', name: 'Goma' },
          { code: 'KAN', name: 'Kananga' },
          { code: 'KAS', name: 'Kasongo' },
          { code: 'KIS', name: 'Kisangani' }
        ]
      },
      { code: 'BAN', name: 'Bandundu',
        cities: [
          { code: 'BAND', name: 'Bandundu' },
          { code: 'KAS', name: 'Kasongo' },
          { code: 'KIK', name: 'Kikwit' },
          { code: 'KUN', name: 'Kungu' },
          { code: 'MUSH', name: 'Mushie' },
          { code: 'NIK', name: 'Nikisi' },
          { code: 'SEK', name: 'Sekenge' },
          { code: 'KIN', name: 'Kinshasa' },
          { code: 'BENI', name: 'Beni' },
          { code: 'BOM', name: 'Boma' }
        ]
      },
      { code: 'BAS', name: 'Bas-Congo',
        cities: [
          { code: 'BOM', name: 'Boma' },
          { code: 'MAT', name: 'Matadi' },
          { code: 'MOE', name: 'Moanda' },
          { code: 'TSH', name: 'Tshikapa' },
          { code: 'KAS', name: 'Kasongo' },
          { code: 'KIK', name: 'Kikwit' },
          { code: 'KUN', name: 'Kungu' },
          { code: 'MUSH', name: 'Mushie' },
          { code: 'NIK', name: 'Nikisi' },
          { code: 'SEK', name: 'Sekenge' }
        ]
      },
      { code: 'EQU', name: 'Équateur',
        cities: [
          { code: 'MBU', name: 'Mbandaka' },
          { code: 'BAS', name: 'Basankusu' },
          { code: 'BOK', name: 'Bokungu' },
          { code: 'BOS', name: 'Boso' },
          { code: 'COQ', name: 'Coquilhatville' },
          { code: 'ING', name: 'Ingende' },
          { code: 'LIS', name: 'Lisala' },
          { code: 'LOT', name: 'Looto' },
          { code: 'BAM', name: 'Bamako' },
          { code: 'KIN', name: 'Kinshasa' }
        ]
      },
      { code: 'HAU', name: 'Haut-Katanga',
        cities: [
          { code: 'LUB', name: 'Lubumbashi' },
          { code: 'KOL', name: 'Kolwezi' },
          { code: 'LIK', name: 'Likasi' },
          { code: 'KAS', name: 'Kasenga' },
          { code: 'KAM', name: 'Kamina' },
          { code: 'PUN', name: 'Pweto' },
          { code: 'SEN', name: 'Sena' },
          { code: 'KIN', name: 'Kinshasa' },
          { code: 'BAND', name: 'Bandundu' },
          { code: 'BENI', name: 'Beni' }
        ]
      },
      { code: 'HAU2', name: 'Haut-Lomami',
        cities: [
          { code: 'KAN', name: 'Kananga' },
          { code: 'KAM', name: 'Kamina' },
          { code: 'KAB', name: 'Kabinda' },
          { code: 'KAS', name: 'Kasongo' },
          { code: 'KIK', name: 'Kikwit' },
          { code: 'KUN', name: 'Kungu' },
          { code: 'MUSH', name: 'Mushie' },
          { code: 'NIK', name: 'Nikisi' },
          { code: 'SEK', name: 'Sekenge' },
          { code: 'KIN', name: 'Kinshasa' }
        ]
      },
      { code: 'HAU3', name: 'Haut-Uele',
        cities: [
          { code: 'ISA', name: 'Isiro' },
          { code: 'BUT', name: 'Buta' },
          { code: 'BUN', name: 'Bunia' },
          { code: 'DUN', name: 'Dungu' },
          { code: 'FAR', name: 'Faradje' },
          { code: 'MAH', name: 'Mahagi' },
          { code: 'MAM', name: 'Mambasa' },
          { code: 'WAT', name: 'Watsa' },
          { code: 'KIN', name: 'Kinshasa' },
          { code: 'BAND', name: 'Bandundu' }
        ]
      },
      { code: 'ITU', name: 'Ituri',
        cities: [
          { code: 'BUN', name: 'Bunia' },
          { code: 'ARI', name: 'Aru' },
          { code: 'BEN', name: 'Beni' },
          { code: 'KOM', name: 'Komanda' },
          { code: 'MAH', name: 'Mahagi' },
          { code: 'MAM', name: 'Mambasa' },
          { code: 'WAT', name: 'Watsa' },
          { code: 'KIN', name: 'Kinshasa' },
          { code: 'BAND', name: 'Bandundu' },
          { code: 'BENI', name: 'Beni' }
        ]
      },
      { code: 'KAS', name: 'Kasaï',
        cities: [
          { code: 'LUK', name: 'Lubumbashi' },
          { code: 'KOL', name: 'Kolwezi' },
          { code: 'LIK', name: 'Likasi' },
          { code: 'KAS', name: 'Kasenga' },
          { code: 'KAM', name: 'Kamina' },
          { code: 'PUN', name: 'Pweto' },
          { code: 'SEN', name: 'Sena' },
          { code: 'KIN', name: 'Kinshasa' },
          { code: 'BAND', name: 'Bandundu' },
          { code: 'BENI', name: 'Beni' }
        ]
      },
      { code: 'KAS2', name: 'Kasaï-Oriental',
        cities: [
          { code: 'MBU', name: 'Mbuji-Mayi' },
          { code: 'BEN', name: 'Bena' },
          { code: 'KAM', name: 'Kamina' },
          { code: 'KAS', name: 'Kasongo' },
          { code: 'KIK', name: 'Kikwit' },
          { code: 'KUN', name: 'Kungu' },
          { code: 'MUSH', name: 'Mushie' },
          { code: 'NIK', name: 'Nikisi' },
          { code: 'SEK', name: 'Sekenge' },
          { code: 'KIN', name: 'Kinshasa' }
        ]
      },
      { code: 'KIN', name: 'Kinshasa',
        cities: [
          { code: 'KIN', name: 'Kinshasa' },
          { code: 'BAND', name: 'Bandundu' },
          { code: 'BENI', name: 'Beni' },
          { code: 'BOM', name: 'Boma' },
          { code: 'BUK', name: 'Bukavu' },
          { code: 'BUT', name: 'Buta' },
          { code: 'GEM', name: 'Goma' },
          { code: 'KAN', name: 'Kananga' },
          { code: 'KAS', name: 'Kasongo' },
          { code: 'KIS', name: 'Kisangani' }
        ]
      },
      { code: 'LOM', name: 'Lomami',
        cities: [
          { code: 'KAN', name: 'Kananga' },
          { code: 'KAM', name: 'Kamina' },
          { code: 'KAB', name: 'Kabinda' },
          { code: 'KAS', name: 'Kasongo' },
          { code: 'KIK', name: 'Kikwit' },
          { code: 'KUN', name: 'Kungu' },
          { code: 'MUSH', name: 'Mushie' },
          { code: 'NIK', name: 'Nikisi' },
          { code: 'SEK', name: 'Sekenge' },
          { code: 'KIN', name: 'Kinshasa' }
        ]
      },
      { code: 'LOP', name: 'Lualaba',
        cities: [
          { code: 'KOL', name: 'Kolwezi' },
          { code: 'LIK', name: 'Likasi' },
          { code: 'KAS', name: 'Kasenga' },
          { code: 'KAM', name: 'Kamina' },
          { code: 'PUN', name: 'Pweto' },
          { code: 'SEN', name: 'Sena' },
          { code: 'KIN', name: 'Kinshasa' },
          { code: 'BAND', name: 'Bandundu' },
          { code: 'BENI', name: 'Beni' },
          { code: 'BOM', name: 'Boma' }
        ]
      },
      { code: 'MAN', name: 'Maniema',
        cities: [
          { code: 'KIN', name: 'Kindu' },
          { code: 'KAL', name: 'Kalemie' },
          { code: 'KAS', name: 'Kasongo' },
          { code: 'KIK', name: 'Kikwit' },
          { code: 'KUN', name: 'Kungu' },
          { code: 'MUSH', name: 'Mushie' },
          { code: 'NIK', name: 'Nikisi' },
          { code: 'SEK', name: 'Sekenge' },
          { code: 'KIN2', name: 'Kinshasa' },
          { code: 'BAND', name: 'Bandundu' }
        ]
      },
      { code: 'MON', name: 'Mongala',
        cities: [
          { code: 'LIS', name: 'Lisala' },
          { code: 'BAM', name: 'Bamako' },
          { code: 'KIN', name: 'Kinshasa' },
          { code: 'BAND', name: 'Bandundu' },
          { code: 'BENI', name: 'Beni' },
          { code: 'BOM', name: 'Boma' },
          { code: 'BUK', name: 'Bukavu' },
          { code: 'BUT', name: 'Buta' },
          { code: 'GEM', name: 'Goma' },
          { code: 'KAN', name: 'Kananga' }
        ]
      },
      { code: 'NOR', name: 'Nord-Kivu',
        cities: [
          { code: 'GOM', name: 'Goma' },
          { code: 'BUT', name: 'Buta' },
          { code: 'BUN', name: 'Bunia' },
          { code: 'BEN', name: 'Beni' },
          { code: 'KOM', name: 'Komanda' },
          { code: 'MAH', name: 'Mahagi' },
          { code: 'MAM', name: 'Mambasa' },
          { code: 'WAT', name: 'Watsa' },
          { code: 'KIN', name: 'Kinshasa' },
          { code: 'BAND', name: 'Bandundu' }
        ]
      },
      { code: 'ORI', name: 'Orientale',
        cities: [
          { code: 'KIS', name: 'Kisangani' },
          { code: 'BUT', name: 'Buta' },
          { code: 'BUN', name: 'Bunia' },
          { code: 'BEN', name: 'Beni' },
          { code: 'KOM', name: 'Komanda' },
          { code: 'MAH', name: 'Mahagi' },
          { code: 'MAM', name: 'Mambasa' },
          { code: 'WAT', name: 'Watsa' },
          { code: 'KIN', name: 'Kinshasa' },
          { code: 'BAND', name: 'Bandundu' }
        ]
      },
      { code: 'SUD', name: 'Sud-Kivu',
        cities: [
          { code: 'KAM', name: 'Kamina' },
          { code: 'KAS', name: 'Kasongo' },
          { code: 'KIK', name: 'Kikwit' },
          { code: 'KUN', name: 'Kungu' },
          { code: 'MUSH', name: 'Mushie' },
          { code: 'NIK', name: 'Nikisi' },
          { code: 'SEK', name: 'Sekenge' },
          { code: 'KIN', name: 'Kinshasa' },
          { code: 'BAND', name: 'Bandundu' },
          { code: 'BENI', name: 'Beni' }
        ],
        taxInfo: { standardRate: 16, taxName: 'VAT', currency: 'CDF', region: 'MEA' }
      },
      { code: 'TAN', name: 'Tanganyika',
        cities: [
          { code: 'KAL', name: 'Kalemie' },
          { code: 'KAS', name: 'Kasongo' },
          { code: 'KIK', name: 'Kikwit' },
          { code: 'KUN', name: 'Kungu' },
          { code: 'MUSH', name: 'Mushie' },
          { code: 'NIK', name: 'Nikisi' },
          { code: 'SEK', name: 'Sekenge' },
          { code: 'KIN', name: 'Kinshasa' },
          { code: 'BAND', name: 'Bandundu' },
          { code: 'BENI', name: 'Beni' }
        ]
      },
      { code: 'TSH', name: 'Tshopo',
        cities: [
          { code: 'KIS', name: 'Kisangani' },
          { code: 'BUT', name: 'Buta' },
          { code: 'BUN', name: 'Bunia' },
          { code: 'BEN', name: 'Beni' },
          { code: 'KOM', name: 'Komanda' },
          { code: 'MAH', name: 'Mahagi' },
          { code: 'MAM', name: 'Mambasa' },
          { code: 'WAT', name: 'Watsa' },
          { code: 'KIN', name: 'Kinshasa' },
          { code: 'BAND', name: 'Bandundu' }
        ]
      }
    ]
  };
