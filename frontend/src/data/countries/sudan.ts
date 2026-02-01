/**
 * Sudan country data with regions, cities, and tax information
 */

import { Country } from './index';

export const sudan: Country = {
    code: 'SD',
    name: 'Sudan',
    taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'SDG', region: 'MEA' },
    provinces: [
      { code: 'KHA', name: 'Khartoum',
        cities: [
          { code: 'KHA', name: 'Khartoum' },
          { code: 'OMD', name: 'Omdurman' },
          { code: 'KHAR', name: 'Khartoum North' },
          { code: 'BARI', name: 'Bahri' },
          { code: 'SHAR', name: 'Sharq al-Nil' },
          { code: 'UMM', name: 'Umm Baddah' },
          { code: 'KAR', name: 'Karrari' },
          { code: 'AL', name: 'Al-Kalakla' },
          { code: 'JAB', name: 'Jabal al-Awliya' },
          { code: 'UMM2', name: 'Umm Rawaba' }
        ]
      },
      { code: 'NOR', name: 'Northern',
        cities: [
          { code: 'DONG', name: 'Dongola' },
          { code: 'MER', name: 'Merowe' },
          { code: 'KAR2', name: 'Karima' },
          { code: 'ABU', name: 'Abu Hamad' },
          { code: 'WADI', name: 'Wadi Halfa' },
          { code: 'ED', name: 'Ed-Damer' },
          { code: 'DAL', name: 'Dalgo' },
          { code: 'SAY', name: 'Sayal' },
          { code: 'AL2', name: 'Al-Dabbah' },
          { code: 'HAL', name: 'Halfa al-Jadidah' }
        ]
      },
      { code: 'NOR2', name: 'North Kordofan',
        cities: [
          { code: 'EL', name: 'El Obeid' },
          { code: 'UMM3', name: 'Umm Ruwaba' },
          { code: 'BAR', name: 'Bara' },
          { code: 'RAB', name: 'Rahad' },
          { code: 'SOD', name: 'Sodari' },
          { code: 'GOZ', name: 'Goz Beida' },
          { code: 'EL2', name: 'El Rahad' },
          { code: 'ABU2', name: 'Abu Zabad' },
          { code: 'NAIL', name: 'Nahiyat al-Na'im' },
          { code: 'TAW', name: 'Tawila' }
        ]
      },
      { code: 'KAS', name: 'Kassala',
        cities: [
          { code: 'KAS', name: 'Kassala' },
          { code: 'PORT', name: 'Port Sudan' },
          { code: 'SUA', name: 'Suakin' },
          { code: 'TOK', name: 'Tokar' },
          { code: 'GED', name: 'Gedaref' },
          { code: 'SHOW', name: 'Showak' },
          { code: 'GAL', name: 'Gallabat' },
          { code: 'RASH', name: 'Rashad' },
          { code: 'AD', name: 'Ad-Damazin' },
          { code: 'ROSE', name: 'Roseires' }
        ]
      },
      { code: 'GED', name: 'Al Qadarif',
        cities: [
          { code: 'GED', name: 'Gedaref' },
          { code: 'KAS', name: 'Kassala' },
          { code: 'PORT', name: 'Port Sudan' },
          { code: 'SUA', name: 'Suakin' },
          { code: 'TOK', name: 'Tokar' },
          { code: 'SHOW', name: 'Showak' },
          { code: 'GAL', name: 'Gallabat' },
          { code: 'RASH', name: 'Rashad' },
          { code: 'AD', name: 'Ad-Damazin' },
          { code: 'ROSE', name: 'Roseires' }
        ]
      },
      { code: 'WHITE', name: 'White Nile',
        cities: [
          { code: 'RAB2', name: 'Rabak' },
          { code: 'KOS', name: 'Kosti' },
          { code: 'DUI', name: 'Duweim' },
          { code: 'ED2', name: 'Ed Dueim' },
          { code: 'UMM4', name: 'Umm Gheiran' },
          { code: 'TEN', name: 'Tendelti' },
          { code: 'GEB', name: 'Gebeisha' },
          { code: 'AL3', name: 'Al-Gitaina' },
          { code: 'KAM', name: 'Kamlin' },
          { code: 'SHAR2', name: 'Sharq al-Nil' }
        ]
      },
      { code: 'RIVER', name: 'River Nile',
        cities: [
          { code: 'DAM', name: 'Damer' },
          { code: 'BER', name: 'Berber' },
          { code: 'ABU3', name: 'Abu Hamad' },
          { code: 'AT', name: 'Atbara' },
          { code: 'ED3', name: 'Ed Damer' },
          { code: 'SHAN', name: 'Shandi' },
          { code: 'MAT', name: 'Matamma' },
          { code: 'BARK', name: 'Barkal' },
          { code: 'MER2', name: 'Merowe' },
          { code: 'KAR3', name: 'Karima' }
        ]
      },
      { code: 'RED', name: 'Red Sea',
        cities: [
          { code: 'PORT', name: 'Port Sudan' },
          { code: 'SUA', name: 'Suakin' },
          { code: 'TOK', name: 'Tokar' },
          { code: 'HAL2', name: 'Halaib' },
          { code: 'ABU4', name: 'Abu Ramad' },
          { code: 'DER', name: 'Derudeb' },
          { code: 'HAY', name: 'Hayya' },
          { code: 'TOK2', name: 'Tokar' },
          { code: 'AR', name: 'Arbaat' },
          { code: 'AG', name: 'Agig' }
        ]
      },
      { code: 'GDA', name: 'Gedaref',
        cities: [
          { code: 'GED', name: 'Gedaref' },
          { code: 'SHOW', name: 'Showak' },
          { code: 'GAL', name: 'Gallabat' },
          { code: 'RASH', name: 'Rashad' },
          { code: 'AD', name: 'Ad-Damazin' },
          { code: 'ROSE', name: 'Roseires' },
          { code: 'KAS', name: 'Kassala' },
          { code: 'PORT', name: 'Port Sudan' },
          { code: 'SUA', name: 'Suakin' },
          { code: 'TOK', name: 'Tokar' }
        ]
      },
      { code: 'SIN', name: 'Sennar',
        cities: [
          { code: 'SEN', name: 'Sennar' },
          { code: 'SING', name: 'Singa' },
          { code: 'DIND', name: 'Dinder' },
          { code: 'SOU', name: 'Suki' },
          { code: 'ABU5', name: 'Abu Hugar' },
          { code: 'EL3', name: 'El Dinder' },
          { code: 'JAB2', name: 'Jabal Moya' },
          { code: 'AL4', name: 'Al Dinder' },
          { code: 'TEN2', name: 'Tendelti' },
          { code: 'UMM5', name: 'Umm Gheiran' }
        ]
      },
      { code: 'BLUE', name: 'Blue Nile',
        cities: [
          { code: 'AD', name: 'Ad-Damazin' },
          { code: 'ROSE', name: 'Roseires' },
          { code: 'KAR4', name: 'Karkar' },
          { code: 'BAU', name: 'Bau' },
          { code: 'GAM', name: 'Gaman' },
          { code: 'KUR', name: 'Kurmuk' },
          { code: 'YAB', name: 'Yabus' },
          { code: 'BEL', name: 'Belila' },
          { code: 'GID', name: 'Gidami' },
          { code: 'KAM2', name: 'Kamlin' }
        ]
      },
      { code: 'WEST', name: 'West Darfur',
        cities: [
          { code: 'GEN', name: 'Geneina' },
          { code: 'MOR', name: 'Mornei' },
          { code: 'KUL', name: 'Kulbus' },
          { code: 'FOR', name: 'Foro Baranga' },
          { code: 'NIA', name: 'Nia Nia' },
          { code: 'SIR', name: 'Sirba' },
          { code: 'UMM6', name: 'Umm Dukhun' },
          { code: 'GOK', name: 'Gok' },
          { code: 'AR2', name: 'Ardamata' },
          { code: 'BIR', name: 'Bir Salim' }
        ]
      },
      { code: 'SOUTH', name: 'South Darfur',
        cities: [
          { code: 'NYA', name: 'Nyala' },
          { code: 'KAS2', name: 'Kas' },
          { code: 'BUR', name: 'Buram' },
          { code: 'TUL', name: 'Tulus' },
          { code: 'AL5', name: 'Al Daein' },
          { code: 'MUG', name: 'Muglad' },
          { code: 'RAD', name: 'Radom' },
          { code: 'UMM7', name: 'Umm Dafug' },
          { code: 'KAD', name: 'Kadugli' },
          { code: 'TAL', name: 'Talodi' }
        ]
      },
      { code: 'NORTH2', name: 'North Darfur',
        cities: [
          { code: 'EL4', name: 'El Fasher' },
          { code: 'KUT', name: 'Kutum' },
          { code: 'KAB', name: 'Kabkabiya' },
          { code: 'MAL', name: 'Mellit' },
          { code: 'TAW2', name: 'Tawila' },
          { code: 'UMM8', name: 'Umm Keddada' },
          { code: 'AL6', name: 'Al Laeit' },
          { code: 'SAR', name: 'Saraf Omra' },
          { code: 'KAR5', name: 'Karnoi' },
          { code: 'KUB', name: 'Kubum' }
        ]
      },
      { code: 'EAST', name: 'East Darfur',
        cities: [
          { code: 'AL7', name: 'Al Daein' },
          { code: 'AD2', name: 'Adila' },
          { code: 'BUSH', name: 'Bush' },
          { code: 'ABU6', name: 'Abu Jabra' },
          { code: 'AL8', name: 'Al Laeit' },
          { code: 'UMM9', name: 'Umm Keddada' },
          { code: 'KAR6', name: 'Karnoi' },
          { code: 'KUB2', name: 'Kubum' },
          { code: 'NYA2', name: 'Nyala' },
          { code: 'KAS3', name: 'Kas' }
        ]
      },
      { code: 'CENTRAL', name: 'Central Darfur',
        cities: [
          { code: 'ZAL', name: 'Zalingei' },
          { code: 'NUR', name: 'Nur' },
          { code: 'GOS', name: 'Golo' },
          { code: 'BOK', name: 'Bokoro' },
          { code: 'KAR7', name: 'Karo' },
          { code: 'UMM10', name: 'Umm Dafug' },
          { code: 'RAD2', name: 'Radom' },
          { code: 'KAD2', name: 'Kadugli' },
          { code: 'TAL2', name: 'Talodi' },
          { code: 'ABU7', name: 'Abu Jabra' }
        ]
      },
      { code: 'WEST2', name: 'West Kordofan',
        cities: [
          { code: 'AL9', name: 'Al-Fulah' },
          { code: 'BAB', name: 'Babanusa' },
          { code: 'LAG', name: 'Lagawa' },
          { code: 'MUG2', name: 'Muglad' },
          { code: 'ABU8', name: 'Abu Zabad' },
          { code: 'NAIL2', name: 'Nahiyat al-Na'im' },
          { code: 'TAW3', name: 'Tawila' },
          { code: 'EL5', name: 'El Rahad' },
          { code: 'RAB3', name: 'Rahad' },
          { code: 'SOD2', name: 'Sodari' }
        ]
      },
      { code: 'SOUTH2', name: 'South Kordofan',
        cities: [
          { code: 'KAD', name: 'Kadugli' },
          { code: 'TAL', name: 'Talodi' },
          { code: 'DIL', name: 'Dilling' },
          { code: 'ABU9', name: 'Abu Jibaiha' },
          { code: 'RASH2', name: 'Rashad' },
          { code: 'AL10', name: 'Al Laeit' },
          { code: 'UMM11', name: 'Umm Dafug' },
          { code: 'RAD3', name: 'Radom' },
          { code: 'KAD3', name: 'Kadugli' },
          { code: 'TAL3', name: 'Talodi' }
        ]
      }
    ]
  };
