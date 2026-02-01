/**
 * United Arab Emirates country data with regions, cities, and tax information
 */

import { Country } from './index';

export const unitedArabEmirates: Country = {
    code: 'AE',
    name: 'United Arab Emirates',
    taxInfo: { standardRate: 5, taxName: 'VAT', currency: 'AED', region: 'MEA' },
    provinces: [
      { code: 'DUB', name: 'Dubai',
        cities: [
          { code: 'DUB', name: 'Dubai' },
          { code: 'ABU', name: 'Abu Dhabi' },
          { code: 'SHJ', name: 'Sharjah' },
          { code: 'AJM', name: 'Ajman' },
          { code: 'UAQ', name: 'Umm Al Quwain' },
          { code: 'RAS', name: 'Ras Al Khaimah' },
          { code: 'FUJ', name: 'Fujairah' },
          { code: 'AL', name: 'Al Ain' },
          { code: 'DIB', name: 'Dibba' },
          { code: 'KAL', name: 'Khalifa City' }
        ]
      },
      { code: 'ABU', name: 'Abu Dhabi',
        cities: [
          { code: 'ABU', name: 'Abu Dhabi' },
          { code: 'DUB', name: 'Dubai' },
          { code: 'SHJ', name: 'Sharjah' },
          { code: 'AJM', name: 'Ajman' },
          { code: 'UAQ', name: 'Umm Al Quwain' },
          { code: 'RAS', name: 'Ras Al Khaimah' },
          { code: 'FUJ', name: 'Fujairah' },
          { code: 'AL', name: 'Al Ain' },
          { code: 'DIB', name: 'Dibba' },
          { code: 'KAL', name: 'Khalifa City' }
        ]
      },
      { code: 'SHJ', name: 'Sharjah',
        cities: [
          { code: 'SHJ', name: 'Sharjah' },
          { code: 'DUB', name: 'Dubai' },
          { code: 'ABU', name: 'Abu Dhabi' },
          { code: 'AJM', name: 'Ajman' },
          { code: 'UAQ', name: 'Umm Al Quwain' },
          { code: 'RAS', name: 'Ras AlKhaimah' },
          { code: 'FUJ', name: 'Fujairah' },
          { code: 'AL', name: 'Al Ain' },
          { code: 'DIB', name: 'Dibba' },
          { code: 'KAL', name: 'Khalifa City' }
        ]
      },
      { code: 'AJM', name: 'Ajman',
        cities: [
          { code: 'AJM', name: 'Ajman' },
          { code: 'DUB', name: 'Dubai' },
          { code: 'ABU', name: 'Abu Dhabi' },
          { code: 'SHJ', name: 'Sharjah' },
          { code: 'UAQ', name: 'Umm Al Quwain' },
          { code: 'RAS', name: 'Ras Al Khaimah' },
          { code: 'FUJ', name: 'Fujairah' },
          { code: 'AL', name: 'Al Ain' },
          { code: 'DIB', name: 'Dibba' },
          { code: 'KAL', name: 'Khalifa City' }
        ]
      },
      { code: 'UAQ', name: 'Umm Al Quwain',
        cities: [
          { code: 'UAQ', name: 'Umm Al Quwain' },
          { code: 'DUB', name: 'Dubai' },
          { code: 'ABU', name: 'Abu Dhabi' },
          { code: 'SHJ', name: 'Sharjah' },
          { code: 'AJM', name: 'Ajman' },
          { code: 'RAS', name: 'Ras Al Khaimah' },
          { code: 'FUJ', name: 'Fujairah' },
          { code: 'AL', name: 'Al Ain' },
          { code: 'DIB', name: 'Dibba' },
          { code: 'KAL', name: 'Khalifa City' }
        ]
      },
      { code: 'RAS', name: 'Ras Al Khaimah',
        cities: [
          { code: 'RAS', name: 'Ras Al Khaimah' },
          { code: 'DUB', name: 'Dubai' },
          { code: 'ABU', name: 'Abu Dhabi' },
          { code: 'SHJ', name: 'Sharjah' },
          { code: 'AJM', name: 'Ajman' },
          { code: 'UAQ', name: 'Umm Al Quwain' },
          { code: 'FUJ', name: 'Fujairah' },
          { code: 'AL', name: 'Al Ain' },
          { code: 'DIB', name: 'Dibba' },
          { code: 'KAL', name: 'Khalifa City' }
        ]
      },
      { code: 'FUJ', name: 'Fujairah',
        cities: [
          { code: 'FUJ', name: 'Fujairah' },
          { code: 'DUB', name: 'Dubai' },
          { code: 'ABU', name: 'Abu Dhabi' },
          { code: 'SHJ', name: 'Sharjah' },
          { code: 'AJM', name: 'Ajman' },
          { code: 'UAQ', name: 'Umm Al Quwain' },
          { code: 'RAS', name: 'Ras Al Khaimah' },
          { code: 'AL', name: 'Al Ain' },
          { code: 'DIB', name: 'Dibba' },
          { code: 'KAL', name: 'Khalifa City' }
        ]
      },
      { code: 'AL', name: 'Al Ain',
        cities: [
          { code: 'AL', name: 'Al Ain' },
          { code: 'DUB', name: 'Dubai' },
          { code: 'ABU', name: 'Abu Dhabi' },
          { code: 'SHJ', name: 'Sharjah' },
          { code: 'AJM', name: 'Ajman' },
          { code: 'UAQ', name: 'Umm Al Quwain' },
          { code: 'RAS', name: 'Ras Al Khaimah' },
          { code: 'FUJ', name: 'Fujairah' },
          { code: 'DIB', name: 'Dibba' },
          { code: 'KAL', name: 'Khalifa City' }
        ]
      },
      { code: 'DIB', name: 'Dibba',
        cities: [
          { code: 'DIB', name: 'Dibba' },
          { code: 'DUB', name: 'Dubai' },
          { code: 'ABU', name: 'Abu Dhabi' },
          { code: 'SHJ', name: 'Sharjah' },
          { code: 'AJM', name: 'Ajman' },
          { code: 'UAQ', name: 'Umm Al Quwain' },
          { code: 'RAS', name: 'Ras Al Khaimah' },
          { code: 'FUJ', name: 'Fujairah' },
          { code: 'AL', name: 'Al Ain' },
          { code: 'KAL', name: 'Khalifa City' }
        ]
      },
      { code: 'KAL', name: 'Khalifa City',
        cities: [
          { code: 'KAL', name: 'Khalifa City' },
          { code: 'DUB', name: 'Dubai' },
          { code: 'ABU', name: 'Abu Dhabi' },
          { code: 'SHJ', name: 'Sharjah' },
          { code: 'AJM', name: 'Ajman' },
          { code: 'UAQ', name: 'Umm Al Quwain' },
          { code: 'RAS', name: 'Ras Al Khaimah' },
          { code: 'FUJ', name: 'Fujairah' },
          { code: 'AL', name: 'Al Ain' },
          { code: 'DIB', name: 'Dibba' }
        ]
      }
    ]
  };
