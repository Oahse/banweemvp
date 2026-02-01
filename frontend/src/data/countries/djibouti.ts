/**
 * Djibouti country data with regions and cities
 */

import { Country } from './index';

export const djibouti: Country = {
  code: 'DJ',
  name: 'Djibouti',
  flag: '🇩🇯',
  capital: 'Djibouti',
  area: 23200,
  currencySymbol: 'Fdj',
  officialLanguages: ['French', 'Arabic'],
  demonym: 'Djiboutian',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'USD', region: 'MEA' },
  divisions: [
    { code: 'DJI', name: 'Djibouti', type: 'region',
      cities: [
        { code: 'DJIBOUTI', name: 'Djibouti' },
        { code: 'BALBALA', name: 'Balbala' },
        {code: 'DORALEH', name: 'Doraleh' },
        { code: 'ALI', name: 'Ali Sabieh' },
        { code: 'OBOCK', name: 'Obock' }
      ]
    },
    { code: 'ALI', name: 'Ali Sabieh', type: 'region',
      cities: [
        { code: 'ALI', name: 'Ali Sabieh' },
        { code: 'DJIBOUTI', name: 'Djibouti' },
        { code: 'BALBALA', name: 'Balbala' },
        { code: 'DORALEH', name: 'Doraleh' },
        { code: 'OBOCK', name: 'Obock' }
      ]
    },
    { code: 'ART', name: 'Arta', type: 'region',
      cities: [
        { code: 'ARTA', name: 'Arta' },
        { code: 'DJIBOUTI', name: 'Djibouti' },
        { code: 'BALBALA', name: 'Balbala' },
        { code: 'DORALEH', name: 'Doraleh' },
        { code: 'OBOCK', name: 'Obock' }
      ]
    },
    { code: 'DIC', name: 'Dikhil', type: 'region',
      cities: [
        { code: 'DIKHIL', name: 'Dikhil' },
        { code: 'DJIBOUTI', name: 'Djibouti' },
        { code: 'BALBALA', name: 'Balbala' },
        {code: 'DORALEH', name: 'Doraleh' },
        { code: 'OBOCK', name: 'Obock' }
      ]
    },
    { code: 'TAD', name: 'Tadjourah', type: 'region',
      cities: [
        { code: 'TADJOURAH', name: 'Tadjourah' },
        { code: 'DJIBOUTI', name: 'Djibouti' },
        { code: 'BALBALA', name: 'Balbala' },
        {code: 'DORALEH', name: 'Doraleh' },
        { code: 'OBOCK', name: 'Obock' }
      ]
    }
  ]
};

export default djibouti;
