/**
 * Algeria country data with wilayas and cities
 */

import { Country } from './index';

export const algeria: Country = {
  code: 'DZ',
  name: 'Algeria',
  flag: '🇩🇿',
  capital: 'Algiers',
  area: 2381741,
  currencySymbol: 'د.ج',
  officialLanguages: ['Arabic', 'Berber'],
  demonym: 'Algerian',
  taxInfo: { standardRate: 19, taxName: 'VAT', currency: 'DZD', region: 'MEA' },
  divisions: [
    { code: 'ALGIERS', name: 'Algiers', type: 'wilaya',
      cities: [
        { code: 'ALGIER', name: 'Algiers' },
        { code: 'ORAN', name: 'Oran' },
        { code: 'CONSTANTINE', name: 'Constantine' },
        { code: 'ANNABA', name: 'Annaba' },
        { code: 'BLIDA', name: 'Blida' },
        { code: 'BATNA', name: 'Batna' },
        { code: 'DJELFA', name: 'Djelfa' },
        { code: 'SETIF', name: 'Sétif' },
        { code: 'SIDI', name: 'Sidi Bel Abbès' },
        { code: 'SKIKDA', name: 'Skikda' }
      ]
    },
    { code: 'ORAN', name: 'Oran', type: 'wilaya',
      cities: [
        { code: 'ORAN', name: 'Oran' },
        { code: 'MOSTAGANEM', name: 'Mostaganem' },
        { code: 'ARZEW', name: 'Arzew' },
        { code: 'MASCARA', name: 'Mascara' },
        { code: 'RELIZANE', name: 'Relizane' }
      ]
    },
    { code: 'CONSTANTINE', name: 'Constantine', type: 'wilaya',
      cities: [
        { code: 'CONSTANTINE', name: 'Constantine' },
        { code: 'SETIF', name: 'Sétif' },
        { code: 'ANNABA', name: 'Annaba' },
        { code: 'JIJEL', name: 'Jijel' },
        { code: 'MILA', name: 'Mila' }
      ]
    },
    { code: 'ANNABA', name: 'Annaba', type: 'wilaya',
      cities: [
        { code: 'ANNABA', name: 'Annaba' },
        { code: 'ELTAREF', name: 'El Taref' },
        { code: 'GUELMA', name: 'Guelma' },
        { code: 'SOUKAHRAS', name: 'Souk Ahras' },
        { code: 'TEBESSA', name: 'Tébessa' }
      ]
    },
    { code: 'BLIDA', name: 'Blida', type: 'wilaya',
      cities: [
        { code: 'BLIDA', name: 'Blida' },
        { code: 'BOUMERDES', name: 'Boumerdès' },
        { code: 'TIPAZA', name: 'Tipaza' },
        { code: 'AINDEFLA', name: 'Ain Defla' },
        { code: 'CHLEF', name: 'Chlef' }
      ]
    },
    { code: 'BATNA', name: 'Batna', type: 'wilaya',
      cities: [
        { code: 'BATNA', name: 'Batna' },
        { code: 'KHENCHELA', name: 'Khenchela' },
        { code: 'MSILA', name: 'M\'sila' },
        { code: 'BORDJ', name: 'Bordj Bou Arréridj' },
        { code: 'SETIF', name: 'Sétif' }
      ]
    },
    { code: 'DJELFA', name: 'Djelfa', type: 'wilaya',
      cities: [
        { code: 'DJELFA', name: 'Djelfa' },
        { code: 'LAGHOUAT', name: 'Laghouat' },
        { code: 'Ghardaïa', name: 'Ghardaïa' },
        { code: 'ELBAYADH', name: 'El Bayadh' },
        { code: 'NAAMA', name: 'Naâma' }
      ]
    },
    { code: 'SETIF', name: 'Sétif', type: 'wilaya',
      cities: [
        { code: 'SETIF', name: 'Sétif' },
        { code: 'CONSTANTINE', name: 'Constantine' },
        { code: 'BATNA', name: 'Batna' },
        { code: 'BORDJ', name: 'Bordj Bou Arréridj' },
        { code: 'MSILA', name: 'M\'sila' }
      ]
    },
    { code: 'SIDI', name: 'Sidi Bel Abbès', type: 'wilaya',
      cities: [
        { code: 'SIDI', name: 'Sidi Bel Abbès' },
        { code: 'ORAN', name: 'Oran' },
        { code: 'MASCARA', name: 'Mascara' },
        { code: 'MOSTAGANEM', name: 'Mostaganem' },
        { code: 'RELIZANE', name: 'Relizane' }
      ]
    },
    { code: 'SKIKDA', name: 'Skikda', type: 'wilaya',
      cities: [
        { code: 'SKIKDA', name: 'Skikda' },
        { code: 'ANNABA', name: 'Annaba' },
        { code: 'CONSTANTINE', name: 'Constantine' },
        { code: 'JIJEL', name: 'Jijel' },
        { code: 'MILA', name: 'Mila' }
      ]
    }
  ]
};

export default algeria;
