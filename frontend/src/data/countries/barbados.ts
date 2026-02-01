/**
 * Barbados country data with parishes and cities
 */

import { Country } from './index';

export const barbados: Country = {
  code: 'BB',
  name: 'Barbados',
  flag: '🇧🇧',
  capital: 'Bridgetown',
  area: 431,
  currencySymbol: 'B$',
  officialLanguages: ['English'],
  demonym: 'Barbadian',
  taxInfo: { standardRate: 17, taxName: 'VAT', currency: 'BBD', region: 'NA' },
  divisions: [
    { code: 'BRI', name: 'Bridgetown', type: 'parish',
      cities: [
        { code: 'BRIDGETOWN', name: 'Bridgetown' },
        { code: 'SPRING', name: 'Spring Garden' },
        { code: 'HASTINGS', name: 'Hastings' },
        { code: 'OISTINS', name: 'Oistins' },
        { code: 'HOLETOWN', name: 'Holetown' }
      ]
    },
    { code: 'SPR', name: 'Spring Garden', type: 'parish',
      cities: [
        { code: 'SPRING', name: 'Spring Garden' },
        { code: 'HASTINGS', name: 'Hastings' },
        { code: 'OISTINS', name: 'Oistins' },
        { code: 'HOLETOWN', name: 'Holetown' },
        { code: 'BRIDGETOWN', name: 'Bridgetown' }
      ]
    },
    { code: 'HAS', name: 'Hastings', type: 'parish',
      cities: [
        { code: 'HASTINGS', name: 'Hastings' },
        { code: 'OISTINS', name: 'Oistins' },
        { code: 'HOLETOWN', name: 'Holetown' },
        { code: 'BRIDGETOWN', name: 'Bridgetown' },
        { code: 'SPRING', name: 'Spring Garden' }
      ]
    },
    { code: 'OIS', name: 'Oistins', type: 'parish',
      cities: [
        { code: 'OISTINS', name: 'Oistins' },
        { code: 'HOLETOWN', name: 'Holetown' },
        { code: 'BRIDGETOWN', name: 'Bridgetown' },
        { code: 'SPRING', name: 'Spring Garden' },
        { code: 'HASTINGS', name: 'Hastings' }
      ]
    },
    { code: 'HOL', name: 'Holetown', type: 'parish',
      cities: [
        { code: 'HOLETOWN', name: 'Holetown' },
        { code: 'BRIDGETOWN', name: 'Bridgetown' },
        { code: 'SPRING', name: 'Spring Garden' },
        { code: 'HASTINGS', name: 'Hastings' },
        { code: 'OISTINS', name: 'Oistins' }
      ]
    }
  ]
};
