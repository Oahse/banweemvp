/**
 * Austria country data with states, cities, and tax information
 */

import { Country } from './index';

export const austria: Country = {
    code: 'AT',
    name: 'Austria',
    taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'EUR', region: 'EU' },
    provinces: [
      { code: 'W', name: 'Vienna',
        cities: [
          { code: 'VIE', name: 'Vienna' },
          { code: 'DONAU', name: 'Donau City' },
          { code: 'FLORID', name: 'Floridsdorf' },
          { code: 'DÖBLING', name: 'Döbling' },
          { code: 'HIRSCH', name: 'Hirschstetten' },
          { code: 'FAVORIT', name: 'Favoriten' },
          { code: 'SIMMER', name: 'Simmering' },
          { code: 'MEIDLING', name: 'Meidling' },
          { code: 'OTTAKR', name: 'Ottakring' },
          { code: 'LIESING', name: 'Liesing' }
        ]
      },
      { code: 'NÖ', name: 'Lower Austria',
        cities: [
          { code: 'STP', name: 'Sankt Pölten' },
          { code: 'KLOSTER', name: 'Klosterneuburg' },
          { code: 'BADEN', name: 'Baden' },
          { code: 'KREMS', name: 'Krems an der Donau' },
          { code: 'WIENER', name: 'Wiener Neustadt' },
          { code: 'AMSTET', name: 'Amstetten' },
          { code: 'MODLING', name: 'Mödling' },
          { code: 'TRAISK', name: 'Traiskirchen' },
          { code: 'SCHWECHAT', name: 'Schwechat' },
          { code: 'TULLN', name: 'Tulln an der Donau' }
        ]
      },
      { code: 'OÖ', name: 'Upper Austria',
        cities: [
          { code: 'LINZ', name: 'Linz' },
          { code: 'WELS', name: 'Wels' },
          { code: 'STEYR', name: 'Steyr' },
          { code: 'TRAUN', name: 'Traun' },
          { code: 'LEONDING', name: 'Leonding' },
          { code: 'VOCKLAB', name: 'Vöcklabruck' },
          { code: 'BRAUNAU', name: 'Braunau am Inn' },
          { code: 'SALENS', name: 'Salzburg' },
          { code: 'GMIUNDEN', name: 'Gmunden' },
          { code: 'FREIST', name: 'Freistadt' }
        ]
      },
      { code: 'SBG', name: 'Salzburg',
        cities: [
          { code: 'SALZ', name: 'Salzburg' },
          { code: 'HALLEIN', name: 'Hallein' },
          { code: 'SAALF', name: 'Saalfelden am Steinernen Meer' },
          { code: 'ZELL', name: 'Zell am See' },
          { code: 'BISCHOFS', name: 'Bischofshofen' },
          { code: 'STJOHANN', name: 'St. Johann im Pongau' },
          { code: 'MATTIGH', name: 'Mattighofen' },
          { code: 'OBERND', name: 'Oberndorf bei Salzburg' },
          { code: 'STRASS', name: 'Straßwalchen' },
          { code: 'TENNECK', name: 'Tenneck' }
        ]
      },
      { code: 'KTN', name: 'Carinthia',
        cities: [
          { code: 'KLAGEN', name: 'Klagenfurt' },
          { code: 'VILLACH', name: 'Villach' },
          { code: 'WOLFS', name: 'Wolfsberg' },
          { code: 'SPITTAL', name: 'Spittal an der Drau' },
          { code: 'FELDK', name: 'Feldkirchen' },
          { code: 'VÖLKERM', name: 'Völkermarkt' },
          { code: 'STVEIT', name: 'Sankt Veit an der Glan' },
          { code: 'HERMAG', name: 'Hermagor' },
          { code: 'DOBRATSCH', name: 'Dobratsch' },
          { code: 'FERLACH', name: 'Ferlach' }
        ]
      },
      { code: 'STMK', name: 'Styria',
        cities: [
          { code: 'GRAZ', name: 'Graz' },
          { code: 'LEOBEN', name: 'Leoben' },
          { code: 'KAPFEN', name: 'Kapfenberg' },
          { code: 'BRUCK', name: 'Bruck an der Mur' },
          { code: 'FÜRSTEN', name: 'Fürstenfeld' },
          { code: 'WEIZ', name: 'Weiz' },
          { code: 'MÜRZZUS', name: 'Mürzzuschlag' },
          { code: 'DEUTSCH', name: 'Deutschlandsberg' },
          { code: 'JUDENB', name: 'Judenburg' },
          { code: 'KÖFLACH', name: 'Köflach' }
        ]
      },
      { code: 'TIR', name: 'Tyrol',
        cities: [
          { code: 'INNSBR', name: 'Innsbruck' },
          { code: 'KUFSTEIN', name: 'Kufstein' },
          { code: 'TRENTO', name: 'Trento' },
          { code: 'SCHWAZ', name: 'Schwaz' },
          { code: 'HALL', name: 'Hall in Tirol' },
          { code: 'WORGL', name: 'Wörgl' },
          { code: 'LANDER', name: 'Landeck' },
          { code: 'REUTTE', name: 'Reutte' },
          { code: 'IMST', name: 'Imst' },
          { code: 'JENBACH', name: 'Jenbach' }
        ]
      },
      { code: 'VBG', name: 'Vorarlberg',
        cities: [
          { code: 'BREGENZ', name: 'Bregenz' },
          { code: 'DORNBIRN', name: 'Dornbirn' },
          { code: 'FELDK', name: 'Feldkirch' },
          { code: 'BLUDENZ', name: 'Bludenz' },
          { code: 'HÖCHST', name: 'Höchst' },
          { code: 'GÖTZIS', name: 'Götzis' },
          { code: 'ALTACH', name: 'Altach' },
          { code: 'LATERN', name: 'Laterns' },
          { code: 'SCHRUNS', name: 'Schruns' },
          { code: 'HARD', name: 'Hard' }
        ]
      },
      { code: 'BGLD', name: 'Burgenland',
        cities: [
          { code: 'EISENST', name: 'Eisenstadt' },
          { code: 'WAGRAM', name: 'Wagram' },
          { code: 'NEUSIEDL', name: 'Neusiedl am See' },
          { code: 'MATTERSB', name: 'Mattersburg' },
          { code: 'OBERWART', name: 'Oberwart' },
          { code: 'GÜSSING', name: 'Güssing' },
          { code: 'JENERSD', name: 'Jennersdorf' },
          { code: 'PINKAF', name: 'Pinkafeld' },
          { code: 'FREISTADT', name: 'Freistadt' },
          { code: 'ZWEIBR', name: 'Zweibrücken' }
        ]
      }
    ]
};
