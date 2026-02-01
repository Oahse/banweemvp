/**
 * Mozambique country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const mozambique: Country = {
  code: 'MZ',
  name: 'Mozambique',
  taxInfo: { standardRate: 17, taxName: 'VAT', currency: 'MZN', region: 'MEA' },
  provinces: [
    { code: 'MAPUTO', name: 'Maputo',
      cities: [
        { code: 'MAPUTO', name: 'Maputo' },
        { code: 'MATOLA', name: 'Matola' },
        { code: 'NAMPULA', name: 'Nampula' },
        { code: 'BEIRA', name: 'Beira' },
        { code: 'CHIMOIO', name: 'Chimoio' },
        { code: 'QUELIMANE', name: 'Quelimane' },
        { code: 'TETE', name: 'Tete' },
        { code: 'XAI', name: 'Xai-Xai' },
        { code: 'LICHINGA', name: 'Lichinga' },
        { code: 'PEMBA', name: 'Pemba' }
      ]
    }
  ]
};

export default mozambique;
