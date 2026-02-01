/**
 * Côte d'Ivoire country data with regions, cities, and tax information
 */

import { Country } from './index';

export const coteDIvoire: Country = {
    code: 'CI',
    name: 'Côte d\'Ivoire',
    taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'XOF', region: 'MEA' },
    provinces: [
      { code: 'ABID', name: 'Abidjan',
        cities: [
          { code: 'ABID', name: 'Abidjan' },
          { code: 'YOP', name: 'Yopougon' },
          { code: 'COC', name: 'Cocody' },
          { code: 'PLA', name: 'Plateau' },
          { code: 'TRE', name: 'Treichville' },
          { code: 'MARC', name: 'Marcory' },
          { code: 'ATTE', name: 'Attécoubé' },
          { code: 'ABO', name: 'Abobo' },
          { code: 'BING', name: 'Bingerville' },
          { code: 'GRAND', name: 'Grand-Bassam' }
        ]
      },
      { code: 'LAG', name: 'Lagunes',
        cities: [
          { code: 'ABID', name: 'Abidjan' },
          { code: 'YOP', name: 'Yopougon' },
          { code: 'COC', name: 'Cocody' },
          { code: 'PLA', name: 'Plateau' },
          { code: 'TRE', name: 'Treichville' },
          { code: 'MARC', name: 'Marcory' },
          { code: 'ATTE', name: 'Attécoubé' },
          { code: 'ABO', name: 'Abobo' },
          { code: 'BING', name: 'Bingerville' },
          { code: 'GRAND', name: 'Grand-Bassam' }
        ]
      },
      { code: 'BAS', name: 'Bas-Sassandra',
        cities: [
          { code: 'SAN', name: 'San Pedro' },
          { code: 'SAS', name: 'Sassandra' },
          { code: 'GAG', name: 'Gagnoa' },
          { code: 'SOUB', name: 'Soubre' },
          { code: 'TAB', name: 'Tabou' },
          { code: 'FRE', name: 'Fresco' },
          { code: 'DAL', name: 'Daloa' },
          { code: 'ISS', name: 'Issia' },
          { code: 'ZUE', name: 'Zuéla' },
          { code: 'VAV', name: 'Vavoua' }
        ]
      },
      { code: 'COM', name: 'Comoé',
        cities: [
          { code: 'ABEN', name: 'Abengourou' },
          { code: 'BON', name: 'Bondoukou' },
          { code: 'TAND', name: 'Tanda' },
          { code: 'BET', name: 'Bettié' },
          { code: 'DIAP', name: 'Diapé' },
          { code: 'MABI', name: 'Mabéhi' },
          { code: 'NIAN', name: 'Niané' },
          { code: 'SAND', name: 'Sandégué' },
          { code: 'TIA', name: 'Tia' },
          { code: 'ZAN', name: 'Zanzan' }
        ]
      },
      { code: 'DENG', name: 'Denguélé',
        cities: [
          { code: 'ODO', name: 'Odienné' },
          { code: 'MAD', name: 'Madou' },
          { code: 'MIN', name: 'Minignan' },
          { code: 'KAN', name: 'Kani' },
          { code: 'SAM', name: 'Samatiguila' },
          { code: 'SIE', name: 'Sien' },
          { code: 'VAV', name: 'Vavoua' },
          { code: 'DAL', name: 'Daloa' },
          { code: 'ISS', name: 'Issia' },
          { code: 'ZUE', name: 'Zuéla' }
        ]
      },
      { code: 'GRO', name: 'Gôh-Djiboua',
        cities: [
          { code: 'GAG', name: 'Gagnoa' },
          { code: 'DIV', name: 'Divo' },
          { code: 'OUME', name: 'Oumé' },
          { code: 'LAK', name: 'Lakota' },
          { code: 'GUE', name: 'Guéyo' },
          { code: 'DAL', name: 'Daloa' },
          { code: 'ISS', name: 'Issia' },
          { code: 'ZUE', name: 'Zuéla' },
          { code: 'VAV', name: 'Vavoua' },
          { code: 'SAS', name: 'Sassandra' }
        ]
      },
      { code: 'HAU', name: 'Haut-Sassandra',
        cities: [
          { code: 'DAL', name: 'Daloa' },
          { code: 'ISS', name: 'Issia' },
          { code: 'ZUE', name: 'Zuéla' },
          { code: 'VAV', name: 'Vavoua' },
          { code: 'GAG', name: 'Gagnoa' },
          { code: 'DIV', name: 'Divo' },
          { code: 'OUME', name: 'Oumé' },
          { code: 'LAK', name: 'Lakota' },
          { code: 'GUE', name: 'Guéyo' },
          { code: 'SAS', name: 'Sassandra' }
        ]
      },
      { code: 'LAG', name: 'Lagunes District',
        cities: [
          { code: 'ABID', name: 'Abidjan' },
          { code: 'YOP', name: 'Yopougon' },
          { code: 'COC', name: 'Cocody' },
          { code: 'PLA', name: 'Plateau' },
          { code: 'TRE', name: 'Treichville' },
          { code: 'MARC', name: 'Marcory' },
          { code: 'ATTE', name: 'Attécoubé' },
          { code: 'ABO', name: 'Abobo' },
          { code: 'BING', name: 'Bingerville' },
          { code: 'GRAND', name: 'Grand-Bassam' }
        ]
      },
      { code: 'MONT', name: 'Montagnes',
        cities: [
          { code: 'MAN', name: 'Man' },
          { code: 'DAN', name: 'Danane' },
          { code: 'BLO', name: 'Bloléquin' },
          { code: 'TOU', name: 'Toulépleu' },
          { code: 'GUE', name: 'Guéyo' },
          { code: 'DAL', name: 'Daloa' },
          { code: 'ISS', name: 'Issia' },
          { code: 'ZUE', name: 'Zuéla' },
          { code: 'VAV', name: 'Vavoua' },
          { code: 'GAG', name: 'Gagnoa' }
        ]
      },
      { code: 'SAV', name: 'Savanes',
        cities: [
          { code: 'FER', name: 'Ferkessédougou' },
          { code: 'KOR', name: 'Korhogo' },
          { code: 'ODIE', name: 'Odienné' },
          { code: 'MAD', name: 'Madou' },
          { code: 'MIN', name: 'Minignan' },
          { code: 'KAN', name: 'Kani' },
          { code: 'SAM', name: 'Samatiguila' },
          { code: 'SIE', name: 'Sien' },
          { code: 'VAV', name: 'Vavoua' },
          { code: 'DAL', name: 'Daloa' }
        ]
      },
      { code: 'VAL', name: 'Vallée du Bandama',
        cities: [
          { code: 'BOU', name: 'Bouaké' },
          { code: 'KAT', name: 'Katiola' },
          { code: 'DAB', name: 'Dabakala' },
          { code: 'BEU', name: 'Béoumi' },
          { code: 'SIN', name: 'Sinfra' },
          { code: 'MAB', name: 'Mabéhi' },
          { code: 'NIAN', name: 'Niané' },
          { code: 'SAND', name: 'Sandégué' },
          { code: 'TIA', name: 'Tia' },
          { code: 'ZAN', name: 'Zanzan' }
        ]
      },
      { code: 'WAR', name: 'Woroba',
        cities: [
          { code: 'SEG', name: 'Séguéla' },
          { code: 'MAB', name: 'Mabéhi' },
          { code: 'NIAN', name: 'Niané' },
          { code: 'SAND', name: 'Sandégué' },
          { code: 'TIA', name: 'Tia' },
          { code: 'ZAN', name: 'Zanzan' },
          { code: 'BOU', name: 'Bouaké' },
          { code: 'KAT', name: 'Katiola' },
          { code: 'DAB', name: 'Dabakala' },
          { code: 'BEU', name: 'Béoumi' }
        ]
      },
      { code: 'ZAN', name: 'Zanzan',
        cities: [
          { code: 'BON', name: 'Bondoukou' },
          { code: 'TAND', name: 'Tanda' },
          { code: 'BET', name: 'Bettié' },
          { code: 'DIAP', name: 'Diapé' },
          { code: 'ABEN', name: 'Abengourou' },
          { code: 'MABI', name: 'Mabéhi' },
          { code: 'NIAN', name: 'Niané' },
          { code: 'SAND', name: 'Sandégué' },
          { code: 'TIA', name: 'Tia' },
          { code: 'ZAN', name: 'Zanzan' }
        ]
      },
      { code: 'YAM', name: 'Yamoussoukro',
        cities: [
          { code: 'YAM', name: 'Yamoussoukro' },
          { code: 'TIE', name: 'Tiébissou' },
          { code: 'TIA', name: 'Tia' },
          { code: 'ZAN', name: 'Zanzan' },
          { code: 'BOU', name: 'Bouaké' },
          { code: 'KAT', name: 'Katiola' },
          { code: 'DAB', name: 'Dabakala' },
          { code: 'BEU', name: 'Béoumi' },
          { code: 'SIN', name: 'Sinfra' },
          { code: 'MAB', name: 'Mabéhi' }
        ]
      }
    ]
  };
