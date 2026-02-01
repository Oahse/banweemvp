/**
 * Nigeria country data with states, federal capital territory, and cities
 */

import { Country } from './index';

export const nigeria: Country = {
  code: 'NG',
  name: 'Nigeria',
  flag: '🇳🇬',
  capital: 'Abuja',
  area: 923768,
  currencySymbol: '₦',
  officialLanguages: ['English'],
  demonym: 'Nigerian',
  taxInfo: { standardRate: 7.5, taxName: 'VAT', currency: 'NGN', region: 'MEA' },
  divisions: [
    { code: 'AB', name: 'Abia', type: 'state',
      cities: [
        { code: 'UMU', name: 'Umuahia' },
        { code: 'ABA', name: 'Aba' },
        { code: 'AFI', name: 'Afikpo' },
        { code: 'OHAF', name: 'Ohafia' },
        { code: 'ARI', name: 'Ariam' }
      ]
    },
    { code: 'AD', name: 'Adamawa', type: 'state',
      cities: [
        { code: 'YOL', name: 'Yola' },
        { code: 'MUB', name: 'Mubi' },
        { code: 'NUM', name: 'Numan' },
        { code: 'JIM', name: 'Jimeta' },
        { code: 'GUY', name: 'Guyuk' }
      ]
    },
    { code: 'AK', name: 'Akwa Ibom', type: 'state',
      cities: [
        { code: 'UYO', name: 'Uyo' },
        { code: 'IKO', name: 'Ikot Ekpene' },
        { code: 'ETI', name: 'Eket' },
        { code: 'ORO', name: 'Oron' },
        { code: 'IBN', name: 'Ibeno' }
      ]
    },
    { code: 'AN', name: 'Anambra', type: 'state',
      cities: [
        { code: 'AWK', name: 'Awka' },
        { code: 'ONI', name: 'Onitsha' },
        { code: 'NNE', name: 'Nnewi' },
        { code: 'EKW', name: 'Ekwu' },
        { code: 'OGB', name: 'Ogbunike' }
      ]
    },
    { code: 'BA', name: 'Bauchi', type: 'state',
      cities: [
        { code: 'BAU', name: 'Bauchi' },
        { code: 'AZA', name: 'Azare' },
        { code: 'KAT', name: 'Katagum' },
        { code: 'JAM', name: 'Jamaare' },
        { code: 'MIS', name: 'Misau' }
      ]
    },
    { code: 'BY', name: 'Bayelsa', type: 'state',
      cities: [
        { code: 'YEN', name: 'Yenagoa' },
        { code: 'BRAS', name: 'Brass' },
        { code: 'NEM', name: 'Nembe' },
        { code: 'OGB', name: 'Ogbia' },
        { code: 'SAG', name: 'Sagbama' }
      ]
    },
    { code: 'BE', name: 'Benue', type: 'state',
      cities: [
        { code: 'MAK', name: 'Makurdi' },
        { code: 'OTU', name: 'Otukpo' },
        { code: 'GBOK', name: 'Gboko' },
        { code: 'KAT', name: 'Katsina-Ala' },
        { code: 'VAN', name: 'Vandeikya' }
      ]
    },
    { code: 'BO', name: 'Borno', type: 'state',
      cities: [
        { code: 'MAI', name: 'Maiduguri' },
        { code: 'Biu', name: 'Biu' },
        { code: 'DAM', name: 'Damaturu' },
        { code: 'POT', name: 'Potiskum' },
        { code: 'GWO', name: 'Gwoza' }
      ]
    },
    { code: 'CR', name: 'Cross River', type: 'state',
      cities: [
        { code: 'CAL', name: 'Calabar' },
        { code: 'IKO', name: 'Ikom' },
        { code: 'OGO', name: 'Ogoja' },
        { code: 'OBUD', name: 'Obudu' },
        { code: 'UGE', name: 'Ugep' }
      ]
    },
    { code: 'DE', name: 'Delta', type: 'state',
      cities: [
        { code: 'ASA', name: 'Asaba' },
        { code: 'WARR', name: 'Warri' },
        { code: 'UGL', name: 'Ughelli' },
        { code: 'SAPE', name: 'Sapele' },
        { code: 'OZOR', name: 'Ozoro' }
      ]
    },
    { code: 'EB', name: 'Ebonyi', type: 'state',
      cities: [
        { code: 'ABAK', name: 'Abakaliki' },
        { code: 'AFIK', name: 'Afikpo' },
        { code: 'ONUE', name: 'Onueke' },
        { code: 'EBON', name: 'Ezzamgbo' },
        { code: 'ISH', name: 'Ishiagu' }
      ]
    },
    { code: 'ED', name: 'Edo', type: 'state',
      cities: [
        { code: 'BEN', name: 'Benin City' },
        { code: 'EKPO', name: 'Ekpoma' },
        { code: 'UGB', name: 'Ugbenu' },
        { code: 'IRU', name: 'Irrua' },
        { code: 'FUGA', name: 'Fuga' }
      ]
    },
    { code: 'EK', name: 'Ekiti', type: 'state',
      cities: [
        { code: 'ADO', name: 'Ado Ekiti' },
        { code: 'IFE', name: 'Ife' },
        { code: 'OYE', name: 'Oye' },
        { code: 'IKER', name: 'Ikere' },
        { code: 'EMU', name: 'Emure' }
      ]
    },
    { code: 'EN', name: 'Enugu', type: 'state',
      cities: [
        { code: 'ENU', name: 'Enugu' },
        { code: 'NSUK', name: 'Nsukka' },
        { code: 'OJI', name: 'Oji River' },
        { code: 'AWGU', name: 'Awgu' },
        { code: 'UGW', name: 'Ugwuoba' }
      ]
    },
    { code: 'FC', name: 'Federal Capital Territory', type: 'federal capital territory',
      cities: [
        { code: 'ABJ', name: 'Abuja' },
        { code: 'GWA', name: 'Gwagwalada' },
        { code: 'KUJE', name: 'Kuje' },
        { code: 'BWA', name: 'Bwari' },
        { code: 'ABU2', name: 'Abuja Municipal' }
      ]
    },
    { code: 'GO', name: 'Gombe', type: 'state',
      cities: [
        { code: 'GOM', name: 'Gombe' },
        { code: 'KUL', name: 'Kaltungo' },
        { code: 'BAL', name: 'Balam' },
        { code: 'DUK', name: 'Dukku' },
        { code: 'AKK', name: 'Akko' }
      ]
    },
    { code: 'IM', name: 'Imo', type: 'state',
      cities: [
        { code: 'OWE', name: 'Owerri' },
        { code: 'ORL', name: 'Orlu' },
        { code: 'OKI', name: 'Okigwe' },
        { code: 'OGU', name: 'Ogu' },
        { code: 'MBAT', name: 'Mbaitoli' }
      ]
    },
    { code: 'JI', name: 'Jigawa', type: 'state',
      cities: [
        { code: 'DUT', name: 'Dutse' },
        { code: 'HAD', name: 'Hadejia' },
        { code: 'KAZ', name: 'Kazaure' },
        { code: 'BIR', name: 'Birnin Kudu' },
        { code: 'GUM', name: 'Gumel' }
      ]
    },
    { code: 'KD', name: 'Kaduna', type: 'state',
      cities: [
        { code: 'KAD', name: 'Kaduna' },
        { code: 'ZAR', name: 'Zaria' },
        { code: 'KAF', name: 'Kafanchan' },
        { code: 'ZON', name: 'Zonkwa' },
        { code: 'KAG', name: 'Kagoro' }
      ]
    },
    { code: 'KN', name: 'Kano', type: 'state',
      cities: [
        { code: 'KAN', name: 'Kano' },
        { code: 'DAN', name: 'Dambatta' },
        { code: 'GAYA', name: 'Gaya' },
        { code: 'GWAR', name: 'Gwarzo' },
        { code: 'KAB', name: 'Kabo' }
      ]
    },
    { code: 'KT', name: 'Katsina', type: 'state',
      cities: [
        { code: 'KAT', name: 'Katsina' },
        { code: 'DAU', name: 'Daura' },
        { code: 'FUNT', name: 'Funtua' },
        { code: 'MAL', name: 'Malumfashi' },
        { code: 'BAK', name: 'Bakori' }
      ]
    },
    { code: 'KE', name: 'Kebbi', type: 'state',
      cities: [
        { code: 'BIN', name: 'Birnin Kebbi' },
        { code: 'ARGU', name: 'Argungu' },
        { code: 'YAU', name: 'Yauri' },
        { code: 'ZUR', name: 'Zuru' },
        { code: 'BAG', name: 'Bagudo' }
      ]
    },
    { code: 'KO', name: 'Kogi', type: 'state',
      cities: [
        { code: 'LOK', name: 'Lokoja' },
        { code: 'OKEN', name: 'Okene' },
        { code: 'KAB', name: 'Kabba' },
        { code: 'IDAH', name: 'Idah' },
        { code: 'DEK', name: 'Dekina' }
      ]
    },
    { code: 'KW', name: 'Kwara', type: 'state',
      cities: [
        { code: 'ILR', name: 'Ilorin' },
        { code: 'OFFA', name: 'Offa' },
        { code: 'JAB', name: 'Jebba' },
        { code: 'PAT', name: 'Patigi' },
        { code: 'KIS', name: 'Kishi' }
      ]
    },
    { code: 'LA', name: 'Lagos', type: 'state',
      cities: [
        { code: 'IKE', name: 'Ikeja' },
        { code: 'LAG', name: 'Lagos' },
        { code: 'BAD', name: 'Badagry' },
        { code: 'IKO', name: 'Ikorodu' },
        { code: 'APA', name: 'Apapa' }
      ]
    },
    { code: 'NA', name: 'Nasarawa', type: 'state',
      cities: [
        { code: 'KAR', name: 'Karu' },
        { code: 'KEF', name: 'Keffi' },
        { code: 'AKW', name: 'Akwanga' },
        { code: 'LAF', name: 'Lafia' },
        { code: 'WUK', name: 'Wukari' }
      ]
    },
    { code: 'NI', name: 'Niger', type: 'state',
      cities: [
        { code: 'MIN', name: 'Minna' },
        { code: 'SULE', name: 'Suleja' },
        { code: 'BID', name: 'Bida' },
        { code: 'KON', name: 'Kontagora' },
        { code: 'LAP', name: 'Lapai' }
      ]
    },
    { code: 'OG', name: 'Ogun', type: 'state',
      cities: [
        { code: 'ABE', name: 'Abeokuta' },
        { code: 'IJE', name: 'Ijebu-Ode' },
        { code: 'ILO', name: 'Iloro' },
        { code: 'OTA', name: 'Otta' },
        { code: 'SAG', name: 'Sagamu' }
      ]
    },
    { code: 'ON', name: 'Ondo', type: 'state',
      cities: [
        { code: 'AKU', name: 'Akure' },
        { code: 'OND', name: 'Ondo' },
        { code: 'OWO', name: 'Owo' },
        { code: 'IKAR', name: 'Ikare' },
        { code: 'OKIT', name: 'Okitipupa' }
      ]
    },
    { code: 'OS', name: 'Osun', type: 'state',
      cities: [
        { code: 'OSH', name: 'Osogbo' },
        { code: 'IFE', name: 'Ife' },
        { code: 'ILE', name: 'Ilesha' },
        { code: 'EDE', name: 'Ede' },
        { code: 'IKIR', name: 'Ikirun' }
      ]
    },
    { code: 'OY', name: 'Oyo', type: 'state',
      cities: [
        { code: 'IBA', name: 'Ibadan' },
        { code: 'OYO', name: 'Oyo' },
        { code: 'OGBO', name: 'Ogbomoso' },
        { code: 'ISE', name: 'Iseyin' },
        { code: 'OYO2', name: 'Oyo Town' }
      ]
    },
    { code: 'PL', name: 'Plateau', type: 'state',
      cities: [
        { code: 'JOS', name: 'Jos' },
        { code: 'BOK', name: 'Bokkos' },
        { code: 'LANG', name: 'Langtang' },
        { code: 'PAN', name: 'Pankshin' },
        { code: 'SHEN', name: 'Shendam' }
      ]
    },
    { code: 'RI', name: 'Rivers', type: 'state',
      cities: [
        { code: 'PORT', name: 'Port Harcourt' },
        { code: 'BON', name: 'Bonny' },
        { code: 'OMOK', name: 'Omoku' },
        { code: 'DEG', name: 'Degema' },
        { code: 'AHA', name: 'Ahoada' }
      ]
    },
    { code: 'SO', name: 'Sokoto', type: 'state',
      cities: [
        { code: 'SOK', name: 'Sokoto' },
        { code: 'BIN', name: 'Birnin Kebbi' },
        { code: 'GUM', name: 'Gummi' },
        { code: 'TANG', name: 'Tangaza' },
        { code: 'WAM', name: 'Wamakko' }
      ]
    },
    { code: 'TA', name: 'Taraba', type: 'state',
      cities: [
        { code: 'JAL', name: 'Jalingo' },
        { code: 'WUK', name: 'Wukari' },
        { code: 'GASS', name: 'Gassol' },
        { code: 'TAK', name: 'Takum' },
        { code: 'SADA', name: 'Sadauna' }
      ]
    },
    { code: 'YO', name: 'Yobe', type: 'state',
      cities: [
        { code: 'DAM', name: 'Damaturu' },
        { code: 'GASH', name: 'Gashua' },
        { code: 'GEO', name: 'Geidam' },
        { code: 'POT', name: 'Potiskum' },
        { code: 'GUD', name: 'Gujba' }
      ]
    },
    { code: 'ZA', name: 'Zamfara', type: 'state',
      cities: [
        { code: 'GUSA', name: 'Gusau' },
        { code: 'KAW', name: 'Kaura Namoda' },
        { code: 'ANK', name: 'Anka' },
        { code: 'TAL', name: 'Talata Mafara' },
        { code: 'BIR', name: 'Birnin Magaji' }
      ]
    }
  ]
};

export default nigeria;
