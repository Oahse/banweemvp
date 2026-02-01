/**
 * Pakistan country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const pakistan: Country = {
    code: 'PK',
    name: 'Pakistan',
    taxInfo: { standardRate: 17, taxName: 'GST', currency: 'PKR', region: 'APAC' },
    provinces: [
      { code: 'PUN', name: 'Punjab',
        cities: [
          { code: 'LHR', name: 'Lahore' },
          { code: 'KHI', name: 'Karachi' },
          { code: 'ISL', name: 'Islamabad' },
          { code: 'RWP', name: 'Rawalpindi' },
          { code: 'FSD', name: 'Faisalabad' },
          { code: 'MUZ', name: 'Multan' },
          { code: 'GUJ', name: 'Gujranwala' },
          { code: 'SARG', name: 'Sargodha' },
          { code: 'BHA', name: 'Bahawalpur' },
          { code: 'SAH', name: 'Sahiwal' }
        ]
      },
      { code: 'SIND', name: 'Sindh',
        cities: [
          { code: 'KHI', name: 'Karachi' },
          { code: 'HYD', name: 'Hyderabad' },
          { code: 'SUK', name: 'Sukkur' },
          { code: 'LAR', name: 'Larkana' },
          { code: 'NAB', name: 'Nawabshah' },
          { code: 'MIR', name: 'Mirpur Khas' },
          { code: 'JAM', name: 'Jamshoro' },
          { code: 'THA', name: 'Thatta' },
          { code: 'KHA', name: 'Khairpur' },
          { code: 'DAD', name: 'Dadu' }
        ]
      },
      { code: 'KPK', name: 'Khyber Pakhtunkhwa',
        cities: [
          { code: 'PES', name: 'Peshawar' },
          { code: 'MARD', name: 'Mardan' },
          { code: 'SWA', name: 'Swabi' },
          { code: 'ABB', name: 'Abbottabad' },
          { code: 'MAN', name: 'Mansehra' },
          { code: 'MAL', name: 'Malam Jabba' },
          { code: 'DIR', name: 'Dir' },
          { code: 'CHI', name: 'Chitral' },
          { code: 'BAN', name: 'Bannu' },
          { code: 'KOH', name: 'Kohat' }
        ]
      },
      { code: 'BAL', name: 'Balochistan',
        cities: [
          { code: 'QUET', name: 'Quetta' },
          { code: 'GWA', name: 'Gwadar' },
          { code: 'TUR', name: 'Turbat' },
          { code: 'SIB', name: 'Sibi' },
          { code: 'KHUZ', name: 'Khuzdar' },
          { code: 'CHAM', name: 'Chaman' },
          { code: 'ZHOB', name: 'Zhob' },
          { code: 'LAS', name: 'Lasbela' },
          { code: 'KOH', name: 'Kohlu' },
          { code: 'BARK', name: 'Barkhan' }
        ]
      },
      { code: 'GB', name: 'Gilgit-Baltistan',
        cities: [
          { code: 'GIL', name: 'Gilgit' },
          { code: 'SKA', name: 'Skardu' },
          { code: 'HUN', name: 'Hunza' },
          { code: 'GHA', name: 'Ghizer' },
          { code: 'NAG', name: 'Nagar' },
          { code: 'AST', name: 'Astore' },
          { code: 'DIA', name: 'Diamer' },
          { code: 'GUP', name: 'Gupis' },
          { code: 'YAS', name: 'Yasin' },
          { code: 'SHI', name: 'Shigar' }
        ]
      },
      { code: 'AJK', name: 'Azad Jammu and Kashmir',
        cities: [
          { code: 'MUZ', name: 'Muzaffarabad' },
          { code: 'MIR', name: 'Mirpur' },
          { code: 'RAW', name: 'Rawalakot' },
          { code: 'BHIM', name: 'Bhimber' },
          { code: 'BAG', name: 'Bagh' },
          { code: 'KOT', name: 'Kotli' },
          { code: 'PAL', name: 'Pallandri' },
          { code: 'HAV', name: 'Havelian' },
          { code: 'GAR', name: 'Garhi Dupatta' },
          { code: 'TRI', name: 'Trarkhal' }
        ]
      },
      { code: 'ICT', name: 'Islamabad Capital Territory',
        cities: [
          { code: 'ISL', name: 'Islamabad' },
          { code: 'RAW', name: 'Rawalpindi' },
          { code: 'GAK', name: 'Gakhar' },
          { code: 'TAU', name: 'Taxila' },
          { code: 'Wah', name: 'Wah Cantonment' },
          { code: 'HAS', name: 'Hasan Abdal' },
          { code: 'FAI', name: 'Fateh Jang' },
          { code: 'ATTO', name: 'Attock' },
          { code: 'JHEL', name: 'Jhelum' },
          { code: 'CHAK', name: 'Chakwal' }
        ]
      }
    ]
  };
