/**
 * South Africa country data with provinces and cities
 */

import { Country } from './index';

export const southafrica: Country = {
  code: 'ZA',
  name: 'South Africa',
  flag: '🇿🇦',
  capital: 'Pretoria',
  area: 1221037,
  currencySymbol: 'R',
  officialLanguages: ['English', 'Afrikaans', 'Zulu', 'Xhosa'],
  demonym: 'South African',
  taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'ZAR', region: 'MEA' },
  divisions: [
    { code: 'GP', name: 'Gauteng', type: 'province',
      cities: [
        { code: 'JHB', name: 'Johannesburg' },
        { code: 'PTA', name: 'Pretoria' },
        { code: 'SOWETO', name: 'Soweto' },
        { code: 'BENONI', name: 'Benoni' },
        { code: 'BOKSBURG', name: 'Boksburg' }
      ]
    },
    { code: 'WC', name: 'Western Cape', type: 'province',
      cities: [
        { code: 'CPT', name: 'Cape Town' },
        { code: 'STELLENBOSCH', name: 'Stellenbosch' },
        { code: 'PAARL', name: 'Paarl' },
        { code: 'WORCESTER', name: 'Worcester' },
        { code: 'GEORGE', name: 'George' }
      ]
    },
    { code: 'KZN', name: 'KwaZulu-Natal', type: 'province',
      cities: [
        { code: 'DBN', name: 'Durban' },
        { code: 'PMB', name: 'Pietermaritzburg' },
        { code: 'RICHARDS', name: 'Richards Bay' },
        { code: 'UMHLANGA', name: 'Umhlanga' },
        { code: 'BALLITO', name: 'Ballito' }
      ]
    },
    { code: 'EC', name: 'Eastern Cape', type: 'province',
      cities: [
        { code: 'BISHO', name: 'Bisho' },
        { code: 'PORT', name: 'Port Elizabeth' },
        { code: 'EAST', name: 'East London' },
        { code: 'WELKOM', name: 'Welkom' },
        { code: 'QUEENSTOWN', name: 'Queenstown' }
      ]
    },
    { code: 'FS', name: 'Free State', type: 'province',
      cities: [
        { code: 'BLOEM', name: 'Bloemfontein' },
        { code: 'WELKOM', name: 'Welkom' },
        { code: 'KIMBERLEY', name: 'Kimberley' },
        { code: 'BETHLEHEM', name: 'Bethlehem' },
        { code: 'KROONSTAD', name: 'Kroonstad' }
      ]
    },
    { code: 'NW', name: 'North West', type: 'province',
      cities: [
        { code: 'MAFIKENG', name: 'Mahikeng' },
        { code: 'RUSTENBURG', name: 'Rustenburg' },
        { code: 'KLERKSDORP', name: 'Klerksdorp' },
        { code: 'POTCHEFSTROOM', name: 'Potchefstroom' },
        { code: 'BRITS', name: 'Brits' }
      ]
    },
    { code: 'LP', name: 'Limpopo', type: 'province',
      cities: [
        { code: 'POLOKWANE', name: 'Polokwane' },
        { code: 'MOKOPANE', name: 'Mokopane' },
        { code: 'THOHOYANDOU', name: 'Thohoyandou' },
        { code: 'TZAANE', name: 'Tzaneen' },
        { code: 'BELABELA', name: 'Bela-Bela' }
      ]
    },
    { code: 'MP', name: 'Mpumalanga', type: 'province',
      cities: [
        { code: 'NELSPRUIT', name: 'Nelspruit' },
        { code: 'MBOMBELA', name: 'Mbombela' },
        { code: 'WITBANK', name: 'Witbank' },
        { code: 'SECUNDA', name: 'Secunda' },
        { code: 'SABIE', name: 'Sabie' }
      ]
    },
    { code: 'NC', name: 'Northern Cape', type: 'province',
      cities: [
        { code: 'KIMBERLEY', name: 'Kimberley' },
        { code: 'UPINGTON', name: 'Upington' },
        { code: 'SPRINGBOK', name: 'Springbok' },
        { code: 'DE', name: 'De Aar' },
        { code: 'KURUMAN', name: 'Kuruman' }
      ]
    }
  ]
};

export default southafrica;
