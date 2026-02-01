/**
 * Zimbabwe country data with provinces and cities
 */

import { Country } from './index';

export const zimbabwe: Country = {
    code: 'ZW',
    name: 'Zimbabwe',
    flag: '🇿🇼',
    capital: 'Harare',
    area: 390757,
    currencySymbol: '$',
    officialLanguages: ['English', 'Shona', 'Ndebele'],
    demonym: 'Zimbabwean',
    taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'ZWL', region: 'MEA' },
    divisions: [
      { code: 'HA', name: 'Harare', type: 'province',
        cities: [
          { code: 'HAR', name: 'Harare' },
          { code: 'CHI', name: 'Chitungwiza' },
          { code: 'EPW', name: 'Epworth' },
          { code: 'RUW', name: 'Ruwa' },
          { code: 'NORT', name: 'Norton' }
        ]
      },
      { code: 'BU', name: 'Bulawayo', type: 'province',
        cities: [
          { code: 'BUL', name: 'Bulawayo' },
          { code: 'VIC', name: 'Victoria Falls' },
          { code: 'PLU', name: 'Plumtree' },
          { code: 'GWA', name: 'Gwanda' },
          { code: 'BEI', name: 'Beitbridge' }
        ]
      },
      { code: 'MA', name: 'Manicaland', type: 'province',
        cities: [
          { code: 'MUT', name: 'Mutare' },
          { code: 'RUS', name: 'Rusape' },
          { code: 'CHIP', name: 'Chipinge' },
          { code: 'NYA', name: 'Nyanga' },
          { code: 'MUT2', name: 'Mutasa' }
        ]
      },
      { code: 'MAC', name: 'Mashonaland Central', type: 'province',
        cities: [
          { code: 'BIN', name: 'Bindura' },
          { code: 'SHAM', name: 'Shamva' },
          { code: 'GURU', name: 'Guruve' },
          { code: 'MOUNT', name: 'Mount Darwin' },
          { code: 'RUSH', name: 'Rushinga' }
        ]
      },
      { code: 'MAE', name: 'Mashonaland East', type: 'province',
        cities: [
          { code: 'MAR', name: 'Marondera' },
          { code: 'CHIV', name: 'Chivhu' },
          { code: 'MURE', name: 'Murehwa' },
          { code: 'GOR', name: 'Goromonzi' },
          { code: 'SEKE', name: 'Seke' }
        ]
      },
      { code: 'MAW', name: 'Mashonaland West', type: 'province',
        cities: [
          { code: 'CHIN', name: 'Chinhoyi' },
          { code: 'KAR', name: 'Kariba' },
          { code: 'CHEGUTU', name: 'Chegutu' },
          { code: 'KADOMA', name: 'Kadoma' },
          { code: 'NORTON', name: 'Norton' }
        ]
      },
      { code: 'MAS', name: 'Masvingo', type: 'province',
        cities: [
          { code: 'MAS', name: 'Masvingo' },
          { code: 'ZAK', name: 'Zaka' },
          { code: 'CHIR', name: 'Chiredzi' },
          { code: 'BIK', name: 'Bikita' },
          { code: 'GUTU', name: 'Gutu' }
        ]
      },
      { code: 'MAN', name: 'Matabeleland North', type: 'province',
        cities: [
          { code: 'VIC', name: 'Victoria Falls' },
          { code: 'HWA', name: 'Hwange' },
          { code: 'LUP', name: 'Lupane' },
          { code: 'NKA', name: 'Nkayi' },
          { code: 'BUB', name: 'Bubi' }
        ]
      },
      { code: 'MAS', name: 'Matabeleland South', type: 'province',
        cities: [
          { code: 'GWE', name: 'Gwanda' },
          { code: 'BEI', name: 'Beitbridge' },
          { code: 'INS', name: 'Inyathi' },
          { code: 'PLU', name: 'Plumtree' },
          { code: 'MAT', name: 'Matobo' }
        ]
      },
      { code: 'MID', name: 'Midlands', type: 'province',
        cities: [
          { code: 'GWE', name: 'Gweru' },
          { code: 'KWE', name: 'Kwekwe' },
          { code: 'RED', name: 'Redcliff' },
          { code: 'SHUR', name: 'Shurugwi' },
          { code: 'ZVIM', name: 'Zvishavane' }
        ]
      }
    ]
  };
