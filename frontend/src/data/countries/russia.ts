/**
 * Russia country data with federal subjects, cities, and tax information
 */

import { Country } from './index';

export const russia: Country = {
    code: 'RU',
    name: 'Russia',
    taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'RUB', region: 'EU' },
    provinces: [
      { code: 'MOSCOW', name: 'Moscow',
        cities: [
          { code: 'MOSCOW', name: 'Moscow' },
          { code: 'SAINT', name: 'Saint Petersburg' },
          { code: 'NOVOSIBIRSK', name: 'Novosibirsk' },
          { code: 'YEKATERINBURG', name: 'Yekaterinburg' },
          { code: 'NIZHNY', name: 'Nizhny Novgorod' },
          { code: 'KAZAN', name: 'Kazan' },
          { code: 'CHELYABINSK', name: 'Chelyabinsk' },
          { code: 'OMSK', name: 'Omsk' },
          { code: 'SAMARA', name: 'Samara' },
          { code: 'ROSTOV', name: 'Rostov-on-Don' }
        ]
      },
      { code: 'SAINT', name: 'Saint Petersburg',
        cities: [
          { code: 'SAINT', name: 'Saint Petersburg' },
          { code: 'MOSCOW', name: 'Moscow' },
          { code: 'NOVOSIBIRSK', name: 'Novosibirsk' },
          { code: 'YEKATERINBURG', name: 'Yekaterinburg' },
          { code: 'NIZHNY', name: 'Nizhny Novgorod' },
          { code: 'KAZAN', name: 'Kazan' },
          { code: 'CHELYABINSK', name: 'Chelyabinsk' },
          { code: 'OMSK', name: 'Omsk' },
          { code: 'SAMARA', name: 'Samara' },
          { code: 'ROSTOV', name: 'Rostov-on-Don' }
        ]
      },
      { code: 'MOSCOW', name: 'Moscow Oblast',
        cities: [
          { code: 'MOSCOW', name: 'Moscow' },
          { code: 'Khimki', name: 'Khimki' },
          { code: 'Podolsk', name: 'Podolsk' },
          { code: 'Lyubertsy', name: 'Lyubertsy' },
          { code: 'Mytishchi', name: 'Mytishchi' },
          { code: 'Balashikha', name: 'Balashikha' },
          { code: 'Korolyov', name: 'Korolyov' },
          { code: 'Elektrostal', name: 'Elektrostal' },
          { code: 'Kolomna', name: 'Kolomna' },
          { code: 'Odintsovo', name: 'Odintsovo' }
        ]
      },
      { code: 'KRASNODAR', name: 'Krasnodar Krai',
        cities: [
          { code: 'KRASNODAR', name: 'Krasnodar' },
          { code: 'SOCHI', name: 'Sochi' },
          { code: 'NOVOROSSIYSK', name: 'Novorossiysk' },
          { code: 'STAVROPOL', name: 'Stavropol' },
          { code: 'PYATIGORSK', name: 'Pyatigorsk' },
          { code: 'ARMVIR', name: 'Armavir' },
          { code: 'YEYSK', name: 'Yeysk' },
          { code: 'ANAPA', name: 'Anapa' },
          { code: 'GELANDZHIK', name: 'Gelendzhik' },
          { code: 'TUAPSE', name: 'Tuapse' }
        ]
      },
      { code: 'SVERDLOVSK', name: 'Sverdlovsk Oblast',
        cities: [
          { code: 'YEKATERINBURG', name: 'Yekaterinburg' },
          { code: 'NIZHNY', name: 'Nizhny Tagil' },
          { code: 'KAMENSK', name: 'Kamensk-Uralsky' },
          { code: 'PERVOURALSK', name: 'Pervouralsk' },
          { code: 'SEROV', name: 'Sarov' },
          { code: 'VERKHNYAYA', name: 'Verkhnyaya Salda' },
          { code: 'IRBIT', name: 'Irbit' },
          { code: 'ASYA', name: 'Asya' },
          { code: 'KACHKANAR', name: 'Kachkanar' },
          { code: 'KUSHVA', name: 'Kushva' }
        ]
      },
      { code: 'TATARSTAN', name: 'Tatarstan',
        cities: [
          { code: 'KAZAN', name: 'Kazan' },
          { code: 'NABEREZHNYE', name: 'Naberezhnye Chelny' },
          { code: 'NIZHNEKAMSK', name: 'Nizhnekamsk' },
          { code: 'ALMETYEVSK', name: 'Almetyevsk' },
          { code: 'ZELONODOLSK', name: 'Zelenodolsk' },
          { code: 'BUGULMA', name: 'Bugulma' },
          { code: 'YELABUGA', name: 'Yelabuga' },
          { code: 'CHISTOPOL', name: 'Chistopol' },
          { code: 'MENZELINSK', name: 'Menzelinsk' },
          { code: 'BUINAK', name: 'Buinsk' }
        ]
      },
      { code: 'BASHKORTOSTAN', name: 'Bashkortostan',
        cities: [
          { code: 'UFA', name: 'Ufa' },
          { code: 'STERLITAMAK', name: 'Sterlitamak' },
          { code: 'SALAVAT', name: 'Salavat' },
          { code: 'NEFTEKAMSK', name: 'Neftekamsk' },
          { code: 'OCTOBER', name: 'October' },
          { code: 'KUMERTAU', name: 'Kumertau' },
          { code: 'BELORETSK', name: 'Beloretsk' },
          { code: 'SIBAY', name: 'Sibay' },
          { code: 'BAYMAK', name: 'Baimak' },
          { code: 'ISHIMBAY', name: 'Ishimbay' }
        ]
      },
      { code: 'CHelyabinsk', name: 'Chelyabinsk Oblast',
        cities: [
          { code: 'CHELYABINSK', name: 'Chelyabinsk' },
          { code: 'MAGNITOGORSK', name: 'Magnitogorsk' },
          { code: 'ZLATOUST', name: 'Zlatoust' },
          { code: 'MIASS', name: 'Miass' },
          { code: 'KOPEYSK', name: 'Kopeysk' },
          { code: 'KORKINO', name: 'Korkino' },
          { code: 'YUZHNO', name: 'Yuzhnouralsk' },
          { code: 'TROITSK', name: 'Troitsk' },
          { code: 'CHEBARKUL', name: 'Chebarkul' },
          { code: 'SATKA', name: 'Satka' }
        ]
      },
      { code: 'NOVOSIBIRSK', name: 'Novosibirsk Oblast',
        cities: [
          { code: 'NOVOSIBIRSK', name: 'Novosibirsk' },
          { code: 'BERDSK', name: 'Berdsk' },
          { code: 'ISKITIM', name: 'Iskitim' },
          { code: 'KUIBYSHEV', name: 'Kuybyshev' },
          { code: 'BARNAUL', name: 'Barnaul' },
          { code: 'BIYSK', name: 'Biysk' },
          { code: 'RUBTSOVSK', name: 'Rubtsovsk' },
          { code: 'SLAVGOROD', name: 'Slavgorod' },
          { code: 'ALEYSK', name: 'Aleysk' },
          { code: 'CAMERAL', name: 'Kameral' }
        ]
      },
      { code: 'SAMARA', name: 'Samara Oblast',
        cities: [
          { code: 'SAMARA', name: 'Samara' },
          { code: 'TOGLIATTI', name: 'Togliatti' },
          { code: 'SYZRAN', name: 'Syzran' },
          { code: 'NOVOKUIBYSHEVSK', name: 'Novokuibyshevsk' },
          { code: 'CHAPAEVSK', name: 'Chapayevsk' },
          { code: 'ZHIGULEVSK', name: 'Zhigulyovsk' },
          { code: 'OTRADNY', name: 'Otradny' },
          { code: 'KINEL', name: 'Kinel' },
          { code: 'POKHVISTNEVO', name: 'Pokhvistnevo' },
          { code: 'BEZENCHUK', name: 'Bezenchuk' }
        ]
      }
    ]
};
