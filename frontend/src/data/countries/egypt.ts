/**
 * Egypt country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const egypt: Country = {
  code: 'EG',
  name: 'Egypt',
  taxInfo: { standardRate: 14, taxName: 'VAT', currency: 'EGP', region: 'MEA' },
  provinces: [
    { code: 'CAIRO', name: 'Cairo',
      cities: [
        { code: 'CAIRO', name: 'Cairo' },
        { code: 'GIZA', name: 'Giza' },
        { code: 'SHUBRA', name: 'Shubra' },
        { code: 'NASR', name: 'Nasr City' },
        { code: 'HELIOPOLIS', name: 'Heliopolis' },
        { code: 'MAADI', name: 'Maadi' },
        { code: 'ZAMALEK', name: 'Zamalek' },
        { code: 'DOQQI', name: 'Dokki' },
        { code: 'AGOUZA', name: 'Agouza' },
        { code: 'MOHANDESEEN', name: 'Mohandessin' }
      ]
    },
    { code: 'ALEXANDRIA', name: 'Alexandria',
      cities: [
        { code: 'ALEX', name: 'Alexandria' },
        { code: 'SMOUHA', name: 'Smouha' },
        { code: 'SIDI', name: 'Sidi Gaber' },
        { code: 'MANSHEYA', name: 'Mansheya' },
        { code: 'KA', name: 'Kafr Abdu' },
        { code: 'BORG', name: 'Borg El Arab' },
        { code: 'EL', name: 'El Max' },
        { code: 'ABU', name: 'Abu Qir' },
        { code: 'EDKO', name: 'Edko' },
        { code: 'RASHID', name: 'Rashid' }
      ]
    }
  ]
};

export default egypt;
