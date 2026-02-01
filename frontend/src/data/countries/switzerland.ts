/**
 * Switzerland country data with cantons, cities, and tax information
 */

import { Country } from './index';

export const switzerland: Country = {
    code: 'CH',
    name: 'Switzerland',
    taxInfo: { standardRate: 7.7, taxName: 'VAT', currency: 'CHF', region: 'EU' },
    provinces: [
      { code: 'ZH', name: 'Zurich',
        cities: [
          { code: 'ZUR', name: 'Zurich' },
          { code: 'WINTERT', name: 'Winterthur' },
          { code: 'USWIL', name: 'Uster' },
          { code: 'DÜBENDORF', name: 'Dübendorf' },
          { code: 'DIETIKON', name: 'Dietikon' },
          { code: 'AFFOLTERN', name: 'Affoltern am Albis' },
          { code: 'WÄDENS', name: 'Wädenswil' },
          { code: 'BÜLACH', name: 'Bülach' },
          { code: 'KLOTEN', name: 'Kloten' },
          { code: 'SCHWAM', name: 'Schwamendingen' }
        ]
      },
      { code: 'BE', name: 'Bern',
        cities: [
          { code: 'BERN', name: 'Bern' },
          { code: 'BIEL', name: 'Biel/Bienne' },
          { code: 'THUN', name: 'Thun' },
          { code: 'KÖNIZ', name: 'Köniz' },
          { code: 'FRIBOURG', name: 'Fribourg' },
          { code: 'MURTEN', name: 'Murten' },
          { code: 'INTERL', name: 'Interlaken' },
          { code: 'SPIEZ', name: 'Spiez' },
          { code: 'BURGD', name: 'Burgdorf' },
          { code: 'STEFFIS', name: 'Steffisburg' }
        ]
      },
      { code: 'LU', name: 'Lucerne',
        cities: [
          { code: 'LUZERN', name: 'Lucerne' },
          { code: 'EMMEN', name: 'Emmen' },
          { code: 'KRIENS', name: 'Kriens' },
          { code: 'HORW', name: 'Horw' },
          { code: 'EBIKON', name: 'Ebikon' },
          { code: 'SURSEE', name: 'Sursee' },
          { code: 'WOLHUSEN', name: 'Wolhusen' },
          { code: 'WILLISAU', name: 'Willisau' },
          { code: 'RUSWIL', name: 'Ruswil' },
          { code: 'MEGGEN', name: 'Meggen' }
        ]
      },
      { code: 'UR', name: 'Uri',
        cities: [
          { code: 'ALTDORF', name: 'Altdorf' },
          { code: 'SCHWYZ', name: 'Schwyz' },
          { code: 'BRUNNEN', name: 'Brunnen' },
          { code: 'FLÜELEN', name: 'Flüelen' },
          { code: 'SEELIS', name: 'Seelisberg' },
          { code: 'SILENEN', name: 'Silenen' },
          { code: 'GÖSCHENEN', name: 'Göschenen' },
          { code: 'Wassen', name: 'Wassen' },
          { code: 'BÜRGEN', name: 'Bürglen' },
          { code: 'SPIRIT', name: 'Spiringen' }
        ]
      },
      { code: 'SZ', name: 'Schwyz',
        cities: [
          { code: 'SCHWYZ', name: 'Schwyz' },
          { code: 'FEUSIS', name: 'Feusisberg' },
          { code: 'ALTGOLD', name: 'Altgoldau' },
          { code: 'ARATH', name: 'Arth' },
          { code: 'KÜSSNACHT', name: 'Küssnacht am Rigi' },
          { code: 'MORSCH', name: 'Morschach' },
          { code: 'MUOTATHAL', name: 'Muotathal' },
          { code: 'ROTHENT', name: 'Rothenthurm' },
          { code: 'ILLGAU', name: 'Illgau' },
          { code: 'OBERRI', name: 'Oberiberg' }
        ]
      },
      { code: 'OW', name: 'Obwalden',
        cities: [
          { code: 'SARNEN', name: 'Sarnen' },
          { code: 'KERN', name: 'Kerns' },
          { code: 'ALPNACH', name: 'Alpnach' },
          { code: 'GISWIL', name: 'Giswil' },
          { code: 'LUNGERN', name: 'Lungern' },
          { code: 'ENGENB', name: 'Engelberg' },
          { code: 'STANS', name: 'Stans' },
          { code: 'STANSSTAD', name: 'Stansstad' },
          { code: 'Hergiswil', name: 'Hergiswil' },
          { code: 'WOLFEN', name: 'Wolfenschiessen' }
        ]
      },
      { code: 'NW', name: 'Nidwalden',
        cities: [
          { code: 'STANS', name: 'Stans' },
          { code: 'STANSSTAD', name: 'Stansstad' },
          { code: 'HERGIS', name: 'Hergiswil' },
          { code: 'BUCHS', name: 'Buchs' },
          { code: 'OWEN', name: 'Oberdorf' },
          { code: 'ENNETB', name: 'Ennetbürgen' },
          { code: 'ENNETMOOS', name: 'Ennetmoos' },
          { code: 'STANSTAD', name: 'Stansstad' },
          { code: 'DALLAS', name: 'Dallenwil' },
          { code: 'WOLFEN', name: 'Wolfenschiessen' }
        ]
      },
      { code: 'GL', name: 'Glarus',
        cities: [
          { code: 'GLARUS', name: 'Glarus' },
          { code: 'NAEFELS', name: 'Näfels' },
          { code: 'NETSTAL', name: 'Netstal' },
          { code: 'MOLLIS', name: 'Mollis' },
          { code: 'LINTE', name: 'Linthal' },
          { code: 'SCHWAND', name: 'Schwanden' },
          { code: 'WEISSEN', name: 'Weissenstein' },
          { code: 'MITLÖDI', name: 'Mitlödi' },
          { code: 'BILTON', name: 'Bilten' },
          { code: 'OBSTALD', name: 'Obstalden' }
        ]
      },
      { code: 'ZG', name: 'Zug',
        cities: [
          { code: 'ZUG', name: 'Zug' },
          { code: 'CHAM', name: 'Cham' },
          { code: 'BAAR', name: 'Baar' },
          { code: 'ROTEN', name: 'Rotkreuz' },
          { code: 'WALCHWIL', name: 'Walchwil' },
          { code: 'MENZING', name: 'Menzingen' },
          { code: 'UNTERÄGERI', name: 'Unterägeri' },
          { code: 'OBERÄGERI', name: 'Oberägeri' },
          { code: 'HÜNENBERG', name: 'Hünenberg' },
          { code: 'NEUHEIM', name: 'Neuheim' }
        ]
      },
      { code: 'FR', name: 'Fribourg',
        cities: [
          { code: 'FREIBURG', name: 'Fribourg' },
          { code: 'BULLE', name: 'Bulle' },
          { code: 'MURTEN', name: 'Murten' },
          { code: 'ESTAVAYER', name: 'Estavayer-le-Lac' },
          { code: 'ROMONT', name: 'Romont' },
          { code: 'DOMDID', name: 'Domdidier' },
          { code: 'VEYTAUX', name: 'Veytaux' },
          { code: 'GREYERZ', name: 'Greyerz' },
          { code: 'CHATEAU', name: 'Château-dŒx' },
          { code: 'BROUILLY', name: 'Brouilly' }
        ]
      },
      { code: 'SO', name: 'Solothurn',
        cities: [
          { code: 'SOLOTHURN', name: 'Solothurn' },
          { code: 'OLTEN', name: 'Olten' },
          { code: 'GRENCHEN', name: 'Grenchen' },
          { code: 'WANGEN', name: 'Wangen bei Olten' },
          { code: 'TRIMBACH', name: 'Trimbach' },
          { code: 'ZUCHWIL', name: 'Zuchwil' },
          { code: 'DELEMONT', name: 'Delémont' },
          { code: 'LAUFEN', name: 'Laufen' },
          { code: 'BREITEN', name: 'Breitenbach' },
          { code: 'BALSTHAL', name: 'Balsthal' }
        ]
      },
      { code: 'BS', name: 'Basel-Stadt',
        cities: [
          { code: 'BASEL', name: 'Basel' },
          { code: 'RIEHEN', name: 'Riehen' },
          { code: 'BETTINGEN', name: 'Bettingen' },
          { code: 'ST. JOHANN', name: 'St. Johann' },
          { code: 'CLARA', name: 'Clara' },
          { code: 'GUNDEL', name: 'Gundeldingen' },
          { code: 'ST. ALBAN', name: 'St. Alban' },
          { code: 'BRÜGLING', name: 'Brüglingen' },
          { code: 'BACHLETEN', name: 'Bachleten' },
          { code: 'WETTINGEN', name: 'Wettingen' }
        ]
      },
      { code: 'BL', name: 'Basel-Landschaft',
        cities: [
          { code: 'LIEFSTINGEN', name: 'Liestal' },
          { code: 'MUTTENZ', name: 'Muttenz' },
          { code: 'PRATT', name: 'Pratteln' },
          { code: 'REINACH', name: 'Reinach' },
          { code: 'ALLSCHWIL', name: 'Allschwil' },
          { code: 'BÜTTEN', name: 'Büttens' },
          { code: 'BÜRGER', name: 'Bürglen' },
          { code: 'BÜRGERN', name: 'Bürgern' },
          { code: 'BÜRGERM', name: 'Bürglen' },
          { code: 'BÜRGERW', name: 'Bürglen' }
        ]
      },
      { code: 'SH', name: 'Schaffhausen',
        cities: [
          { code: 'SCHAFFHAUSEN', name: 'Schaffhausen' },
          { code: 'NEUHAUSEN', name: 'Neuhausen am Rheinfall' },
          { code: 'THAYNGEN', name: 'Thayngen' },
          { code: 'KLEIN', name: 'Klein' },
          { code: 'BARGEN', name: 'Bargen' },
          { code: 'MERISH', name: 'Merishausen' },
          { code: 'SCHLEITHEIM', name: 'Schleitheim' },
          { code: 'SCHWANDEN', name: 'Schwanden' },
          { code: 'SCHWAN', name: 'Schwanau' },
          { code: 'SCHWANZ', name: 'Schwanzen' }
        ]
      },
      { code: 'AR', name: 'Appenzell Ausserrhoden',
        cities: [
          { code: 'HERISAU', name: 'Herisau' },
          { code: 'TEUFEN', name: 'Teufen' },
          { code: 'HEIDEN', name: 'Heiden' },
          { code: 'GAISSAU', name: 'Gais' },
          { code: 'WALD', name: 'Wald' },
          { code: 'TROGEN', name: 'Trogen' },
          { code: 'REUT', name: 'Rehetobel' },
          { code: 'SPEICHER', name: 'Speicher' },
          { code: 'SCHWEN', name: 'Schwende' },
          { code: 'SCHWAN', name: 'Schwanden' }
        ]
      },
      { code: 'AI', name: 'Appenzell Innerrhoden',
        cities: [
          { code: 'APPENZELL', name: 'Appenzell' },
          { code: 'GONTEN', name: 'Gonten' },
          { code: 'SCHWANDE', name: 'Schwende' },
          { code: 'RUETE', name: 'Rüte' },
          { code: 'SCHLATT', name: 'Schlatt-Haslen' },
          { code: 'BRECH', name: 'Brechte' },
          { code: 'EGGER', name: 'Egger' },
          { code: 'GONTEN', name: 'Gonten' },
          { code: 'HASLEN', name: 'Haslen' },
          { code: 'SCHWANDE', name: 'Schwende' }
        ]
      },
      { code: 'SG', name: 'St. Gallen',
        cities: [
          { code: 'ST GALLEN', name: 'St. Gallen' },
          { code: 'RIECO', name: 'Rorschach' },
          { code: 'WIL', name: 'Wil' },
          { code: 'GOSAU', name: 'Gossau' },
          { code: 'UZWIL', name: 'Uzwil' },
          { code: 'BÜTSCHWIL', name: 'Bütschwil' },
          { code: 'ALTSTÄTTEN', name: 'Altstätten' },
          { code: 'ST. MARGRETHEN', name: 'St. Margrethen' },
          { code: 'WATTWIL', name: 'Wattwil' },
          { code: 'ABTWIL', name: 'Abtwil' }
        ]
      },
      { code: 'GR', name: 'Graubünden',
        cities: [
          { code: 'CHUR', name: 'Chur' },
          { code: 'DAVOS', name: 'Davos' },
          { code: 'ST. MORITZ', name: 'St. Moritz' },
          { code: 'LANDQUART', name: 'Landquart' },
          { code: 'DOMAT', name: 'Domat/Ems' },
          { code: 'ILANZ', name: 'Ilanz' },
          { code: 'BERNINA', name: 'Bernina' },
          { code: 'POSCHIAVO', name: 'Poschiavo' },
          { code: 'SAMEDAN', name: 'Samedan' },
          { code: 'SCUOL', name: 'Scuol' }
        ]
      },
      { code: 'AG', name: 'Aargau',
        cities: [
          { code: 'AARAU', name: 'Aarau' },
          { code: 'BADEN', name: 'Baden' },
          { code: 'WETTINGEN', name: 'Wettingen' },
          { code: 'OFTRINGEN', name: 'Oftringen' },
          { code: 'RHEINFELDEN', name: 'Rheinfelden' },
          { code: 'ZOFINGEN', name: 'Zofingen' },
          { code: 'SUFFELN', name: 'Suffeln' },
          { code: 'BRUGG', name: 'Brugg' },
          { code: 'KULM', name: 'Kulm' },
          { code: 'LENZBURG', name: 'Lenzburg' }
        ]
      },
      { code: 'TG', name: 'Thurgau',
        cities: [
          { code: 'FRAUENFELD', name: 'Frauenfeld' },
          { code: 'WEINFELDEN', name: 'Weinfelden' },
          { code: 'KREUZLINGEN', name: 'Kreuzlingen' },
          { code: 'ROMANSHORN', name: 'Romanshorn' },
          { code: 'ARBON', name: 'Arbon' },
          { code: 'AMRISWIL', name: 'Amriswil' },
          { code: 'BISCHOFSZELL', name: 'Bischofszell' },
          { code: 'SIRNACH', name: 'Sirnach' },
          { code: 'MÜNCHEN', name: 'Münchenstein' },
          { code: 'GOTTINGEN', name: 'Göttingen' }
        ]
      },
      { code: 'TI', name: 'Ticino',
        cities: [
          { code: 'BELLINZONA', name: 'Bellinzona' },
          { code: 'LOCARNO', name: 'Locarno' },
          { code: 'LUGANO', name: 'Lugano' },
          { code: 'CHIASSO', name: 'Chiasso' },
          { code: 'MENDRISIO', name: 'Mendrisio' },
          { code: 'RIVIERA', name: 'Riviera' },
          { code: 'BRENO', name: 'Breno' },
          { code: 'BODIO', name: 'Bodio' },
          { code: 'Faido', name: 'Faido' },
          { code: 'Biasca', name: 'Biasca' }
        ]
      },
      { code: 'VD', name: 'Vaud',
        cities: [
          { code: 'LAUSANNE', name: 'Lausanne' },
          { code: 'VEVEY', name: 'Vevey' },
          { code: 'MONTREUX', name: 'Montreux' },
          { code: 'YVERDON', name: 'Yverdon-les-Bains' },
          { code: 'NYON', name: 'Nyon' },
          { code: 'MORGES', name: 'Morges' },
          { code: 'RENENS', name: 'Renens' },
          { code: 'PRILLY', name: 'Prilly' },
          { code: 'LA CHAUX', name: 'La Chaux-de-Fonds' },
          { code: 'GRANDSON', name: 'Grandson' }
        ]
      },
      { code: 'VS', name: 'Valais',
        cities: [
          { code: 'SION', name: 'Sion' },
          { code: 'MONTREUX', name: 'Montreux' },
          { code: 'BRIG', name: 'Brig-Glis' },
          { code: 'MARTIGNY', name: 'Martigny' },
          { code: 'SION', name: 'Sion' },
          { code: 'VISP', name: 'Visp' },
          { code: 'LEUKERBAD', name: 'Leukerbad' },
          { code: 'CRANS', name: 'Crans-Montana' },
          { code: 'ZERMATT', name: 'Zermatt' },
          { code: 'SAAS-FEE', name: 'Saas-Fee' }
        ]
      },
      { code: 'NE', name: 'Neuchâtel',
        cities: [
          { code: 'NEUCHATEL', name: 'Neuchâtel' },
          { code: 'LA CHAUX', name: 'La Chaux-de-Fonds' },
          { code: 'LE LOCLE', name: 'Le Locle' },
          { code: 'PONTARLIER', name: 'Pontarlier' },
          { code: 'CERNIER', name: 'Cernier' },
          { code: 'COINTE', name: 'Cointe' },
          { code: 'LA SAGNE', name: 'La Sagne' },
          { code: 'LES VERGERS', name: 'Les Vergers' },
          { code: 'BOUDEVILLIERS', name: 'Boudevilliers' },
          { code: 'VAL-DE-RUZ', name: 'Val-de-Ruz' }
        ]
      },
      { code: 'GE', name: 'Geneva',
        cities: [
          { code: 'GENEVA', name: 'Geneva' },
          { code: 'CAROUGE', name: 'Carouge' },
          { code: 'LANCY', name: 'Lancy' },
          { code: 'MEYRIN', name: 'Meyrin' },
          { code: 'VERNIER', name: 'Vernier' },
          { code: 'ONEX', name: 'Onex' },
          { code: 'THÔNEX', name: 'Thônex' },
          { code: 'PENTY', name: 'Pentyl' },
          { code: 'CHÊNE-BOUGERIES', name: 'Chêne-Bougeries' },
          { code: 'GRAND-SACONNEX', name: 'Grand-Saconnex' }
        ]
      },
      { code: 'JU', name: 'Jura',
        cities: [
          { code: 'DELEMONT', name: 'Delémont' },
          { code: 'PORRENTRUY', name: 'Porrentruy' },
          { code: 'SAINT-IMIER', name: 'Saint-Imier' },
          { code: 'MOUTIER', name: 'Moutier' },
          { code: 'LA CHAUX', name: 'La Chaux-de-Fonds' },
          { code: 'LE LOCLE', name: 'Le Locle' },
          { code: 'COURROIE', name: 'Courroux' },
          { code: 'COURTELARY', name: 'Courtelary' },
          { code: 'FRIBOURG', name: 'Fribourg' },
          { code: 'SAINT-URSANNES', name: 'Saint-Ursanne' }
        ]
      }
    ]
};
