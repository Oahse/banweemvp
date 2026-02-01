/**
 * Netherlands country data with provinces and municipalities
 */

import { Country } from './index';

export const netherlands: Country = {
  code: 'NL',
  name: 'Netherlands',
  flag: '🇳🇱',
  capital: 'Amsterdam',
  area: 41543,
  currencySymbol: '€',
  officialLanguages: ['Dutch'],
  demonym: 'Dutch',
  taxInfo: { standardRate: 21, taxName: 'BTW', currency: 'EUR', region: 'EU' },
  divisions: [
    { code: 'NL-NH', name: 'North Holland', type: 'province',
      cities: [
        { code: 'AMSTERDAM', name: 'Amsterdam' },
        { code: 'HAARLEM', name: 'Haarlem' },
        { code: 'ALMERE', name: 'Almere' },
        { code: 'HILVERSUM', name: 'Hilversum' },
        { code: 'ZAANDAM', name: 'Zaandam' }
      ]
    },
    { code: 'NL-ZH', name: 'South Holland', type: 'province',
      cities: [
        { code: 'ROTTERDAM', name: 'Rotterdam' },
        { code: 'THEHAGUE', name: 'The Hague' },
        { code: 'LEIDEN', name: 'Leiden' },
        { code: 'DORDRECHT', name: 'Dordrecht' },
        { code: 'ZOETERMEER', name: 'Zoetermeer' }
      ]
    },
    { code: 'NL-UT', name: 'Utrecht', type: 'province',
      cities: [
        { code: 'UTRECHT', name: 'Utrecht' },
        { code: 'AMERSFOORT', name: 'Amersfoort' },
        { code: 'NIJMEGEN', name: 'Nijmegen' },
        { code: 'ZWOLLE', name: 'Zwolle' },
        { code: 'ALMERE', name: 'Almere' }
      ]
    },
    { code: 'NL-NB', name: 'North Brabant', type: 'province',
      cities: [
        { code: 'EINDHOVEN', name: 'Eindhoven' },
        { code: 'TILBURG', name: 'Tilburg' },
        { code: 'BREDA', name: 'Breda' },
        { code: 'S-HERTOGENBOSCH', name: 's-Hertogenbosch' },
        { code: 'HELMOND', name: 'Helmond' }
      ]
    },
    { code: 'NL-GL', name: 'Gelderland', type: 'province',
      cities: [
        { code: 'ARNHEM', name: 'Arnhem' },
        { code: 'NIJMEGEN', name: 'Nijmegen' },
        { code: 'APELDOORN', name: 'Apeldoorn' },
        { code: 'EDE', name: 'Ede' },
        { code: 'DOETINCHEM', name: 'Doetinchem' }
      ]
    },
    { code: 'NL-OV', name: 'Overijssel', type: 'province',
      cities: [
        { code: 'ENSCHEDE', name: 'Enschede' },
        { code: 'ZWOLLE', name: 'Zwolle' },
        { code: 'ALMELO', name: 'Almelo' },
        { code: 'HENGELO', name: 'Hengelo' },
        { code: 'DEVENTER', name: 'Deventer' }
      ]
    },
    { code: 'NL-FL', name: 'Flevoland', type: 'province',
      cities: [
        { code: 'LELYSTAD', name: 'Lelystad' },
        { code: 'ALMERE', name: 'Almere' },
        { code: 'DRONTEN', name: 'Dronten' },
        { code: 'URK', name: 'Urk' },
        { code: 'ZEWO', name: 'Zeewolde' }
      ]
    },
    { code: 'NL-GR', name: 'Groningen', type: 'province',
      cities: [
        { code: 'GRONINGEN', name: 'Groningen' },
        { code: 'LEEUWARDEN', name: 'Leeuwarden' },
        { code: 'ASSN', name: 'Assen' },
        { code: 'VEENDAM', name: 'Veendam' },
        { code: 'HOOGEZAND', name: 'Hoogezand' }
      ]
    },
    { code: 'NL-FR', name: 'Friesland', type: 'province',
      cities: [
        { code: 'LEEUWARDEN', name: 'Leeuwarden' },
        { code: 'DRACHTEN', name: 'Drachten' },
        { code: 'HEERENVEEN', name: 'Heerenveen' },
        { code: 'HARLINGEN', name: 'Harlingen' },
        { code: 'SNEEK', name: 'Sneek' }
      ]
    },
    { code: 'NL-LI', name: 'Limburg', type: 'province',
      cities: [
        { code: 'MAASTRICHT', name: 'Maastricht' },
        { code: 'HEERLEN', name: 'Heerlen' },
        { code: 'SITTARD', name: 'Sittard' },
        { code: 'VENLO', name: 'Venlo' },
        { code: 'ROERMOND', name: 'Roermond' }
      ]
    },
    { code: 'NL-GE', name: 'Gelderland', type: 'province',
      cities: [
        { code: 'ARNHEM', name: 'Arnhem' },
        { code: 'NIJMEGEN', name: 'Nijmegen' },
        { code: 'APELDOORN', name: 'Apeldoorn' },
        { code: 'EDE', name: 'Ede' },
        { code: 'DOETINCHEM', name: 'Doetinchem' }
      ]
    },
    { code: 'NL-ZE', name: 'Zeeland', type: 'province',
      cities: [
        { code: 'MIDDELBURG', name: 'Middelburg' },
        { code: 'VLISSINGEN', name: 'Vlissingen' },
        { code: 'TERNEUZEN', name: 'Terneuzen' },
        { code: 'GOES', name: 'Goes' },
        { code: 'BERGEN', name: 'Bergen op Zoom' }
      ]
    },
    { code: 'NL-AW', name: 'Aruba', type: 'constituent country',
      cities: [
        { code: 'ORANJESTAD', name: 'Oranjestad' },
        { code: 'SAN', name: 'San Nicolaas' },
        { code: 'NOORD', name: 'Noord' },
        { code: 'PARADERA', name: 'Paradera' },
        { code: 'SANTA', name: 'Santa Cruz' }
      ]
    },
    { code: 'NL-CW', name: 'Curaçao', type: 'constituent country',
      cities: [
        { code: 'WILLEMSTAD', name: 'Willemstad' },
        { code: 'BANDABOU', name: 'Bandabou' },
        { code: 'BRIEVEN', name: 'Brievengat' },
        { code: 'BARBER', name: 'Barber' },
        { code: 'SOTO', name: 'Soto' }
      ]
    },
    { code: 'NL-SX', name: 'Sint Maarten', type: 'constituent country',
      cities: [
        { code: 'PHILIPSBURG', name: 'Philipsburg' },
        { code: 'LOWER', name: 'Lower Prince\'s Quarter' },
        { code: 'UPPER', name: 'Upper Prince\'s Quarter' },
        { code: 'CUL', name: 'Cul de Sac' },
        { code: 'COLE', name: 'Cole Bay' }
      ]
    }
  ]
};
