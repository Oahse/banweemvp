/**
 * Cameroon country data with regions and cities
 */

import { Country } from './index';

export const cameroon: Country = {
  code: 'CM',
  name: 'Cameroon',
  flag: '🇨🇲',
  capital: 'Yaoundé',
  area: 475442,
  currencySymbol: 'FCFA',
  officialLanguages: ['French', 'English'],
  demonym: 'Cameroonian',
  taxInfo: { standardRate: 19.25, taxName: 'VAT', currency: 'XAF', region: 'MEA' },
  divisions: [
    { code: 'LIT', name: 'Littoral', type: 'region',
      cities: [
        { code: 'DOUALA', name: 'Douala' },
        { code: 'EDEA', name: 'Edéa' },
        { code: 'KRIBI', name: 'Kribi' },
        { code: 'NKONGSAMBA', name: 'Nkongsamba' }
      ]
    },
    { code: 'CEN', name: 'Centre', type: 'region',
      cities: [
        { code: 'YAOUNDE', name: 'Yaoundé' },
        { code: 'BAFANG', name: 'Bafang' },
        { code: 'BAMENDA', name: 'Bamenda' },
        { code: 'KUMBA', name: 'Kumba' },
        { code: 'ESEKA', name: 'Eseka' }
      ]
    },
    { code: 'NOR', name: 'North', type: 'region',
      cities: [
        { code: 'GAROUA', name: 'Garoua' },
        { code: 'MAROUA', name: 'Maroua' },
        { code: 'KOUSSERI', name: 'Kousséri' },
        { code: 'MORA', name: 'Mora' },
        { code: 'MOKOLO', name: 'Mokolo' }
      ]
    },
    { code: 'NOR', name: 'North-West', type: 'region',
      cities: [
        { code: 'BAMENDA', name: 'Bamenda' },
        { code: 'KUMBA', name: 'Kumba' },
        { code: 'BAFANG', name: 'Bafang' },
        { code: 'KUMBA', name: 'Kumba' },
        { code: 'MAMFE', name: 'Mamfe' }
      ]
    },
    { code: 'SOU', name: 'South', type: 'region',
      cities: [
        { code: 'EBOLOWA', name: 'Ebolowa' },
        { code: 'KRIBI', name: 'Kribi' },
        { code: 'SANGMELIMA', name: 'Sangmélima' },
        { code: 'AMBAM', name: 'Ambam' },
        { code: 'MINTOM', name: 'Mintom' }
      ]
    },
    { code: 'SOU', name: 'South-West', type: 'region',
      cities: [
        { code: 'BUÉA', name: 'Buéa' },
        { code: 'LIMBE', name: 'Limbe' },
        { code: 'TIKO', name: 'Tiko' },
        { code: 'MUTENGENE', name: 'Mutengene' },
        { code: 'KUMBA', name: 'Kumba' }
      ]
    },
    { code: 'EAS', name: 'East', type: 'region',
      cities: [
        { code: 'BERTOUA', name: 'Bertoua' },
        { code: 'BATOURI', name: 'Batouri' },
        { code: 'ABONG-MBANG', name: 'Abong-Mbang' },
        { code: 'YOKADOUMA', name: 'Yokadouma' },
        { code: 'LOME', name: 'Lomé' }
      ]
    },
    { code: 'WES', name: 'West', type: 'region',
      cities: [
        { code: 'BAFOUSSAM', name: 'Bafoussam' },
        { code: 'DSCHANG', name: 'Dschang' },
        { code: 'BAMENDA', name: 'Bamenda' },
        { code: 'KUMBA', name: 'Kumba' },
        { code: 'FOUMBAN', name: 'Foumban' }
      ]
    },
    { code: 'ADA', name: 'Adamawa', type: 'region',
      cities: [
        { code: 'NGAOUNDERE', name: 'Ngaoundéré' },
        { code: 'MEIGANGA', name: 'Meiganga' },
        { code: 'TIBATI', name: 'Tibati' },
        { code: 'NGAOUNDERE2', name: 'N\'Gaoundéré' },
        { code: 'DIR', name: 'Dir' }
      ]
    },
    { code: 'FAR', name: 'Far North', type: 'region',
      cities: [
        { code: 'MAROUA', name: 'Maroua' },
        { code: 'KOUSSERI', name: 'Kousséri' },
        { code: 'MORA', name: 'Mora' },
        { code: 'MOKOLO', name: 'Mokolo' },
        { code: 'YAGOUA', name: 'Yagoua' }
      ]
    }
  ]
};

export default cameroon;
