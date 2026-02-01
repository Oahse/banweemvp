/**
 * Zimbabwe country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const zimbabwe: Country = {
    code: 'ZW',
    name: 'Zimbabwe',
    taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'ZWL', region: 'MEA' },
    provinces: [
      { code: 'HA', name: 'Harare',
        cities: [
          { code: 'HAR', name: 'Harare' },
          { code: 'CHI', name: 'Chitungwiza' },
          { code: 'EPW', name: 'Epworth' },
          { code: 'RUW', name: 'Ruwa' },
          { code: 'NORT', name: 'Norton' },
          { code: 'MAR', name: 'Marondera' },
          { code: 'MUT', name: 'Mutare' },
          { code: 'GWE', name: 'Gweru' },
          { code: 'KWE', name: 'Kwekwe' },
          { code: 'MAS', name: 'Masvingo' }
        ]
      },
      { code: 'BU', name: 'Bulawayo',
        cities: [
          { code: 'BUL', name: 'Bulawayo' },
          { code: 'VIC', name: 'Victoria Falls' },
          { code: 'PLU', name: 'Plumtree' },
          { code: 'GWA', name: 'Gwanda' },
          { code: 'BEI', name: 'Beitbridge' },
          { code: 'INS', name: 'Inyathi' },
          { code: 'TSH', name: 'Tsholotsho' },
          { code: 'UMGU', name: 'Umgungundlovu' },
          { code: 'BUB', name: 'Bubi' },
          { code: 'NKAI', name: 'Nkayi' }
        ]
      },
      { code: 'MA', name: 'Manicaland',
        cities: [
          { code: 'MUT', name: 'Mutare' },
          { code: 'RUS', name: 'Rusape' },
          { code: 'CHIP', name: 'Chipinge' },
          { code: 'NYA', name: 'Nyanga' },
          { code: 'MUT2', name: 'Mutasa' },
          { code: 'MUT3', name: 'Mutoko' },
          { code: 'MUT4', name: 'Mutoko' },
          { code: 'MUT5', name: 'Mutoko' },
          { code: 'MUT6', name: 'Mutoko' },
          { code: 'MUT7', name: 'Mutoko' }
        ]
      },
      { code: 'MA2', name: 'Mashonaland Central',
        cities: [
          { code: 'BIN', name: 'Bindura' },
          { code: 'SHAM', name: 'Shamva' },
          { code: 'GURU', name: 'Guruve' },
          { code: 'MOUNT', name: 'Mount Darwin' },
          { code: 'RUSH', name: 'Rushinga' },
          { code: 'MAZ', name: 'Mazowe' },
          { code: 'CENT', name: 'Centenary' },
          { code: 'GURU2', name: 'Guruve' },
          { code: 'SHAM2', name: 'Shamva' },
          { code: 'BIN2', name: 'Bindura' }
        ]
      },
      { code: 'MA3', name: 'Mashonaland East',
        cities: [
          { code: 'MAR', name: 'Marondera' },
          { code: 'CHIV', name: 'Chivhu' },
          { code: 'MURE', name: 'Murehwa' },
          { code: 'GOR', name: 'Goromonzi' },
          { code: 'SEKE', name: 'Seke' },
          { code: 'WEDZA', name: 'Wedza' },
          { code: 'MUT', name: 'Mutoko' },
          { code: 'MUT2', name: 'Mutoko' },
          { code: 'MUT3', name: 'Mutoko' },
          { code: 'MUT4', name: 'Mutoko' }
        ]
      },
      { code: 'MA4', name: 'Mashonaland West',
        cities: [
          { code: 'CHIN', name: 'Chinhoyi' },
          { code: 'KAR', name: 'Kariba' },
          { code: 'KAR2', name: 'Kariba' },
          { code: 'KAR3', name: 'Kariba' },
          { code: 'KAR4', name: 'Kariba' },
          { code: 'KAR5', name: 'Kariba' },
          { code: 'KAR6', name: 'Kariba' },
          { code: 'KAR7', name: 'Kariba' },
          { code: 'KAR8', name: 'Kariba' },
          { code: 'KAR9', name: 'Kariba' }
        ]
      },
      { code: 'MA5', name: 'Masvingo',
        cities: [
          { code: 'MAS', name: 'Masvingo' },
          { code: 'ZAK', name: 'Zaka' },
          { code: 'CHIR', name: 'Chiredzi' },
          { code: 'BIK', name: 'Bikita' },
          { code: 'GUTU', name: 'Gutu' },
          { code: 'MWEN', name: 'Mwenezi' },
          { code: 'CHIR2', name: 'Chivi' },
          { code: 'MAS2', name: 'Masvingo' },
          { code: 'ZAK2', name: 'Zaka' },
          { code: 'CHIR3', name: 'Chiredzi' }
        ]
      },
      { code: 'MA6', name: 'Matabeleland North',
        cities: [
          { code: 'VIC', name: 'Victoria Falls' },
          { code: 'HWA', name: 'Hwange' },
          { code: 'LUP', name: 'Lupane' },
          { code: 'NKA', name: 'Nkayi' },
          { code: 'BUB', name: 'Bubi' },
          { code: 'TSH', name: 'Tsholotsho' },
          { code: 'UMGU', name: 'Umgungundlovu' },
          { code: 'NKAI', name: 'Nkayi' },
          { code: 'BUB2', name: 'Bubi' },
          { code: 'TSH2', name: 'Tsholotsho' }
        ]
      },
      { code: 'MA7', name: 'Matabeleland South',
        cities: [
          { code: 'GWE', name: 'Gwanda' },
          { code: 'BEI', name: 'Beitbridge' },
          { code: 'INS', name: 'Inyathi' },
          { code: 'PLU', name: 'Plumtree' },
          { code: 'MAT', name: 'Matobo' },
          { code: 'UMGU', name: 'Umgungundlovu' },
          { code: 'NKAI', name: 'Nkayi' },
          { code: 'BUB', name: 'Bubi' },
          { code: 'TSH', name: 'Tsholotsho' },
          { code: 'UMG2', name: 'Umgungundlovu' }
        ]
      },
      { code: 'MA8', name: 'Midlands',
        cities: [
          { code: 'GWE', name: 'Gweru' },
          { code: 'KWE', name: 'Kwekwe' },
          { code: 'RED', name: 'Redcliff' },
          { code: 'SHUR', name: 'Shurugwi' },
          { code: 'ZVIM', name: 'Zvishavane' },
          { code: 'MVER', name: 'Mvuma' },
          { code: 'CHIR', name: 'Chirundu' },
          { code: 'GOK', name: 'Gokwe' },
          { code: 'GOK2', name: 'Gokwe' },
          { code: 'GOK3', name: 'Gokwe' }
        ]
      }
    ]
  };
