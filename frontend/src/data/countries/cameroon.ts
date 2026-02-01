/**
 * Cameroon country data with regions, cities, and tax information
 */

import { Country } from './index';

export const cameroon: Country = {
    code: 'CM',
    name: 'Cameroon',
    taxInfo: { standardRate: 19.25, taxName: 'VAT', currency: 'XAF', region: 'MEA' },
    provinces: [
      { code: 'ADA', name: 'Adamaoua',
        cities: [
          { code: 'NGA', name: 'Ngaoundéré' },
          { code: 'MEI', name: 'Meiganga' },
          { code: 'TIB', name: 'Tibati' },
          { code: 'NDO', name: 'Ngaoundal' },
          { code: 'BAN', name: 'Bankim' },
          { code: 'TIG', name: 'Tignère' },
          { code: 'DIR', name: 'Dir' },
          { code: 'GAL', name: 'Galim' },
          { code: 'MAY', name: 'Mayo-Baléo' },
          { code: 'MART', name: 'Martap' }
        ]
      },
      { code: 'CEN', name: 'Centre',
        cities: [
          { code: 'YAO', name: 'Yaoundé' },
          { code: 'BAF', name: 'Bafia' },
          { code: 'BAF2', name: 'Bafoussam' },
          { code: 'EBO', name: 'Ebolowa' },
          { code: 'KRI', name: 'Kribi' },
          { code: 'MON', name: 'Monatele' },
          { code: 'MBO', name: 'Mbankomo' },
          { code: 'OBAL', name: 'Obala' },
          { code: 'NGO', name: 'Ngoumou' },
          { code: 'NOM', name: 'Nkondjock' }
        ]
      },
      { code: 'EST', name: 'East',
        cities: [
          { code: 'BERT', name: 'Bertoua' },
          { code: 'BAT', name: 'Baturi' },
          { code: 'ABO', name: 'Abong-Mbang' },
          { code: 'DOU', name: 'Doumé' },
          { code: 'MOL', name: 'Moloundou' },
          { code: 'YOK', name: 'Yokadouma' },
          { code: 'GAR', name: 'Garoua-Boulaï' },
          { code: 'BET', name: 'Bélabo' },
          { code: 'DIM', name: 'Dimako' },
          { code: 'LOM', name: 'Lomié' }
        ]
      },
      { code: 'EXT', name: 'Extreme North',
        cities: [
          { code: 'MAR', name: 'Maroua' },
          { code: 'KOU', name: 'Kousséri' },
          { code: 'MOK', name: 'Mokolo' },
          { code: 'YAG', name: 'Yagoua' },
          { code: 'MORA', name: 'Mora' },
          { code: 'KAE', name: 'Kaélé' },
          { code: 'BLA', name: 'Blangoua' },
          { code: 'KOU2', name: 'Kousséri' },
          { code: 'MOK2', name: 'Mokolo' },
          { code: 'YAG2', name: 'Yagoua' }
        ]
      },
      { code: 'LIT', name: 'Littoral',
        cities: [
          { code: 'DOU', name: 'Douala' },
          { code: 'ED', name: 'Edéa' },
          { code: 'KRIB', name: 'Kribi' },
          { code: 'NKON', name: 'Nkongsamba' },
          { code: 'BAM', name: 'Bamenda' },
          { code: 'BUEA', name: 'Buea' },
          { code: 'LIM', name: 'Limbe' },
          { code: 'MEL', name: 'Melong' },
          { code: 'NKO', name: 'Nkongsamba' },
          { code: 'SANT', name: 'Santchou' }
        ]
      },
      { code: 'NOR', name: 'North',
        cities: [
          { code: 'GAR', name: 'Garoua' },
          { code: 'GAR2', name: 'Garoua-Boulaï' },
          { code: 'GUIM', name: 'Guider' },
          { code: 'LAG', name: 'Lagdo' },
          { code: 'TCH', name: 'Tcholliré' },
          { code: 'REY', name: 'Rey Bouba' },
          { code: 'TIB', name: 'Tibati' },
          { code: 'NGA', name: 'Ngaoundéré' },
          { code: 'MEI', name: 'Meiganga' },
          { code: 'NDO', name: 'Ngaoundal' }
        ]
      },
      { code: 'NWO', name: 'Northwest',
        cities: [
          { code: 'BAM', name: 'Bamenda' },
          { code: 'KUM', name: 'Kumbo' },
          { code: 'MBU', name: 'Mbouda' },
          { code: 'NDOP', name: 'Ndop' },
          { code: 'KUM2', name: 'Kumbo' },
          { code: 'BAM2', name: 'Bamenda' },
          { code: 'KUM3', name: 'Kumbo' },
          { code: 'MBU2', name: 'Mbouda' },
          { code: 'NDOP2', name: 'Ndop' },
          { code: 'KUM4', name: 'Kumbo' }
        ]
      },
      { code: 'SUD', name: 'South',
        cities: [
          { code: 'EBOL', name: 'Ebolowa' },
          { code: 'KRI', name: 'Kribi' },
          { code: 'SANG', name: 'Sangmélima' },
          { code: 'LOL', name: 'Lolodorf' },
          { code: 'MVO', name: 'Mvomeka\'a' },
          { code: 'AKO', name: 'Akono' },
          { code: 'BIA', name: 'Biakoa' },
          { code: 'MEK', name: 'Mekas' },
          { code: 'NGO', name: 'Ngoulemakong' },
          { code: 'NOM', name: 'Nkondjock' }
        ]
      },
      { code: 'SWE', name: 'Southwest',
        cities: [
          { code: 'BUEA', name: 'Buea' },
          { code: 'LIM', name: 'Limbe' },
          { code: 'KUM', name: 'Kumba' },
          { code: 'MAM', name: 'Mamfe' },
          { code: 'MUT', name: 'Mutengene' },
          { code: 'TIKO', name: 'Tiko' },
          { code: 'EDEA', name: 'Edéa' },
          { code: 'KOU', name: 'Kumba' },
          { code: 'MAM2', name: 'Mamfe' },
          { code: 'MUT2', name: 'Mutengene' }
        ]
      },
      { code: 'WES', name: 'West',
        cities: [
          { code: 'BAF', name: 'Bafoussam' },
          { code: 'DSCH', name: 'Dschang' },
          { code: 'FOT', name: 'Fotouni' },
          { code: 'KAM', name: 'Kamna' },
          { code: 'KOU', name: 'Kouoptamo' },
          { code: 'MAK', name: 'Makénéné' },
          { code: 'MBA', name: 'Mbouda' },
          { code: 'BAM', name: 'Bamenda' },
          { code: 'BAF2', name: 'Bafoussam' },
          { code: 'DSCH2', name: 'Dschang' }
        ]
      }
    ]
  };
