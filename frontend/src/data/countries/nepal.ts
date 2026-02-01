/**
 * Nepal country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const nepal: Country = {
    code: 'NP',
    name: 'Nepal',
    taxInfo: { standardRate: 13, taxName: 'VAT', currency: 'NPR', region: 'APAC' },
    provinces: [
      { code: 'KOSHI', name: 'Koshi Province',
        cities: [
          { code: 'BIRATNAGAR', name: 'Biratnagar' },
          { code: 'DHARAN', name: 'Dharan' },
          { code: 'ITAHARI', name: 'Itahari' },
          { code: 'RAJBIRAJ', name: 'Rajbiraj' },
          { code: 'GAUR', name: 'Gaur' },
          { code: 'JANAKPUR', name: 'Janakpur' },
          { code: 'LALBANDHI', name: 'Lalbandhi' },
          { code: 'MAHOTTARI', name: 'Mahottari' },
          { code: 'SARLAHI', name: 'Sarlahi' },
          { code: 'RAUTAHAT', name: 'Rautahat' }
        ]
      },
      { code: 'MADHESH', name: 'Madhesh Province',
        cities: [
          { code: 'JANAKPUR', name: 'Janakpur' },
          { code: 'BIRGUNJ', name: 'Birgunj' },
          { code: 'BIRATNAGAR', name: 'Biratnagar' },
          { code: 'RAJBIRAJ', name: 'Rajbiraj' },
          { code: 'GAUR', name: 'Gaur' },
          { code: 'LALBANDHI', name: 'Lalbandhi' },
          { code: 'MAHOTTARI', name: 'Mahottari' },
          { code: 'SARLAHI', name: 'Sarlahi' },
          { code: 'RAUTAHAT', name: 'Rautahat' },
          { code: 'BARA', name: 'Bara' }
        ]
      },
      { code: 'BAGMATI', name: 'Bagmati Province',
        cities: [
          { code: 'KATHMANDU', name: 'Kathmandu' },
          { code: 'BHAKTAPUR', name: 'Bhaktapur' },
          { code: 'LALITPUR', name: 'Lalitpur' },
          { code: 'POKHARA', name: 'Pokhara' },
          { code: 'DHARAN', name: 'Dharan' },
          { code: 'BIRATNAGAR', name: 'Biratnagar' },
          { code: 'JANAKPUR', name: 'Janakpur' },
          { code: 'BIRGUNJ', name: 'Birgunj' },
          { code: 'HETAUDA', name: 'Hetauda' },
          { code: 'BIRGUNJ2', name: 'Birgunj' }
        ]
      },
      { code: 'GANDAKI', name: 'Gandaki Province',
        cities: [
          { code: 'POKHARA', name: 'Pokhara' },
          { code: 'BAGLUNG', name: 'Baglung' },
          { code: 'BENI', name: 'Beni' },
          { code: 'BESISAHAR', name: 'Besisahar' },
          { code: 'CHAME', name: 'Chame' },
          { code: 'DAMAULI', name: 'Damauli' },
          { code: 'GORKHA', name: 'Gorkha' },
          { code: 'JOMSOM', name: 'Jomsom' },
          { code: 'KUSMA', name: 'Kusma' },
          { code: 'MANANG', name: 'Manang' }
        ]
      },
      { code: 'LUMBINI', name: 'Lumbini Province',
        cities: [
          { code: 'BUTWAL', name: 'Butwal' },
          { code: 'BHARATPUR', name: 'Bharatpur' },
          { code: 'NEPALGANJ', name: 'Nepalgunj' },
          { code: 'TULSIPUR', name: 'Tulsipur' },
          { code: 'GAUR', name: 'Gaur' },
          { code: 'BIRGUNJ', name: 'Birgunj' },
          { code: 'JANAKPUR', name: 'Janakpur' },
          { code: 'BIRATNAGAR', name: 'Biratnagar' },
          { code: 'RAJBIRAJ', name: 'Rajbiraj' },
          { code: 'GAUR2', name: 'Gaur' }
        ]
      },
      { code: 'KARNALI', name: 'Karnali Province',
        cities: [
          { code: 'SURKHET', name: 'Surkhet' },
          { code: 'BIRENDRANAGAR', name: 'Birendranagar' },
          { code: 'DADHELDAURA', name: 'Dadheldhura' },
          { code: 'DIPAYAL', name: 'Dipayal' },
          { code: 'DOLPA', name: 'Dolpa' },
          { code: 'JUMLA', name: 'Jumla' },
          { code: 'KALIKOT', name: 'Kalikot' },
          { code: 'MUGU', name: 'Mugu' },
          { code: 'RARA', name: 'Rara' },
          { code: 'SURKHET2', name: 'Surkhet' }
        ]
      },
      { code: 'SUDURPASHCHIM', name: 'Sudurpashchim Province',
        cities: [
          { code: 'DADHELDAURA', name: 'Dadheldhura' },
          { code: 'DIPAYAL', name: 'Dipayal' },
          { code: 'KANCHANPUR', name: 'Kanchanpur' },
          { code: 'KAILALI', name: 'Kailali' },
          { code: 'MAHENDRANAGAR', name: 'Mahendranagar' },
          { code: 'NEPALGANJ', name: 'Nepalgunj' },
          { code: 'TULSIPUR', name: 'Tulsipur' },
          { code: 'BUTWAL', name: 'Butwal' },
          { code: 'BHARATPUR', name: 'Bharatpur' },
          { code: 'SURKHET', name: 'Surkhet' }
        ]
      }
    ]
};
