/**
 * Uganda country data with districts, cities, and tax information
 */

import { Country } from './index';

export const uganda: Country = {
    code: 'UG',
    name: 'Uganda',
    taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'UGX', region: 'MEA' },
    provinces: [
      { code: 'KLA', name: 'Kampala',
        cities: [
          { code: 'KLA', name: 'Kampala' },
          { code: 'MAK', name: 'Makerere' },
          { code: 'KAW', name: 'Kawempe' },
          { code: 'NDE', name: 'Ndeeba' },
          { code: 'KIB', name: 'Kibuye' },
          { code: 'MUL', name: 'Mulago' },
          { code: 'NAN', name: 'Nansana' },
          { code: 'KIR', name: 'Kiruddu' },
          { code: 'LUW', name: 'Luwafu' },
          { code: 'KAT', name: 'Katwe' }
        ]
      },
      { code: 'CEN', name: 'Central',
        cities: [
          { code: 'ENT', name: 'Entebbe' },
          { code: 'MUB', name: 'Mubende' },
          { code: 'MAS', name: 'Masaka' },
          { code: 'LUW', name: 'Luwero' },
          { code: 'WAK', name: 'Wakiso' },
          { code: 'MPI', name: 'Mpigi' },
          { code: 'BUT', name: 'Butambala' },
          { code: 'GOM', name: 'Gomba' },
          { code: 'KAL', name: 'Kalangala' },
          { code: 'KYA', name: 'Kyankwanzi' }
        ]
      },
      { code: 'EAS', name: 'Eastern',
        cities: [
          { code: 'JIN', name: 'Jinja' },
          { code: 'MBA', name: 'Mbale' },
          { code: 'SOR', name: 'Soroti' },
          { code: 'KOT', name: 'Kotido' },
          { code: 'MOR', name: 'Moroto' },
          { code: 'NAM', name: 'Namutumba' },
          { code: 'BUT', name: 'Butaleja' },
          { code: 'BUD', name: 'Bududa' },
          { code: 'BUL', name: 'Bulambuli' },
          { code: 'KAP', name: 'Kapchorwa' }
        ]
      },
      { code: 'NOR', name: 'Northern',
        cities: [
          { code: 'GUL', name: 'Gulu' },
          { code: 'LIR', name: 'Lira' },
          { code: 'KIT', name: 'Kitgum' },
          { code: 'PAD', name: 'Pader' },
          { code: 'ARU', name: 'Arua' },
          { code: 'NEB', name: 'Nebbi' },
          { code: 'YUM', name: 'Yumbe' },
          { code: 'MAD', name: 'Madi' },
          { code: 'APO', name: 'Apac' },
          { code: 'DOK', name: 'Dokolo' }
        ]
      },
      { code: 'WES', name: 'Western',
        cities: [
          { code: 'MBA', name: 'Mbarara' },
          { code: 'KAB', name: 'Kabale' },
          { code: 'FORT', name: 'Fort Portal' },
          { code: 'HOIMA', name: 'Hoima' },
          { code: 'MAS', name: 'Masindi' },
          { code: 'RUK', name: 'Rukungiri' },
          { code: 'KASE', name: 'Kasese' },
          { code: 'KAM', name: 'Kamwenge' },
          { code: 'KYE', name: 'Kyegegwa' },
          { code: 'NTU', name: 'Ntungamo' }
        ]
      },
      { code: 'WES2', name: 'Western Nile',
        cities: [
          { code: 'ARU', name: 'Arua' },
          { code: 'NEB', name: 'Nebbi' },
          { code: 'PAK', name: 'Pakwach' },
          { code: 'MAR', name: 'Maracha' },
          { code: 'ZOM', name: 'Zombo' },
          { code: 'YUM', name: 'Yumbe' },
          { code: 'KOB', name: 'Koboko' },
          { code: 'MAD', name: 'Madi' },
          { code: 'OMO', name: 'Omoro' },
          { code: 'LAM', name: 'Lamwo' }
        ]
      },
      { code: 'NOR2', name: 'Northern Acholi',
        cities: [
          { code: 'GUL', name: 'Gulu' },
          { code: 'KIT', name: 'Kitgum' },
          { code: 'PAD', name: 'Pader' },
          { code: 'LAM', name: 'Lamwo' },
          { code: 'OMO', name: 'Omoro' },
          { code: 'AGA', name: 'Agago' },
          { code: 'NWA', name: 'Nwoya' },
          { code: 'AMU', name: 'Amuru' },
          { code: 'KIL', name: 'Kilak' },
          { code: 'JUB', name: 'Jubia' }
        ]
      },
      { code: 'EAS2', name: 'Eastern Busoga',
        cities: [
          { code: 'JIN', name: 'Jinja' },
          { code: 'IGA', name: 'Iganga' },
          { code: 'KAM', name: 'Kamuli' },
          { code: 'BUG', name: 'Bugiri' },
          { code: 'BUT', name: 'Butaleja' },
          { code: 'BUD', name: 'Bududa' },
          { code: 'BUL', name: 'Bulambuli' },
          { code: 'NAM', name: 'Namutumba' },
          { code: 'KIB', name: 'Kibuku' },
          { code: 'BUI', name: 'Buiwe' }
        ]
      },
      { code: 'EAS3', name: 'Eastern Bukedi',
        cities: [
          { code: 'MBA', name: 'Mbale' },
          { code: 'SOR', name: 'Soroti' },
          { code: 'KOT', name: 'Kotido' },
          { code: 'MOR', name: 'Moroto' },
          { code: 'NAP', name: 'Napak' },
          { code: 'NAM', name: 'Namisindwa' },
          { code: 'MAN', name: 'Manafwa' },
          { code: 'BUT', name: 'Butaleja' },
          { code: 'BUD', name: 'Bududa' },
          { code: 'BUL', name: 'Bulambuli' }
        ]
      },
      { code: 'WES3', name: 'Western Ankole',
        cities: [
          { code: 'MBA', name: 'Mbarara' },
          { code: 'RUK', name: 'Rukungiri' },
          { code: 'NTU', name: 'Ntungamo' },
          { code: 'MIT', name: 'Mitooma' },
          { code: 'RUB', name: 'Rubirizi' },
          { code: 'BWE', name: 'Bweyogerere' },
          { code: 'KIR', name: 'Kiruhura' },
          { code: 'IBA', name: 'Ibanda' },
          { code: 'KAM', name: 'Kamwenge' },
          { code: 'KYE', name: 'Kyegegwa' }
        ]
      },
      { code: 'WES4', name: 'Western Tooro',
        cities: [
          { code: 'FORT', name: 'Fort Portal' },
          { code: 'KAB', name: 'Kabale' },
          { code: 'KASE', name: 'Kasese' },
          { code: 'KAM', name: 'Kamwenge' },
          { code: 'KYE', name: 'Kyegegwa' },
          { code: 'BUN', name: 'Bunyangabu' },
          { code: 'KIT', name: 'Kitagwenda' },
          { code: 'KAM2', name: 'Kamwenge' },
          { code: 'KYE2', name: 'Kyegegwa' },
          { code: 'BUN2', name: 'Bunyangabu' }
        ]
      },
      { code: 'CEN2', name: 'Central Buganda',
        cities: [
          { code: 'ENT', name: 'Entebbe' },
          { code: 'WAK', name: 'Wakiso' },
          { code: 'MPI', name: 'Mpigi' },
          { code: 'BUT', name: 'Butambala' },
          { code: 'GOM', name: 'Gomba' },
          { code: 'LUW', name: 'Luwero' },
          { code: 'NAK', name: 'Nakaseke' },
          { code: 'NAK2', name: 'Nakasongola' },
          { code: 'MUB', name: 'Mubende' },
          { code: 'MUB2', name: 'Mityana' }
        ]
      },
      { code: 'CEN3', name: 'Central Bunyoro',
        cities: [
          { code: 'HOIMA', name: 'Hoima' },
          { code: 'MAS', name: 'Masindi' },
          { code: 'KIB', name: 'Kibale' },
          { code: 'KAG', name: 'Kagadi' },
          { code: 'KAK', name: 'Kakumiro' },
          { code: 'KYA', name: 'Kyaanya' },
          { code: 'BUG', name: 'Bugangaizi' },
          { code: 'BUN', name: 'Bunyoro' },
          { code: 'MAS2', name: 'Masindi' },
          { code: 'HOI', name: 'Hoima' }
        ]
      },
      { code: 'CEN4', name: 'Central Busoga',
        cities: [
          { code: 'JIN', name: 'Jinja' },
          { code: 'IGA', name: 'Iganga' },
          { code: 'KAM', name: 'Kamuli' },
          { code: 'BUG', name: 'Bugiri' },
          { code: 'BUT', name: 'Butaleja' },
          { code: 'BUD', name: 'Bududa' },
          { code: 'BUL', name: 'Bulambuli' },
          { code: 'NAM', name: 'Namutumba' },
          { code: 'KIB', name: 'Kibuku' },
          { code: 'BUI', name: 'Buiwe' }
        ]
      }
    ]
  };
