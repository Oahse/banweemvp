/**
 * Saint Lucia country data with quarters and cities
 */

import { Country } from './index';

export const saintlucia: Country = {
  code: 'LC',
  name: 'Saint Lucia',
  flag: '🇱🇨',
  capital: 'Castries',
  area: 617,
  currencySymbol: '$',
  officialLanguages: ['English'],
  demonym: 'Saint Lucian',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'USD', region: 'MEA' },
  divisions: [
    { code: 'CAS', name: 'Castries', type: 'quarter',
      cities: [
        { code: 'CASTRIES', name: 'Castries' },
        { code: 'GROS', name: 'Gros Islet' },
        {code: 'VIEN', name: 'Vieux Fort' },
        { code: 'SOUFRIÈRE', name: 'Soufrière' },
        { code: 'DENNERY', name: 'Dennery' }
      ]
    },
    { code: 'GRO', name: 'Gros Islet', type: 'quarter',
      cities: [
        { code: 'GROS', name: 'Gros Islet' },
        { code: 'VIEN', name: 'Vieux Fort' },
        { code: 'SOUFRIÈRE', name: 'Soufrière' },
        { code: 'DENNERY', name: 'Dennery' },
        { code: 'CAS', name: 'Castries' }
      ]
    },
    { code: 'VIE', name: 'Vieux Fort', type: 'quarter',
      cities: [
        { code: 'VIEN', name: 'Vieux Fort' },
        { code: 'SOUFRIÈRE', name: 'Soufrière' },
        { code: 'DENNERY', name: 'Dennery' },
        { code: 'CAS', name: 'Castries' },
        { code: 'GROS', name: 'Gros Islet' }
      ]
    },
    { code: 'SOU', name: 'Soufrière', type: 'quarter',
      cities: [
        { code: 'SOUFRIÈRE', name: 'Soufrière' },
        { code: 'DENNERY', name: 'Dennery' },
        { code: 'CAS', name: 'Castries' },
        { code: 'GROS', name: 'Gros Islet' },
        { code: 'VIEN', name: 'Vieux Fort' }
      ]
    },
    { code: 'DEN', name: 'Dennery', type: 'quarter',
      cities: [
        { code: 'DENNERY', name: 'Dennery' },
        { code: 'CAS', name: 'Castries' },
        { code: 'GROS', name: 'Gros Islet' },
        { code: 'VIEN', name: 'Vieux Fort' },
        { code: 'SOUFRIÈRE', name: 'Soufrière' }
      ]
    }
  ]
};

export default saintlucia;
