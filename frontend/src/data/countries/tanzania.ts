/**
 * Tanzania country data with regions and cities
 */

import { Country } from './index';

export const tanzania: Country = {
  code: 'TZ',
  name: 'Tanzania',
  flag: '🇹🇿',
  capital: 'Dodoma',
  area: 947303,
  currencySymbol: 'TSh',
  officialLanguages: ['Swahili', 'English'],
  demonym: 'Tanzanian',
  taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'TZS', region: 'MEA' },
  divisions: [
    { code: 'DSM', name: 'Dar es Salaam', type: 'region',
      cities: [
        { code: 'DAR', name: 'Dar es Salaam' },
        { code: 'KINONDONI', name: 'Kinondoni' },
        { code: 'ILALA', name: 'Ilala' },
        { code: 'TEMEKE', name: 'Temeke' },
        { code: 'UBUNGO', name: 'Ubungo' }
      ]
    },
    { code: 'DOD', name: 'Dodoma', type: 'region',
      cities: [
        { code: 'DODOMA', name: 'Dodoma' },
        { code: 'KONDOA', name: 'Kondoa' },
        { code: 'MPWAPWA', name: 'Mpwapwa' },
        { code: 'KONGWA', name: 'Kongwa' },
        { code: 'CHAMWINO', name: 'Chamwino' }
      ]
    },
    { code: 'ARU', name: 'Arusha', type: 'region',
      cities: [
        { code: 'ARUSHA', name: 'Arusha' },
        { code: 'MOSHI', name: 'Moshi' },
        { code: 'MERU', name: 'Meru' },
        { code: 'LONGIDO', name: 'Longido' },
        { code: 'NJORONGORO', name: 'Ngorongoro' }
      ]
    },
    { code: 'KIL', name: 'Kilimanjaro', type: 'region',
      cities: [
        { code: 'MOSHI', name: 'Moshi' },
        { code: 'ROMBO', name: 'Rombo' },
        { code: 'HAI', name: 'Hai' },
        { code: 'SAME', name: 'Same' },
        { code: 'MWANGA', name: 'Mwanga' }
      ]
    },
    { code: 'TAN', name: 'Tanga', type: 'region',
      cities: [
        { code: 'TANGA', name: 'Tanga' },
        { code: 'MKAMBARANI', name: 'Mkambarani' },
        { code: 'PANGANI', name: 'Pangani' },
        { code: 'KOROGWE', name: 'Korogwe' },
        { code: 'HANDENI', name: 'Handeni' }
      ]
    },
    { code: 'MOR', name: 'Morogoro', type: 'region',
      cities: [
        { code: 'MOROGORO', name: 'Morogoro' },
        { code: 'KILosa', name: 'Kilosa' },
        { code: 'MVOOMERO', name: 'Mvomero' },
        { code: 'ULANGA', name: 'Ulanga' },
        { code: 'MALINYI', name: 'Malinyi' }
      ]
    },
    { code: 'PWANI', name: 'Pwani', type: 'region',
      cities: [
        { code: 'KIBAHA', name: 'Kibaha' },
        { code: 'BAGAMOYO', name: 'Bagamoyo' },
        { code: 'KISARAWE', name: 'Kisarawe' },
        { code: 'RUFIJI', name: 'Rufiji' },
        { code: 'MKURANGA', name: 'Mkuranga' }
      ]
    },
    { code: 'TAB', name: 'Tabora', type: 'region',
      cities: [
        { code: 'TABORA', name: 'Tabora' },
        { code: 'NZEGA', name: 'Nzega' },
        { code: 'IGUNGA', name: 'Igunga' },
        { code: 'SINGIDA', name: 'Singida' },
        { code: 'KALAMBA', name: 'Kalambo' }
      ]
    },
    { code: 'SING', name: 'Singida', type: 'region',
      cities: [
        { code: 'SINGIDA', name: 'Singida' },
        { code: 'MANYONI', name: 'Manyoni' },
        { code: 'IKUNGI', name: 'Ikungi' },
        { code: 'KITALA', name: 'Kitala' },
        { code: 'MWANYEMA', name: 'Mwanyema' }
      ]
    },
    { code: 'KIG', name: 'Kigoma', type: 'region',
      cities: [
        { code: 'KIGOMA', name: 'Kigoma' },
        { code: 'KASULU', name: 'Kasulu' },
        { code: 'KIBONDO', name: 'Kibondo' },
        { code: 'KIBUYE', name: 'Kibuye' },
        { code: 'KAKONKO', name: 'Kakonko' }
      ]
    },
    { code: 'SHI', name: 'Shinyanga', type: 'region',
      cities: [
        { code: 'SHINYANGA', name: 'Shinyanga' },
        { code: 'KAHAMA', name: 'Kahama' },
        { code: 'BUKOBA', name: 'Bukoba' },
        { code: 'GEITA', name: 'Geita' },
        { code: 'BIHARAMULO', name: 'Biharamulo' }
      ]
    },
    { code: 'KAG', name: 'Kagera', type: 'region',
      cities: [
        { code: 'BUKOB', name: 'Bukoba' },
        { code: 'BIHARAMULO', name: 'Biharamulo' },
        { code: 'NGARA', name: 'Ngara' },
        { code: 'KARAGWE', name: 'Karagwe' },
        { code: 'MISSSENYI', name: 'Missenyi' }
      ]
    },
    { code: 'MWA', name: 'Mwanza', type: 'region',
      cities: [
        { code: 'MWANZA', name: 'Mwanza' },
        { code: 'GEITA', name: 'Geita' },
        { code: 'SAWAN', name: 'Sawana' },
        { code: 'SUMBAWANGA', name: 'Sumbawanga' },
        { code: 'KAHAMA', name: 'Kahama' }
      ]
    },
    { code: 'MARA', name: 'Mara', type: 'region',
      cities: [
        { code: 'MUSOMA', name: 'Musoma' },
        { code: 'SERENGETI', name: 'Serengeti' },
        { code: 'TARIME', name: 'Tarime' },
        { code: 'BUNDA', name: 'Bunda' },
        { code: 'RORYA', name: 'Rorya' }
      ]
    },
    { code: 'MBE', name: 'Mbeya', type: 'region',
      cities: [
        { code: 'MBEYA', name: 'Mbeya' },
        { code: 'IRINGA', name: 'Iringa' },
        { code: 'SUMBAWANGA', name: 'Sumbawanga' },
        { code: 'CHUNYA', name: 'Chunya' },
        { code: 'KYE', name: 'Kye' }
      ]
    },
    { code: 'IRI', name: 'Iringa', type: 'region',
      cities: [
        { code: 'IRINGA', name: 'Iringa' },
        { code: 'MBEYA', name: 'Mbeya' },
        { code: 'NKOMA', name: 'Nkoma' },
        { code: 'MUFINDI', name: 'Mufindi' },
        { code: 'KILLOLA', name: 'Kilombero' }
      ]
    },
    { code: 'LIND', name: 'Lindi', type: 'region',
      cities: [
        { code: 'LINDI', name: 'Lindi' },
        { code: 'MTWARA', name: 'Mtwara' },
        { code: 'MASASI', name: 'Masasi' },
        { code: 'NAHINGA', name: 'Nachinga' },
        { code: 'RUANGWA', name: 'Ruangwa' }
      ]
    },
    { code: 'MTW', name: 'Mtwara', type: 'region',
      cities: [
        { code: 'MTWARA', name: 'Mtwara' },
        { code: 'LINDI', name: 'Lindi' },
        { code: 'MASASI', name: 'Masasi' },
        { code: 'NACHINGWEA', name: 'Nachingwea' },
        { code: 'TUNDURU', name: 'Tunduru' }
      ]
    },
    { code: 'RUV', name: 'Ruvuma', type: 'region',
      cities: [
        { code: 'SONGWEA', name: 'Songwea' },
        { code: 'TUNDURU', name: 'Tunduru' },
        { code: 'NAMTUMBO', name: 'Namtumbo' },
        { code: 'MADABA', name: 'Madaba' },
        { code: 'MPENDE', name: 'Mpende' }
      ]
    },
    { code: 'MANY', name: 'Manyara', type: 'region',
      cities: [
        { code: 'BABATI', name: 'Babati' },
        { code: 'HAI', name: 'Hai' },
        { code: 'SIMANJIRO', name: 'Simanjiro' },
        { code: 'KIBAHA', name: 'Kibaha' },
        { code: 'KILIMANJARO', name: 'Kilimanjaro' }
      ]
    },
    { code: 'NJE', name: 'Njombe', type: 'region',
      cities: [
        { code: 'NJOMBE', name: 'Njombe' },
        { code: 'MAKETE', name: 'Makete' },
        { code: 'WASINGA', name: 'Wasinga' },
        { code: 'LUDIBA', name: 'Ludiba' },
        { code: 'MBEYA', name: 'Mbeya' }
      ]
    },
    { code: 'KAT', name: 'Katavi', type: 'region',
      cities: [
        { code: 'MPANDA', name: 'Mpanda' },
        { code: 'MLELE', name: 'Mlele' },
        { code: 'MULEBA', name: 'Muleba' },
        { code: 'KASULU', name: 'Kasulu' },
        { code: 'KIBONDO', name: 'Kibondo' }
      ]
    },
    { code: 'GEI', name: 'Geita', type: 'region',
      cities: [
        { code: 'GEITA', name: 'Geita' },
        { code: 'CHATO', name: 'Chato' },
        { code: 'MBUYUNU', name: 'Mbuyunu' },
        { code: 'MWANZA', name: 'Mwanza' },
        { code: 'KAGERA', name: 'Kagera' }
      ]
    },
    { code: 'SIM', name: 'Simiyu', type: 'region',
      cities: [
        { code: 'BARIADI', name: 'Bariadi' },
        { code: 'MASWA', name: 'Maswa' },
        { code: 'MEATU', name: 'Meatu' },
        { code: 'ITILIMA', name: 'Itilima' },
        { code: 'BUSEGA', name: 'Busega' }
      ]
    },
    { code: 'SONG', name: 'Songwe', type: 'region',
      cities: [
        { code: 'SONGWEA', name: 'Songwea' },
        { code: 'MBEYA', name: 'Mbeya' },
        { code: 'CHUNYA', name: 'Chunya' },
        { code: 'MBOZI', name: 'Mbozi' },
        { code: 'ILEJE', name: 'Ileje' }
      ]
    }
  ]
};

export default tanzania;
