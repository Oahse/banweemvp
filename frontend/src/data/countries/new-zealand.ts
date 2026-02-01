/**
 * New Zealand country data with regions, cities, and tax information
 */

import { Country } from './index';

export const newZealand: Country = {
    code: 'NZ',
    name: 'New Zealand',
    taxInfo: { standardRate: 15, taxName: 'GST', currency: 'NZD', region: 'APAC' },
    provinces: [
      { code: 'AUK', name: 'Auckland',
        cities: [
          { code: 'AKL', name: 'Auckland' },
          { code: 'NORTH', name: 'North Shore' },
          { code: 'MANUKAU', name: 'Manukau' },
          { code: 'WAITAKERE', name: 'Waitakere' },
          { code: 'PAPAKURA', name: 'Papakura' },
          { code: 'HENDERSON', name: 'Henderson' },
          { code: 'PAPATOETOE', name: 'Papatoetoe' },
          { code: 'HOWICK', name: 'Howick' },
          { code: 'GLENFIELD', name: 'Glenfield' },
          { code: 'TAKAPUNA', name: 'Takapuna' }
        ]
      },
      { code: 'WLG', name: 'Wellington',
        cities: [
          { code: 'WLG', name: 'Wellington' },
          { code: 'PORIRUA', name: 'Porirua' },
          { code: 'LOWER', name: 'Lower Hutt' },
          { code: 'UPPER', name: 'Upper Hutt' },
          { code: 'KAPITI', name: 'Kapiti Coast' },
          { code: 'WAINUIOMATA', name: 'Wainuiomata' },
          { code: 'EASTBOURNE', name: 'Eastbourne' },
          { code: 'TAWA', name: 'Tawa' },
          { code: 'JOHNSONVILLE', name: 'Johnsonville' },
          { code: 'PETONE', name: 'Petone' }
        ]
      },
      { code: 'CHC', name: 'Canterbury',
        cities: [
          { code: 'CHC', name: 'Christchurch' },
          { code: 'TIMARU', name: 'Timaru' },
          { code: 'ASHBURTON', name: 'Ashburton' },
          { code: 'ROLLESTON', name: 'Rolleston' },
          { code: 'KAIPOI', name: 'Kaiapoi' },
          { code: 'RANGIORA', name: 'Rangiora' },
          { code: 'LINCOLN', name: 'Lincoln' },
          { code: 'DARFIELD', name: 'Darfield' },
          { code: 'OXFORD', name: 'Oxford' },
          { code: 'METHVEN', name: 'Methven' }
        ]
      },
      { code: 'WKO', name: 'Waikato',
        cities: [
          { code: 'HLZ', name: 'Hamilton' },
          { code: 'TAURANGA', name: 'Tauranga' },
          { code: 'ROTORUA', name: 'Rotorua' },
          { code: 'CAMBRIDGE', name: 'Cambridge' },
          { code: 'TE', name: 'Te Awamutu' },
          { code: 'MORRINSVILLE', name: 'Morrinsville' },
          { code: 'MATAMATA', name: 'Matamata' },
          { code: 'HUNTLY', name: 'Huntly' },
          { code: 'NGARUAWAHIA', name: 'Ngaruawahia' },
          { code: 'PUTARURU', name: 'Putaruru' }
        ]
      },
      { code: 'BOP', name: 'Bay of Plenty',
        cities: [
          { code: 'TRG', name: 'Tauranga' },
          { code: 'ROTORUA', name: 'Rotorua' },
          { code: 'WHAKATANE', name: 'Whakatane' },
          { code: 'TAURANGA2', name: 'Tauranga' },
          { code: 'KATIKATI', name: 'Katikati' },
          { code: 'TE', name: 'Te Puke' },
          { code: 'KAWERAU', name: 'Kawerau' },
          { code: 'OPOTIKI', name: 'Opotiki' },
          { code: 'MATATA', name: 'Matata' },
          { code: 'EDGEWATER', name: 'Edgecumbe' }
        ]
      },
      { code: 'GIS', name: 'Gisborne',
        cities: [
          { code: 'GIS', name: 'Gisborne' },
          { code: 'WAIROA', name: 'Wairoa' },
          { code: 'RUATORIA', name: 'Ruatoria' },
          { code: 'TE', name: 'Te Karaka' },
          { code: 'MATAHIKO', name: 'Matahiko' },
          { code: 'TOLAGA', name: 'Tolaga Bay' },
          { code: 'HICKS', name: 'Hicks Bay' },
          { code: 'RUATAHUNA', name: 'Ruatāhuna' },
          { code: 'MURUPARA', name: 'Murupara' },
          { code: 'TE2', name: 'Te Kaha' }
        ]
      },
      { code: 'HKB', name: 'Hawke\'s Bay',
        cities: [
          { code: 'NPE', name: 'Napier' },
          { code: 'HRE', name: 'Hastings' },
          { code: 'TARADALE', name: 'Taradale' },
          { code: 'WAIPAWA', name: 'Waipawa' },
          { code: 'WAIPUKURAU', name: 'Waipukurau' },
          { code: 'DANNEVIRKE', name: 'Dannevirke' },
          { code: 'WAIROA2', name: 'Wairoa' },
          { code: 'CLIVE', name: 'Clive' },
          { code: 'HAVERLOCK', name: 'Havelock North' },
          { code: 'OTANE', name: 'Otane' }
        ]
      },
      { code: 'TAR', name: 'Taranaki',
        cities: [
          { code: 'NPL', name: 'New Plymouth' },
          { code: 'HAWERA', name: 'Hawera' },
          { code: 'STRATFORD', name: 'Stratford' },
          { code: 'WAITARA', name: 'Waitara' },
          { code: 'INGLEWOOD', name: 'Inglewood' },
          { code: 'OPUNAKE', name: 'Opunake' },
          { code: 'ELTHAM', name: 'Eltham' },
          { code: 'PATEA', name: 'Patea' },
          { code: 'OAKURA', name: 'Oakura' },
          { code: 'OKATO', name: 'Okato' }
        ]
      },
      { code: 'MWT', name: 'Manawatu-Wanganui',
        cities: [
          { code: 'PMR', name: 'Palmerston North' },
          { code: 'WANGANUI', name: 'Wanganui' },
          { code: 'FEILDING', name: 'Feilding' },
          { code: 'LEVIN', name: 'Levin' },
          { code: 'MARTON', name: 'Marton' },
          { code: 'OHAKUNE', name: 'Ohakune' },
          { code: 'TAUMARUNUI', name: 'Taumarunui' },
          { code: 'TURANGI', name: 'Turangi' },
          { code: 'BULLS', name: 'Bulls' },
          { code: 'FOXTON', name: 'Foxton' }
        ]
      },
      { code: 'WKO', name: 'Wellington',
        cities: [
          { code: 'WLG', name: 'Wellington' },
          { code: 'PORIRUA', name: 'Porirua' },
          { code: 'LOWER', name: 'Lower Hutt' },
          { code: 'UPPER', name: 'Upper Hutt' },
          { code: 'KAPITI', name: 'Kapiti Coast' },
          { code: 'WAINUIOMATA', name: 'Wainuiomata' },
          { code: 'EASTBOURNE', name: 'Eastbourne' },
          { code: 'TAWA', name: 'Tawa' },
          { code: 'JOHNSONVILLE', name: 'Johnsonville' },
          { code: 'PETONE', name: 'Petone' }
        ]
      },
      { code: 'NSN', name: 'Nelson',
        cities: [
          { code: 'NSN', name: 'Nelson' },
          { code: 'RICHMOND', name: 'Richmond' },
          { code: 'MOTUEKA', name: 'Motueka' },
          { code: 'BLENHEIM', name: 'Blenheim' },
          { code: 'PICTON', name: 'Picton' },
          { code: 'TAKAKA', name: 'Takaka' },
          { code: 'COLLINGWOOD', name: 'Collingwood' },
          { code: 'STOK', name: 'Stok' },
          { code: 'HOPE', name: 'Hope' },
          { code: 'WAKEFIELD', name: 'Wakefield' }
        ]
      },
      { code: 'TAS', name: 'Tasman',
        cities: [
          { code: 'NSN', name: 'Nelson' },
          { code: 'RICHMOND', name: 'Richmond' },
          { code: 'MOTUEKA', name: 'Motueka' },
          { code: 'TAKAKA', name: 'Takaka' },
          { code: 'COLLINGWOOD', name: 'Collingwood' },
          { code: 'STOK', name: 'Stok' },
          { code: 'HOPE', name: 'Hope' },
          { code: 'WAKEFIELD', name: 'Wakefield' },
          { code: 'MAPUA', name: 'Mapua' },
          { code: 'RUBY', name: 'Ruby Bay' }
        ]
      },
      { code: 'MBH', name: 'Marlborough',
        cities: [
          { code: 'BHE', name: 'Blenheim' },
          { code: 'PICTON', name: 'Picton' },
          { code: 'RENNWICK', name: 'Renwick' },
          { code: 'HAVERLOCK', name: 'Havelock' },
          { code: 'SEDGEO', name: 'Seddon' },
          { code: 'WARD', name: 'Ward' },
          { code: 'RAI', name: 'Rai Valley' },
          { code: 'SPRING', name: 'Spring Creek' },
          { code: 'WITHER', name: 'Wither' },
          { code: 'TUAMARINA', name: 'Tuamarina' }
        ]
      },
      { code: 'WTC', name: 'West Coast',
        cities: [
          { code: 'CHC', name: 'Greymouth' },
          { code: 'WESTPORT', name: 'Westport' },
          { code: 'HOKITIKA', name: 'Hokitika' },
          { code: 'RUNANGA', name: 'Runanga' },
          { code: 'REFTON', name: 'Reefton' },
          { code: 'BRIGHTON', name: 'Brighton' },
          { code: 'KUMARA', name: 'Kumara' },
          { code: 'BLACKBALL', name: 'Blackball' },
          { code: 'IKAMATU', name: 'Ikamatu' },
          { code: 'PUNAKAIKI', name: 'Punakaiki' }
        ]
      },
      { code: 'CAN', name: 'Canterbury',
        cities: [
          { code: 'CHC', name: 'Christchurch' },
          { code: 'TIMARU', name: 'Timaru' },
          { code: 'ASHBURTON', name: 'Ashburton' },
          { code: 'ROLLESTON', name: 'Rolleston' },
          { code: 'KAIPOI', name: 'Kaiapoi' },
          { code: 'RANGIORA', name: 'Rangiora' },
          { code: 'LINCOLN', name: 'Lincoln' },
          { code: 'DARFIELD', name: 'Darfield' },
          { code: 'OXFORD', name: 'Oxford' },
          { code: 'METHVEN', name: 'Methven' }
        ]
      },
      { code: 'OTA', name: 'Otago',
        cities: [
          { code: 'DUD', name: 'Dunedin' },
          { code: 'QUEENSTOWN', name: 'Queenstown' },
          { code: 'WANAKA', name: 'Wanaka' },
          { code: 'ALEXANDRA', name: 'Alexandra' },
          { code: 'BALCLUTHA', name: 'Balclutha' },
          { code: 'MILFORD', name: 'Milford Sound' },
          { code: 'TE', name: 'Te Anau' },
          { code: 'GORE', name: 'Gore' },
          { code: 'OAMARU', name: 'Oamaru' },
          { code: 'CROMWELL', name: 'Cromwell' }
        ]
      },
      { code: 'STL', name: 'Southland',
        cities: [
          { code: 'IVC', name: 'Invercargill' },
          { code: 'GORE', name: 'Gore' },
          { code: 'TE', name: 'Te Anau' },
          { code: 'BLUFF', name: 'Bluff' },
          { code: 'WINTON', name: 'Winton' },
          { code: 'RIVERTON', name: 'Riverton' },
          { code: 'MATAURA', name: 'Mataura' },
          { code: 'WYNDHAM', name: 'Wyndham' },
          { code: 'LUMSDEN', name: 'Lumsden' },
          { code: 'TUATAPERE', name: 'Tuatapere' }
        ]
      },
      { code: 'CIT', name: 'Chatham Islands',
        cities: [
          { code: 'CHT', name: 'Waitangi' },
          { code: 'TE', name: 'Te One' },
          { code: 'KAINGAROA', name: 'Kaingaroa' },
          { code: 'OWEN', name: 'Owenga' },
          { code: 'PORT', name: 'Port Hutt' },
          { code: 'WAIPARA', name: 'Waipara' },
          { code: 'MANGERE', name: 'Mangere' },
          { code: 'TE2', name: 'Te Whakaru' },
          { code: 'KAINGAROA2', name: 'Kaingaroa' },
          { code: 'WAITANGI2', name: 'Waitangi' }
        ]
      }
    ]
};
