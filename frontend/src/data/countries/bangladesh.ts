/**
 * Bangladesh country data with divisions and districts
 */

import { Country } from './index';

export const bangladesh: Country = {
  code: 'BD',
  name: 'Bangladesh',
  flag: '🇧🇩',
  capital: 'Dhaka',
  area: 147570,
  currencySymbol: '৳',
  officialLanguages: ['Bengali'],
  demonym: 'Bangladeshi',
  taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'BDT', region: 'APAC' },
  divisions: [
    { code: 'DH', name: 'Dhaka', type: 'division',
      cities: [
        { code: 'DHAKA', name: 'Dhaka' },
        { code: 'GAZIPUR', name: 'Gazipur' },
        { code: 'NARAYANGANJ', name: 'Narayanganj' },
        { code: 'MANIKGANJ', name: 'Manikganj' },
        { code: 'MUNSHIGANJ', name: 'Munshiganj' }
      ]
    },
    { code: 'CTG', name: 'Chattogram', type: 'division',
      cities: [
        { code: 'CHATTAGRAM', name: 'Chattogram' },
        { code: 'COXSBAZAR', name: 'Cox\'s Bazar' },
        { code: 'COMILLA', name: 'Comilla' },
        { code: 'FENI', name: 'Feni' },
        { code: 'BRAHMANBARIA', name: 'Brahmanbaria' }
      ]
    },
    { code: 'RJ', name: 'Rajshahi', type: 'division',
      cities: [
        { code: 'RAJSHAHI', name: 'Rajshahi' },
        { code: 'BOGURA', name: 'Bogura' },
        { code: 'PABNA', name: 'Pabna' },
        { code: 'SIRAJGANJ', name: 'Sirajganj' },
        { code: 'NATORE', name: 'Natore' }
      ]
    },
    { code: 'KH', name: 'Khulna', type: 'division',
      cities: [
        { code: 'KHULNA', name: 'Khulna' },
        { code: 'JESSORE', name: 'Jessore' },
        { code: 'SATKHIRA', name: 'Satkhira' },
        { code: 'MEHERPUR', name: 'Meherpur' },
        { code: 'BAGERHAT', name: 'Bagerhat' }
      ]
    },
    { code: 'SYL', name: 'Sylhet', type: 'division',
      cities: [
        { code: 'SYLHET', name: 'Sylhet' },
        { code: 'MOULVIBAZAR', name: 'Moulvibazar' },
        { code: 'HABIGANJ', name: 'Habiganj' },
        { code: 'SUNAMGANJ', name: 'Sunamganj' },
        { code: 'BRAHMANBARIA', name: 'Brahmanbaria' }
      ]
    },
    { code: 'BAR', name: 'Barishal', type: 'division',
      cities: [
        { code: 'BARISHAL', name: 'Barishal' },
        { code: 'PIROJPUR', name: 'Pirojpur' },
        { code: 'JHALOKATHI', name: 'Jhalokathi' },
        { code: 'BHOLA', name: 'Bhola' },
        { code: 'PATUAKHALI', name: 'Patuakhali' }
      ]
    },
    { code: 'RNG', name: 'Rangpur', type: 'division',
      cities: [
        { code: 'RANGPUR', name: 'Rangpur' },
        { code: 'DINAJPUR', name: 'Dinajpur' },
        { code: 'GAIBANDHA', name: 'Gaibandha' },
        { code: 'KURIGRAM', name: 'Kurigram' },
        { code: 'LALMONIRHAT', name: 'Lalmonirhat' }
      ]
    },
    { code: 'MYM', name: 'Mymensingh', type: 'division',
      cities: [
        { code: 'MYMENSINGH', name: 'Mymensingh' },
        { code: 'NETRAKONA', name: 'Netrakona' },
        { code: 'KISHOREGANJ', name: 'Kishoreganj' },
        { code: 'JAMALPUR', name: 'Jamalpur' },
        { code: 'SHERPUR', name: 'Sherpur' }
      ]
    }
  ]
};
