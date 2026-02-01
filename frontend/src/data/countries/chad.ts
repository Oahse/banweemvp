/**
 * Chad country data with regions and cities
 */

import { Country } from './index';

export const chad: Country = {
  code: 'TD',
  name: 'Chad',
  flag: '🇹🇩',
  capital: 'N\'Djamena',
  area: 1284000,
  currencySymbol: 'FCFA',
  officialLanguages: ['French', 'Arabic'],
  demonym: 'Chadian',
  taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'XAF', region: 'MEA' },
  divisions: [
    { code: 'NDJ', name: 'N\'Djamena', type: 'region',
      cities: [
        { code: 'NDJAMENA', name: 'N\'Djamena' },
        { code: 'MOUNDOU', name: 'Moundou' },
        { code: 'SARH', name: 'Sarh' },
        { code: 'ABECHE', name: 'Abéché' },
        { code: 'DOBA', name: 'Doba' }
      ]
    },
    { code: 'HAD', name: 'Hadjer-Lamis', type: 'region',
      cities: [
        { code: 'MASSAGUET', name: 'Massaguet' },
        { code: 'BOKORO', name: 'Bokoro' },
        { code: 'MASSAKORY', name: 'Massakory' },
        { code: 'BOKO', name: 'Boko' },
        { code: 'MASSAGUET', name: 'Massaguet' }
      ]
    },
    { code: 'MOU', name: 'Mandoul', type: 'region',
      cities: [
        { code: 'MOUNDOU', name: 'Moundou' },
        { code: 'KOUNDOUL', name: 'Koundoul' },
        { code: 'DOBA', name: 'Doba' },
        { code: 'BEGBE', name: 'Bébédjia' },
        { code: 'DOBA', name: 'Doba' }
      ]
    },
    { code: 'MOY', name: 'Moyen-Chari', type: 'region',
      cities: [
        { code: 'SARH', name: 'Sarh' },
        { code: 'DOBA', name: 'Doba' },
        { code: 'KOUSSERI', name: 'Kousséri' },
        { code: 'MOUNDOU', name: 'Moundou' },
        { code: 'ABECHE', name: 'Abéché' }
      ]
    },
    { code: 'GRA', name: 'Grand-Yaména', type: 'region',
      cities: [
        { code: 'DOBA', name: 'Doba' },
        { code: 'MOUNDOU', name: 'Moundou' },
        { code: 'SARH', name: 'Sarh' },
        { code: 'ABECHE', name: 'Abéché' },
        { code: 'DOBA', name: 'Doba' }
      ]
    },
    { code: 'TAN', name: 'Tandjilé', type: 'region',
      cities: [
        { code: 'LAI', name: 'Lai' },
        { code: 'KEMBEDJE', name: 'Kémbédjé' },
        { code: 'DOBA', name: 'Doba' },
        { code: 'MOUNDOU', name: 'Moundou' },
        { code: 'SARH', name: 'Sarh' }
      ]
    },
    { code: 'LOG', name: 'Logone Oriental', type: 'region',
      cities: [
        { code: 'DOBA', name: 'Doba' },
        { code: 'MOUNDOU', name: 'Moundou' },
        { code: 'SARH', name: 'Sarh' },
        { code: 'ABECHE', name: 'Abéché' },
        { code: 'DOBA', name: 'Doba' }
      ]
    },
    { code: 'LOG', name: 'Logone Occidental', type: 'region',
      cities: [
        { code: 'MOUNDOU', name: 'Moundou' },
        { code: 'DOBA', name: 'Doba' },
        { code: 'SARH', name: 'Sarh' },
        { code: 'ABECHE', name: 'Abéché' },
        { code: 'DOBA', name: 'Doba' }
      ]
    },
    { code: 'TIB', name: 'Tibesti', type: 'region',
      cities: [
        { code: 'FAYA', name: 'Faya-Largeau' },
        { code: 'BARDAI', name: 'Bardaï' },
        { code: 'ZOUAR', name: 'Zouar' },
        { code: 'AOZO', name: 'Aozou' },
        { code: 'YEBBI', name: 'Yebbi-Bou' }
      ]
    },
    { code: 'BET', name: 'Borkou', type: 'region',
      cities: [
        { code: 'FAYA', name: 'Faya-Largeau' },
        { code: 'BARDAI', name: 'Bardaï' },
        { code: 'ZOUAR', name: 'Zouar' },
        { code: 'AOZO', name: 'Aozou' },
        { code: 'YEBBI', name: 'Yebbi-Bou' }
      ]
    },
    { code: 'EN', name: 'Ennedi', type: 'region',
      cities: [
        { code: 'FADA', name: 'Fada' },
        { code: 'BILTINE', name: 'Biltine' },
        { code: 'OURDI', name: 'Ouri' },
        { code: 'KALAIT', name: 'Kalait' },
        { code: 'DJEMENA', name: 'Djémena' }
      ]
    },
    { code: 'WAD', name: 'Wadi Fira', type: 'region',
      cities: [
        { code: 'ABECHE', name: 'Abéché' },
        { code: 'BILTINE', name: 'Biltine' },
        { code: 'FADA', name: 'Fada' },
        { code: 'OURDI', name: 'Ouri' },
        { code: 'KALAIT', name: 'Kalait' }
      ]
    },
    { code: 'BAT', name: 'Batha', type: 'region',
      cities: [
        { code: 'ATI', name: 'Ati' },
        { code: 'OUM', name: 'Oum Hadjer' },
        { code: 'BILTINE', name: 'Biltine' },
        { code: 'ABECHE', name: 'Abéché' },
        { code: 'FADA', name: 'Fada' }
      ]
    },
    { code: 'GUE', name: 'Guéra', type: 'region',
      cities: [
        { code: 'MONGO', name: 'Mongo' },
        { code: 'BILTINE', name: 'Biltine' },
        { code: 'ABECHE', name: 'Abéché' },
        { code: 'FADA', name: 'Fada' },
        { code: 'OURDI', name: 'Ouri' }
      ]
    },
    { code: 'KAN', name: 'Kanem', type: 'region',
      cities: [
        { code: 'MAO', name: 'Mao' },
        { code: 'BILTINE', name: 'Biltine' },
        { code: 'ABECHE', name: 'Abéché' },
        { code: 'FADA', name: 'Fada' },
        { code: 'OURDI', name: 'Ouri' }
      ]
    },
    { code: 'BAR', name: 'Barh El Gazel', type: 'region',
      cities: [
        { code: 'MASSAGUET', name: 'Massaguet' },
        { code: 'BOKORO', name: 'Bokoro' },
        { code: 'MASSAKORY', name: 'Massakory' },
        { code: 'BOKO', name: 'Boko' },
        { code: 'MASSAGUET', name: 'Massaguet' }
      ]
    },
    { code: 'SIL', name: 'Sila', type: 'region',
      cities: [
        { code: 'GOZ', name: 'Goz Beïda' },
        { code: 'ABECHE', name: 'Abéché' },
        { code: 'BILTINE', name: 'Biltine' },
        { code: 'FADA', name: 'Fada' },
        { code: 'OURDI', name: 'Ouri' }
      ]
    },
    { code: 'SAL', name: 'Salamat', type: 'region',
      cities: [
        { code: 'AM', name: 'Am Timan' },
        { code: 'ABECHE', name: 'Abéché' },
        { code: 'BILTINE', name: 'Biltine' },
        { code: 'FADA', name: 'Fada' },
        { code: 'OURDI', name: 'Ouri' }
      ]
    },
    { code: 'LAC', name: 'Lac', type: 'region',
      cities: [
        { code: 'BOL', name: 'Bol' },
        { code: 'MASSAGUET', name: 'Massaguet' },
        { code: 'BOKORO', name: 'Bokoro' },
        { code: 'MASSAKORY', name: 'Massakory' },
        { code: 'BOKO', name: 'Boko' }
      ]
    }
  ]
};

export default chad;
