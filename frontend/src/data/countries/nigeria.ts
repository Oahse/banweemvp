/**
 * Nigeria country data with states, cities, and tax information
 */

import { Country } from './index';

export const nigeria: Country = {
    code: 'NG',
    name: 'Nigeria',
    taxInfo: { standardRate: 7.5, taxName: 'VAT', currency: 'NGN', region: 'MEA' },
    provinces: [
      { code: 'AB', name: 'Abia',
        cities: [
          { code: 'UMU', name: 'Umuahia' },
          { code: 'ABA', name: 'Aba' },
          { code: 'AFI', name: 'Afikpo' },
          { code: 'OHAF', name: 'Ohafia' },
          { code: 'BEN', name: 'Bende' },
          { code: 'ISU', name: 'Isuikwuato' },
          { code: 'UKW', name: 'Ukwun' },
          { code: 'ARO', name: 'Arochukwu' },
          { code: 'OBIO', name: 'Obioma' },
          { code: 'IGB', name: 'Igbere' }
        ]
      },
      { code: 'AD', name: 'Adamawa',
        cities: [
          { code: 'YOL', name: 'Yola' },
          { code: 'MUB', name: 'Mubi' },
          { code: 'NUM', name: 'Numan' },
          { code: 'JIM', name: 'Jimeta' },
          { code: 'GUY', name: 'Guyuk' },
          { code: 'LAM', name: 'Lamurde' },
          { code: 'MAD', name: 'Madagali' },
          { code: 'MIC', name: 'Michika' },
          { code: 'SON', name: 'Song' },
          { code: 'DEM', name: 'Demsa' }
        ]
      },
      { code: 'AK', name: 'Akwa Ibom',
        cities: [
          { code: 'UYO', name: 'Uyo' },
          { code: 'IKO', name: 'Ikot Ekpene' },
          { code: 'ETI', name: 'Eket' },
          { code: 'ORO', name: 'Oron' },
          { code: 'IBI', name: 'Ibiono' },
          { code: 'ITU', name: 'Itu' },
          { code: 'ONNA', name: 'Onna' },
          { code: 'ESS', name: 'Essien Udim' },
          { code: 'NSIT', name: 'Nsit Atai' },
          { code: 'INI', name: 'Ini' }
        ]
      },
      { code: 'AN', name: 'Anambra',
        cities: [
          { code: 'AWK', name: 'Awka' },
          { code: 'ONI', name: 'Onitsha' },
          { code: 'NNEW', name: 'Nnewi' },
          { code: 'Ekw', name: 'Ekwulobia' },
          { code: 'AGU', name: 'Aguleri' },
          { code: 'OGU', name: 'Ogidi' },
          { code: 'NJA', name: 'Njikoka' },
          { code: 'IDE', name: 'Ideani' },
          { code: 'OBA', name: 'Oba' },
          { code: 'ICH', name: 'Ichida' }
        ]
      },
      { code: 'BA', name: 'Bauchi',
        cities: [
          { code: 'BAU', name: 'Bauchi' },
          { code: 'AZA', name: 'Azare' },
          { code: 'KAT', name: 'Kafin Madaki' },
          { code: 'MIS', name: 'Misau' },
          { code: 'ZAK', name: 'Zaki' },
          { code: 'JAM', name: 'Jama\'are' },
          { code: 'GAMB', name: 'Gamawa' },
          { code: 'DAS', name: ' Dass' },
          { code: 'TAF', name: 'Tafawa Balewa' },
          { code: 'BOG', name: 'Bogoro' }
        ]
      },
      { code: 'BY', name: 'Bayelsa',
        cities: [
          { code: 'YEN', name: 'Yenagoa' },
          { code: 'NEM', name: 'Nembe' },
          { code: 'BRAS', name: 'Brass' },
          { code: 'SAG', name: 'Sagbama' },
          { code: 'EKE', name: 'Ekeremor' },
          { code: 'KOL', name: 'Kolokuma' },
          { code: 'OPU', name: 'Opuama' },
          { code: 'SOU', name: 'Southern Ijaw' },
          { code: 'NEM2', name: 'Nembe' },
          { code: 'TUA', name: 'Tuakomo' }
        ]
      },
      { code: 'BN', name: 'Benue',
        cities: [
          { code: 'MAK', name: 'Makurdi' },
          { code: 'OTU', name: 'Otukpo' },
          { code: 'GBE', name: 'Gboko' },
          { code: 'KATS', name: 'Katsina Ala' },
          { code: 'VAN', name: 'Vandeikya' },
          { code: 'AGA', name: 'Agatu' },
          { code: 'APA', name: 'Apa' },
          { code: 'BUR', name: 'Buruku' },
          { code: 'GUM', name: 'Guma' },
          { code: 'GWE', name: 'Gwer West' }
        ]
      },
      { code: 'BO', name: 'Borno',
        cities: [
          { code: 'MAI', name: 'Maiduguri' },
          { code: 'BAMA', name: 'Bama' },
          { code: 'Biu', name: 'Biu' },
          { code: 'DAM', name: 'Damaturu' },
          { code: 'MONG', name: 'Monguno' },
          { code: 'GWOZ', name: 'Gwoza' },
          { code: 'KUK', name: 'Kukawa' },
          { code: 'KAG', name: 'Kaga' },
          { code: 'SHAN', name: 'Shani' },
          { code: 'MART', name: 'Martari' }
        ]
      },
      { code: 'CR', name: 'Cross River',
        cities: [
          { code: 'CAL', name: 'Calabar' },
          { code: 'IKO', name: 'Ikom' },
          { code: 'OGU', name: 'Ogoja' },
          { code: 'OBUD', name: 'Obudu' },
          { code: 'OBUB', name: 'Obubra' },
          { code: 'YAK', name: 'Yakurr' },
          { code: 'BET', name: 'Bete' },
          { code: 'AKP', name: 'Akamkpa' },
          { code: 'BIAK', name: 'Biakpan' },
          { code: 'LEP', name: 'Lepan' }
        ]
      },
      { code: 'DE', name: 'Delta',
        cities: [
          { code: 'ASB', name: 'Asaba' },
          { code: 'WAR', name: 'Warri' },
          { code: 'UGB', name: 'Ughelli' },
          { code: 'SAPE', name: 'Sapele' },
          { code: 'AGB', name: 'Agbor' },
          { code: 'OBI', name: 'Obiakpor' },
          { code: 'BUR', name: 'Burutu' },
          { code: 'ETH', name: 'Ethiope' },
          { code: 'ISE', name: 'Isoko' },
          { code: 'NDOK', name: 'Ndokwa' }
        ]
      },
      { code: 'EB', name: 'Ebonyi',
        cities: [
          { code: 'ABA', name: 'Abakaliki' },
          { code: 'AFI', name: 'Afikpo' },
          { code: 'ONU', name: 'Onueke' },
          { code: 'EBONY', name: 'Ebonyi' },
          { code: 'IKWO', name: 'Ikwo' },
          { code: 'Ish', name: 'Ishielu' },
          { code: 'IZZ', name: 'Izzi' },
          { code: 'OHAN', name: 'Ohaozara' },
          { code: 'OHU', name: 'Ohaukwu' },
          { code: 'ONIC', name: 'Onicha' }
        ]
      },
      { code: 'ED', name: 'Edo',
        cities: [
          { code: 'BEN', name: 'Benin City' },
          { code: 'EKP', name: 'Ekpoma' },
          { code: 'UGB', name: 'Ugbenu' },
          { code: 'AKP', name: 'Akpoma' },
          { code: 'FUG', name: 'Fugar' },
          { code: 'IRR', name: 'Irrua' },
          { code: 'SABO', name: 'Sabongidda' },
          { code: 'OKP', name: 'Okpella' },
          { code: 'USE', name: 'Usen' },
          { code: 'IGB', name: 'Igueben' }
        ]
      },
      { code: 'EK', name: 'Ekiti',
        cities: [
          { code: 'ADO', name: 'Ado Ekiti' },
          { code: 'IKER', name: 'Ikere' },
          { code: 'EKI', name: 'Ekiti' },
          { code: 'OTU', name: 'Otun' },
          { code: 'ISE', name: 'Ise' },
          { code: 'EMU', name: 'Emure' },
          { code: 'IDA', name: 'Ido' },
          { code: 'OYE', name: 'Oye' },
          { code: 'MOP', name: 'Moba' },
          { code: 'IKO', name: 'Ikole' }
        ]
      },
      { code: 'EN', name: 'Enugu',
        cities: [
          { code: 'ENU', name: 'Enugu' },
          { code: 'NSUK', name: 'Nsukka' },
          { code: 'AWK', name: 'Awka' },
          { code: 'OJI', name: 'Oji River' },
          { code: 'UGW', name: 'Ugwuoba' },
          { code: 'IGB', name: 'Igboeze' },
          { code: 'UDI', name: 'Udi' },
          { code: 'EZE', name: 'Ezeagu' },
          { code: 'ANI', name: 'Aninri' },
          { code: 'NKA', name: 'Nkanu' }
        ]
      },
      { code: 'GO', name: 'Gombe',
        cities: [
          { code: 'GOM', name: 'Gombe' },
          { code: 'KALT', name: 'Kaltungo' },
          { code: 'BAL', name: 'Balanga' },
          { code: 'BILL', name: 'Billiri' },
          { code: 'AKK', name: 'Akko' },
          { code: 'DUK', name: 'Dukku' },
          { code: 'FUN', name: 'Funakaye' },
          { code: 'KWAN', name: 'Kwami' },
          { code: 'SHO', name: 'Shongom' },
          { code: 'NFA', name: 'Nafada' }
        ]
      },
      { code: 'IM', name: 'Imo',
        cities: [
          { code: 'OWE', name: 'Owerri' },
          { code: 'ORL', name: 'Orlu' },
          { code: 'OKI', name: 'Okigwe' },
          { code: 'ORU', name: 'Oru' },
          { code: 'MBA', name: 'Mbaise' },
          { code: 'OGU', name: 'Oguta' },
          { code: 'NSU', name: 'Nsu' },
          { code: 'EHIME', name: 'Ehime' },
          { code: 'IDE', name: 'Ideato' },
          { code: 'OHA', name: 'Ohaji' }
        ]
      },
      { code: 'JI', name: 'Jigawa',
        cities: [
          { code: 'DUT', name: 'Dutse' },
          { code: 'HAD', name: 'Hadejia' },
          { code: 'KAZ', name: 'Kazaure' },
          { code: 'RING', name: 'Ringim' },
          { code: 'BIR', name: 'Birnin Kudu' },
          { code: 'GUM', name: 'Gumel' },
          { code: 'GWAR', name: 'Gwaram' },
          { code: 'GURI', name: 'Guri' },
          { code: 'KIRI', name: 'Kiri Kasama' },
          { code: 'MAL', name: 'Madori' }
        ]
      },
      { code: 'KD', name: 'Kaduna',
        cities: [
          { code: 'KAD', name: 'Kaduna' },
          { code: 'ZAR', name: 'Zaria' },
          { code: 'KAF', name: 'Kafanchan' },
          { code: 'KAG', name: 'Kagoro' },
          { code: 'MAK', name: 'Makarfi' },
          { code: 'SAM', name: 'Samalia' },
          { code: 'BIR', name: 'Birnin Gwari' },
          { code: 'GWA', name: 'Giwa' },
          { code: 'KACH', name: 'Kachia' },
          { code: 'ZANG', name: 'Zangon Kataf' }
        ]
      },
      { code: 'KN', name: 'Kano',
        cities: [
          { code: 'KAN', name: 'Kano' },
          { code: 'DAN', name: 'Dambatta' },
          { code: 'GAY', name: 'Gaya' },
          { code: 'GEZ', name: 'Gezawa' },
          { code: 'GWAR', name: 'Gwarzo' },
          { code: 'KABO', name: 'Kabo' },
          { code: 'KANO', name: 'Kano Municipal' },
          { code: 'KAR', name: 'Karaye' },
          { code: 'KUM', name: 'Kumbotso' },
          { code: 'MIN', name: 'Minjibir' }
        ]
      },
      { code: 'KT', name: 'Katsina',
        cities: [
          { code: 'KAT', name: 'Katsina' },
          { code: 'DUT', name: 'Dutsinma' },
          { code: 'FUNT', name: 'Funtua' },
          { code: 'MAL', name: 'Malumfashi' },
          { code: 'BAK', name: 'Bakori' },
          { code: 'BAT', name: 'Batagarawa' },
          { code: 'BAU', name: 'Batsari' },
          { code: 'BIND', name: 'Bindawa' },
          { code: 'CHA', name: 'Charanchi' },
          { code: 'DAN', name: 'Danja' }
        ]
      },
      { code: 'KE', name: 'Kebbi',
        cities: [
          { code: 'BIR', name: 'Birnin Kebbi' },
          { code: 'ARGU', name: 'Argungu' },
          { code: 'YEL', name: 'Yelwa' },
          { code: 'ZUR', name: 'Zuru' },
          { code: 'BAG', name: 'Bagudo' },
          { code: 'DAK', name: 'Dakingari' },
          { code: 'GUM', name: 'Gwandu' },
          { code: 'JEG', name: 'Jega' },
          { code: 'KAL', name: 'Kalgo' },
          { code: 'MAI', name: 'Maiyama' }
        ]
      },
      { code: 'KO', name: 'Kogi',
        cities: [
          { code: 'LOK', name: 'Lokoja' },
          { code: 'OKA', name: 'Okene' },
          { code: 'KAB', name: 'Kabba' },
          { code: 'IDAH', name: 'Idah' },
          { code: 'DEK', name: 'Dekina' },
          { code: 'OGU', name: 'Ogori' },
          { code: 'MOP', name: 'Mopa' },
          { code: 'BASS', name: 'Bassa' },
          { code: 'IBAJ', name: 'Ibaji' },
          { code: 'ANK', name: 'Ankpa' }
        ]
      },
      { code: 'LA', name: 'Lagos',
        cities: [
          { code: 'IKE', name: 'Ikeja' },
          { code: 'LAG', name: 'Lagos Island' },
          { code: 'BAD', name: 'Badagry' },
          { code: 'EPE', name: 'Epe' },
          { code: 'IKO', name: 'Ikorodu' },
          { code: 'MUS', name: 'Mushin' },
          { code: 'SURU', name: 'Surulere' },
          { code: 'OSH', name: 'Oshodi' },
          { code: 'APA', name: 'Apapa' },
          { code: 'AGE', name: 'Agege' }
        ]
      },
      { code: 'NA', name: 'Nasarawa',
        cities: [
          { code: 'KEF', name: 'Keffi' },
          { code: 'LAF', name: 'Lafia' },
          { code: 'AKW', name: 'Akwanga' },
          { code: 'WUK', name: 'Wukari' },
          { code: 'KAR', name: 'Karu' },
          { code: 'NAS', name: 'Nasarawa' },
          { code: 'DOM', name: 'Doma' },
          { code: 'OB', name: 'Obi' },
          { code: 'TOTO', name: 'Toto' },
          { code: 'KOK', name: 'Kokona' }
        ]
      },
      { code: 'NI', name: 'Niger',
        cities: [
          { code: 'MIN', name: 'Minna' },
          { code: 'SULE', name: 'Suleja' },
          { code: 'BIDA', name: 'Bida' },
          { code: 'KONT', name: 'Kontagora' },
          { code: 'LAP', name: 'Lapai' },
          { code: 'RAB', name: 'Raba' },
          { code: 'BORG', name: 'Borgu' },
          { code: 'MAS', name: 'Mashegu' },
          { code: 'MOK', name: 'Mokwa' },
          { code: 'PAI', name: 'Paikoro' }
        ]
      },
      { code: 'OG', name: 'Ogun',
        cities: [
          { code: 'ABE', name: 'Abeokuta' },
          { code: 'IJE', name: 'Ijebu-Ode' },
          { code: 'OTA', name: 'Otta' },
          { code: 'SAG', name: 'Sagamu' },
          { code: 'ILAR', name: 'Ilaro' },
          { code: 'IJEB', name: 'Ijebu-Igbo' },
          { code: 'REMO', name: 'Remo' },
          { code: 'IFO', name: 'Ifo' },
          { code: 'IPER', name: 'Iperu' },
          { code: 'SHAG', name: 'Shagamu' }
        ]
      },
      { code: 'ON', name: 'Ondo',
        cities: [
          { code: 'AKU', name: 'Akure' },
          { code: 'OND', name: 'Ondo' },
          { code: 'OKI', name: 'Okitipupa' },
          { code: 'OVO', name: 'Owo' },
          { code: 'IDE', name: 'Idanre' },
          { code: 'ILE', name: 'Ile-Oluji' },
          { code: 'OBA', name: 'Obanikoro' },
          { code: 'ISE', name: 'Ise' },
          { code: 'OYO', name: 'Oyo' },
          { code: 'AKO', name: 'Akoko' }
        ]
      },
      { code: 'OS', name: 'Osun',
        cities: [
          { code: 'OSO', name: 'Osogbo' },
          { code: 'ILE', name: 'Ile-Ife' },
          { code: 'IJE', name: 'Ijesha' },
          { code: 'EDE', name: 'Ede' },
          { code: 'IKIR', name: 'Ikirun' },
          { code: 'ILA', name: 'Ila' },
          { code: 'IKE', name: 'Ikeji' },
          { code: 'EJIG', name: 'Ejigbo' },
          { code: 'IFE', name: 'Ifetedo' },
          { code: 'BOL', name: 'Boluwaduro' }
        ]
      },
      { code: 'OY', name: 'Oyo',
        cities: [
          { code: 'IBA', name: 'Ibadan' },
          { code: 'OYO', name: 'Oyo' },
          { code: 'IBA', name: 'Ibarapa' },
          { code: 'OGO', name: 'Ogbomoso' },
          { code: 'ISE', name: 'Iseyin' },
          { code: 'SOK', name: 'Saki' },
          { code: 'OKE', name: 'Okeho' },
          { code: 'IGBO', name: 'Igbo-Ora' },
          { code: 'EGB', name: 'Egbeda' },
          { code: 'ONI', name: 'Oni' }
        ]
      },
      { code: 'PL', name: 'Plateau',
        cities: [
          { code: 'JOS', name: 'Jos' },
          { code: 'BARK', name: 'Barkin Ladi' },
          { code: 'BASS', name: 'Bassa' },
          { code: 'BOK', name: 'Bokkos' },
          { code: 'KAN', name: 'Kanke' },
          { code: 'KAN2', name: 'Kanam' },
          { code: 'KAN3', name: 'Kaura' },
          { code: 'KAN4', name: 'Kanam' },
          { code: 'MANG', name: 'Mangu' },
          { code: 'MIK', name: 'Mikang' }
        ]
      },
      { code: 'RI', name: 'Rivers',
        cities: [
          { code: 'PORT', name: 'Port Harcourt' },
          { code: 'BON', name: 'Bonny' },
          { code: 'BUG', name: 'Buguma' },
          { code: 'DEG', name: 'Degema' },
          { code: 'ELU', name: 'Elu' },
          { code: 'IKW', name: 'Ikwerre' },
          { code: 'OBIO', name: 'Obio-Akpor' },
          { code: 'OGU', name: 'Ogu' },
          { code: 'OKR', name: 'Okrika' },
          { code: 'OMA', name: 'Omagwa' }
        ]
      },
      { code: 'SO', name: 'Sokoto',
        cities: [
          { code: 'SOK', name: 'Sokoto' },
          { code: 'BOD', name: 'Bodinga' },
          { code: 'DAN', name: 'Dange' },
          { code: 'GADA', name: 'Gada' },
          { code: 'GOR', name: 'Goronyo' },
          { code: 'GUD', name: 'Gudu' },
          { code: 'ISA', name: 'Isa' },
          { code: 'KAB', name: 'Kebbe' },
          { code: 'KAW', name: 'Kware' },
          { code: 'RAB', name: 'Rabah' }
        ]
      },
      { code: 'TA', name: 'Taraba',
        cities: [
          { code: 'JAL', name: 'Jalingo' },
          { code: 'WUK', name: 'Wukari' },
          { code: 'SADA', name: 'Sadauna' },
          { code: 'GASH', name: 'Gashaka' },
          { code: 'TAK', name: 'Takum' },
          { code: 'KUR', name: 'Kurmi' },
          { code: 'BAL', name: 'Bali' },
          { code: 'DONG', name: 'Donga' },
          { code: 'YOR', name: 'Yorro' },
          { code: 'ZING', name: 'Zing' }
        ]
      },
      { code: 'YO', name: 'Yobe',
        cities: [
          { code: 'DAM', name: 'Damaturu' },
          { code: 'GASH', name: 'Gashua' },
          { code: 'GUM', name: 'Gumel' },
          { code: 'GEG', name: 'Geidam' },
          { code: 'BAY', name: 'Bayamari' },
          { code: 'BUL', name: 'Bulari' },
          { code: 'FUNE', name: 'Fune' },
          { code: 'GUL', name: 'Gulani' },
          { code: 'GUY', name: 'Gujuwa' },
          { code: 'KAR', name: 'Karasuwa' }
        ]
      },
      { code: 'ZA', name: 'Zamfara',
        cities: [
          { code: 'GUSA', name: 'Gusau' },
          { code: 'KAT', name: 'Kaura Namoda' },
          { code: 'TAL', name: 'Talata Mafara' },
          { code: 'ANK', name: 'Anka' },
          { code: 'BUN', name: 'Bungudu' },
          { code: 'BIR', name: 'Birnin Magaji' },
          { code: 'BUK', name: 'Bukkuyum' },
          { code: 'CHAM', name: 'Cham' },
          { code: 'MAR', name: 'Maradun' },
          { code: 'SHI', name: 'Shinkafi' }
        ]
      }
    ]
  };
