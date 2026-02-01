/**
 * Liberia country data with counties, cities, and tax information
 */

import { Country } from './index';

export const liberia: Country = {
    code: 'LR',
    name: 'Liberia',
    taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'LRD', region: 'MEA' },
    provinces: [
      { code: 'BOM', name: 'Bomi',
        cities: [
          { code: 'TUB', name: 'Tubmanburg' },
          { code: 'SUE', name: 'Suehn' },
          { code: 'KLA', name: 'Klay' },
          { code: 'SEN', name: 'Senjeh' },
          { code: 'GOG', name: 'Gola Konneh' },
          { code: 'MON', name: 'Monrovia' },
          { code: 'PAY', name: 'Paynesville' },
          { code: 'BEN', name: 'Bensonville' },
          { code: 'KAK', name: 'Kakata' },
          { code: 'GAR', name: 'Gbarnga' }
        ]
      },
      { code: 'BON', name: 'Bong',
        cities: [
          { code: 'GAR', name: 'Gbarnga' },
          { code: 'KAK', name: 'Kakata' },
          { code: 'SAL', name: 'Salala' },
          { code: 'PAN', name: 'Panta' },
          { code: 'SUE', name: 'Suakoko' },
          { code: 'MON', name: 'Monrovia' },
          { code: 'PAY', name: 'Paynesville' },
          { code: 'BEN', name: 'Bensonville' },
          { code: 'TUB', name: 'Tubmanburg' },
          { code: 'KLA', name: 'Klay' }
        ]
      },
      { code: 'GBA', name: 'Grand Bassa',
        cities: [
          { code: 'BUC', name: 'Buchanan' },
          { code: 'EDW', name: 'Edina' },
          { code: 'STAV', name: 'St. John River' },
          { code: 'GRAND', name: 'Grand Bassa' },
          { code: 'MON', name: 'Monrovia' },
          { code: 'PAY', name: 'Paynesville' },
          { code: 'BEN', name: 'Bensonville' },
          { code: 'KAK', name: 'Kakata' },
          { code: 'GAR', name: 'Gbarnga' },
          { code: 'SAL', name: 'Salala' }
        ]
      },
      { code: 'GCA', name: 'Grand Cape Mount',
        cities: [
          { code: 'ROB', name: 'Robertsport' },
          { code: 'TUB', name: 'Tubmanburg' },
          { code: 'SEN', name: 'Senjeh' },
          { code: 'GOG', name: 'Gola Konneh' },
          { code: 'MON', name: 'Monrovia' },
          { code: 'PAY', name: 'Paynesville' },
          { code: 'BEN', name: 'Bensonville' },
          { code: 'KAK', name: 'Kakata' },
          { code: 'GAR', name: 'Gbarnga' },
          { code: 'SAL', name: 'Salala' }
        ]
      },
      { code: 'GGE', name: 'Grand Gedeh',
        cities: [
          { code: 'GED', name: 'Zwedru' },
          { code: 'TCH', name: 'Tchien' },
          { code: 'PUT', name: 'Putu' },
          { code: 'KON', name: 'Konobo' },
          { code: 'MON', name: 'Monrovia' },
          { code: 'PAY', name: 'Paynesville' },
          { code: 'BEN', name: 'Bensonville' },
          { code: 'KAK', name: 'Kakata' },
          { code: 'GAR', name: 'Gbarnga' },
          { code: 'SAL', name: 'Salala' }
        ]
      },
      { code: 'GK', name: 'Grand Kru',
        cities: [
          { code: 'BAR', name: 'Barclayville' },
          { code: 'PLE', name: 'Pleebo' },
          { code: 'SAS', name: 'Sasstown' },
          { code: 'GRA', name: 'Grand Cess' },
          { code: 'MON', name: 'Monrovia' },
          { code: 'PAY', name: 'Paynesville' },
          { code: 'BEN', name: 'Bensonville' },
          { code: 'KAK', name: 'Kakata' },
          { code: 'GAR', name: 'Gbarnga' },
          { code: 'SAL', name: 'Salala' }
        ]
      },
      { code: 'LOF', name: 'Lofa',
        cities: [
          { code: 'VOIN', name: 'Voinjama' },
          { code: 'KOL', name: 'Kolahun' },
          { code: 'FAY', name: 'Foya' },
          { code: 'ZOR', name: 'Zorzor' },
          { code: 'MON', name: 'Monrovia' },
          { code: 'PAY', name: 'Paynesville' },
          { code: 'BEN', name: 'Bensonville' },
          { code: 'KAK', name: 'Kakata' },
          { code: 'GAR', name: 'Gbarnga' },
          { code: 'SAL', name: 'Salala' }
        ]
      },
      { code: 'MAR', name: 'Margibi',
        cities: [
          { code: 'KAK', name: 'Kakata' },
          { code: 'GAR', name: 'Gbarnga' },
          { code: 'MAR', name: 'Marshall' },
          { code: 'BRO', name: 'Brewerville' },
          { code: 'MON', name: 'Monrovia' },
          { code: 'PAY', name: 'Paynesville' },
          { code: 'BEN', name: 'Bensonville' },
          { code: 'TUB', name: 'Tubmanburg' },
          { code: 'KLA', name: 'Klay' },
          { code: 'SEN', name: 'Senjeh' }
        ]
      },
      { code: 'MAR', name: 'Maryland',
        cities: [
          { code: 'HAR', name: 'Harper' },
          { code: 'PLE', name: 'Pleebo' },
          { code: 'BAR', name: 'Barclayville' },
          { code: 'SAS', name: 'Sasstown' },
          { code: 'GRA', name: 'Grand Cess' },
          { code: 'MON', name: 'Monrovia' },
          { code: 'PAY', name: 'Paynesville' },
          { code: 'BEN', name: 'Bensonville' },
          { code: 'KAK', name: 'Kakata' },
          { code: 'GAR', name: 'Gbarnga' }
        ]
      },
      { code: 'MON', name: 'Montserrado',
        cities: [
          { code: 'MON', name: 'Monrovia' },
          { code: 'PAY', name: 'Paynesville' },
          { code: 'BEN', name: 'Bensonville' },
          { code: 'KAK', name: 'Kakata' },
          { code: 'GAR', name: 'Gbarnga' },
          { code: 'SAL', name: 'Salala' },
          { code: 'TUB', name: 'Tubmanburg' },
          { code: 'KLA', name: 'Klay' },
          { code: 'SEN', name: 'Senjeh' },
          { code: 'GOG', name: 'Gola Konneh' }
        ]
      },
      { code: 'NIM', name: 'Nimba',
        cities: [
          { code: 'SANN', name: 'Sanniquellie' },
          { code: 'GHA', name: 'Ganta' },
          { code: 'TAP', name: 'Tapeta' },
          { code: 'ZOE', name: 'Zoe-Geh' },
          { code: 'MON', name: 'Monrovia' },
          { code: 'PAY', name: 'Paynesville' },
          { code: 'BEN', name: 'Bensonville' },
          { code: 'KAK', name: 'Kakata' },
          { code: 'GAR', name: 'Gbarnga' },
          { code: 'SAL', name: 'Salala' }
        ]
      },
      { code: 'RIV', name: 'River Cess',
        cities: [
          { code: 'RIV', name: 'River Cess' },
          { code: 'CEST', name: 'Cestos' },
          { code: 'TIM', name: 'Timbo' },
          { code: 'MON', name: 'Monrovia' },
          { code: 'PAY', name: 'Paynesville' },
          { code: 'BEN', name: 'Bensonville' },
          { code: 'KAK', name: 'Kakata' },
          { code: 'GAR', name: 'Gbarnga' },
          { code: 'SAL', name: 'Salala' },
          { code: 'TUB', name: 'Tubmanburg' }
        ]
      },
      { code: 'RIV', name: 'River Gee',
        cities: [
          { code: 'FIS', name: 'Fish Town' },
          { code: 'SAS', name: 'Sasstown' },
          { code: 'BAR', name: 'Barclayville' },
          { code: 'PLE', name: 'Pleebo' },
          { code: 'MON', name: 'Monrovia' },
          { code: 'PAY', name: 'Paynesville' },
          { code: 'BEN', name: 'Bensonville' },
          { code: 'KAK', name: 'Kakata' },
          { code: 'GAR', name: 'Gbarnga' },
          { code: 'SAL', name: 'Salala' }
        ]
      },
      { code: 'SIN', name: 'Sinoe',
        cities: [
          { code: 'GRE', name: 'Greenville' },
          { code: 'BUT', name: 'Butaw' },
          { code: 'JUA', name: 'Juazon' },
          { code: 'KAR', name: 'Karluway' },
          { code: 'MON', name: 'Monrovia' },
          { code: 'PAY', name: 'Paynesville' },
          { code: 'BEN', name: 'Bensonville' },
          { code: 'KAK', name: 'Kakata' },
          { code: 'GAR', name: 'Gbarnga' },
          { code: 'SAL', name: 'Salala' }
        ]
      }
    ]
  };
