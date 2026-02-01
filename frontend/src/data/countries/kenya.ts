/**
 * Kenya country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const kenya: Country = {
  code: 'KE',
  name: 'Kenya',
  taxInfo: { standardRate: 16, taxName: 'VAT', currency: 'KES', region: 'MEA' },
  provinces: [
    { code: 'NAIROBI', name: 'Nairobi',
      cities: [
        { code: 'NBI', name: 'Nairobi' },
        { code: 'KAREN', name: 'Karen' },
        { code: 'LANGATA', name: 'Langata' },
        { code: 'KASARANI', name: 'Kasarani' },
        { code: 'EMBAKASI', name: 'Embakasi' },
        { code: 'KIBERA', name: 'Kibera' },
        { code: 'WESTLANDS', name: 'Westlands' },
        { code: 'DAGORETTI', name: 'Dagoretti' },
        { code: 'KAMUKUNJI', name: 'Kamukunji' },
        { code: 'MATHARE', name: 'Mathare' }
      ]
    },
    { code: 'MOMBASA', name: 'Mombasa',
      cities: [
        { code: 'MBA', name: 'Mombasa' },
        { code: 'NYALI', name: 'Nyali' },
        { code: 'DIANI', name: 'Diani' },
        { code: 'KILIFI', name: 'Kilifi' },
        { code: 'MALINDI', name: 'Malindi' },
        { code: 'LAMU', name: 'Lamu' },
        { code: 'KWALE', name: 'Kwale' },
        { code: 'VOI', name: 'Voi' },
        { code: 'TAVETA', name: 'Taveta' },
        { code: 'WUNDANYI', name: 'Wundanyi' }
      ]
    }
  ]
};

export default kenya;
