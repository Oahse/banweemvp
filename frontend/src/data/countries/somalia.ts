/**
 * Somalia country data with regions and cities
 */

import { Country } from './index';

export const somalia: Country = {
  code: 'SO',
  name: 'Somalia',
  flag: '🇸🇴',
  capital: 'Mogadishu',
  area: 637657,
  currencySymbol: 'SOS',
  officialLanguages: ['Somali', 'Arabic'],
  demonym: 'Somali',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'USD', region: 'MEA' },
  divisions: [
    { code: 'AWD', name: 'Awdal', type: 'region',
      cities: [
        { code: 'BORAMA', name: 'Borama' },
        { code: 'HARGEISA', name: 'Hargeisa' },
        { code: 'ZEILA', name: 'Zeila' },
        { code: 'LUGAYA', name: 'Lughaya' },
        { code: 'BUIHO', name: 'Buhodle' }
      ]
    },
    { code: 'BAN', name: 'Banaadir', type: 'region',
      cities: [
        { code: 'MOGADISHU', name: 'Mogadishu' },
        { code: 'JOWHAR', name: 'Jowhar' },
        { code: 'AFGOYE', name: 'Afgooye' },
        { code: 'WAJID', name: 'Wajid' },
        { code: 'ADADO', name: 'Adado' }
      ]
    },
    { code: 'BAK', name: 'Bakool', type: 'region',
      cities: [
        { code: 'JOWHAR', name: 'Jowhar' },
        { code: 'AFGOYE', name: 'Afgooye' },
        { code: 'WAJID', name: 'Wajid' },
        { code: 'ADADO', name: 'Adado' },
        { code: 'MOGADISHU', name: 'Mogadishu' }
      ]
    },
    { code: 'BAY', name: 'Bay', type: 'region',
      cities: [
        { code: 'BAY', name: 'Bay' },
        { code: 'BAYHABO', name: 'Bayhabo' },
        { code: 'BURAO', name: 'Burao' },
        { code: 'QARDHO', name: 'Qardho' },
        { code: 'BENDER', name: 'Bender' }
      ]
    },
    { code: 'GAL', name: 'Galguduud', type: 'region',
      cities: [
        { code: 'DUSAMAREB', name: 'Dusamareb' },
        { code: 'GAL', name: 'Galguduud' },
        { code: 'EL', name: 'El Buur' },
        { code: 'EL', name: 'El Werir' },
        { code: 'GAL', name: 'Galguduud' }
      ]
    },
    { code: 'GED', name: 'Gedo', type: 'region',
      cities: [
        { code: 'GAROWE', name: 'Garowe' },
        { code: 'EL', name: 'El Buur' },
        { code: 'EL', name: 'El Werir' },
        { code: 'GAL', name: 'Galguduud' },
        { code: 'DUSAMAREB', name: 'Dusamareb' }
      ]
    },
    { code: 'HIR', name: 'Hiran', type: 'region',
      cities: [
        { code: 'BELEDTWEYN', name: 'Beledweyne' },
        { code: 'BUHODLE', name: 'Buhodle' },
        { code: 'BULOBUR', name: 'Bulobur' },
        { code: 'EL', name: 'El Bur' },
        { code: 'GAL', name: 'Galguduud' }
      ]
    },
    { code: 'JUB', name: 'Jubaland', type: 'region',
      cities: [
        { code: 'KISMAYO', name: 'Kismayo' },
        { code: 'JOWHAR', name: 'Jowhar' },
        { code: 'AFGOYE', name: 'Afgooye' },
        { code: 'WAJID', name: 'Wajid' },
        { code: 'ADADO', name: 'Adado' }
      ]
    },
    { code: 'MUD', name: 'Mudug', type: 'region',
      cities: [
        { code: 'GALKAYO', name: 'Galkayo' },
        { code: 'GAROWE', name: 'Garowe' },
        { code: 'EL', name: 'El Bur' },
        { code: 'EL', name: 'El Werir' },
        { code: 'GAL', name: 'Galguduud' }
      ]
    },
    { code: 'NUG', name: 'Nugaal', type: 'region',
      cities: [
        { code: 'GAROWE', name: 'Garowe' },
        { code: 'GALKAYO', name: 'Galkayo' },
        { code: 'EL', name: 'El Bur' },
        { code: 'EL', name: 'El Werir' },
        { code: 'GAL', name: 'Galguduud' }
      ]
    },
    { code: 'SAH', name: 'Sool', type: 'region',
      cities: [
        { code: 'LAASANOD', name: 'Laas Anod' },
        { code: 'TUK', name: 'Tukaraq' },
        { code: 'HAD', name: 'Hadhwanaag' },
        { code: 'AIDID', name: 'Aidid' },
        { code: 'WANLAWEYN', name: 'Wanla Weyn' }
      ]
    },
    { code: 'SAN', name: 'Sanaag', type: 'region',
      cities: [
        { code: 'ERIGAVO', name: 'Erigavo' },
        { code: 'HADHWANA', name: 'Hadhwanaag' },
        { code: 'LAS', name: 'Las Anod' },
        { code: 'AIDID', name: 'Aidid' },
        { code: 'WANLAWEYN', name: 'Wanla Weyn' }
      ]
    },
    { code: 'TOG', name: 'Togdheer', type: 'region',
      cities: [
        { code: 'BURAO', name: 'Burao' },
        { code: 'QARDHO', name: 'Qardho' },
        { code: 'BENDER', name: 'Bender' },
        { code: 'BAY', name: 'Bay' },
        { code: 'BAYHABO', name: 'Bayhabo' }
      ]
    },
    { code: 'WOQO', name: 'Woqooyi', type: 'region',
      cities: [
        { code: 'HARGEISA', name: 'Hargeisa' },
        { code: 'BALBALA', name: 'Balbala' },
        { code: 'DORALEH', name: 'Doraleh' },
        { code: 'OBOCK', name: 'Obock' },
        { code: 'DJIBOUTI', name: 'Djibouti' }
      ]
    }
  ]
};

export default somalia;
