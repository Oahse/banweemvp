/**
 * Philippines country data with regions, cities, and tax information
 */

import { Country } from './index';

export const philippines: Country = {
    code: 'PH',
    name: 'Philippines',
    taxInfo: { standardRate: 12, taxName: 'VAT', currency: 'PHP', region: 'APAC' },
    provinces: [
      { code: 'NCR', name: 'National Capital Region',
        cities: [
          { code: 'MANILA', name: 'Manila' },
          { code: 'QUEZON', name: 'Quezon City' },
          { code: 'CALOOCAN', name: 'Caloocan' },
          { code: 'DAVAO', name: 'Davao City' },
          { code: 'CEBU', name: 'Cebu City' },
          { code: 'ZAMBOANGA', name: 'Zamboanga City' },
          { code: 'ANTIPOLO', name: 'Antipolo' },
          { code: 'TAGUIG', name: 'Taguig' },
          { code: 'PASIG', name: 'Pasig' },
          { code: 'MAKATI', name: 'Makati' }
        ]
      },
      { code: 'CAR', name: 'Cordillera Administrative Region',
        cities: [
          { code: 'BAGUIO', name: 'Baguio' },
          { code: 'LA', name: 'La Trinidad' },
          { code: 'TABUK', name: 'Tabuk' },
          { code: 'BONTOC', name: 'Bontoc' },
          { code: 'LAGAWE', name: 'Lagawe' },
          { code: 'KABUGAO', name: 'Kabugao' },
          { code: 'BANGUED', name: 'Bangued' },
          { code: 'SABULAN', name: 'Sablan' },
          { code: 'TUBA', name: 'Tuba' },
          { code: 'ITOGON', name: 'Itogon' }
        ]
      },
      { code: 'I', name: 'Ilocos Region',
        cities: [
          { code: 'LAOAG', name: 'Laoag' },
          { code: 'SAN', name: 'San Fernando' },
          { code: 'DAGUPAN', name: 'Dagupan' },
          { code: 'URDANETA', name: 'Urdaneta' },
          { code: 'SAN2', name: 'San Carlos' },
          { code: 'CANDON', name: 'Candon' },
          { code: 'BATAc', name: 'Batac' },
          { code: 'VIGAN', name: 'Vigan' },
          { code: 'LINGAYEN', name: 'Lingayen' },
          { code: 'ALAMINOS', name: 'Alaminos' }
        ]
      },
      { code: 'II', name: 'Cagayan Valley',
        cities: [
          { code: 'TUGUEGARAO', name: 'Tuguegarao' },
          { code: 'CAUAYAN', name: 'Cauayan' },
          { code: 'ILAGAN', name: 'Ilagan' },
          { code: 'SANTIAGO', name: 'Santiago' },
          { code: 'CABARROGUIS', name: 'Cabarroguis' },
          { code: 'BAYOMBONG', name: 'Bayombong' },
          { code: 'SOLANO', name: 'Solano' },
          { code: 'MADDELA', name: 'Maddela' },
          { code: 'BAMBANG', name: 'Bambang' },
          { code: 'KABUGAO', name: 'Kabugao' }
        ]
      },
      { code: 'III', name: 'Central Luzon',
        cities: [
          { code: 'SAN', name: 'San Fernando' },
          { code: 'ANGELES', name: 'Angeles' },
          { code: 'MALOLOS', name: 'Malolos' },
          { code: 'CABANATUAN', name: 'Cabanatuan' },
          { code: 'GAPAN', name: 'Gapan' },
          { code: 'MABALACAT', name: 'Mabalacat' },
          { code: 'TARLAC', name: 'Tarlac' },
          { code: 'CABANATUAN2', name: 'Cabanatuan City' },
          { code: 'MUNOZ', name: 'Muñoz' },
          { code: 'PALAYAN', name: 'Palayan' }
        ]
      },
      { code: 'IVA', name: 'CALABARZON',
        cities: [
          { code: 'CALAMBA', name: 'Calamba' },
          { code: 'BATANGAS', name: 'Batangas' },
          { code: 'LIPA', name: 'Lipa' },
          { code: 'LUCENA', name: 'Lucena' },
          { code: 'TANAUAN', name: 'Tanauan' },
          { code: 'SAN', name: 'San Pablo' },
          { code: 'SANTA', name: 'Santa Rosa' },
          { code: 'BIÑAN', name: 'Biñan' },
          { code: 'CABUYAO', name: 'Cabuyao' },
          { code: 'GENERAL', name: 'General Trias' }
        ]
      },
      { code: 'IVB', name: 'MIMAROPA',
        cities: [
          { code: 'CALAPAN', name: 'Calapan' },
          { code: 'PUERTO', name: 'Puerto Princesa' },
          { code: 'CORON', name: 'Coron' },
          { code: 'EL', name: 'El Nido' },
          { code: 'SAN', name: 'San Jose' },
          { code: 'ROXAS', name: 'Roxas' },
          { code: 'CULION', name: 'Culion' },
          { code: 'BUSUANGA', name: 'Busuanga' },
          { code: 'LINAPACAN', name: 'Linapacan' },
          { code: 'TAYTAY', name: 'Taytay' }
        ]
      },
      { code: 'V', name: 'Bicol Region',
        cities: [
          { code: 'LEGAZPI', name: 'Legazpi' },
          { code: 'NAGA', name: 'Naga' },
          { code: 'IRIGA', name: 'Iriga' },
          { code: 'TABACO', name: 'Tabaco' },
          { code: 'MASBATE', name: 'Masbate City' },
          { code: 'SORSOGON', name: 'Sorsogon City' },
          { code: 'DAET', name: 'Daet' },
          { code: 'PILI', name: 'Pili' },
          { code: 'GOA', name: 'Goa' },
          { code: 'SAN', name: 'San Jose' }
        ]
      },
      { code: 'VI', name: 'Western Visayas',
        cities: [
          { code: 'ILOILO', name: 'Iloilo City' },
          { code: 'BACOLOD', name: 'Bacolod' },
          { code: 'ROXAS', name: 'Roxas City' },
          { code: 'SAN', name: 'San Carlos' },
          { code: 'SILAY', name: 'Silay' },
          { code: 'CADIZ', name: 'Cadiz' },
          { code: 'VICTORIAS', name: 'Victorias' },
          { code: 'KABANKALAN', name: 'Kabankalan' },
          { code: 'SAGAY', name: 'Sagay' },
          { code: 'ESCALANTE', name: 'Escalante' }
        ]
      },
      { code: 'VII', name: 'Central Visayas',
        cities: [
          { code: 'CEBU', name: 'Cebu City' },
          { code: 'MANDAUE', name: 'Mandaue' },
          { code: 'LAPU-LAPU', name: 'Lapu-Lapu' },
          { code: 'TOLEDO', name: 'Toledo' },
          { code: 'TAGBILARAN', name: 'Tagbilaran' },
          { code: 'Talisay', name: 'Talisay' },
          { code: 'NAGA', name: 'Naga' },
          { code: 'CARCAR', name: 'Carcar' },
          { code: 'DANAO', name: 'Danao' },
          { code: 'BOGO', name: 'Bogo' }
        ]
      },
      { code: 'VIII', name: 'Eastern Visayas',
        cities: [
          { code: 'TACLOBAN', name: 'Tacloban' },
          { code: 'ORMOC', name: 'Ormoc' },
          { code: 'CALBAYOG', name: 'Calbayog' },
          { code: 'BORONGAN', name: 'Borongan' },
          { code: 'CATBALOGAN', name: 'Catbalogan' },
          { code: 'MAASIN', name: 'Maasin' },
          { code: 'BAYBAY', name: 'Baybay' },
          { code: 'PALO', name: 'Palo' },
          { code: 'TANAUAN', name: 'Tanauan' },
          { code: 'JARO', name: 'Jaro' }
        ]
      },
      { code: 'IX', name: 'Zamboanga Peninsula',
        cities: [
          { code: 'ZAMBOANGA', name: 'Zamboanga City' },
          { code: 'DIPOLOG', name: 'Dipolog' },
          { code: 'DAPI', name: 'Dapitan' },
          { code: 'PAGADIAN', name: 'Pagadian' },
          { code: 'ISABELA', name: 'Isabela' },
          { code: 'ZAMBOANGA2', name: 'Zamboanga del Norte' },
          { code: 'ZAMBOANGA3', name: 'Zamboanga del Sur' },
          { code: 'ZAMBOANGA4', name: 'Zamboanga Sibugay' },
          { code: 'SINDANGAN', name: 'Sindangan' },
          { code: 'OZAMIZ', name: 'Ozamiz' }
        ]
      },
      { code: 'X', name: 'Northern Mindanao',
        cities: [
          { code: 'CAGAYAN', name: 'Cagayan de Oro' },
          { code: 'ILIGAN', name: 'Iligan' },
          { code: 'MALAYBALAY', name: 'Malaybalay' },
          { code: 'VALENCIA', name: 'Valencia' },
          { code: 'OROQUIETA', name: 'Oroquieta' },
          { code: 'OZAMIZ', name: 'Ozamiz' },
          { code: 'TANGUB', name: 'Tangub' },
          { code: 'EL', name: 'El Salvador' },
          { code: 'GINOOGAN', name: 'Ginoogan' },
          { code: 'MAMBAJAO', name: 'Mambajao' }
        ]
      },
      { code: 'XI', name: 'Davao Region',
        cities: [
          { code: 'DAVAO', name: 'Davao City' },
          { code: 'DIGOS', name: 'Digos' },
          { code: 'TAGUM', name: 'Tagum' },
          { code: 'PANABO', name: 'Panabo' },
          { code: 'MATI', name: 'Mati' },
          { code: 'SAMAL', name: 'Samal' },
          { code: 'ISLAND', name: 'Island Garden City of Samal' },
          { code: 'BANSALAN', name: 'Bansalan' },
          { code: 'MALITA', name: 'Malita' },
          { code: 'STA', name: 'Sta. Cruz' }
        ]
      },
      { code: 'XII', name: 'SOCCSKSARGEN',
        cities: [
          { code: 'GENERAL', name: 'General Santos' },
          { code: 'KORONADAL', name: 'Koronadal' },
          { code: 'KIDAPAWAN', name: 'Kidapawan' },
          { code: 'COTABATO', name: 'Cotabato City' },
          { code: 'TACURONG', name: 'Tacurong' },
          { code: 'MIDSAYAP', name: 'Midsayap' },
          { code: 'POLANCO', name: 'Polanco' },
          { code: 'PAGALUNGAN', name: 'Pagalungan' },
          { code: 'PANTUKAN', name: 'Pantukan' },
          { code: 'MAKILALA', name: 'Makilala' }
        ]
      },
      { code: 'XIII', name: 'Caraga',
        cities: [
          { code: 'BUTUAN', name: 'Butuan' },
          { code: 'SURIGAO', name: 'Surigao City' },
          { code: 'BISLIG', name: 'Bislig' },
          { code: 'TANDAG', name: 'Tandag' },
          { code: 'CABADBARAN', name: 'Cabadbaran' },
          { code: 'BAYUGAN', name: 'Bayugan' },
          { code: 'PROSPERIDAD', name: 'Prosperidad' },
          { code: 'SAN', name: 'San Francisco' },
          { code: 'VERUELA', name: 'Veruela' },
          { code: 'SIBAGAT', name: 'Sibagat' }
        ]
      },
      { code: 'BARMM', name: 'Bangsamoro Autonomous Region in Muslim Mindanao',
        cities: [
          { code: 'COTABATO', name: 'Cotabato City' },
          { code: 'MARAWI', name: 'Marawi' },
          { code: 'LAMITAN', name: 'Lamitan' },
          { code: 'ISABELA', name: 'Isabela City' },
          { code: 'JOLO', name: 'Jolo' },
          { code: 'BONGAO', name: 'Bongao' },
          { code: 'MASBATE', name: 'Masbate City' },
          { code: 'MALABANG', name: 'Malabang' },
          { code: 'PARANG', name: 'Parang' },
          { code: 'DATU', name: 'Datu Odin Sinsuat' }
        ]
      }
    ]
};
