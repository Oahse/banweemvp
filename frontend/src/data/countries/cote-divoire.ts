/**
 * Côte d'Ivoire country data with regions and cities
 */

import { Country } from './index';

export const coteDIvoire: Country = {
    code: 'CI',
    name: 'Côte d\'Ivoire',
    flag: '🇨🇮',
    capital: 'Yamoussoukro',
    area: 322463,
    currencySymbol: 'CFA',
    officialLanguages: ['French'],
    demonym: 'Ivorian',
    taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'XOF', region: 'MEA' },
    divisions: [
      { code: 'ABID', name: 'Abidjan', type: 'region',
        cities: [
          { code: 'ABID', name: 'Abidjan' },
          { code: 'YOP', name: 'Yopougon' },
          { code: 'COC', name: 'Cocody' },
          { code: 'PLA', name: 'Plateau' },
          { code: 'TRE', name: 'Treichville' }
        ]
      },
      { code: 'LAG', name: 'Lagunes', type: 'region',
        cities: [
          { code: 'ABID', name: 'Abidjan' },
          { code: 'YOP', name: 'Yopougon' },
          { code: 'COC', name: 'Cocody' },
          { code: 'PLA', name: 'Plateau' },
          { code: 'TRE', name: 'Treichville' }
        ]
      },
      { code: 'BAS', name: 'Bas-Sassandra', type: 'region',
        cities: [
          { code: 'SAN', name: 'San Pedro' },
          { code: 'SAS', name: 'Sassandra' },
          { code: 'GAG', name: 'Gagnoa' },
          { code: 'SOUB', name: 'Soubre' },
          { code: 'TAB', name: 'Tabou' }
        ]
      },
      { code: 'COM', name: 'Comoé', type: 'region',
        cities: [
          { code: 'ABEN', name: 'Abengourou' },
          { code: 'BON', name: 'Bondoukou' },
          { code: 'TAND', name: 'Tanda' },
          { code: 'BET', name: 'Bettié' },
          { code: 'DIAP', name: 'Diapé' }
        ]
      },
      { code: 'DEN', name: 'Denguélé', type: 'region',
        cities: [
          { code: 'ODO', name: 'Odienné' },
          { code: 'MAD', name: 'Madou' },
          { code: 'MIN', name: 'Minignan' },
          { code: 'KAN', name: 'Kani' },
          { code: 'SAM', name: 'Samatiguila' }
        ]
      },
      { code: 'GRO', name: 'Gôh-Djiboua', type: 'region',
        cities: [
          { code: 'GAG', name: 'Gagnoa' },
          { code: 'DIV', name: 'Divo' },
          { code: 'OUME', name: 'Oumé' },
          { code: 'LAK', name: 'Lakota' },
          { code: 'GUE', name: 'Guéyo' }
        ]
      },
      { code: 'HAU', name: 'Haut-Sassandra', type: 'region',
        cities: [
          { code: 'DAL', name: 'Daloa' },
          { code: 'ISS', name: 'Issia' },
          { code: 'ZUE', name: 'Zuéla' },
          { code: 'VAV', name: 'Vavoua' },
          { code: 'GAG', name: 'Gagnoa' }
        ]
      },
      { code: 'LAG', name: 'Lagunes District', type: 'region',
        cities: [
          { code: 'ABID', name: 'Abidjan' },
          { code: 'YOP', name: 'Yopougon' },
          { code: 'COC', name: 'Cocody' },
          { code: 'PLA', name: 'Plateau' },
          { code: 'TRE', name: 'Treichville' }
        ]
      },
      { code: 'MON', name: 'Montagnes', type: 'region',
        cities: [
          { code: 'MAN', name: 'Man' },
          { code: 'DAN', name: 'Danane' },
          { code: 'BLO', name: 'Bloléquin' },
          { code: 'TOU', name: 'Toulépleu' },
          { code: 'GUE', name: 'Guéyo' }
        ]
      },
      { code: 'SAV', name: 'Savanes', type: 'region',
        cities: [
          { code: 'FER', name: 'Ferkessédougou' },
          { code: 'KOR', name: 'Korhogo' },
          { code: 'ODIE', name: 'Odienné' },
          { code: 'MAD', name: 'Madou' },
          { code: 'MIN', name: 'Minignan' }
        ]
      },
      { code: 'VAL', name: 'Vallée du Bandama', type: 'region',
        cities: [
          { code: 'BOU', name: 'Bouaké' },
          { code: 'KAT', name: 'Katiola' },
          { code: 'DAB', name: 'Dabakala' },
          { code: 'BEU', name: 'Béoumi' },
          { code: 'SIN', name: 'Sinfra' }
        ]
      },
      { code: 'WAR', name: 'Woroba', type: 'region',
        cities: [
          { code: 'SEG', name: 'Séguéla' },
          { code: 'MAB', name: 'Mabéhi' },
          { code: 'NIAN', name: 'Niané' },
          { code: 'SAND', name: 'Sandégué' },
          { code: 'TIA', name: 'Tia' }
        ]
      },
      { code: 'ZAN', name: 'Zanzan', type: 'region',
        cities: [
          { code: 'BON', name: 'Bondoukou' },
          { code: 'TAND', name: 'Tanda' },
          { code: 'BET', name: 'Bettié' },
          { code: 'DIAP', name: 'Diapé' },
          { code: 'ABEN', name: 'Abengourou' }
        ]
      },
      { code: 'YAM', name: 'Yamoussoukro', type: 'region',
        cities: [
          { code: 'YAM', name: 'Yamoussoukro' },
          { code: 'TIE', name: 'Tiébissou' },
          { code: 'TIA', name: 'Tia' },
          { code: 'ZAN', name: 'Zanzan' },
          { code: 'BOU', name: 'Bouaké' }
        ]
      }
    ]
  };
