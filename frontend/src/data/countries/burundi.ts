/**
 * Burundi country data with regions, cities, and tax information
 */

import { Country } from './index';

export const burundi: Country = {
    code: 'BI',
    name: 'Burundi',
    taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'BIF', region: 'MEA' },
    provinces: [
      { code: 'BUJ', name: 'Bujumbura',
        cities: [
          { code: 'BUJ', name: 'Bujumbura' },
          { code: 'GITE', name: 'Gitega' },
          { code: 'MUY', name: 'Muyinga' },
          { code: 'NGOZ', name: 'Ngozi' },
          { code: 'RUY', name: 'Ruyigi' },
          { code: 'RUT', name: 'Rutana' },
          { code: 'BUR', name: 'Bururi' },
          { code: 'KAY', name: 'Kayanza' },
          { code: 'KIR', name: 'Kirundo' },
          { code: 'MAK', name: 'Makamba' }
        ]
      },
      { code: 'GITE', name: 'Gitega',
        cities: [
          { code: 'GITE', name: 'Gitega' },
          { code: 'BUJ', name: 'Bujumbura' },
          { code: 'MUY', name: 'Muyinga' },
          { code: 'NGOZ', name: 'Ngozi' },
          { code: 'RUY', name: 'Ruyigi' },
          { code: 'RUT', name: 'Rutana' },
          { code: 'BUR', name: 'Bururi' },
          { code: 'KAY', name: 'Kayanza' },
          { code: 'KIR', name: 'Kirundo' },
          { code: 'MAK', name: 'Makamba' }
        ]
      },
      { code: 'MUY', name: 'Muyinga',
        cities: [
          { code: 'MUY', name: 'Muyinga' },
          { code: 'BUJ', name: 'Bujumbura' },
          { code: 'GITE', name: 'Gitega' },
          { code: 'NGOZ', name: 'Ngozi' },
          { code: 'RUY', name: 'Ruyigi' },
          { code: 'RUT', name: 'Rutana' },
          { code: 'BUR', name: 'Bururi' },
          { code: 'KAY', name: 'Kayanza' },
          { code: 'KIR', name: 'Kirundo' },
          { code: 'MAK', name: 'Makamba' }
        ]
      },
      { code: 'NGOZ', name: 'Ngozi',
        cities: [
          { code: 'NGOZ', name: 'Ngozi' },
          { code: 'BUJ', name: 'Bujumbura' },
          { code: 'GITE', name: 'Gitega' },
          { code: 'MUY', name: 'Muyinga' },
          { code: 'RUY', name: 'Ruyigi' },
          { code: 'RUT', name: 'Rutana' },
          { code: 'BUR', name: 'Bururi' },
          { code: 'KAY', name: 'Kayanza' },
          { code: 'KIR', name: 'Kirundo' },
          { code: 'MAK', name: 'Makamba' }
        ]
      },
      { code: 'RUY', name: 'Ruyigi',
        cities: [
          { code: 'RUY', name: 'Ruyigi' },
          { code: 'BUJ', name: 'Bujumbura' },
          { code: 'GITE', name: 'Gitega' },
          { code: 'MUY', name: 'Muyinga' },
          { code: 'NGOZ', name: 'Ngozi' },
          { code: 'RUT', name: 'Rutana' },
          { code: 'BUR', name: 'Bururi' },
          { code: 'KAY', name: 'Kayanza' },
          { code: 'KIR', name: 'Kirundo' },
          { code: 'MAK', name: 'Makamba' }
        ]
      },
      { code: 'RUT', name: 'Rutana',
        cities: [
          { code: 'RUT', name: 'Rutana' },
          { code: 'BUJ', name: 'Bujumbura' },
          { code: 'GITE', name: 'Gitega' },
          { code: 'MUY', name: 'Muyinga' },
          { code: 'NGOZ', name: 'Ngozi' },
          { code: 'RUY', name: 'Ruyigi' },
          { code: 'BUR', name: 'Bururi' },
          { code: 'KAY', name: 'Kayanza' },
          { code: 'KIR', name: 'Kirundo' },
          { code: 'MAK', name: 'Makamba' }
        ]
      },
      { code: 'BUR', name: 'Bururi',
        cities: [
          { code: 'BUR', name: 'Bururi' },
          { code: 'BUJ', name: 'Bujumbura' },
          { code: 'GITE', name: 'Gitega' },
          { code: 'MUY', name: 'Muyinga' },
          { code: 'NGOZ', name: 'Ngozi' },
          { code: 'RUY', name: 'Ruyigi' },
          { code: 'RUT', name: 'Rutana' },
          { code: 'KAY', name: 'Kayanza' },
          { code: 'KIR', name: 'Kirundo' },
          { code: 'MAK', name: 'Makamba' }
        ]
      },
      { code: 'KAY', name: 'Kayanza',
        cities: [
          { code: 'KAY', name: 'Kayanza' },
          { code: 'BUJ', name: 'Bujumbura' },
          { code: 'GITE', name: 'Gitega' },
          { code: 'MUY', name: 'Muyinga' },
          { code: 'NGOZ', name: 'Ngozi' },
          { code: 'RUY', name: 'Ruyigi' },
          { code: 'RUT', name: 'Rutana' },
          { code: 'BUR', name: 'Bururi' },
          { code: 'KIR', name: 'Kirundo' },
          { code: 'MAK', name: 'Makamba' }
        ]
      },
      { code: 'KIR', name: 'Kirundo',
        cities: [
          { code: 'KIR', name: 'Kirundo' },
          { code: 'BUJ', name: 'Bujumbura' },
          { code: 'GITE', name: 'Gitega' },
          { code: 'MUY', name: 'Muyinga' },
          { code: 'NGOZ', name: 'Ngozi' },
          { code: 'RUY', name: 'Ruyigi' },
          { code: 'RUT', name: 'Rutana' },
          { code: 'BUR', name: 'Bururi' },
          { code: 'KAY', name: 'Kayanza' },
          { code: 'MAK', name: 'Makamba' }
        ]
      },
      { code: 'MAK', name: 'Makamba',
        cities: [
          { code: 'MAK', name: 'Makamba' },
          { code: 'BUJ', name: 'Bujumbura' },
          { code: 'GITE', name: 'Gitega' },
          { code: 'MUY', name: 'Muyinga' },
          { code: 'NGOZ', name: 'Ngozi' },
          { code: 'RUY', name: 'Ruyigi' },
          { code: 'RUT', name: 'Rutana' },
          { code: 'BUR', name: 'Bururi' },
          { code: 'KAY', name: 'Kayanza' },
          { code: 'KIR', name: 'Kirundo' }
        ]
      }
    ]
  };
