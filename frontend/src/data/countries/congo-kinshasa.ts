/**
 * Congo - Kinshasa country data with provinces and cities
 */

import { Country } from './index';

export const congoKinshasa: Country = {
    code: 'CD',
    name: 'Congo - Kinshasa',
    flag: '🇨🇩',
    capital: 'Kinshasa',
    area: 2344858,
    currencySymbol: 'FC',
    officialLanguages: ['French'],
    demonym: 'Congolese',
    taxInfo: { standardRate: 16, taxName: 'VAT', currency: 'CDF', region: 'MEA' },
    divisions: [
      { code: 'KIN', name: 'Kinshasa', type: 'province',
        cities: [
          { code: 'KIN', name: 'Kinshasa' },
          { code: 'BAND', name: 'Bandundu' },
          { code: 'BENI', name: 'Beni' },
          { code: 'BOM', name: 'Boma' },
          { code: 'BUK', name: 'Bukavu' }
        ]
      },
      { code: 'BAN', name: 'Bandundu', type: 'province',
        cities: [
          { code: 'BAND', name: 'Bandundu' },
          { code: 'KAS', name: 'Kasongo' },
          { code: 'KIK', name: 'Kikwit' },
          { code: 'KUN', name: 'Kungu' },
          { code: 'MUSH', name: 'Mushie' }
        ]
      },
      { code: 'BAS', name: 'Bas-Congo', type: 'province',
        cities: [
          { code: 'BOM', name: 'Boma' },
          { code: 'MAT', name: 'Matadi' },
          { code: 'MOE', name: 'Moanda' },
          { code: 'TSH', name: 'Tshikapa' },
          { code: 'KAS', name: 'Kasongo' }
        ]
      },
      { code: 'EQU', name: 'Équateur', type: 'province',
        cities: [
          { code: 'MBU', name: 'Mbandaka' },
          { code: 'BAS', name: 'Basankusu' },
          { code: 'BOK', name: 'Bokungu' },
          { code: 'BOS', name: 'Boso' },
          { code: 'COQ', name: 'Coquilhatville' }
        ]
      },
      { code: 'HAU', name: 'Haut-Katanga', type: 'province',
        cities: [
          { code: 'LUB', name: 'Lubumbashi' },
          { code: 'KOL', name: 'Kolwezi' },
          { code: 'LIK', name: 'Likasi' },
          { code: 'KAS', name: 'Kasenga' },
          { code: 'KAM', name: 'Kamina' }
        ]
      },
      { code: 'HAU2', name: 'Haut-Lomami', type: 'province',
        cities: [
          { code: 'KAN', name: 'Kananga' },
          { code: 'KAM', name: 'Kamina' },
          { code: 'KAB', name: 'Kabinda' },
          { code: 'KAS', name: 'Kasongo' },
          { code: 'KIK', name: 'Kikwit' }
        ]
      },
      { code: 'HAU3', name: 'Haut-Uele', type: 'province',
        cities: [
          { code: 'ISA', name: 'Isiro' },
          { code: 'BUT', name: 'Buta' },
          { code: 'BUN', name: 'Bunia' },
          { code: 'DUN', name: 'Dungu' },
          { code: 'FAR', name: 'Faradje' }
        ]
      },
      { code: 'ITU', name: 'Ituri', type: 'province',
        cities: [
          { code: 'BUN', name: 'Bunia' },
          { code: 'ARI', name: 'Aru' },
          { code: 'BEN', name: 'Beni' },
          { code: 'KOM', name: 'Komanda' },
          { code: 'MAH', name: 'Mahagi' }
        ]
      },
      { code: 'KAS', name: 'Kasaï', type: 'province',
        cities: [
          { code: 'LUK', name: 'Lubumbashi' },
          { code: 'KOL', name: 'Kolwezi' },
          { code: 'LIK', name: 'Likasi' },
          { code: 'KAS', name: 'Kasenga' },
          { code: 'KAM', name: 'Kamina' }
        ]
      },
      { code: 'KAS2', name: 'Kasaï-Oriental', type: 'province',
        cities: [
          { code: 'MBU', name: 'Mbuji-Mayi' },
          { code: 'BEN', name: 'Bena' },
          { code: 'KAM', name: 'Kamina' },
          { code: 'KAS', name: 'Kasongo' },
          { code: 'KIK', name: 'Kikwit' }
        ]
      },
      { code: 'LOM', name: 'Lomami', type: 'province',
        cities: [
          { code: 'KAN', name: 'Kananga' },
          { code: 'KAM', name: 'Kamina' },
          { code: 'KAB', name: 'Kabinda' },
          { code: 'KAS', name: 'Kasongo' },
          { code: 'KIK', name: 'Kikwit' }
        ]
      },
      { code: 'LOP', name: 'Lualaba', type: 'province',
        cities: [
          { code: 'KOL', name: 'Kolwezi' },
          { code: 'LIK', name: 'Likasi' },
          { code: 'KAS', name: 'Kasenga' },
          { code: 'KAM', name: 'Kamina' },
          { code: 'PUN', name: 'Pweto' }
        ]
      },
      { code: 'MAN', name: 'Maniema', type: 'province',
        cities: [
          { code: 'KIN', name: 'Kindu' },
          { code: 'KAL', name: 'Kalemie' },
          { code: 'KAS', name: 'Kasongo' },
          { code: 'KIK', name: 'Kikwit' },
          { code: 'KUN', name: 'Kungu' }
        ]
      },
      { code: 'MON', name: 'Mongala', type: 'province',
        cities: [
          { code: 'LIS', name: 'Lisala' },
          { code: 'BAM', name: 'Bamako' },
          { code: 'KIN', name: 'Kinshasa' },
          { code: 'BAND', name: 'Bandundu' },
          { code: 'BENI', name: 'Beni' }
        ]
      },
      { code: 'NOR', name: 'Nord-Kivu', type: 'province',
        cities: [
          { code: 'GOM', name: 'Goma' },
          { code: 'BUT', name: 'Buta' },
          { code: 'BUN', name: 'Bunia' },
          { code: 'BEN', name: 'Beni' },
          { code: 'KOM', name: 'Komanda' }
        ]
      },
      { code: 'ORI', name: 'Orientale', type: 'province',
        cities: [
          { code: 'KIS', name: 'Kisangani' },
          { code: 'BUT', name: 'Buta' },
          { code: 'BUN', name: 'Bunia' },
          { code: 'BEN', name: 'Beni' },
          { code: 'KOM', name: 'Komanda' }
        ]
      },
      { code: 'SUD', name: 'Sud-Kivu', type: 'province',
        cities: [
          { code: 'KAM', name: 'Kamina' },
          { code: 'KAS', name: 'Kasongo' },
          { code: 'KIK', name: 'Kikwit' },
          { code: 'KUN', name: 'Kungu' },
          { code: 'MUSH', name: 'Mushie' }
        ]
      },
      { code: 'TAN', name: 'Tanganyika', type: 'province',
        cities: [
          { code: 'KAL', name: 'Kalemie' },
          { code: 'KAS', name: 'Kasongo' },
          { code: 'KIK', name: 'Kikwit' },
          { code: 'KUN', name: 'Kungu' },
          { code: 'MUSH', name: 'Mushie' }
        ]
      },
      { code: 'TSH', name: 'Tshopo', type: 'province',
        cities: [
          { code: 'KIS', name: 'Kisangani' },
          { code: 'BUT', name: 'Buta' },
          { code: 'BUN', name: 'Bunia' },
          { code: 'BEN', name: 'Beni' },
          { code: 'KOM', name: 'Komanda' }
        ]
      }
    ]
  };
