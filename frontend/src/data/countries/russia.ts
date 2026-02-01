/**
 * Russia country data with federal subjects and cities
 */

import { Country } from './index';

export const russia: Country = {
  code: 'RU',
  name: 'Russia',
  flag: '🇷🇺',
  capital: 'Moscow',
  area: 17098246,
  currencySymbol: '₽',
  officialLanguages: ['Russian'],
  demonym: 'Russian',
  taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'RUB', region: 'EU' },
  divisions: [
    { code: 'MOW', name: 'Moscow', type: 'federal city',
      cities: [
        { code: 'MOSCOW', name: 'Moscow' },
        { code: 'KREMLIN', name: 'Kremlin' },
        { code: 'RED', name: 'Red Square' },
        { code: 'ARBAT', name: 'Arbat' },
        { code: 'TVER', name: 'Tverskaya' }
      ]
    },
    { code: 'SPB', name: 'Saint Petersburg', type: 'federal city',
      cities: [
        { code: 'SPETER', name: 'Saint Petersburg' },
        { code: 'HERMITAGE', name: 'Hermitage' },
        { code: 'NEVA', name: 'Nevsky' },
        { code: 'VASILEOST', name: 'Vasileostrovsky' },
        { code: 'PETRO', name: 'Petrogradsky' }
      ]
    },
    { code: 'KRA', name: 'Krasnodar Krai', type: 'krai',
      cities: [
        { code: 'KRASNODAR', name: 'Krasnodar' },
        { code: 'SOCHI', name: 'Sochi' },
        { code: 'NOVOROSSIYSK', name: 'Novorossiysk' },
        { code: 'ARMAN', name: 'Armavir' },
        { code: 'YEYSK', name: 'Yeysk' }
      ]
    },
    { code: 'PER', name: 'Perm Krai', type: 'krai',
      cities: [
        { code: 'PERM', name: 'Perm' },
        { code: 'BEREZNIKI', name: 'Berezniki' },
        { code: 'SOLIKAMSK', name: 'Solikamsk' },
        { code: 'CHUSOVSKOY', name: 'Chusovskoy' },
        { code: 'KUNGMUR', name: 'Kungmur' }
      ]
    },
    { code: 'KEM', name: 'Kemerovo Oblast', type: 'oblast',
      cities: [
        { code: 'KEMEROVO', name: 'Kemerovo' },
        { code: 'NOVOKUZNETSK', name: 'Novokuznetsk' },
        { code: 'PROKOPYEVS', name: 'Prokopyevsk' },
        { code: 'MEZHDURECH', name: 'Mezhdurechensk' },
        { code: 'LENINSK', name: 'Leninsk-Kuznetsky' }
      ]
    },
    { code: 'MOS', name: 'Moscow Oblast', type: 'oblast',
      cities: [
        { code: 'BALASHIKHA', name: 'Balashikha' },
        { code: 'PODKOL', name: 'Podolsk' },
        { code: 'KOROLEV', name: 'Korolev' },
        { code: 'MYTISHI', name: 'Mytishchi' },
        { code: 'LYUBERTSY', name: 'Lyubertsy' }
      ]
    },
    { code: 'NIZ', name: 'Nizhny Novgorod Oblast', type: 'oblast',
      cities: [
        { code: 'NNOVGOROD', name: 'Nizhny Novgorod' },
        { code: 'DZERZHINSK', name: 'Dzerzhinsk' },
        { code: 'ARZAMAS', name: 'Arzamas' },
        { code: 'SAROV', name: 'Sarov' },
        { code: 'PAVLOVO', name: 'Pavlovo' }
      ]
    },
    { code: 'SAM', name: 'Samara Oblast', type: 'oblast',
      cities: [
        { code: 'SAMARA', name: 'Samara' },
        { code: 'TOGLIATTI', name: 'Togliatti' },
        { code: 'SYZRAN', name: 'Syzran' },
        { code: 'NOVOKUIB', name: 'Novokuibyshevsk' },
        { code: 'CHAPA', name: 'Chapayevsk' }
      ]
    },
    { code: 'ROS', name: 'Rostov Oblast', type: 'oblast',
      cities: [
        { code: 'ROSTOV', name: 'Rostov-on-Don' },
        { code: 'TAGANROG', name: 'Taganrog' },
        { code: 'SHAKHTY', name: 'Shakhty' },
        { code: 'NOVOCHERKASSK', name: 'Novocherkassk' },
        { code: 'BATAYSK', name: 'Bataysk' }
      ]
    },
    { code: 'TAT', name: 'Tatarstan', type: 'republic',
      cities: [
        { code: 'KAZAN', name: 'Kazan' },
        { code: 'NABEREZHNYE', name: 'Naberezhnye Chelny' },
        { code: 'NIZHNEKAMSK', name: 'Nizhnekamsk' },
        { code: 'ALMET', name: 'Almetyevsk' },
        { code: 'ZEL', name: 'Zelenodolsk' }
      ]
    },
    { code: 'BA', name: 'Bashkortostan', type: 'republic',
      cities: [
        { code: 'UFA', name: 'Ufa' },
        { code: 'STERLITAMAK', name: 'Sterlitamak' },
        { code: 'SALAVAT', name: 'Salavat' },
        { code: 'NEFTEKAMSK', name: 'Neftekamsk' },
        { code: 'OKTYABR', name: 'Oktyabrsky' }
      ]
    },
    { code: 'CHE', name: 'Chechnya', type: 'republic',
      cities: [
        { code: 'GROZNY', name: 'Grozny' },
        { code: 'ARGUN', name: 'Argun' },
        { code: 'URIUP', name: 'Uriup' },
        { code: 'GUDERMES', name: 'Gudermes' },
        { code: 'SHALI', name: 'Shali' }
      ]
    },
    { code: 'DA', name: 'Dagestan', type: 'republic',
      cities: [
        { code: 'MAKHACHKALA', name: 'Makhachkala' },
        { code: 'DERBENT', name: 'Derbent' },
        { code: 'KASPIYSK', name: 'Kaspiysk' },
        { code: 'HASAVYURT', name: 'Hasavyurt' },
        { code: 'BUINAKSK', name: 'Buynaksk' }
      ]
    },
    { code: 'IRK', name: 'Irkutsk Oblast', type: 'oblast',
      cities: [
        { code: 'IRKUTSK', name: 'Irkutsk' },
        { code: 'BRATSK', name: 'Bratsk' },
        { code: 'USOLYE', name: 'Usolye-Sibirskoye' },
        { code: 'ANGARSK', name: 'Angarsk' },
        { code: 'CHEREM', name: 'Cheremkhovo' }
      ]
    },
    { code: 'SVE', name: 'Sverdlovsk Oblast', type: 'oblast',
      cities: [
        { code: 'YEKATERIN', name: 'Yekaterinburg' },
        { code: 'NIZHNY', name: 'Nizhny Tagil' },
        { code: 'KAMENSK', name: 'Kamensk-Uralsky' },
        { code: 'PERVOURAL', name: 'Pervouralsk' },
        { code: 'SEROV', name: 'Sarov' }
      ]
    },
    { code: 'CHL', name: 'Chelyabinsk Oblast', type: 'oblast',
      cities: [
        { code: 'CHELYABINSK', name: 'Chelyabinsk' },
        { code: 'MAGNITO', name: 'Magnitogorsk' },
        { code: 'ZLATOUST', name: 'Zlatoust' },
        { code: 'MIASS', name: 'Miass' },
        { code: 'KOPERSK', name: 'Kopersk' }
      ]
    },
    { code: 'TYU', name: 'Tyumen Oblast', type: 'oblast',
      cities: [
        { code: 'TYUMEN', name: 'Tyumen' },
        { code: 'TOBOLSK', name: 'Tobolsk' },
        { code: 'ISHIM', name: 'Ishim' },
        { code: 'YALUTOR', name: 'Yalutorovsk' },
        { code: 'ZAVODO', name: 'Zavodoukovsk' }
      ]
    },
    { code: 'KHAN', name: 'Khanty-Mansi Autonomous Okrug', type: 'autonomous okrug',
      cities: [
        { code: 'KHANTY', name: 'Khanty-Mansiysk' },
        { code: 'SURGUT', name: 'Surgut' },
        { code: 'NIZHNEVART', name: 'Nizhnevartovsk' },
        { code: 'NYAGAN', name: 'Nefteyugansk' },
        { code: 'PYT', name: 'Pyt-Yakh' }
      ]
    },
    { code: 'YAM', name: 'Yamalo-Nenets Autonomous Okrug', type: 'autonomous okrug',
      cities: [
        { code: 'SALEKHARD', name: 'Salekhard' },
        { code: 'NOVY', name: 'Novy Urengoy' },
        { code: 'NADYM', name: 'Nadym' },
        { code: 'NOYABRSK', name: 'Noyabrsk' },
        { code: 'MURAVLENKO', name: 'Muravlenko' }
      ]
    },
    { code: 'SAK', name: 'Sakha Republic', type: 'republic',
      cities: [
        { code: 'YAKUTSK', name: 'Yakutsk' },
        { code: 'MIRNY', name: 'Mirny' },
        { code: 'NERYUNGRI', name: 'Neryungri' },
        { code: 'OLEKMINSK', name: 'Olekminsk' },
        { code: 'TOMOT', name: 'Tomot' }
      ]
    },
    { code: 'PRI', name: 'Primorsky Krai', type: 'krai',
      cities: [
        { code: 'VLADIVOSTOK', name: 'Vladivostok' },
        { code: 'NAKHODKA', name: 'Nakhodka' },
        { code: 'USSURIYSK', name: 'Ussuriysk' },
        { code: 'ARTYOM', name: 'Artyom' },
        { code: 'SPASSK', name: 'Spassk-Dalny' }
      ]
    },
    { code: 'KHA', name: 'Khabarovsk Krai', type: 'krai',
      cities: [
        { code: 'KHABAROVSK', name: 'Khabarovsk' },
        { code: 'KOMSOMOL', name: 'Komsomolsk-on-Amur' },
        { code: 'AMURSK', name: 'Amursk' },
        { code: 'NIKOLAYEV', name: 'Nikolayevsk-on-Amur' },
        { code: 'BIR', name: 'Bir' }
      ]
    }
  ]
};
