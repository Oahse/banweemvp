/**
 * Germany country data with states, cities, and tax information
 */

import { Country } from './index';

export const germany: Country = {
    code: 'DE',
    name: 'Germany',
    taxInfo: { standardRate: 19, taxName: 'VAT', currency: 'EUR', region: 'EU' },
    provinces: [
      { code: 'BW', name: 'Baden-Württemberg',
        cities: [
          { code: 'STU', name: 'Stuttgart' },
          { code: 'MANN', name: 'Mannheim' },
          { code: 'KARL', name: 'Karlsruhe' },
          { code: 'FREI', name: 'Freiburg im Breisgau' },
          { code: 'HEID', name: 'Heidelberg' },
          { code: 'ULM', name: 'Ulm' },
          { code: 'HEIL', name: 'Heilbronn' },
          { code: 'PFOR', name: 'Pforzheim' },
          { code: 'REUT', name: 'Reutlingen' },
          { code: 'AUGS', name: 'Augsburg' }
        ]
      },
      { code: 'BY', name: 'Bavaria',
        cities: [
          { code: 'MUC', name: 'Munich' },
          { code: 'NUR', name: 'Nuremberg' },
          { code: 'AUGS', name: 'Augsburg' },
          { code: 'WURZ', name: 'Würzburg' },
          { code: 'REGE', name: 'Regensburg' },
          { code: 'INGO', name: 'Ingolstadt' },
          { code: 'WURTH', name: 'Würth' },
          { code: 'ERLA', name: 'Erlangen' },
          { code: 'BAM', name: 'Bamberg' },
          { code: 'BAYR', name: 'Bayreuth' }
        ]
      },
      { code: 'BE', name: 'Berlin',
        cities: [
          { code: 'BER', name: 'Berlin' },
          { code: 'CHAR', name: 'Charlottenburg' },
          { code: 'KREU', name: 'Kreuzberg' },
          { code: 'NEUK', name: 'Neukölln' },
          { code: 'FRIE', name: 'Friedrichshain' },
          { code: 'PREN', name: 'Prenzlauer Berg' },
          { code: 'MITT', name: 'Mitte' },
          { code: 'SCHÖ', name: 'Schöneberg' },
          { code: 'TEMP', name: 'Tempelhof' },
          { code: 'TREP', name: 'Treptow' }
        ]
      },
      { code: 'BB', name: 'Brandenburg',
        cities: [
          { code: 'POTS', name: 'Potsdam' },
          { code: 'COTT', name: 'Cottbus' },
          { code: 'BRAN', name: 'Brandenburg an der Havel' },
          { code: 'FRAN', name: 'Frankfurt (Oder)' },
          { code: 'EIBE', name: 'Eberswalde' },
          { code: 'RAHN', name: 'Rahnsdorf' },
          { code: 'WITT', name: 'Wittenberge' },
          { code: 'NEUR', name: 'Neuruppin' },
          { code: 'SENFT', name: 'Senftenberg' },
          { code: 'LUCK', name: 'Lückenwalde' }
        ]
      },
      { code: 'HB', name: 'Bremen',
        cities: [
          { code: 'BREM', name: 'Bremen' },
          { code: 'BREMHAV', name: 'Bremerhaven' },
          { code: 'OLD', name: 'Oldenburg' },
          { code: 'DELME', name: 'Delmenhorst' },
          { code: 'WESER', name: 'Wesermünde' },
          { code: 'ROTEN', name: 'Rotenburg' },
          { code: 'VERD', name: 'Verden' },
          { code: 'ACHIM', name: 'Achim' },
          { code: 'DELF', name: 'Delitzsch' },
          { code: 'GAND', name: 'Ganderkesee' }
        ]
      },
      { code: 'HH', name: 'Hamburg',
        cities: [
          { code: 'HAM', name: 'Hamburg' },
          { code: 'ALTO', name: 'Altona' },
          { code: 'EPP', name: 'Eppendorf' },
          { code: 'HARBU', name: 'Harburg' },
          { code: 'WAND', name: 'Wandsbek' },
          { code: 'BERGE', name: 'Bergedorf' },
          { code: 'NORD', name: 'Norderstedt' },
          { code: 'AHLEN', name: 'Ahrensburg' },
          { code: 'PINN', name: 'Pinneberg' },
          { code: 'BUCH', name: 'Buchholz' }
        ]
      },
      { code: 'HE', name: 'Hesse',
        cities: [
          { code: 'FRA', name: 'Frankfurt am Main' },
          { code: 'WIES', name: 'Wiesbaden' },
          { code: 'KAS', name: 'Kassel' },
          { code: 'DARM', name: 'Darmstadt' },
          { code: 'OFFEN', name: 'Offenbach am Main' },
          { code: 'GIEN', name: 'Gießen' },
          { code: 'WETZ', name: 'Wetzlar' },
          { code: 'BAD', name: 'Bad Homburg' },
          { code: 'HANA', name: 'Hanau' },
          { code: 'FULD', name: 'Fulda' }
        ]
      },
      { code: 'MV', name: 'Mecklenburg-Vorpommern',
        cities: [
          { code: 'ROST', name: 'Rostock' },
          { code: 'SCHW', name: 'Schwerin' },
          { code: 'NEUB', name: 'Neubrandenburg' },
          { code: 'STRAL', name: 'Stralsund' },
          { code: 'GREIF', name: 'Greifswald' },
          { code: 'WISM', name: 'Wismar' },
          { code: 'GÜST', name: 'Güstrow' },
          { code: 'NEUS', name: 'Neustrelitz' },
          { code: 'WARN', name: 'Warnemünde' },
          { code: 'PUTT', name: 'Putbus' }
        ]
      },
      { code: 'NI', name: 'Lower Saxony',
        cities: [
          { code: 'HANO', name: 'Hanover' },
          { code: 'BRAU', name: 'Braunschweig' },
          { code: 'OSNA', name: 'Osnabrück' },
          { code: 'OLD', name: 'Oldenburg' },
          { code: 'WOLF', name: 'Wolfsburg' },
          { code: 'GÖT', name: 'Göttingen' },
          { code: 'EMDE', name: 'Emden' },
          { code: 'SALZ', name: 'Salzgitter' },
          { code: 'HIL', name: 'Hildesheim' },
          { code: 'WILH', name: 'Wilhelmshaven' }
        ]
      },
      { code: 'NW', name: 'North Rhine-Westphalia',
        cities: [
          { code: 'DUES', name: 'Düsseldorf' },
          { code: 'COL', name: 'Cologne' },
          { code: 'DORT', name: 'Dortmund' },
          { code: 'ESSEN', name: 'Essen' },
          { code: 'DUIS', name: 'Duisburg' },
          { code: 'BOCH', name: 'Bochum' },
          { code: 'WUPP', name: 'Wuppertal' },
          { code: 'BIELE', name: 'Bielefeld' },
          { code: 'BONN', name: 'Bonn' },
          { code: 'MÜN', name: 'Münster' }
        ]
      },
      { code: 'RP', name: 'Rhineland-Palatinate',
        cities: [
          { code: 'MAINZ', name: 'Mainz' },
          { code: 'KOB', name: 'Koblenz' },
          { code: 'TRIER', name: 'Trier' },
          { code: 'KAIS', name: 'Kaiserslautern' },
          { code: 'LUDW', name: 'Ludwigshafen' },
          { code: 'WORMS', name: 'Worms' },
          { code: 'NEUW', name: 'Neuwied' },
          { code: 'WEILO', name: 'Weilburg' },
          { code: 'SPEY', name: 'Speyer' },
          { code: 'BADK', name: 'Bad Kreuznach' }
        ]
      },
      { code: 'SL', name: 'Saarland',
        cities: [
          { code: 'SAARB', name: 'Saarbrücken' },
          { code: 'SANKT', name: 'Sankt Ingbert' },
          { code: 'SAA', name: 'Saarlouis' },
          { code: 'SULZ', name: 'Sulzbach' },
          { code: 'VÖLK', name: 'Völklingen' },
          { code: 'NEU', name: 'Neunkirchen' },
          { code: 'MERZ', name: 'Merzig' },
          { code: 'SANKT2', name: 'Sankt Wendel' },
          { code: 'DILL', name: 'Dillingen' },
          { code: 'LEB', name: 'Lebach' }
        ]
      },
      { code: 'SN', name: 'Saxony',
        cities: [
          { code: 'DRES', name: 'Dresden' },
          { code: 'LEIP', name: 'Leipzig' },
          { code: 'CHEM', name: 'Chemnitz' },
          { code: 'ZWI', name: 'Zwickau' },
          { code: 'PLAU', name: 'Plauen' },
          { code: 'GÖRL', name: 'Görlitz' },
          { code: 'FREI', name: 'Freiberg' },
          { code: 'BAUT', name: 'Bautzen' },
          { code: 'MEIS', name: 'Meißen' },
          { code: 'PIR', name: 'Pirna' }
        ]
      },
      { code: 'ST', name: 'Saxony-Anhalt',
        cities: [
          { code: 'MAGD', name: 'Magdeburg' },
          { code: 'HALLE', name: 'Halle (Saale)' },
          { code: 'DESS', name: 'Dessau-Roßlau' },
          { code: 'WITT', name: 'Wittenberg' },
          { code: 'HALB', name: 'Halberstadt' },
          { code: 'STEN', name: 'Stendal' },
          { code: 'SCHW', name: 'Schwerin' },
          { code: 'BURG', name: 'Burg' },
          { code: 'MERSE', name: 'Merseburg' },
          { code: 'NAUM', name: 'Naumburg' }
        ]
      },
      { code: 'SH', name: 'Schleswig-Holstein',
        cities: [
          { code: 'KIEL', name: 'Kiel' },
          { code: 'HAMB', name: 'Hamburg' },
          { code: 'LÜBE', name: 'Lübeck' },
          { code: 'FLAN', name: 'Flensburg' },
          { code: 'NEUM', name: 'Neumünster' },
          { code: 'NORD', name: 'Norderstedt' },
          { code: 'ELMS', name: 'Elmshorn' },
          { code: 'EUT', name: 'Eutin' },
          { code: 'AHREN', name: 'Ahrensburg' },
          { code: 'PINN', name: 'Pinneberg' }
        ]
      },
      { code: 'TH', name: 'Thuringia',
        cities: [
          { code: 'ERFU', name: 'Erfurt' },
          { code: 'JENA', name: 'Jena' },
          { code: 'GERA', name: 'Gera' },
          { code: 'WEIM', name: 'Weimar' },
          { code: 'GO', name: 'Gotha' },
          { code: 'NORD', name: 'Nordhausen' },
          { code: 'EIS', name: 'Eisenach' },
          { code: 'SÖM', name: 'Sömmerda' },
          { code: 'MÜHL', name: 'Mühlhausen' },
          { code: 'ALT', name: 'Altenburg' }
        ]
      }
    ]
};
