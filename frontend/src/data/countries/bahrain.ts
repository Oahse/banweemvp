/**
 * Bahrain country data with governorates and cities
 */

import { Country } from './index';

export const bahrain: Country = {
  code: 'BH',
  name: 'Bahrain',
  flag: '🇧🇭',
  capital: 'Manama',
  area: 765,
  currencySymbol: 'BD',
  officialLanguages: ['Arabic'],
  demonym: 'Bahraini',
  taxInfo: { standardRate: 10, taxName: 'VAT', currency: 'BHD', region: 'MEA' },
  divisions: [
    { code: 'MAN', name: 'Manama', type: 'governorate',
      cities: [
        { code: 'MANAMA', name: 'Manama' },
        { code: 'MULK', name: 'Muharraq' },
        { code: 'ISAT', name: 'Isa Town' },
        { code: 'SITRA', name: 'Sitra' },
        { code: 'RIFA', name: 'Riffa' }
      ]
    },
    { code: 'MUH', name: 'Muharraq', type: 'governorate',
      cities: [
        { code: 'MUHARRAQ', name: 'Muharraq' },
        { code: 'ISAT', name: 'Isa Town' },
        { code: 'SITRA', name: 'Sitra' },
        { code: 'RIFA', name: 'Riffa' },
        { code: 'MANAMA', name: 'Manama' }
      ]
    },
    { code: 'ISA', name: 'Isa Town', type: 'governorate',
      cities: [
        { code: 'ISA', name: 'Isa Town' },
        { code: 'SITRA', name: 'Sitra' },
        { code: 'RIFA', name: 'Riffa' },
        { code: 'MANAMA', name: 'Manama' },
        { code: 'MUHARRAQ', name: 'Muharraq' }
      ]
    },
    { code: 'SIT', name: 'Sitra', type: 'governorate',
      cities: [
        { code: 'SITRA', name: 'Sitra' },
        { code: 'RIFA', name: 'Riffa' },
        { code: 'MANAMA', name: 'Manama' },
        { code: 'MUHARRAQ', name: 'Muharraq' },
        { code: 'ISA', name: 'Isa Town' }
      ]
    },
    { code: 'RIF', name: 'Riffa', type: 'governorate',
      cities: [
        { code: 'RIFFA', name: 'Riffa' },
        { code: 'MANAMA', name: 'Manama' },
        { code: 'MUHARRAQ', name: 'Muharraq' },
        { code: 'ISA', name: 'Isa Town' },
        { code: 'SITRA', name: 'Sitra' }
      ]
    }
  ]
};

export default bahrain;
