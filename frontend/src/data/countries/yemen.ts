/**
 * Yemen country data with regions, cities, and tax information
 */

import { Country } from './index';

export const yemen: Country = {
    code: 'YE',
    name: 'Yemen',
    taxInfo: { standardRate: 5, taxName: 'VAT', currency: 'YER', region: 'MEA' },
    provinces: [
      { code: 'SAN', name: 'Sanaa',
        cities: [
          { code: 'SAN', name: 'Sanaa' },
          { code: 'ADEN', name: 'Aden' },
          { code: 'TAIZ', name: 'Taiz' },
          { code: 'HOD', name: 'Hodeidah' },
          { code: 'IBB', name: 'Ibb' },
          { code: 'DHAM', name: 'Dhamar' },
          { code: 'AL', name: 'Al Mahwit' },
          { code: 'RAY', name: 'Raymah' },
          { code: 'MAR', name: 'Marib' },
          { code: 'ALJ', name: 'Al Jawf' }
        ]
      },
      { code: 'ADEN', name: 'Aden',
        cities: [
          { code: 'ADEN', name: 'Aden' },
          { code: 'SAN', name: 'Sanaa' },
          { code: 'TAIZ', name: 'Taiz' },
          { code: 'HOD', name: 'Hodeidah' },
          { code: 'IBB', name: 'Ibb' },
          { code: 'DHAM', name: 'Dhamar' },
          { code: 'AL', name: 'Al Mahwit' },
          { code: 'RAY', name: 'Raymah' },
          { code: 'MAR', name: 'Marib' },
          { code: 'ALJ', name: 'Al Jawf' }
        ]
      },
      { code: 'TAIZ', name: 'Taiz',
        cities: [
          { code: 'TAIZ', name: 'Taiz' },
          { code: 'SAN', name: 'Sanaa' },
          { code: 'ADEN', name: 'Aden' },
          { code: 'HOD', name: 'Hodeidah' },
          { code: 'IBB', name: 'Ibb' },
          { code: 'DHAM', name: 'Dhamar' },
          { code: 'AL', name: 'Al Mahwit' },
          { code: 'RAY', name: 'Raymah' },
          { code: 'MAR', name: 'Marib' },
          { code: 'ALJ', name: 'Al Jawf' }
        ]
      },
      { code: 'HOD', name: 'Hodeidah',
        cities: [
          { code: 'HOD', name: 'Hodeidah' },
          { code: 'SAN', name: 'Sanaa' },
          { code: 'ADEN', name: 'Aden' },
          { code: 'TAIZ', name: 'Taiz' },
          { code: 'IBB', name: 'Ibb' },
          { code: 'DHAM', name: 'Dhamar' },
          { code: 'AL', name: 'Al Mahwit' },
          { code: 'RAY', name: 'Raymah' },
          { code: 'MAR', name: 'Marib' },
          { code: 'ALJ', name: 'Al Jawf' }
        ]
      },
      { code: 'IBB', name: 'Ibb',
        cities: [
          { code: 'IBB', name: 'Ibb' },
          { code: 'SAN', name: 'Sanaa' },
          { code: 'ADEN', name: 'Aden' },
          { code: 'TAIZ', name: 'Taiz' },
          { code: 'HOD', name: 'Hodeidah' },
          { code: 'DHAM', name: 'Dhamar' },
          { code: 'AL', name: 'Al Mahwit' },
          { code: 'RAY', name: 'Raymah' },
          { code: 'MAR', name: 'Marib' },
          { code: 'ALJ', name: 'Al Jawf' }
        ]
      },
      { code: 'DHAM', name: 'Dhamar',
        cities: [
          { code: 'DHAM', name: 'Dhamar' },
          { code: 'SAN', name: 'Sanaa' },
          { code: 'ADEN', name: 'Aden' },
          { code: 'TAIZ', name: 'Taiz' },
          { code: 'HOD', name: 'Hodeidah' },
          { code: 'IBB', name: 'Ibb' },
          { code: 'AL', name: 'Al Mahwit' },
          { code: 'RAY', name: 'Raymah' },
          { code: 'MAR', name: 'Marib' },
          { code: 'ALJ', name: 'Al Jawf' }
        ]
      },
      { code: 'AL', name: 'Al Mahwit',
        cities: [
          { code: 'AL', name: 'Al Mahwit' },
          { code: 'SAN', name: 'Sanaa' },
          { code: 'ADEN', name: 'Aden' },
          { code: 'TAIZ', name: 'Taiz' },
          { code: 'HOD', name: 'Hodeidah' },
          { code: 'IBB', name: 'Ibb' },
          { code: 'DHAM', name: 'Dhamar' },
          { code: 'RAY', name: 'Raymah' },
          { code: 'MAR', name: 'Marib' },
          { code: 'ALJ', name: 'Al Jawf' }
        ]
      },
      { code: 'RAY', name: 'Raymah',
        cities: [
          { code: 'RAY', name: 'Raymah' },
          { code: 'SAN', name: 'Sanaa' },
          { code: 'ADEN', name: 'Aden' },
          { code: 'TAIZ', name: 'Taiz' },
          { code: 'HOD', name: 'Hodeidah' },
          { code: 'IBB', name: 'Ibb' },
          { code: 'DHAM', name: 'Dhamar' },
          { code: 'AL', name: 'Al Mahwit' },
          { code: 'MAR', name: 'Marib' },
          { code: 'ALJ', name: 'Al Jawf' }
        ]
      },
      { code: 'MAR', name: 'Marib',
        cities: [
          { code: 'MAR', name: 'Marib' },
          { code: 'SAN', name: 'Sanaa' },
          { code: 'ADEN', name: 'Aden' },
          { code: 'TAIZ', name: 'Taiz' },
          { code: 'HOD', name: 'Hodeidah' },
          { code: 'IBB', name: 'Ibb' },
          { code: 'DHAM', name: 'Dhamar' },
          { code: 'AL', name: 'Al Mahwit' },
          { code: 'RAY', name: 'Raymah' },
          { code: 'ALJ', name: 'Al Jawf' }
        ]
      },
      { code: 'ALJ', name: 'Al Jawf',
        cities: [
          { code: 'ALJ', name: 'Al Jawf' },
          { code: 'SAN', name: 'Sanaa' },
          { code: 'ADEN', name: 'Aden' },
          { code: 'TAIZ', name: 'Taiz' },
          { code: 'HOD', name: 'Hodeidah' },
          { code: 'IBB', name: 'Ibb' },
          { code: 'DHAM', name: 'Dhamar' },
          { code: 'AL', name: 'Al Mahwit' },
          { code: 'RAY', name: 'Raymah' },
          { code: 'MAR', name: 'Marib' }
        ]
      },
      { code: 'LAH', name: 'Lahij',
        cities: [
          { code: 'LAH', name: 'Lahij' },
          { code: 'SAN', name: 'Sanaa' },
          { code: 'ADEN', name: 'Aden' },
          { code: 'TAIZ', name: 'Taiz' },
          { code: 'HOD', name: 'Hodeidah' },
          { code: 'IBB', name: 'Ibb' },
          { code: 'DHAM', name: 'Dhamar' },
          { code: 'AL', name: 'Al Mahwit' },
          { code: 'RAY', name: 'Raymah' },
          { code: 'MAR', name: 'Marib' }
        ]
      },
      { code: 'AB', name: 'Abyan',
        cities: [
          { code: 'AB', name: 'Abyan' },
          { code: 'SAN', name: 'Sanaa' },
          { code: 'ADEN', name: 'Aden' },
          { code: 'TAIZ', name: 'Taiz' },
          { code: 'HOD', name: 'Hodeidah' },
          { code: 'IBB', name: 'Ibb' },
          { code: 'DHAM', name: 'Dhamar' },
          { code: 'AL', name: 'Al Mahwit' },
          { code: 'RAY', name: 'Raymah' },
          { code: 'MAR', name: 'Marib' }
        ]
      },
      { code: 'DA', name: 'Dhale',
        cities: [
          { code: 'DA', name: 'Dhale' },
          { code: 'SAN', name: 'Sanaa' },
          { code: 'ADEN', name: 'Aden' },
          { code: 'TAIZ', name: 'Taiz' },
          { code: 'HOD', name: 'Hodeidah' },
          { code: 'IBB', name: 'Ibb' },
          { code: 'DHAM', name: 'Dhamar' },
          { code: 'AL', name: 'Al Mahwit' },
          { code: 'RAY', name: 'Raymah' },
          { code: 'MAR', name: 'Marib' }
        ]
      },
      { code: 'SHAB', name: 'Shabwah',
        cities: [
          { code: 'SHAB', name: 'Shabwah' },
          { code: 'SAN', name: 'Sanaa' },
          { code: 'ADEN', name: 'Aden' },
          { code: 'TAIZ', name: 'Taiz' },
          { code: 'HOD', name: 'Hodeidah' },
          { code: 'IBB', name: 'Ibb' },
          { code: 'DHAM', name: 'Dhamar' },
          { code: 'AL', name: 'Al Mahwit' },
          { code: 'RAY', name: 'Raymah' },
          { code: 'MAR', name: 'Marib' }
        ]
      },
      { code: 'HAD', name: 'Hadramaut',
        cities: [
          { code: 'HAD', name: 'Hadramaut' },
          { code: 'SAN', name: 'Sanaa' },
          { code: 'ADEN', name: 'Aden' },
          { code: 'TAIZ', name: 'Taiz' },
          { code: 'HOD', name: 'Hodeidah' },
          { code: 'IBB', name: 'Ibb' },
          { code: 'DHAM', name: 'Dhamar' },
          { code: 'AL', name: 'Al Mahwit' },
          { code: 'RAY', name: 'Raymah' },
          { code: 'MAR', name: 'Marib' }
        ]
      },
      { code: 'ALM', name: 'Al Mahrah',
        cities: [
          { code: 'ALM', name: 'Al Mahrah' },
          { code: 'SAN', name: 'Sanaa' },
          { code: 'ADEN', name: 'Aden' },
          { code: 'TAIZ', name: 'Taiz' },
          { code: 'HOD', name: 'Hodeidah' },
          { code: 'IBB', name: 'Ibb' },
          { code: 'DHAM', name: 'Dhamar' },
          { code: 'AL', name: 'Al Mahwit' },
          { code: 'RAY', name: 'Raymah' },
          { code: 'MAR', name: 'Marib' }
        ]
      },
      { code: 'SOC', name: 'Socotra',
        cities: [
          { code: 'SOC', name: 'Socotra' },
          { code: 'SAN', name: 'Sanaa' },
          { code: 'ADEN', name: 'Aden' },
          { code: 'TAIZ', name: 'Taiz' },
          { code: 'HOD', name: 'Hodeidah' },
          { code: 'IBB', name: 'Ibb' },
          { code: 'DHAM', name: 'Dhamar' },
          { code: 'AL', name: 'Al Mahwit' },
          { code: 'RAY', name: 'Raymah' },
          { code: 'MAR', name: 'Marib' }
        ]
      },
      { code: 'SAN2', name: 'Sanaa',
        cities: [
          { code: 'SAN', name: 'Sanaa' },
          { code: 'ADEN', name: 'Aden' },
          { code: 'TAIZ', name: 'Taiz' },
          { code: 'HOD', name: 'Hodeidah' },
          { code: 'IBB', name: 'Ibb' },
          { code: 'DHAM', name: 'Dhamar' },
          { code: 'AL', name: 'Al Mahwit' },
          { code: 'RAY', name: 'Raymah' },
          { code: 'MAR', name: 'Marib' },
          { code: 'ALJ', name: 'Al Jawf' }
        ]
      },
      { code: 'ADEN2', name: 'Aden',
        cities: [
          { code: 'ADEN', name: 'Aden' },
          { code: 'SAN', name: 'Sanaa' },
          { code: 'TAIZ', name: 'Taiz' },
          { code: 'HOD', name: 'Hodeidah' },
          { code: 'IBB', name: 'Ibb' },
          { code: 'DHAM', name: 'Dhamar' },
          { code: 'AL', name: 'Al Mahwit' },
          { code: 'RAY', name: 'Raymah' },
          { code: 'MAR', name: 'Marib' },
          { code: 'ALJ', name: 'Al Jawf' }
        ]
      },
      { code: 'TAIZ2', name: 'Taiz',
        cities: [
          { code: 'TAIZ', name: 'Taiz' },
          { code: 'SAN', name: 'Sanaa' },
          { code: 'ADEN', name: 'Aden' },
          { code: 'HOD', name: 'Hodeidah' },
          { code: 'IBB', name: 'Ibb' },
          { code: 'DHAM', name: 'Dhamar' },
          { code: 'AL', name: 'Al Mahwit' },
          { code: 'RAY', name: 'Raymah' },
          { code: 'MAR', name: 'Marib' },
          { code: 'ALJ', name: 'Al Jawf' }
        ]
      },
      { code: 'HOD2', name: 'Hodeidah',
        cities: [
          { code: 'HOD', name: 'Hodeidah' },
          { code: 'SAN', name: 'Sanaa' },
          { code: 'ADEN', name: 'Aden' },
          { code: 'TAIZ', name: 'Taiz' },
          { code: 'IBB', name: 'Ibb' },
          { code: 'DHAM', name: 'Dhamar' },
          { code: 'AL', name: 'Al Mahwit' },
          { code: 'RAY', name: 'Raymah' },
          { code: 'MAR', name: 'Marib' },
          { code: 'ALJ', name: 'Al Jawf' }
        ]
      },
      { code: 'IBB2', name: 'Ibb',
        cities: [
          { code: 'IBB', name: 'Ibb' },
          { code: 'SAN', name: 'Sanaa' },
          { code: 'ADEN', name: 'Aden' },
          { code: 'TAIZ', name: 'Taiz' },
          { code: 'HOD', name: 'Hodeidah' },
          { code: 'DHAM', name: 'Dhamar' },
          { code: 'AL', name: 'Al Mahwit' },
          { code: 'RAY', name: 'Raymah' },
          { code: 'MAR', name: 'Marib' },
          { code: 'ALJ', name: 'Al Jawf' }
        ]
      },
      { code: 'DHAM2', name: 'Dhamar',
        cities: [
          { code: 'DHAM', name: 'Dhamar' },
          { code: 'SAN', name: 'Sanaa' },
          { code: 'ADEN', name: 'Aden' },
          { code: 'TAIZ', name: 'Taiz' },
          { code: 'HOD', name: 'Hodeidah' },
          { code: 'IBB', name: 'Ibb' },
          { code: 'AL', name: 'Al Mahwit' },
          { code: 'RAY', name: 'Raymah' },
          { code: 'MAR', name: 'Marib' },
          { code: 'ALJ', name: 'Al Jawf' }
        ]
      },
      { code: 'AL2', name: 'Al Mahwit',
        cities: [
          { code: 'AL', name: 'Al Mahwit' },
          { code: 'SAN', name: 'Sanaa' },
          { code: 'ADEN', name: 'Aden' },
          { code: 'TAIZ', name: 'Taiz' },
          { code: 'HOD', name: 'Hodeidah' },
          { code: 'IBB', name: 'Ibb' },
          { code: 'DHAM', name: 'Dhamar' },
          { code: 'RAY', name: 'Raymah' },
          { code: 'MAR', name: 'Marib' },
          { code: 'ALJ', name: 'Al Jawf' }
        ]
      },
      { code: 'RAY2', name: 'Raymah',
        cities: [
          { code: 'RAY', name: 'Raymah' },
          { code: 'SAN', name: 'Sanaa' },
          { code: 'ADEN', name: 'Aden' },
          { code: 'TAIZ', name: 'Taiz' },
          { code: 'HOD', name: 'Hodeidah' },
          { code: 'IBB', name: 'Ibb' },
          { code: 'DHAM', name: 'Dhamar' },
          { code: 'AL', name: 'Al Mahwit' },
          { code: 'MAR', name: 'Marib' },
          { code: 'ALJ', name: 'Al Jawf' }
        ]
      },
      { code: 'MAR2', name: 'Marib',
        cities: [
          { code: 'MAR', name: 'Marib' },
          { code: 'SAN', name: 'Sanaa' },
          { code: 'ADEN', name: 'Aden' },
          { code: 'TAIZ', name: 'Taiz' },
          { code: 'HOD', name: 'Hodeidah' },
          { code: 'IBB', name: 'Ibb' },
          { code: 'DHAM', name: 'Dhamar' },
          { code: 'AL', name: 'Al Mahwit' },
          { code: 'RAY', name: 'Raymah' },
          { code: 'ALJ', name: 'Al Jawf' }
        ]
      },
      { code: 'ALJ2', name: 'Al Jawf',
        cities: [
          { code: 'ALJ', name: 'Al Jawf' },
          { code: 'SAN', name: 'Sanaa' },
          { code: 'ADEN', name: 'Aden' },
          { code: 'TAIZ', name: 'Taiz' },
          { code: 'HOD', name: 'Hodeidah' },
          { code: 'IBB', name: 'Ibb' },
          { code: 'DHAM', name: 'Dhamar' },
          { code: 'AL', name: 'Al Mahwit' },
          { code: 'RAY', name: 'Raymah' },
          { code: 'MAR', name: 'Marib' }
        ]
      }
    ]
  };
