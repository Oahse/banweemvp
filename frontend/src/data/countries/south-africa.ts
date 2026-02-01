/**
 * South Africa country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const southafrica: Country = {
  code: 'ZA',
  name: 'South Africa',
  taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'ZAR', region: 'MEA' },
  provinces: [
    { code: 'GP', name: 'Gauteng',
      cities: [
        { code: 'JHB', name: 'Johannesburg' },
        { code: 'PTA', name: 'Pretoria' },
        { code: 'SOWETO', name: 'Soweto' },
        { code: 'BENONI', name: 'Benoni' },
        { code: 'BOKSBURG', name: 'Boksburg' },
        { code: 'GERMISTON', name: 'Germiston' },
        { code: 'KEMPTON', name: 'Kempton Park' },
        { code: 'ROODEPOORT', name: 'Roodepoort' },
        { code: 'RANDBURG', name: 'Randburg' },
        { code: 'MIDRAND', name: 'Midrand' }
      ]
    },
    { code: 'WC', name: 'Western Cape',
      cities: [
        { code: 'CPT', name: 'Cape Town' },
        { code: 'STELLENBOSCH', name: 'Stellenbosch' },
        { code: 'PAARL', name: 'Paarl' },
        { code: 'WORCESTER', name: 'Worcester' },
        { code: 'GEORGE', name: 'George' },
        { code: 'MOSSEL', name: 'Mossel Bay' },
        { code: 'SOMERSET', name: 'Somerset West' },
        { code: 'HERMANUS', name: 'Hermanus' },
        { code: 'VREDENDAL', name: 'Vredendal' },
        { code: 'MALMESBURY', name: 'Malmesbury' }
      ]
    },
    { code: 'KZN', name: 'KwaZulu-Natal',
      cities: [
        { code: 'DBN', name: 'Durban' },
        { code: 'PMB', name: 'Pietermaritzburg' },
        { code: 'RICHARDS', name: 'Richards Bay' },
        { code: 'UMHLANGA', name: 'Umhlanga' },
        { code: 'BALLITO', name: 'Ballito' },
        { code: 'NEWCASTLE', name: 'Newcastle' },
        { code: 'LADYSMITH', name: 'Ladysmith' },
        { code: 'PINETOWN', name: 'Pinetown' },
        { code: 'ULUNDI', name: 'Ulundi' },
        { code: 'MARGATE', name: 'Margate' }
      ]
    }
  ]
};

export default southafrica;
