/**
 * Oman country data with regions, cities, and tax information
 */

import { Country } from './index';

export const oman: Country = {
    code: 'OM',
    name: 'Oman',
    taxInfo: { standardRate: 5, taxName: 'VAT', currency: 'OMR', region: 'MEA' },
    provinces: [
      { code: 'MUS', name: 'Muscat',
        cities: [
          { code: 'MUS', name: 'Muscat' },
          { code: 'MAT', name: 'Matrah' },
          { code: 'AS', name: 'As Sib' },
          { code: 'BAW', name: 'Bawshar' },
          { code: 'AMR', name: 'Al Amrat' },
          { code: 'QUR', name: 'Qurayyat' },
          { code: 'SIB', name: 'Seeb' },
          { code: 'HAL', name: 'Halban' },
          { code: 'SAL', name: 'Salalah' },
          { code: 'SUR', name: 'Sur' }
        ]
      },
      { code: 'DHOF', name: 'Dhofar',
        cities: [
          { code: 'SAL', name: 'Salalah' },
          { code: 'MUS', name: 'Muscat' },
          { code: 'MAT', name: 'Matrah' },
          { code: 'AS', name: 'As Sib' },
          { code: 'BAW', name: 'Bawshar' },
          { code: 'AMR', name: 'Al Amrat' },
          { code: 'QUR', name: 'Qurayyat' },
          { code: 'SIB', name: 'Seeb' },
          { code: 'HAL', name: 'Halban' },
          { code: 'SUR', name: 'Sur' }
        ]
      },
      { code: 'BAT', name: 'Al Batinah',
        cities: [
          { code: 'SOH', name: 'Sohar' },
          { code: 'RUS', name: 'Rustaq' },
          { code: 'SUW', name: 'Suwaiq' },
          { code: 'KHA', name: 'Khaburah' },
          { code: 'SAH', name: 'Saham' },
          { code: 'MUS', name: 'Muscat' },
          { code: 'MAT', name: 'Matrah' },
          { code: 'AS', name: 'As Sib' },
          { code: 'BAW', name: 'Bawshar' },
          { code: 'AMR', name: 'Al Amrat' }
        ]
      },
      { code: 'AD', name: 'Ad Dakhiliyah',
        cities: [
          { code: 'NIZ', name: 'Nizwa' },
          { code: 'SAM', name: 'Samail' },
          { code: 'BAH', name: 'Bahla' },
          { code: 'ADAM', name: 'Adam' },
          { code: 'IZK', name: 'Izki' },
          { code: 'MUS', name: 'Muscat' },
          { code: 'MAT', name: 'Matrah' },
          { code: 'AS', name: 'As Sib' },
          { code: 'BAW', name: 'Bawshar' },
          { code: 'AMR', name: 'Al Amrat' }
        ]
      },
      { code: 'NOR', name: 'North Al Sharqiyah',
        cities: [
          { code: 'IBR', name: 'Ibra' },
          { code: 'SUR', name: 'Sur' },
          { code: 'BI', name: 'Bidiyah' },
          { code: 'AL', name: 'Al Kamil' },
          { code: 'WAD', name: 'Wadi Bani Khalid' },
          { code: 'MUS', name: 'Muscat' },
          { code: 'MAT', name: 'Matrah' },
          { code: 'AS', name: 'As Sib' },
          { code: 'BAW', name: 'Bawshar' },
          { code: 'AMR', name: 'Al Amrat' }
        ]
      },
      { code: 'SOU', name: 'South Al Sharqiyah',
        cities: [
          { code: 'SUR', name: 'Sur' },
          { code: 'IBR', name: 'Ibra' },
          { code: 'BI', name: 'Bidiyah' },
          { code: 'AL', name: 'Al Kamil' },
          { code: 'WAD', name: 'Wadi Bani Khalid' },
          { code: 'MUS', name: 'Muscat' },
          { code: 'MAT', name: 'Matrah' },
          { code: 'AS', name: 'As Sib' },
          { code: 'BAW', name: 'Bawshar' },
          { code: 'AMR', name: 'Al Amrat' }
        ]
      },
      { code: 'AL', name: 'Al Buraimi',
        cities: [
          { code: 'BUR', name: 'Buraimi' },
          { code: 'MUS', name: 'Muscat' },
          { code: 'MAT', name: 'Matrah' },
          { code: 'AS', name: 'As Sib' },
          { code: 'BAW', name: 'Bawshar' },
          { code: 'AMR', name: 'Al Amrat' },
          { code: 'QUR', name: 'Qurayyat' },
          { code: 'SIB', name: 'Seeb' },
          { code: 'HAL', name: 'Halban' },
          { code: 'SUR', name: 'Sur' }
        ]
      },
      { code: 'MUS2', name: 'Musandam',
        cities: [
          { code: 'KHA', name: 'Khasab' },
          { code: 'DIB', name: 'Dibba' },
          { code: 'BUK', name: 'Bukha' },
          { code: 'MAD', name: 'Madha' },
          { code: 'MUS', name: 'Muscat' },
          { code: 'MAT', name: 'Matrah' },
          { code: 'AS', name: 'As Sib' },
          { code: 'BAW', name: 'Bawshar' },
          { code: 'AMR', name: 'Al Amrat' },
          { code: 'QUR', name: 'Qurayyat' }
        ]
      },
      { code: 'MAT', name: 'Matrah',
        cities: [
          { code: 'MAT', name: 'Matrah' },
          { code: 'MUS', name: 'Muscat' },
          { code: 'AS', name: 'As Sib' },
          { code: 'BAW', name: 'Bawshar' },
          { code: 'AMR', name: 'Al Amrat' },
          { code: 'QUR', name: 'Qurayyat' },
          { code: 'SIB', name: 'Seeb' },
          { code: 'HAL', name: 'Halban' },
          { code: 'SAL', name: 'Salalah' },
          { code: 'SUR', name: 'Sur' }
        ]
      },
      { code: 'AS', name: 'As Sib',
        cities: [
          { code: 'AS', name: 'As Sib' },
          { code: 'MUS', name: 'Muscat' },
          { code: 'MAT', name: 'Matrah' },
          { code: 'BAW', name: 'Bawshar' },
          { code: 'AMR', name: 'Al Amrat' },
          { code: 'QUR', name: 'Qurayyat' },
          { code: 'SIB', name: 'Seeb' },
          { code: 'HAL', name: 'Halban' },
          { code: 'SAL', name: 'Salalah' },
          { code: 'SUR', name: 'Sur' }
        ]
      },
      { code: 'BAW', name: 'Bawshar',
        cities: [
          { code: 'BAW', name: 'Bawshar' },
          { code: 'MUS', name: 'Muscat' },
          { code: 'MAT', name: 'Matrah' },
          { code: 'AS', name: 'As Sib' },
          { code: 'AMR', name: 'Al Amrat' },
          { code: 'QUR', name: 'Qurayyat' },
          { code: 'SIB', name: 'Seeb' },
          { code: 'HAL', name: 'Halban' },
          { code: 'SAL', name: 'Salalah' },
          { code: 'SUR', name: 'Sur' }
        ]
      },
      { code: 'AMR', name: 'Al Amrat',
        cities: [
          { code: 'AMR', name: 'Al Amrat' },
          { code: 'MUS', name: 'Muscat' },
          { code: 'MAT', name: 'Matrah' },
          { code: 'AS', name: 'As Sib' },
          { code: 'BAW', name: 'Bawshar' },
          { code: 'QUR', name: 'Qurayyat' },
          { code: 'SIB', name: 'Seeb' },
          { code: 'HAL', name: 'Halban' },
          { code: 'SAL', name: 'Salalah' },
          { code: 'SUR', name: 'Sur' }
        ]
      },
      { code: 'QUR', name: 'Qurayyat',
        cities: [
          { code: 'QUR', name: 'Qurayyat' },
          { code: 'MUS', name: 'Muscat' },
          { code: 'MAT', name: 'Matrah' },
          { code: 'AS', name: 'As Sib' },
          { code: 'BAW', name: 'Bawshar' },
          { code: 'AMR', name: 'Al Amrat' },
          { code: 'SIB', name: 'Seeb' },
          { code: 'HAL', name: 'Halban' },
          { code: 'SAL', name: 'Salalah' },
          { code: 'SUR', name: 'Sur' }
        ]
      },
      { code: 'SIB', name: 'Seeb',
        cities: [
          { code: 'SIB', name: 'Seeb' },
          { code: 'MUS', name: 'Muscat' },
          { code: 'MAT', name: 'Matrah' },
          { code: 'AS', name: 'As Sib' },
          { code: 'BAW', name: 'Bawshar' },
          { code: 'AMR', name: 'Al Amrat' },
          { code: 'QUR', name: 'Qurayyat' },
          { code: 'HAL', name: 'Halban' },
          { code: 'SAL', name: 'Salalah' },
          { code: 'SUR', name: 'Sur' }
        ]
      },
      { code: 'HAL', name: 'Halban',
        cities: [
          { code: 'HAL', name: 'Halban' },
          { code: 'MUS', name: 'Muscat' },
          { code: 'MAT', name: 'Matrah' },
          { code: 'AS', name: 'As Sib' },
          { code: 'BAW', name: 'Bawshar' },
          { code: 'AMR', name: 'Al Amrat' },
          { code: 'QUR', name: 'Qurayyat' },
          { code: 'SIB', name: 'Seeb' },
          { code: 'SAL', name: 'Salalah' },
          { code: 'SUR', name: 'Sur' }
        ]
      },
      { code: 'SAL', name: 'Salalah',
        cities: [
          { code: 'SAL', name: 'Salalah' },
          { code: 'MUS', name: 'Muscat' },
          { code: 'MAT', name: 'Matrah' },
          { code: 'AS', name: 'As Sib' },
          { code: 'BAW', name: 'Bawshar' },
          { code: 'AMR', name: 'Al Amrat' },
          { code: 'QUR', name: 'Qurayyat' },
          { code: 'SIB', name: 'Seeb' },
          { code: 'HAL', name: 'Halban' },
          { code: 'SUR', name: 'Sur' }
        ]
      },
      { code: 'SUR', name: 'Sur',
        cities: [
          { code: 'SUR', name: 'Sur' },
          { code: 'MUS', name: 'Muscat' },
          { code: 'MAT', name: 'Matrah' },
          { code: 'AS', name: 'As Sib' },
          { code: 'BAW', name: 'Bawshar' },
          { code: 'AMR', name: 'Al Amrat' },
          { code: 'QUR', name: 'Qurayyat' },
          { code: 'SIB', name: 'Seeb' },
          { code: 'HAL', name: 'Halban' },
          { code: 'SAL', name: 'Salalah' }
        ]
      }
    ]
  };
