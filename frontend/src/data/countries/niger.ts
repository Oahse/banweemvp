/**
 * Niger country data with regions, cities, and tax information
 */

import { Country } from './index';

export const niger: Country = {
    code: 'NE',
    name: 'Niger',
    taxInfo: { standardRate: 19, taxName: 'VAT', currency: 'XOF', region: 'MEA' },
    provinces: [
      { code: 'AG', name: 'Agadez',
        cities: [
          { code: 'AGA', name: 'Agadez' },
          { code: 'ARL', name: 'Arlit' },
          { code: 'BIL', name: 'Bilma' },
          { code: 'DIR', name: 'Dirkou' },
          { code: 'ING', name: 'Ingall' },
          { code: 'TCH', name: 'Tchintabaraden' },
          { code: 'TCH2', name: 'Tchirozerine' },
          { code: 'TIM', name: 'Timia' },
          { code: 'ABAL', name: 'Abalak' },
          { code: 'TAN', name: 'Tahoua' }
        ]
      },
      { code: 'DI', name: 'Diffa',
        cities: [
          { code: 'DIF', name: 'Diffa' },
          { code: 'BOS', name: 'Bosso' },
          { code: 'GOU', name: 'Gouré' },
          { code: 'NGU', name: 'Ngourti' },
          { code: 'NIG', name: 'Nguigmi' },
          { code: 'SAB', name: 'Salkam' },
          { code: 'CHI', name: 'Chétimari' },
          { code: 'GAG', name: 'Gagamari' },
          { code: 'KOU', name: 'Koulou' },
          { code: 'MAI', name: 'Maine-Soroa' }
        ]
      },
      { code: 'DO', name: 'Dosso',
        cities: [
          { code: 'DOS', name: 'Dosso' },
          { code: 'LOG', name: 'Loga' },
          { code: 'TAK', name: 'Tessaoua' },
          { code: 'BIR', name: 'Birni Ngaouré' },
          { code: 'FAL', name: 'Falmey' },
          { code: 'GAY', name: 'Gayé' },
          { code: 'KAR', name: 'Kargui' },
          { code: 'KOL', name: 'Kollo' },
          { code: 'LIB', name: 'Libore' },
          { code: 'SAK', name: 'Sakoura' }
        ]
      },
      { code: 'MA', name: 'Maradi',
        cities: [
          { code: 'MAR', name: 'Maradi' },
          { code: 'MA2', name: 'Maradi' },
          { code: 'AGU', name: 'Aguié' },
          { code: 'BIR', name: 'Birni Nkonni' },
          { code: 'GUID', name: 'Guidan Roumdji' },
          { code: 'JAK', name: 'Jakiri' },
          { code: 'KAB', name: 'Kabza' },
          { code: 'MAD', name: 'Madarounfa' },
          { code: 'SAK', name: 'Sakoira' },
          { code: 'TAN', name: 'Tchouni' }
        ]
      },
      { code: 'TA', name: 'Tahoua',
        cities: [
          { code: 'TAH', name: 'Tahoua' },
          { code: 'ABAL', name: 'Abalak' },
          { code: 'BIR', name: 'Birni Nkonni' },
          { code: 'BOL', name: 'Bouza' },
          { code: 'GUID', name: 'Guidan Roumdji' },
          { code: 'KAB', name: 'Kabza' },
          { code: 'MAD', name: 'Madarounfa' },
          { code: 'SAK', name: 'Sakoira' },
          { code: 'TAN', name: 'Tchouni' },
          { code: 'TCH', name: 'Tchintabaraden' }
        ]
      },
      { code: 'TI', name: 'Tillabéri',
        cities: [
          { code: 'TIL', name: 'Tillabéri' },
          { code: 'FIL', name: 'Filingué' },
          { code: 'KOL', name: 'Kollo' },
          { code: 'LIB', name: 'Libore' },
          { code: 'OUA', name: 'Ouallam' },
          { code: 'SAK', name: 'Sakoura' },
          { code: 'TAP', name: 'Taporé' },
          { code: 'TCH', name: 'Tchintabaraden' },
          { code: 'TOR', name: 'Torodi' },
          { code: 'YEL', name: 'Yelou' }
        ]
      },
      { code: 'ZI', name: 'Zinder',
        cities: [
          { code: 'ZIN', name: 'Zinder' },
          { code: 'GOU', name: 'Gouré' },
          { code: 'MAT', name: 'Matamèye' },
          { code: 'MIR', name: 'Mirriah' },
          { code: 'NGU', name: 'Ngourti' },
          { code: 'TAN', name: 'Tanout' },
          { code: 'TCH', name: 'Tchintabaraden' },
          { code: 'TCH2', name: 'Tchirozerine' },
          { code: 'TIM', name: 'Timia' },
          { code: 'ABAL', name: 'Abalak' }
        ]
      },
      { code: 'NI', name: 'Niamey',
        cities: [
          { code: 'NIA', name: 'Niamey' },
          { code: 'KOL', name: 'Kollo' },
          { code: 'LIB', name: 'Libore' },
          { code: 'SAK', name: 'Sakoura' },
          { code: 'TAP', name: 'Taporé' },
          { code: 'TCH', name: 'Tchintabaraden' },
          { code: 'TOR', name: 'Torodi' },
          { code: 'YEL', name: 'Yelou' },
          { code: 'FIL', name: 'Filingué' },
          { code: 'OUA', name: 'Ouallam' }
        ]
      }
    ]
  };
