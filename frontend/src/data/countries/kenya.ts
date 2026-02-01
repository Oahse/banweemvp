/**
 * Kenya country data with counties, cities, and tax information
 */

import { Country } from './index';

export const kenya: Country = {
    code: 'KE',
    name: 'Kenya',
    taxInfo: { standardRate: 16, taxName: 'VAT', currency: 'KES', region: 'MEA' },
    provinces: [
      { code: 'NBI', name: 'Nairobi',
        cities: [
          { code: 'NBI', name: 'Nairobi' },
          { code: 'KAS', name: 'Kasarani' },
          { code: 'KIB', name: 'Kibera' },
          { code: 'DAG', name: 'Dagoretti' },
          { code: 'LANG', name: 'Langata' },
          { code: 'EMB', name: 'Embakasi' },
          { code: 'WEST', name: 'Westlands' },
          { code: 'KAM', name: 'Kamukunji' },
          { code: 'MATH', name: 'Mathare' },
          { code: 'STARE', name: 'Starehe' }
        ]
      },
      { code: 'COA', name: 'Coast',
        cities: [
          { code: 'MBA', name: 'Mombasa' },
          { code: 'KIL', name: 'Kilifi' },
          { code: 'KWA', name: 'Kwale' },
          { code: 'TANA', name: 'Tana River' },
          { code: 'LAMU', name: 'Lamu' },
          { code: 'TIKA', name: 'Taka Tungu' },
          { code: 'MALINDI', name: 'Malindi' },
          { code: 'DIANI', name: 'Diani' },
          { code: 'VOI', name: 'Voi' },
          { code: 'WAT', name: 'Watamu' }
        ]
      },
      { code: 'RVA', name: 'Rift Valley',
        cities: [
          { code: 'NAK', name: 'Nakuru' },
          { code: 'ELD', name: 'Eldoret' },
          { code: 'KER', name: 'Kericho' },
          { code: 'KIT', name: 'Kitale' },
          { code: 'KAP', name: 'Kapsabet' },
          { code: 'NAN', name: 'Nandi' },
          { code: 'BOM', name: 'Bomet' },
          { code: 'NAR', name: 'Narok' },
          { code: 'KIS', name: 'Kisii' },
          { code: 'NYAM', name: 'Nyamira' }
        ]
      },
      { code: 'WES', name: 'Western',
        cities: [
          { code: 'KAK', name: 'Kakamega' },
          { code: 'BUS', name: 'Busia' },
          { code: 'BUN', name: 'Bungoma' },
          { code: 'VIH', name: 'Vihiga' },
          { code: 'WEB', name: 'Webuye' },
          { code: 'BUT', name: 'Butere' },
          { code: 'MAL', name: 'Malava' },
          { code: 'MUM', name: 'Mumias' },
          { code: 'LUAN', name: 'Luan' },
          { code: 'CHEP', name: 'Cheptais' }
        ]
      },
      { code: 'NYA', name: 'Nyanza',
        cities: [
          { code: 'KIS', name: 'Kisumu' },
          { code: 'HOM', name: 'Homa Bay' },
          { code: 'MIG', name: 'Migori' },
          { code: 'KIS2', name: 'Kisii' },
          { code: 'NYA', name: 'Nyamira' },
          { code: 'SIAY', name: 'Siaya' },
          { code: 'BON', name: 'Bondo' },
          { code: 'RACH', name: 'Rachuonyo' },
          { code: 'SUBA', name: 'Suba' },
          { code: 'KEND', name: 'Kendu Bay' }
        ]
      },
      { code: 'EAS', name: 'Eastern',
        cities: [
          { code: 'MER', name: 'Meru' },
          { code: 'EMB', name: 'Embu' },
          { code: 'KIT', name: 'Kitui' },
          { code: 'MACH', name: 'Machakos' },
          { code: 'MAK', name: 'Makueni' },
          { code: 'THAR', name: 'Tharaka' },
          { code: 'ISIO', name: 'Isiolo' },
          { code: 'MARS', name: 'Marsabit' },
          { code: 'MOY', name: 'Moyale' },
          { code: 'WAJ', name: 'Wajir' }
        ]
      },
      { code: 'CEN', name: 'Central',
        cities: [
          { code: 'NYE', name: 'Nyeri' },
          { code: 'MUR', name: 'Murang\'a' },
          { code: 'KIAM', name: 'Kiambu' },
          { code: 'KIRI', name: 'Kirinyaga' },
          { code: 'NYAN', name: 'Nyandarua' },
          { code: 'THIKA', name: 'Thika' },
          { code: 'KAR', name: 'Karatina' },
          { code: 'KERU', name: 'Kerugoya' },
          { code: 'OL', name: 'Ol Kalou' },
          { code: 'NANY', name: 'Nanyuki' }
        ]
      },
      { code: 'NOR', name: 'North Eastern',
        cities: [
          { code: 'GARI', name: 'Garissa' },
          { code: 'WAJ', name: 'Wajir' },
          { code: 'MAN', name: 'Mandera' },
          { code: 'EL', name: 'El Wak' },
          { code: 'TAK', name: 'Takaba' },
          { code: 'BAN', name: 'Banisa' },
          { code: 'RAS', name: 'Rask' },
          { code: 'BUT', name: 'Buta' },
          { code: 'LAF', name: 'Lafey' },
          { code: 'DADA', name: 'Dadaab' }
        ]
      }
    ]
  };
