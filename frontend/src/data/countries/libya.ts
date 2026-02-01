/**
 * Libya country data with districts and cities
 */

import { Country } from './index';

export const libya: Country = {
  code: 'LY',
  name: 'Libya',
  flag: '🇱🇾',
  capital: 'Tripoli',
  area: 1759540,
  currencySymbol: 'ل.د',
  officialLanguages: ['Arabic'],
  demonym: 'Libyan',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'USD', region: 'MEA' },
  divisions: [
    { code: 'TRI', name: 'Tripoli', type: 'district',
      cities: [
        { code: 'TRIPOLI', name: 'Tripoli' },
        { code: 'TAJOURA', name: 'Tajoura' },
        { code: 'JANZOUR', name: 'Janzour' },
        { code: 'GARGARESH', name: 'Gargash' },
        { code: 'MSALLATA', name: 'Msallata' }
      ]
    },
    { code: 'BAN', name: 'Banghazi', type: 'district',
      cities: [
        { code: 'BENGHAZI', name: 'Benghazi' },
        { code: 'BAYDA', name: 'Bayda' },
        { code: 'DERNA', name: 'Derna' },
        { code: 'TOBRUK', name: 'Tobruk' },
        { code: 'AJDABIYA', name: 'Ajdabiya' }
      ]
    },
    { code: 'MIS', name: 'Misrata', type: 'district',
      cities: [
        { code: 'MISRATA', name: 'Misrata' },
        { code: 'ZLITEN', name: 'Zliten' },
        { code: 'KHOMS', name: 'Khoms' },
        { code: 'BANI', name: 'Bani Walid' },
        { code: 'SIRTE', name: 'Sirte' }
      ]
    },
    { code: 'JAB', name: 'Jabal al Gharbi', type: 'district',
      cities: [
        { code: 'GHARYAN', name: 'Gharyan' },
        { code: 'ZAWIYA', name: 'Zawiya' },
        { code: 'AL', name: 'Al Aziziya' },
        { code: 'YEFREN', name: 'Yefren' },
        { code: 'KIKLA', name: 'Kikla' }
      ]
    },
    { code: 'JAF', name: 'Jafara', type: 'district',
      cities: [
        { code: 'ZAWIYA', name: 'Zawiya' },
        { code: 'AL', name: 'Al Ajaylat' },
        { code: 'SURMAN', name: 'Surman' },
        { code: 'ZUWARA', name: 'Zuwarah' },
        { code: 'AJILAT', name: 'Ajilat' }
      ]
    },
    { code: 'MUR', name: 'Murqub', type: 'district',
      cities: [
        { code: 'KHOMS', name: 'Khoms' },
        { code: 'MSALLATA', name: 'Msallata' },
        { code: 'AL', name: 'Al Khums' },
        { code: 'TARHUNA', name: 'Tarhuna' },
        { code: 'BANI', name: 'Bani Walid' }
      ]
    },
    { code: 'NUQ', name: 'Nuqat al Khams', type: 'district',
      cities: [
        { code: 'ZUWARA', name: 'Zuwarah' },
        { code: 'AJILAT', name: 'Ajilat' },
        { code: 'AL', name: 'Al Ajaylat' },
        { code: 'SURMAN', name: 'Surman' },
        { code: 'ZAWIYA', name: 'Zawiya' }
      ]
    },
    { code: 'WAB', name: 'Wadi al Shatii', type: 'district',
      cities: [
        { code: 'BRACK', name: 'Brack' },
        { code: 'UBARI', name: 'Ubari' },
        { code: 'GERMA', name: 'Germa' },
        { code: 'WADI', name: 'Wadi' },
        { code: 'SHATII', name: 'Shatii' }
      ]
    },
    { code: 'FEZ', name: 'Fezzan', type: 'district',
      cities: [
        { code: 'UBARI', name: 'Ubari' },
        { code: 'MURZUQ', name: 'Murzuq' },
        { code: 'GERMA', name: 'Germa' },
        { code: 'GAT', name: 'Ghat' },
        { code: 'AL', name: 'Al Wahat' }
      ]
    },
    { code: 'GAT', name: 'Ghat', type: 'district',
      cities: [
        { code: 'GHAT', name: 'Ghat' },
        { code: 'UBARI', name: 'Ubari' },
        { code: 'AL', name: 'Al Wahat' },
        { code: 'FEZZAN', name: 'Fezzan' },
        { code: 'MURZUQ', name: 'Murzuq' }
      ]
    },
    { code: 'JUF', name: 'Jufra', type: 'district',
      cities: [
        { code: 'HUN', name: 'Hun' },
        { code: 'WADDAN', name: 'Waddan' },
        { code: 'SOKNA', name: 'Sokna' },
        { code: 'FUKA', name: 'Fuka' },
        { code: 'ZALLAH', name: 'Zallah' }
      ]
    },
    { code: 'AL', name: 'Al Wahat', type: 'district',
      cities: [
        { code: 'JALU', name: 'Jalu' },
        { code: 'AWJILA', name: 'Awjila' },
        { code: 'KUFRA', name: 'Kufra' },
        { code: 'TAMERHET', name: 'Tamerhet' },
        { code: 'REBIANA', name: 'Rebyana' }
      ]
    },
    { code: 'BUT', name: 'Butnan', type: 'district',
      cities: [
        { code: 'TOBRUK', name: 'Tobruk' },
        { code: 'DERNA', name: 'Derna' },
        { code: 'BAYDA', name: 'Bayda' },
        { code: 'BENGHAZI', name: 'Benghazi' },
        { code: 'AJDABIYA', name: 'Ajdabiya' }
      ]
    },
    { code: 'DER', name: 'Derna', type: 'district',
      cities: [
        { code: 'DERNA', name: 'Derna' },
        { code: 'BAYDA', name: 'Bayda' },
        { code: 'TOBRUK', name: 'Tobruk' },
        { code: 'AL', name: 'Al Qubbah' },
        { code: 'SHAHAT', name: 'Shahat' }
      ]
    },
    { code: 'MAR', name: 'Marj', type: 'district',
      cities: [
        { code: 'MARJ', name: 'Marj' },
        { code: 'BAYDA', name: 'Bayda' },
        { code: 'AL', name: 'Al Qubbah' },
        { code: 'SHAHAT', name: 'Shahat' },
        { code: 'DERNA', name: 'Derna' }
      ]
    },
    { code: 'ALJ', name: 'Al Jabal al Akhdar', type: 'district',
      cities: [
        { code: 'BAYDA', name: 'Bayda' },
        { code: 'SHAHAT', name: 'Shahat' },
        { code: 'AL', name: 'Al Qubbah' },
        { code: 'MARJ', name: 'Marj' },
        { code: 'DERNA', name: 'Derna' }
      ]
    },
    { code: 'SIR', name: 'Sirte', type: 'district',
      cities: [
        { code: 'SIRTE', name: 'Sirte' },
        { code: 'MISRATA', name: 'Misrata' },
        { code: 'BANI', name: 'Bani Walid' },
        { code: 'KHOMS', name: 'Khoms' },
        { code: 'TARHUNA', name: 'Tarhuna' }
      ]
    },
    { code: 'WAD', name: 'Wadi al Hayaa', type: 'district',
      cities: [
        { code: 'WADI', name: 'Wadi' },
        { code: 'SHATII', name: 'Shatii' },
        { code: 'BRACK', name: 'Brack' },
        { code: 'UBARI', name: 'Ubari' },
        { code: 'GERMA', name: 'Germa' }
      ]
    }
  ]
};

export default libya;
