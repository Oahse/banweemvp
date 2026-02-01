/**
 * South Sudan country data with states and cities
 */

import { Country } from './index';

export const southsudan: Country = {
  code: 'SS',
  name: 'South Sudan',
  flag: '🇸🇸',
  capital: 'Juba',
  area: 619745,
  currencySymbol: 'SSP',
  officialLanguages: ['English'],
  demonym: 'South Sudanese',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'USD', region: 'MEA' },
  divisions: [
    { code: 'JUB', name: 'Central Equatoria', type: 'state',
      cities: [
        { code: 'JUBA', name: 'Juba' },
        { code: 'KAYA', name: 'Kaya' },
        { code: 'MOROBO', name: 'Morobo' },
        { code: 'LIRIA', name: 'Liria' },
        { code: 'TUMBA', name: 'Tumbura' }
      ]
    },
    { code: 'JUB', name: 'Eastern Equatoria', type: 'state',
      cities: [
        { code: 'TORIT', name: 'Torit' },
        { code: 'KAPOTA', name: 'Kapoeta' },
        { code: 'NIMULE', name: 'Nimule' },
        { code: 'MAGWI', name: 'Magwi' },
        { code: 'IKOTOS', name: 'Ikotos' }
      ]
    },
    { code: 'JUB', name: 'Jonglei', type: 'state',
      cities: [
        { code: 'BOR', name: 'Bor' },
        { code: 'AKOBO', name: 'Akobo' },
        { code: 'PANYAGOR', name: 'Panyagor' },
        { code: 'FANGAK', name: 'Fangak' },
        { code: 'AYOD', name: 'Ayod' }
      ]
    },
    { code: 'JUB', name: 'Lakes', type: 'state',
      cities: [
        { code: 'RUMBEK', name: 'Rumbek' },
        { code: 'YIROL', name: 'Yirol' },
        { code: 'AWERIAL', name: 'Aweil' },
        { code: 'CUEIBET', name: 'Cueibet' },
        { code: 'RAGENG', name: 'Rageng' }
      ]
    },
    { code: 'JUB', name: 'Northern Bahr el Ghazal', type: 'state',
      cities: [
        { code: 'AWERIAL', name: 'Aweil' },
        { code: 'CUEIBET', name: 'Cueibet' },
        { code: 'RAGENG', name: 'Rageng' },
        { code: 'RUMBEK', name: 'Rumbek' },
        { code: 'YIROL', name: 'Yirol' }
      ]
    },
    { code: 'JUB', name: 'Unity', type: 'state',
      cities: [
        { code: 'BENTIU', name: 'Bentiu' },
        { code: 'LEER', name: 'Leer' },
        { code: 'KOCH', name: 'Koch' },
        { code: 'MAYOM', name: 'Mayom' },
        { code: 'RUBKONI', name: 'Rubkona' }
      ]
    },
    { code: 'JUB', name: 'Upper Nile', type: 'state',
      cities: [
        { code: 'MALAKAL', name: 'Malakal' },
        { code: 'RENK', name: 'Renk' },
        { code: 'MELUT', name: 'Melut' },
        { code: 'FASHODA', name: 'Fashoda' },
        { code: 'MABAN', name: 'Maban' }
      ]
    },
    { code: 'JUB', name: 'Warrap', type: 'state',
      cities: [
        { code: 'KUAJOK', name: 'Kuajok' },
        { code: 'TONJ', name: 'Tonj' },
        { code: 'GOGRIAL', name: 'Gogrial' },
        { code: 'TWIC', name: 'Twic' },
        { code: 'TURALEI', name: 'Turalei' }
      ]
    },
    { code: 'JUB', name: 'Western Bahr el Ghazal', type: 'state',
      cities: [
        { code: 'WAU', name: 'Wau' },
        { code: 'RAJA', name: 'Raja' },
        { code: 'NAGERO', name: 'Nagero' },
        { code: 'BAGARI', name: 'Bagari' },
        { code: 'DEIM', name: 'Deim' }
      ]
    },
    { code: 'JUB', name: 'Western Equatoria', type: 'state',
      cities: [
        { code: 'YAMBIO', name: 'Yambio' },
        { code: 'MARIDI', name: 'Maridi' },
        { code: 'TAMBAURA', name: 'Tambura' },
        { code: 'EZO', name: 'Ezo' },
        { code: 'MUNDRI', name: 'Mundri' }
      ]
    }
  ]
};

export default southsudan;
