/**
 * Sweden country data with counties, cities, and tax information
 */

import { Country } from './index';

export const sweden: Country = {
    code: 'SE',
    name: 'Sweden',
    taxInfo: { standardRate: 25, taxName: 'VAT', currency: 'SEK', region: 'EU' },
    provinces: [
      { code: 'AB', name: 'Stockholm',
        cities: [
          { code: 'STO', name: 'Stockholm' },
          { code: 'SOL', name: 'Solna' },
          { code: 'SUN', name: 'Sundbyberg' },
          { code: 'NACK', name: 'Nacka' },
          { code: 'BOT', name: 'Botkyrka' },
          { code: 'HAN', name: 'Haninge' },
          { code: 'JÄRF', name: 'Järfälla' },
          { code: 'SÖD', name: 'Södertälje' },
          { code: 'TÄBY', name: 'Täby' },
          { code: 'UPP', name: 'Upplands Väsby' }
        ]
      },
      { code: 'O', name: 'Västra Götaland',
        cities: [
          { code: 'GOT', name: 'Gothenburg' },
          { code: 'BOR', name: 'Borås' },
          { code: 'TROLL', name: 'Trollhättan' },
          { code: 'UDDE', name: 'Uddevalla' },
          { code: 'MÖL', name: 'Mölndal' },
          { code: 'PART', name: 'Partille' },
          { code: 'ANG', name: 'Angered' },
          { code: 'LID', name: 'Lidköping' },
          { code: 'VÄN', name: 'Vänersborg' },
          { code: 'ALIN', name: 'Alingsås' }
        ]
      },
      { code: 'M', name: 'Skåne',
        cities: [
          { code: 'MAL', name: 'Malmö' },
          { code: 'HEL', name: 'Helsingborg' },
          { code: 'LUND', name: 'Lund' },
          { code: 'KRIS', name: 'Kristianstad' },
          { code: 'HES', name: 'Hässleholm' },
          { code: 'LAND', name: 'Landskrona' },
          { code: 'TREL', name: 'Trelleborg' },
          { code: 'ESLÖV', name: 'Eslöv' },
          { code: 'YSTAD', name: 'Ystad' },
          { code: 'HÖG', name: 'Höganäs' }
        ]
      },
      { code: 'AC', name: 'Västerbotten',
        cities: [
          { code: 'UME', name: 'Umeå' },
          { code: 'SKEL', name: 'Skellefteå' },
          { code: 'LYCK', name: 'Lycksele' },
          { code: 'NOR', name: 'Norsjö' },
          { code: 'MALÅ', name: 'Malå' },
          { code: 'STOR', name: 'Storuman' },
          { code: 'VIL', name: 'Vilhelmina' },
          { code: 'DOR', name: 'Dorotea' },
          { code: 'ÅSE', name: 'Åsele' },
          { code: 'BJUR', name: 'Bjurholm' }
        ]
      },
      { code: 'Z', name: 'Jönköping',
        cities: [
          { code: 'JÖN', name: 'Jönköping' },
          { code: 'JON', name: 'Jönköping' },
          { code: 'NOR', name: 'Norrköping' },
          { code: 'LIN', name: 'Linköping' },
          { code: 'VÄX', name: 'Växjö' },
          { code: 'KAL', name: 'Kalmar' },
          { code: 'KRON', name: 'Kronoberg' },
          { code: 'ÖST', name: 'Östergötland' },
          { code: 'SMÅ', name: 'Småland' },
          { code: 'GOT2', name: 'Gotland' }
        ]
      },
      { code: 'W', name: 'Dalarna',
        cities: [
          { code: 'FAL', name: 'Falun' },
          { code: 'BOR', name: 'Borlänge' },
          { code: 'LUD', name: 'Ludvika' },
          { code: 'MAL', name: 'Mora' },
          { code: 'Avesta', name: 'Avesta' },
          { code: 'SÄT', name: 'Säter' },
          { code: 'GAG', name: 'Gagnef' },
          { code: 'VAN', name: 'Vansbro' },
          { code: 'MAL2', name: 'Malung' },
          { code: 'OR', name: 'Orsa' }
        ]
      },
      { code: 'U', name: 'Uppsala',
        cities: [
          { code: 'UPP', name: 'Uppsala' },
          { code: 'ENK', name: 'Enköping' },
          { code: 'ÄLV', name: 'Älvkarleby' },
          { code: 'HAB', name: 'Habo' },
          { code: 'KNU', name: 'Knivsta' },
          { code: 'TIER', name: 'Tierp' },
          { code: 'UPP2', name: 'Uppsala' },
          { code: 'HEB', name: 'Heby' },
          { code: 'STO', name: 'Stockholm' },
          { code: 'GÄV', name: 'Gävle' }
        ]
      },
      { code: 'I', name: 'Gotland',
        cities: [
          { code: 'VIS', name: 'Visby' },
          { code: 'SLI', name: 'Slite' },
          { code: 'HEM', name: 'Hemse' },
          { code: 'ROM', name: 'Roma' },
          { code: 'KLIN', name: 'Klintehamn' },
          { code: 'VAST', name: 'Västervik' },
          { code: 'FAR', name: 'Fårösund' },
          { code: 'LUM', name: 'Lummelunda' },
          { code: 'KAP', name: 'Kappelshamn' },
          { code: 'BJÖ', name: 'Björs' }
        ]
      },
      { code: 'K', name: 'Blekinge',
        cities: [
          { code: 'KAR', name: 'Karlskrona' },
          { code: 'RON', name: 'Ronneby' },
          { code: 'KAR2', name: 'Karlshamn' },
          { code: 'SOL', name: 'Sölvesborg' },
          { code: 'OLO', name: 'Olofström' },
          { code: 'KAR3', name: 'Karlskrona' },
          { code: 'RON2', name: 'Ronneby' },
          { code: 'KAR4', name: 'Karlshamn' },
          { code: 'SOL2', name: 'Sölvesborg' },
          { code: 'OLO2', name: 'Olofström' }
        ]
      },
      { code: 'BD', name: 'Norrbotten',
        cities: [
          { code: 'LUL', name: 'Luleå' },
          { code: 'KIR', name: 'Kiruna' },
          { code: 'PITE', name: 'Piteå' },
          { code: 'BOD', name: 'Boden' },
          { code: 'HAP', name: 'Haparanda' },
          { code: 'KAL', name: 'Kalix' },
          { code: 'ÖVE', name: 'Överkalix' },
          { code: 'ÖSK', name: 'Östersund' },
          { code: 'JOK', name: 'Jokkmokk' },
          { code: 'ARJ', name: 'Arjeplog' }
        ]
      },
      { code: 'E', name: 'Östergötland',
        cities: [
          { code: 'NOR', name: 'Norrköping' },
          { code: 'LIN', name: 'Linköping' },
          { code: 'MJO', name: 'Mjölby' },
          { code: 'MOT', name: 'Motala' },
          { code: 'FINS', name: 'Finspång' },
          { code: 'VAD', name: 'Vadstena' },
          { code: 'MJO2', name: 'Mjölby' },
          { code: 'MOT2', name: 'Motala' },
          { code: 'FINS2', name: 'Finspång' },
          { code: 'VAD2', name: 'Vadstena' }
        ]
      },
      { code: 'F', name: 'Halland',
        cities: [
          { code: 'GOT', name: 'Gothenburg' },
          { code: 'HAL', name: 'Halmstad' },
          { code: 'VAR', name: 'Varberg' },
          { code: 'FALK', name: 'Falkenberg' },
          { code: 'KUN', name: 'Kungsbacka' },
          { code: 'HIL', name: 'Hylte' },
          { code: 'LAH', name: 'Laholm' },
          { code: 'STO', name: 'Stockholm' },
          { code: 'GOT2', name: 'Gothenburg' },
          { code: 'HAL2', name: 'Halmstad' }
        ]
      },
      { code: 'G', name: 'Västmanland',
        cities: [
          { code: 'VÄS', name: 'Västerås' },
          { code: 'KOP', name: 'Köping' },
          { code: 'SALA', name: 'Sala' },
          { code: 'FAG', name: 'Fagersta' },
          { code: 'SUR', name: 'Surahammar' },
          { code: 'ARB', name: 'Arboga' },
          { code: 'KUN', name: 'Kungsör' },
          { code: 'NOR', name: 'Norberg' },
          { code: 'SKO', name: 'Skinnskatteberg' },
          { code: 'HÄL', name: 'Hällbybrunn' }
        ]
      },
      { code: 'H', name: 'Gävleborg',
        cities: [
          { code: 'GÄV', name: 'Gävle' },
          { code: 'SUN', name: 'Sundsvall' },
          { code: 'HUD', name: 'Hudiksvall' },
          { code: 'SAND', name: 'Söderhamn' },
          { code: 'BOL', name: 'Bollnäs' },
          { code: 'HOF', name: 'Hofors' },
          { code: 'OVA', name: 'Ovanåker' },
          { code: 'NOR', name: 'Nordanstig' },
          { code: 'LJU', name: 'Ljusdal' },
          { code: 'KNO', name: 'Knivsta' }
        ]
      },
      { code: 'N', name: 'Värmland',
        cities: [
          { code: 'KAR', name: 'Karlstad' },
          { code: 'KRIS', name: 'Kristinehamn' },
          { code: 'FIL', name: 'Filipstad' },
          { code: 'ARV', name: 'Arvika' },
          { code: 'SUN', name: 'Sunne' },
          { code: 'HAM', name: 'Hammarö' },
          { code: 'FOR', name: 'Forshaga' },
          { code: 'STO', name: 'Storfors' },
          { code: 'SAF', name: 'Säffle' },
          { code: 'GRA', name: 'Grums' }
        ]
      },
      { code: 'S', name: 'Jämtland',
        cities: [
          { code: 'ÖST', name: 'Östersund' },
          { code: 'KRO', name: 'Krokom' },
          { code: 'STR', name: 'Strömsund' },
          { code: 'BRA', name: 'Bräcke' },
          { code: 'RAG', name: 'Ragunda' },
          { code: 'BER', name: 'Berg' },
          { code: 'HAR', name: 'Härjedalen' },
          { code: 'ÅRE', name: 'Åre' },
          { code: 'KRO2', name: 'Krokom' },
          { code: 'STR2', name: 'Strömsund' }
        ]
      },
      { code: 'T', name: 'Kronoberg',
        cities: [
          { code: 'VÄX', name: 'Växjö' },
          { code: 'KAL', name: 'Kalmar' },
          { code: 'ALV', name: 'Alvesta' },
          { code: 'LES', name: 'Lessebo' },
          { code: 'LJU', name: 'Ljungby' },
          { code: 'MARK', name: 'Markaryd' },
          { code: 'TORS', name: 'Torsås' },
          { code: 'UPP', name: 'Uppvidinge' },
          { code: 'VÄX2', name: 'Växjö' },
          { code: 'KAL2', name: 'Kalmar' }
        ]
      },
      { code: 'X', name: 'Gävleborg',
        cities: [
          { code: 'GÄV', name: 'Gävle' },
          { code: 'SUN', name: 'Sundsvall' },
          { code: 'HUD', name: 'Hudiksvall' },
          { code: 'SAND', name: 'Söderhamn' },
          { code: 'BOL', name: 'Bollnäs' },
          { code: 'HOF', name: 'Hofors' },
          { code: 'OVA', name: 'Ovanåker' },
          { code: 'NOR', name: 'Nordanstig' },
          { code: 'LJU', name: 'Ljusdal' },
          { code: 'KNO', name: 'Knivsta' }
        ]
      },
      { code: 'Y', name: 'Västernorrland',
        cities: [
          { code: 'SUN', name: 'Sundsvall' },
          { code: 'HÄR', name: 'Härnösand' },
          { code: 'KRAM', name: 'Kramfors' },
          { code: 'SOL', name: 'Sollefteå' },
          { code: 'ÖR', name: 'Örnsköldsvik' },
          { code: 'TIM', name: 'Timrå' },
          { code: 'ANG', name: 'Ånge' },
          { code: 'RAG', name: 'Ragunda' },
          { code: 'KRO', name: 'Krokom' },
          { code: 'STR', name: 'Strömsund' }
        ]
      },
      { code: 'C', name: 'Uppsala',
        cities: [
          { code: 'UPP', name: 'Uppsala' },
          { code: 'ENK', name: 'Enköping' },
          { code: 'ÄLV', name: 'Älvkarleby' },
          { code: 'HAB', name: 'Habo' },
          { code: 'KNU', name: 'Knivsta' },
          { code: 'TIER', name: 'Tierp' },
          { code: 'UPP2', name: 'Uppsala' },
          { code: 'HEB', name: 'Heby' },
          { code: 'STO', name: 'Stockholm' },
          { code: 'GÄV', name: 'Gävle' }
        ]
      },
      { code: 'D', name: 'Södermanland',
        cities: [
          { code: 'NYK', name: 'Nyköping' },
          { code: 'ESK', name: 'Eskilstuna' },
          { code: 'KAT', name: 'Katrineholm' },
          { code: 'FLEN', name: 'Flen' },
          { code: 'STR', name: 'Strängnäs' },
          { code: 'TRO', name: 'Trosa' },
          { code: 'VING', name: 'Vingåker' },
          { code: 'GNE', name: 'Gnesta' },
          { code: 'OXE', name: 'Oxelösund' },
          { code: 'MAR', name: 'Mariefred' }
        ]
      },
      { code: 'R', name: 'Blekinge',
        cities: [
          { code: 'KAR', name: 'Karlskrona' },
          { code: 'RON', name: 'Ronneby' },
          { code: 'KAR2', name: 'Karlshamn' },
          { code: 'SOL', name: 'Sölvesborg' },
          { code: 'OLO', name: 'Olofström' },
          { code: 'KAR3', name: 'Karlskrona' },
          { code: 'RON2', name: 'Ronneby' },
          { code: 'KAR4', name: 'Karlshamn' },
          { code: 'SOL2', name: 'Sölvesborg' },
          { code: 'OLO2', name: 'Olofström' }
        ]
      }
    ]
};
