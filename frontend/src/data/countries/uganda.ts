/**
 * Uganda country data with districts and cities
 */

import { Country } from './index';

export const uganda: Country = {
  code: 'UG',
  name: 'Uganda',
  flag: '🇺🇬',
  capital: 'Kampala',
  area: 241038,
  currencySymbol: 'USh',
  officialLanguages: ['English', 'Swahili'],
  demonym: 'Ugandan',
  taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'UGX', region: 'MEA' },
  divisions: [
    { code: 'KLA', name: 'Kampala', type: 'district',
      cities: [
        { code: 'KAMPALA', name: 'Kampala' },
        { code: 'MAKINDYE', name: 'Makindye' },
        { code: 'NAKAWA', name: 'Nakawa' },
        { code: 'LUBAGA', name: 'Lubaga' },
        { code: 'KAWEMPE', name: 'Kawempe' }
      ]
    },
    { code: 'JIN', name: 'Jinja', type: 'district',
      cities: [
        { code: 'JINJA', name: 'Jinja' },
        { code: 'KAMULI', name: 'Kamuli' },
        { code: 'BUGIRI', name: 'Bugiri' },
        { code: 'IGANGA', name: 'Igang' },
        { code: 'LUUKA', name: 'Luuka' }
      ]
    },
    { code: 'GUL', name: 'Gulu', type: 'district',
      cities: [
        { code: 'GULU', name: 'Gulu' },
        { code: 'LIRA', name: 'Lira' },
        { code: 'OMORO', name: 'Omoro' },
        { code: 'KITGUM', name: 'Kitgum' },
        { code: 'PADER', name: 'Pader' }
      ]
    },
    { code: 'MBR', name: 'Mbarara', type: 'district',
      cities: [
        { code: 'MBARARA', name: 'Mbarara' },
        { code: 'KABALE', name: 'Kabale' },
        { code: 'NTUNGAMO', name: 'Ntungamo' },
        { code: 'RUKUNGIRI', name: 'Rukungiri' },
        { code: 'KANUNGU', name: 'Kanungu' }
      ]
    },
    { code: 'EBB', name: 'Entebbe', type: 'district',
      cities: [
        { code: 'ENTEBBE', name: 'Entebbe' },
        { code: 'WAKISO', name: 'Wakiso' },
        { code: 'MPIGI', name: 'Mpigi' },
        { code: 'BUTAMBALA', name: 'Butambala' },
        { code: 'GOMBA', name: 'Gomba' }
      ]
    },
    { code: 'KAB', name: 'Kabale', type: 'district',
      cities: [
        { code: 'KABALE', name: 'Kabale' },
        { code: 'KISORO', name: 'Kisoro' },
        { code: 'KANUNGU', name: 'Kanungu' },
        { code: 'RUKUNGIRI', name: 'Rukungiri' },
        { code: 'RUBANDA', name: 'Rubanda' }
      ]
    },
    { code: 'FPT', name: 'Fort Portal', type: 'district',
      cities: [
        { code: 'FORT', name: 'Fort Portal' },
        { code: 'KYEJO', name: 'Kyejo' },
        { code: 'KAMWENGE', name: 'Kamwenge' },
        { code: 'KITAGWENDA', name: 'Kitagwenda' },
        { code: 'KASESE', name: 'Kasese' }
      ]
    },
    { code: 'MAS', name: 'Masaka', type: 'district',
      cities: [
        { code: 'MASAKA', name: 'Masaka' },
        { code: 'LYANTONDE', name: 'Lyantonde' },
        { code: 'RAKAI', name: 'Rakai' },
        { code: 'LWENGO', name: 'Lwengo' },
        { code: 'KALUNGU', name: 'Kalungu' }
      ]
    },
    { code: 'LIR', name: 'Lira', type: 'district',
      cities: [
        { code: 'LIRA', name: 'Lira' },
        { code: 'OTUKE', name: 'Otuke' },
        { code: 'ALEBTONG', name: 'Alebtong' },
        { code: 'DOKOLO', name: 'Dokolo' },
        { code: 'AMOLATAR', name: 'Amolatar' }
      ]
    },
    { code: 'ARU', name: 'Arua', type: 'district',
      cities: [
        { code: 'ARUA', name: 'Arua' },
        { code: 'MARACHA', name: 'Maracha' },
        { code: 'KOBOKO', name: 'Koboko' },
        { code: 'YUMBE', name: 'Yumbe' },
        { code: 'ADJUMANI', name: 'Adjumani' }
      ]
    },
    { code: 'MUB', name: 'Mubende', type: 'district',
      cities: [
        { code: 'MUBENDE', name: 'Mubende' },
        { code: 'KASSANDA', name: 'Kassanda' },
        { code: 'MITYANA', name: 'Mityana' },
        { code: 'KIBOGA', name: 'Kiboga' },
        { code: 'KYANKWANZI', name: 'Kyankwanzi' }
      ]
    },
    { code: 'MUK', name: 'Mukono', type: 'district',
      cities: [
        { code: 'MUKONO', name: 'Mukono' },
        { code: 'BUIKWE', name: 'Buikwe' },
        { code: 'BUIKWE', name: 'Buikwe' },
        { code: 'NANSANA', name: 'Nansana' },
        { code: 'KIRA', name: 'Kira' }
      ]
    },
    { code: 'RUK', name: 'Rukungiri', type: 'district',
      cities: [
        { code: 'RUKUNGIRI', name: 'Rukungiri' },
        { code: 'KANUNGU', name: 'Kanungu' },
        { code: 'MITOOMA', name: 'Mitooma' },
        { code: 'RUBANDA', name: 'Rubanda' },
        { code: 'SHEEMA', name: 'Sheema' }
      ]
    },
    { code: 'SOR', name: 'Soroti', type: 'district',
      cities: [
        { code: 'SOROTI', name: 'Soroti' },
        { code: 'SERERE', name: 'Serere' },
        { code: 'KABERAMAIDO', name: 'Kaberamaido' },
        { code: 'AMURIAT', name: 'Amuria' },
        { code: 'KATAKWI', name: 'Katakwi' }
      ]
    },
    { code: 'TOR', name: 'Tororo', type: 'district',
      cities: [
        { code: 'TORORO', name: 'Tororo' },
        { code: 'BUTALEJA', name: 'Butaleja' },
        { code: 'MANAFWA', name: 'Manafwa' },
        { code: 'BUDUDA', name: 'Bududa' },
        { code: 'BULAMBULI', name: 'Bulambuli' }
      ]
    },
    { code: 'HOI', name: 'Hoima', type: 'district',
      cities: [
        { code: 'HOIMA', name: 'Hoima' },
        { code: 'KIBAALE', name: 'Kibaale' },
        { code: 'KAGADI', name: 'Kagadi' },
        { code: 'KAKUMIRO', name: 'Kakumiro' },
        { code: 'MASINDI', name: 'Masindi' }
      ]
    },
    { code: 'MAS', name: 'Masindi', type: 'district',
      cities: [
        { code: 'MASINDI', name: 'Masindi' },
        { code: 'KIRYANDONGO', name: 'Kiryandongo' },
        { code: 'BULIISA', name: 'Buliisa' },
        { code: 'HOIMA', name: 'Hoima' },
        { code: 'PAKWANYI', name: 'Pakwanyi' }
      ]
    },
    { code: 'NWO', name: 'Nwoya', type: 'district',
      cities: [
        { code: 'NWOYA', name: 'Nwoya' },
        { code: 'AMURU', name: 'Amuru' },
        { code: 'GULU', name: 'Gulu' },
        { code: 'OMORO', name: 'Omoro' },
        { code: 'LAMWO', name: 'Lamwo' }
      ]
    },
    { code: 'NBS', name: 'Nebbi', type: 'district',
      cities: [
        { code: 'NEBBI', name: 'Nebbi' },
        { code: 'ZOMBO', name: 'Zombo' },
        { code: 'PAKWACH', name: 'Pakwach' },
        { code: 'ARUA', name: 'Arua' },
        { code: 'MARACHA', name: 'Maracha' }
      ]
    },
    { code: 'BUN', name: 'Bundibugyo', type: 'district',
      cities: [
        { code: 'BUNDIBUGYO', name: 'Bundibugyo' },
        { code: 'NTOROKO', name: 'Ntoroko' },
        { code: 'KASESE', name: 'Kasese' },
        { code: 'KAMWENGE', name: 'Kamwenge' },
        { code: 'KITAGWENDA', name: 'Kitagwenda' }
      ]
    },
    { code: 'NTU', name: 'Ntungamo', type: 'district',
      cities: [
        { code: 'NTUNGAMO', name: 'Ntungamo' },
        { code: 'RUBANDA', name: 'Rubanda' },
        { code: 'RUKUNGIRI', name: 'Rukungiri' },
        { code: 'MITOOMA', name: 'Mitooma' },
        { code: 'SHEEMA', name: 'Sheema' }
      ]
    },
    { code: 'LYA', name: 'Lyantonde', type: 'district',
      cities: [
        { code: 'LYANTONDE', name: 'Lyantonde' },
        { code: 'MASAKA', name: 'Masaka' },
        { code: 'RAKAI', name: 'Rakai' },
        { code: 'LWENGO', name: 'Lwengo' },
        { code: 'KALUNGU', name: 'Kalungu' }
      ]
    },
    { code: 'RAK', name: 'Rakai', type: 'district',
      cities: [
        { code: 'RAKAI', name: 'Rakai' },
        { code: 'LYANTONDE', name: 'Lyantonde' },
        { code: 'MASAKA', name: 'Masaka' },
        { code: 'LWENGO', name: 'Lwengo' },
        { code: 'KALUNGU', name: 'Kalungu' }
      ]
    },
    { code: 'KAL', name: 'Kalungu', type: 'district',
      cities: [
        { code: 'KALUNGU', name: 'Kalungu' },
        { code: 'MASAKA', name: 'Masaka' },
        { code: 'RAKAI', name: 'Rakai' },
        { code: 'LYANTONDE', name: 'Lyantonde' },
        { code: 'LWENGO', name: 'Lwengo' }
      ]
    },
    { code: 'BUK', name: 'Bukwo', type: 'district',
      cities: [
        { code: 'BUKWO', name: 'Bukwo' },
        { code: 'KAPCHORWA', name: 'Kapchorwa' },
        { code: 'KWEEN', name: 'Kween' },
        { code: 'SIRONKO', name: 'Sironko' },
        { code: 'BULAMBULI', name: 'Bulambuli' }
      ]
    },
    { code: 'KAP', name: 'Kapchorwa', type: 'district',
      cities: [
        { code: 'KAPCHORWA', name: 'Kapchorwa' },
        { code: 'KWEEN', name: 'Kween' },
        { code: 'BUKWO', name: 'Bukwo' },
        { code: 'SIRONKO', name: 'Sironko' },
        { code: 'BULAMBULI', name: 'Bulambuli' }
      ]
    },
    { code: 'KWE', name: 'Kween', type: 'district',
      cities: [
        { code: 'KWEEN', name: 'Kween' },
        { code: 'KAPCHORWA', name: 'Kapchorwa' },
        { code: 'BUKWO', name: 'Bukwo' },
        { code: 'SIRONKO', name: 'Sironko' },
        { code: 'BULAMBULI', name: 'Bulambuli' }
      ]
    },
    { code: 'SIR', name: 'Sironko', type: 'district',
      cities: [
        { code: 'SIRONKO', name: 'Sironko' },
        { code: 'BULAMBULI', name: 'Bulambuli' },
        { code: 'KAPCHORWA', name: 'Kapchorwa' },
        { code: 'KWEEN', name: 'Kween' },
        { code: 'BUKWO', name: 'Bukwo' }
      ]
    },
    { code: 'BUL', name: 'Bulambuli', type: 'district',
      cities: [
        { code: 'BULAMBULI', name: 'Bulambuli' },
        { code: 'SIRONKO', name: 'Sironko' },
        { code: 'KAPCHORWA', name: 'Kapchorwa' },
        { code: 'KWEEN', name: 'Kween' },
        { code: 'BUKWO', name: 'Bukwo' }
      ]
    },
    { code: 'NAP', name: 'Napak', type: 'district',
      cities: [
        { code: 'NAPAK', name: 'Napak' },
        { code: 'MOROTO', name: 'Moroto' },
        { code: 'NAKAPIRIPIRIT', name: 'Nakapiripirit' },
        { code: 'AMUDAT', name: 'Amudat' },
        { code: 'KOTIDO', name: 'Kotido' }
      ]
    },
    { code: 'MOR', name: 'Moroto', type: 'district',
      cities: [
        { code: 'MOROTO', name: 'Moroto' },
        { code: 'NAPAK', name: 'Napak' },
        { code: 'NAKAPIRIPIRIT', name: 'Nakapiripirit' },
        { code: 'AMUDAT', name: 'Amudat' },
        { code: 'KOTIDO', name: 'Kotido' }
      ]
    },
    { code: 'NAK', name: 'Nakapiripirit', type: 'district',
      cities: [
        { code: 'NAKAPIRIPIRIT', name: 'Nakapiripirit' },
        { code: 'MOROTO', name: 'Moroto' },
        { code: 'NAPAK', name: 'Napak' },
        { code: 'AMUDAT', name: 'Amudat' },
        { code: 'KOTIDO', name: 'Kotido' }
      ]
    },
    { code: 'AMU', name: 'Amudat', type: 'district',
      cities: [
        { code: 'AMUDAT', name: 'Amudat' },
        { code: 'NAKAPIRIPIRIT', name: 'Nakapiripirit' },
        { code: 'MOROTO', name: 'Moroto' },
        { code: 'NAPAK', name: 'Napak' },
        { code: 'KOTIDO', name: 'Kotido' }
      ]
    },
    { code: 'KOT', name: 'Kotido', type: 'district',
      cities: [
        { code: 'KOTIDO', name: 'Kotido' },
        { code: 'ABIM', name: 'Abim' },
        { code: 'KAABONG', name: 'Kaabong' },
        { code: 'MOROTO', name: 'Moroto' },
        { code: 'NAKAPIRIPIRIT', name: 'Nakapiripirit' }
      ]
    },
    { code: 'ABI', name: 'Abim', type: 'district',
      cities: [
        { code: 'ABIM', name: 'Abim' },
        { code: 'KOTIDO', name: 'Kotido' },
        { code: 'KAABONG', name: 'Kaabong' },
        { code: 'MOROTO', name: 'Moroto' },
        { code: 'NAKAPIRIPIRIT', name: 'Nakapiripirit' }
      ]
    },
    { code: 'KAA', name: 'Kaabong', type: 'district',
      cities: [
        { code: 'KAABONG', name: 'Kaabong' },
        { code: 'KOTIDO', name: 'Kotido' },
        { code: 'ABIM', name: 'Abim' },
        { code: 'MOROTO', name: 'Moroto' },
        { code: 'NAKAPIRIPIRIT', name: 'Nakapiripirit' }
      ]
    }
  ]
};

export default uganda;
