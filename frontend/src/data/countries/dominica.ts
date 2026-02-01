/**
 * Dominica country data with parishes, cities, and tax information
 */

import { Country } from './index';

export const dominica: Country = {
    code: 'DM',
    name: 'Dominica',
    taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'XCD', region: 'LATAM' },
    provinces: [
      { code: 'ROSEAU', name: 'Roseau',
        cities: [
          { code: 'ROSEAU', name: 'Roseau' },
          { code: 'PORTSMOUTH', name: 'Portsmouth' },
          { code: 'MARIGOT', name: 'Marigot' },
          { code: 'BENSE', name: 'Bense' },
          { code: 'CALIBISHIE', name: 'Calibishie' },
          { code: 'LA', name: 'La Plaine' },
          { code: 'CASTLE', name: 'Castle Bruce' },
          { code: 'GRAND', name: 'Grand Bay' },
          { code: 'SALISBURY', name: 'Salisbury' },
          { code: 'WOODBIRD', name: 'Woodford Hill' }
        ]
      }
    ]
};
