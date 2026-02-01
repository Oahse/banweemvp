/**
 * Liberia country data with counties and cities
 */

import { Country } from './index';

export const liberia: Country = {
  code: 'LR',
  name: 'Liberia',
  flag: '🇱🇷',
  capital: 'Monrovia',
  area: 111369,
  currencySymbol: '$',
  officialLanguages: ['English'],
  demonym: 'Liberian',
  taxInfo: { standardRate: 7, taxName: 'VAT', currency: 'LRD', region: 'MEA' },
  divisions: [
    { code: 'BOM', name: 'Bomi', type: 'county',
      cities: [
        { code: 'TUBMANBURG', name: 'Tubmanburg' },
        { code: 'SUEHN', name: 'Suehn Mecca' },
        { code: 'KAKATA', name: 'Kakata' },
        { code: 'BENI', name: 'Bopolu' },
        { code: 'SENJEH', name: 'Senjeh' }
      ]
    },
    { code: 'BON', name: 'Bong', type: 'county',
      cities: [
        { code: 'GANTA', name: 'Ganta' },
        { code: 'GBARNGA', name: 'Gbarnga' },
        { code: 'KAKATA', name: 'Kakata' },
        { code: 'SANNIQUELLIE', name: 'Sanniquellie' },
        { code: 'ZORZOR', name: 'Zorzor' }
      ]
    },
    { code: 'GBA', name: 'Gbarpolu', type: 'county',
      cities: [
        { code: 'BOPOLU', name: 'Bopolu' },
        { code: 'BELLE', name: 'Belle Yella' },
        { code: 'GOLU', name: 'Golu' },
        { code: 'KONGBA', name: 'Kongba' },
        { code: 'GBARMA', name: 'Gbama' }
      ]
    },
    { code: 'GBE', name: 'Grand Bassa', type: 'county',
      cities: [
        { code: 'BUCHANAN', name: 'Buchanan' },
        { code: 'GBARNGA', name: 'Gbarnga' },
        { code: 'KAKATA', name: 'Kakata' },
        { code: 'ROBERTSPORT', name: 'Robertsport' },
        { code: 'TUBMANBURG', name: 'Tubmanburg' }
      ]
    },
    { code: 'GGE', name: 'Grand Gedeh', type: 'county',
      cities: [
        { code: 'ZWEDRU', name: 'Zwedru' },
        { code: 'TCHIEN', name: 'Tchien' },
        { code: 'PUTU', name: 'Putu' },
        { code: 'KONOBO', name: 'Konobo' },
        { code: 'CAVALLA', name: 'Cavalla' }
      ]
    },
    { code: 'GKP', name: 'Grand Kru', type: 'county',
      cities: [
        { code: 'BARCLAYVILLE', name: 'Barclayville' },
        { code: 'SASSE', name: 'Sasstown' },
        { code: 'BUO', name: 'Buao' },
        { code: 'GRAND', name: 'Grand Cess' },
        { code: 'PLEEBO', name: 'Pleebo' }
      ]
    },
    { code: 'LOF', name: 'Lofa', type: 'county',
      cities: [
        { code: 'VOINJAMA', name: 'Voinjama' },
        { code: 'ZORZOR', name: 'Zorzor' },
        { code: 'KOLLAHUN', name: 'Kollahun' },
        { code: 'FAYAH', name: 'Foyah' },
        { code: 'QUARDU', name: 'Quardu Gboni' }
      ]
    },
    { code: 'MAG', name: 'Margibi', type: 'county',
      cities: [
        { code: 'KAKATA', name: 'Kakata' },
        { code: 'GBARNGA', name: 'Gbarnga' },
        { code: 'MARSHALL', name: 'Marshall' },
        { code: 'BREWERSVILLE', name: 'Brewersville' },
        { code: 'UNIFICATION', name: 'Unification Town' }
      ]
    },
    { code: 'MAR', name: 'Maryland', type: 'county',
      cities: [
        { code: 'HARPER', name: 'Harper' },
        { code: 'PLEEBO', name: 'Pleebo' },
        { code: 'BARCLAYVILLE', name: 'Barclayville' },
        { code: 'SASSE', name: 'Sasstown' },
        { code: 'BUO', name: 'Buao' }
      ]
    },
    { code: 'MON', name: 'Montserrado', type: 'county',
      cities: [
        { code: 'MONROVIA', name: 'Monrovia' },
        { code: 'BENSONVILLE', name: 'Bensonville' },
        { code: 'CAREYSBURG', name: 'Careysburg' },
        { code: 'ARLINGTON', name: 'Arlington' },
        { code: 'BUSHROD', name: 'Bushrod Island' }
      ]
    },
    { code: 'NIM', name: 'Nimba', type: 'county',
      cities: [
        { code: 'SANNIQUELLIE', name: 'Sanniquellie' },
        { code: 'GANTA', name: 'Ganta' },
        { code: 'TAPPITA', name: 'Tappita' },
        { code: 'ZOE', name: 'Zoe' },
        { code: 'YARPEA', name: 'Yarpea' }
      ]
    },
    { code: 'RIV', name: 'River Cess', type: 'county',
      cities: [
        { code: 'RIVER', name: 'River Cess' },
        { code: 'BUCHANAN', name: 'Buchanan' },
        { code: 'CESTOS', name: 'Cestos' },
        { code: 'JOHNSON', name: 'Johnsonville' },
        { code: 'GRAND', name: 'Grand Bassa' }
      ]
    },
    { code: 'RIV', name: 'River Gee', type: 'county',
      cities: [
        { code: 'FISHTOWN', name: 'Fishtown' },
        { code: 'SARPO', name: 'Sarpo' },
        { code: 'GLARO', name: 'Glaro' },
        { code: 'TEH', name: 'Teh' },
        { code: 'PUTU', name: 'Putu' }
      ]
    },
    { code: 'SIN', name: 'Sinoe', type: 'county',
      cities: [
        { code: 'GREENVILLE', name: 'Greenville' },
        { code: 'BUCHANAN', name: 'Buchanan' },
        { code: 'JUAZON', name: 'Juazon' },
        { code: 'KPAYAN', name: 'Kpayan' },
        { code: 'PLEEBO', name: 'Pleebo' }
      ]
    }
  ]
};

export default liberia;
