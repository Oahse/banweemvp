/**
 * Haiti country data with departments, cities, and tax information
 */

import { Country } from './index';

export const haiti: Country = {
    code: 'HT',
    name: 'Haiti',
    taxInfo: { standardRate: 10, taxName: 'VAT', currency: 'HTG', region: 'LATAM' },
    provinces: [
      { code: 'PORT', name: 'Port-au-Prince',
        cities: [
          { code: 'PORT', name: 'Port-au-Prince' },
          { code: 'CAP', name: 'Cap-Haïtien' },
          { 'code': 'JACMEL', name: 'Jacmel' },
          { code: 'LES', name: 'Les Cayes' },
          { code: 'GONAIVES', name: 'Gonaïves' },
          { 'code': 'JEREMIE', name: 'Jérémie' },
          { code: 'HINCHE', name: 'Hinche' },
          { code: 'FORT', name: 'Fort-Liberté' },
          { code: 'MIRAGOANE', name: 'Miragoâne' },
          { code: 'THOMAS', name: 'Thomazeau' }
        ]
      }
    ]
};
