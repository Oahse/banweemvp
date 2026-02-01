/**
 * Israel country data with districts, cities, and tax information
 */

import { Country } from './index';

export const israel: Country = {
    code: 'IL',
    name: 'Israel',
    taxInfo: { standardRate: 17, taxName: 'VAT', currency: 'ILS', region: 'MEA' },
    provinces: [
      { code: 'TA', name: 'Tel Aviv District',
        cities: [
          { code: 'TELAVIV', name: 'Tel Aviv' },
          { code: 'RAMAT', name: 'Ramat Gan' },
          { code: 'HOLON', name: 'Holon' },
          { code: 'PETAH', name: 'Petah Tikva' },
          { code: 'BNEI', name: 'Bnei Brak' },
          { code: 'BAT', name: 'Bat Yam' },
          { code: 'RAMAT', name: 'Ramat HaSharon' },
          { code: 'HERZLIYA', name: 'Herzliya' },
          { code: 'KIRYAT', name: 'Kiryat Ono' },
          { code: 'OR', name: 'Or Yehuda' }
        ]
      },
      { code: 'JM', name: 'Jerusalem District',
        cities: [
          { code: 'JERUSALEM', name: 'Jerusalem' },
          { code: 'MEVASERET', name: 'Mevaseret Zion' },
          { code: 'BEIT', name: 'Beit Shemesh' },
          { code: 'MAALE', name: 'Maale Adumim' },
          { code: 'MODIIN', name: 'Modiin-Maccabim-Reut' },
          { code: 'KIRYAT', name: 'Kiryat Ye arim' },
          { code: 'ABU', name: 'Abu Ghosh' },
          { code: 'Tsur', name: 'Tsur Hadassah' },
          { code: 'Ein', name: 'Ein Kerem' },
          { code: 'Gilo', name: 'Gilo' }
        ]
      },
      { code: 'HA', name: 'Haifa District',
        cities: [
          { code: 'HAIFA', name: 'Haifa' },
          { code: 'KIRYAT', name: 'Kiryat Yam' },
          { code: 'KIRYAT', name: 'Kiryat Motzkin' },
          { code: 'KIRYAT', name: 'Kiryat Bialik' },
          { code: 'KIRYAT', name: 'Kiryat Ata' },
          { code: 'KIRYAT', name: 'Kiryat Tivon' },
          { code: 'TIRAT', name: 'Tirat Carmel' },
          { code: 'NEVE', name: 'Neve Yaraq' },
          { code: 'DALIAT', name: 'Daliat al-Carmel' },
          { code: 'ISFIYA', name: 'Isfiya' }
        ]
      },
      { code: 'ND', name: 'Northern District',
        cities: [
          { code: 'NAZARETH', name: 'Nazareth' },
          { code: 'NAZARETH', name: 'Nazareth Illit' },
          { code: 'AKKO', name: 'Acre' },
          { code: 'TIBERIAS', name: 'Tiberias' },
          { code: 'SAFED', name: 'Safed' },
          { code: 'KARMIEL', name: 'Karmiel' },
          { code: 'MAALOT', name: 'Maalot-Tarshiha' },
          { code: 'MIGDAL', name: 'Migdal HaEmek' },
          { code: 'KIRYAT', name: 'Kiryat Shmona' },
          { code: 'HADERA', name: 'Hadera' }
        ]
      },
      { code: 'SD', name: 'Southern District',
        cities: [
          { code: 'BEER', name: 'Beersheba' },
          { code: 'ASHDOD', name: 'Ashdod' },
          { code: 'ASHKELON', name: 'Ashkelon' },
          { code: 'EILAT', name: 'Eilat' },
          { code: 'NETIVOT', name: 'Netivot' },
          { code: 'DIMONA', name: 'Dimona' },
          { code: 'KIRYAT', name: 'Kiryat Gat' },
          { code: 'KIRYAT', name: 'Kiryat Malakhi' },
          { code: 'RAHAT', name: 'Rahat' },
          { code: 'ARAD', name: 'Arad' }
        ]
      },
      { code: 'CE', name: 'Central District',
        cities: [
          { code: 'RISHON', name: 'Rishon LeZion' },
          { code: 'ASHDOD', name: 'Ashdod' },
          { code: 'NETANYA', name: 'Netanya' },
          { code: 'HOD', name: 'Hod HaSharon' },
          { code: 'KFAR', name: 'Kfar Saba' },
          { code: 'RAANANA', name: "Ra'anana" },
          { code: 'HERZLIYA', name: 'Herzliya' },
          { code: 'RAMAT', name: 'Ramat Hasharon' },
          { code: 'REHOVOT', name: 'Rehovot' },
          { code: 'MODIIN', name: 'Modiin-Maccabim-Reut' }
        ]
      }
    ]
};
