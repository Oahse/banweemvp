/**
 * Philippines country data with regions, provinces, and cities
 */

import { Country } from './index';

export const philippines: Country = {
  code: 'PH',
  name: 'Philippines',
  flag: '🇵🇭',
  capital: 'Manila',
  area: 300000,
  currencySymbol: '₱',
  officialLanguages: ['Filipino', 'English'],
  demonym: 'Filipino',
  taxInfo: { standardRate: 12, taxName: 'VAT', currency: 'PHP', region: 'APAC' },
  divisions: [
    { code: 'NCR', name: 'National Capital Region', type: 'region',
      cities: [
        { code: 'MANILA', name: 'Manila' },
        { code: 'QUEZON', name: 'Quezon City' },
        { code: 'CALOOCAN', name: 'Caloocan' },
        { code: 'DASMA', name: 'Dasmariñas' },
        { code: 'VAL', name: 'Valenzuela' }
      ]
    },
    { code: 'CAR', name: 'Cordillera Administrative Region', type: 'administrative region',
      cities: [
        { code: 'BAGUIO', name: 'Baguio' },
        { code: 'BENGUET', name: 'Benguet' },
        { code: 'MOUNTAIN', name: 'Mountain Province' },
        { code: 'IFUGAO', name: 'Ifugao' },
        { code: 'KALINGA', name: 'Kalinga' }
      ]
    },
    { code: 'I', name: 'Ilocos Region', type: 'region',
      cities: [
        { code: 'SAN', name: 'San Fernando' },
        { code: 'LAOAG', name: 'Laoag' },
        { code: 'VIGAN', name: 'Vigan' },
        { code: 'DAGUPAN', name: 'Dagupan' },
        { code: 'ALAMINOS', name: 'Alaminos' }
      ]
    },
    { code: 'II', name: 'Cagayan Valley', type: 'region',
      cities: [
        { code: 'TUGUEGARAO', name: 'Tuguegarao' },
        { code: 'CAUAYAN', name: 'Cauayan' },
        { code: 'ILAGAN', name: 'Ilagan' },
        { code: 'SANTIAGO', name: 'Santiago' },
        { code: 'TABUK', name: 'Tabuk' }
      ]
    },
    { code: 'III', name: 'Central Luzon', type: 'region',
      cities: [
        { code: 'ANGELES', name: 'Angeles' },
        { code: 'BALANGA', name: 'Balanga' },
        { code: 'CABANATUAN', name: 'Cabanatuan' },
        { code: 'MALOLOS', name: 'Malolos' },
        { code: 'SAN', name: 'San Jose' }
      ]
    },
    { code: 'IVA', name: 'CALABARZON', type: 'region',
      cities: [
        { code: 'LUCENA', name: 'Lucena' },
        { code: 'TANAUAN', name: 'Tanauan' },
        { code: 'BATANGAS', name: 'Batangas' },
        { code: 'LIPA', name: 'Lipa' },
        { code: 'SAN', name: 'San Pablo' }
      ]
    },
    { code: 'IVB', name: 'MIMAROPA', type: 'region',
      cities: [
        { code: 'CALAPAN', name: 'Calapan' },
        { code: 'PUERTO', name: 'Puerto Princesa' },
        { code: 'ROMBLON', name: 'Romblon' },
        { code: 'PALAWAN', name: 'Palawan' },
        { code: 'MINDORO', name: 'Mindoro' }
      ]
    },
    { code: 'V', name: 'Bicol Region', type: 'region',
      cities: [
        { code: 'LEGAZPI', name: 'Legazpi' },
        { code: 'NAGA', name: 'Naga' },
        { code: 'IRIGA', name: 'Iriga' },
        { code: 'MASBATE', name: 'Masbate' },
        { code: 'SORSOGON', name: 'Sorsogon' }
      ]
    },
    { code: 'VI', name: 'Western Visayas', type: 'region',
      cities: [
        { code: 'ILOILO', name: 'Iloilo' },
        { code: 'BACOLOD', name: 'Bacolod' },
        { code: 'ROXAS', name: 'Roxas' },
        { code: 'SAN', name: 'San Carlos' },
        { code: 'CADIZ', name: 'Cadiz' }
      ]
    },
    { code: 'VII', name: 'Central Visayas', type: 'region',
      cities: [
        { code: 'CEBU', name: 'Cebu' },
        { code: 'MANDAUE', name: 'Mandaue' },
        { code: 'LAPU', name: 'Lapu-Lapu' },
        { code: 'TAGBILARAN', name: 'Tagbilaran' },
        { code: 'DUMAGUETE', name: 'Dumaguete' }
      ]
    },
    { code: 'VIII', name: 'Eastern Visayas', type: 'region',
      cities: [
        { code: 'TACLOBAN', name: 'Tacloban' },
        { code: 'ORMOC', name: 'Ormoc' },
        { code: 'BAYBAY', name: 'Baybay' },
        { code: 'CALBAYOG', name: 'Calbayog' },
        { code: 'CATBALOGAN', name: 'Catbalogan' }
      ]
    },
    { code: 'IX', name: 'Zamboanga Peninsula', type: 'region',
      cities: [
        { code: 'ZAMBOANGA', name: 'Zamboanga' },
        { code: 'DIPOLOG', name: 'Dipolog' },
        { code: 'DAVAO', name: 'Davao' },
        { code: 'PAGADIAN', name: 'Pagadian' },
        { code: 'ISABELA', name: 'Isabela' }
      ]
    },
    { code: 'X', name: 'Northern Mindanao', type: 'region',
      cities: [
        { code: 'CAGAYAN', name: 'Cagayan de Oro' },
        { code: 'ILIGAN', name: 'Iligan' },
        { code: 'MALAYBALAY', name: 'Malaybalay' },
        { code: 'VALENCIA', name: 'Valencia' },
        { code: 'OZAMIZ', name: 'Ozamiz' }
      ]
    },
    { code: 'XI', name: 'Davao Region', type: 'region',
      cities: [
        { code: 'DAVAO', name: 'Davao' },
        { code: 'DIGOS', name: 'Digos' },
        { code: 'TAGUM', name: 'Tagum' },
        { code: 'MATI', name: 'Mati' },
        { code: 'PANABO', name: 'Panabo' }
      ]
    },
    { code: 'XII', name: 'SOCCSKSARGEN', type: 'region',
      cities: [
        { code: 'GENERAL', name: 'General Santos' },
        { code: 'KORONADAL', name: 'Koronadal' },
        { code: 'KIDAPAWAN', name: 'Kidapawan' },
        { code: 'COTABATO', name: 'Cotabato' },
        { code: 'TACURONG', name: 'Tacurong' }
      ]
    },
    { code: 'XIII', name: 'Caraga', type: 'region',
      cities: [
        { code: 'BUTUAN', name: 'Butuan' },
        { code: 'SURIGAO', name: 'Surigao' },
        { code: 'BISLIG', name: 'Bislig' },
        { code: 'TANDAG', name: 'Tandag' },
        { code: 'CABADBARAN', name: 'Cabadbaran' }
      ]
    },
    { code: 'BARMM', name: 'Bangsamoro Autonomous Region', type: 'autonomous region',
      cities: [
        { code: 'COTABATO', name: 'Cotabato' },
        { code: 'MARAWI', name: 'Marawi' },
        { code: 'LAMITAN', name: 'Lamitan' },
        { code: 'ISABELA', name: 'Isabela' },
        { code: 'JOLO', name: 'Jolo' }
      ]
    }
  ]
};
