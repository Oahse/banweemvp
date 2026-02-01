/**
 * Qatar country data with regions, cities, and tax information
 */

import { Country } from './index';

export const qatar: Country = {
    code: 'QA',
    name: 'Qatar',
    taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'QAR', region: 'MEA' },
    provinces: [
      { code: 'DOH', name: 'Doha',
        cities: [
          { code: 'DOH', name: 'Doha' },
          { code: 'RAY', name: 'Rayyan' },
          { code: 'AL', name: 'Al Khor' },
          { code: 'ALW', name: 'Al Wakrah' },
          { code: 'ALD', name: 'Al Daayen' },
          { code: 'UMM', name: 'Umm Salal' },
          { code: 'SHAH', name: 'Al Shahaniya' },
          { code: 'DUK', name: 'Dukhan' },
          { code: 'ZIK', name: 'Zikreet' },
          { code: 'MESA', name: 'Mesaieed' }
        ]
      },
      { code: 'RAY', name: 'Rayyan',
        cities: [
          { code: 'RAY', name: 'Rayyan' },
          { code: 'DOH', name: 'Doha' },
          { code: 'AL', name: 'Al Khor' },
          { code: 'ALW', name: 'Al Wakrah' },
          { code: 'ALD', name: 'Al Daayen' },
          { code: 'UMM', name: 'Umm Salal' },
          { code: 'SHAH', name: 'Al Shahaniya' },
          { code: 'DUK', name: 'Dukhan' },
          { code: 'ZIK', name: 'Zikreet' },
          { code: 'MESA', name: 'Mesaieed' }
        ]
      },
      { code: 'AL', name: 'Al Khor',
        cities: [
          { code: 'AL', name: 'Al Khor' },
          { code: 'DOH', name: 'Doha' },
          { code: 'RAY', name: 'Rayyan' },
          { code: 'ALW', name: 'Al Wakrah' },
          { code: 'ALD', name: 'Al Daayen' },
          { code: 'UMM', name: 'Umm Salal' },
          { code: 'SHAH', name: 'Al Shahaniya' },
          { code: 'DUK', name: 'Dukhan' },
          { code: 'ZIK', name: 'Zikreet' },
          { code: 'MESA', name: 'Mesaieed' }
        ]
      },
      { code: 'ALW', name: 'Al Wakrah',
        cities: [
          { code: 'ALW', name: 'Al Wakrah' },
          { code: 'DOH', name: 'Doha' },
          { code: 'RAY', name: 'Rayyan' },
          { code: 'AL', name: 'Al Khor' },
          { code: 'ALD', name: 'Al Daayen' },
          { code: 'UMM', name: 'Umm Salal' },
          { code: 'SHAH', name: 'Al Shahaniya' },
          { code: 'DUK', name: 'Dukhan' },
          { code: 'ZIK', name: 'Zikreet' },
          { code: 'MESA', name: 'Mesaieed' }
        ]
      },
      { code: 'ALD', name: 'Al Daayen',
        cities: [
          { code: 'ALD', name: 'Al Daayen' },
          { code: 'DOH', name: 'Doha' },
          { code: 'RAY', name: 'Rayyan' },
          { code: 'AL', name: 'Al Khor' },
          { code: 'ALW', name: 'Al Wakrah' },
          { code: 'UMM', name: 'Umm Salal' },
          { code: 'SHAH', name: 'Al Shahaniya' },
          { code: 'DUK', name: 'Dukhan' },
          { code: 'ZIK', name: 'Zikreet' },
          { code: 'MESA', name: 'Mesaieed' }
        ]
      },
      { code: 'UMM', name: 'Umm Salal',
        cities: [
          { code: 'UMM', name: 'Umm Salal' },
          { code: 'DOH', name: 'Doha' },
          { code: 'RAY', name: 'Rayyan' },
          { code: 'AL', name: 'Al Khor' },
          { code: 'ALW', name: 'Al Wakrah' },
          { code: 'ALD', name: 'Al Daayen' },
          { code: 'SHAH', name: 'Al Shahaniya' },
          { code: 'DUK', name: 'Dukhan' },
          { code: 'ZIK', name: 'Zikreet' },
          { code: 'MESA', name: 'Mesaieed' }
        ]
      },
      { code: 'SHAH', name: 'Al Shahaniya',
        cities: [
          { code: 'SHAH', name: 'Al Shahaniya' },
          { code: 'DOH', name: 'Doha' },
          { code: 'RAY', name: 'Rayyan' },
          { code: 'AL', name: 'Al Khor' },
          { code: 'ALW', name: 'Al Wakrah' },
          { code: 'ALD', name: 'Al Daayen' },
          { code: 'UMM', name: 'Umm Salal' },
          { code: 'DUK', name: 'Dukhan' },
          { code: 'ZIK', name: 'Zikreet' },
          { code: 'MESA', name: 'Mesaieed' }
        ]
      },
      { code: 'DUK', name: 'Dukhan',
        cities: [
          { code: 'DUK', name: 'Dukhan' },
          { code: 'DOH', name: 'Doha' },
          { code: 'RAY', name: 'Rayyan' },
          { code: 'AL', name: 'Al Khor' },
          { code: 'ALW', name: 'Al Wakrah' },
          { code: 'ALD', name: 'Al Daayen' },
          { code: 'UMM', name: 'Umm Salal' },
          { code: 'SHAH', name: 'Al Shahaniya' },
          { code: 'ZIK', name: 'Zikreet' },
          { code: 'MESA', name: 'Mesaieed' }
        ]
      },
      { code: 'ZIK', name: 'Zikreet',
        cities: [
          { code: 'ZIK', name: 'Zikreet' },
          { code: 'DOH', name: 'Doha' },
          { code: 'RAY', name: 'Rayyan' },
          { code: 'AL', name: 'Al Khor' },
          { code: 'ALW', name: 'Al Wakrah' },
          { code: 'ALD', name: 'Al Daayen' },
          { code: 'UMM', name: 'Umm Salal' },
          { code: 'SHAH', name: 'Al Shahaniya' },
          { code: 'DUK', name: 'Dukhan' },
          { code: 'MESA', name: 'Mesaieed' }
        ]
      },
      { code: 'MESA', name: 'Mesaieed',
        cities: [
          { code: 'MESA', name: 'Mesaieed' },
          { code: 'DOH', name: 'Doha' },
          { code: 'RAY', name: 'Rayyan' },
          { code: 'AL', name: 'Al Khor' },
          { code: 'ALW', name: 'Al Wakrah' },
          { code: 'ALD', name: 'Al Daayen' },
          { code: 'UMM', name: 'Umm Salal' },
          { code: 'SHAH', name: 'Al Shahaniya' },
          { code: 'DUK', name: 'Dukhan' },
          { code: 'ZIK', name: 'Zikreet' }
        ]
      }
    ]
  };
