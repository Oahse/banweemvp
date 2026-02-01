/**
 * Djibouti country data with regions, cities, and tax information
 */

import { Country } from './index';

export const djibouti: Country = {
    code: 'DJ',
    name: 'Djibouti',
    taxInfo: { standardRate: 10, taxName: 'VAT', currency: 'DJF', region: 'MEA' },
    provinces: [
      { code: 'DJIB', name: 'Djibouti',
        cities: [
          { code: 'DJIB', name: 'Djibouti' },
          { code: 'BAL', name: 'Balbala' },
          { code: 'DAG', name: 'Dagdar' },
          { code: 'HOL', name: 'Holhol' },
          { code: 'ALI', name: 'Ali Sabieh' },
          { code: 'DOR', name: 'Dikhil' },
          { code: 'TAD', name: 'Tadjoura' },
          { code: 'OBO', name: 'Obock' },
          { code: 'ARH', name: 'Arta' },
          { code: 'GAL', name: 'Gali' }
        ]
      },
      { code: 'ALI', name: 'Ali Sabieh',
        cities: [
          { code: 'ALI', name: 'Ali Sabieh' },
          { code: 'DJIB', name: 'Djibouti' },
          { code: 'BAL', name: 'Balbala' },
          { code: 'DAG', name: 'Dagdar' },
          { code: 'HOL', name: 'Holhol' },
          { code: 'DOR', name: 'Dikhil' },
          { code: 'TAD', name: 'Tadjoura' },
          { code: 'OBO', name: 'Obock' },
          { code: 'ARH', name: 'Arta' },
          { code: 'GAL', name: 'Gali' }
        ]
      },
      { code: 'DIKH', name: 'Dikhil',
        cities: [
          { code: 'DOR', name: 'Dikhil' },
          { code: 'DJIB', name: 'Djibouti' },
          { code: 'BAL', name: 'Balbala' },
          { code: 'DAG', name: 'Dagdar' },
          { code: 'HOL', name: 'Holhol' },
          { code: 'ALI', name: 'Ali Sabieh' },
          { code: 'TAD', name: 'Tadjoura' },
          { code: 'OBO', name: 'Obock' },
          { code: 'ARH', name: 'Arta' },
          { code: 'GAL', name: 'Gali' }
        ]
      },
      { code: 'TADJ', name: 'Tadjoura',
        cities: [
          { code: 'TAD', name: 'Tadjoura' },
          { code: 'DJIB', name: 'Djibouti' },
          { code: 'BAL', name: 'Balbala' },
          { code: 'DAG', name: 'Dagdar' },
          { code: 'HOL', name: 'Holhol' },
          { code: 'ALI', name: 'Ali Sabieh' },
          { code: 'DOR', name: 'Dikhil' },
          { code: 'OBO', name: 'Obock' },
          { code: 'ARH', name: 'Arta' },
          { code: 'GAL', name: 'Gali' }
        ]
      },
      { code: 'OBOC', name: 'Obock',
        cities: [
          { code: 'OBO', name: 'Obock' },
          { code: 'DJIB', name: 'Djibouti' },
          { code: 'BAL', name: 'Balbala' },
          { code: 'DAG', name: 'Dagdar' },
          { code: 'HOL', name: 'Holhol' },
          { code: 'ALI', name: 'Ali Sabieh' },
          { code: 'DOR', name: 'Dikhil' },
          { code: 'TAD', name: 'Tadjoura' },
          { code: 'ARH', name: 'Arta' },
          { code: 'GAL', name: 'Gali' }
        ]
      },
      { code: 'ARTA', name: 'Arta',
        cities: [
          { code: 'ARH', name: 'Arta' },
          { code: 'DJIB', name: 'Djibouti' },
          { code: 'BAL', name: 'Balbala' },
          { code: 'DAG', name: 'Dagdar' },
          { code: 'HOL', name: 'Holhol' },
          { code: 'ALI', name: 'Ali Sabieh' },
          { code: 'DOR', name: 'Dikhil' },
          { code: 'TAD', name: 'Tadjoura' },
          { code: 'OBO', name: 'Obock' },
          { code: 'GAL', name: 'Gali' }
        ]
      },
      { code: 'BALB', name: 'Balbala',
        cities: [
          { code: 'BAL', name: 'Balbala' },
          { code: 'DJIB', name: 'Djibouti' },
          { code: 'DAG', name: 'Dagdar' },
          { code: 'HOL', name: 'Holhol' },
          { code: 'ALI', name: 'Ali Sabieh' },
          { code: 'DOR', name: 'Dikhil' },
          { code: 'TAD', name: 'Tadjoura' },
          { code: 'OBO', name: 'Obock' },
          { code: 'ARH', name: 'Arta' },
          { code: 'GAL', name: 'Gali' }
        ]
      },
      { code: 'DAGD', name: 'Dagdar',
        cities: [
          { code: 'DAG', name: 'Dagdar' },
          { code: 'DJIB', name: 'Djibouti' },
          { code: 'BAL', name: 'Balbala' },
          { code: 'HOL', name: 'Holhol' },
          { code: 'ALI', name: 'Ali Sabieh' },
          { code: 'DOR', name: 'Dikhil' },
          { code: 'TAD', name: 'Tadjoura' },
          { code: 'OBO', name: 'Obock' },
          { code: 'ARH', name: 'Arta' },
          { code: 'GAL', name: 'Gali' }
        ]
      },
      { code: 'HOLH', name: 'Holhol',
        cities: [
          { code: 'HOL', name: 'Holhol' },
          { code: 'DJIB', name: 'Djibouti' },
          { code: 'BAL', name: 'Balbala' },
          { code: 'DAG', name: 'Dagdar' },
          { code: 'ALI', name: 'Ali Sabieh' },
          { code: 'DOR', name: 'Dikhil' },
          { code: 'TAD', name: 'Tadjoura' },
          { code: 'OBO', name: 'Obock' },
          { code: 'ARH', name: 'Arta' },
          { code: 'GAL', name: 'Gali' }
        ]
      },
      { code: 'GALI', name: 'Gali',
        cities: [
          { code: 'GAL', name: 'Gali' },
          { code: 'DJIB', name: 'Djibouti' },
          { code: 'BAL', name: 'Balbala' },
          { code: 'DAG', name: 'Dagdar' },
          { code: 'HOL', name: 'Holhol' },
          { code: 'ALI', name: 'Ali Sabieh' },
          { code: 'DOR', name: 'Dikhil' },
          { code: 'TAD', name: 'Tadjoura' },
          { code: 'OBO', name: 'Obock' },
          { code: 'ARH', name: 'Arta' }
        ]
      }
    ]
  };
