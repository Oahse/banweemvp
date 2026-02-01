/**
 * Hong Kong country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const hongkong: Country = {
  code: 'HK',
  name: 'Hong Kong',
  taxInfo: { standardRate: 0, taxName: 'No VAT/GST', currency: 'HKD', region: 'APAC' },
  provinces: [
    { code: 'HKI', name: 'Hong Kong Island',
      cities: [
        { code: 'CENTRAL', name: 'Central' },
        { code: 'ADMIRALTY', name: 'Admiralty' },
        { code: 'WAN', name: 'Wan Chai' },
        { code: 'CAUSEWAY', name: 'Causeway Bay' },
        { code: 'QUARRY', name: 'Quarry Bay' },
        { code: 'SAI', name: 'Sai Wan Ho' },
        { code: 'SHAU', name: 'Shau Kei Wan' },
        { code: 'CHAI', name: 'Chai Wan' },
        { code: 'ABERDEEN', name: 'Aberdeen' },
        { code: 'REPULSE', name: 'Repulse Bay' }
      ]
    },
    { code: 'KLN', name: 'Kowloon',
      cities: [
        { code: 'TSIM', name: 'Tsim Sha Tsui' },
        { code: 'JORDAN', name: 'Jordan' },
        { code: 'YAUMATEI', name: 'Yau Ma Tei' },
        { code: 'MONG', name: 'Mong Kok' },
        { code: 'PRINCE', name: 'Prince Edward' },
        { code: 'HUNG', name: 'Hung Hom' },
        { code: 'TO', name: 'To Kwa Wan' },
        { code: 'KOWLOON', name: 'Kowloon City' },
        { code: 'DIAMOND', name: 'Diamond Hill' },
        { code: 'WONG', name: 'Wong Tai Sin' }
      ]
    },
    { code: 'NT', name: 'New Territories',
      cities: [
        { code: 'TSUEN', name: 'Tsuen Wan' },
        { code: 'TUEN', name: 'Tuen Mun' },
        { code: 'YUEN', name: 'Yuen Long' },
        { code: 'TIN', name: 'Tin Shui Wai' },
        { code: 'FANLING', name: 'Fanling' },
        { code: 'TAI', name: 'Tai Po' },
        { code: 'SHA', name: 'Sha Tin' },
        { code: 'MA', name: 'Ma On Shan' },
        { code: 'TUEN2', name: 'Tung Chung' },
        { code: 'DISCOVERY', name: 'Discovery Bay' }
      ]
    },
    { code: 'OUT', name: 'Outlying Islands',
      cities: [
        { code: 'CHEUNG', name: 'Cheung Chau' },
        { code: 'LAMMA', name: 'Lamma Island' },
        { code: 'PENG', name: 'Peng Chau' },
        { code: 'LANTAU', name: 'Lantau Island' },
        { code: 'SHEK', name: 'Shek Pik' },
        { code: 'TAI', name: 'Tai O' },
        { code: 'PO', name: 'Po Toi Islands' },
        { code: 'MUI', name: 'Mui Wo' },
        { code: 'PENG2', name: 'Peng Chau' },
        { code: 'MA', name: 'Ma Wan' }
      ]
    }
  ]
};

export default hongkong;
