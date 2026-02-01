/**
 * Togo country data with regions and cities
 */

import { Country } from './index';

export const togo: Country = {
  code: 'TG',
  name: 'Togo',
  flag: '🇹🇬',
  capital: 'Lomé',
  area: 56785,
  currencySymbol: 'CFA',
  officialLanguages: ['French'],
  demonym: 'Togolese',
  taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'XOF', region: 'MEA' },
  divisions: [
    { code: 'MAR', name: 'Maritime', type: 'region',
      cities: [
        { code: 'LOME', name: 'Lomé' },
        { code: 'TSÉVIÉ', name: 'Tsévié' },
        { code: 'ANÉHO', name: 'Aného' },
        { code: 'VOGAN', name: 'Vogan' },
        { code: 'TABLIGBO', name: 'Tabligbo' }
      ]
    },
    { code: 'PLA', name: 'Plateaux', type: 'region',
      cities: [
        { code: 'ATAKPAME', name: 'Atakpamé' },
        { code: 'NOTSÉ', name: 'Notsé' },
        { code: 'KPALIMÉ', name: 'Kpalimé' },
        { code: 'BADOU', name: 'Badou' },
        { code: 'SODOKOU', name: 'Sodokou' }
      ]
    },
    { code: 'CEN', name: 'Centrale', type: 'region',
      cities: [
        { code: 'SOKODÉ', name: 'Sokodé' },
        { code: 'KARA', name: 'Kara' },
        { code: 'BASSAR', name: 'Bassar' },
        { code: 'BAFILO', name: 'Bafilo' },
        { code: 'TCHAMBA', name: 'Tchamba' }
      ]
    },
    { code: 'KAR', name: 'Kara', type: 'region',
      cities: [
        { code: 'KARA', name: 'Kara' },
        { code: 'BASSAR', name: 'Bassar' },
        { code: 'BAFILO', name: 'Bafilo' },
        { code: 'TCHAMBA', name: 'Tchamba' },
        { code: 'PAGOUDA', name: 'Pagouda' }
      ]
    },
    { code: 'SAV', name: 'Savanes', type: 'region',
      cities: [
        { code: 'DAPAONG', name: 'Dapaong' },
        { code: 'MANGO', name: 'Mango' },
        { code: 'BASSAR', name: 'Bassar' },
        { code: 'BANDJELI', name: 'Bandjeli' },
        { code: 'CINKASSÉ', name: 'Cinkassé' }
      ]
    }
  ]
};

export default togo;
