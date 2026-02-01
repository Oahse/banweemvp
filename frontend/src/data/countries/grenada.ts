/**
 * Grenada country data with parishes, cities, and tax information
 */

import { Country } from './index';

export const grenada: Country = {
    code: 'GD',
    name: 'Grenada',
    taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'XCD', region: 'LATAM' },
    provinces: [
      { code: 'ST', name: 'St. George\'s',
        cities: [
          { code: 'ST', name: 'St. George\'s' },
          { code: 'GOUYAVE', name: 'Gouyave' },
          { code: 'GRENVILLE', name: 'Grenville' },
          { code: 'VICTORIA', name: 'Victoria' },
          { code: 'SAUTEURS', name: 'Sautours' },
          { code: 'HILLSBOROUGH', name: 'Hillsborough' },
          { code: 'CARRIACOU', name: 'Carriacou' },
          { code: 'PETIT', name: 'Petit Martinique' },
          { code: 'ST2', name: 'St. David\'s' },
          { code: 'ST3', name: 'St. Patrick\'s' }
        ]
      }
    ]
};
