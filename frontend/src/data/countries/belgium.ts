/**
 * Belgium country data with regions, cities, and tax information
 */

import { Country } from './index';

export const belgium: Country = {
    code: 'BE',
    name: 'Belgium',
    taxInfo: { standardRate: 21, taxName: 'VAT', currency: 'EUR', region: 'EU' },
    provinces: [
      { code: 'BRU', name: 'Brussels-Capital Region',
        cities: [
          { code: 'BRU', name: 'Brussels' },
          { code: 'SCHAER', name: 'Schaerbeek' },
          { code: 'ANDERL', name: 'Anderlecht' },
          { code: 'MOLENB', name: 'Molenbeek-Saint-Jean' },
          { code: 'IXELLES', name: 'Ixelles' },
          { code: 'ETTERB', name: 'Etterbeek' },
          { code: 'UCCLE', name: 'Uccle' },
          { code: 'JETTE', name: 'Jette' },
          { code: 'GANS', name: 'Ganshoren' },
          { code: 'KOEKEL', name: 'Koekelberg' }
        ]
      },
      { code: 'VLG', name: 'Flemish Region',
        cities: [
          { code: 'ANT', name: 'Antwerp' },
          { code: 'GENT', name: 'Ghent' },
          { code: 'BRUG', name: 'Bruges' },
          { code: 'LEUVEN', name: 'Leuven' },
          { code: 'MECHEL', name: 'Mechelen' },
          { code: 'KORTRIJK', name: 'Kortrijk' },
          { code: 'HASSELT', name: 'Hasselt' },
          { code: 'OSTEND', name: 'Ostend' },
          { code: 'SINTN', name: 'Sint-Niklaas' },
          { code: 'ROESEL', name: 'Roeselare' }
        ]
      },
      { code: 'WAL', name: 'Walloon Region',
        cities: [
          { code: 'LIEGE', name: 'Liège' },
          { code: 'NAMUR', name: 'Namur' },
          { code: 'CHARL', name: 'Charleroi' },
          { code: 'MONS', name: 'Mons' },
          { code: 'LA LOUV', name: 'La Louvière' },
          { code: 'Tournai', name: 'Tournai' },
          { code: 'VERVI', name: 'Verviers' },
          { code: 'MOUSCRON', name: 'Mouscron' },
          { code: 'SERAING', name: 'Seraing' },
          { code: 'LIEGE2', name: 'Liège Province' }
        ]
      }
    ]
};
