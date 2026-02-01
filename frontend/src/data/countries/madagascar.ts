/**
 * Madagascar country data with regions, cities, and tax information
 */

import { Country } from './index';

export const madagascar: Country = {
    code: 'MG',
    name: 'Madagascar',
    taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'MGA', region: 'MEA' },
    provinces: [
      { code: 'ANA', name: 'Analamanga',
        cities: [
          { code: 'ANT', name: 'Antananarivo' },
          { code: 'AMB', name: 'Ambatolampy' },
          { code: 'AMB2', name: 'Ambatondrazaka' },
          { code: 'AND', name: 'Andramasina' },
          { code: 'ANJ', name: 'Anjozorobe' },
          { code: 'ANK', name: 'Ankazobe' },
          { code: 'ANT2', name: 'Antanifotsy' },
          { code: 'BEH', name: 'Behenjy' },
          { code: 'FAR', name: 'Faratsiho' },
          { code: 'MIA', name: 'Miadanandriana' }
        ]
      },
      { code: 'ATS', name: 'Atsimo-Andrefana',
        cities: [
          { code: 'TOL', name: 'Toliara' },
          { code: 'AMB', name: 'Ambovombe' },
          { code: 'BEK', name: 'Bekily' },
          { code: 'BET', name: 'Betioky' },
          { code: 'MOR', name: 'Morombe' },
          { code: 'SAK', name: 'Sakaraha' },
          { code: 'TOL2', name: 'Toliara' },
          { code: 'AMB2', name: 'Amboasary' },
          { code: 'BEK2', name: 'Bekily' },
          { code: 'BET2', name: 'Betioky' }
        ]
      },
      { code: 'ATM', name: 'Atsimo-Atsinanana',
        cities: [
          { code: 'FAR', name: 'Farafangana' },
          { code: 'VOH', name: 'Vohemar' },
          { code: 'MAN', name: 'Manakara' },
          { code: 'IHOS', name: 'Ihosy' },
          { code: 'MAN2', name: 'Manantenina' },
          { code: 'VOH2', name: 'Vohilena' },
          { code: 'FAR2', name: 'Farafangana' },
          { code: 'MAN3', name: 'Manakara' },
          { code: 'IHOS2', name: 'Ihosy' },
          { code: 'MAN4', name: 'Manantenina' }
        ]
      },
      { code: 'ALA', name: 'Alaotra-Mangoro',
        cities: [
          { code: 'AMB', name: 'Ambatondrazaka' },
          { code: 'AND', name: 'Andilamena' },
          { code: 'AMP', name: 'Amparafaravola' },
          { code: 'MOR', name: 'Moramanga' },
          { code: 'VAV', name: 'Vavatenina' },
          { code: 'AMB2', name: 'Ambatolampy' },
          { code: 'AND2', name: 'Andramasina' },
          { code: 'ANJ', name: 'Anjozorobe' },
          { code: 'ANK', name: 'Ankazobe' },
          { code: 'ANT', name: 'Antananarivo' }
        ]
      },
      { code: 'ANA2', name: 'Analanjirofo',
        cities: [
          { code: 'TOA', name: 'Toamasina' },
          { code: 'AMB', name: 'Ambatondrazaka' },
          { code: 'FAR', name: 'Fenerive Est' },
          { code: 'MAN', name: 'Mananara Nord' },
          { code: 'MAR', name: 'Maroantsetra' },
          { code: 'VAV', name: 'Vavatenina' },
          { code: 'AMP', name: 'Amparafaravola' },
          { code: 'MOR', name: 'Moramanga' },
          { code: 'TOA2', name: 'Toamasina' },
          { code: 'FAR2', name: 'Fenerive Est' }
        ]
      },
      { code: 'BOR', name: 'Bongolava',
        cities: [
          { code: 'TSI', name: 'Tsiroanomandidy' },
          { code: 'MIAN', name: 'Miandrivazo' },
          { code: 'FIS', name: 'Fenoarivo Atsinanana' },
          { code: 'MAH', name: 'Mahasolo' },
          { code: 'TSI2', name: 'Tsiroanomandidy' },
          { code: 'MIAN2', name: 'Miandrivazo' },
          { code: 'FIS2', name: 'Fenoarivo Atsinanana' },
          { code: 'MAH2', name: 'Mahasolo' },
          { code: 'TSI3', name: 'Tsiroanomandidy' },
          { code: 'MIAN3', name: 'Miandrivazo' }
        ]
      },
      { code: 'DI', name: 'Diana',
        cities: [
          { code: 'ANTS', name: 'Antsiranana' },
          { code: 'AMB', name: 'Ambanja' },
          { code: 'AND', name: 'Andapa' },
          { code: 'SAM', name: 'Sambava' },
          { code: 'VOH', name: 'Vohemar' },
          { code: 'ANTS2', name: 'Antsiranana' },
          { code: 'AMB2', name: 'Ambanja' },
          { code: 'AND2', name: 'Andapa' },
          { code: 'SAM2', name: 'Sambava' },
          { code: 'VOH2', name: 'Vohemar' }
        ]
      },
      { code: 'IHOR', name: 'Ihorombe',
        cities: [
          { code: 'IHOS', name: 'Ihosy' },
          { code: 'IHOR', name: 'Ihohibe' },
          { code: 'VOH', name: 'Vohimena' },
          { code: 'BEN', name: 'Benoa' },
          { code: 'VOH2', name: 'Vohimena' },
          { code: 'BEN2', name: 'Benoa' },
          { code: 'IHOS2', name: 'Ihosy' },
          { code: 'IHOR2', name: 'Ihohibe' },
          { code: 'VOH3', name: 'Vohimena' },
          { code: 'BEN3', name: 'Benoa' }
        ]
      },
      { code: 'ITA', name: 'Itasy',
        cities: [
          { code: 'MIA', name: 'Miarinarivo' },
          { code: 'ARIV', name: 'Arivonimamo' },
          { code: 'SOA', name: 'Soavinandriana' },
          { code: 'MIA2', name: 'Miarinarivo' },
          { code: 'ARIV2', name: 'Arivonimamo' },
          { code: 'SOA2', name: 'Soavinandriana' },
          { code: 'MIA3', name: 'Miarinarivo' },
          { code: 'ARIV3', name: 'Arivonimamo' },
          { code: 'SOA3', name: 'Soavinandriana' },
          { code: 'MIA4', name: 'Miarinarivo' }
        ]
      },
      { code: 'MEL', name: 'Melaky',
        cities: [
          { code: 'MAH', name: 'Mahajanga' },
          { code: 'MAV', name: 'Maintirano' },
          { code: 'SOA', name: 'Soalala' },
          { code: 'ANT', name: 'Antsalova' },
          { code: 'MAH2', name: 'Mahajanga' },
          { code: 'MAV2', name: 'Maintirano' },
          { code: 'SOA2', name: 'Soalala' },
          { code: 'ANT2', name: 'Antsalova' },
          { code: 'MAH3', name: 'Mahajanga' },
          { code: 'MAV3', name: 'Maintirano' }
        ]
      },
      { code: 'MEN', name: 'Menabe',
        cities: [
          { code: 'MOR', name: 'Morondava' },
          { code: 'MIAN', name: 'Miandrivazo' },
          { code: 'MAH', name: 'Mahabo' },
          { code: 'BEL', name: 'Belon i Tsiribihina' },
          { code: 'MOR2', name: 'Morondava' },
          { code: 'MIAN2', name: 'Miandrivazo' },
          { code: 'MAH2', name: 'Mahabo' },
          { code: 'BEL2', name: 'Belon i Tsiribihina' },
          { code: 'MOR3', name: 'Morondava' },
          { code: 'MIAN3', name: 'Miandrivazo' }
        ]
      },
      { code: 'SOF', name: 'Sofia',
        cities: [
          { code: 'ANT', name: 'Antsohihy' },
          { code: 'BEA', name: 'Bealanana' },
          { code: 'BOR', name: 'Boriziny' },
          { code: 'MAND', name: 'Mandritsara' },
          { code: 'MAE', name: 'Maevatanana' },
          { code: 'ANT2', name: 'Antsohihy' },
          { code: 'BEA2', name: 'Bealanana' },
          { code: 'BOR2', name: 'Boriziny' },
          { code: 'MAND2', name: 'Mandritsara' },
          { code: 'MAE2', name: 'Maevatanana' }
        ]
      },
      { code: 'SAV', name: 'Sava',
        cities: [
          { code: 'SAM', name: 'Sambava' },
          { code: 'AND', name: 'Andapa' },
          { code: 'ANT', name: 'Antalaha' },
          { code: 'VOH', name: 'Vohemar' },
          { code: 'SAM2', name: 'Sambava' },
          { code: 'AND2', name: 'Andapa' },
          { code: 'ANT2', name: 'Antalaha' },
          { code: 'VOH2', name: 'Vohemar' },
          { code: 'SAM3', name: 'Sambava' },
          { code: 'AND3', name: 'Andapa' }
        ]
      },
      { code: 'UPP', name: 'Upper Matsiatra',
        cities: [
          { code: 'FIA', name: 'Fianarantsoa' },
          { code: 'AMB', name: 'Ambalavao' },
          { code: 'AMB2', name: 'Ambohimahasoa' },
          { code: 'FAR', name: 'Fianarantsoa' },
          { code: 'AMB3', name: 'Ambalavao' },
          { code: 'AMB4', name: 'Ambohimahasoa' },
          { code: 'FAR2', name: 'Fianarantsoa' },
          { code: 'AMB5', name: 'Ambalavao' },
          { code: 'AMB6', name: 'Ambohimahasoa' },
          { code: 'FAR3', name: 'Fianarantsoa' }
        ]
      },
      { code: 'VAT', name: 'Vakinankaratra',
        cities: [
          { code: 'ANT', name: 'Antsirabe' },
          { code: 'AMB', name: 'Ambatolampy' },
          { code: 'ANT2', name: 'Antanifotsy' },
          { code: 'FAR', name: 'Faratsiho' },
          { code: 'ANT3', name: 'Antsirabe' },
          { code: 'AMB2', name: 'Ambatolampy' },
          { code: 'ANT4', name: 'Antanifotsy' },
          { code: 'FAR2', name: 'Faratsiho' },
          { code: 'ANT5', name: 'Antsirabe' },
          { code: 'AMB3', name: 'Ambatolampy' }
        ]
      },
      { code: 'ANT', name: 'Antananarivo',
        cities: [
          { code: 'ANT', name: 'Antananarivo' },
          { code: 'AMB', name: 'Ambatolampy' },
          { code: 'AMB2', name: 'Ambatondrazaka' },
          { code: 'AND', name: 'Andramasina' },
          { code: 'ANJ', name: 'Anjozorobe' },
          { code: 'ANK', name: 'Ankazobe' },
          { code: 'ANT2', name: 'Antanifotsy' },
          { code: 'BEH', name: 'Behenjy' },
          { code: 'FAR', name: 'Faratsiho' },
          { code: 'MIA', name: 'Miadanandriana' }
        ]
      },
      { code: 'ANT2', name: 'Antsiranana',
        cities: [
          { code: 'ANTS', name: 'Antsiranana' },
          { code: 'AMB', name: 'Ambanja' },
          { code: 'AND', name: 'Andapa' },
          { code: 'SAM', name: 'Sambava' },
          { code: 'VOH', name: 'Vohemar' },
          { code: 'ANTS2', name: 'Antsiranana' },
          { code: 'AMB2', name: 'Ambanja' },
          { code: 'AND2', name: 'Andapa' },
          { code: 'SAM2', name: 'Sambava' },
          { code: 'VOH2', name: 'Vohemar' }
        ]
      },
      { code: 'ANT3', name: 'Antsirabe',
        cities: [
          { code: 'ANT', name: 'Antsirabe' },
          { code: 'AMB', name: 'Ambatolampy' },
          { code: 'ANT2', name: 'Antanifotsy' },
          { code: 'FAR', name: 'Faratsiho' },
          { code: 'ANT3', name: 'Antsirabe' },
          { code: 'AMB2', name: 'Ambatolampy' },
          { code: 'ANT4', name: 'Antanifotsy' },
          { code: 'FAR2', name: 'Faratsiho' },
          { code: 'ANT5', name: 'Antsirabe' },
          { code: 'AMB3', name: 'Ambatolampy' }
        ]
      },
      { code: 'TOA', name: 'Toamasina',
        cities: [
          { code: 'TOA', name: 'Toamasina' },
          { code: 'AMB', name: 'Ambatondrazaka' },
          { code: 'FAR', name: 'Fenerive Est' },
          { code: 'MAN', name: 'Mananara Nord' },
          { code: 'MAR', name: 'Maroantsetra' },
          { code: 'VAV', name: 'Vavatenina' },
          { code: 'AMP', name: 'Amparafaravola' },
          { code: 'MOR', name: 'Moramanga' },
          { code: 'TOA2', name: 'Toamasina' },
          { code: 'FAR2', name: 'Fenerive Est' }
        ]
      },
      { code: 'TOA2', name: 'Toliara',
        cities: [
          { code: 'TOL', name: 'Toliara' },
          { code: 'AMB', name: 'Ambovombe' },
          { code: 'BEK', name: 'Bekily' },
          { code: 'BET', name: 'Betioky' },
          { code: 'MOR', name: 'Morombe' },
          { code: 'SAK', name: 'Sakaraha' },
          { code: 'TOL2', name: 'Toliara' },
          { code: 'AMB2', name: 'Amboasary' },
          { code: 'BEK2', name: 'Bekily' },
          { code: 'BET2', name: 'Betioky' }
        ]
      },
      { code: 'MAH', name: 'Mahajanga',
        cities: [
          { code: 'MAH', name: 'Mahajanga' },
          { code: 'MAV', name: 'Maintirano' },
          { code: 'SOA', name: 'Soalala' },
          { code: 'ANT', name: 'Antsalova' },
          { code: 'MAH2', name: 'Mahajanga' },
          { code: 'MAV2', name: 'Maintirano' },
          { code: 'SOA2', name: 'Soalala' },
          { code: 'ANT2', name: 'Antsalova' },
          { code: 'MAH3', name: 'Mahajanga' },
          { code: 'MAV3', name: 'Maintirano' }
        ]
      },
      { code: 'MAH2', name: 'Mahajanga',
        cities: [
          { code: 'MAH', name: 'Mahajanga' },
          { code: 'MAV', name: 'Maintirano' },
          { code: 'SOA', name: 'Soalala' },
          { code: 'ANT', name: 'Antsalova' },
          { code: 'MAH2', name: 'Mahajanga' },
          { code: 'MAV2', name: 'Maintirano' },
          { code: 'SOA2', name: 'Soalala' },
          { code: 'ANT2', name: 'Antsalova' },
          { code: 'MAH3', name: 'Mahajanga' },
          { code: 'MAV3', name: 'Maintirano' }
        ]
      },
      { code: 'FIA', name: 'Fianarantsoa',
        cities: [
          { code: 'FIA', name: 'Fianarantsoa' },
          { code: 'AMB', name: 'Ambalavao' },
          { code: 'AMB2', name: 'Ambohimahasoa' },
          { code: 'FAR', name: 'Fianarantsoa' },
          { code: 'AMB3', name: 'Ambalavao' },
          { code: 'AMB4', name: 'Ambohimahasoa' },
          { code: 'FAR2', name: 'Fianarantsoa' },
          { code: 'AMB5', name: 'Ambalavao' },
          { code: 'AMB6', name: 'Ambohimahasoa' },
          { code: 'FAR3', name: 'Fianarantsoa' }
        ]
      }
    ]
  };
