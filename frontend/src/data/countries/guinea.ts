/**
 * Guinea country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const guinea: Country = { code: 'GN', name: 'Guinea', taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'GNF', region: 'MEA' },
  provinces: [
    { code: 'CONAKRY', name: 'Conakry',
      cities: [
        { code: 'CONAKRY', name: 'Conakry' },
        { code: 'NZEREKORE', name: 'Nzérékoré' },
        { code: 'KANKAN', name: 'Kankan' },
        { code: 'KINDIA', name: 'Kindia' },
        { code: 'LABE', name: 'Labé' },
        { code: 'BOKE', name: 'Boké' },
        { code: 'MAMOU', name: 'Mamou' },
        { code: 'FARANAH', name: 'Faranah' },
        { code: 'SIGUIRI', name: 'Siguiri' },
        { code: 'DABOLA', name: 'Dabola' }
      ]
    }
  ]
};

export default guinea;
