/**
 * Ghana country data with regions and cities
 */

import { Country } from './index';

export const ghana: Country = {
  code: 'GH',
  name: 'Ghana',
  flag: '🇬🇭',
  capital: 'Accra',
  area: 238533,
  currencySymbol: 'GH₵',
  officialLanguages: ['English'],
  demonym: 'Ghanaian',
  taxInfo: { standardRate: 12.5, taxName: 'VAT', currency: 'GHS', region: 'MEA' },
  divisions: [
    { code: 'GAR', name: 'Greater Accra', type: 'region',
      cities: [
        { code: 'ACCRA', name: 'Accra' },
        { code: 'TEMA', name: 'Tema' },
        { code: 'ASHAIMAN', name: 'Ashaiman' },
        { code: 'LEKMA', name: 'La' },
        { code: 'TESHIE', name: 'Teshie' },
        { code: 'NUNGUA', name: 'Nungua' },
        { code: 'DANFA', name: 'Danfa' },
        { code: 'MADINA', name: 'Madina' },
        { code: 'ABOKOBI', name: 'Abokobi' },
        { code: 'PRASTEO', name: 'Praso' }
      ]
    },
    { code: 'ASH', name: 'Ashanti', type: 'region',
      cities: [
        { code: 'KUMASI', name: 'Kumasi' },
        { code: 'OBUASI', name: 'Obuasi' },
        { code: 'MAMPONG', name: 'Mampong' },
        { code: 'KONONGO', name: 'Konongo' },
        { code: 'BEKWAI', name: 'Bekwai' },
        { code: 'EJISU', name: 'Ejisu' },
        { code: 'JUABEN', name: 'Juaben' },
        { code: 'AGONA', name: 'Agona' },
        { code: 'OFFINSO', name: 'Offinso' },
        { code: 'BASOFI', name: 'Basofi' }
      ]
    },
    { code: 'BON', name: 'Bono', type: 'region',
      cities: [
        { code: 'SUNYANI', name: 'Sunyani' },
        { code: 'TECHIMAN', name: 'Techiman' },
        { code: 'BREMAN', name: 'Berekum' },
        { code: 'DORMAA', name: 'Dormaa Ahenkro' },
        { code: 'SEFWI', name: 'Sefwi Wiawso' },
        { code: 'WENCHI', name: 'Wenchi' },
        { code: 'JAMAN', name: 'Jaman' },
        { code: 'BANDA', name: 'Banda' },
        { code: 'ASUNAFO', name: 'Asunafo' },
        { code: 'SUNYANI2', name: 'Sunyani North' }
      ]
    },
    { code: 'BOE', name: 'Bono East', type: 'region',
      cities: [
        { code: 'TECHIMAN', name: 'Techiman' },
        { code: 'KINTAMPO', name: 'Kintampo' },
        { code: 'SEFWI', name: 'Sefwi Akontombra' },
        { code: 'NKORANZA', name: 'Nkoranza' },
        { code: 'PRU', name: 'Pru' },
        { code: 'ASEM', name: 'Asem' },
        { code: 'TECHIMAN2', name: 'Techiman North' },
        { code: 'KINTAMPO2', name: 'Kintampo South' },
        { code: 'NKORANZA2', name: 'Nkoranza South' },
        { code: 'PRU2', name: 'Pru West' }
      ]
    },
    { code: 'CEN', name: 'Central', type: 'region',
      cities: [
        { code: 'CAPE', name: 'Cape Coast' },
        { code: 'ELMINA', name: 'Elmina' },
        { code: 'MANKESIM', name: 'Mankessim' },
        { code: 'KASOA', name: 'Kasoa' },
        { code: 'WINNEBA', name: 'Winneba' },
        { code: 'SWEDRU', name: 'Swedru' },
        { code: 'AGONA', name: 'Agona Swedru' },
        { code: 'ASSIN', name: 'Assin Fosu' },
        { code: 'GOMOA', name: 'Gomoa Fetteh' },
        { code: 'AWUTU', name: 'Awutu Breku' }
      ]
    },
    { code: 'EAS', name: 'Eastern', type: 'region',
      cities: [
        { code: 'KOFORIDUA', name: 'Koforidua' },
        { code: 'AKIM', name: 'Akim Oda' },
        { code: 'NSAWAM', name: 'Nsawam' },
        { code: 'ABURI', name: 'Aburi' },
        { code: 'KROBO', name: 'Krobo Odumase' },
        { code: 'AKWAPIM', name: 'Akuapem' },
        { code: 'NEW', name: 'New Juaben' },
        { code: 'MANYA', name: 'Manya Krobo' },
        { code: 'AKIM2', name: 'Akim Swedru' },
        { code: 'EASTERN2', name: 'Eastern North' }
      ]
    },
    { code: 'NOR', name: 'North', type: 'region',
      cities: [
        { code: 'TAMALE', name: 'Tamale' },
        { code: 'SALAGA', name: 'Salaga' },
        { code: 'BIMBINLA', name: 'Bimbila' },
        { code: 'WALEWALE', name: 'Walewale' },
        { code: 'SABON', name: 'Saboba' },
        { code: 'KARAGA', name: 'Karaga' },
        { code: 'GUSHEGU', name: 'Gushegu' },
        { code: 'ZABZUGU', name: 'Zabzugu' },
        { code: 'CHEREPONI', name: 'Chereponi' },
        { code: 'MION', name: 'Mion' }
      ]
    },
    { code: 'NE', name: 'North East', type: 'region',
      cities: [
        { code: 'NALERIGU', name: 'Nalerigu' },
        { code: 'BUNKPURUGU', name: 'Bunkpurugu' },
        { code: 'WALEWALE', name: 'Walewale' },
        { code: 'YUNYOO', name: 'Yunyoo' },
        { code: 'CHEREPONI', name: 'Chereponi' },
        { code: 'GAMBAGA', name: 'Gambaga' },
        { code: 'NASUANI', name: 'Nasuan' },
        { code: 'JANGO', name: 'Jango' },
        { code: 'TATI', name: 'Tatiga' },
        { code: 'NALERIGU2', name: 'Nalerigu North' }
      ]
    },
    { code: 'OTI', name: 'Oti', type: 'region',
      cities: [
        { code: 'DAMBA', name: 'Damba' },
        { code: 'JASIKAN', name: 'Jasikan' },
        { code: 'KPASSA', name: 'Kpassa' },
        { code: 'NCHUMURU', name: 'Nchumuru' },
        { code: 'KRACHI', name: 'Krachi' },
        { code: 'GUOMAN', name: 'Guaman' },
        { code: 'BAFI', name: 'Bafi' },
        { code: 'NKOWDA', name: 'Nkawkaw' },
        { code: 'DAMBA2', name: 'Damba North' },
        { code: 'KRACHI2', name: 'Krachi East' }
      ]
    },
    { code: 'SAV', name: 'Savannah', type: 'region',
      cities: [
        { code: 'DAMONGO', name: 'Damongo' },
        { code: 'BUIPE', name: 'Buipe' },
        { code: 'SAWLA', name: 'Sawla' },
        { code: 'BOLE', name: 'Bole' },
        { code: 'WEST', name: 'West Gonja' },
        { code: 'CENTRAL', name: 'Central Gonja' },
        { code: 'EAST', name: 'East Gonja' },
        { code: 'NORTH', name: 'North Gonja' },
        { code: 'SOUTH', name: 'South Gonja' },
        { code: 'SAWLA2', name: 'Sawla-Tuna-Kalba' }
      ]
    },
    { code: 'UE', name: 'Upper East', type: 'region',
      cities: [
        { code: 'BOLGATANGA', name: 'Bolgatanga' },
        { code: 'NAVONGO', name: 'Navrongo' },
        { code: 'BONGO', name: 'Bongo' },
        { code: 'TONGO', name: 'Tongo' },
        { code: 'ZEBILLA', name: 'Zebilla' },
        { code: 'BASSE', name: 'Basse' },
        { code: 'PAGA', name: 'Paga' },
        { code: 'SANDEMA', name: 'Sandema' },
        { code: 'TEMPEL', name: 'Tempane' },
        { code: 'GARU', name: 'Garu' }
      ]
    },
    { code: 'UW', name: 'Upper West', type: 'region',
      cities: [
        { code: 'WA', name: 'Wa' },
        { code: 'TAMALE', name: 'Tamale' },
        { code: 'JIRAPA', name: 'Jirapa' },
        { code: 'LAMBUSIE', name: 'Lambussie' },
        { code: 'NANDOM', name: 'Nandom' },
        { code: 'TULE', name: 'Tule' },
        { code: 'FUNSI', name: 'Funsi' },
        { code: 'WECHIAU', name: 'Wechiau' },
        { code: 'ISSA', name: 'Issa' },
        { code: 'WA2', name: 'Wa East' }
      ]
    },
    { code: 'WES', name: 'Western', type: 'region',
      cities: [
        { code: 'SEKONDI', name: 'Sekondi-Takoradi' },
        { code: 'TARKWA', name: 'Tarkwa' },
        { code: 'PRESTEA', name: 'Prestea' },
        { code: 'BIBIANI', name: 'Bibiani' },
        { code: 'AXIM', name: 'Axim' },
        { code: 'SHAMA', name: 'Shama' },
        { code: 'JOMORO', name: 'Jomoro' },
        { code: 'AHANTA', name: 'Ahanta West' },
        { code: 'WASSA', name: 'Wassa East' },
        { code: 'JOMORO2', name: 'Jomoro South' }
      ]
    },
    { code: 'WN', name: 'Western North', type: 'region',
      cities: [
        { code: 'SEFWI', name: 'Sefwi Wiawso' },
        { code: 'BIBIANI', name: 'Bibiani' },
        { code: 'ENCHI', name: 'Enchi' },
        { code: 'BIA', name: 'Bia' },
        { code: 'SUAMAN', name: 'Suaman' },
        { code: 'AKONTOMBRA', name: 'Akontombra' },
        { code: 'BIA', name: 'Bia East' },
        { code: 'BIA2', name: 'Bia West' },
        { code: 'SUAMAN2', name: 'Suaman North' },
        { code: 'ENCHI2', name: 'Enchi North' }
      ]
    },
    { code: 'VOL', name: 'Volta', type: 'region',
      cities: [
        { code: 'HO', name: 'Ho' },
        { code: 'KETA', name: 'Keta' },
        { code: 'AKATSI', name: 'Akatsi' },
        { code: 'DENU', name: 'Denu' },
        { code: 'AVE', name: 'Ave' },
        { code: 'KPANDO', name: 'Kpando' },
        { code: 'JASIKAN', name: 'Jasikan' },
        { code: 'AFADZATO', name: 'Afadzato' },
        { code: 'NORTH', name: 'North Tongu' },
        { code: 'SOUTH', name: 'South Tongu' }
      ]
    }
  ]
};

export default ghana;
