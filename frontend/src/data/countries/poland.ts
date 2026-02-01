/**
 * Poland country data with voivodeships and cities
 */

import { Country } from './index';

export const poland: Country = {
  code: 'PL',
  name: 'Poland',
  flag: '🇵🇱',
  capital: 'Warsaw',
  area: 312696,
  currencySymbol: 'zł',
  officialLanguages: ['Polish'],
  demonym: 'Polish',
  taxInfo: { standardRate: 23, taxName: 'VAT', currency: 'PLN', region: 'EU' },
  divisions: [
    { code: 'MAZ', name: 'Masovian Voivodeship', type: 'voivodeship',
      cities: [
        { code: 'WARSAW', name: 'Warsaw' },
        { code: 'RADOM', name: 'Radom' },
        { code: 'PLOCK', name: 'Płock' },
        { code: 'SIEDLCE', name: 'Siedlce' },
        { code: 'OSTROLEKA', name: 'Ostrołęka' }
      ]
    },
    { code: 'KAT', name: 'Silesian Voivodeship', type: 'voivodeship',
      cities: [
        { code: 'KATOWICE', name: 'Katowice' },
        { code: 'GLIWICE', name: 'Gliwice' },
        { code: 'ZABRZE', name: 'Zabrze' },
        { code: 'BYTOM', name: 'Bytom' },
        { code: 'RUDA', name: 'Ruda Śląska' }
      ]
    },
    { code: 'DOL', name: 'Lower Silesian Voivodeship', type: 'voivodeship',
      cities: [
        { code: 'WROCLAW', name: 'Wrocław' },
        { code: 'WALBRZYCH', name: 'Wałbrzych' },
        { code: 'LEGNICA', name: 'Legnica' },
        { code: 'JELINIA', name: 'Jelenia Góra' },
        { code: 'LUBIN', name: 'Lubin' }
      ]
    },
    { code: 'LUB', name: 'Lublin Voivodeship', type: 'voivodeship',
      cities: [
        { code: 'LUBLIN', name: 'Lublin' },
        { code: 'CHELM', name: 'Chełm' },
        { code: 'ZAMOSC', name: 'Zamość' },
        { code: 'BIALYSTOK', name: 'Białystok' },
        { code: 'PUWAY', name: 'Puławy' }
      ]
    },
    { code: 'LUB', name: 'Lubusz Voivodeship', type: 'voivodeship',
      cities: [
        { code: 'GORZOW', name: 'Gorzów Wielkopolski' },
        { code: 'ZIELONA', name: 'Zielona Góra' },
        { code: 'NOWASOL', name: 'Nowa Sól' },
        { code: 'ZARY', name: 'Żary' },
        { code: 'SWIEBODZIN', name: 'Świebodzin' }
      ]
    },
    { code: 'LDZ', name: 'Łódź Voivodeship', type: 'voivodeship',
      cities: [
        { code: 'LODZ', name: 'Łódź' },
        { code: 'PABIANICE', name: 'Pabianice' },
        { code: 'TOMASZOW', name: 'Tomaszów Mazowiecki' },
        { code: 'BECHATOW', name: 'Bełchatów' },
        { code: 'ZGIERZ', name: 'Zgierz' }
      ]
    },
    { code: 'MAL', name: 'Lesser Poland Voivodeship', type: 'voivodeship',
      cities: [
        { code: 'KRAKOW', name: 'Kraków' },
        { code: 'TARNOW', name: 'Tarnów' },
        { code: 'NOWY', name: 'Nowy Sącz' },
        { code: 'NOWYTARG', name: 'Nowy Targ' },
        { code: 'MYSLNICE', name: 'Myślenice' }
      ]
    },
    { code: 'OPP', name: 'Opole Voivodeship', type: 'voivodeship',
      cities: [
        { code: 'OPOLE', name: 'Opole' },
        { code: 'KEDZIERZYN', name: 'Kędzierzyn-Koźle' },
        { code: 'NYSA', name: 'Nysa' },
        { code: 'BRZEG', name: 'Brzeg' },
        { code: 'KLUCZBORK', name: 'Kluczbork' }
      ]
    },
    { code: 'PKP', name: 'Subcarpathian Voivodeship', type: 'voivodeship',
      cities: [
        { code: 'RZESZOW', name: 'Rzeszów' },
        { code: 'PRZEMYSL', name: 'Przemyśl' },
        { code: 'KROSNO', name: 'Krosno' },
        { code: 'TARNOW', name: 'Tarnobrzeg' },
        { code: 'JAROSLAW', name: 'Jarosław' }
      ]
    },
    { code: 'POM', name: 'Pomeranian Voivodeship', type: 'voivodeship',
      cities: [
        { code: 'GDANSK', name: 'Gdańsk' },
        { code: 'GDYNIA', name: 'Gdynia' },
        { code: 'SLUPSK', name: 'Słupsk' },
        { code: 'STAROGARD', name: 'Starogard' },
        { code: 'WEJHEROWO', name: 'Wejherowo' }
      ]
    },
    { code: 'PDL', name: 'West Pomeranian Voivodeship', type: 'voivodeship',
      cities: [
        { code: 'SZCZECIN', name: 'Szczecin' },
        { code: 'KOSZALIN', name: 'Koszalin' },
        { code: 'STARGARD', name: 'Stargard' },
        { code: 'SWINOUIJSCIE', name: 'Świnoujście' },
        { code: 'KOLOBRZEG', name: 'Kołobrzeg' }
      ]
    },
    { code: 'WKP', name: 'Kuyavian-Pomeranian Voivodeship', type: 'voivodeship',
      cities: [
        { code: 'BYDGOSZCZ', name: 'Bydgoszcz' },
        { code: 'TORUN', name: 'Toruń' },
        { code: 'WLOCLAWEK', name: 'Włocławek' },
        { code: 'GRUDZIADZ', name: 'Grudziądz' },
        { code: 'INOWROCLAW', name: 'Inowrocław' }
      ]
    },
    { code: 'WMA', name: 'Greater Poland Voivodeship', type: 'voivodeship',
      cities: [
        { code: 'POZNAN', name: 'Poznań' },
        { code: 'KALISZ', name: 'Kalisz' },
        { code: 'LESZNO', name: 'Leszno' },
        { code: 'KONIN', name: 'Konin' },
        { code: 'GOSTYN', name: 'Gostyń' }
      ]
    },
    { code: 'PMZ', name: 'Warmian-Masurian Voivodeship', type: 'voivodeship',
      cities: [
        { code: 'OLSZTYN', name: 'Olsztyn' },
        { code: 'ELBLAG', name: 'Elbląg' },
        { code: 'EŁK', name: 'Ełk' },
        { code: 'KETRZYN', name: 'Kętrzyn' },
        { code: 'GIŻYCKO', name: 'Giżycko' }
      ]
    },
    { code: 'WPL', name: 'West Pomeranian Voivodeship', type: 'voivodeship',
      cities: [
        { code: 'SZCZECIN', name: 'Szczecin' },
        { code: 'KOSZALIN', name: 'Koszalin' },
        { code: 'STARGARD', name: 'Stargard' },
        { code: 'SWINOUIJSCIE', name: 'Świnoujście' },
        { code: 'KOLOBRZEG', name: 'Kołobrzeg' }
      ]
    },
    { code: 'LDS', name: 'Lublin Voivodeship', type: 'voivodeship',
      cities: [
        { code: 'LUBLIN', name: 'Lublin' },
        { code: 'CHELM', name: 'Chełm' },
        { code: 'ZAMOSC', name: 'Zamość' },
        { code: 'BIALYSTOK', name: 'Białystok' },
        { code: 'PUWAY', name: 'Puławy' }
      ]
    },
    { code: 'OPP', name: 'Opole Voivodeship', type: 'voivodeship',
      cities: [
        { code: 'OPOLE', name: 'Opole' },
        { code: 'KEDZIERZYN', name: 'Kędzierzyn-Koźle' },
        { code: 'NYSA', name: 'Nysa' },
        { code: 'BRZEG', name: 'Brzeg' },
        { code: 'KLUCZBORK', name: 'Kluczbork' }
      ]
    }
  ]
};
