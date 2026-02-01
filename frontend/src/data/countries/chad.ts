/**
 * Chad country data with regions, cities, and tax information
 */

import { Country } from './index';

export const chad: Country = {
    code: 'TD',
    name: 'Chad',
    taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'XAF', region: 'MEA' },
    provinces: [
      { code: 'BA', name: 'Batha',
        cities: [
          { code: 'ATI', name: 'Ati' },
          { code: 'OUM', name: 'Oum Hadjer' },
          { code: 'BOK', name: 'Bokoro' },
          { code: 'DAO', name: 'Dao' },
          { code: 'HAJ', name: 'Hadjer' },
          { code: 'HAJ2', name: 'Hadjer-Lamis' },
          { code: 'KAL', name: 'Kalam' },
          { code: 'KOU', name: 'Koumra' },
          { code: 'MAZ', name: 'Mazaya' },
          { code: 'NAM', name: 'Nam' }
        ]
      },
      { code: 'BO', name: 'Borkou',
        cities: [
          { code: 'FAY', name: 'Faya-Largeau' },
          { code: 'KOU', name: 'Kouba Olanga' },
          { code: 'OUR', name: 'Ourdi' },
          { code: 'YAO', name: 'Yao' },
          { code: 'BET', name: 'Bét' },
          { code: 'BIL', name: 'Bilala' },
          { code: 'DJED', name: 'Djedaa' },
          { code: 'KOU2', name: 'Kouba' },
          { code: 'OUR2', name: 'Ourdi' },
          { code: 'YAO2', name: 'Yao' }
        ]
      },
      { code: 'CH', name: 'Chari-Baguirmi',
        cities: [
          { code: 'NJA', name: 'N\'Djamena' },
          { code: 'MASS', name: 'Massaguet' },
          { code: 'BOK', name: 'Bokoro' },
          { code: 'DAO', name: 'Dao' },
          { code: 'DOU', name: 'Doum' },
          { code: 'KOU', name: 'Koumra' },
          { code: 'MASS2', name: 'Massaguet' },
          { code: 'BOK2', name: 'Bokoro' },
          { code: 'DAO2', name: 'Dao' },
          { code: 'DOU2', name: 'Doum' }
        ]
      },
      { code: 'EN', name: 'Ennedi',
        cities: [
          { code: 'FAD', name: 'Fada' },
          { code: 'OUR', name: 'Ourdi' },
          { code: 'YAO', name: 'Yao' },
          { code: 'BET', name: 'Bét' },
          { code: 'BIL', name: 'Bilala' },
          { code: 'DJED', name: 'Djedaa' },
          { code: 'KOU', name: 'Kouba' },
          { code: 'OUR2', name: 'Ourdi' },
          { code: 'YAO2', name: 'Yao' },
          { code: 'BET2', name: 'Bét' }
        ]
      },
      { code: 'GU', name: 'Guéra',
        cities: [
          { code: 'MONGO', name: 'Mongo' },
          { code: 'BAR', name: 'Barh Köh' },
          { code: 'BIT', name: 'Bitkine' },
          { code: 'ER', name: 'Eré' },
          { code: 'KOU', name: 'Koumra' },
          { code: 'MANG', name: 'Mangalme' },
          { code: 'MEL', name: 'Melfi' },
          { code: 'MOR', name: 'Mourdi' },
          { code: 'OUR', name: 'Ourdi' },
          { code: 'YAO', name: 'Yao' }
        ]
      },
      { code: 'HA', name: 'Hadjer-Lamis',
        cities: [
          { code: 'MAS', name: 'Massakory' },
          { code: 'BOL', name: 'Bol' },
          { code: 'DAO', name: 'Dao' },
          { code: 'DOU', name: 'Doum' },
          { code: 'KOU', name: 'Koumra' },
          { code: 'MASS', name: 'Massaguet' },
          { code: 'BOK', name: 'Bokoro' },
          { code: 'DAO2', name: 'Dao' },
          { code: 'DOU2', name: 'Doum' },
          { code: 'KOU2', name: 'Koumra' }
        ]
      },
      { code: 'KA', name: 'Kanem',
        cities: [
          { code: 'MAO', name: 'Mao' },
          { code: 'BOL', name: 'Bol' },
          { code: 'DAO', name: 'Dao' },
          { code: 'DOU', name: 'Doum' },
          { code: 'KOU', name: 'Koumra' },
          { code: 'MASS', name: 'Massaguet' },
          { code: 'BOK', name: 'Bokoro' },
          { code: 'DAO2', name: 'Dao' },
          { code: 'DOU2', name: 'Doum' },
          { code: 'KOU2', name: 'Koumra' }
        ]
      },
      { code: 'LA', name: 'Lac',
        cities: [
          { code: 'BOL', name: 'Bol' },
          { code: 'DAO', name: 'Dao' },
          { code: 'DOU', name: 'Doum' },
          { code: 'KOU', name: 'Koumra' },
          { code: 'MASS', name: 'Massaguet' },
          { code: 'BOK', name: 'Bokoro' },
          { code: 'DAO2', name: 'Dao' },
          { code: 'DOU2', name: 'Doum' },
          { code: 'KOU2', name: 'Koumra' },
          { code: 'MASS2', name: 'Massaguet' }
        ]
      },
      { code: 'LO', name: 'Logone Occidental',
        cities: [
          { code: 'MOUN', name: 'Moundou' },
          { code: 'BEN', name: 'Benoye' },
          { code: 'DOU', name: 'Doum' },
          { code: 'KOU', name: 'Koumra' },
          { code: 'MASS', name: 'Massaguet' },
          { code: 'BOK', name: 'Bokoro' },
          { code: 'DAO', name: 'Dao' },
          { code: 'DOU2', name: 'Doum' },
          { code: 'KOU2', name: 'Koumra' },
          { code: 'MASS2', name: 'Massaguet' }
        ]
      },
      { code: 'LR', name: 'Logone Oriental',
        cities: [
          { code: 'Doba', name: 'Doba' },
          { code: 'BEI', name: 'Beinamar' },
          { code: 'DOU', name: 'Doum' },
          { code: 'KOU', name: 'Koumra' },
          { code: 'MASS', name: 'Massaguet' },
          { code: 'BOK', name: 'Bokoro' },
          { code: 'DAO', name: 'Dao' },
          { code: 'DOU2', name: 'Doum' },
          { code: 'KOU2', name: 'Koumra' },
          { code: 'MASS2', name: 'Massaguet' }
        ]
      },
      { code: 'MA', name: 'Mandoul',
        cities: [
          { code: 'KOU', name: 'Koumra' },
          { code: 'DOU', name: 'Doum' },
          { code: 'MASS', name: 'Massaguet' },
          { code: 'BOK', name: 'Bokoro' },
          { code: 'DAO', name: 'Dao' },
          { code: 'DOU2', name: 'Doum' },
          { code: 'KOU2', name: 'Koumra' },
          { code: 'MASS2', name: 'Massaguet' },
          { code: 'BOK2', name: 'Bokoro' },
          { code: 'DAO2', name: 'Dao' }
        ]
      },
      { code: 'ME', name: 'Mayo-Kebbi Est',
        cities: [
          { code: 'BONG', name: 'Bongor' },
          { code: 'DOU', name: 'Doum' },
          { code: 'KOU', name: 'Koumra' },
          { code: 'MASS', name: 'Massaguet' },
          { code: 'BOK', name: 'Bokoro' },
          { code: 'DAO', name: 'Dao' },
          { code: 'DOU2', name: 'Doum' },
          { code: 'KOU2', name: 'Koumra' },
          { code: 'MASS2', name: 'Massaguet' },
          { code: 'BOK2', name: 'Bokoro' }
        ]
      },
      { code: 'MO', name: 'Mayo-Kebbi Ouest',
        cities: [
          { code: 'PAL', name: 'Pala' },
          { code: 'DOU', name: 'Doum' },
          { code: 'KOU', name: 'Koumra' },
          { code: 'MASS', name: 'Massaguet' },
          { code: 'BOK', name: 'Bokoro' },
          { code: 'DAO', name: 'Dao' },
          { code: 'DOU2', name: 'Doum' },
          { code: 'KOU2', name: 'Koumra' },
          { code: 'MASS2', name: 'Massaguet' },
          { code: 'BOK2', name: 'Bokoro' }
        ]
      },
      { code: 'MOY', name: 'Moyen-Chari',
        cities: [
          { code: 'SAR', name: 'Sarh' },
          { code: 'DOU', name: 'Doum' },
          { code: 'KOU', name: 'Koumra' },
          { code: 'MASS', name: 'Massaguet' },
          { code: 'BOK', name: 'Bokoro' },
          { code: 'DAO', name: 'Dao' },
          { code: 'DOU2', name: 'Doum' },
          { code: 'KOU2', name: 'Koumra' },
          { code: 'MASS2', name: 'Massaguet' },
          { code: 'BOK2', name: 'Bokoro' }
        ]
      },
      { code: 'OU', name: 'Ouaddaï',
        cities: [
          { code: 'ABE', name: 'Abéché' },
          { code: 'ADRE', name: 'Adré' },
          { code: 'AM', name: 'Am Dam' },
          { code: 'BIL', name: 'Bilala' },
          { code: 'DJED', name: 'Djedaa' },
          { code: 'KOU', name: 'Kouba' },
          { code: 'OUR', name: 'Ourdi' },
          { code: 'YAO', name: 'Yao' },
          { code: 'BET', name: 'Bét' },
          { code: 'BIL2', name: 'Bilala' }
        ]
      },
      { code: 'SA', name: 'Salamat',
        cities: [
          { code: 'AM', name: 'Am Timan' },
          { code: 'HAR', name: 'Haraze Mangueigne' },
          { code: 'DOU', name: 'Doum' },
          { code: 'KOU', name: 'Koumra' },
          { code: 'MASS', name: 'Massaguet' },
          { code: 'BOK', name: 'Bokoro' },
          { code: 'DAO', name: 'Dao' },
          { code: 'DOU2', name: 'Doum' },
          { code: 'KOU2', name: 'Koumra' },
          { code: 'MASS2', name: 'Massaguet' }
        ]
      },
      { code: 'SI', name: 'Sila',
        cities: [
          { code: 'GOZ', name: 'Goz Beïda' },
          { code: 'DOU', name: 'Doum' },
          { code: 'KOU', name: 'Koumra' },
          { code: 'MASS', name: 'Massaguet' },
          { code: 'BOK', name: 'Bokoro' },
          { code: 'DAO', name: 'Dao' },
          { code: 'DOU2', name: 'Doum' },
          { code: 'KOU2', name: 'Koumra' },
          { code: 'MASS2', name: 'Massaguet' },
          { code: 'BOK2', name: 'Bokoro' }
        ]
      },
      { code: 'TA', name: 'Tandjilé',
        cities: [
          { code: 'LAI', name: 'Lai' },
          { code: 'DOU', name: 'Doum' },
          { code: 'KOU', name: 'Koumra' },
          { code: 'MASS', name: 'Massaguet' },
          { code: 'BOK', name: 'Bokoro' },
          { code: 'DAO', name: 'Dao' },
          { code: 'DOU2', name: 'Doum' },
          { code: 'KOU2', name: 'Koumra' },
          { code: 'MASS2', name: 'Massaguet' },
          { code: 'BOK2', name: 'Bokoro' }
        ]
      },
      { code: 'TI', name: 'Tibesti',
        cities: [
          { code: 'BAR', name: 'Bardaï' },
          { code: 'AOU', name: 'Aouzou' },
          { code: 'EMI', name: 'Emi Koussi' },
          { code: 'YAO', name: 'Yao' },
          { code: 'BET', name: 'Bét' },
          { code: 'BIL', name: 'Bilala' },
          { code: 'DJED', name: 'Djedaa' },
          { code: 'KOU', name: 'Kouba' },
          { code: 'OUR', name: 'Ourdi' },
          { code: 'YAO2', name: 'Yao' }
        ]
      },
      { code: 'WI', name: 'Wadi Fira',
        cities: [
          { code: 'ABE', name: 'Abéché' },
          { code: 'ADRE', name: 'Adré' },
          { code: 'AM', name: 'Am Dam' },
          { code: 'BIL', name: 'Bilala' },
          { code: 'DJED', name: 'Djedaa' },
          { code: 'KOU', name: 'Kouba' },
          { code: 'OUR', name: 'Ourdi' },
          { code: 'YAO', name: 'Yao' },
          { code: 'BET', name: 'Bét' },
          { code: 'BIL2', name: 'Bilala' }
        ]
      }
    ]
  };
