/**
 * Gabon country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const gabon: Country = { code: 'GA', name: 'Gabon', taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'XAF', region: 'MEA' },
  provinces: [
    { code: 'LIBREVILLE', name: 'Libreville',
      cities: [
        { code: 'LIBREVILLE', name: 'Libreville' },
        { code: 'PORT', name: 'Port-Gentil' },
        { code: 'FRANCEVILLE', name: 'Franceville' },
        { code: 'OYEM', name: 'Oyem' },
        { code: 'MOANDA', name: 'Moanda' },
        { code: 'LAMBARÉNÉ', name: 'Lambaréné' },
        { code: 'TCHIBANGA', name: 'Tchibanga' },
        { code: 'KOULAMOUTOU', name: 'Koulamoutou' },
        { code: 'MAKOKOU', name: 'Makokou' },
        { code: 'BITAM', name: 'Bitam' }
      ]
    }
  ]
};

export default gabon;
