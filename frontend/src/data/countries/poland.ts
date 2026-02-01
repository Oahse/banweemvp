/**
 * Poland country data with voivodeships, cities, and tax information
 */

import { Country } from './index';

export const poland: Country = {
    code: 'PL',
    name: 'Poland',
    taxInfo: { standardRate: 23, taxName: 'VAT', currency: 'PLN', region: 'EU' },
    provinces: [
      { code: 'MZ', name: 'Masovian',
        cities: [
          { code: 'WAW', name: 'Warsaw' },
          { code: 'RAD', name: 'Radom' },
          { code: 'PLO', name: 'Płock' },
          { code: 'SIE', name: 'Siedlce' },
          { code: 'OST', name: 'Ostrołęka' },
          { code: 'PRZ', name: 'Pruszków' },
          { code: 'LEG', name: 'Legionowo' },
          { code: 'WOO', name: 'Wołomin' },
          { code: 'MIŃ', name: 'Mińsk Mazowiecki' },
          { code: 'GRO', name: 'Grodzisk Mazowiecki' }
        ]
      },
      { code: 'KP', name: 'Kuyavian-Pomeranian',
        cities: [
          { code: 'BYD', name: 'Bydgoszcz' },
          { code: 'TOR', name: 'Toruń' },
          { code: 'WLO', name: 'Włocławek' },
          { code: 'GRU', name: 'Grudziądz' },
          { code: 'INW', name: 'Inowrocław' },
          { code: 'BRO', name: 'Brodnica' },
          { code: 'SWI', name: 'Świecie' },
          { code: 'WAB', name: 'Wąbrzeźno' },
          { code: 'CHE', name: 'Chełmno' },
          { code: 'GOL', name: 'Golub-Dobrzyń' }
        ]
      },
      { code: 'DS', name: 'Lesser Poland',
        cities: [
          { code: 'KRK', name: 'Kraków' },
          { code: 'TAR', name: 'Tarnów' },
          { code: 'NOW', name: 'Nowy Sącz' },
          { code: 'TAR2', name: 'Tarnów' },
          { code: 'NOW2', name: 'Nowy Targ' },
          { code: 'GOR', name: 'Gorlice' },
          { code: 'ZAK', name: 'Zakopane' },
          { code: 'LIM', name: 'Limanowa' },
          { code: 'MYŚ', name: 'Myślenice' },
          { code: 'BOCH', name: 'Bochnia' }
        ]
      },
      { code: 'SL', name: 'Silesian',
        cities: [
          { code: 'KAT', name: 'Katowice' },
          { code: 'CZE', name: 'Częstochowa' },
          { code: 'SOS', name: 'Sosnowiec' },
          { code: 'GLI', name: 'Gliwice' },
          { code: 'ZAB', name: 'Zabrze' },
          { code: 'BYT', name: 'Bytom' },
          { code: 'RYB', name: 'Rybnik' },
          { code: 'RUD', name: 'Ruda Śląska' },
          { code: 'DAB', name: 'Dąbrowa Górnicza' },
          { code: 'CHO', name: 'Chorzów' }
        ]
      },
      { code: 'LB', name: 'Lublin',
        cities: [
          { code: 'LUB', name: 'Lublin' },
          { code: 'CHE', name: 'Chełm' },
          { code: 'ZAM', name: 'Zamość' },
          { code: 'BIA', name: 'Biała Podlaska' },
          { code: 'PUL', name: 'Puławy' },
          { code: 'SWI', name: 'Świdnik' },
          { code: 'KRA', name: 'Krasnystaw' },
          { code: 'LUK', name: 'Łuków' },
          { code: 'BIĆ', name: 'Biłgoraj' },
          { code: 'PAR', name: 'Parczew' }
        ]
      },
      { code: 'PD', name: 'Subcarpathian',
        cities: [
          { code: 'RZE', name: 'Rzeszów' },
          { code: 'PRZ', name: 'Przemyśl' },
          { code: 'KRO', name: 'Krosno' },
          { code: 'TAR', name: 'Tarnobrzeg' },
          { code: 'MIE', name: 'Mielec' },
          { code: 'JAR', name: 'Jarosław' },
          { code: 'SAN', name: 'Sanok' },
          { code: 'DEB', name: 'Dębica' },
          { code: 'PRE', name: 'Przeworsk' },
          { code: 'LEŻ', name: 'Leżajsk' }
        ]
      },
      { code: 'LD', name: 'Lodz',
        cities: [
          { code: 'LOD', name: 'Łódź' },
          { code: 'PIE', name: 'Piotrków Trybunalski' },
          { code: 'PAB', name: 'Pabianice' },
          { code: 'TOM', name: 'Tomaszów Mazowiecki' },
          { code: 'BEŁ', name: 'Bełchatów' },
          { code: 'ZGI', name: 'Zgierz' },
          { code: 'RAD', name: 'Radomsko' },
          { code: 'SKA', name: 'Skierniewice' },
          { code: 'KUT', name: 'Kutno' },
          { code: 'ZDU', name: 'Zduńska Wola' }
        ]
      },
      { code: 'WP', name: 'West Pomeranian',
        cities: [
          { code: 'SZC', name: 'Szczecin' },
          { code: 'KOS', name: 'Koszalin' },
          { code: 'STG', name: 'Stargard' },
          { code: 'KOL', name: 'Kołobrzeg' },
          { code: 'ŚWI', name: 'Świnoujście' },
          { code: 'POL', name: 'Police' },
          { code: 'WAL', name: 'Wałcz' },
          { code: 'DRAW', name: 'Drawsko Pomorskie' },
          { code: 'ŁOB', name: 'Łobez' },
          { code: 'GOL', name: 'Goleniów' }
        ]
      },
      { code: 'PM', name: 'Pomeranian',
        cities: [
          { code: 'GDA', name: 'Gdańsk' },
          { code: 'GDY', name: 'Gdynia' },
          { code: 'SOP', name: 'Sopot' },
          { code: 'SLU', name: 'Słupsk' },
          { code: 'TCH', name: 'Tczew' },
          { code: 'STAR', name: 'Starogard Gdański' },
          { code: 'WEJ', name: 'Wejherowo' },
          { code: 'RUM', name: 'Rumia' },
          { code: 'KWI', name: 'Kwidzyn' },
          { code: 'MAL', name: 'Malbork' }
        ]
      },
      { code: 'WN', name: 'Warmian-Masurian',
        cities: [
          { code: 'OLS', name: 'Olsztyn' },
          { code: 'ELB', name: 'Elbląg' },
          { code: 'EŁK', name: 'Ełk' },
          { code: 'OST', name: 'Ostróda' },
          { code: 'ILA', name: 'Iława' },
          { code: 'GIŻ', name: 'Giżycko' },
          { code: 'KET', name: 'Kętrzyn' },
          { code: 'MRĄ', name: 'Mrągowo' },
          { code: 'BART', name: 'Bartoszyce' },
          { code: 'DZI', name: 'Działdowo' }
        ]
      },
      { code: 'LU', name: 'Lubusz',
        cities: [
          { code: 'GRE', name: 'Gorzów Wielkopolski' },
          { code: 'ZIE', name: 'Zielona Góra' },
          { code: 'NOW', name: 'Nowa Sól' },
          { code: 'ŻAR', name: 'Żary' },
          { code: 'ŻAG', name: 'Żagań' },
          { code: 'SUL', name: 'Sulechów' },
          { code: 'ŚWI', name: 'Świebodzin' },
          { code: 'KOS', name: 'Kostrzyn nad Odrą' },
          { code: 'MIĘ', name: 'Międzyrzecz' },
          { code: 'WSCH', name: 'Wschowa' }
        ]
      },
      { code: 'OP', name: 'Opole',
        cities: [
          { code: 'OPO', name: 'Opole' },
          { code: 'KED', name: 'Kędzierzyn-Koźle' },
          { code: 'NYS', name: 'Nysa' },
          { code: 'BRZ', name: 'Brzeg' },
          { code: 'KLĘ', name: 'Kluczbork' },
          { code: 'OLE', name: 'Olesno' },
          { code: 'STR', name: 'Strzelce Opolskie' },
          { code: 'KRA', name: 'Krapkowice' },
          { code: 'GŁO', name: 'Głogówek' },
          { code: 'PRU', name: 'Prudnik' }
        ]
      },
      { code: 'PK', name: 'Podlaskie',
        cities: [
          { code: 'BIA', name: 'Białystok' },
          { code: 'ŁOM', name: 'Łomża' },
          { code: 'SUA', name: 'Suwałki' },
          { code: 'GRA', name: 'Grajewo' },
          { code: 'WYS', name: 'Wysokie Mazowieckie' },
          { code: 'ZAM', name: 'Zambrów' },
          { code: 'BIA2', name: 'Bielsk Podlaski' },
          { code: 'HAJN', name: 'Hajnówka' },
          { code: 'AUG', name: 'Augustów' },
          { code: 'KOL', name: 'Kolno' }
        ]
      },
      { code: 'SK', name: 'Świętokrzyskie',
        cities: [
          { code: 'KIE', name: 'Kielce' },
          { code: 'RAD', name: 'Radom' },
          { code: 'OST', name: 'Ostrowiec Świętokrzyski' },
          { code: 'STAR', name: 'Starachowice' },
          { code: 'SKA', name: 'Skarżysko-Kamienna' },
          { code: 'BUS', name: 'Busko-Zdrój' },
          { code: 'JED', name: 'Jędrzejów' },
          { code: 'STO', name: 'Staszów' },
          { code: 'PIN', name: 'Pińczów' },
          { code: 'WLO', name: 'Włoszczowa' }
        ]
      },
      { code: 'LB', name: 'Lublin',
        cities: [
          { code: 'LUB', name: 'Lublin' },
          { code: 'CHE', name: 'Chełm' },
          { code: 'ZAM', name: 'Zamość' },
          { code: 'BIA', name: 'Biała Podlaska' },
          { code: 'PUL', name: 'Puławy' },
          { code: 'SWI', name: 'Świdnik' },
          { code: 'KRA', name: 'Krasnystaw' },
          { code: 'LUK', name: 'Łuków' },
          { code: 'BIĆ', name: 'Biłgoraj' },
          { code: 'PAR', name: 'Parczew' }
        ]
      },
      { code: 'PD', name: 'Subcarpathian',
        cities: [
          { code: 'RZE', name: 'Rzeszów' },
          { code: 'PRZ', name: 'Przemyśl' },
          { code: 'KRO', name: 'Krosno' },
          { code: 'TAR', name: 'Tarnobrzeg' },
          { code: 'MIE', name: 'Mielec' },
          { code: 'JAR', name: 'Jarosław' },
          { code: 'SAN', name: 'Sanok' },
          { code: 'DEB', name: 'Dębica' },
          { code: 'PRE', name: 'Przeworsk' },
          { code: 'LEŻ', name: 'Leżajsk' }
        ]
      }
    ]
};
