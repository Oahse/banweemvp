/**
 * Zambia country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const zambia: Country = {
    code: 'ZM',
    name: 'Zambia',
    taxInfo: { standardRate: 16, taxName: 'VAT', currency: 'ZMW', region: 'MEA' },
    provinces: [
      { code: 'CB', name: 'Central',
        cities: [
          { code: 'KAB', name: 'Kabwe' },
          { code: 'KAP', name: 'Kapiri Mposhi' },
          { code: 'SER', name: 'Serenje' },
          { code: 'MBU', name: 'Mumbwa' },
          { code: 'CHI', name: 'Chibombo' },
          { code: 'CHI2', name: 'Chisamba' },
          { code: 'LUS', name: 'Lusaka' },
          { code: 'MKA', name: 'Mkushi' },
          { code: 'MKA2', name: 'Mkushi' },
          { code: 'SIN', name: 'Sinda' }
        ]
      },
      { code: 'CP', name: 'Copperbelt',
        cities: [
          { code: 'KIT', name: 'Kitwe' },
          { code: 'NDO', name: 'Ndola' },
          { code: 'CHI', name: 'Chingola' },
          { code: 'MUF', name: 'Mufulira' },
          { code: 'LUA', name: 'Luanshya' },
          { code: 'KAN', name: 'Kansanshi' },
          { code: 'CHIL', name: 'Chililabombwe' },
          { code: 'KAL', name: 'Kalulushi' },
          { code: 'CHIL2', name: 'Chililabombwe' },
          { code: 'MUF2', name: 'Mufulira' }
        ]
      },
      { code: 'EP', name: 'Eastern',
        cities: [
          { code: 'CHIP', name: 'Chipata' },
          { code: 'KAT', name: 'Katete' },
          { code: 'LUN', name: 'Lundazi' },
          { code: 'PETA', name: 'Petauke' },
          { code: 'CHAM', name: 'Chama' },
          { code: 'MAM', name: 'Mambwe' },
          { code: 'NYM', name: 'Nyimba' },
          { code: 'SIND', name: 'Sinda' },
          { code: 'VUB', name: 'Vubwi' },
          { code: 'MWA', name: 'Mwami' }
        ]
      },
      { code: 'LP', name: 'Luapula',
        cities: [
          { code: 'MAN', name: 'Mansa' },
          { code: 'SAM', name: 'Samfya' },
          { code: 'KAW', name: 'Kawambwa' },
          { code: 'LUA', name: 'Luanshya' },
          { code: 'MIL', name: 'Milenge' },
          { code: 'MWA', name: 'Mwansabombwe' },
          { code: 'MWI', name: 'Mwinilunga' },
          { code: 'CHI', name: 'Chienge' },
          { code: 'KAP', name: 'Kaputa' },
          { code: 'LUN', name: 'Lunte' }
        ]
      },
      { code: 'LUS', name: 'Lusaka',
        cities: [
          { code: 'LUS', name: 'Lusaka' },
          { code: 'KAF', name: 'Kafue' },
          { code: 'CHON', name: 'Chongwe' },
          { code: 'KAB', name: 'Kabwe' },
          { code: 'RUF', name: 'Rufunsa' },
          { code: 'SHIB', name: 'Shibuyunji' },
          { code: 'SIN', name: 'Sinda' },
          { code: 'CHIL', name: 'Chilanga' },
          { code: 'KAP', name: 'Kapiri Mposhi' },
          { code: 'MKA', name: 'Mkushi' }
        ]
      },
      { code: 'NP', name: 'Northern',
        cities: [
          { code: 'KAS', name: 'Kasama' },
          { code: 'MBU', name: 'Mbala' },
          { code: 'MPO', name: 'Mporokoso' },
          { code: 'LUN', name: 'Lunte' },
          { code: 'LUN2', name: 'Luwingu' },
          { code: 'CHIL', name: 'Chilubi' },
          { code: 'KAP', name: 'Kaputa' },
          { code: 'MWA', name: 'Mwansabombwe' },
          { code: 'MWI', name: 'Mwinilunga' },
          { code: 'SOL', name: 'Solwezi' }
        ]
      },
      { code: 'NW', name: 'North-Western',
        cities: [
          { code: 'SOL', name: 'Solwezi' },
          { code: 'KAN', name: 'Kansanshi' },
          { code: 'KAL', name: 'Kalulushi' },
          { code: 'CHIL', name: 'Chililabombwe' },
          { code: 'MUF', name: 'Mufulira' },
          { code: 'KIT', name: 'Kitwe' },
          { code: 'NDO', name: 'Ndola' },
          { code: 'CHI', name: 'Chingola' },
          { code: 'LUA', name: 'Luanshya' },
          { code: 'KAN2', name: 'Kansanshi' }
        ]
      },
      { code: 'SP', name: 'Southern',
        cities: [
          { code: 'LIV', name: 'Livingstone' },
          { code: 'MON', name: 'Monze' },
          { code: 'MAZ', name: 'Mazabuka' },
          { code: 'CHOM', name: 'Choma' },
          { code: 'KAL', name: 'Kalomo' },
          { code: 'KAZ', name: 'Kazungula' },
          { code: 'SIN', name: 'Siavonga' },
          { code: 'GWE', name: 'Gwembe' },
          { code: 'IHL', name: 'Itezhi-Tezhi' },
          { code: 'NAM', name: 'Namwala' }
        ]
      },
      { code: 'WP', name: 'Western',
        cities: [
          { code: 'MONG', name: 'Mongu' },
          { code: 'SENF', name: 'Senanga' },
          { code: 'KAL', name: 'Kalabo' },
          { code: 'MWIN', name: 'Mwinilunga' },
          { code: 'KAB', name: 'Kabompo' },
          { code: 'MUM', name: 'Mumbwa' },
          { code: 'KAS', name: 'Kasempa' },
          { code: 'SOL', name: 'Solwezi' },
          { code: 'ZAM', name: 'Zambezi' },
          { code: 'MUSH', name: 'Mushindamo' }
        ]
      },
      { code: 'MUC', name: 'Muchinga',
        cities: [
          { code: 'CHI', name: 'Chinsali' },
          { code: 'MPI', name: 'Mpika' },
          { code: 'ISOK', name: 'Isoka' },
          { code: 'MKA', name: 'Mkushi' },
          { code: 'SHIB', name: 'Shibuyunji' },
          { code: 'LUN', name: 'Lunte' },
          { code: 'LUN2', name: 'Luwingu' },
          { code: 'CHAM', name: 'Chama' },
          { code: 'MAM', name: 'Mambwe' },
          { code: 'NYM', name: 'Nyimba' }
        ]
      }
    ]
  };
