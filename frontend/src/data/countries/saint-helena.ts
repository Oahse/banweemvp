/**
 * Saint Helena country data with districts and cities
 */

import { Country } from './index';

export const sainthelena: Country = {
  code: 'SH',
  name: 'Saint Helena',
  flag: '🇸🇭',
  capital: 'Jamestown',
  area: 410,
  currencySymbol: '£',
  officialLanguages: ['English'],
  demonym: 'Saint Helenian',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'USD', region: 'MEA' },
  divisions: [
    { code: 'JAM', name: 'Jamestown', type: 'district',
      cities: [
        { code: 'JAMESTOWN', name: 'Jamestown' },
        { code: 'HAL', name: 'Half Tree Hollow' },
        { code: 'LONGWOOD', name: 'Longwood' },
        { code: 'LEVELWOOD', name: 'Levelwood' },
        { code: 'BLUE', name: 'Blue Hill' }
      ]
    },
    { code: 'HAL', name: 'Half Tree Hollow', type: 'district',
      cities: [
        { code: 'HALF', name: 'Half Tree Hollow' },
        { code: 'JAMESTOWN', name: 'Jamestown' },
        { code: 'LONGWOOD', name: 'Longwood' },
        { code: 'LEVELWOOD', name: 'Levelwood' },
        { code: 'BLUE', name: 'Blue Hill' }
      ]
    },
    { code: 'LON', name: 'Longwood', type: 'district',
      cities: [
        { code: 'LONGWOOD', name: 'Longwood' },
        { code: 'JAMESTOWN', name: 'Jamestown' },
        { code: 'HALF', name: 'Half Tree Hollow' },
        { code: 'LEVELWOOD', name: 'Levelwood' },
        { code: 'BLUE', name: 'Blue Hill' }
      ]
    },
    { code: 'LEV', name: 'Levelwood', type: 'district',
      cities: [
        { code: 'LEVELWOOD', name: 'Levelwood' },
        { code: 'JAMESTOWN', name: 'Jamestown' },
        { code: 'HALF', name: 'Half Tree Hollow' },
        { code: 'LONGWOOD', name: 'Longwood' },
        { code: 'BLUE', name: 'Blue Hill' }
      ]
    },
    { code: 'BLU', name: 'Blue Hill', type: 'district',
      cities: [
        { code: 'BLUE', name: 'Blue Hill' },
        { code: 'JAMESTOWN', name: 'Jamestown' },
        { code: 'HALF', name: 'Half Tree Hollow' },
        { code: 'LONGWOOD', name: 'Longwood' },
        { code: 'LEVELWOOD', name: 'Levelwood' }
      ]
    }
  ]
};

export default sainthelena;
