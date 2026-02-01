/**
 * Tanzania country data with regions, cities, and tax information
 */

import { Country } from './index';

export const tanzania: Country = {
    code: 'TZ',
    name: 'Tanzania',
    taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'TZS', region: 'MEA' },
    provinces: [
      { code: 'DAR', name: 'Dar es Salaam',
        cities: [
          { code: 'DAR', name: 'Dar es Salaam' },
          { code: 'KIN', name: 'Kinondoni' },
          { code: 'IL', name: 'Ilala' },
          { code: 'TEME', name: 'Temeke' },
          { code: 'UBUN', name: 'Ubungo' },
          { code: 'KIG', name: 'Kigamboni' },
          { code: 'MAK', name: 'Makumbusho' },
          { code: 'MAN', name: 'Manzese' },
          { code: 'TAB', name: 'Tabata' },
          { code: 'MZA', name: 'Mzimuni' }
        ]
      },
      { code: 'ARU', name: 'Arusha',
        cities: [
          { code: 'ARU', name: 'Arusha' },
          { code: 'MOS', name: 'Moshi' },
          { code: 'BABA', name: 'Babayaga' },
          { code: 'DUL', name: 'Duluti' },
          { code: 'KOR', name: 'Korongoni' },
          { code: 'MER', name: 'Meru' },
          { code: 'OLD', name: 'Oldonyo Sambu' },
          { code: 'USA', name: 'Usa River' },
          { code: 'TAN', name: 'Tengeru' },
          { code: 'SING', name: 'Singida' }
        ]
      },
      { code: 'KIL', name: 'Kilimanjaro',
        cities: [
          { code: 'MOS', name: 'Moshi' },
          { code: 'HAI', name: 'Hai' },
          { code: 'ROM', name: 'Rombo' },
          { code: 'SAME', name: 'Same' },
          { code: 'MWAN', name: 'Mwanga' },
          { code: 'KIL', name: 'Kilimanjaro' },
          { code: 'MAR', name: 'Marangu' },
          { code: 'KIB', name: 'Kibosho' },
          { code: 'URO', name: 'Uro' },
          { code: 'MOR', name: 'Morombo' }
        ]
      },
      { code: 'TAN', name: 'Tanga',
        cities: [
          { code: 'TAN', name: 'Tanga' },
          { code: 'KOR', name: 'Korogwe' },
          { code: 'HAND', name: 'Handeni' },
          { code: 'LUSH', name: 'Lushoto' },
          { code: 'PANG', name: 'Pangani' },
          { code: 'MKU', name: 'Mkuza' },
          { code: 'NDE', name: 'Nderemi' },
          { code: 'BOM', name: 'Bombo' },
          { code: 'MBO', name: 'Mbozi' },
          { code: 'KIL', name: 'Kilindi' }
        ]
      },
      { code: 'MOR', name: 'Morogoro',
        cities: [
          { code: 'MOR', name: 'Morogoro' },
          { code: 'MVI', name: 'Mvomero' },
          { code: 'KIL', name: 'Kilosa' },
          { code: 'ULU', name: 'Uluguru' },
          { code: 'MAL', name: 'Malinyi' },
          { code: 'UDO', name: 'Udongwa' },
          { code: 'MBE', name: 'Mbezi' },
          { code: 'KIS', name: 'Kisanga' },
          { code: 'MTE', name: 'Mtema' },
          { code: 'CHI', name: 'Chilulu' }
        ]
      },
      { code: 'PWANI', name: 'Pwani',
        cities: [
          { code: 'BAG', name: 'Bagamoyo' },
          { code: 'KIB', name: 'Kibaha' },
          { code: 'RUF', name: 'Rufiji' },
          { code: 'KIS', name: 'Kisarawe' },
          { code: 'MCH', name: 'Mchukwi' },
          { code: 'CHI', name: 'Chalinze' },
          { code: 'VIC', name: 'Victory' },
          { code: 'MBA', name: 'Mbeya' },
          { code: 'NCH', name: 'Nchanga' },
          { code: 'MWAN', name: 'Mwanza' }
        ]
      },
      { code: 'DOD', name: 'Dodoma',
        cities: [
          { code: 'DOD', name: 'Dodoma' },
          { code: 'KON', name: 'Kondoa' },
          { code: 'MPW', name: 'Mpwapwa' },
          { code: 'KON2', name: 'Kongwa' },
          { code: 'IBA', name: 'Ibambi' },
          { code: 'CHAM', name: 'Chamwino' },
          { code: 'BIA', name: 'Bahi' },
          { code: 'MTW', name: 'Mtwaro' },
          { code: 'NCH', name: 'Nchemba' },
          { code: 'BEN', name: 'Bena' }
        ]
      },
      { code: 'SING', name: 'Singida',
        cities: [
          { code: 'SING', name: 'Singida' },
          { code: 'MANY', name: 'Manyoni' },
          { code: 'IKUN', name: 'Ikungi' },
          { code: 'KIN', name: 'Kinampanda' },
          { code: 'MBO', name: 'Mbozi' },
          { code: 'KIS', name: 'Kisese' },
          { code: 'PUN', name: 'Puma' },
          { code: 'NDU', name: 'Nduga' },
          { code: 'MWI', name: 'Mwandiga' },
          { code: 'KIL', name: 'Kilimatinde' }
        ]
      },
      { code: 'TAB', name: 'Tabora',
        cities: [
          { code: 'TAB', name: 'Tabora' },
          { code: 'NZE', name: 'Nzega' },
          { code: 'IGU', name: 'Igunga' },
          { code: 'UJI', name: 'Ujiji' },
          { code: 'KAL', name: 'Kaliua' },
          { code: 'SIK', name: 'Sikonge' },
          { code: 'MBA', name: 'Mbeya' },
          { code: 'UWE', name: 'Urambo' },
          { code: 'MBO', name: 'Mbozi' },
          { code: 'KON', name: 'Kongwa' }
        ]
      },
      { code: 'RUK', name: 'Rukwa',
        cities: [
          { code: 'SUM', name: 'Sumbawanga' },
          { code: 'LAKE', name: 'Lake Tanganyika' },
          { code: 'NJE', name: 'Njelela' },
          { code: 'MBO', name: 'Mbozi' },
          { code: 'KAS', name: 'Kasanga' },
          { code: 'MUL', name: 'Muleba' },
          { code: 'KAL', name: 'Kalalangabo' },
          { code: 'NDU', name: 'Ndanda' },
          { code: 'MWI', name: 'Mwanga' },
          { code: 'KON', name: 'Kongwe' }
        ]
      },
      { code: 'KIG', name: 'Kigoma',
        cities: [
          { code: 'KIG', name: 'Kigoma' },
          { code: 'KAS', name: 'Kasulu' },
          { code: 'KIB', name: 'Kibondo' },
          { code: 'BAN', name: 'Buhigwe' },
          { code: 'KIB2', name: 'Kibondo' },
          { code: 'UJI', name: 'Ujiji' },
          { code: 'KAL', name: 'Kalambo' },
          { code: 'MWI', name: 'Mwanga' },
          { code: 'KON', name: 'Kongwe' },
          { code: 'NDU', name: 'Ndanda' }
        ]
      },
      { code: 'SHI', name: 'Shinyanga',
        cities: [
          { code: 'SHI', name: 'Shinyanga' },
          { code: 'KAH', name: 'Kahama' },
          { code: 'BAN', name: 'Bariadi' },
          { code: 'MAS', name: 'Maswa' },
          { code: 'MEAT', name: 'Meatu' },
          { code: 'MISU', name: 'Misungwi' },
          { code: 'KIS', name: 'Kishapu' },
          { code: 'NDU', name: 'Ndanda' },
          { code: 'MWI', name: 'Mwanga' },
          { code: 'KON', name: 'Kongwe' }
        ]
      },
      { code: 'KAG', name: 'Kagera',
        cities: [
          { code: 'BUK', name: 'Bukoba' },
          { code: 'MIS', name: 'Misenyi' },
          { code: 'NGA', name: 'Ngara' },
          { code: 'KAR', name: 'Karagwe' },
          { code: 'KYE', name: 'Kyerwa' },
          { code: 'MIS2', name: 'Missenyi' },
          { code: 'MUL', name: 'Muleba' },
          { code: 'BUN', name: 'Bunda' },
          { code: 'NDU', name: 'Ndanda' },
          { code: 'MWI', name: 'Mwanga' }
        ]
      },
      { code: 'MWA', name: 'Mwanza',
        cities: [
          { code: 'MWA', name: 'Mwanza' },
          { code: 'KIS', name: 'Kisesa' },
          { code: 'NGO', name: 'Ngudu' },
          { code: 'SUM', name: 'Sumve' },
          { code: 'MAG', name: 'Magu' },
          { code: 'KWI', name: 'Kwimba' },
          { code: 'GEI', name: 'Geita' },
          { code: 'NDU', name: 'Ndanda' },
          { code: 'MWI', name: 'Mwanga' },
          { code: 'KON', name: 'Kongwe' }
        ]
      },
      { code: 'MARA', name: 'Mara',
        cities: [
          { code: 'MUS', name: 'Musoma' },
          { code: 'SER', name: 'Serengeti' },
          { code: 'TAR', name: 'Tarime' },
          { code: 'BUN', name: 'Bunda' },
          { code: 'ROR', name: 'Rorya' },
          { code: 'NGO', name: 'Ngoreme' },
          { code: 'KIS', name: 'Kirumi' },
          { code: 'NDU', name: 'Ndanda' },
          { code: 'MWI', name: 'Mwanga' },
          { code: 'KON', name: 'Kongwe' }
        ]
      },
      { code: 'MAY', name: 'Manyara',
        cities: [
          { code: 'BAB', name: 'Babati' },
          { code: 'HAN', name: 'Hanang' },
          { code: 'MBO', name: 'Mbulu' },
          { code: 'SIM', name: 'Simanjiro' },
          { code: 'KON', name: 'Kongwa' },
          { code: 'NDU', name: 'Ndanda' },
          { code: 'MWI', name: 'Mwanga' },
          { code: 'KIS', name: 'Kisongo' },
          { code: 'MBO2', name: 'Mbozi' },
          { code: 'KON2', name: 'Kongwe' }
        ]
      },
      { code: 'NJO', name: 'Njombe',
        cities: [
          { code: 'NJO', name: 'Njombe' },
          { code: 'MAK', name: 'Makete' },
          { code: 'WAN', name: 'Wanging\'ombe' },
          { code: 'LUD', name: 'Ludewa' },
          { code: 'NDU', name: 'Ndanda' },
          { code: 'MWI', name: 'Mwanga' },
          { code: 'KON', name: 'Kongwe' },
          { code: 'KIS', name: 'Kisongo' },
          { code: 'MBO', name: 'Mbozi' },
          { code: 'KON2', name: 'Kongwe' }
        ]
      },
      { code: 'RUV', name: 'Ruvuma',
        cities: [
          { code: 'SON', name: 'Songea' },
          { code: 'MTE', name: 'Mtera' },
          { code: 'NDU', name: 'Ndanda' },
          { code: 'MWI', name: 'Mwanga' },
          { code: 'KON', name: 'Kongwe' },
          { code: 'KIS', name: 'Kisongo' },
          { code: 'MBO', name: 'Mbozi' },
          { code: 'KON2', name: 'Kongwe' },
          { code: 'NDU2', name: 'Ndanda' },
          { code: 'MWI2', name: 'Mwanga' }
        ]
      },
      { code: 'IRI', name: 'Iringa',
        cities: [
          { code: 'IRI', name: 'Iringa' },
          { code: 'MUF', name: 'Mufindi' },
          { code: 'NDU', name: 'Ndanda' },
          { code: 'MWI', name: 'Mwanga' },
          { code: 'KON', name: 'Kongwe' },
          { code: 'KIS', name: 'Kisongo' },
          { code: 'MBO', name: 'Mbozi' },
          { code: 'KON2', name: 'Kongwe' },
          { code: 'NDU2', name: 'Ndanda' },
          { code: 'MWI2', name: 'Mwanga' }
        ]
      },
      { code: 'LIND', name: 'Lindi',
        cities: [
          { code: 'LIND', name: 'Lindi' },
          { code: 'MTW', name: 'Mtwaro' },
          { code: 'NDU', name: 'Ndanda' },
          { code: 'MWI', name: 'Mwanga' },
          { code: 'KON', name: 'Kongwe' },
          { code: 'KIS', name: 'Kisongo' },
          { code: 'MBO', name: 'Mbozi' },
          { code: 'KON2', name: 'Kongwe' },
          { code: 'NDU2', name: 'Ndanda' },
          { code: 'MWI2', name: 'Mwanga' }
        ]
      },
      { code: 'MTW', name: 'Mtwara',
        cities: [
          { code: 'MTW', name: 'Mtwara' },
          { code: 'MAS', name: 'Masasi' },
          { code: 'NDU', name: 'Ndanda' },
          { code: 'MWI', name: 'Mwanga' },
          { code: 'KON', name: 'Kongwe' },
          { code: 'KIS', name: 'Kisongo' },
          { code: 'MBO', name: 'Mbozi' },
          { code: 'KON2', name: 'Kongwe' },
          { code: 'NDU2', name: 'Ndanda' },
          { code: 'MWI2', name: 'Mwanga' }
        ]
      }
    ]
  };
