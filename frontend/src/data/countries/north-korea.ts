/**
 * North Korea country data with provinces and cities
 */

import { Country } from './index';

export const northkorea: Country = {
  code: 'KP',
  name: 'North Korea',
  flag: '🇰🇵',
  capital: 'Pyongyang',
  area: 120538,
  currencySymbol: '₩',
  officialLanguages: ['Korean'],
  demonym: 'North Korean',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'USD', region: 'APAC' },
  divisions: [
    { code: 'PYO', name: 'Pyongyang', type: 'province',
      cities: [
        { code: 'PYONGYANG', name: 'Pyongyang' },
        { code: 'NAMPO', name: 'Nampo' },
        { code: 'WONSAN', name: 'Wonsan' },
        { code: 'SARIWON', name: 'Sariwon' },
        { code: 'KAESONG', name: 'Kaechon' }
      ]
    },
    { code: 'NAM', name: 'Nampo', type: 'province',
      cities: [
        { code: 'NAMPO', name: 'Nampo' },
        { code: 'WONSAN', name: 'Wonsan' },
        { code: 'SARIWON', name: 'Sariwon' },
        { code: 'KAESONG', name: 'Kaechon' },
        { code: 'PYONGYANG', name: 'Pyongyang' }
      ]
    },
    { code: 'WON', name: 'Wonsan', type: 'province',
      cities: [
        { code: 'WONSAN', name: 'Wonsan' },
        { code: 'SARIWON', name: 'Sariwon' },
        { code: 'KAESONG', name: 'Kaechon' },
        { code: 'PYONGYANG', name: 'Pyongyang' },
        { code: 'NAMPO', name: 'Nampo' }
      ]
    },
    { code: 'SAR', name: 'Sariwon', type: 'province',
      cities: [
        { code: 'SARIWON', name: 'Sariwon' },
        { code: 'KAESONG', name: 'Kaechon' },
        { code: 'PYONGYANG', name: 'Pyongyang' },
        { code: 'NAMPO', name: 'Nampo' },
        { code: 'WONSAN', name: 'Wonsan' }
      ]
    },
    { code: 'KAE', name: 'Kaechon', type: 'province',
      cities: [
        { code: 'KAESONG', name: 'Kaechon' },
        { code: 'PYONGYANG', name: 'Pyongyang' },
        { code: 'NAMPO', name: 'Nampo' },
        { code: 'WONSAN', name: 'Wonsan' },
        { code: 'SARIWON', name: 'Sariwon' }
      ]
    }
  ]
};

export default northkorea;
