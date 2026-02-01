/**
 * Haiti country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const haiti: Country = {
  code: 'HT',
  name: 'Haiti',
  provinces: [
    { code: 'PORT', name: 'Port-au-Prince',
      cities: [
        { code: 'PORT', name: 'Port-au-Prince', taxInfo: { taxName: 'No VAT', currency: 'USD', region: 'NA' }},
        { code: 'CAP', name: 'Cap-Haïtien' },
        { code: 'GONAIVES', name: 'Gonaïves' },
        { code: 'DELMAS', name: 'Delmas' },
        { code: 'PETION', name: 'Pétionville' },
        { code: 'JACMEL', name: 'Jacmel' },
        { code: 'LES', name: 'Les Cayes' },
        { code: 'JEREMIE', name: 'Jérémie' },
        { code: 'MIREBALAIS', name: 'Mirebalais' },
        { code: 'THOMAS', name: 'Saint-Marc' }
      ]
    }
  ]
};

export default haiti;
