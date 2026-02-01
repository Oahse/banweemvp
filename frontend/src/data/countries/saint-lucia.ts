/**
 * Saint Lucia country data with quarters, cities, and tax information
 */

import { Country } from './index';

export const saintLucia: Country = {
    code: 'LC',
    name: 'Saint Lucia',
    taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'XCD', region: 'LATAM' },
    provinces: [
      { code: 'CASTRIES', name: 'Castries',
        cities: [
          { code: 'CASTRIES', name: 'Castries' },
          { code: 'VIEUX', name: 'Vieux Fort' },
          { code: 'SOUFRIERE', name: 'Soufrière' },
          { code: 'DENNERY', name: 'Dennery' },
          { code: 'GROS', name: 'Gros Islet' },
          { code: 'ANSE', name: 'Anse La Raye' },
          { code: 'CHOISEUL', name: 'Choiseul' },
          { code: 'LABORIE', name: 'Laborie' },
          { code: 'MICHOUD', name: 'Micoud' },
          { code: 'PRASLIN', name: 'Praslin' }
        ]
      }
    ]
};
