/**
 * Western Sahara country data with provinces and cities
 */

import { Country } from './index';

export const westernsahara: Country = {
  code: 'EH',
  name: 'Western Sahara',
  flag: '🇪🇭',
  capital: 'Laayoune',
  area: 266000,
  currencySymbol: 'MAD',
  officialLanguages: ['Arabic', 'Spanish'],
  demonym: 'Sahrawi',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'EH0', region: 'MEA' },
  divisions: [
    { code: 'LAA', name: 'Laayoune', type: 'province',
      cities: [
        { code: 'LAAYOUNE', name: 'Laayoune' },
        { code: 'BOUJDOUR', name: 'Boujdour' },
        { code: 'TARFAYA', name: 'Tarfaya' },
        { code: 'GUELMIM', name: 'Guelmim' },
        { code: 'TAN', name: 'Tan-Tan' }
      ]
    },
    { code: 'BOU', name: 'Boujdour', type: 'province',
      cities: [
        { code: 'BOUJDOUR', name: 'Boujdour' },
        { code: 'TARFAYA', name: 'Tarfaya' },
        { code: 'GUELMIM', name: 'Guelmim' },
        { code: 'TAN', name: 'Tan-Tan' },
        { code: 'LAAYOUNE', name: 'Laayoune' }
      ]
    },
    { code: 'TAR', name: 'Tarfaya', type: 'province',
      cities: [
        { code: 'TARFAYA', name: 'Tarfaya' },
        { code: 'GUELMIM', name: 'Guelmim' },
        { code: 'TAN', name: 'Tan-Tan' },
        { code: 'LAAYOUNE', name: 'Laayoune' },
        { code: 'BOUJDOUR', name: 'Boujdour' }
      ]
    },
    { code: 'GUE', name: 'Guelmim', type: 'province',
      cities: [
        { code: 'GUELMIM', name: 'Guelmim' },
        { code: 'TAN', name: 'Tan-Tan' },
        { code: 'LAAYOUNE', name: 'Laayoune' },
        { code: 'BOUJDOUR', name: 'Boujdour' },
        { code: 'TARFAYA', name: 'Tarfaya' }
      ]
    },
    { code: 'TAN', name: 'Tan-Tan', type: 'province',
      cities: [
        { code: 'TAN', name: 'Tan-Tan' },
        { code: 'LAAYOUNE', name: 'Laayoune' },
        { code: 'BOUJDOUR', name: 'Boujdour' },
        { code: 'TARFAYA', name: 'Tarfaya' },
        { code: 'GUELMIM', name: 'Guelmim' }
      ]
    },
    { code: 'AOU', name: 'Aousserd', type: 'province',
      cities: [
        { code: 'AUSSERD', name: 'Aousserd' },
        { code: 'LAGUIRA', name: 'Lagouira' },
        { code: 'TICHLA', name: 'Tichla' },
        { code: 'BIR', name: 'Bir Gandus' },
        { code: 'GUELMIM', name: 'Guelmim' }
      ]
    },
    { code: 'LAG', name: 'Lagouira', type: 'province',
      cities: [
        { code: 'LAGUIRA', name: 'Lagouira' },
        { code: 'TICHLA', name: 'Tichla' },
        { code: 'BIR', name: 'Bir Gandus' },
        { code: 'AUSSERD', name: 'Aousserd' },
        { code: 'TAN', name: 'Tan-Tan' }
      ]
    },
    { code: 'TIC', name: 'Tichla', type: 'province',
      cities: [
        { code: 'TICHLA', name: 'Tichla' },
        { code: 'BIR', name: 'Bir Gandus' },
        { code: 'AUSSERD', name: 'Aousserd' },
        { code: 'LAGUIRA', name: 'Lagouira' },
        { code: 'GUELMIM', name: 'Guelmim' }
      ]
    },
    { code: 'BIR', name: 'Bir Gandus', type: 'province',
      cities: [
        { code: 'BIR', name: 'Bir Gandus' },
        { code: 'AUSSERD', name: 'Aousserd' },
        { code: 'LAGUIRA', name: 'Lagouira' },
        { code: 'TICHLA', name: 'Tichla' },
        { code: 'TAN', name: 'Tan-Tan' }
      ]
    }
  ]
};

export default westernsahara;
