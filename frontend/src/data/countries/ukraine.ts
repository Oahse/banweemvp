/**
 * Ukraine country data with oblasts and cities
 */

import { Country } from './index';

export const ukraine: Country = {
  code: 'UA',
  name: 'Ukraine',
  flag: '🇺🇦',
  capital: 'Kyiv',
  area: 603500,
  currencySymbol: '₴',
  officialLanguages: ['Ukrainian'],
  demonym: 'Ukrainian',
  taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'UAH', region: 'EU' },
  divisions: [
    { code: 'KY', name: 'Kyiv', type: 'oblast',
      cities: [
        { code: 'KYIV', name: 'Kyiv' },
        { code: 'BORYSPIL', name: 'Boryspil' },
        { code: 'BROVARY', name: 'Brovary' },
        { code: 'OBUKHIV', name: 'Obukhiv' },
        { code: 'IRPIN', name: 'Irpin' }
      ]
    },
    { code: 'KH', name: 'Kharkiv', type: 'oblast',
      cities: [
        { code: 'KHARKIV', name: 'Kharkiv' },
        { code: 'SUMY', name: 'Sumy' },
        { code: 'KONOTOP', name: 'Konotop' },
        { code: 'CHUHUIV', name: 'Chuhuiv' },
        { code: 'IZIUM', name: 'Izyum' }
      ]
    },
    { code: 'OD', name: 'Odesa', type: 'oblast',
      cities: [
        { code: 'ODESA', name: 'Odesa' },
        { code: 'CHERKASY', name: 'Cherkasy' },
        { code: 'KROPYVNYTSKYI', name: 'Kropyvnytskyi' },
        { code: 'MYKOLAIV', name: 'Mykolaiv' },
        { code: 'ILICHIVSK', name: 'Ilichivsk' }
      ]
    },
    { code: 'DP', name: 'Dnipro', type: 'oblast',
      cities: [
        { code: 'DNIPRO', name: 'Dnipro' },
        { code: 'KRYVYIY', name: 'Kryvyi Rih' },
        { code: 'KAMIANSKE', name: 'Kamianske' },
        { code: 'NIKOPOL', name: 'Nikopol' },
        { code: 'NOVOMOSKOVSK', name: 'Novomoskovsk' }
      ]
    },
    { code: 'LV', name: 'Lviv', type: 'oblast',
      cities: [
        { code: 'LVIV', name: 'Lviv' },
        { code: 'DROHOBYCH', name: 'Drohobych' },
        { code: 'STRYI', name: 'Stryi' },
        { code: 'CHERVONOHRA', name: 'Chervonohrad' },
        { code: 'SAMBIR', name: 'Sambir' }
      ]
    },
    { code: 'ZP', name: 'Zaporizhzhia', type: 'oblast',
      cities: [
        { code: 'ZAPORIZHZHIA', name: 'Zaporizhzhia' },
        { code: 'MELITOPOL', name: 'Melitopol' },
        { code: 'BERDYANSK', name: 'Berdiansk' },
        { code: 'ENERHODAR', name: 'Enerhodar' },
        { code: 'POLTAVA', name: 'Poltava' }
      ]
    },
    { code: 'PL', name: 'Poltava', type: 'oblast',
      cities: [
        { code: 'POLTAVA', name: 'Poltava' },
        { code: 'KREMENCHUK', name: 'Kremenchuk' },
        { code: 'LUBNY', name: 'Lubny' },
        { code: 'HORISHNI', name: 'Horishni Plavni' },
        { code: 'MYRHO', name: 'Myrhorod' }
      ]
    },
    { code: 'IF', name: 'Ivano-Frankivsk', type: 'oblast',
      cities: [
        { code: 'IVANO-FRANKIVSK', name: 'Ivano-Frankivsk' },
        { code: 'KALUSH', name: 'Kalush' },
        { code: 'KOLYMYIA', name: 'Kolomyia' },
        { code: 'YAREMCHE', name: 'Yaremche' },
        { code: 'NADVIRNA', name: 'Nadvirna' }
      ]
    },
    { code: 'KT', name: 'Kirovohrad', type: 'oblast',
      cities: [
        { code: 'KIROVOHRAD', name: 'Kropyvnytskyi' },
        { code: 'ALEKSANDRIYA', name: 'Oleksandriya' },
        { code: 'ZLATOPIL', name: 'Zlatopil' },
        { code: 'BOBR', name: 'Bobryntsi' },
        { code: 'SNOVHORODKA', name: 'Snovhorodka' }
      ]
    },
    { code: 'CR', name: 'Chernivtsi', type: 'oblast',
      cities: [
        { code: 'CHERNIVTSI', name: 'Chernivtsi' },
        { code: 'KAMIANETS-PODILSKYI', name: 'Kamianets-Podilskyi' },
        { code: 'STOROZHYNETS', name: 'Storozhynets' },
        { code: 'NOVODNISTROVSK', name: 'Novodnistrovsk' },
        { code: 'VASHKIVTSI', name: 'Vashkivtsi' }
      ]
    },
    { code: 'TP', name: 'Ternopil', type: 'oblast',
      cities: [
        { code: 'TERNOPIL', name: 'Ternopil' },
        { code: 'CHORTKIV', name: 'Chortkiv' },
        { code: 'KREMENETS', name: 'Kremenets' },
        { code: 'BUCACH', name: 'Buchach' },
        { code: 'ZBARAZH', name: 'Zbarazh' }
      ]
    },
    { code: 'VO', name: 'Vinnytsia', type: 'oblast',
      cities: [
        { code: 'VINNYTSIA', name: 'Vinnytsia' },
        { code: 'ZHMERINKA', name: 'Zhmerinka' },
        { code: 'KHMILNYK', name: 'Khmilnyk' },
        { code: 'KOZATIN', name: 'Kozatin' },
        { code: 'ILLINTSI', name: 'Illintsi' }
      ]
    },
    { code: 'ZK', name: 'Zakarpattia', type: 'oblast',
      cities: [
        { code: 'UZHGOROD', name: 'Uzhhorod' },
        { code: 'MUKACHEVO', name: 'Mukachevo' },
        { code: 'BEREGOVO', name: 'Berehove' },
        { code: 'TYACHIV', name: 'Tachiv' },
        { code: 'IRSHAVA', name: 'Irshava' }
      ]
    },
    { code: 'RV', name: 'Rivne', type: 'oblast',
      cities: [
        { code: 'RIVNE', name: 'Rivne' },
        { code: 'LUUTSK', name: 'Lutsk' },
        { code: 'KOSTOPIL', name: 'Kostopil' },
        { code: 'DUBNO', name: 'Dubno' },
        { code: 'SARNY', name: 'Sarny' }
      ]
    },
    { code: 'ZH', name: 'Zhytomyr', type: 'oblast',
      cities: [
        { code: 'ZHYTOMYR', name: 'Zhytomyr' },
        { code: 'KOROSTEN', name: 'Korosten' },
        { code: 'NOVOHOROD-VOLYNSKYI', name: 'Novohrad-Volynskyi' },
        { code: 'SHEPETIVKA', name: 'Shepetivka' },
        { code: 'OVRUCH', name: 'Ovruch' }
      ]
    },
    { code: 'CH', name: 'Chernihiv', type: 'oblast',
      cities: [
        { code: 'CHERNIHIV', name: 'Chernihiv' },
        { code: 'NIZHYN', name: 'Nizhyn' },
        { code: 'PRYLUKY', name: 'Pryluky' },
        { code: 'NOVOHOROD-SIVERSKYI', name: 'Novhorod-Siverskyi' },
        { code: 'KORUKOV', name: 'Korukiv' }
      ]
    },
    { code: 'MY', name: 'Mykolaiv', type: 'oblast',
      cities: [
        { code: 'MYKOLAIV', name: 'Mykolaiv' },
        { code: 'VOZNESENSK', name: 'Voznesensk' },
        { code: 'PERVOMAISK', name: 'Pervomaisk' },
        { code: 'YUZHNOUKRAINSK', name: 'Yuzhnoukrainsk' },
        { code: 'BASHTANKA', name: 'Bashtanka' }
      ]
    },
    { code: 'KH', name: 'Kherson', type: 'oblast',
      cities: [
        { code: 'KHERSON', name: 'Kherson' },
        { code: 'HENICHESK', name: 'Henichesk' },
        { code: 'NOVOVOLOSYNSK', name: 'Novovolynsk' },
        { code: 'SKADOVSK', name: 'Skadovsk' },
        { code: 'OLESHKY', name: 'Oleshky' }
      ]
    },
    { code: 'LU', name: 'Luhansk', type: 'oblast',
      cities: [
        { code: 'LUHANSK', name: 'Luhansk' },
        { code: 'SIEVERODONETSK', name: 'Sievierodonetsk' },
        { code: 'ALCHEVSK', name: 'Alchevsk' },
        { code: 'RUBIZHNE', name: 'Rubizhne' },
        { code: 'KADIIVKA', name: 'Kadiivka' }
      ]
    },
    { code: 'DO', name: 'Donetsk', type: 'oblast',
      cities: [
        { code: 'DONETSK', name: 'Donetsk' },
        { code: 'MARIUPOL', name: 'Mariupol' },
        { code: 'MAKIIVKA', name: 'Makiivka' },
        { code: 'KRAMATORSK', name: 'Kramatorsk' },
        { code: 'SLOVIANSK', name: 'Sloviansk' }
      ]
    },
    { code: 'CR', name: 'Autonomous Republic of Crimea', type: 'autonomous republic',
      cities: [
        { code: 'SIMFEROPOL', name: 'Simferopol' },
        { code: 'SEVASTOPOL', name: 'Sevastopol' },
        { code: 'KERCH', name: 'Kerch' },
        { code: 'YALTA', name: 'Yalta' },
        { code: 'FEODOSIA', name: 'Feodosia' }
      ]
    }
  ]
};
