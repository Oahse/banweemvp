/**
 * Vatican City country data with administrative areas, cities, and tax information
 */

import { Country } from './index';

export const vaticancity: Country = {
  code: 'VA',
  name: 'Vatican City',
  taxInfo: { standardRate: 22, taxName: 'VAT', currency: 'EUR', region: 'EU' },
  provinces: [
    { code: 'VATICAN_CITY', name: 'Vatican City',
      cities: [
        { code: 'SAINT_PETERS', name: 'Saint Peter\'s Square' },
        { code: 'SAINT_PETERS_BASILICA', name: 'Saint Peter\'s Basilica' },
        { code: 'VATICAN_MUSEUMS', name: 'Vatican Museums' },
        { code: 'APOSTOLIC_PALACE', name: 'Apostolic Palace' },
        { code: 'SISTINE_CHAPEL', name: 'Sistine Chapel' },
        { code: 'ST_PETERS_SQUARE', name: 'St. Peter\'s Square' },
        { code: 'VATICAN_GARDENS', name: 'Vatican Gardens' },
        { code: 'PAULINE_CHAPEL', name: 'Pauline Chapel' }
      ]
    }
  ]
};

export default vaticancity;
