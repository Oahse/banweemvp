/**
 * U.S. Virgin Islands country data with islands and cities
 */

import { Country } from './index';

export const usvirginislands: Country = {
  code: 'VI',
  name: 'U.S. Virgin Islands',
  flag: '🇻🇮',
  capital: 'Charlotte Amalie',
  area: 346,
  currencySymbol: '$',
  officialLanguages: ['English'],
  demonym: 'U.S. Virgin Islander',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'USD', region: 'NA' },
  divisions: [
    { code: 'STT', name: 'Saint Thomas', type: 'island',
      cities: [
        { code: 'CHARLOTTE_AMALIE', name: 'Charlotte Amalie' },
        { code: 'CHRISTIANSTED', name: 'Christiansted' },
        { code: 'FREDERIKSTED', name: 'Frederiksted' },
        { code: 'CRUZ_BAY', name: 'Cruz Bay' },
        { code: 'GREAT_HARBOR', name: 'Great Harbor' }
      ]
    },
    { code: 'STJ', name: 'Saint John', type: 'island',
      cities: [
        { code: 'CHRISTIANSTED', name: 'Christiansted' },
        { code: 'FREDERIKSTED', name: 'Frederiksted' },
        { code: 'CRUZ_BAY', name: 'Cruz Bay' },
        { code: 'GREAT_HARBOR', name: 'Great Harbor' },
        { code: 'CHARLOTTE_AMALIE', name: 'Charlotte Amalie' }
      ]
    },
    { code: 'STC', name: 'Saint Croix', type: 'island',
      cities: [
        { code: 'FREDERIKSTED', name: 'Frederiksted' },
        { code: 'CRUZ_BAY', name: 'Cruz Bay' },
        { code: 'GREAT_HARBOR', name: 'Great Harbor' },
        { code: 'CHARLOTTE_AMALIE', name: 'Charlotte Amalie' },
        { code: 'CHRISTIANSTED', name: 'Christiansted' }
      ]
    },
    { code: 'CRU', name: 'Water Island', type: 'island',
      cities: [
        { code: 'CRUZ_BAY', name: 'Cruz Bay' },
        { code: 'GREAT_HARBOR', name: 'Great Harbor' },
        { code: 'CHARLOTTE_AMALIE', name: 'Charlotte Amalie' },
        { code: 'CHRISTIANSTED', name: 'Christiansted' },
        { code: 'FREDERIKSTED', name: 'Frederiksted' }
      ]
    }
  ]
};
