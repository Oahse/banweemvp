/**
 * South Africa country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const southAfrica: Country = {
    code: 'ZA',
    name: 'South Africa',
    taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'ZAR', region: 'MEA' },
    provinces: [
      { code: 'GP', name: 'Gauteng',
        cities: [
          { code: 'JNB', name: 'Johannesburg' },
          { code: 'PTA', name: 'Pretoria' },
          { code: 'BEN', name: 'Benoni' },
          { code: 'BOK', name: 'Boksburg' },
          { code: 'GER', name: 'Germiston' },
          { code: 'KRUG', name: 'Krugersdorp' },
          { code: 'RAND', name: 'Randburg' },
          { code: 'ROOD', name: 'Roodepoort' },
          { code: 'SOW', name: 'Soweto' },
          { code: 'TEM', name: 'Tembisa' }
        ]
      },
      { code: 'WC', name: 'Western Cape',
        cities: [
          { code: 'CPT', name: 'Cape Town' },
          { code: 'STH', name: 'Stellenbosch' },
          { code: 'WOR', name: 'Worcester' },
          { code: 'PAAR', name: 'Paarl' },
          { code: 'SOM', name: 'Somerset West' },
          { code: 'BELL', name: 'Bellville' },
          { code: 'GEOR', name: 'George' },
          { code: 'MOS', name: 'Mossel Bay' },
          { code: 'HER', name: 'Hermanus' },
          { code: 'OUD', name: 'Oudtshoorn' }
        ]
      },
      { code: 'KZN', name: 'KwaZulu-Natal',
        cities: [
          { code: 'DBN', name: 'Durban' },
          { code: 'PMB', name: 'Pietermaritzburg' },
          { code: 'RICH', name: 'Richards Bay' },
          { code: 'NEW', name: 'Newcastle' },
          { code: 'PIN', name: 'Pinetown' },
          { code: 'UMHL', name: 'Umlazi' },
          { code: 'UMG', name: 'Umgungundlovu' },
          { code: 'KWA', name: 'KwaDukuza' },
          { code: 'MARG', name: 'Margate' },
          { code: 'LADY', name: 'Ladysmith' }
        ]
      },
      { code: 'EC', name: 'Eastern Cape',
        cities: [
          { code: 'PE', name: 'Port Elizabeth' },
          { code: 'EL', name: 'East London' },
          { code: 'BHISH', name: 'Bhisho' },
          { code: 'GRA', name: 'Graaff-Reinet' },
          { code: 'MTH', name: 'Mthatha' },
          { code: 'QUEEN', name: 'Queenstown' },
          { code: 'GRAH', name: 'Grahamstown' },
          { code: 'UIT', name: 'Uitenhage' },
          { code: 'CRAD', name: 'Cradock' },
          { code: 'ALI', name: 'Aliwal North' }
        ]
      },
      { code: 'MP', name: 'Mpumalanga',
        cities: [
          { code: 'NEL', name: 'Nelspruit' },
          { code: 'WIT', name: 'Witbank' },
          { code: 'SEC', name: 'Secunda' },
          { code: 'EMAL', name: 'Emalahleni' },
          { code: 'MBOM', name: 'Mbombela' },
          { code: 'MID', name: 'Middelburg' },
          { code: 'EHL', name: 'Ehlanzeni' },
          { code: 'GERT', name: 'Gert Sibande' },
          { code: 'NKAN', name: 'Nkangala' },
          { code: 'THO', name: 'Thohoyandou' }
        ]
      },
      { code: 'LP', name: 'Limpopo',
        cities: [
          { code: 'POL', name: 'Polokwane' },
          { code: 'TZA', name: 'Tzaneen' },
          { code: 'MOK', name: 'Mokopane' },
          { code: 'THO', name: 'Thohoyandou' },
          { code: 'MUS', name: 'Musina' },
          { code: 'BELA', name: 'Bela-Bela' },
          { code: 'MODI', name: 'Modimolle' },
          { code: 'MAKA', name: 'Makhado' },
          { code: 'LEB', name: 'Lebowakgomo' },
          { code: 'SEKH', name: 'Sekhukhune' }
        ]
      },
      { code: 'NW', name: 'North West',
        cities: [
          { code: 'KLER', name: 'Klerksdorp' },
          { code: 'MAFI', name: 'Mafikeng' },
          { code: 'RUST', name: 'Rustenburg' },
          { code: 'POT', name: 'Potchefstroom' },
          { code: 'TAUN', name: 'Taung' },
          { code: 'VRY', name: 'Vryburg' },
          { code: 'ZEER', name: 'Zeerust' },
          { code: 'LICHT', name: 'Lichtenburg' },
          { code: 'DEL', name: 'Delareyville' },
          { code: 'SWAN', name: 'Swanepoelsrus' }
        ]
      },
      { code: 'FS', name: 'Free State',
        cities: [
          { code: 'BLOEM', name: 'Bloemfontein' },
          { code: 'WEL', name: 'Welkom' },
          { code: 'BETH', name: 'Bethlehem' },
          { code: 'KROO', name: 'Kroonstad' },
          { code: 'SASO', name: 'Sasolburg' },
          { code: 'VIRG', name: 'Virginia' },
          { code: 'PARY', name: 'Parys' },
          { code: 'BRAND', name: 'Brandfort' },
          { code: 'THAB', name: 'Thaba Nchu' },
          { code: 'WEP', name: 'Wepener' }
        ]
      },
      { code: 'NC', name: 'Northern Cape',
        cities: [
          { code: 'KIM', name: 'Kimberley' },
          { code: 'UP', name: 'Upington' },
          { code: 'SPR', name: 'Springbok' },
          { code: 'KURU', name: 'Kuruman' },
          { code: 'KATH', name: 'Kathu' },
          { code: 'DEAR', name: 'De Aar' },
          { code: 'COLE', name: 'Colesberg' },
          { code: 'CALV', name: 'Calvinia' },
          { code: 'WAR', name: 'Warrenton' },
          { code: 'POST', name: 'Postmasburg' }
        ]
      }
    ]
  };
