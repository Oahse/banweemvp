/**
 * Pakistan country data with provinces, federal territory, and autonomous regions
 */

import { Country } from './index';

export const pakistan: Country = {
  code: 'PK',
  name: 'Pakistan',
  flag: '🇵🇰',
  capital: 'Islamabad',
  area: 881913,
  currencySymbol: '₨',
  officialLanguages: ['Urdu', 'English'],
  demonym: 'Pakistani',
  taxInfo: { standardRate: 17, taxName: 'GST', currency: 'PKR', region: 'APAC' },
  divisions: [
    { code: 'PUN', name: 'Punjab', type: 'province',
      cities: [
        { code: 'LAHORE', name: 'Lahore' },
        { code: 'FAISALABAD', name: 'Faisalabad' },
        { code: 'RAWALPINDI', name: 'Rawalpindi' },
        { code: 'GUJRANWALA', name: 'Gujranwala' },
        { code: 'MULTAN', name: 'Multan' },
        { code: 'SIALKOT', name: 'Sialkot' },
        { code: 'GUJRAT', name: 'Gujrat' },
        { code: 'BAHAWALPUR', name: 'Bahawalpur' },
        { code: 'SAHIWAL', name: 'Sahiwal' },
        { code: 'SARGODHA', name: 'Sargodha' }
      ]
    },
    { code: 'SND', name: 'Sindh', type: 'province',
      cities: [
        { code: 'KARACHI', name: 'Karachi' },
        { code: 'HYDERABAD', name: 'Hyderabad' },
        { code: 'SUKKUR', name: 'Sukkur' },
        { code: 'LARKANA', name: 'Larkana' },
        { code: 'NAWABSHAH', name: 'Nawabshah' },
        { code: 'MIRPUR', name: 'Mirpur Khas' },
        { code: 'JACOBABAD', name: 'Jacobabad' },
        { code: 'SHIKARPUR', name: 'Shikarpur' },
        { code: 'KHAIRPUR', name: 'Khairpur' },
        { code: 'THATTA', name: 'Thatta' }
      ]
    },
    { code: 'KPK', name: 'Khyber Pakhtunkhwa', type: 'province',
      cities: [
        { code: 'PESHAWAR', name: 'Peshawar' },
        { code: 'MARDAN', name: 'Mardan' },
        { code: 'MINGORA', name: 'Mingora' },
        { code: 'ABBOTTABAD', name: 'Abbottabad' },
        { code: 'KOHAT', name: 'Kohat' },
        { code: 'MANSEHRA', name: 'Mansehra' },
        { code: 'DIR', name: 'Dir' },
        { code: 'BANNU', name: 'Bannu' },
        { code: 'CHITRAL', name: 'Chitral' },
        { code: 'HARIPUR', name: 'Haripur' }
      ]
    },
    { code: 'BAL', name: 'Balochistan', type: 'province',
      cities: [
        { code: 'QUETTA', name: 'Quetta' },
        { code: 'GWADAR', name: 'Gwadar' },
        { code: 'TURBAT', name: 'Turbat' },
        { code: 'KHUZDAR', name: 'Khuzdar' },
        { code: 'CHAMAN', name: 'Chaman' },
        { code: 'SIBI', name: 'Sibi' },
        { code: 'ZHOB', name: 'Zhob' },
        { code: 'LASBELA', name: 'Lasbela' },
        { code: 'KALAT', name: 'Kalat' },
        { code: 'PISHIN', name: 'Pishin' }
      ]
    },
    { code: 'GB', name: 'Gilgit-Baltistan', type: 'autonomous territory',
      cities: [
        { code: 'GILGIT', name: 'Gilgit' },
        { code: 'SKARDU', name: 'Skardu' },
        { code: 'HUNZA', name: 'Hunza' },
        { code: 'GHAZER', name: 'Ghizer' },
        { code: 'ASTORE', name: 'Astore' },
        { code: 'DIAMER', name: 'Diamer' },
        { code: 'GUPIS', name: 'Gupis' },
        { code: 'KHAPLU', name: 'Khaplu' },
        { code: 'SHIGAR', name: 'Shigar' },
        { code: 'NAGAR', name: 'Nagar' }
      ]
    },
    { code: 'AJK', name: 'Azad Kashmir', type: 'autonomous territory',
      cities: [
        { code: 'MUZAFFARABAD', name: 'Muzaffarabad' },
        { code: 'MIRPUR', name: 'Mirpur' },
        { code: 'RAWALAKOT', name: 'Rawalakot' },
        { code: 'KOTLI', name: 'Kotli' },
        { code: 'BHIMBER', name: 'Bhimber' },
        { code: 'BAGH', name: 'Bagh' },
        { code: 'HAVELI', name: 'Haveli' },
        { code: 'NEELUM', name: 'Neelum' },
        { code: 'SUDHNOTI', name: 'Sudhnoti' },
        { code: 'PALANDRI', name: 'Palandri' }
      ]
    },
    { code: 'ICT', name: 'Islamabad Capital Territory', type: 'federal territory',
      cities: [
        { code: 'ISLAMABAD', name: 'Islamabad' },
        { code: 'G', name: 'G-10' },
        { code: 'F', name: 'F-11' },
        { code: 'E', name: 'E-11' },
        { code: 'D', name: 'D-12' },
        { code: 'I', name: 'I-8' },
        { code: 'H', name: 'H-8' },
        { code: 'B', name: 'B-17' },
        { code: 'C', name: 'C-15' },
        { code: 'BLUE', name: 'Blue Area' }
      ]
    }
  ]
};

export default pakistan;
