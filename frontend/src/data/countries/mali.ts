/**
 * Mali country data with regions, cities, and tax information
 */

import { Country } from './index';

export const mali: Country = {
    code: 'ML',
    name: 'Mali',
    taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'XOF', region: 'MEA' },
    provinces: [
      { code: 'BAM', name: 'Bamako',
        cities: [
          { code: 'BAM', name: 'Bamako' },
          { code: 'KAT', name: 'Kati' },
          { code: 'KOU', name: 'Koulikoro' },
          { code: 'KOL', name: 'Kolokani' },
          { code: 'NAR', name: 'Nara' },
          { code: 'BAN', name: 'Banamba' },
          { code: 'DIO', name: 'Dioïla' },
          { code: 'KANG', name: 'Kangaba' },
          { code: 'MOR', name: 'Moribabougou' },
          { code: 'SAN', name: 'San' }
        ]
      },
      { code: 'KAY', name: 'Kayes',
        cities: [
          { code: 'KAY', name: 'Kayes' },
          { code: 'KEN', name: 'Kéniéba' },
          { code: 'YEL', name: 'Yélimané' },
          { code: 'NIA', name: 'Nioro' },
          { code: 'DIEM', name: 'Diéma' },
          { code: 'BAM', name: 'Bafoulabé' },
          { code: 'SAT', name: 'Satadougou' },
          { code: 'KITA', name: 'Kita' },
          { code: 'MAH', name: 'Mahina' },
          { code: 'KOL', name: 'Kolokani' }
        ]
      },
      { code: 'KOU', name: 'Koulikoro',
        cities: [
          { code: 'KOU', name: 'Koulikoro' },
          { code: 'KAT', name: 'Kati' },
          { code: 'KOL', name: 'Kolokani' },
          { code: 'NAR', name: 'Nara' },
          { code: 'BAN', name: 'Banamba' },
          { code: 'DIO', name: 'Dioïla' },
          { code: 'KANG', name: 'Kangaba' },
          { code: 'MOR', name: 'Moribabougou' },
          { code: 'SAN', name: 'San' },
          { code: 'BAM', name: 'Bamako' }
        ]
      },
      { code: 'SIC', name: 'Sikasso',
        cities: [
          { code: 'SIC', name: 'Sikasso' },
          { code: 'KOU', name: 'Koutiala' },
          { code: 'SAN', name: 'San' },
          { code: 'BLA', name: 'Blah' },
          { code: 'YOR', name: 'Yorosso' },
          { code: 'BOU', name: 'Bougouni' },
          { code: 'KOL', name: 'Kolondiéba' },
          { code: 'KAD', name: 'Kadiana' },
          { code: 'FARA', name: 'Faraba' },
          { code: 'NIA', name: 'Nianfala' }
        ]
      },
      { code: 'SEG', name: 'Ségou',
        cities: [
          { code: 'SEG', name: 'Ségou' },
          { code: 'SAN', name: 'San' },
          { code: 'MAC', name: 'Macina' },
          { code: 'NIA', name: 'Niono' },
          { code: 'BLA', name: 'Blah' },
          { code: 'BAR', name: 'Barouéli' },
          { code: 'KOU', name: 'Koulikoro' },
          { code: 'KAT', name: 'Kati' },
          { code: 'KOL', name: 'Kolokani' },
          { code: 'NAR', name: 'Nara' }
        ]
      },
      { code: 'MOPT', name: 'Mopti',
        cities: [
          { code: 'MOPT', name: 'Mopti' },
          { code: 'BAN', name: 'Bandiagara' },
          { code: 'DOU', name: 'Douentza' },
          { code: 'JEN', name: 'Jenné' },
          { code: 'KOR', name: 'Koro' },
          { code: 'BANK', name: 'Bankass' },
          { code: 'TEN', name: 'Tenenkou' },
          { code: 'YOU', name: 'Youwarou' },
          { code: 'SAN', name: 'San' },
          { code: 'SEG', name: 'Ségou' }
        ]
      },
      { code: 'TOM', name: 'Tombouctou',
        cities: [
          { code: 'TOM', name: 'Tombouctou' },
          { code: 'GOU', name: 'Goundam' },
          { code: 'DIR', name: 'Diré' },
          { code: 'NIA', name: 'Niafunké' },
          { code: 'ARA', name: 'Araouane' },
          { code: 'BAM', name: 'Bamba' },
          { code: 'MOPT', name: 'Mopti' },
          { code: 'BAN', name: 'Bandiagara' },
          { code: 'DOU', name: 'Douentza' },
          { code: 'JEN', name: 'Jenné' }
        ]
      },
      { code: 'Gao', name: 'Gao',
        cities: [
          { code: 'GAO', name: 'Gao' },
          { code: 'KID', name: 'Kidal' },
          { code: 'TIN', name: 'Tessalit' },
          { code: 'ARA', name: 'Araouane' },
          { code: 'BAM', name: 'Bamba' },
          { code: 'MOPT', name: 'Mopti' },
          { code: 'BAN', name: 'Bandiagara' },
          { code: 'DOU', name: 'Douentza' },
          { code: 'JEN', name: 'Jenné' },
          { code: 'TOM', name: 'Tombouctou' }
        ]
      },
      { code: 'KID', name: 'Kidal',
        cities: [
          { code: 'KID', name: 'Kidal' },
          { code: 'TIN', name: 'Tessalit' },
          { code: 'ARA', name: 'Araouane' },
          { code: 'BAM', name: 'Bamba' },
          { code: 'GAO', name: 'Gao' },
          { code: 'MOPT', name: 'Mopti' },
          { code: 'BAN', name: 'Bandiagara' },
          { code: 'DOU', name: 'Douentza' },
          { code: 'JEN', name: 'Jenné' },
          { code: 'TOM', name: 'Tombouctou' }
        ]
      }
    ]
  };
