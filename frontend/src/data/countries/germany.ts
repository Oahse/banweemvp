/**
 * Germany country data with states, cities, and tax information
 */

import { Country } from './index';

export const germany: Country = {
  code: 'DE',
  name: 'Germany',
  flag: '🇩🇪',
  capital: 'Berlin',
  area: 357022,
  currencySymbol: '€',
  officialLanguages: ['German'],
  demonym: 'German',
  taxInfo: { standardRate: 19, taxName: 'MwSt', currency: 'EUR', region: 'EU' },
  divisions: [
    { code: 'BW', name: 'Baden-Württemberg', type: 'state',
      cities: [
        { code: 'STU', name: 'Stuttgart' },
        { code: 'MAN', name: 'Mannheim' },
        { code: 'KAR', name: 'Karlsruhe' },
        { code: 'FRE', name: 'Freiburg' },
        { code: 'HEID', name: 'Heidelberg' }
      ]
    },
    { code: 'BY', name: 'Bavaria', type: 'state',
      cities: [
        { code: 'MUN', name: 'Munich' },
        { code: 'NUR', name: 'Nuremberg' },
        { code: 'AUG', name: 'Augsburg' },
        { code: 'WUR', name: 'Würzburg' },
        { code: 'REG', name: 'Regensburg' }
      ]
    },
    { code: 'BE', name: 'Berlin', type: 'state',
      cities: [
        { code: 'BER', name: 'Berlin' },
        { code: 'MIT', name: 'Mitte' },
        { code: 'KREU', name: 'Kreuzberg' },
        { code: 'CHAR', name: 'Charlottenburg' },
        { code: 'PREN', name: 'Prenzlauer Berg' }
      ]
    },
    { code: 'BR', name: 'Brandenburg', type: 'state',
      cities: [
        { code: 'POT', name: 'Potsdam' },
        { code: 'COTT', name: 'Cottbus' },
        { code: 'BRAN', name: 'Brandenburg' },
        { code: 'FRAN', name: 'Frankfurt (Oder)' },
        { code: 'EIBE', name: 'Eberswalde' }
      ]
    },
    { code: 'HB', name: 'Bremen', type: 'state',
      cities: [
        { code: 'BREM', name: 'Bremen' },
        { code: 'BREMHAV', name: 'Bremerhaven' },
        { code: 'OLD', name: 'Oldenburg' },
        { code: 'DEL', name: 'Delmenhorst' },
        { code: 'WIL', name: 'Wilhelmshaven' }
      ]
    },
    { code: 'HH', name: 'Hamburg', type: 'state',
      cities: [
        { code: 'HAM', name: 'Hamburg' },
        { code: 'ALTON', name: 'Altona' },
        { code: 'EPP', name: 'Eppendorf' },
        { code: 'HARB', name: 'Harburg' },
        { code: 'WAN', name: 'Wandsbek' }
      ]
    },
    { code: 'HE', name: 'Hesse', type: 'state',
      cities: [
        { code: 'WIE', name: 'Wiesbaden' },
        { code: 'FRANK', name: 'Frankfurt' },
        { code: 'KAS', name: 'Kassel' },
        { code: 'DAR', name: 'Darmstadt' },
        { code: 'MAIN', name: 'Mainz' }
      ]
    },
    { code: 'MV', name: 'Mecklenburg-Vorpommern', type: 'state',
      cities: [
        { code: 'SCHW', name: 'Schwerin' },
        { code: 'ROST', name: 'Rostock' },
        { code: 'NEUB', name: 'Neubrandenburg' },
        { code: 'GREIF', name: 'Greifswald' },
        { code: 'WARN', name: 'Warnemünde' }
      ]
    },
    { code: 'NI', name: 'Lower Saxony', type: 'state',
      cities: [
        { code: 'HAN', name: 'Hanover' },
        { code: 'BRAUN', name: 'Braunschweig' },
        { code: 'OSNA', name: 'Osnabrück' },
        { code: 'OLDEN', name: 'Oldenburg' },
        { code: 'WOLF', name: 'Wolfsburg' }
      ]
    },
    { code: 'NW', name: 'North Rhine-Westphalia', type: 'state',
      cities: [
        { code: 'DUS', name: 'Düsseldorf' },
        { code: 'COLOG', name: 'Cologne' },
        { code: 'DORT', name: 'Dortmund' },
        { code: 'ESSEN', name: 'Essen' },
        { code: 'BONN', name: 'Bonn' }
      ]
    },
    { code: 'RP', name: 'Rhineland-Palatinate', type: 'state',
      cities: [
        { code: 'MAINZ', name: 'Mainz' },
        { code: 'KOB', name: 'Koblenz' },
        { code: 'TRIER', name: 'Trier' },
        { code: 'KAIS', name: 'Kaiserslautern' },
        { code: 'LUDW', name: 'Ludwigshafen' }
      ]
    },
    { code: 'SL', name: 'Saarland', type: 'state',
      cities: [
        { code: 'SAAR', name: 'Saarbrücken' },
        { code: 'SANKT', name: 'Sankt Ingbert' },
        { code: 'NEU', name: 'Neunkirchen' },
        { code: 'SULZ', name: 'Sulzbach' },
        { code: 'VOLK', name: 'Völklingen' }
      ]
    },
    { code: 'SN', name: 'Saxony', type: 'state',
      cities: [
        { code: 'DRES', name: 'Dresden' },
        { code: 'LEIP', name: 'Leipzig' },
        { code: 'CHEM', name: 'Chemnitz' },
        { code: 'ZWI', name: 'Zwickau' },
        { code: 'PLAU', name: 'Plauen' }
      ]
    },
    { code: 'ST', name: 'Saxony-Anhalt', type: 'state',
      cities: [
        { code: 'MAGDE', name: 'Magdeburg' },
        { code: 'HALLE', name: 'Halle' },
        { code: 'DESS', name: 'Dessau' },
        { code: 'WIT', name: 'Wittenberg' },
        { code: 'STEN', name: 'Stendal' }
      ]
    },
    { code: 'SH', name: 'Schleswig-Holstein', type: 'state',
      cities: [
        { code: 'KIEL', name: 'Kiel' },
        { code: 'LUBE', name: 'Lübeck' },
        { code: 'FLANS', name: 'Flensburg' },
        { code: 'NEUM', name: 'Neumünster' },
        { code: 'NORD', name: 'Norderstedt' }
      ]
    },
    { code: 'TH', name: 'Thuringia', type: 'state',
      cities: [
        { code: 'ERFU', name: 'Erfurt' },
        { code: 'JENA', name: 'Jena' },
        { code: 'GERA', name: 'Gera' },
        { code: 'WEIM', name: 'Weimar' },
        { code: 'GOET', name: 'Gotha' }
      ]
    }
  ]
};

export default germany;
