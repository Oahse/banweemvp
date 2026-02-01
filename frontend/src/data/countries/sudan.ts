/**
 * Sudan country data with states and cities
 */

import { Country } from './index';

export const sudan: Country = {
  code: 'SD',
  name: 'Sudan',
  flag: '🇸🇩',
  capital: 'Khartoum',
  area: 1886068,
  currencySymbol: 'ج.س',
  officialLanguages: ['Arabic', 'English'],
  demonym: 'Sudanese',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'USD', region: 'MEA' },
  divisions: [
    { code: 'KHAR', name: 'Khartoum', type: 'state',
      cities: [
        { code: 'KHARTOUM', name: 'Khartoum' },
        { code: 'OMDURMAN', name: 'Omdurman' },
        { code: 'KHARTOUM', name: 'Khartoum North' },
        { code: 'KHARTOUM', name: 'Khartoum Bahri' },
        { code: 'JABAL', name: 'Jabal Al Awlia' }
      ]
    },
    { code: 'GEZ', name: 'Gezira', type: 'state',
      cities: [
        { code: 'WAD', name: 'Wad Madani' },
        { code: 'HASAHISA', name: 'Hasahisa' },
        { code: 'RABAK', name: 'Rabak' },
        { code: 'SINNAR', name: 'Sinnar' },
        { code: 'MANAGIL', name: 'Managil' }
      ]
    },
    { code: 'NILE', name: 'River Nile', type: 'state',
      cities: [
        { code: 'DONGOLA', name: 'Dongola' },
        { code: 'BERBER', name: 'Berber' },
        { code: 'ABU', name: 'Abu Hamad' },
        { code: 'ED', name: 'Ed Damer' },
        { code: 'KARIMA', name: 'Karima' }
      ]
    },
    { code: 'NORTHERN', name: 'Northern', type: 'state',
      cities: [
        { code: 'DONGOLA', name: 'Dongola' },
        { code: 'WADI', name: 'Wadi Halfa' },
        { code: 'ABU', name: 'Abu Hamad' },
        { code: 'BERBER', name: 'Berber' },
        { code: 'ED', name: 'Ed Damer' }
      ]
    },
    { code: 'KASSALA', name: 'Kassala', type: 'state',
      cities: [
        { code: 'KASSALA', name: 'Kassala' },
        { code: 'PORT', name: 'Port Sudan' },
        { code: 'SUAKIN', name: 'Suakin' },
        { code: 'TOKAR', name: 'Tokar' },
        { code: 'GEDAREF', name: 'Gedaref' }
      ]
    },
    { code: 'GEDAREF', name: 'Gedaref', type: 'state',
      cities: [
        { code: 'GEDAREF', name: 'Gedaref' },
        { code: 'KASSALA', name: 'Kassala' },
        { code: 'PORT', name: 'Port Sudan' },
        { code: 'SUAKIN', name: 'Suakin' },
        { code: 'TOKAR', name: 'Tokar' }
      ]
    },
    { code: 'RED', name: 'Red Sea', type: 'state',
      cities: [
        { code: 'PORT', name: 'Port Sudan' },
        { code: 'SUAKIN', name: 'Suakin' },
        { code: 'TOKAR', name: 'Tokar' },
        { code: 'KASSALA', name: 'Kassala' },
        { code: 'GEDAREF', name: 'Gedaref' }
      ]
    },
    { code: 'SINNAR', name: 'Sinnar', type: 'state',
      cities: [
        { code: 'SINNAR', name: 'Sinnar' },
        { code: 'WAD', name: 'Wad Madani' },
        { code: 'HASAHISA', name: 'Hasahisa' },
        { code: 'RABAK', name: 'Rabak' },
        { code: 'MANAGIL', name: 'Managil' }
      ]
    },
    { code: 'WHITE', name: 'White Nile', type: 'state',
      cities: [
        { code: 'RABAK', name: 'Rabak' },
        { code: 'KOSTI', name: 'Kosti' },
        { code: 'ED', name: 'Ed Dueim' },
        { code: 'UMM', name: 'Umm Ruwaba' },
        { code: 'DUWEIM', name: 'Duweim' }
      ]
    },
    { code: 'BLUE', name: 'Blue Nile', type: 'state',
      cities: [
        { code: 'DAMAZIN', name: 'Damazin' },
        { code: 'ROSEIRES', name: 'Roseires' },
        { code: 'AD', name: 'Ad Damazin' },
        { code: 'SUKI', name: 'Suki' },
        { code: 'BAU', name: 'Bau' }
      ]
    },
    { code: 'NORTH', name: 'North Darfur', type: 'state',
      cities: [
        { code: 'EL', name: 'El Fasher' },
        { code: 'KUTUM', name: 'Kutum' },
        { code: 'MELIT', name: 'Melit' },
        { code: 'KABKABIYA', name: 'Kabkabiya' },
        { code: 'TAWILA', name: 'Tawila' }
      ]
    },
    { code: 'SOUTH', name: 'South Darfur', type: 'state',
      cities: [
        { code: 'NYALA', name: 'Nyala' },
        { code: 'BURAM', name: 'Buram' },
        { code: 'TULLUS', name: 'Tullus' },
        { code: 'KAS', name: 'Kas' },
        { code: 'RADOM', name: 'Radom' }
      ]
    },
    { code: 'WEST', name: 'West Darfur', type: 'state',
      cities: [
        { code: 'GENEINA', name: 'Geneina' },
        { code: 'MORNEI', name: 'Mornei' },
        { code: 'FORO', name: 'Foro' },
        { code: 'BEIDA', name: 'Beida' },
        { code: 'KEREINIK', name: 'Kereinik' }
      ]
    },
    { code: 'CENTRAL', name: 'Central Darfur', type: 'state',
      cities: [
        { code: 'ZALINGEI', name: 'Zalingei' },
        { code: 'NERTITI', name: 'Nertiti' },
        { code: 'GALAB', name: 'Galab' },
        { code: 'ROKORO', name: 'Rokoro' },
        { code: 'SULU', name: 'Sulu' }
      ]
    },
    { code: 'EAST', name: 'East Darfur', type: 'state',
      cities: [
        { code: 'ED', name: 'Ed Daein' },
        { code: 'ADILA', name: 'Adila' },
        { code: 'ABU', name: 'Abu Karinka' },
        { code: 'YASIN', name: 'Yasin' },
        { code: 'BADI', name: 'Badi' }
      ]
    },
    { code: 'NORTH', name: 'North Kordofan', type: 'state',
      cities: [
        { code: 'EL', name: 'El Obeid' },
        { code: 'BARA', name: 'Bara' },
        { code: 'UMM', name: 'Umm Ruwaba' },
        { code: 'SODIRI', name: 'Sodiri' },
        { code: 'GHAZA', name: 'Ghaza' }
      ]
    },
    { code: 'SOUTH', name: 'South Kordofan', type: 'state',
      cities: [
        { code: 'KADUGLI', name: 'Kadugli' },
        { code: 'TALODI', name: 'Talodi' },
        { code: 'AL', name: 'Al Dibbat' },
        { code: 'ABU', name: 'Abu Jibeiha' },
        { code: 'RASHAD', name: 'Rashad' }
      ]
    },
    { code: 'WEST', name: 'West Kordofan', type: 'state',
      cities: [
        { code: 'AL', name: 'Al Fula' },
        { code: 'BABANUSA', name: 'Babanusa' },
        { code: 'LAGAWA', name: 'Lagawa' },
        { code: 'AL', name: 'Al Muglad' },
        { code: 'MEHEM', name: 'Mehem' }
      ]
    }
  ]
};

export default sudan;
