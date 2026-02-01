/**
 * Netherlands country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const netherlands: Country = {
    code: 'NL',
    name: 'Netherlands',
    taxInfo: { standardRate: 21, taxName: 'VAT', currency: 'EUR', region: 'EU' },
    provinces: [
      { code: 'NH', name: 'North Holland',
        cities: [
          { code: 'AMS', name: 'Amsterdam' },
          { code: 'HAR', name: 'Haarlem' },
          { code: 'ZAN', name: 'Zaanstad' },
          { code: 'ALK', name: 'Alkmaar' },
          { code: 'HIL', name: 'Hilversum' },
          { code: 'HEEM', name: 'Heerhugowaard' },
          { code: 'HOORN', name: 'Hoorn' },
          { code: 'DEN', name: 'Den Helder' },
          { code: 'PURM', name: 'Purmerend' },
          { code: 'VELSEN', name: 'Velsen' }
        ]
      },
      { code: 'ZH', name: 'South Holland',
        cities: [
          { code: 'RTM', name: 'Rotterdam' },
          { code: 'THE', name: 'The Hague' },
          { code: 'DOR', name: 'Dordrecht' },
          { code: 'LEI', name: 'Leiden' },
          { code: 'DEL', name: 'Delft' },
          { code: 'GOU', name: 'Gouda' },
          { code: 'ZOE', name: 'Zoetermeer' },
          { code: 'ALPH', name: 'Alphen aan den Rijn' },
          { code: 'WEST', name: 'Westland' },
          { code: 'SCHI', name: 'Schiedam' }
        ]
      },
      { code: 'NB', name: 'North Brabant',
        cities: [
          { code: 'EIN', name: 'Eindhoven' },
          { code: 'TIL', name: 'Tilburg' },
          { code: 'BREDA', name: 'Breda' },
          { code: 'SHE', name: 's-Hertogenbosch' },
          { code: 'HEL', name: 'Helmond' },
          { code: 'ROER', name: 'Roosendaal' },
          { code: 'BERG', name: 'Bergen op Zoom' },
          { code: 'OSS', name: 'Oss' },
          { code: 'BOX', name: 'Boxmeer' },
          { code: 'VLI', name: 'Vlissingen' }
        ]
      },
      { code: 'UT', name: 'Utrecht',
        cities: [
          { code: 'UTR', name: 'Utrecht' },
          { code: 'AMER', name: 'Amersfoort' },
          { code: 'NIEU', name: 'Nieuwegein' },
          { code: 'ZEIS', name: 'Zeist' },
          { code: 'BUN', name: 'Bunnik' },
          { code: 'HOUT', name: 'Houten' },
          { code: 'IJSS', name: 'Ijsselstein' },
          { code: 'VEEN', name: 'Veenendaal' },
          { code: 'WOU', name: 'Woerden' },
          { code: 'DEB', name: 'De Bilt' }
        ]
      },
      { code: 'GL', name: 'Gelderland',
        cities: [
          { code: 'ARN', name: 'Arnhem' },
          { code: 'NIJ', name: 'Nijmegen' },
          { code: 'APEL', name: 'Apeldoorn' },
          { code: 'EDE', name: 'Ede' },
          { code: 'ZUT', name: 'Zutphen' },
          { code: 'DOE', name: 'Doetinchem' },
          { code: 'HARD', name: 'Harderwijk' },
          { code: 'TIEL', name: 'Tiel' },
          { code: 'WAG', name: 'Wageningen' },
          { code: 'BAR', name: 'Barneveld' }
        ]
      },
      { code: 'OV', name: 'Overijssel',
        cities: [
          { code: 'ENS', name: 'Enschede' },
          { code: 'ZWOL', name: 'Zwolle' },
          { code: 'ALME', name: 'Almelo' },
          { code: 'DEVE', name: 'Deventer' },
          { code: 'HEN', name: 'Hengelo' },
          { code: 'KAMP', name: 'Kampen' },
          { code: 'OLD', name: 'Oldenzaal' },
          { code: 'HASS', name: 'Hasselt' },
          { code: 'STAP', name: 'Staphorst' },
          { code: 'STEEN', name: 'Steenwijk' }
        ]
      },
      { code: 'FL', name: 'Flevoland',
        cities: [
          { code: 'LEE', name: 'Lelystad' },
          { code: 'ALM', name: 'Almere' },
          { code: 'URK', name: 'Urk' },
          { code: 'DRON', name: 'Dronten' },
          { code: 'ZEWO', name: 'Zeewolde' },
          { code: 'NOO', name: 'Noordoostpolder' },
          { code: 'LEM', name: 'Lemmer' },
          { code: 'BANT', name: 'Bant' },
          { code: 'EMME', name: 'Emmeloord' },
          { code: 'RUT', name: 'Rutten' }
        ]
      },
      { code: 'FR', name: 'Friesland',
        cities: [
          { code: 'LEE', name: 'Leeuwarden' },
          { code: 'HEER', name: 'Heerenveen' },
          { code: 'HARL', name: 'Harlingen' },
          { code: 'DOK', name: 'Dokkum' },
          { code: 'SNEE', name: 'Sneek' },
          { code: 'FRAN', name: 'Franeker' },
          { code: 'KOL', name: 'Kollum' },
          { code: 'AALS', name: 'Aalsmeer' },
          { code: 'BALK', name: 'Balk' },
          { code: 'BURG', name: 'Burgum' }
        ]
      },
      { code: 'GR', name: 'Groningen',
        cities: [
          { code: 'GRO', name: 'Groningen' },
          { code: 'EMM', name: 'Emmen' },
          { code: 'DEL', name: 'Delfzijl' },
          { code: 'HOOG', name: 'Hoogezand' },
          { code: 'VEEN', name: 'Veendam' },
          { code: 'WIN', name: 'Winschoten' },
          { code: 'APP', name: 'Appingedam' },
          { code: 'STAD', name: 'Stadskanaal' },
          { code: 'LEEK', name: 'Leek' },
          { code: 'OLD', name: 'Oldambt' }
        ]
      },
      { code: 'DR', name: 'Drenthe',
        cities: [
          { code: 'ASS', name: 'Assen' },
          { code: 'EMM', name: 'Emmen' },
          { code: 'HOOG', name: 'Hoogeveen' },
          { code: 'MEPP', name: 'Meppel' },
          { code: 'ROD', name: 'Rodan' },
          { code: 'COEV', name: 'Coevorden' },
          { code: 'WEST', name: 'Westerveld' },
          { code: 'TIN', name: 'Tynaarlo' },
          { code: 'AA', name: 'Aa en Hunze' },
          { code: 'NOOR', name: 'Noordenveld' }
        ]
      },
      { code: 'LI', name: 'Limburg',
        cities: [
          { code: 'MST', name: 'Maastricht' },
          { code: 'HEER', name: 'Heerlen' },
          { code: 'SITT', name: 'Sittard' },
          { code: 'MAAS', name: 'Maastricht' },
          { code: 'VALK', name: 'Valkenburg' },
          { code: 'GELE', name: 'Geleen' },
          { code: 'KER', name: 'Kerkrade' },
          { code: 'BEEK', name: 'Beek' },
          { code: 'LAND', name: 'Landgraaf' },
          { code: 'BRUN', name: 'Brunssum' }
        ]
      },
      { code: 'ZE', name: 'Zeeland',
        cities: [
          { code: 'MID', name: 'Middelburg' },
          { code: 'VLIS', name: 'Vlissingen' },
          { code: 'TER', name: 'Terneuzen' },
          { code: 'Goes', name: 'Goes' },
          { code: 'BERG', name: 'Bergen op Zoom' },
          { code: 'KAP', name: 'Kapelle' },
          { code: 'BORS', name: 'Borssele' },
          { code: 'HUL', name: 'Hulst' },
          { code: 'REIM', name: 'Reimerswaal' },
          { code: 'SLU', name: 'Sluis' }
        ]
      }
    ]
};
