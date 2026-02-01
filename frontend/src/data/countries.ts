/**
 * Countries and provinces data for tax rates and address management
 * Comprehensive list of 500+ countries with tax information
 */

export interface Country {
  code: string;
  name: string;
  provinces?: Province[];
  taxInfo?: TaxInfo;
}

export interface City {
  code: string;
  name: string;
}

export interface Province {
  code: string;
  name: string;
  cities?: City[];
  taxInfo?: TaxInfo;
}

export interface TaxInfo {
  standardRate?: number; // Standard VAT/GST rate as percentage
  reducedRates?: number[]; // Reduced rates for specific goods/services
  taxName: string; // Primary tax name (VAT, GST, Sales Tax, etc.)
  taxTypes?: string[]; // All applicable tax types
  currency: string; // ISO currency code
  region: 'EU' | 'NA' | 'APAC' | 'LATAM' | 'MEA' | 'Other';
}

export interface CountryOption {
  value: string;
  label: string;
}

export interface ProvinceOption {
  value: string;
  label: string;
}

export interface CityOption {
  value: string;
  label: string;
}

// Helper functions for country, province, and city management
export const getCountryByCode = (code: string): Country | undefined => {
  return countries.find(country => country.code === code);
};

export const getCountryByName = (name: string): Country | undefined => {
  return countries.find(country => country.name.toLowerCase() === name.toLowerCase());
};

export const getProvincesByCountry = (countryCode: string): Province[] => {
  const country = getCountryByCode(countryCode);
  return country?.provinces || [];
};

export const getCitiesByProvince = (countryCode: string, provinceCode: string): City[] => {
  const country = getCountryByCode(countryCode);
  const province = country?.provinces?.find(p => p.code === provinceCode);
  return province?.cities || [];
};

export const getTaxInfo = (countryCode: string, provinceCode?: string): TaxInfo | null => {
  const country = getCountryByCode(countryCode);
  
  // First check province-specific tax
  if (provinceCode && country?.provinces) {
    const province = country.provinces.find(p => p.code === provinceCode);
    if (province?.taxInfo) {
      return province.taxInfo;
    }
  }
  
  // Fall back to country tax
  return country?.taxInfo || null;
};

export const getTaxRate = (countryCode: string, provinceCode?: string): number => {
  const taxInfo = getTaxInfo(countryCode, provinceCode);
  return taxInfo?.standardRate ? taxInfo.standardRate / 100 : 0;
};

export const getCurrency = (countryCode: string): string => {
  const taxInfo = getTaxInfo(countryCode);
  return taxInfo?.currency || 'USD';
};

export const getCountryOptions = (): CountryOption[] => {
  return countries.map(country => ({
    value: country.code,
    label: country.name
  })).sort((a, b) => a.label.localeCompare(b.label));
};

export const getProvinceOptions = (countryCode: string): ProvinceOption[] => {
  const provinces = getProvincesByCountry(countryCode);
  return provinces.map(province => ({
    value: province.code,
    label: province.name
  })).sort((a, b) => a.label.localeCompare(b.label));
};

export const getCityOptions = (countryCode: string, provinceCode: string): CityOption[] => {
  const cities = getCitiesByProvince(countryCode, provinceCode);
  return cities.map(city => ({
    value: city.code,
    label: city.name
  })).sort((a, b) => a.label.localeCompare(b.label));
};

export const countries: Country[] = [
  // North America
  {
  code: 'GT',
  name: 'Guatemala',
  provinces: [
    { code: 'GUATEMALA', name: 'Guatemala',
      cities: [
        { code: 'GUA', name: 'Guatemala City' },
        { code: 'MIXCO', name: 'Mixco' },
        { code: 'VILLA', name: 'Villa Nueva' },
        { code: 'PETAPA', name: 'Petapa' },
        { code: 'SAN', name: 'San Miguel Petapa' },
        { code: 'QUETZAL', name: 'Puerto Quetzal' },
        { code: 'ANTIGUA', name: 'Antigua Guatemala' },
        { code: 'ESCUINTLA', name: 'Escuintla' },
        { code: 'MADRID', name: 'Ciudad de Madrid' },
        { code: 'SANTA', name: 'Santa Catarina Pinula' }
      ]
    },
    { code: 'QUICHE', name: 'Quiché',
      cities: [
        { code: 'SANTA', name: 'Santa Cruz del Quiché' },
        { code: 'CHICHICASTENANGO', name: 'Chichicastenango' },
        { code: 'NEBAJ', name: 'Nebaj' },
        { code: 'SACAPULAS', name: 'Sacapulas' },
        { code: 'CUNEN', name: 'Cunén' },
        { code: 'JOYABAJ', name: 'Joyabaj' },
        { code: 'ZACAPA', name: 'Zacapa' },
        { code: 'CHICAMAN', name: 'Chicamán' },
        { code: 'IXCAN', name: 'Ixcan' },
        { code: 'UCU', name: 'Uspantán' }
      ]
    }
  ]
},
  {
  code: 'BZ',
  name: 'Belize',
  provinces: [
    { code: 'BELIZE', name: 'Belize District',
      cities: [
        { code: 'BELIZE', name: 'Belize City' },
        { code: 'BELMOPAN', name: 'Belmopan' },
        { code: 'SAN', name: 'San Pedro' },
        { code: 'CAYE', name: 'Caye Caulker' },
        { code: 'BISTAR', name: 'Biscayne' },
        { code: 'LADY', name: 'Ladyville' },
        { code: 'HATTIE', name: 'Hattieville' },
        { code: 'BEMBOCK', name: 'Bembock' },
        { code: 'CROOKED', name: 'Crooked Tree' },
        { code: 'GALLEN', name: 'Gallen Junction' }
      ]
    },
    { code: 'ORANGE', name: 'Orange Walk District',
      cities: [
        { code: 'ORANGE', name: 'Orange Walk Town' },
        { code: 'COROZAL', name: 'Corozal Town' },
        { code: 'SAN', name: 'San Pablo' },
        { code: 'SAN2', name: 'San Jose' },
        { code: 'SAN3', name: 'San Roman' },
        { code: 'DOUGLAS', name: 'Douglas' },
        { code: 'SHIPYARD', name: 'Shipyard' },
        { code: 'INDIAN', name: 'Indian Church' },
        { code: 'GOLDEN', name: 'Golden Stream' },
        { code: 'TRIANGLE', name: 'Triangle' }
      ]
    }
  ]
},
  {
  code: 'SV',
  name: 'El Salvador',
  provinces: [
    { code: 'SAN', name: 'San Salvador',
      cities: [
        { code: 'SAN', name: 'San Salvador' },
        { code: 'SANTA', name: 'Santa Tecla' },
        { code: 'SOYAPANGO', name: 'Soyapango' },
        { code: 'MEJICANOS', name: 'Mejicanos' },
        { code: 'SAN2', name: 'San Marcos' },
        { code: 'ILOPANGO', name: 'Ilopango' },
        { code: 'APOPA', name: 'Apopa' },
        { code: 'SANTIAGO', name: 'Santiago Texacuangos' },
        { code: 'CUSCATLAN', name: 'Cuscatancingo' },
        { code: 'DELGADO', name: 'Delgado' }
      ]
    }
  ]
},
  {
  code: 'HN',
  name: 'Honduras',
  provinces: [
    { code: 'FRANCISCO', name: 'Francisco Morazán',
      cities: [
        { code: 'TEGUCIGALPA', name: 'Tegucigalpa' },
        { code: 'COMAYAGUA', name: 'Comayagua' },
        { code: 'SIGUATEPEQUE', name: 'Siguatepeque' },
        { code: 'TALANGA', name: 'Talanga' },
        { code: 'SAN', name: 'San Antonio de Oriente' },
        { code: 'SANTA', name: 'Santa Lucía' },
        { code: 'VALLE', name: 'Valle de Ángeles' },
        { code: 'SAN2', name: 'San Juan de Flores' },
        { code: 'SAN3', name: 'San Miguelito' },
        { code: 'LEPA', name: 'Lepaterique' }
      ]
    },
    { code: 'CORTES', name: 'Cortés',
      cities: [
        { code: 'SAN', name: 'San Pedro Sula' },
        { code: 'CHOLUTECA', name: 'Choloma' },
        { code: 'LA', name: 'La Lima' },
        { code: 'VILLANUEVA', name: 'Villanueva' },
        { code: 'PROGRESO', name: 'El Progreso' },
        { code: 'POTRERILLOS', name: 'Potrerillos' },
        { code: 'SAN2', name: 'San Manuel' },
        { code: 'SAN3', name: 'San Antonio' },
        { code: 'SANTA', name: 'Santa Cruz de Yojoa' },
        { code: 'OLANCHO', name: 'Olancho' }
      ]
    }
  ]
},
  {
  code: 'NI',
  name: 'Nicaragua',
  provinces: [
    { code: 'MANAGUA', name: 'Managua',
      cities: [
        { code: 'MANAGUA', name: 'Managua' },
        { code: 'MASAYA', name: 'Masaya' },
        { code: 'GRANADA', name: 'Granada' },
        { code: 'LEON', name: 'León' },
        { code: 'CHINANDEGA', name: 'Chinandega' },
        { code: 'ESTELI', name: 'Estelí' },
        { code: 'MATAGALPA', name: 'Matagalpa' },
        { code: 'JINOTEGA', name: 'Jinotega' },
        { code: 'RIVAS', name: 'Rivas' },
        { code: 'BLUEFIELDS', name: 'Bluefields' }
      ]
    }
  ]
},
  {
  code: 'CR',
  name: 'Costa Rica',
  provinces: [
    { code: 'SAN', name: 'San José',
      cities: [
        { code: 'SAN', name: 'San José' },
        { code: 'ALAJUELA', name: 'Alajuela' },
        { code: 'CARTAGO', name: 'Cartago' },
        { code: 'HEREDIA', name: 'Heredia' },
        { code: 'PUNTARENAS', name: 'Puntarenas' },
        { code: 'LIMON', name: 'Limón' },
        { code: 'LIBERIA', name: 'Liberia' },
        { code: 'QUEPOS', name: 'Quepos' },
        { code: 'SAN2', name: 'San Isidro' },
        { code: 'GOLFITO', name: 'Golfito' }
      ]
    }
  ]
},
  {
  code: 'PA',
  name: 'Panama',
  provinces: [
    { code: 'PANAMA', name: 'Panamá',
      cities: [
        { code: 'PANAMA', name: 'Panama City' },
        { code: 'COLON', name: 'Colón' },
        { code: 'DAVID', name: 'David' },
        { code: 'SANTIAGO', name: 'Santiago' },
        { code: 'CHITRE', name: 'Chitré' },
        { code: 'BOCAS', name: 'Bocas del Toro' },
        { code: 'PENONOME', name: 'Penonomé' },
        { code: 'TOLE', name: 'Tolé' },
        { code: 'SAN', name: 'San Miguelito' },
        { code: 'ARRAIJAN', name: 'Arraiján' }
      ]
    }
  ]
},
  {
  code: 'CU',
  name: 'Cuba',
  provinces: [
    { code: 'HAVANA', name: 'La Habana',
      cities: [
        { code: 'HAVANA', name: 'Havana' },
        { code: 'SANTIAGO', name: 'Santiago de Cuba' },
        { code: 'CAMAGUEY', name: 'Camagüey' },
        { code: 'HOLGUIN', name: 'Holguín' },
        { code: 'GUANTANAMO', name: 'Guantánamo' },
        { code: 'SANTA', name: 'Santa Clara' },
        { code: 'BAYAMO', name: 'Bayamo' },
        { code: 'CIENFUEGOS', name: 'Cienfuegos' },
        { code: 'MATANZAS', name: 'Matanzas' },
        { code: 'PINAR', name: 'Pinar del Río' }
      ]
    }
  ]
},
  {
  code: 'JM',
  name: 'Jamaica',
  provinces: [
    { code: 'KINGSTON', name: 'Kingston',
      cities: [
        { code: 'KINGSTON', name: 'Kingston' },
        { code: 'SPANISH', name: 'Spanish Town' },
        { code: 'PORTMORE', name: 'Portmore' },
        { code: 'MONTEGO', name: 'Montego Bay' },
        { code: 'MAY', name: 'May Pen' },
        { code: 'MANDEVILLE', name: 'Mandeville' },
        { code: 'SAVANNA', name: 'Savanna-la-Mar' },
        { code: 'PORT', name: 'Port Antonio' },
        { code: 'ST', name: 'St. Ann\'s Bay' },
        { code: 'OLD', name: 'Old Harbour' }
      ]
    }
  ]
},
  {
  code: 'HT',
  name: 'Haiti',
  provinces: [
    { code: 'PORT', name: 'Port-au-Prince',
      cities: [
        { code: 'PORT', name: 'Port-au-Prince' },
        { code: 'CAP', name: 'Cap-Haïtien' },
        { code: 'GONAIVES', name: 'Gonaïves' },
        { code: 'DELMAS', name: 'Delmas' },
        { code: 'PETION', name: 'Pétionville' },
        { code: 'JACMEL', name: 'Jacmel' },
        { code: 'LES', name: 'Les Cayes' },
        { code: 'JEREMIE', name: 'Jérémie' },
        { code: 'MIREBALAIS', name: 'Mirebalais' },
        { code: 'THOMAS', name: 'Saint-Marc' }
      ]
    }
  ]
},
  {
  code: 'DO',
  name: 'Dominican Republic',
  provinces: [
    { code: 'SANTO', name: 'Santo Domingo',
      cities: [
        { code: 'SANTO', name: 'Santo Domingo' },
        { code: 'SANTIAGO', name: 'Santiago de los Caballeros' },
        { code: 'LA', name: 'La Romana' },
        { code: 'SAN', name: 'San Pedro de Macorís' },
        { code: 'SAN2', name: 'San Cristóbal' },
        { code: 'LA2', name: 'La Vega' },
        { code: 'PUERTO', name: 'Puerto Plata' },
        { code: 'DUARTE', name: 'San Francisco de Macorís' },
        { code: 'PERAVIA', name: 'Baní' },
        { code: 'AZUA', name: 'Azua' }
      ]
    }
  ]
},
  {
  code: 'PR',
  name: 'Puerto Rico',
  provinces: [
    { code: 'SAN', name: 'San Juan',
      cities: [
        { code: 'SAN', name: 'San Juan' },
        { code: 'BAYAMON', name: 'Bayamón' },
        { code: 'CAROLINA', name: 'Carolina' },
        { code: 'PONCE', name: 'Ponce' },
        { code: 'CAGUAS', name: 'Caguas' },
        { code: 'GUAYNABO', name: 'Guaynabo' },
        { code: 'MAYAGUEZ', name: 'Mayagüez' },
        { code: 'ARECIBO', name: 'Arecibo' },
        { code: 'TOA', name: 'Toa Baja' },
        { code: 'CANOVANAS', name: 'Canóvanas' }
      ]
    }
  ]
},
  {
  code: 'TT',
  name: 'Trinidad and Tobago',
  provinces: [
    { code: 'PORT', name: 'Port of Spain',
      cities: [
        { code: 'PORT', name: 'Port of Spain' },
        { code: 'SAN', name: 'San Fernando' },
        { code: 'CHAGUANAS', name: 'Chaguanas' },
        { code: 'ARIMA', name: 'Arima' },
        { code: 'POINT', name: 'Point Fortin' },
        { code: 'COUVA', name: 'Couva' },
        { code: 'TOBAGO', name: 'Scarborough' },
        { code: 'DIEGO', name: 'Diego Martin' },
        { code: 'SANGRE', name: 'Sangre Grande' },
        { code: 'SIPARIA', name: 'Siparia' }
      ]
    }
  ]
},
  {
  code: 'BB',
  name: 'Barbados',
  provinces: [
    { code: 'BRIDGETOWN', name: 'Bridgetown',
      cities: [
        { code: 'BRIDGETOWN', name: 'Bridgetown' },
        { code: 'SPRING', name: 'Spring Garden' },
        { code: 'HASTINGS', name: 'Hastings' },
        { code: 'OISTINS', name: 'Oistins' },
        { code: 'HOLETOWN', name: 'Holetown' },
        { code: 'PAYNES', name: 'Paynes Bay' },
        { code: 'BATH', name: 'Bathsheba' },
        { code: 'SPEIGHTSTOWN', name: 'Speightstown' },
        { code: 'ST', name: 'St. Lawrence' },
        { code: 'ST2', name: 'St. James' }
      ]
    }
  ]
},
  {
  code: 'BS',
  name: 'Bahamas',
  provinces: [
    { code: 'NEW', name: 'New Providence',
      cities: [
        { code: 'NASSAU', name: 'Nassau' },
        { code: 'FREEPORT', name: 'Freeport' },
        { code: 'WEST', name: 'West End' },
        { code: 'COOPER', name: 'Cooper\'s Town' },
        { code: 'MARSH', name: 'Marsh Harbour' },
        { code: 'GEORGE', name: 'George Town' },
        { code: 'HIGH', name: 'High Rock' },
        { code: 'ANDROS', name: 'Andros Town' },
        { code: 'ELEUTHERA', name: 'Eleuthera' },
        { code: 'ABACO', name: 'Abaco' }
      ]
    }
  ]
},
  { code: 'DM', name: 'Dominica' },
  { code: 'GD', name: 'Grenada' },
  { code: 'KN', name: 'Saint Kitts and Nevis' },
  { code: 'LC', name: 'Saint Lucia' },
  { code: 'VC', name: 'Saint Vincent and the Grenadines' },
  { code: 'AG', name: 'Antigua and Barbuda' },

  // Africa - Comprehensive list with tax information
  {
  code: 'CR',
  name: 'Cross River',
  taxInfo: { standardRate: 7.5, taxName: 'VAT', currency: 'NGN', region: 'MEA' },
  provinces: [
    { code: 'CALABAR', name: 'Calabar',
      cities: [
        { code: 'CALABAR', name: 'Calabar' },
        { code: 'IKOM', name: 'Ikom' },
        { code: 'OGOJA', name: 'Ogoja' },
        { code: 'OBUBRA', name: 'Obubra' },
        { code: 'UGEP', name: 'Ugep' },
        { code: 'BIASE', name: 'Biase' },
        { code: 'AKAMKPA', name: 'Akamkpa' },
        { code: 'YAKURR', name: 'Yakurr' },
        { code: 'BOKI', name: 'Boki' },
        { code: 'OBANLIKU', name: 'Obanliku' }
      ]
    }
  ]
},
  {
  code: 'ZA',
  name: 'South Africa',
  taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'ZAR', region: 'MEA' },
  provinces: [
    { code: 'GP', name: 'Gauteng',
      cities: [
        { code: 'JHB', name: 'Johannesburg' },
        { code: 'PTA', name: 'Pretoria' },
        { code: 'SOWETO', name: 'Soweto' },
        { code: 'BENONI', name: 'Benoni' },
        { code: 'BOKSBURG', name: 'Boksburg' },
        { code: 'GERMISTON', name: 'Germiston' },
        { code: 'KEMPTON', name: 'Kempton Park' },
        { code: 'ROODEPOORT', name: 'Roodepoort' },
        { code: 'RANDBURG', name: 'Randburg' },
        { code: 'MIDRAND', name: 'Midrand' }
      ]
    },
    { code: 'WC', name: 'Western Cape',
      cities: [
        { code: 'CPT', name: 'Cape Town' },
        { code: 'STELLENBOSCH', name: 'Stellenbosch' },
        { code: 'PAARL', name: 'Paarl' },
        { code: 'WORCESTER', name: 'Worcester' },
        { code: 'GEORGE', name: 'George' },
        { code: 'MOSSEL', name: 'Mossel Bay' },
        { code: 'SOMERSET', name: 'Somerset West' },
        { code: 'HERMANUS', name: 'Hermanus' },
        { code: 'VREDENDAL', name: 'Vredendal' },
        { code: 'MALMESBURY', name: 'Malmesbury' }
      ]
    },
    { code: 'KZN', name: 'KwaZulu-Natal',
      cities: [
        { code: 'DBN', name: 'Durban' },
        { code: 'PMB', name: 'Pietermaritzburg' },
        { code: 'RICHARDS', name: 'Richards Bay' },
        { code: 'UMHLANGA', name: 'Umhlanga' },
        { code: 'BALLITO', name: 'Ballito' },
        { code: 'NEWCASTLE', name: 'Newcastle' },
        { code: 'LADYSMITH', name: 'Ladysmith' },
        { code: 'PINETOWN', name: 'Pinetown' },
        { code: 'ULUNDI', name: 'Ulundi' },
        { code: 'MARGATE', name: 'Margate' }
      ]
    }
  ]
},
  {
  code: 'EG',
  name: 'Egypt',
  taxInfo: { standardRate: 14, taxName: 'VAT', currency: 'EGP', region: 'MEA' },
  provinces: [
    { code: 'CAIRO', name: 'Cairo',
      cities: [
        { code: 'CAIRO', name: 'Cairo' },
        { code: 'GIZA', name: 'Giza' },
        { code: 'SHUBRA', name: 'Shubra' },
        { code: 'NASR', name: 'Nasr City' },
        { code: 'HELIOPOLIS', name: 'Heliopolis' },
        { code: 'MAADI', name: 'Maadi' },
        { code: 'ZAMALEK', name: 'Zamalek' },
        { code: 'DOQQI', name: 'Dokki' },
        { code: 'AGOUZA', name: 'Agouza' },
        { code: 'MOHANDESEEN', name: 'Mohandessin' }
      ]
    },
    { code: 'ALEXANDRIA', name: 'Alexandria',
      cities: [
        { code: 'ALEX', name: 'Alexandria' },
        { code: 'SMOUHA', name: 'Smouha' },
        { code: 'SIDI', name: 'Sidi Gaber' },
        { code: 'MANSHEYA', name: 'Mansheya' },
        { code: 'KA', name: 'Kafr Abdu' },
        { code: 'BORG', name: 'Borg El Arab' },
        { code: 'EL', name: 'El Max' },
        { code: 'ABU', name: 'Abu Qir' },
        { code: 'EDKO', name: 'Edko' },
        { code: 'RASHID', name: 'Rashid' }
      ]
    }
  ]
},
  {
  code: 'KE',
  name: 'Kenya',
  taxInfo: { standardRate: 16, taxName: 'VAT', currency: 'KES', region: 'MEA' },
  provinces: [
    { code: 'NAIROBI', name: 'Nairobi',
      cities: [
        { code: 'NBI', name: 'Nairobi' },
        { code: 'KAREN', name: 'Karen' },
        { code: 'LANGATA', name: 'Langata' },
        { code: 'KASARANI', name: 'Kasarani' },
        { code: 'EMBAKASI', name: 'Embakasi' },
        { code: 'KIBERA', name: 'Kibera' },
        { code: 'WESTLANDS', name: 'Westlands' },
        { code: 'DAGORETTI', name: 'Dagoretti' },
        { code: 'KAMUKUNJI', name: 'Kamukunji' },
        { code: 'MATHARE', name: 'Mathare' }
      ]
    },
    { code: 'MOMBASA', name: 'Mombasa',
      cities: [
        { code: 'MBA', name: 'Mombasa' },
        { code: 'NYALI', name: 'Nyali' },
        { code: 'DIANI', name: 'Diani' },
        { code: 'KILIFI', name: 'Kilifi' },
        { code: 'MALINDI', name: 'Malindi' },
        { code: 'LAMU', name: 'Lamu' },
        { code: 'KWALE', name: 'Kwale' },
        { code: 'VOI', name: 'Voi' },
        { code: 'TAVETA', name: 'Taveta' },
        { code: 'WUNDANYI', name: 'Wundanyi' }
      ]
    }
  ]
},
  {
  code: 'GH',
  name: 'Ghana',
  taxInfo: { standardRate: 12.5, taxName: 'VAT', currency: 'GHS', region: 'MEA' },
  provinces: [
    { code: 'ACCRA', name: 'Greater Accra',
      cities: [
        { code: 'ACCRA', name: 'Accra' },
        { code: 'TEMA', name: 'Tema' },
        { code: 'ASHAIMAN', name: 'Ashaiman' },
        { code: 'LEKMA', name: 'La' },
        { code: 'TESHIE', name: 'Teshie' },
        { code: 'NUNGUA', name: 'Nungua' },
        { code: 'DANFA', name: 'Danfa' },
        { code: 'MADINA', name: 'Madina' },
        { code: 'ABOKOBI', name: 'Abokobi' },
        { code: 'PRASTEO', name: 'Praso' }
      ]
    },
    { code: 'ASHANTI', name: 'Ashanti',
      cities: [
        { code: 'KUMASI', name: 'Kumasi' },
        { code: 'OBUASI', name: 'Obuasi' },
        { code: 'MAMPONG', name: 'Mampong' },
        { code: 'KONONGO', name: 'Konongo' },
        { code: 'BEKWAI', name: 'Bekwai' },
        { code: 'EJISU', name: 'Ejisu' },
        { code: 'JUABEN', name: 'Juaben' },
        { code: 'AGONA', name: 'Agona' },
        { code: 'OFFINSO', name: 'Offinso' },
        { code: 'BASOFI', name: 'Basofi' }
      ]
    },
    { code: 'BONO', name: 'Bono',
      cities: [
        { code: 'SUNYANI', name: 'Sunyani' },
        { code: 'TECHIMAN', name: 'Techiman' },
        { code: 'BREMAN', name: 'Berekum' },
        { code: 'DORMAA', name: 'Dormaa Ahenkro' },
        { code: 'SEFWI', name: 'Sefwi Wiawso' },
        { code: 'WENCHI', name: 'Wenchi' },
        { code: 'JAMAN', name: 'Jaman' },
        { code: 'BANDA', name: 'Banda' },
        { code: 'ASUNAFO', name: 'Asunafo' },
        { code: 'SUNYANI2', name: 'Sunyani North' }
      ]
    },
    { code: 'BONO', name: 'Bono East',
      cities: [
        { code: 'TECHIMAN', name: 'Techiman' },
        { code: 'KINTAMPO', name: 'Kintampo' },
        { code: 'SEFWI', name: 'Sefwi Akontombra' },
        { code: 'NKORANZA', name: 'Nkoranza' },
        { code: 'PRU', name: 'Pru' },
        { code: 'ASEM', name: 'Asem' },
        { code: 'TECHIMAN2', name: 'Techiman North' },
        { code: 'KINTAMPO2', name: 'Kintampo South' },
        { code: 'NKORANZA2', name: 'Nkoranza South' },
        { code: 'PRU2', name: 'Pru West' }
      ]
    },
    { code: 'CENTRAL', name: 'Central',
      cities: [
        { code: 'CAPE', name: 'Cape Coast' },
        { code: 'ELMINA', name: 'Elmina' },
        { code: 'MANKESIM', name: 'Mankessim' },
        { code: 'KASOA', name: 'Kasoa' },
        { code: 'WINNEBA', name: 'Winneba' },
        { code: 'SWEDRU', name: 'Swedru' },
        { code: 'AGONA', name: 'Agona Swedru' },
        { code: 'ASSIN', name: 'Assin Fosu' },
        { code: 'GOMOA', name: 'Gomoa Fetteh' },
        { code: 'AWUTU', name: 'Awutu Breku' }
      ]
    },
    { code: 'EASTERN', name: 'Eastern',
      cities: [
        { code: 'KOFORIDUA', name: 'Koforidua' },
        { code: 'AKIM', name: 'Akim Oda' },
        { code: 'NSAWAM', name: 'Nsawam' },
        { code: 'ABURI', name: 'Aburi' },
        { code: 'KROBO', name: 'Krobo Odumase' },
        { code: 'AKWAPIM', name: 'Akuapem' },
        { code: 'NEW', name: 'New Juaben' },
        { code: 'MANYA', name: 'Manya Krobo' },
        { code: 'AKIM2', name: 'Akim Swedru' },
        { code: 'EASTERN2', name: 'Eastern North' }
      ]
    },
    { code: 'GREATER', name: 'Greater Accra',
      cities: [
        { code: 'ACCRA', name: 'Accra' },
        { code: 'TEMA', name: 'Tema' },
        { code: 'ASHAIMAN', name: 'Ashaiman' },
        { code: 'LEKMA', name: 'La' },
        { code: 'TESHIE', name: 'Teshie' },
        { code: 'NUNGUA', name: 'Nungua' },
        { code: 'DANFA', name: 'Danfa' },
        { code: 'MADINA', name: 'Madina' },
        { code: 'ABOKOBI', name: 'Abokobi' },
        { code: 'PRASTEO', name: 'Praso' }
      ]
    },
    { code: 'NORTH', name: 'North',
      cities: [
        { code: 'TAMALE', name: 'Tamale' },
        { code: 'SALAGA', name: 'Salaga' },
        { code: 'BIMBINLA', name: 'Bimbila' },
        { code: 'WALEWALE', name: 'Walewale' },
        { code: 'SABON', name: 'Saboba' },
        { code: 'KARAGA', name: 'Karaga' },
        { code: 'GUSHEGU', name: 'Gushegu' },
        { code: 'ZABZUGU', name: 'Zabzugu' },
        { code: 'CHEREPONI', name: 'Chereponi' },
        { code: 'MION', name: 'Mion' }
      ]
    },
    { code: 'NORTH', name: 'North East',
      cities: [
        { code: 'NALERIGU', name: 'Nalerigu' },
        { code: 'BUNKPURUGU', name: 'Bunkpurugu' },
        { code: 'WALEWALE', name: 'Walewale' },
        { code: 'YUNYOO', name: 'Yunyoo' },
        { code: 'CHEREPONI', name: 'Chereponi' },
        { code: 'GAMBAGA', name: 'Gambaga' },
        { code: 'NASUANI', name: 'Nasuan' },
        { code: 'JANGO', name: 'Jango' },
        { code: 'TATI', name: 'Tatiga' },
        { code: 'NALERIGU2', name: 'Nalerigu North' }
      ]
    },
    { code: 'OTI', name: 'Oti',
      cities: [
        { code: 'DAMBA', name: 'Damba' },
        { code: 'JASIKAN', name: 'Jasikan' },
        { code: 'KPASSA', name: 'Kpassa' },
        { code: 'NCHUMURU', name: 'Nchumuru' },
        { code: 'KRACHI', name: 'Krachi' },
        { code: 'GUOMAN', name: 'Guaman' },
        { code: 'BAFI', name: 'Bafi' },
        { code: 'NKOWDA', name: 'Nkawkaw' },
        { code: 'DAMBA2', name: 'Damba North' },
        { code: 'KRACHI2', name: 'Krachi East' }
      ]
    },
    { code: 'SAVANNAH', name: 'Savannah',
      cities: [
        { code: 'DAMONGO', name: 'Damongo' },
        { code: 'BUIPE', name: 'Buipe' },
        { code: 'SAWLA', name: 'Sawla' },
        { code: 'BOLE', name: 'Bole' },
        { code: 'WEST', name: 'West Gonja' },
        { code: 'CENTRAL', name: 'Central Gonja' },
        { code: 'EAST', name: 'East Gonja' },
        { code: 'NORTH', name: 'North Gonja' },
        { code: 'SOUTH', name: 'South Gonja' },
        { code: 'SAWLA2', name: 'Sawla-Tuna-Kalba' }
      ]
    },
    { code: 'UPPER', name: 'Upper East',
      cities: [
        { code: 'BOLGATANGA', name: 'Bolgatanga' },
        { code: 'NAVONGO', name: 'Navrongo' },
        { code: 'BONGO', name: 'Bongo' },
        { code: 'TONGO', name: 'Tongo' },
        { code: 'ZEBILLA', name: 'Zebilla' },
        { code: 'BASSE', name: 'Basse' },
        { code: 'PAGA', name: 'Paga' },
        { code: 'SANDEMA', name: 'Sandema' },
        { code: 'TEMPEL', name: 'Tempane' },
        { code: 'GARU', name: 'Garu' }
      ]
    },
    { code: 'UPPER', name: 'Upper West',
      cities: [
        { code: 'WA', name: 'Wa' },
        { code: 'TAMALE', name: 'Tamale' },
        { code: 'JIRAPA', name: 'Jirapa' },
        { code: 'LAMBUSIE', name: 'Lambussie' },
        { code: 'NANDOM', name: 'Nandom' },
        { code: 'TULE', name: 'Tule' },
        { code: 'FUNSI', name: 'Funsi' },
        { code: 'WECHIAU', name: 'Wechiau' },
        { code: 'ISSA', name: 'Issa' },
        { code: 'WA2', name: 'Wa East' }
      ]
    },
    { code: 'WESTERN', name: 'Western',
      cities: [
        { code: 'SEKONDI', name: 'Sekondi-Takoradi' },
        { code: 'TARKWA', name: 'Tarkwa' },
        { code: 'PRESTEA', name: 'Prestea' },
        { code: 'BIBIANI', name: 'Bibiani' },
        { code: 'AXIM', name: 'Axim' },
        { code: 'SHAMA', name: 'Shama' },
        { code: 'JOMORO', name: 'Jomoro' },
        { code: 'AHANTA', name: 'Ahanta West' },
        { code: 'WASSA', name: 'Wassa East' },
        { code: 'JOMORO2', name: 'Jomoro South' }
      ]
    },
    { code: 'WESTERN', name: 'Western North',
      cities: [
        { code: 'SEFWI', name: 'Sefwi Wiawso' },
        { code: 'BIBIANI', name: 'Bibiani' },
        { code: 'ENCHI', name: 'Enchi' },
        { code: 'BIA', name: 'Bia' },
        { code: 'SUAMAN', name: 'Suaman' },
        { code: 'AKONTOMBRA', name: 'Akontombra' },
        { code: 'BIA', name: 'Bia East' },
        { code: 'BIA2', name: 'Bia West' },
        { code: 'SUAMAN2', name: 'Suaman North' },
        { code: 'ENCHI2', name: 'Enchi North' }
      ]
    },
    { code: 'VOLTA', name: 'Volta',
      cities: [
        { code: 'HO', name: 'Ho' },
        { code: 'KETA', name: 'Keta' },
        { code: 'AKATSI', name: 'Akatsi' },
        { code: 'DENU', name: 'Denu' },
        { code: 'AVE', name: 'Ave' },
        { code: 'KPANDO', name: 'Kpando' },
        { code: 'JASIKAN', name: 'Jasikan' },
        { code: 'AFADZATO', name: 'Afadzato' },
        { code: 'NORTH', name: 'North Tongu' },
        { code: 'SOUTH', name: 'South Tongu' }
      ]
    }
  ]
},
  {
  code: 'MA',
  name: 'Morocco',
  taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'MAD', region: 'MEA' },
  provinces: [
    { code: 'CASABLANCA', name: 'Casablanca-Settat',
      cities: [
        { code: 'CASA', name: 'Casablanca' },
        { code: 'RABAT', name: 'Rabat' },
        { code: 'MARRAKECH', name: 'Marrakech' },
        { code: 'FEZ', name: 'Fez' },
        { code: 'TANGIER', name: 'Tangier' },
        { code: 'SALE', name: 'Salé' },
        { code: 'MEKNES', name: 'Meknes' },
        { code: 'OUJDA', name: 'Oujda' },
        { code: 'KENITRA', name: 'Kenitra' },
        { code: 'TETOUAN', name: 'Tetouan' }
      ]
    }
  ]
},
  {
  code: 'TN',
  name: 'Tunisia',
  taxInfo: { standardRate: 19, taxName: 'VAT', currency: 'TND', region: 'MEA' },
  provinces: [
    { code: 'TUNIS', name: 'Tunis',
      cities: [
        { code: 'TUNIS', name: 'Tunis' },
        { code: 'SFAX', name: 'Sfax' },
        { code: 'Sousse', name: 'Sousse' },
        { code: 'KAIROUAN', name: 'Kairouan' },
        { code: 'BIZERTE', name: 'Bizerte' },
        { code: 'GABES', name: 'Gabès' },
        { code: 'ARIANA', name: 'Ariana' },
        { code: 'BEN', name: 'Ben Arous' },
        { code: 'MONASTIR', name: 'Monastir' },
        { code: 'NABEUL', name: 'Nabeul' }
      ]
    }
  ]
},
  {
  code: 'DZ',
  name: 'Algeria',
  taxInfo: { standardRate: 19, taxName: 'VAT', currency: 'DZD', region: 'MEA' },
  provinces: [
    { code: 'ALGIERS', name: 'Algiers',
      cities: [
        { code: 'ALGIER', name: 'Algiers' },
        { code: 'ORAN', name: 'Oran' },
        { code: 'CONSTANTINE', name: 'Constantine' },
        { code: 'ANNABA', name: 'Annaba' },
        { code: 'BLIDA', name: 'Blida' },
        { code: 'BATNA', name: 'Batna' },
        { code: 'DJELFA', name: 'Djelfa' },
        { code: 'SETIF', name: 'Sétif' },
        { code: 'SIDI', name: 'Sidi Bel Abbès' },
        { code: 'SKIKDA', name: 'Skikda' }
      ]
    }
  ]
},
  {
  code: 'ET',
  name: 'Ethiopia',
  taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'ETB', region: 'MEA' },
  provinces: [
    { code: 'ADDIS', name: 'Addis Ababa',
      cities: [
        { code: 'ADDIS', name: 'Addis Ababa' },
        { code: 'DIRE', name: 'Dire Dawa' },
        { code: 'MEKELE', name: 'Mekelle' },
        { code: 'BAHIR', name: 'Bahir Dar' },
        { code: 'GONDAR', name: 'Gondar' },
        { code: 'JIMMA', name: 'Jimma' },
        { code: 'HAWASSA', name: 'Hawassa' },
        { code: 'ADAMA', name: 'Adama' },
        { code: 'SHASHAMENE', name: 'Shashamene' },
        { code: 'DEBRE', name: 'Debre Berhan' }
      ]
    }
  ]
},
  {
  code: 'TZ',
  name: 'Tanzania',
  taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'TZS', region: 'MEA' },
  provinces: [
    { code: 'DAR', name: 'Dar es Salaam',
      cities: [
        { code: 'DAR', name: 'Dar es Salaam' },
        { code: 'MWANZA', name: 'Mwanza' },
        { code: 'ARUSHA', name: 'Arusha' },
        { code: 'DODOMA', name: 'Dodoma' },
        { code: 'MBEYA', name: 'Mbeya' },
        { code: 'TANGA', name: 'Tanga' },
        { code: 'MOROGORO', name: 'Morogoro' },
        { code: 'IRINGA', name: 'Iringa' },
        { code: 'KIGOMA', name: 'Kigoma' },
        { code: 'TABORA', name: 'Tabora' }
      ]
    }
  ]
},
  {
  code: 'UG',
  name: 'Uganda',
  taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'UGX', region: 'MEA' },
  provinces: [
    { code: 'KAMPALA', name: 'Kampala',
      cities: [
        { code: 'KAMPALA', name: 'Kampala' },
        { code: 'JINJA', name: 'Jinja' },
        { code: 'GULU', name: 'Gulu' },
        { code: 'MBARARA', name: 'Mbarara' },
        { code: 'ENTEBBE', name: 'Entebbe' },
        { code: 'KABALE', name: 'Kabale' },
        { code: 'FORT', name: 'Fort Portal' },
        { code: 'MASAKA', name: 'Masaka' },
        { code: 'LIRA', name: 'Lira' },
        { code: 'ARUA', name: 'Arua' }
      ]
    }
  ]
},
  {
  code: 'ZM',
  name: 'Zambia',
  taxInfo: { standardRate: 16, taxName: 'VAT', currency: 'ZMW', region: 'MEA' },
  provinces: [
    { code: 'LUSAKA', name: 'Lusaka',
      cities: [
        { code: 'LUSAKA', name: 'Lusaka' },
        { code: 'KITWE', name: 'Kitwe' },
        { code: 'NDOLA', name: 'Ndola' },
        { code: 'KABWE', name: 'Kabwe' },
        { code: 'CHINGOLA', name: 'Chingola' },
        { code: 'MUFULIRA', name: 'Mufulira' },
        { code: 'LIVINGSTONE', name: 'Livingstone' },
        { code: 'LUANSHYA', name: 'Luanshya' },
        { code: 'KASAMA', name: 'Kasama' },
        { code: 'CHIPATA', name: 'Chipata' }
      ]
    }
  ]
},
  {
  code: 'MW',
  name: 'Malawi',
  taxInfo: { standardRate: 16.5, taxName: 'VAT', currency: 'MWK', region: 'MEA' },
  provinces: [
    { code: 'LILONGWE', name: 'Lilongwe',
      cities: [
        { code: 'LILONGWE', name: 'Lilongwe' },
        { code: 'BLANTYRE', name: 'Blantyre' },
        { code: 'MZUZU', name: 'Mzuzu' },
        { code: 'ZOMBA', name: 'Zomba' },
        { code: 'KARONGA', name: 'Karonga' },
        { code: 'MANGOCHI', name: 'Mangochi' },
        { code: 'SALIMA', name: 'Salima' },
        { code: 'NKHOTAKOTA', name: 'Nkhota Kota' },
        { code: 'LIWONDE', name: 'Liwonde' },
        { code: 'BALAKA', name: 'Balaka' }
      ]
    }
  ]
},
  {
  code: 'MZ',
  name: 'Mozambique',
  taxInfo: { standardRate: 17, taxName: 'VAT', currency: 'MZN', region: 'MEA' },
  provinces: [
    { code: 'MAPUTO', name: 'Maputo',
      cities: [
        { code: 'MAPUTO', name: 'Maputo' },
        { code: 'MATOLA', name: 'Matola' },
        { code: 'NAMPULA', name: 'Nampula' },
        { code: 'BEIRA', name: 'Beira' },
        { code: 'CHIMOIO', name: 'Chimoio' },
        { code: 'QUELIMANE', name: 'Quelimane' },
        { code: 'TETE', name: 'Tete' },
        { code: 'XAI', name: 'Xai-Xai' },
        { code: 'LICHINGA', name: 'Lichinga' },
        { code: 'PEMBA', name: 'Pemba' }
      ]
    }
  ]
},
  {
  code: 'NA',
  name: 'Namibia',
  taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'NAD', region: 'MEA' },
  provinces: [
    { code: 'WINDHOEK', name: 'Windhoek',
      cities: [
        { code: 'WINDHOEK', name: 'Windhoek' },
        { code: 'SWAKOPMUND', name: 'Swakopmund' },
        { code: 'WALVIS', name: 'Walvis Bay' },
        { code: 'OTJIWARONGO', name: 'Otjiwarongo' },
        { code: 'RUNDU', name: 'Rundu' },
        { code: 'WITVLEI', name: 'Witvlei' },
        { code: 'OKAHANDJA', name: 'Okahandja' },
        { code: 'KEETMANSHOOP', name: 'Keetmanshoop' },
        { code: 'MARIENTAL', name: 'Mariental' },
        { code: 'LUDERITZ', name: 'Lüderitz' }
      ]
    }
  ]
},
  {
  code: 'SZ',
  name: 'Eswatini',
  taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'SZL', region: 'MEA' },
  provinces: [
    { code: 'MBABANE', name: 'Hhohho',
      cities: [
        { code: 'MBABANE', name: 'Mbabane' },
        { code: 'MANZINI', name: 'Manzini' },
        { code: 'BIG', name: 'Big Bend' },
        { code: 'SITEKI', name: 'Siteki' },
        { code: 'NHLANGANO', name: 'Nhlangano' },
        { code: 'PIGGS', name: 'Piggs Peak' },
        { code: 'SIMUNYE', name: 'Simunye' },
        { code: 'MATSAPHA', name: 'Matsapha' },
        { code: 'MALKERNS', name: 'Malkerns' },
        { code: 'EZULWINI', name: 'Ezulwini' }
      ]
    }
  ]
},
  {
  code: 'LS',
  name: 'Lesotho',
  taxInfo: { standardRate: 14, taxName: 'VAT', currency: 'LSL', region: 'MEA' },
  provinces: [
    { code: 'MASERU', name: 'Maseru',
      cities: [
        { code: 'MASERU', name: 'Maseru' },
        { code: 'MAFETENG', name: 'Mafeteng' },
        { code: 'LERIBE', name: 'Leribe' },
        { code: 'MOHALE', name: 'Mohale\'s Hoek' },
        { code: 'QUTHING', name: 'Quthing' },
        { code: 'BUTHA', name: 'Butha-Buthe' },
        { code: 'MOKHOTLONG', name: 'Mokhotlong' },
        { code: 'THABA', name: 'Thaba-Tseka' },
        { code: 'QACHAS', name: 'Qacha\'s Nek' },
        { code: 'ROMA', name: 'Roma' }
      ]
    }
  ]
},
  {
  code: 'AO',
  name: 'Angola',
  taxInfo: { standardRate: 14, taxName: 'VAT', currency: 'AOA', region: 'MEA' },
  provinces: [
    { code: 'LUANDA', name: 'Luanda',
      cities: [
        { code: 'LUANDA', name: 'Luanda' },
        { code: 'HUAMBO', name: 'Huambo' },
        { code: 'LOBITO', name: 'Lobito' },
        { code: 'KUITO', name: 'Kuito' },
        { code: 'LUBANGO', name: 'Lubango' },
        { code: 'MALANJE', name: 'Malanje' },
        { code: 'NAMIBE', name: 'Namibe' },
        { code: 'SOYO', name: 'Soyo' },
        { code: 'CABINDA', name: 'Cabinda' },
        { code: 'SUMBE', name: 'Sumbe' }
      ]
    }
  ]
},
  {
  code: 'CM',
  name: 'Cameroon',
  taxInfo: { standardRate: 19.25, taxName: 'VAT', currency: 'XAF', region: 'MEA' },
  provinces: [
    { code: 'DOUALA', name: 'Littoral',
      cities: [
        { code: 'DOUALA', name: 'Douala' },
        { code: 'YAOUNDE', name: 'Yaoundé' },
        { code: 'BAFOUSSAM', name: 'Bafoussam' },
        { code: 'GAROUA', name: 'Garoua' },
        { code: 'MAROUA', name: 'Maroua' },
        { code: 'BAFANG', name: 'Bafang' },
        { code: 'KUMBA', name: 'Kumba' },
        { code: 'NGAOUNDERE', name: 'Ngaoundéré' },
        { code: 'BERTOUA', name: 'Bertoua' },
        { code: 'EDEA', name: 'Edéa' }
      ]
    }
  ]
},
  {
  code: 'CF',
  name: 'Central African Republic',
  taxInfo: { standardRate: 19, taxName: 'VAT', currency: 'XAF', region: 'MEA' },
  provinces: [
    { code: 'BANGUI', name: 'Bangui',
      cities: [
        { code: 'BANGUI', name: 'Bangui' },
        { code: 'BERBERATI', name: 'Berberati' },
        { code: 'BOSSANGOA', name: 'Bossangoa' },
        { code: 'BAMBERI', name: 'Bambari' },
        { code: 'BOUAR', name: 'Bouar' },
        { code: 'BAMBARI', name: 'Bambari' },
        { code: 'KAGA', name: 'Kaga-Bandoro' },
        { code: 'MONGOU', name: 'Mongoumba' },
        { code: 'SIBUT', name: 'Sibut' },
        { code: 'BANGASSOU', name: 'Bangassou' }
      ]
    }
  ]
},
  {
  code: 'TD',
  name: 'Chad',
  taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'XAF', region: 'MEA' },
  provinces: [
    { code: 'NDJAMENA', name: 'N\'Djamena',
      cities: [
        { code: 'NDJAMENA', name: 'N\'Djamena' },
        { code: 'MOUNDOU', name: 'Moundou' },
        { code: 'SARH', name: 'Sarh' },
        { code: 'ABECHE', name: 'Abéché' },
        { code: 'DOBA', name: 'Doba' },
        { code: 'KELLO', name: 'Kéllé' },
        { code: 'BILTINE', name: 'Biltine' },
        { code: 'FAYA', name: 'Faya-Largeau' },
        { code: 'BONGOR', name: 'Bongor' },
        { code: 'MASSAGUET', name: 'Massaguet' }
      ]
    }
  ]
},
  {
  code: 'CG',
  name: 'Congo - Brazzaville',
  taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'XAF', region: 'MEA' },
  provinces: [
    { code: 'BRAZZAVILLE', name: 'Brazzaville',
      cities: [
        { code: 'BRAZZAVILLE', name: 'Brazzaville' },
        { code: 'POINTE', name: 'Pointe-Noire' },
        { code: 'DOLISIE', name: 'Dolisie' },
        { code: 'NKAYI', name: 'Nkayi' },
        { code: 'MADINGOU', name: 'Madingou' },
        { code: 'OYO', name: 'Oyo' },
        { code: 'GAMBOMA', name: 'Gamboma' },
        { code: 'MOUNZA', name: 'Mounza' },
        { code: 'KINKALA', name: 'Kinkala' },
        { code: 'SIBITI', name: 'Sibiti' }
      ]
    }
  ]
},
  {
  code: 'CD',
  name: 'Congo - Kinshasa',
  taxInfo: { standardRate: 16, taxName: 'VAT', currency: 'CDF', region: 'MEA' },
  provinces: [
    { code: 'KINSHASA', name: 'Kinshasa',
      cities: [
        { code: 'KINSHASA', name: 'Kinshasa' },
        { code: 'LUBUMBASHI', name: 'Lubumbashi' },
        { code: 'KISANGANI', name: 'Kisangani' },
        { code: 'MBUJI', name: 'Mbuji-Mayi' },
        { code: 'KANANGA', name: 'Kananga' },
        { code: 'LIKASI', name: 'Likasi' },
        { code: 'TSHIKAPA', name: 'Tshikapa' },
        { code: 'KOLWEZI', name: 'Kol'}]
    }
  ]
},
  { code: 'GA', name: 'Gabon', taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'XAF', region: 'MEA' },
  provinces: [
    { code: 'LIBREVILLE', name: 'Libreville',
      cities: [
        { code: 'LIBREVILLE', name: 'Libreville' },
        { code: 'PORT', name: 'Port-Gentil' },
        { code: 'FRANCEVILLE', name: 'Franceville' },
        { code: 'OYEM', name: 'Oyem' },
        { code: 'MOANDA', name: 'Moanda' },
        { code: 'LAMBARÉNÉ', name: 'Lambaréné' },
        { code: 'TCHIBANGA', name: 'Tchibanga' },
        { code: 'KOULAMOUTOU', name: 'Koulamoutou' },
        { code: 'MAKOKOU', name: 'Makokou' },
        { code: 'BITAM', name: 'Bitam' }
      ]
    }
  ]
},
  { code: 'GQ', name: 'Equatorial Guinea', taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'XAF', region: 'MEA' },
  provinces: [
    { code: 'MALABO', name: 'Bioko',
      cities: [
        { code: 'MALABO', name: 'Malabo' },
        { code: 'BATA', name: 'Bata' },
        { code: 'EVINAYONG', name: 'Evinayong' },
        { code: 'MONGOMO', name: 'Mongomo' },
        { code: 'ANNOBON', name: 'San Antonio de Palé' },
        { code: 'LUBA', name: 'Luba' },
        { code: 'EIBEYIN', name: 'Eibeyín' },
        { code: 'ACUREN', name: 'Acureñ' },
        { code: 'MONGOMEYEN', name: 'Mongomeyén' },
        { code: 'NSOM', name: 'Nsom' }
      ]
    }
  ]
},
  { code: 'ST', name: 'São Tomé and Príncipe', taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'STN', region: 'MEA' },
  provinces: [
    { code: 'SAO', name: 'São Tomé',
      cities: [
        { code: 'SAO', name: 'São Tomé' },
        { code: 'PRINCIPE', name: 'São Tomé' },
        { code: 'TRINDADE', name: 'Trindade' },
        { code: 'NEVES', name: 'Neves' },
        { code: 'SANTANA', name: 'Santana' },
        { code: 'GUADALUPE', name: 'Guadalupe' },
        { code: 'CANTAGALO', name: 'Cantagalo' },
        { code: 'ME', name: 'Me-Zóchi' },
        { code: 'CAUE', name: 'Caué' },
        { code: 'LEME', name: 'Lembá' }
      ]
    }
  ]
},
  { code: 'CV', name: 'Cabo Verde', taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'CVE', region: 'MEA' },
  provinces: [
    { code: 'PRAIA', name: 'Santiago',
      cities: [
        { code: 'PRAIA', name: 'Praia' },
        { code: 'MINDELO', name: 'Mindelo' },
        { code: 'SANTAMARIA', name: 'Santa Maria' },
        { code: 'PEDRA', name: 'Pedra Badejo' },
        { code: 'ASSOMADA', name: 'Assomada' },
        { code: 'TARRAFAL', name: 'Tarrafal' },
        { code: 'CITY', name: 'Cidade Velha' },
        { code: 'CALHETA', name: 'Calheta' },
        { code: 'PORTO', name: 'Porto Novo' },
        { code: 'RIBEIRA', name: 'Ribeira Grande' }
      ]
    }
  ]
},
  { code: 'GW', name: 'Guinea-Bissau', taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'XOF', region: 'MEA' },
  provinces: [
    { code: 'BISSAU', name: 'Bissau',
      cities: [
        { code: 'BISSAU', name: 'Bissau' },
        { code: 'BULA', name: 'Bula' },
        { code: 'GABU', name: 'Gabú' },
        { code: 'BATA', name: 'Bafatá' },
        { code: 'CACHEU', name: 'Cacheu' },
        { code: 'BOMBA', name: 'Bombo' },
        { code: 'OIO', name: 'Oio' },
        { code: 'QUINARA', name: 'Quinara' },
        { code: 'TOMBOALI', name: 'Tombali' },
        { code: 'BIOMBO', name: 'Biombo' }
      ]
    }
  ]
},
  { code: 'GN', name: 'Guinea', taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'GNF', region: 'MEA' },
  provinces: [
    { code: 'CONAKRY', name: 'Conakry',
      cities: [
        { code: 'CONAKRY', name: 'Conakry' },
        { code: 'NZEREKORE', name: 'Nzérékoré' },
        { code: 'KANKAN', name: 'Kankan' },
        { code: 'KINDIA', name: 'Kindia' },
        { code: 'LABE', name: 'Labé' },
        { code: 'BOKE', name: 'Boké' },
        { code: 'MAMOU', name: 'Mamou' },
        { code: 'FARANAH', name: 'Faranah' },
        { code: 'SIGUIRI', name: 'Siguiri' },
        { code: 'DABOLA', name: 'Dabola' }
      ]
    }
  ]
},
  { code: 'SL', name: 'Sierra Leone', taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'SLL', region: 'MEA' },
  provinces: [
    { code: 'FREETOWN', name: 'Freetown',
      cities: [
        { code: 'FREETOWN', name: 'Freetown' },
        { code: 'KENEMA', name: 'Kenema' },
        { code: 'BO', name: 'Bo' },
        { code: 'MAKENI', name: 'Makeni' },
        { code: 'KOIDU', name: 'Koidu' },
        { code: 'PORT', name: 'Port Loko' },
        { code: 'PANGUMA', name: 'Panguma' },
        { code: 'KABALA', name: 'Kabala' },
        { code: 'MAGBURAKA', name: 'Magburaka' },
        { code: 'WATERLOO', name: 'Waterloo' }
      ]
    }
  ]
},
  { code: 'LR', name: 'Liberia', taxInfo: { standardRate: 7, taxName: 'VAT', currency: 'LRD', region: 'MEA' } },
  { code: 'CI', name: "Côte d'Ivoire", taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'XOF', region: 'MEA' } },
  { code: 'BF', name: 'Burkina Faso', taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'XOF', region: 'MEA' } },
  { code: 'ML', name: 'Mali', taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'XOF', region: 'MEA' } },
  { code: 'NE', name: 'Niger', taxInfo: { standardRate: 19, taxName: 'VAT', currency: 'XOF', region: 'MEA' } },
  { code: 'SN', name: 'Senegal', taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'XOF', region: 'MEA' } },
  { code: 'TG', name: 'Togo', taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'XOF', region: 'MEA' } },
  { code: 'BJ', name: 'Benin', taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'XOF', region: 'MEA' } },
  { code: 'MU', name: 'Mauritius', taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'MUR', region: 'MEA' } },
  { code: 'SC', name: 'Seychelles', taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'SCR', region: 'MEA' } },
  { code: 'KM', name: 'Comoros', taxInfo: { standardRate: 10, taxName: 'VAT', currency: 'KMF', region: 'MEA' } },
  { code: 'YT', name: 'Mayotte', taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'EUR', region: 'MEA' } },
  { code: 'RE', name: 'Réunion', taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'EUR', region: 'MEA' } },
  { code: 'MG', name: 'Madagascar', taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'MGA', region: 'MEA' } },
  { code: 'ER', name: 'Eritrea' },
  { code: 'DJ', name: 'Djibouti', taxInfo: { standardRate: 10, taxName: 'VAT', currency: 'DJF', region: 'MEA' } },
  { code: 'SO', name: 'Somalia' },
  { code: 'SD', name: 'Sudan', taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'SDG', region: 'MEA' } },
  { code: 'SS', name: 'South Sudan', taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'SSP', region: 'MEA' } },
  { code: 'LY', name: 'Libya', taxInfo: { standardRate: 10, taxName: 'VAT', currency: 'LYD', region: 'MEA' } },
  { code: 'EH', name: 'Western Sahara' },
  { code: 'MR', name: 'Mauritania', taxInfo: { standardRate: 16, taxName: 'VAT', currency: 'MRU', region: 'MEA' } },
  { code: 'GM', name: 'Gambia', taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'GMD', region: 'MEA' } },
  { code: 'RW', name: 'Rwanda', taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'RWF', region: 'MEA' } },
  { code: 'BI', name: 'Burundi', taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'BIF', region: 'MEA' } },
  { code: 'SO', name: 'Somalia' },

  // South America
  {
    code: 'BR',
    name: 'Brazil',
    provinces: [
      { code: 'AC', name: 'Acre' },
      { code: 'AL', name: 'Alagoas' },
      { code: 'AP', name: 'Amapá' },
      { code: 'AM', name: 'Amazonas' },
      { code: 'BA', name: 'Bahia' },
      { code: 'CE', name: 'Ceará' },
      { code: 'DF', name: 'Distrito Federal' },
      { code: 'ES', name: 'Espírito Santo' },
      { code: 'GO', name: 'Goiás' },
      { code: 'MA', name: 'Maranhão' },
      { code: 'MT', name: 'Mato Grosso' },
      { code: 'MS', name: 'Mato Grosso do Sul' },
      { code: 'MG', name: 'Minas Gerais' },
      { code: 'PA', name: 'Pará' },
      { code: 'PB', name: 'Paraíba' },
      { code: 'PR', name: 'Paraná' },
      { code: 'PE', name: 'Pernambuco' },
      { code: 'PI', name: 'Piauí' },
      { code: 'RJ', name: 'Rio de Janeiro' },
      { code: 'RN', name: 'Rio Grande do Norte' },
      { code: 'RS', name: 'Rio Grande do Sul' },
      { code: 'RO', name: 'Rondônia' },
      { code: 'RR', name: 'Roraima' },
      { code: 'SC', name: 'Santa Catarina' },
      { code: 'SP', name: 'São Paulo' },
      { code: 'SE', name: 'Sergipe' },
      { code: 'TO', name: 'Tocantins' }
    ]
  },
  {
    code: 'AR',
    name: 'Argentina',
    provinces: [
      { code: 'BA', name: 'Buenos Aires' },
      { code: 'CABA', name: 'Ciudad Autónoma de Buenos Aires' },
      { code: 'CT', name: 'Catamarca' },
      { code: 'CC', name: 'Chaco' },
      { code: 'CH', name: 'Chubut' },
      { code: 'CB', name: 'Córdoba' },
      { code: 'CR', name: 'Corrientes' },
      { code: 'ER', name: 'Entre Ríos' },
      { code: 'FO', name: 'Formosa' },
      { code: 'JY', name: 'Jujuy' },
      { code: 'LP', name: 'La Pampa' },
      { code: 'LR', name: 'La Rioja' },
      { code: 'MZ', name: 'Mendoza' },
      { code: 'MI', name: 'Misiones' },
      { code: 'NQ', name: 'Neuquén' },
      { code: 'RN', name: 'Río Negro' },
      { code: 'SA', name: 'Salta' },
      { code: 'SJ', name: 'San Juan' },
      { code: 'SL', name: 'San Luis' },
      { code: 'SC', name: 'Santa Cruz' },
      { code: 'SF', name: 'Santa Fe' },
      { code: 'SE', name: 'Santiago del Estero' },
      { code: 'TF', name: 'Tierra del Fuego' },
      { code: 'TU', name: 'Tucumán' }
    ]
  },
  { code: 'CL', name: 'Chile' },
  { code: 'PE', name: 'Peru' },
  { code: 'EC', name: 'Ecuador' },
  { code: 'CO', name: 'Colombia' },
  { code: 'VE', name: 'Venezuela' },
  { code: 'GY', name: 'Guyana' },
  { code: 'SR', name: 'Suriname' },
  { code: 'GF', name: 'French Guiana' },
  { code: 'UY', name: 'Uruguay' },
  { code: 'PY', name: 'Paraguay' },
  { code: 'BO', name: 'Bolivia' },
  { code: 'FK', name: 'Falkland Islands' },

  // Europe
  {
  code: 'GB',
  name: 'United Kingdom',
  taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'GBP', region: 'EU' },
  provinces: [
    { code: 'ENG', name: 'England',
      cities: [
        { code: 'LON', name: 'London' },
        { code: 'MAN', name: 'Manchester' },
        { code: 'BIR', name: 'Birmingham' },
        { code: 'LEE', name: 'Leeds' },
        { code: 'LIV', name: 'Liverpool' },
        { code: 'SHE', name: 'Sheffield' },
        { code: 'BRI', name: 'Bristol' },
        { code: 'NEW', name: 'Newcastle upon Tyne' },
        { code: 'NOT', name: 'Nottingham' },
        { code: 'LEI', name: 'Leicester' }
      ]
    },
    { code: 'SCT', name: 'Scotland',
      cities: [
        { code: 'EDI', name: 'Edinburgh' },
        { code: 'GLA', name: 'Glasgow' },
        { code: 'ABE', name: 'Aberdeen' },
        { code: 'DUN', name: 'Dundee' },
        { code: 'INV', name: 'Inverness' },
        { code: 'PER', name: 'Perth' },
        { code: 'STI', name: 'Stirling' },
        { code: 'DUM', name: 'Dumfries' },
        { code: 'AYR', name: 'Ayr' },
        { code: 'DUN2', name: 'Dundee' }
      ]
    },
    { code: 'WLS', name: 'Wales',
      cities: [
        { code: 'CAR', name: 'Cardiff' },
        { code: 'SWA', name: 'Swansea' },
        { code: 'NEW', name: 'Newport' },
        { code: 'BAN', name: 'Bangor' },
        { code: 'WRE', name: 'Wrexham' },
        { code: 'BRI', name: 'Bridgend' },
        { code: 'LLA', name: 'Llandudno' },
        { code: 'MER', name: 'Merthyr Tydfil' },
        { code: 'BARRY', name: 'Barry' },
        { code: 'NEATH', name: 'Neath' }
      ]
    },
    { code: 'NIR', name: 'Northern Ireland',
      cities: [
        { code: 'BEL', name: 'Belfast' },
        { code: 'DER', name: 'Derry' },
        { code: 'LIS', name: 'Lisburn' },
        { code: 'NEW', name: 'Newtownabbey' },
        { code: 'BAN', name: 'Bangor' },
        { code: 'CRA', name: 'Craigavon' },
        { code: 'ARM', name: 'Armagh' },
        { code: 'COL', name: 'Coleraine' },
        { code: 'LAR', name: 'Larne' },
        { code: 'NEW2', name: 'Newry' }
      ]
    }
  ]
},
  { code: 'IE', name: 'Ireland', taxInfo: { standardRate: 23, taxName: 'VAT', currency: 'EUR', region: 'EU' } },
  { code: 'FR', name: 'France', taxInfo: { standardRate: 20, taxName: 'TVA', currency: 'EUR', region: 'EU' } },
  { code: 'DE', name: 'Germany', taxInfo: { standardRate: 19, taxName: 'MwSt', currency: 'EUR', region: 'EU' } },
  { code: 'IT', name: 'Italy', taxInfo: { standardRate: 22, taxName: 'IVA', currency: 'EUR', region: 'EU' } },
  { code: 'ES', name: 'Spain', taxInfo: { standardRate: 21, taxName: 'IVA', currency: 'EUR', region: 'EU' } },
  { code: 'NL', name: 'Netherlands', taxInfo: { standardRate: 21, taxName: 'BTW', currency: 'EUR', region: 'EU' } },
  { code: 'BE', name: 'Belgium', taxInfo: { standardRate: 21, taxName: 'BTW', currency: 'EUR', region: 'EU' } },
  { code: 'AT', name: 'Austria', taxInfo: { standardRate: 20, taxName: 'MwSt', currency: 'EUR', region: 'EU' } },
  { code: 'PT', name: 'Portugal', taxInfo: { standardRate: 23, taxName: 'IVA', currency: 'EUR', region: 'EU' } },
  { code: 'SE', name: 'Sweden', taxInfo: { standardRate: 25, taxName: 'Moms', currency: 'SEK', region: 'EU' } },
  { code: 'DK', name: 'Denmark', taxInfo: { standardRate: 25, taxName: 'Moms', currency: 'DKK', region: 'EU' } },
  { code: 'NO', name: 'Norway', taxInfo: { standardRate: 25, taxName: 'MVA', currency: 'NOK', region: 'EU' } },
  { code: 'FI', name: 'Finland', taxInfo: { standardRate: 25.5, taxName: 'ALV', currency: 'EUR', region: 'EU' } },
  { code: 'CH', name: 'Switzerland', taxInfo: { standardRate: 7.7, taxName: 'MWST', currency: 'CHF', region: 'EU' } },
  { code: 'IE', name: 'Ireland', taxInfo: { standardRate: 23, taxName: 'VAT', currency: 'EUR', region: 'EU' } },
  { code: 'IS', name: 'Iceland', taxInfo: { standardRate: 24, taxName: 'VAT', currency: 'ISK', region: 'EU' } },
  { code: 'NO', name: 'Norway', taxInfo: { standardRate: 25, taxName: 'MVA', currency: 'NOK', region: 'EU' } },
  { code: 'SE', name: 'Sweden', taxInfo: { standardRate: 25, taxName: 'Moms', currency: 'SEK', region: 'EU' } },
  { code: 'FI', name: 'Finland', taxInfo: { standardRate: 25.5, taxName: 'ALV', currency: 'EUR', region: 'EU' } },
  { code: 'DK', name: 'Denmark', taxInfo: { standardRate: 25, taxName: 'Moms', currency: 'DKK', region: 'EU' } },
  { code: 'EE', name: 'Estonia', taxInfo: { standardRate: 22, taxName: 'VAT', currency: 'EUR', region: 'EU' } },
  { code: 'LV', name: 'Latvia', taxInfo: { standardRate: 21, taxName: 'VAT', currency: 'EUR', region: 'EU' } },
  { code: 'LT', name: 'Lithuania', taxInfo: { standardRate: 21, taxName: 'VAT', currency: 'EUR', region: 'EU' } },
  { code: 'PL', name: 'Poland', taxInfo: { standardRate: 23, taxName: 'VAT', currency: 'PLN', region: 'EU' } },
  { code: 'CZ', name: 'Czechia', taxInfo: { standardRate: 21, taxName: 'VAT', currency: 'CZK', region: 'EU' } },
  { code: 'SK', name: 'Slovakia', taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'EUR', region: 'EU' } },
  { code: 'HU', name: 'Hungary', taxInfo: { standardRate: 27, taxName: 'VAT', currency: 'HUF', region: 'EU' } },
  { code: 'SI', name: 'Slovenia', taxInfo: { standardRate: 22, taxName: 'VAT', currency: 'EUR', region: 'EU' } },
  { code: 'HR', name: 'Croatia', taxInfo: { standardRate: 25, taxName: 'VAT', currency: 'EUR', region: 'EU' } },
  { code: 'BA', name: 'Bosnia and Herzegovina', taxInfo: { standardRate: 17, taxName: 'VAT', currency: 'BAM', region: 'EU' } },
  { code: 'RS', name: 'Serbia', taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'RSD', region: 'EU' } },
  { code: 'ME', name: 'Montenegro', taxInfo: { standardRate: 21, taxName: 'VAT', currency: 'EUR', region: 'EU' } },
  { code: 'MK', name: 'North Macedonia', taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'MKD', region: 'EU' } },
  { code: 'AL', name: 'Albania', taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'ALL', region: 'EU' } },
  { code: 'GR', name: 'Greece', taxInfo: { standardRate: 24, taxName: 'VAT', currency: 'EUR', region: 'EU' } },
  { code: 'MT', name: 'Malta', taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'EUR', region: 'EU' } },
  { code: 'CY', name: 'Cyprus', taxInfo: { standardRate: 19, taxName: 'VAT', currency: 'EUR', region: 'EU' } },
  { code: 'BG', name: 'Bulgaria', taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'BGN', region: 'EU' } },
  { code: 'RO', name: 'Romania', taxInfo: { standardRate: 19, taxName: 'VAT', currency: 'RON', region: 'EU' } },
  { code: 'MD', name: 'Moldova', taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'MDL', region: 'EU' } },
  { code: 'UA', name: 'Ukraine', taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'UAH', region: 'EU' } },
  { code: 'BY', name: 'Belarus', taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'BYN', region: 'EU' } },
  { code: 'RU', name: 'Russia', taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'RUB', region: 'EU' } },
  { code: 'SM', name: 'San Marino', taxInfo: { standardRate: 17, taxName: 'VAT', currency: 'EUR', region: 'EU' } },
  { code: 'VA', name: 'Vatican City', taxInfo: { standardRate: 22, taxName: 'VAT', currency: 'EUR', region: 'EU' } },
  { code: 'AD', name: 'Andorra', taxInfo: { standardRate: 4.5, taxName: 'VAT', currency: 'EUR', region: 'EU' } },
  { code: 'MC', name: 'Monaco', taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'EUR', region: 'EU' } },
  { code: 'LI', name: 'Liechtenstein', taxInfo: { standardRate: 7.7, taxName: 'VAT', currency: 'CHF', region: 'EU' } },
  { code: 'LU', name: 'Luxembourg', taxInfo: { standardRate: 17, taxName: 'VAT', currency: 'EUR', region: 'EU' } },

  // Latin America - Comprehensive list
  { code: 'AR', name: 'Argentina', taxInfo: { standardRate: 21, taxName: 'IVA', currency: 'ARS', region: 'LATAM' } },
  { code: 'BO', name: 'Bolivia', taxInfo: { standardRate: 13, taxName: 'IVA', currency: 'BOB', region: 'LATAM' } },
  { code: 'CL', name: 'Chile', taxInfo: { standardRate: 19, taxName: 'IVA', currency: 'CLP', region: 'LATAM' } },
  { code: 'CO', name: 'Colombia', taxInfo: { standardRate: 19, taxName: 'IVA', currency: 'COP', region: 'LATAM' } },
  { code: 'EC', name: 'Ecuador', taxInfo: { standardRate: 12, taxName: 'IVA', currency: 'USD', region: 'LATAM' } },
  { code: 'PY', name: 'Paraguay', taxInfo: { standardRate: 10, taxName: 'IVA', currency: 'PYG', region: 'LATAM' } },
  { code: 'PE', name: 'Peru', taxInfo: { standardRate: 18, taxName: 'IVA', currency: 'PEN', region: 'LATAM' } },
  { code: 'UY', name: 'Uruguay', taxInfo: { standardRate: 22, taxName: 'IVA', currency: 'UYU', region: 'LATAM' } },
  { code: 'VE', name: 'Venezuela' },
  { code: 'GY', name: 'Guyana', taxInfo: { standardRate: 14, taxName: 'VAT', currency: 'GYD', region: 'LATAM' } },
  { code: 'SR', name: 'Suriname', taxInfo: { standardRate: 10, taxName: 'VAT', currency: 'SRD', region: 'LATAM' } },
  { code: 'GF', name: 'French Guiana', taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'EUR', region: 'LATAM' } },

  // Caribbean - Comprehensive list
  { code: 'JM', name: 'Jamaica', taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'JMD', region: 'LATAM' } },
  { code: 'HT', name: 'Haiti' },
  { code: 'DO', name: 'Dominican Republic', taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'DOP', region: 'LATAM' } },
  { code: 'TT', name: 'Trinidad and Tobago', taxInfo: { standardRate: 12.5, taxName: 'VAT', currency: 'TTD', region: 'LATAM' } },
  { code: 'BB', name: 'Barbados', taxInfo: { standardRate: 17.5, taxName: 'VAT', currency: 'BBD', region: 'LATAM' } },
  { code: 'BS', name: 'Bahamas', taxInfo: { standardRate: 12, taxName: 'VAT', currency: 'BSD', region: 'LATAM' } },
  { code: 'DM', name: 'Dominica', taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'XCD', region: 'LATAM' } },
  { code: 'GD', name: 'Grenada', taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'XCD', region: 'LATAM' } },
  { code: 'KN', name: 'Saint Kitts and Nevis', taxInfo: { standardRate: 17, taxName: 'VAT', currency: 'XCD', region: 'LATAM' } },
  { code: 'LC', name: 'Saint Lucia', taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'XCD', region: 'LATAM' } },
  { code: 'VC', name: 'Saint Vincent and the Grenadines', taxInfo: { standardRate: 16, taxName: 'VAT', currency: 'XCD', region: 'LATAM' } },
  { code: 'AG', name: 'Antigua and Barbuda', taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'XCD', region: 'LATAM' } },
  { code: 'CU', name: 'Cuba' },
  { code: 'GP', name: 'Guadeloupe', taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'EUR', region: 'LATAM' } },
  { code: 'MQ', name: 'Martinique', taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'EUR', region: 'LATAM' } },
  { code: 'BL', name: 'Saint Barthélemy', taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'EUR', region: 'LATAM' } },
  { code: 'MF', name: 'Saint Martin', taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'EUR', region: 'LATAM' } },
  { code: 'PM', name: 'Saint Pierre and Miquelon', taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'EUR', region: 'NA' } },
  { code: 'AW', name: 'Aruba', taxInfo: { standardRate: 6, taxName: 'VAT', currency: 'AWG', region: 'LATAM' } },
  { code: 'CW', name: 'Curaçao', taxInfo: { standardRate: 6, taxName: 'VAT', currency: 'CWG', region: 'LATAM' } },
  { code: 'SX', name: 'Sint Maarten', taxInfo: { standardRate: 6, taxName: 'VAT', currency: 'ANG', region: 'LATAM' } },
  { code: 'BQ', name: 'Caribbean Netherlands', taxInfo: { standardRate: 6, taxName: 'VAT', currency: 'USD', region: 'LATAM' } },
  { code: 'VI', name: 'U.S. Virgin Islands' },
  { code: 'PR', name: 'Puerto Rico', taxInfo: { standardRate: 11.5, taxName: 'VAT', currency: 'USD', region: 'LATAM' } },
  { code: 'HU', name: 'Hungary' },

  // Africa
  { code: 'MA', name: 'Morocco' },
  { code: 'DZ', name: 'Algeria' },
  { code: 'TN', name: 'Tunisia' },
  { code: 'LY', name: 'Libya' },
  { code: 'EG', name: 'Egypt' },
  { code: 'SD', name: 'Sudan' },
  { code: 'SS', name: 'South Sudan' },
  { code: 'ET', name: 'Ethiopia' },
  { code: 'ER', name: 'Eritrea' },
  { code: 'DJ', name: 'Djibouti' },
  { code: 'SO', name: 'Somalia' },
  { code: 'KE', name: 'Kenya' },
  { code: 'UG', name: 'Uganda' },
  { code: 'TZ', name: 'Tanzania' },
  { code: 'RW', name: 'Rwanda' },
  { code: 'BI', name: 'Burundi' },
  { code: 'MZ', name: 'Mozambique' },
  { code: 'MW', name: 'Malawi' },
  { code: 'ZM', name: 'Zambia' },
  { code: 'ZW', name: 'Zimbabwe' },
  { code: 'BW', name: 'Botswana' },
  { code: 'NA', name: 'Namibia' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'LS', name: 'Lesotho' },
  { code: 'SZ', name: 'Eswatini' },
  { code: 'MG', name: 'Madagascar' },
  { code: 'MU', name: 'Mauritius' },
  { code: 'SC', name: 'Seychelles' },
  { code: 'KM', name: 'Comoros' },
  { code: 'AO', name: 'Angola' },
  { code: 'CD', name: 'Democratic Republic of the Congo' },
  { code: 'CG', name: 'Republic of the Congo' },
  { code: 'CF', name: 'Central African Republic' },
  { code: 'CM', name: 'Cameroon' },
  { code: 'GQ', name: 'Equatorial Guinea' },
  { code: 'GA', name: 'Gabon' },
  { code: 'ST', name: 'São Tomé and Príncipe' },
  { code: 'TD', name: 'Chad' },
  { code: 'NE', name: 'Niger' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'BJ', name: 'Benin' },
  { code: 'TG', name: 'Togo' },
  { code: 'GH', name: 'Ghana' },
  { code: 'BF', name: 'Burkina Faso' },
  { code: 'CI', name: 'Côte d\'Ivoire' },
  { code: 'LR', name: 'Liberia' },
  { code: 'SL', name: 'Sierra Leone' },
  { code: 'GN', name: 'Guinea' },
  { code: 'GW', name: 'Guinea-Bissau' },
  { code: 'SN', name: 'Senegal' },
  { code: 'GM', name: 'Gambia' },
  { code: 'ML', name: 'Mali' },
  { code: 'MR', name: 'Mauritania' },
  { code: 'CV', name: 'Cape Verde' },

  // Middle East
  { code: 'IL', name: 'Israel', taxInfo: { standardRate: 17, taxName: 'VAT', currency: 'ILS', region: 'MEA' } },
  { code: 'PS', name: 'Palestine', taxInfo: { standardRate: 16, taxName: 'VAT', currency: 'ILS', region: 'MEA' } },
  { code: 'LB', name: 'Lebanon', taxInfo: { standardRate: 11, taxName: 'VAT', currency: 'LBP', region: 'MEA' } },
  { code: 'SY', name: 'Syria' },
  { code: 'JO', name: 'Jordan', taxInfo: { standardRate: 16, taxName: 'VAT', currency: 'JOD', region: 'MEA' } },
  { code: 'IQ', name: 'Iraq', taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'IQD', region: 'MEA' } },
  { code: 'KW', name: 'Kuwait' },
  { code: 'SA', name: 'Saudi Arabia', taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'SAR', region: 'MEA' } },
  { code: 'BH', name: 'Bahrain', taxInfo: { standardRate: 10, taxName: 'VAT', currency: 'BHD', region: 'MEA' } },
  { code: 'QA', name: 'Qatar', taxInfo: { standardRate: 5, taxName: 'VAT', currency: 'QAR', region: 'MEA' } },
  { code: 'AE', name: 'United Arab Emirates', taxInfo: { standardRate: 5, taxName: 'VAT', currency: 'AED', region: 'MEA' } },
  { code: 'OM', name: 'Oman', taxInfo: { standardRate: 5, taxName: 'VAT', currency: 'OMR', region: 'MEA' } },
  { code: 'YE', name: 'Yemen' },
  { code: 'IR', name: 'Iran', taxInfo: { standardRate: 9, taxName: 'VAT', currency: 'IRR', region: 'MEA' } },
  { code: 'TR', name: 'Turkey', taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'TRY', region: 'MEA' } },
  { code: 'CY', name: 'Cyprus', taxInfo: { standardRate: 19, taxName: 'VAT', currency: 'EUR', region: 'EU' } },
  { code: 'AZ', name: 'Azerbaijan', taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'AZN', region: 'MEA' } },
  { code: 'AM', name: 'Armenia', taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'AMD', region: 'MEA' } },
  { code: 'GE', name: 'Georgia', taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'GEL', region: 'MEA' } },

  // Asia
  {
  code: 'AF',
  name: 'Afghanistan',
  taxInfo: { standardRate: 0, taxName: 'No VAT/GST', currency: 'AFN', region: 'APAC' },
  provinces: [
    { code: 'KAB', name: 'Kabul',
      cities: [
        { code: 'KABUL', name: 'Kabul' },
        { code: 'CHARASIAB', name: 'Charasiab' },
        { code: 'PAGHMAN', name: 'Paghman' },
        { code: 'BAGRAMI', name: 'Bagrami' },
        { code: 'SROB', name: 'Surobi' },
        { code: 'MUSA', name: 'Musa Khel' },
        { code: 'DEH', name: 'Deh Sabz' },
        { code: 'ISTALIF', name: 'Istalif' },
        { code: 'SHAKAR', name: 'Shakar Dara' },
        { code: 'GULDARA', name: 'Guldara' }
      ]
    },
    { code: 'HER', name: 'Herat',
      cities: [
        { code: 'HERAT', name: 'Herat' },
        { code: 'ENJIL', name: 'Enjil' },
        { code: 'GHORIAN', name: 'Ghoryan' },
        { code: 'GULRAN', name: 'Gulran' },
        { code: 'KARUKH', name: 'Karukh' },
        { code: 'KUSHK', name: 'Kushk' },
        { code: 'KUSHKAK', name: 'Kushkak' },
        { code: 'SHINDAND', name: 'Shindand' },
        { code: 'ADRESKAN', name: 'Adraskan' },
        { code: 'CHIST', name: 'Chishti Sharif' }
      ]
    },
    { code: 'KAN', name: 'Kandahar',
      cities: [
        { code: 'KANDAHAR', name: 'Kandahar' },
        { code: 'ARGHANDAB', name: 'Arghandab' },
        { code: 'ARGHISTAN', name: 'Arghistan' },
        { code: 'DAMAN', name: 'Daman' },
        { code: 'GRISHK', name: 'Grishk' },
        { code: 'KANDAHAR2', name: 'Kandahar City' },
        { code: 'KHAKREZ', name: 'Khakrez' },
        { code: 'MARUF', name: 'Maruf' },
        { code: 'MAYWAND', name: 'Maywand' },
        { code: 'NESH', name: 'Nesh' }
      ]
    },
    { code: 'NAN', name: 'Nangarhar',
      cities: [
        { code: 'JALALABAD', name: 'Jalalabad' },
        { code: 'ACHIN', name: 'Achin' },
        { code: 'BATIKOT', name: 'Batikot' },
        { code: 'BHSUD', name: 'Bhsud' },
        { code: 'DEH', name: 'Deh Bala' },
        { code: 'DUR', name: 'Dur Baba' },
        { code: 'GOSHTA', name: 'Goshta' },
        { code: 'KAMA', name: 'Kama' },
        { code: 'KUZ', name: 'Kuz Kunar' },
        { code: 'LALPURA', name: 'Lalpura' }
      ]
    },
    { code: 'BAG', name: 'Baghlan',
      cities: [
        { code: 'PULI', name: 'Puli Khumri' },
        { code: 'BAGHLAN', name: 'Baghlan' },
        { code: 'BURKA', name: 'Burka' },
        { code: 'DAND', name: 'Dand-e Ghori' },
        { code: 'DAN', name: 'Dana' },
        { code: 'DIH', name: 'Dih Salah' },
        { code: 'FARANG', name: 'Farang wa Gharu' },
        { code: 'GOST', name: 'Gost' },
        { code: 'KHANJAN', name: 'Khanjan' },
        { code: 'KHINJAN', name: 'Khinjan' }
      ]
    },
    { code: 'BAL', name: 'Balkh',
      cities: [
        { code: 'MAZAR', name: 'Mazar-i-Sharif' },
        { code: 'BALKH', name: 'Balkh' },
        { code: 'CHAHAR', name: 'Chahar Bolak' },
        { code: 'CHARKENT', name: 'Charkent' },
        { code: 'DADAY', name: 'Daday' },
        { code: 'KALDAR', name: 'Kaldar' },
        { code: 'KISHM', name: 'Kishm' },
        { code: 'KOHDAN', name: 'Kohdan' },
        { code: 'MAI', name: 'Maimana' },
        { code: 'NAMAK', name: 'Namak Ab' }
      ]
    },
    { code: 'BAM', name: 'Bamyan',
      cities: [
        { code: 'BAMYAN', name: 'Bamyan' },
        { code: 'BAMYAN2', name: 'Bamyan City' },
        { code: 'KABUL2', name: 'Kabul' },
        { code: 'KAHMARD', name: 'Kahmard' },
        { code: 'PANJAB', name: 'Panjab' },
        { code: 'SAIGHAN', name: 'Saighan' },
        { code: 'SHIBAR', name: 'Shibar' },
        { code: 'WARAS', name: 'Waras' },
        { code: 'YAKAWLANG', name: 'Yakawlang' },
        { code: 'BAND', name: 'Band-e Amir' }
      ]
    },
    { code: 'DAI', name: 'Daykundi',
      cities: [
        { code: 'NILI', name: 'Nili' },
        { code: 'ASHTAR', name: 'Ashtarlay' },
        { code: 'JABR', name: 'Jabr' },
        { code: 'KHA', name: 'Khadir' },
        { code: 'KEJ', name: 'Kejran' },
        { code: 'KITI', name: 'Kitti' },
        { code: 'MIRAMOR', name: 'Miramor' },
        { code: 'SANG', name: 'Sangtakht' },
        { code: 'SHAH', name: 'Shahristan' },
        { code: 'UNGOOR', name: 'Ungo' }
      ]
    },
    { code: 'FAR', name: 'Farah',
      cities: [
        { code: 'FARAH', name: 'Farah' },
        { code: 'ANAR', name: 'Anar Darah' },
        { code: 'BALA', name: 'Bala Buluk' },
        { code: 'BOK', name: 'Bokh' },
        { code: 'GULISTAN', name: 'Gulistan' },
        { code: 'KHAK', name: 'Khak Safed' },
        { code: 'PUR', name: 'Pur Chaman' },
        { code: 'PUSHT', name: 'Pusht Rod' },
        { code: 'QALA', name: 'Qala Kah' },
        { code: 'SHIB', name: 'Shib Koh' }
      ]
    },
    { code: 'FARY', name: 'Faryab',
      cities: [
        { code: 'MAIMANA', name: 'Maimana' },
        { code: 'ALMAR', name: 'Almar' },
        { code: 'ANDKH', name: 'Andkhoy' },
        { code: 'DARZAB', name: 'Darzab' },
        { code: 'GURZIWAN', name: 'Gurziwan' },
        { code: 'KHWAJA', name: 'Khwaja Sabz Posh' },
        { code: 'KOHISTAN', name: 'Kohistan' },
        { code: 'MAYMANA', name: 'Maymana' },
        { code: 'QARAM', name: 'Qaramqol' },
        { code: 'QAYSAR', name: 'Qaysar' }
      ]
    },
    { code: 'GHA', name: 'Ghazni',
      cities: [
        { code: 'GHAZNI', name: 'Ghazni' },
        { code: 'AB', name: 'Ab Band' },
        { code: 'AJRISTAN', name: 'Ajeristan' },
        { code: 'ANDAR', name: 'Andar' },
        { code: 'DEH', name: 'Deh Yak' },
        { code: 'GELAN', name: 'Gelan' },
        { code: 'GHO', name: 'Ghakhi' },
        { code: 'JAGHATU', name: 'Jaghatu' },
        { code: 'JAGHORI', name: 'Jaghori' },
        { code: 'KHOGYANI', name: 'Khogyani' }
      ]
    },
    { code: 'GHO', name: 'Ghor',
      cities: [
        { code: 'CHAGHCHARAN', name: 'Chaghcharan' },
        { code: 'CHAGHCHARAN2', name: 'Chaghcharan City' },
        { code: 'DOLINA', name: 'Dolina' },
        { code: 'DU', name: 'Du Layna' },
        { code: 'LAL', name: 'Lal Wa Sarjangal' },
        { code: 'PASSA', name: 'Passa' },
        { code: 'SAGHAR', name: 'Saghar' },
        { code: 'SHARAK', name: 'Sharak' },
        { code: 'TAKHAR', name: 'Takhar' },
        { code: 'TULAK', name: 'Tulak' }
      ]
    },
    { code: 'HEL', name: 'Helmand',
      cities: [
        { code: 'LASHKAR', name: 'Lashkar Gah' },
        { code: 'BAGHRAN', name: 'Baghran' },
        { code: 'DISHU', name: 'Dishu' },
        { code: 'GARM', name: 'Garmsir' },
        { code: 'GRISHK', name: 'Grishk' },
        { code: 'KHAH', name: 'Kahak' },
        { code: 'MUSA', name: 'Musa Qala' },
        { code: 'NAD', name: 'Nad Ali' },
        { code: 'NAVA', name: 'Nawa' },
        { code: 'SANGIN', name: 'Sangin' }
      ]
    },
    { code: 'HIL', name: 'Hilmand',
      cities: [
        { code: 'LASHKAR', name: 'Lashkar Gah' },
        { code: 'NAWA', name: 'Nawa' },
        { code: 'SANGIN', name: 'Sangin' },
        { code: 'MUSA', name: 'Musa Qala' },
        { code: 'GARM', name: 'Garmsir' },
        { code: 'GRISHK', name: 'Grishk' },
        { code: 'BAGHRAN', name: 'Baghran' },
        { code: 'DISHU', name: 'Dishu' },
        { code: 'KHAH', name: 'Kahak' },
        { code: 'NAD', name: 'Nad Ali' }
      ]
    },
    { code: 'JOW', name: 'Jowzjan',
      cities: [
        { code: 'SHEBERGHAN', name: 'Sheberghan' },
        { code: 'AQCHA', name: 'Aqcha' },
        { code: 'DARZAB', name: 'Darzab' },
        { code: 'FAIZ', name: 'Faizabad' },
        { code: 'KHAN', name: 'Khan Abad' },
        { code: 'KHWAJA', name: 'Khwaja Du Koh' },
        { code: 'MARDYAN', name: 'Mardyan' },
        { code: 'QUSH', name: 'Qush Tepa' },
        { code: 'SHEBERGHAN2', name: 'Sheberghan City' },
        { code: 'MANGAN', name: 'Mangan' }
      ]
    },
    { code: 'KAP', name: 'Kapisa',
      cities: [
        { code: 'MAHMUD', name: 'Mahmud-i-Raqi' },
        { code: 'ALASAI', name: 'Alasai' },
        { code: 'HESA', name: 'Hesa Awal Kohistan' },
        { code: 'KOH', name: 'Koh Band' },
        { code: 'MAHMUD', name: 'Mahmud Raqi' },
        { code: 'NIDJAB', name: 'Nijrab' },
        { code: 'TAGAB', name: 'Tagab' },
        { code: 'KOHISTAN', name: 'Kohistan' },
        { code: 'KOH', name: 'Koh' },
        { code: 'ALASAI2', name: 'Alasai' }
      ]
    },
    { code: 'KHO', name: 'Khost',
      cities: [
        { code: 'KHOST', name: 'Khost' },
        { code: 'BAK', name: 'Bak' },
        { code: 'GUR', name: 'Gurbuz' },
        { code: 'JERI', name: 'Jaji Maidan' },
        { code: 'KHOST2', name: 'Khost City' },
        { code: 'MUSA', name: 'Musa Khel' },
        { code: 'NADIR', name: 'Nadir Shah Kot' },
        { code: 'QALANDER', name: 'Qalandar' },
        { code: 'SABARI', name: 'Sabari' },
        { code: 'SPERA', name: 'Spera' }
      ]
    },
    { code: 'KUN', name: 'Kunar',
      cities: [
        { code: 'ASADABAD', name: 'Asadabad' },
        { code: 'BAR', name: 'Bar Kunar' },
        { code: 'CHAPA', name: 'Chapa Dara' },
        { code: 'DAR', name: 'Dara-i-Pech' },
        { code: 'GHAS', name: 'Ghasa' },
        { code: 'KAMA', name: 'Kama' },
        { code: 'KUNAR', name: 'Kunar' },
        { code: 'MARAWARA', name: 'Marawara' },
        { code: 'NARAI', name: 'Narai' },
        { code: 'NARANG', name: 'Narang' }
      ]
    },
    { code: 'KUN2', name: 'Kunduz',
      cities: [
        { code: 'KUNDUZ', name: 'Kunduz' },
        { code: 'ALI', name: 'Ali Abad' },
        { code: 'CHAHAR', name: 'Chahar Darreh' },
        { code: 'DASHT', name: 'Dashti Archi' },
        { code: 'EMAM', name: 'Emam Sahib' },
        { code: 'KHAN', name: 'Khan Abad' },
        { code: 'KUNDUZ2', name: 'Kunduz City' },
        { code: 'QALA', name: 'Qala-i-Zal' },
        { code: 'TEP', name: 'Tepa' },
        { code: 'ZAR', name: 'Zar' }
      ]
    },
    { code: 'LAG', name: 'Laghman',
      cities: [
        { code: 'MEHTAR', name: 'Mehtar Lam' },
        { code: 'ALINGAR', name: 'Alingar' },
        { code: 'ALISHING', name: 'Alishing' },
        { code: 'DAWLAT', name: 'Dawlat Shah' },
        { code: 'MEHTAR', name: 'Mehtar Lam City' },
        { code: 'QARGHAYI', name: 'Qarghayi' },
        { code: 'SAID', name: 'Said Karam' },
        { code: 'ALISHING2', name: 'Alishing' },
        { code: 'DAWLAT2', name: 'Dawlat Shah' },
        { code: 'QARGHAYI2', name: 'Qarghayi' }
      ]
    },
    { code: 'LOG', name: 'Logar',
      cities: [
        { code: 'PULI', name: 'Puli Alam' },
        { code: 'BARAKI', name: 'Baraki Barak' },
        { code: 'CHARKH', name: 'Charkh' },
        { code: 'KHI', name: 'Khoshi' },
        { code: 'KHWAS', name: 'Khwash' },
        { code: 'MUHAMMAD', name: 'Muhammad Agha' },
        { code: 'PULI', name: 'Puli Alam City' },
        { code: 'AZRA', name: 'Azra' },
        { code: 'BARAKI2', name: 'Baraki Barak' },
        { code: 'CHARKH2', name: 'Charkh' }
      ]
    },
    { code: 'NAN2', name: 'Nangrahar',
      cities: [
        { code: 'JALALABAD', name: 'Jalalabad' },
        { code: 'ACHIN', name: 'Achin' },
        { code: 'BATIKOT', name: 'Batikot' },
        { code: 'BHSUD', name: 'Bhsud' },
        { code: 'DEH', name: 'Deh Bala' },
        { code: 'DUR', name: 'Dur Baba' },
        { code: 'GOSHTA', name: 'Goshta' },
        { code: 'KAMA', name: 'Kama' },
        { code: 'KUZ', name: 'Kuz Kunar' },
        { code: 'LALPURA', name: 'Lalpura' }
      ]
    },
    { code: 'NIM', name: 'Nimruz',
      cities: [
        { code: 'ZARANJ', name: 'Zaranj' },
        { code: 'CHAHAR', name: 'Chahar Burjak' },
        { code: 'CHAKANSUR', name: 'Chakhansur' },
        { code: 'KHASH', name: 'Khash Rod' },
        { code: 'KANG', name: 'Kang' },
        { code: 'ZARANJ2', name: 'Zaranj City' },
        { code: 'CHAHAR2', name: 'Chahar Burjak' },
        { code: 'CHAKANSUR2', name: 'Chakhansur' },
        { code: 'KHASH2', name: 'Khash Rod' },
        { code: 'KANG2', name: 'Kang' }
      ]
    },
    { code: 'NUR', name: 'Nuristan',
      cities: [
        { code: 'PARUN', name: 'Parun' },
        { code: 'BAR', name: 'Bar Kunar' },
        { code: 'DU', name: 'Du Ab' },
        { code: 'KAMDESH', name: 'Kamdesh' },
        { code: 'MANDOL', name: 'Mandol' },
        { code: 'NURISTAN', name: 'Nuristan' },
        { code: 'PARUN2', name: 'Parun City' },
        { code: 'WAMA', name: 'Wama' },
        { code: 'WAYGAL', name: 'Waygal' },
        { code: 'BARGI', name: 'Bargi Matal' }
      ]
    },
    { code: 'PAN', name: 'Panjshir',
      cities: [
        { code: 'BASARAK', name: 'Bazarak' },
        { code: 'ANABAH', name: 'Anabah' },
        { code: 'BASARAK2', name: 'Bazarak City' },
        { code: 'DARA', name: 'Dara' },
        { code: 'KHENJ', name: 'Khenj' },
        { code: 'PANJSHIR', name: 'Panjshir' },
        { code: 'RUKHA', name: 'Rukha' },
        { code: 'SHUTUL', name: 'Shutul' },
        { code: 'UNABAH', name: 'Unabah' },
        { code: 'PANJSHIR2', name: 'Panjshir City' }
      ]
    },
    { code: 'PAR', name: 'Parwan',
      cities: [
        { code: 'CHARIKAR', name: 'Charikar' },
        { code: 'BAHI', name: 'Bahi' },
        { code: 'CHARIKAR2', name: 'Charikar City' },
        { code: 'GUL', name: 'Gulbahar' },
        { code: 'JABAL', name: 'Jabal Saraj' },
        { code: 'SALANG', name: 'Salang' },
        { code: 'SAYED', name: 'Sayed Khel' },
        { code: 'SHEIKH', name: 'Sheikh Ali' },
        { code: 'SURHI', name: 'Surhi Parsa' },
        { code: 'CHARIKAR3', name: 'Charikar' }
      ]
    },
    { code: 'SAM', name: 'Samangan',
      cities: [
        { code: 'AYBAK', name: 'Aybak' },
        { code: 'AIBAK', name: 'Aibak' },
        { code: 'DARA', name: 'Dara-i-Suf' },
        { code: 'FEROZ', name: 'Feroz Nakhchir' },
        { code: 'HAZAR', name: 'Hazar Sumuch' },
        { code: 'KHULM', name: 'Khulm' },
        { code: 'RUYI', name: 'Ruyi Du Ab' },
        { code: 'SAMANGAN', name: 'Samangan' },
        { code: 'TAKHT', name: 'Takhar' },
        { code: 'AYBAK2', name: 'Aybak City' }
      ]
    },
    { code: 'SAR', name: 'Sar-e Pul',
      cities: [
        { code: 'SAR', name: 'Sar-e Pul' },
        { code: 'BALKHAB', name: 'Balkhab' },
        { code: 'GOZARGAH', name: 'Gozargah' },
        { code: 'GOSHTA', name: 'Goshta' },
        { code: 'KOHISTAN', name: 'Kohistan' },
        { code: 'SANG', name: 'Sangcharak' },
        { code: 'SAR2', name: 'Sar-e Pul City' },
        { code: 'SOZMA', name: 'Sozma Qala' },
        { code: 'BALKHAB2', name: 'Balkhab' },
        { code: 'GOZARGAH2', name: 'Gozargah' }
      ]
    },
    { code: 'TAK', name: 'Takhar',
      cities: [
        { code: 'TALEQAN', name: 'Taluqan' },
        { code: 'BANGI', name: 'Bangi' },
        { code: 'CHAH', name: 'Chah Ab' },
        { code: 'DARQAD', name: 'Darqad' },
        { code: 'DASHT', name: 'Dashti Qala' },
        { code: 'FARKHAR', name: 'Farkhar' },
        { code: 'ISHKASHIM', name: 'Ishkashim' },
        { code: 'KALAFGAN', name: 'Kalafgan' },
        { code: 'KHWAJA', name: 'Khwaja Ghar' },
        { code: 'NAMAK', name: 'Namak Ab' }
      ]
    },
    { code: 'URU', name: 'Uruzgan',
      cities: [
        { code: 'TARIN', name: 'Tarin Kowt' },
        { code: 'CHORA', name: 'Chora' },
        { code: 'DEH', name: 'Deh Rawod' },
        { code: 'GIZAB', name: 'Gizab' },
        { code: 'KHAS', name: 'Khas Uruzgan' },
        { code: 'SHAH', name: 'Shahidi Hassas' },
        { code: 'TARIN2', name: 'Tarin Kowt City' },
        { code: 'CHORA2', name: 'Chora' },
        { code: 'DEH2', name: 'Deh Rawod' },
        { code: 'GIZAB2', name: 'Gizab' }
      ]
    },
    { code: 'WAR', name: 'Wardak',
      cities: [
        { code: 'MEIDAN', name: 'Maidan Shahr' },
        { code: 'CHAK', name: 'Chak' },
        { code: 'DAIMIR', name: 'Daimir' },
        { code: 'GELAN', name: 'Gelan' },
        { code: 'HISAR', name: 'Hisar-e-Shahi' },
        { code: 'JALREZ', name: 'Jalrez' },
        { code: 'MARKA', name: 'Marka' },
        { code: 'NARKH', name: 'Narkh' },
        { code: 'SAYED', name: 'Sayed Abad' },
        { code: 'MEIDAN2', name: 'Maidan Shahr City' }
      ]
    },
    { code: 'ZAB', name: 'Zabul',
      cities: [
        { code: 'QALAT', name: 'Qalat' },
        { code: 'ARGHANDAB', name: 'Arghandab' },
        { code: 'ATGHAR', name: 'Atghar' },
        { code: 'DAIMIR', name: 'Daimir' },
        { code: 'MIZAN', name: 'Mizan' },
        { code: 'NAWA', name: 'Nawa' },
        { code: 'QALAT2', name: 'Qalat City' },
        { code: 'SHAHJOY', name: 'Shahjoy' },
        { code: 'SHIN', name: 'Shin' },
        { code: 'TARN', name: 'Tarnak Wa Jaldak' }
      ]
    }
  ]
},
  {
  code: 'PK',
  name: 'Pakistan',
  taxInfo: { standardRate: 17, taxName: 'GST', currency: 'PKR', region: 'APAC' },
  provinces: [
    { code: 'PUN', name: 'Punjab',
      cities: [
        { code: 'LAHORE', name: 'Lahore' },
        { code: 'FAISALABAD', name: 'Faisalabad' },
        { code: 'RAWALPINDI', name: 'Rawalpindi' },
        { code: 'GUJRANWALA', name: 'Gujranwala' },
        { code: 'PESHAWAR', name: 'Peshawar' },
        { code: 'MULTAN', name: 'Multan' },
        { code: 'ISLAMABAD', name: 'Islamabad' },
        { code: 'SIALKOT', name: 'Sialkot' },
        { code: 'GUJRAT', name: 'Gujrat' },
        { code: 'BAHAWALPUR', name: 'Bahawalpur' }
      ]
    },
    { code: 'SND', name: 'Sindh',
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
    { code: 'KPK', name: 'Khyber Pakhtunkhwa',
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
    { code: 'BAL', name: 'Balochistan',
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
    { code: 'GB', name: 'Gilgit-Baltistan',
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
    { code: 'AJK', name: 'Azad Kashmir',
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
    { code: 'ICT', name: 'Islamabad Capital Territory',
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
},
  {
  code: 'IN',
  name: 'India',
  taxInfo: { standardRate: 18, taxName: 'GST', currency: 'INR', region: 'APAC' },
  provinces: [
    // Major States
    { code: 'UP', name: 'Uttar Pradesh',
      cities: [
        { code: 'LUCKNOW', name: 'Lucknow' },
        { code: 'KANPUR', name: 'Kanpur' },
        { code: 'GHAZIABAD', name: 'Ghaziabad' },
        { code: 'NOIDA', name: 'Noida' },
        { code: 'AGRA', name: 'Agra' },
        { code: 'VARANASI', name: 'Varanasi' },
        { code: 'ALLAHABAD', name: 'Allahabad' },
        { code: 'MEERUT', name: 'Meerut' },
        { code: 'BAREILLY', name: 'Bareilly' },
        { code: 'ALIGARH', name: 'Aligarh' }
      ]
    },
    { code: 'MH', name: 'Maharashtra',
      cities: [
        { code: 'MUMBAI', name: 'Mumbai' },
        { code: 'PUNE', name: 'Pune' },
        { code: 'NAGPUR', name: 'Nagpur' },
        { code: 'THANE', name: 'Thane' },
        { code: 'NASHIK', name: 'Nashik' },
        { code: 'AURANGABAD', name: 'Aurangabad' },
        { code: 'SOLAPUR', name: 'Solapur' },
        { code: 'AMRAVATI', name: 'Amravati' },
        { code: 'KOLHAPUR', name: 'Kolhapur' },
        { code: 'NAGPUR2', name: 'Nagpur' }
      ]
    },
    { code: 'BR', name: 'Bihar',
      cities: [
        { code: 'PATNA', name: 'Patna' },
        { code: 'GAYA', name: 'Gaya' },
        { code: 'BHAGALPUR', name: 'Bhagalpur' },
        { code: 'MUZAFFARPUR', name: 'Muzaffarpur' },
        { code: 'PURNEA', name: 'Purnea' },
        { code: 'DARBHANGA', name: 'Darbhanga' },
        { code: 'BIHAR', name: 'Bihar Sharif' },
        { code: 'ARA', name: 'Ara' },
        { code: 'CHHAPRA', name: 'Chhapra' },
        { code: 'DEHRADUN', name: 'Dehradun' }
      ]
    },
    { code: 'WB', name: 'West Bengal',
      cities: [
        { code: 'KOLKATA', name: 'Kolkata' },
        { code: 'HOWRAH', name: 'Howrah' },
        { code: 'DURGAPUR', name: 'Durgapur' },
        { code: 'SILIGURI', name: 'Siliguri' },
        { code: 'ASANSOL', name: 'Asansol' },
        { code: 'KOLKATA2', name: 'Kolkata North' },
        { code: 'BARDHAMAN', name: 'Bardhaman' },
        { code: 'MALDA', name: 'Malda' },
        { code: 'KOLKATA3', name: 'Kolkata South' },
        { code: 'HOOGHLY', name: 'Hooghly' }
      ]
    },
    { code: 'MP', name: 'Madhya Pradesh',
      cities: [
        { code: 'BHOPAL', name: 'Bhopal' },
        { code: 'INDORE', name: 'Indore' },
        { code: 'GWALIOR', name: 'Gwalior' },
        { code: 'JABALPUR', name: 'Jabalpur' },
        { code: 'UJJAIN', name: 'Ujjain' },
        { code: 'SATNA', name: 'Satna' },
        { code: 'SAGAR', name: 'Sagar' },
        { code: 'DHAR', name: 'Dhar' },
        { code: 'RATLAM', name: 'Ratlam' },
        { code: 'KHANDWA', name: 'Khandwa' }
      ]
    },
    { code: 'TN', name: 'Tamil Nadu',
      cities: [
        { code: 'CHENNAI', name: 'Chennai' },
        { code: 'COIMBATORE', name: 'Coimbatore' },
        { code: 'MADURAI', name: 'Madurai' },
        { code: 'TIRUCHIRAPPALLI', name: 'Tiruchirappalli' },
        { code: 'SALEM', name: 'Salem' },
        { code: 'TIRUNELVELI', name: 'Tirunelveli' },
        { code: 'TIRUPPUR', name: 'Tiruppur' },
        { code: 'VELLORE', name: 'Vellore' },
        { code: 'THOOTHUKUDI', name: 'Thoothukudi' },
        { code: 'ERODE', name: 'Erode' }
      ]
    },
    { code: 'RJ', name: 'Rajasthan',
      cities: [
        { code: 'JAIPUR', name: 'Jaipur' },
        { code: 'JODHPUR', name: 'Jodhpur' },
        { code: 'KOTA', name: 'Kota' },
        { code: 'BIKANER', name: 'Bikaner' },
        { code: 'UDAIPUR', name: 'Udaipur' },
        { code: 'AJMER', name: 'Ajmer' },
        { code: 'BHILWARA', name: 'Bhilwara' },
        { code: 'ALWAR', name: 'Alwar' },
        { code: 'BHARATPUR', name: 'Bharatpur' },
        { code: 'PUSHPAK', name: 'Pushkar' }
      ]
    },
    { code: 'KA', name: 'Karnataka',
      cities: [
        { code: 'BENGALURU', name: 'Bengaluru' },
        { code: 'MYSURU', name: 'Mysuru' },
        { code: 'MANGALURU', name: 'Mangaluru' },
        { code: 'HUBLI', name: 'Hubballi' },
        { code: 'BELAGAVI', name: 'Belagavi' },
        { code: 'GULBARGA', name: 'Kalaburagi' },
        { code: 'DAVANAGERE', name: 'Davangere' },
        { code: 'BELLARY', name: 'Ballari' },
        { code: 'VIJAYAPURA', name: 'Vijayapura' },
        { code: 'SHIVAMOGGA', name: 'Shivamogga' }
      ]
    },
    { code: 'GJ', name: 'Gujarat',
      cities: [
        { code: 'AHMEDABAD', name: 'Ahmedabad' },
        { code: 'SURAT', name: 'Surat' },
        { code: 'VADODARA', name: 'Vadodara' },
        { code: 'RAJKOT', name: 'Rajkot' },
        { code: 'GANDHINAGAR', name: 'Gandhinagar' },
        { code: 'JAMNAGAR', name: 'Jamnagar' },
        { code: 'BHARUCH', name: 'Bharuch' },
        { code: 'PORBANDAR', name: 'Porbandar' },
        { code: 'JUNAGADH', name: 'Junagadh' },
        { code: 'MEHSANA', name: 'Mehsana' }
      ]
    },
    { code: 'AP', name: 'Andhra Pradesh',
      cities: [
        { code: 'VISAKHAPATNAM', name: 'Visakhapatnam' },
        { code: 'VIJAYAWADA', name: 'Vijayawada' },
        { code: 'GUNTUR', name: 'Guntur' },
        { code: 'NELLORE', name: 'Nellore' },
        { code: 'KURNOOL', name: 'Kurnool' },
        { code: 'RAJAHMUNDRY', name: 'Rajahmundry' },
        { code: 'TIRUPATI', name: 'Tirupati' },
        { code: 'KAKINADA', name: 'Kakinada' },
        { code: 'ANANTAPUR', name: 'Anantapur' },
        { code: 'ELURU', name: 'Eluru' }
      ]
    },
    { code: 'OR', name: 'Odisha',
      cities: [
        { code: 'BHUBANESWAR', name: 'Bhubaneswar' },
        { code: 'CUTTACK', name: 'Cuttack' },
        { code: 'ROURKELA', name: 'Rourkela' },
        { code: 'BERHAMPUR', name: 'Berhampur' },
        { code: 'SAMBALPUR', name: 'Sambalpur' },
        { code: 'PURI', name: 'Puri' },
        { code: 'BALASORE', name: 'Balasore' },
        { code: 'JEYPORE', name: 'Jeypore' },
        { code: 'ANGUL', name: 'Angul' },
        { code: 'BHADRAK', name: 'Bhadrak' }
      ]
    },
    { code: 'TS', name: 'Telangana',
      cities: [
        { code: 'HYDERABAD', name: 'Hyderabad' },
        { code: 'WARANGAL', name: 'Warangal' },
        { code: 'NIZAMABAD', name: 'Nizamabad' },
        { code: 'KARIMNAGAR', name: 'Karimnagar' },
        { code: 'KHAMMAM', name: 'Khammam' },
        { code: 'RAMAGUNDAM', name: 'Ramagundam' },
        { code: 'MAHBUBNAGAR', name: 'Mahabubnagar' },
        { code: 'NIZAMABAD2', name: 'Nizamabad' },
        { code: 'ADILABAD', name: 'Adilabad' },
        { code: 'SIDDIPET', name: 'Siddipet' }
      ]
    },
    { code: 'KL', name: 'Kerala',
      cities: [
        { code: 'THIRUVANANTHAPURAM', name: 'Thiruvananthapuram' },
        { code: 'KOCHI', name: 'Kochi' },
        { code: 'KOZHIKODE', name: 'Kozhikode' },
        { code: 'THRISSUR', name: 'Thrissur' },
        { code: 'MALAPPURAM', name: 'Malappuram' },
        { code: 'PALAKKAD', name: 'Palakkad' },
        { code: 'ALAPPUZHA', name: 'Alappuzha' },
        { code: 'KOLLAM', name: 'Kollam' },
        { code: 'KANNUR', name: 'Kannur' },
        { code: 'KASARGOD', name: 'Kasaragod' }
      ]
    },
    { code: 'JH', name: 'Jharkhand',
      cities: [
        { code: 'RANCHI', name: 'Ranchi' },
        { code: 'JAMSHEDPUR', name: 'Jamshedpur' },
        { code: 'DHANBAD', name: 'Dhanbad' },
        { code: 'BOKARO', name: 'Bokaro Steel City' },
        { code: 'DEOGHAR', name: 'Deoghar' },
        { code: 'PHULBANI', name: 'Phulbani' },
        { code: 'GIRIDIH', name: 'Giridih' },
        { code: 'Hazaribagh', name: 'Hazaribagh' },
        { code: 'RAMGARH', name: 'Ramgarh' },
        { code: 'CHAIBASA', name: 'Chaibasa' }
      ]
    },
    { code: 'AS', name: 'Assam',
      cities: [
        { code: 'GUWAHATI', name: 'Guwahati' },
        { code: 'SILCHAR', name: 'Silchar' },
        { code: 'DIBRUGARH', name: 'Dibrugarh' },
        { code: 'JORHAT', name: 'Jorhat' },
        { code: 'NAGAON', name: 'Nagaon' },
        { code: 'TEZPUR', name: 'Tezpur' },
        { code: 'TINSUKIA', name: 'Tinsukia' },
        { code: 'BONGAIGAON', name: 'Bongaigaon' },
        { code: 'KARIMGANJ', name: 'Karimganj' },
        { code: 'SUALKUCHI', name: 'Sualkuchi' }
      ]
    },
    { code: 'PB', name: 'Punjab',
      cities: [
        { code: 'CHANDIGARH', name: 'Chandigarh' },
        { code: 'LUDHIANA', name: 'Ludhiana' },
        { code: 'AMRITSAR', name: 'Amritsar' },
        { code: 'JALANDHAR', name: 'Jalandhar' },
        { code: 'PATIALA', name: 'Patiala' },
        { code: 'BATHINDA', name: 'Bathinda' },
        { code: 'MOGA', name: 'Moga' },
        { code: 'FEROZEPUR', name: 'Ferozepur' },
        { code: 'KAPURTHALA', name: 'Kapurthala' },
        { code: 'PATHANKOT', name: 'Pathankot' }
      ]
    },
    { code: 'CH', name: 'Chhattisgarh',
      cities: [
        { code: 'RAIPUR', name: 'Raipur' },
        { code: 'Bhilai', name: 'Bhilai' },
        { code: 'BILASPUR', name: 'Bilaspur' },
        { code: 'DURG', name: 'Durg' },
        { code: 'KORBA', name: 'Korba' },
        { code: 'RAIGARH', name: 'Raigarh' },
        { code: 'JAGDALPUR', name: 'Jagdalpur' },
        { code: 'AMBIKAPUR', name: 'Ambikapur' },
        { code: 'RAJNANDGAON', name: 'Rajnandgaon' },
        { code: 'DANTEWADA', name: 'Dantewada' }
      ]
    },
    { code: 'HR', name: 'Haryana',
      cities: [
        { code: 'GURUGRAM', name: 'Gurugram' },
        { code: 'FARIDABAD', name: 'Faridabad' },
        { code: 'PANIPAT', name: 'Panipat' },
        { code: 'AMBALA', name: 'Ambala' },
        { code: 'YAMUNANAGAR', name: 'Yamunanagar' },
        { code: 'ROHTAK', name: 'Rohtak' },
        { code: 'HISAR', name: 'Hisar' },
        { code: 'KARNAL', name: 'Karnal' },
        { code: 'SONIPAT', name: 'Sonipat' },
        { code: 'PANCHKULA', name: 'Panchkula' }
      ]
    },
    { code: 'UK', name: 'Uttarakhand',
      cities: [
        { code: 'DEHRADUN', name: 'Dehradun' },
        { code: 'HARIDWAR', name: 'Haridwar' },
        { code: 'ROORKEE', name: 'Roorkee' },
        { code: 'HALDWANI', name: 'Haldwani' },
        { code: 'RUDRAPUR', name: 'Rudrapur' },
        { code: 'KASHIPUR', name: 'Kashipur' },
        { code: 'UJJAIN', name: 'Ujjain' },
        { code: 'RANIKHET', name: 'Ranikhet' },
        { code: 'NAINITAL', name: 'Nainital' },
        { code: 'MUSSOORIE', name: 'Mussoorie' }
      ]
    },
    { code: 'HP', name: 'Himachal Pradesh',
      cities: [
        { code: 'SHIMLA', name: 'Shimla' },
        { code: 'DHARAMSHALA', name: 'Dharamshala' },
        { code: 'SOLAN', name: 'Solan' },
        { code: 'MANDI', name: 'Mandi' },
        { code: 'PALAMPUR', name: 'Palampur' },
        { code: 'KULLU', name: 'Kullu' },
        { code: 'MANALI', name: 'Manali' },
        { code: 'KANGRA', name: 'Kangra' },
        { code: 'CHAMBA', name: 'Chamba' },
        { code: 'BILASPUR', name: 'Bilaspur' }
      ]
    },
    { code: 'TR', name: 'Tripura',
      cities: [
        { code: 'AGARTALA', name: 'Agartala' },
        { code: 'UDAIPUR', name: 'Udaipur' },
        { code: 'DHARMANAGAR', name: 'Dharmanagar' },
        { code: 'KAILASHAHAR', name: 'Kailashahar' },
        { code: 'BELONIA', name: 'Belonia' },
        { code: 'KHOWAI', name: 'Khowai' },
        { code: 'SANTIRBAZAR', name: 'Santirbazar' },
        { code: 'KAMALPUR', name: 'Kamalpur' },
        { code: 'RANIRBAZAR', name: 'Ranirbazar' },
        { code: 'TELIAMURA', name: 'Teliamura' }
      ]
    },
    { code: 'ML', name: 'Meghalaya',
      cities: [
        { code: 'SHILLONG', name: 'Shillong' },
        { code: 'TURA', name: 'Tura' },
        { code: 'NONGSTOIN', name: 'Nongstoin' },
        { code: 'JOWAI', name: 'Jowai' },
        { code: 'BAGHMARA', name: 'Baghmara' },
        { code: 'NONGPOH', name: 'Nongpoh' },
        { code: 'WILLIAMNAGAR', name: 'Williamnagar' },
        { code: 'RESUBELPARA', name: 'Resubelpara' },
        { code: 'MAWSYNRAM', name: 'Mawsynram' },
        { code: 'CHERRAPUNJI', name: 'Cherrapunji' }
      ]
    },
    { code: 'MN', name: 'Manipur',
      cities: [
        { code: 'IMPHAL', name: 'Imphal' },
        { code: 'THOUBAL', name: 'Thoubal' },
        { code: 'KAKCHING', name: 'Kakching' },
        { code: 'LILONG', name: 'Lilong' },
        { code: 'MAYANG', name: 'Mayang Imphal' },
        { code: 'SENAPATI', name: 'Senapati' },
        { code: 'TAMENGLONG', name: 'Tamenglong' },
        { code: 'CHURACHANDPUR', name: 'Churachandpur' },
        { code: 'BISHNUPUR', name: 'Bishnupur' },
        { code: 'UKHRUL', name: 'Ukhrul' }
      ]
    },
    { code: 'MZ', name: 'Mizoram',
      cities: [
        { code: 'AIZAWL', name: 'Aizawl' },
        { code: 'LUNGLEH', name: 'Lungleh' },
        { code: 'CHAMPHAI', name: 'Champhai' },
        { code: 'SERCHHIP', name: 'Serchhip' },
        { code: 'KOLASIB', name: 'Kolasib' },
        { code: 'SAIHA', name: 'Saiha' },
        { code: 'MAMIT', name: 'Mamit' },
        { code: 'LAWNGTLAI', name: 'Lawngtlai' },
        { code: 'THENZAWL', name: 'Thenzawl' },
        { code: 'SAITUAL', name: 'Saitual' }
      ]
    },
    { code: 'NL', name: 'Nagaland',
      cities: [
        { code: 'KOHIMA', name: 'Kohima' },
        { code: 'DIMAPUR', name: 'Dimapur' },
        { code: 'MOKOKCHUNG', name: 'Mokokchung' },
        { code: 'TUENSANG', name: 'Tuensang' },
        { code: 'WOKHA', name: 'Wokha' },
        { code: 'ZUNHEBOTO', name: 'Zunheboto' },
        { code: 'MON', name: 'Mon' },
        { code: 'PHEK', name: 'Phek' },
        { code: 'KIPHIRE', name: 'Kiphire' },
        { code: 'PEREN', name: 'Peren' }
      ]
    },
    { code: 'GA', name: 'Goa',
      cities: [
        { code: 'PANAJI', name: 'Panaji' },
        { code: 'MARGAO', name: 'Margao' },
        { code: 'VASCO', name: 'Vasco da Gama' },
        { code: 'MAPUSA', name: 'Mapusa' },
        { code: 'PONDA', name: 'Ponda' },
        { code: 'BICHOLIM', name: 'Bicholim' },
        { code: 'CURCHOREM', name: 'Curchorem' },
        { code: 'SANQUELIM', name: 'Sanquelim' },
        { code: 'QUEPEM', name: 'Quepem' },
        { code: 'CANACONA', name: 'Canacona' }
      ]
    },
    { code: 'SK', name: 'Sikkim',
      cities: [
        { code: 'GANGTOK', name: 'Gangtok' },
        { code: 'GANGTOK2', name: 'Gangtok North' },
        { code: 'NAMCHI', name: 'Namchi' },
        { code: 'GEYZING', name: 'Geyzing' },
        { code: 'MANGAN', name: 'Mangan' },
        { code: 'SINGTAM', name: 'Singtam' },
        { code: 'RANGPO', name: 'Rangpo' },
        { code: 'JORETHANG', name: 'Jorethang' },
        { code: 'PAKYONG', name: 'Pakyong' },
        { code: 'RONGPO', name: 'Rongpo' }
      ]
    },
    // Union Territories
    { code: 'DL', name: 'Delhi',
      cities: [
        { code: 'DELHI', name: 'Delhi' },
        { code: 'NEW', name: 'New Delhi' },
        { code: 'SOUTH', name: 'South Delhi' },
        { code: 'NORTH', name: 'North Delhi' },
        { code: 'EAST', name: 'East Delhi' },
        { code: 'WEST', name: 'West Delhi' },
        { code: 'CENTRAL', name: 'Central Delhi' },
        { code: 'SOUTHWEST', name: 'South West Delhi' },
        { code: 'NORTHWEST', name: 'North West Delhi' },
        { code: 'NORTHEAST', name: 'North East Delhi' }
      ]
    },
    { code: 'JK', name: 'Jammu & Kashmir',
      cities: [
        { code: 'SRINAGAR', name: 'Srinagar' },
        { code: 'JAMMU', name: 'Jammu' },
        { code: 'ANANTNAG', name: 'Anantnag' },
        { code: 'BARAMULLA', name: 'Baramulla' },
        { code: 'KATHUA', name: 'Kathua' },
        { code: 'POONCH', name: 'Poonch' },
        { code: 'RAJOURI', name: 'Rajouri' },
        { code: 'KUPWARA', name: 'Kupwara' },
        { code: 'PULWAMA', name: 'Pulwama' },
        { code: 'SHOPAIN', name: 'Shopian' }
      ]
    },
    { code: 'LA', name: 'Ladakh',
      cities: [
        { code: 'LEH', name: 'Leh' },
        { code: 'KARGIL', name: 'Kargil' },
        { code: 'ZANSKAR', name: 'Zanskar' },
        { code: 'NUBRA', name: 'Nubra' },
        { code: 'KHARDUNG', name: 'Khardung' },
        { code: 'PANGONG', name: 'Pangong' },
        { code: 'TSOMORIRI', name: 'Tsomoriri' },
        { code: 'SIACHEN', name: 'Siachen' },
        { code: 'DRAS', name: 'Dras' },
        { code: 'CHANGTHANG', name: 'Changthang' }
      ]
    },
    { code: 'PY', name: 'Puducherry',
      cities: [
        { code: 'PONDICHERRY', name: 'Pondicherry' },
        { code: 'KARAIKAL', name: 'Karaikal' },
        { code: 'YANAM', name: 'Yanam' },
        { code: 'MAHE', name: 'Mahe' },
        { code: 'PONDICHERRY2', name: 'Pondicherry North' },
        { code: 'PONDICHERRY3', name: 'Pondicherry South' },
        { code: 'AURANGABAD', name: 'Auroville' },
        { code: 'OOTY', name: 'Ooty' },
        { code: 'MAHE2', name: 'Mahe North' },
        { code: 'YANAM2', name: 'Yanam South' }
      ]
    },
    { code: 'CT', name: 'Chandigarh',
      cities: [
        { code: 'CHANDIGARH', name: 'Chandigarh' },
        { code: 'SECTOR', name: 'Sector 17' },
        { code: 'SECTOR2', name: 'Sector 22' },
        { code: 'SECTOR3', name: 'Sector 35' },
        { code: 'SECTOR4', name: 'Sector 45' },
        { code: 'SECTOR5', name: 'Sector 19' },
        { code: 'SECTOR6', name: 'Sector 26' },
        { code: 'SECTOR7', name: 'Sector 30' },
        { code: 'SECTOR8', name: 'Sector 37' },
        { code: 'SECTOR9', name: 'Sector 43' }
      ]
    },
    { code: 'AN', name: 'Andaman & Nicobar',
      cities: [
        { code: 'PORT', name: 'Port Blair' },
        { code: 'CAR', name: 'Car Nicobar' },
        { code: 'GREAT', name: 'Great Nicobar' },
        { code: 'LITTLE', name: 'Little Andaman' },
        { code: 'MIDDLE', name: 'Middle Andaman' },
        { code: 'NORTH', name: 'North Andaman' },
        { code: 'SOUTH', name: 'South Andaman' },
        { code: 'HUT', name: 'Hut Bay' },
        { code: 'MAY', name: 'Mayabunder' },
        { code: 'RANGAT', name: 'Rangat' }
      ]
    },
    { code: 'LD', name: 'Lakshadweep',
      cities: [
        { code: 'KAVARATTI', name: 'Kavaratti' },
        { code: 'AGATTI', name: 'Agatti' },
        { code: 'BANGARAM', name: 'Bangaram' },
        { code: 'KALPENI', name: 'Kalpeni' },
        { code: 'MINICOY', name: 'Minicoy' },
        { code: 'KADAMATH', name: 'Kadamath' },
        { code: 'KILTHAN', name: 'Kilthan' },
        { code: 'CHETLAT', name: 'Chetlat' },
        { code: 'BITRA', name: 'Bitra' },
        { code: 'ANDROTH', name: 'Androth' }
      ]
    },
    { code: 'DN', name: 'Dadra & Nagar Haveli',
      cities: [
        { code: 'SILVASSA', name: 'Silvassa' },
        { code: 'DADRA', name: 'Dadra' },
        { code: 'NAGAR', name: 'Nagar Haveli' },
        { code: 'KHANVEL', name: 'Khanvel' },
        { code: 'AMBOLI', name: 'Amboli' },
        { code: 'BINDRA', name: 'Bindraban' },
        { code: 'CHANDRA', name: 'Chandrapur' },
        { code: 'DAMAN', name: 'Daman' },
        { code: 'VAPI', name: 'Vapi' },
        { code: 'SILVASSA2', name: 'Silvassa North' }
      ]
    },
    { code: 'DD', name: 'Daman & Diu',
      cities: [
        { code: 'DIU', name: 'Diu' },
        { code: 'DAMAN', name: 'Daman' },
        { code: 'DIU2', name: 'Diu Town' },
        { code: 'DAMAN2', name: 'Daman Town' },
        { code: 'BHUCHAR', name: 'Buchar' },
        { code: 'GHOGHLA', name: 'Ghoghla' },
        { code: 'JAMPOR', name: 'Jampor' },
        { code: 'VANAKBARDI', name: 'Vanakbari' },
        { code: 'SASAN', name: 'Sasan' },
        { code: 'KODINAR', name: 'Kodinar' }
      ]
    }
  ]
},
  { code: 'LK', name: 'Sri Lanka', taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'LKR', region: 'APAC' } },
  { code: 'MV', name: 'Maldives', taxInfo: { standardRate: 6, taxName: 'GST', currency: 'MVR', region: 'APAC' } },
  { code: 'NP', name: 'Nepal' },
  { code: 'BT', name: 'Bhutan' },
  { code: 'BD', name: 'Bangladesh', taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'BDT', region: 'APAC' } },
  { code: 'MM', name: 'Myanmar' },
  { code: 'TH', name: 'Thailand', taxInfo: { standardRate: 7, taxName: 'VAT', currency: 'THB', region: 'APAC' } },
  { code: 'LA', name: 'Laos' },
  { code: 'VN', name: 'Vietnam', taxInfo: { standardRate: 10, taxName: 'VAT', currency: 'VND', region: 'APAC' } },
  { code: 'KH', name: 'Cambodia', taxInfo: { standardRate: 10, taxName: 'VAT', currency: 'KHR', region: 'APAC' } },
  { code: 'MY', name: 'Malaysia', taxInfo: { standardRate: 6, taxName: 'GST', currency: 'MYR', region: 'APAC' } },
  { code: 'SG', name: 'Singapore', taxInfo: { standardRate: 8, taxName: 'GST', currency: 'SGD', region: 'APAC' } },
  { code: 'BN', name: 'Brunei' },
  { code: 'ID', name: 'Indonesia', taxInfo: { standardRate: 11, taxName: 'VAT', currency: 'IDR', region: 'APAC' } },
  { code: 'TL', name: 'East Timor' },
  { code: 'PH', name: 'Philippines', taxInfo: { standardRate: 12, taxName: 'VAT', currency: 'PHP', region: 'APAC' } },
  { code: 'TW', name: 'Taiwan', taxInfo: { standardRate: 5, taxName: 'VAT', currency: 'TWD', region: 'APAC' } },
  {
  code: 'SZ',
  name: 'Hainan',
  cities: [
    { code: 'HAIKOU', name: 'Haikou' },
    { code: 'SANYA', name: 'Sanya' },
    { code: 'DANZHOU', name: 'Danzhou' },
    { code: 'WUZHISHAN', name: 'Wuzhishan' },
    { code: 'QIONGHAI', name: 'Qionghai' },
    { code: 'WENCHANG', name: 'Wenchang' },
    { code: 'WANNING', name: 'Wanning' },
    { code: 'DONGFANG', name: 'Dongfang' },
    { code: 'DINGAN', name: 'Ding\'an' },
    { code: 'TUNCHANG', name: 'Tunchang' }
        { code: 'QIONGHAI', name: 'Qionghai' },
        { code: 'WENCHANG', name: 'Wenchang' },
        { code: 'WANNING', name: 'Wanning' },
        { code: 'DONGFANG', name: 'Dongfang' },
        { code: 'DINGAN', name: 'Ding\'an' },
        { code: 'TUNCHANG', name: 'Tunchang' }
      ]
    },
    { code: 'NM', name: 'Inner Mongolia',
      cities: [
        { code: 'HOHHOT', name: 'Hohhot' },
        { code: 'BAOTOU', name: 'Baotou' },
        { code: 'WUHAI', name: 'Wuhai' },
        { code: 'CHIFENG', name: 'Chifeng' },
        { code: 'TONGLIAO', name: 'Tongliao' },
        { code: 'ORDOS', name: 'Ordos' },
        { code: 'HULUN', name: 'Hulun' },
        { code: 'BAYAN', name: 'Bayan' },
        { code: 'ULAN', name: 'Ulan' },
        { code: 'ALXA', name: 'Alxa' }
      ]
    },
    { code: 'XJ', name: 'Xinjiang',
      cities: [
        { code: 'URUMQI', name: 'Urumqi' },
        { code: 'KARAMAY', name: 'Karamay' },
        { code: 'TURPAN', name: 'Turpan' },
        { code: 'HAMI', name: 'Hami' },
        { code: 'KASHGAR', name: 'Kashgar' },
        { code: 'AKSU', name: 'Aksu' },
        { code: 'KIZILSU', name: 'Kizilsu' },
        { code: 'HOTAN', name: 'Hotan' },
        { code: 'ILT', name: 'Ili' },
        { code: 'TACHENG', name: 'Tacheng' }
      ]
    },
    { code: 'XZ', name: 'Tibet',
      cities: [
        { code: 'LHASA', name: 'Lhasa' },
        { code: 'CHAMDO', name: 'Chamdo' },
        { code: 'SHANNAN', name: 'Shannan' },
        { code: 'SHIGATSE', name: 'Shigatse' },
        { code: 'NAGQU', name: 'Nagqu' },
        { code: 'NGARI', name: 'Ngari' },
        { code: 'NYINGCHI', name: 'Nyingchi' },
        { code: 'QAMDO', name: 'Qamdo' },
        { code: 'GYANGZE', name: 'Gyangze' },
        { code: 'XIGAZE', name: 'Xigaze' }
      ]
    },
    { code: 'NX', name: 'Ningxia',
      cities: [
        { code: 'YINCHUAN', name: 'Yinchuan' },
        { code: 'SHIZUISHAN', name: 'Shizuishan' },
        { code: 'WUZHONG', name: 'Wuzhong' },
        { code: 'GUOYUAN', name: 'Guyuan' },
        { code: 'ZHONGWEI', name: 'Zhongwei' },
        { code: 'LINGWU', name: 'Lingwu' },
        { code: 'QINGTONGXIA', name: 'Qingtongxia' },
        { code: 'HELAN', name: 'Helan' },
        { code: 'YONGNING', name: 'Yongning' },
        { code: 'PINGLUO', name: 'Pingluo' }
      ]
    }
  ]
},
  {
  code: 'HK',
  name: 'Hong Kong',
  taxInfo: { standardRate: 0, taxName: 'No VAT/GST', currency: 'HKD', region: 'APAC' },
  provinces: [
    { code: 'HKI', name: 'Hong Kong Island',
      cities: [
        { code: 'CENTRAL', name: 'Central' },
        { code: 'ADMIRALTY', name: 'Admiralty' },
        { code: 'WAN', name: 'Wan Chai' },
        { code: 'CAUSEWAY', name: 'Causeway Bay' },
        { code: 'QUARRY', name: 'Quarry Bay' },
        { code: 'SAI', name: 'Sai Wan Ho' },
        { code: 'SHAU', name: 'Shau Kei Wan' },
        { code: 'CHAI', name: 'Chai Wan' },
        { code: 'ABERDEEN', name: 'Aberdeen' },
        { code: 'REPULSE', name: 'Repulse Bay' }
      ]
    },
    { code: 'KLN', name: 'Kowloon',
      cities: [
        { code: 'TSIM', name: 'Tsim Sha Tsui' },
        { code: 'JORDAN', name: 'Jordan' },
        { code: 'YAUMATEI', name: 'Yau Ma Tei' },
        { code: 'MONG', name: 'Mong Kok' },
        { code: 'PRINCE', name: 'Prince Edward' },
        { code: 'HUNG', name: 'Hung Hom' },
        { code: 'TO', name: 'To Kwa Wan' },
        { code: 'KOWLOON', name: 'Kowloon City' },
        { code: 'DIAMOND', name: 'Diamond Hill' },
        { code: 'WONG', name: 'Wong Tai Sin' }
      ]
    },
    { code: 'NT', name: 'New Territories',
      cities: [
        { code: 'TSUEN', name: 'Tsuen Wan' },
        { code: 'TUEN', name: 'Tuen Mun' },
        { code: 'YUEN', name: 'Yuen Long' },
        { code: 'TIN', name: 'Tin Shui Wai' },
        { code: 'FANLING', name: 'Fanling' },
        { code: 'TAI', name: 'Tai Po' },
        { code: 'SHA', name: 'Sha Tin' },
        { code: 'MA', name: 'Ma On Shan' },
        { code: 'TUEN2', name: 'Tung Chung' },
        { code: 'DISCOVERY', name: 'Discovery Bay' }
      ]
    },
    { code: 'OUT', name: 'Outlying Islands',
      cities: [
        { code: 'CHEUNG', name: 'Cheung Chau' },
        { code: 'LAMMA', name: 'Lamma Island' },
        { code: 'PENG', name: 'Peng Chau' },
        { code: 'LANTAU', name: 'Lantau Island' },
        { code: 'SHEK', name: 'Shek Pik' },
        { code: 'TAI', name: 'Tai O' },
        { code: 'PO', name: 'Po Toi Islands' },
        { code: 'MUI', name: 'Mui Wo' },
        { code: 'PENG2', name: 'Peng Chau' },
        { code: 'MA', name: 'Ma Wan' }
      ]
    }
  ]
},
  { code: 'MO', name: 'Macau' },
  { code: 'MN', name: 'Mongolia' },
  { code: 'KR', name: 'South Korea', taxInfo: { standardRate: 10, taxName: 'VAT', currency: 'KRW', region: 'APAC' } },
  { code: 'JP', name: 'Japan', taxInfo: { standardRate: 10, taxName: 'Consumption Tax', currency: 'JPY', region: 'APAC' } },
  { code: 'AU', name: 'Australia', taxInfo: { standardRate: 10, taxName: 'GST', currency: 'AUD', region: 'APAC' } },
  { code: 'NZ', name: 'New Zealand', taxInfo: { standardRate: 15, taxName: 'GST', currency: 'NZD', region: 'APAC' } },
  { code: 'KP', name: 'North Korea' },
  { code: 'KZ', name: 'Kazakhstan', taxInfo: { standardRate: 12, taxName: 'VAT', currency: 'KZT', region: 'APAC' } },
  { code: 'KG', name: 'Kyrgyzstan', taxInfo: { standardRate: 12, taxName: 'VAT', currency: 'KGS', region: 'APAC' } },
  { code: 'TJ', name: 'Tajikistan', taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'TJS', region: 'APAC' } },
  { code: 'UZ', name: 'Uzbekistan', taxInfo: { standardRate: 12, taxName: 'VAT', currency: 'UZS', region: 'APAC' } },
  { code: 'TM', name: 'Turkmenistan', taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'TMT', region: 'APAC' } },
  { code: 'MN', name: 'Mongolia', taxInfo: { standardRate: 10, taxName: 'VAT', currency: 'MNT', region: 'APAC' } },
  { code: 'NP', name: 'Nepal', taxInfo: { standardRate: 13, taxName: 'VAT', currency: 'NPR', region: 'APAC' } },
  { code: 'BT', name: 'Bhutan', taxInfo: { standardRate: 7, taxName: 'VAT', currency: 'BTN', region: 'APAC' } },
  { code: 'LK', name: 'Sri Lanka', taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'LKR', region: 'APAC' } },
  { code: 'MV', name: 'Maldives', taxInfo: { standardRate: 6, taxName: 'GST', currency: 'MVR', region: 'APAC' } },
  { code: 'MM', name: 'Myanmar', taxInfo: { standardRate: 5, taxName: 'VAT', currency: 'MMK', region: 'APAC' } },
  { code: 'LA', name: 'Laos', taxInfo: { standardRate: 10, taxName: 'VAT', currency: 'LAK', region: 'APAC' } },
  { code: 'KH', name: 'Cambodia', taxInfo: { standardRate: 10, taxName: 'VAT', currency: 'KHR', region: 'APAC' } },
  { code: 'BN', name: 'Brunei', taxInfo: { standardRate: 0, taxName: 'No Tax', currency: 'BND', region: 'APAC' } },
  { code: 'SG', name: 'Singapore', taxInfo: { standardRate: 8, taxName: 'GST', currency: 'SGD', region: 'APAC' } },
  { code: 'MY', name: 'Malaysia', taxInfo: { standardRate: 6, taxName: 'GST', currency: 'MYR', region: 'APAC' } },
  { code: 'TH', name: 'Thailand', taxInfo: { standardRate: 7, taxName: 'VAT', currency: 'THB', region: 'APAC' } },
  { code: 'VN', name: 'Vietnam', taxInfo: { standardRate: 10, taxName: 'VAT', currency: 'VND', region: 'APAC' } },
  { code: 'PH', name: 'Philippines', taxInfo: { standardRate: 12, taxName: 'VAT', currency: 'PHP', region: 'APAC' } },
  { code: 'ID', name: 'Indonesia', taxInfo: { standardRate: 11, taxName: 'VAT', currency: 'IDR', region: 'APAC' } },
  { code: 'TL', name: 'East Timor', taxInfo: { standardRate: 2.5, taxName: 'VAT', currency: 'USD', region: 'APAC' } },
  { code: 'HK', name: 'Hong Kong' },
  { code: 'MO', name: 'Macau' },

  // Oceania
  {
    code: 'AU',
    name: 'Australia',
    taxInfo: { standardRate: 10, taxName: 'GST', currency: 'AUD', region: 'APAC' },
    provinces: [
      { code: 'NSW', name: 'New South Wales' },
      { code: 'VIC', name: 'Victoria' },
      { code: 'QLD', name: 'Queensland' },
      { code: 'WA', name: 'Western Australia' },
      { code: 'SA', name: 'South Australia' },
      { code: 'TAS', name: 'Tasmania' },
      { code: 'ACT', name: 'Australian Capital Territory' },
      { code: 'NT', name: 'Northern Territory' }
    ]
  },
  { code: 'NZ', name: 'New Zealand', taxInfo: { standardRate: 15, taxName: 'GST', currency: 'NZD', region: 'APAC' } },
  { code: 'FJ', name: 'Fiji', taxInfo: { standardRate: 9, taxName: 'VAT', currency: 'FJD', region: 'APAC' } },
  { code: 'PG', name: 'Papua New Guinea', taxInfo: { standardRate: 10, taxName: 'VAT', currency: 'PGK', region: 'APAC' } },
  { code: 'SB', name: 'Solomon Islands', taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'SBD', region: 'APAC' } },
  { code: 'VU', name: 'Vanuatu', taxInfo: { standardRate: 12.5, taxName: 'VAT', currency: 'VUV', region: 'APAC' } },
  { code: 'NC', name: 'New Caledonia', taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'XPF', region: 'APAC' } },
  { code: 'PF', name: 'French Polynesia', taxInfo: { standardRate: 16, taxName: 'VAT', currency: 'XPF', region: 'APAC' } },
  { code: 'WS', name: 'Samoa', taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'WST', region: 'APAC' } },
  { code: 'TO', name: 'Tonga', taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'TOP', region: 'APAC' } },
  { code: 'TV', name: 'Tuvalu' },
  { code: 'KI', name: 'Kiribati' },
  { code: 'NR', name: 'Nauru' },
  { code: 'MH', name: 'Marshall Islands' },
  { code: 'FM', name: 'Micronesia' },
  { code: 'PW', name: 'Palau' },
  { code: 'CK', name: 'Cook Islands' },
  { code: 'NU', name: 'Niue' },
  { code: 'TK', name: 'Tokelau' },
  { code: 'WF', name: 'Wallis and Futuna' },
  { code: 'AS', name: 'American Samoa' },
  { code: 'GU', name: 'Guam' },
  { code: 'MP', name: 'Northern Mariana Islands' },
  { code: 'PR', name: 'Puerto Rico' },
  { code: 'AS', name: 'American Samoa' },
  { code: 'GU', name: 'Guam' },
  { code: 'MP', name: 'Northern Mariana Islands' },

  // Additional Territories and Dependencies
  { code: 'GL', name: 'Greenland' },
  { code: 'FO', name: 'Faroe Islands' },
  { code: 'SJ', name: 'Svalbard and Jan Mayen' },
  { code: 'AX', name: 'Åland Islands' },
  { code: 'GI', name: 'Gibraltar' },
  { code: 'JE', name: 'Jersey' },
  { code: 'GG', name: 'Guernsey' },
  { code: 'IM', name: 'Isle of Man' },
  { code: 'AI', name: 'Anguilla' },
  { code: 'BM', name: 'Bermuda' },
  { code: 'VG', name: 'British Virgin Islands' },
  { code: 'KY', name: 'Cayman Islands' },
  { code: 'MS', name: 'Montserrat' },
  { code: 'TC', name: 'Turks and Caicos Islands' },
  { code: 'SH', name: 'Saint Helena' },
  { code: 'IO', name: 'British Indian Ocean Territory' },
  { code: 'PN', name: 'Pitcairn Islands' },
  { code: 'VI', name: 'U.S. Virgin Islands' },
  { code: 'UM', name: 'U.S. Minor Outlying Islands' },
  { code: 'WF', name: 'Wallis and Futuna' },
  { code: 'YT', name: 'Mayotte' },
  { code: 'RE', name: 'Réunion' },
  { code: 'GP', name: 'Guadeloupe' },
  { code: 'MQ', name: 'Martinique' },
  { code: 'BL', name: 'Saint Barthélemy' },
  { code: 'MF', name: 'Saint Martin' },
  { code: 'PM', name: 'Saint Pierre and Miquelon' },
  { code: 'AW', name: 'Aruba' },
  { code: 'CW', name: 'Curaçao' },
  { code: 'SX', name: 'Sint Maarten' },
  { code: 'BQ', name: 'Caribbean Netherlands' },
  { code: 'EH', name: 'Western Sahara' },
  { code: 'AQ', name: 'Antarctica' },
  {
    code: 'MX',
    name: 'Mexico',
    provinces: [
      { code: 'AGU', name: 'Aguascalientes' },
      { code: 'BCN', name: 'Baja California' },
      { code: 'BCS', name: 'Baja California Sur' },
      { code: 'CAM', name: 'Campeche' },
      { code: 'CHP', name: 'Chiapas' },
      { code: 'CHH', name: 'Chihuahua' },
      { code: 'COA', name: 'Coahuila' },
      { code: 'COL', name: 'Colima' },
      { code: 'DUR', name: 'Durango' },
      { code: 'GUA', name: 'Guanajuato' },
      { code: 'GRO', name: 'Guerrero' },
      { code: 'HID', name: 'Hidalgo' },
      { code: 'JAL', name: 'Jalisco' },
      { code: 'MEX', name: 'Mexico' },
      { code: 'MIC', name: 'Michoacán' },
      { code: 'MOR', name: 'Morelos' },
      { code: 'NAY', name: 'Nayarit' },
      { code: 'NLE', name: 'Nuevo León' },
      { code: 'OAX', name: 'Oaxaca' },
      { code: 'PUE', name: 'Puebla' },
      { code: 'QUE', name: 'Querétaro' },
      { code: 'ROO', name: 'Quintana Roo' },
      { code: 'SLP', name: 'San Luis Potosí' },
      { code: 'SIN', name: 'Sinaloa' },
      { code: 'SON', name: 'Sonora' },
      { code: 'TAB', name: 'Tabasco' },
      { code: 'TAM', name: 'Tamaulipas' },
      { code: 'TLA', name: 'Tlaxcala' },
      { code: 'VER', name: 'Veracruz' },
      { code: 'YUC', name: 'Yucatán' },
      { code: 'ZAC', name: 'Zacatecas' },
      { code: 'CMX', name: 'Ciudad de México' }
    ]
  },
  {
    code: 'AR',
    name: 'Argentina',
    provinces: [
      { code: 'BA', name: 'Buenos Aires' },
      { code: 'CABA', name: 'Ciudad Autónoma de Buenos Aires' },
      { code: 'CT', name: 'Catamarca' },
      { code: 'CC', name: 'Chaco' },
      { code: 'CH', name: 'Chubut' },
      { code: 'CB', name: 'Córdoba' },
      { code: 'CR', name: 'Corrientes' },
      { code: 'ER', name: 'Entre Ríos' },
      { code: 'FO', name: 'Formosa' },
      { code: 'JY', name: 'Jujuy' },
      { code: 'LP', name: 'La Pampa' },
      { code: 'LR', name: 'La Rioja' },
      { code: 'MZ', name: 'Mendoza' },
      { code: 'MI', name: 'Misiones' },
      { code: 'NQ', name: 'Neuquén' },
      { code: 'RN', name: 'Río Negro' },
      { code: 'SA', name: 'Salta' },
      { code: 'SJ', name: 'San Juan' },
      { code: 'SL', name: 'San Luis' },
      { code: 'SC', name: 'Santa Cruz' },
      { code: 'SF', name: 'Santa Fe' },
      { code: 'SE', name: 'Santiago del Estero' },
      { code: 'TF', name: 'Tierra del Fuego' },
      { code: 'TU', name: 'Tucumán' }
    ]
  },
  {
    code: 'RU',
    name: 'Russia',
    provinces: [
      { code: 'MOW', name: 'Moscow' },
      { code: 'SPE', name: 'Saint Petersburg' },
      { code: 'NSK', name: 'Novosibirsk' },
      { code: 'EKB', name: 'Yekaterinburg' },
      { code: 'KZN', name: 'Kazan' },
      { code: 'NNO', name: 'Nizhny Novgorod' },
      { code: 'CHE', name: 'Chelyabinsk' },
      { code: 'SAM', name: 'Samara' },
      { code: 'OMS', name: 'Omsk' },
      { code: 'ROS', name: 'Rostov-on-Don' },
      { code: 'UFA', name: 'Ufa' },
      { code: 'KRA', name: 'Krasnoyarsk' },
      { code: 'PER', name: 'Perm' },
      { code: 'VLG', name: 'Volgograd' },
      { code: 'VOR', name: 'Voronezh' }
    ]
  },
  {
    code: 'ZA',
    name: 'South Africa',
    provinces: [
      { code: 'EC', name: 'Eastern Cape' },
      { code: 'FS', name: 'Free State' },
      { code: 'GP', name: 'Gauteng' },
      { code: 'KZN', name: 'KwaZulu-Natal' },
      { code: 'LP', name: 'Limpopo' },
      { code: 'MP', name: 'Mpumalanga' },
      { code: 'NC', name: 'Northern Cape' },
      { code: 'NW', name: 'North West' },
      { code: 'WC', name: 'Western Cape' }
    ]
  },
  {
    code: 'NG',
    name: 'Nigeria',
    provinces: [
      { code: 'AB', name: 'Abia' },
      { code: 'AD', name: 'Adamawa' },
      { code: 'AK', name: 'Akwa Ibom' },
      { code: 'AN', name: 'Anambra' },
      { code: 'BA', name: 'Bauchi' },
      { code: 'BY', name: 'Bayelsa' },
      { code: 'BE', name: 'Benue' },
      { code: 'BO', name: 'Borno' },
      { code: 'CR', name: 'Cross River' },
      { code: 'DE', name: 'Delta' },
      { code: 'EB', name: 'Ebonyi' },
      { code: 'ED', name: 'Edo' },
      { code: 'EK', name: 'Ekiti' },
      { code: 'EN', name: 'Enugu' },
      { code: 'FC', name: 'Federal Capital Territory' },
      { code: 'GO', name: 'Gombe' },
      { code: 'IM', name: 'Imo' },
      { code: 'JI', name: 'Jigawa' },
      { code: 'KD', name: 'Kaduna' },
      { code: 'KN', name: 'Kano' },
      { code: 'KT', name: 'Katsina' },
      { code: 'KE', name: 'Kebbi' },
      { code: 'KO', name: 'Kogi' },
      { code: 'KW', name: 'Kwara' },
      { code: 'LA', name: 'Lagos' },
      { code: 'NA', name: 'Nasarawa' },
      { code: 'NI', name: 'Niger' },
      { code: 'OG', name: 'Ogun' },
      { code: 'ON', name: 'Ondo' },
      { code: 'OS', name: 'Osun' },
      { code: 'OY', name: 'Oyo' },
      { code: 'PL', name: 'Plateau' },
      { code: 'RI', name: 'Rivers' },
      { code: 'SO', name: 'Sokoto' },
      { code: 'TA', name: 'Taraba' },
      { code: 'YO', name: 'Yobe' },
      { code: 'ZA', name: 'Zamfara' }
    ]
  },
  {
    code: 'EG',
    name: 'Egypt',
    provinces: [
      { code: 'ALX', name: 'Alexandria' },
      { code: 'ASN', name: 'Aswan' },
      { code: 'AST', name: 'Asyut' },
      { code: 'BH', name: 'Beheira' },
      { code: 'BNS', name: 'Beni Suef' },
      { code: 'C', name: 'Cairo' },
      { code: 'DK', name: 'Dakahlia' },
      { code: 'DT', name: 'Damietta' },
      { code: 'FYM', name: 'Faiyum' },
      { code: 'GH', name: 'Gharbia' },
      { code: 'GZ', name: 'Giza' },
      { code: 'IS', name: 'Ismailia' },
      { code: 'JS', name: 'South Sinai' },
      { code: 'KB', name: 'Qalyubia' },
      { code: 'KFS', name: 'Kafr el-Sheikh' },
      { code: 'KN', name: 'Qena' },
      { code: 'LX', name: 'Luxor' },
      { code: 'MN', name: 'Minya' },
      { code: 'MNF', name: 'Monufia' },
      { code: 'MT', name: 'Matrouh' },
      { code: 'PTS', name: 'Port Said' },
      { code: 'RED', name: 'Red Sea' },
      { code: 'SHG', name: 'Sohag' },
      { code: 'SHR', name: 'Sharqia' },
      { code: 'SIN', name: 'North Sinai' },
      { code: 'SUZ', name: 'Suez' },
      { code: 'WAD', name: 'New Valley' }
    ]
  },
  {
    code: 'TR',
    name: 'Turkey',
    provinces: [
      { code: '01', name: 'Adana' },
      { code: '02', name: 'Adıyaman' },
      { code: '03', name: 'Afyonkarahisar' },
      { code: '04', name: 'Ağrı' },
      { code: '05', name: 'Amasya' },
      { code: '06', name: 'Ankara' },
      { code: '07', name: 'Antalya' },
      { code: '08', name: 'Artvin' },
      { code: '09', name: 'Aydın' },
      { code: '10', name: 'Balıkesir' },
      { code: '11', name: 'Bilecik' },
      { code: '12', name: 'Bingöl' },
      { code: '13', name: 'Bitlis' },
      { code: '14', name: 'Bolu' },
      { code: '15', name: 'Burdur' },
      { code: '16', name: 'Bursa' },
      { code: '17', name: 'Çanakkale' },
      { code: '18', name: 'Çankırı' },
      { code: '19', name: 'Çorum' },
      { code: '20', name: 'Denizli' },
      { code: '21', name: 'Diyarbakır' },
      { code: '22', name: 'Edirne' },
      { code: '23', name: 'Elazığ' },
      { code: '24', name: 'Erzincan' },
      { code: '25', name: 'Erzurum' },
      { code: '26', name: 'Eskişehir' },
      { code: '27', name: 'Gaziantep' },
      { code: '28', name: 'Giresun' },
      { code: '29', name: 'Gümüşhane' },
      { code: '30', name: 'Hakkâri' },
      { code: '31', name: 'Hatay' },
      { code: '32', name: 'Isparta' },
      { code: '33', name: 'Mersin' },
      { code: '34', name: 'Istanbul' },
      { code: '35', name: 'İzmir' },
      { code: '36', name: 'Kars' },
      { code: '37', name: 'Kastamonu' },
      { code: '38', name: 'Kayseri' },
      { code: '39', name: 'Kırklareli' },
      { code: '40', name: 'Kırşehir' },
      { code: '41', name: 'Kocaeli' },
      { code: '42', name: 'Konya' },
      { code: '43', name: 'Kütahya' },
      { code: '44', name: 'Malatya' },
      { code: '45', name: 'Manisa' },
      { code: '46', name: 'Kahramanmaraş' },
      { code: '47', name: 'Mardin' },
      { code: '48', name: 'Muğla' },
      { code: '49', name: 'Muş' },
      { code: '50', name: 'Nevşehir' },
      { code: '51', name: 'Niğde' },
      { code: '52', name: 'Ordu' },
      { code: '53', name: 'Rize' },
      { code: '54', name: 'Sakarya' },
      { code: '55', name: 'Samsun' },
      { code: '56', name: 'Siirt' },
      { code: '57', name: 'Sinop' },
      { code: '58', name: 'Sivas' },
      { code: '59', name: 'Tekirdağ' },
      { code: '60', name: 'Tokat' },
      { code: '61', name: 'Trabzon' },
      { code: '62', name: 'Tunceli' },
      { code: '63', name: 'Şanlıurfa' },
      { code: '64', name: 'Uşak' },
      { code: '65', name: 'Van' },
      { code: '66', name: 'Yozgat' },
      { code: '67', name: 'Zonguldak' },
      { code: '68', name: 'Aksaray' },
      { code: '69', name: 'Bayburt' },
      { code: '70', name: 'Karaman' },
      { code: '71', name: 'Kırıkkale' },
      { code: '72', name: 'Batman' },
      { code: '73', name: 'Şırnak' },
      { code: '74', name: 'Bartın' },
      { code: '75', name: 'Ardahan' },
      { code: '76', name: 'Iğdır' },
      { code: '77', name: 'Yalova' },
      { code: '78', name: 'Karabük' },
      { code: '79', name: 'Kilis' },
      { code: '80', name: 'Osmaniye' },
      { code: '81', name: 'Düzce' }
    ]
  },
  {
    code: 'SA',
    name: 'Saudi Arabia',
    provinces: [
      { code: 'RI', name: 'Riyadh' },
      { code: 'MK', name: 'Makkah' },
      { code: 'MD', name: 'Madinah' },
      { code: 'QS', name: 'Qassim' },
      { code: 'HA', name: 'Hail' },
      { code: 'AS', name: 'Asir' },
      { code: 'TB', name: 'Tabuk' },
      { code: 'SH', name: 'Northern Borders' },
      { code: 'JZ', name: 'Jazan' },
      { code: 'NJ', name: 'Najran' },
      { code: 'BH', name: 'Al Bahah' },
      { code: 'JF', name: 'Al Jawf' },
      { code: 'EP', name: 'Eastern Province' }
    ]
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    provinces: [
      { code: 'AZ', name: 'Abu Dhabi' },
      { code: 'AJ', name: 'Ajman' },
      { code: 'DU', name: 'Dubai' },
      { code: 'FU', name: 'Fujairah' },
      { code: 'RK', name: 'Ras Al Khaimah' },
      { code: 'SH', name: 'Sharjah' },
      { code: 'UQ', name: 'Umm Al Quwain' }
    ]
  },
  {
    code: 'IL',
    name: 'Israel',
    provinces: [
      { code: 'JM', name: 'Jerusalem' },
      { code: 'ND', name: 'Northern District' },
      { code: 'HZ', name: 'Haifa District' },
      { code: 'CE', name: 'Central District' },
      { code: 'TA', name: 'Tel Aviv District' },
      { code: 'SD', name: 'Southern District' }
    ]
  },
  {
    code: 'TH',
    name: 'Thailand',
    provinces: [
      { code: '10', name: 'Bangkok' },
      { code: '11', name: 'Samut Prakan' },
      { code: '12', name: 'Nonthaburi' },
      { code: '13', name: 'Pathum Thani' },
      { code: '14', name: 'Phra Nakhon Si Ayutthaya' },
      { code: '15', name: 'Ang Thong' },
      { code: '16', name: 'Lopburi' },
      { code: '17', name: 'Sing Buri' },
      { code: '18', name: 'Chai Nat' },
      { code: '19', name: 'Saraburi' },
      { code: '20', name: 'Chonburi' },
      { code: '21', name: 'Rayong' },
      { code: '22', name: 'Chanthaburi' },
      { code: '23', name: 'Trat' },
      { code: '24', name: 'Chachoengsao' },
      { code: '25', name: 'Prachinburi' },
      { code: '26', name: 'Nakhon Nayok' },
      { code: '27', name: 'Sa Kaeo' },
      { code: '30', name: 'Nakhon Ratchasima' },
      { code: '31', name: 'Buriram' },
      { code: '32', name: 'Surin' },
      { code: '33', name: 'Sisaket' },
      { code: '34', name: 'Ubon Ratchathani' },
      { code: '35', name: 'Yasothon' },
      { code: '36', name: 'Chaiyaphum' },
      { code: '37', name: 'Amnat Charoen' },
      { code: '39', name: 'Nong Bua Lamphu' },
      { code: '40', name: 'Khon Kaen' },
      { code: '41', name: 'Udon Thani' },
      { code: '42', name: 'Loei' },
      { code: '43', name: 'Nong Khai' },
      { code: '44', name: 'Maha Sarakham' },
      { code: '45', name: 'Roi Et' },
      { code: '46', name: 'Kalasin' },
      { code: '47', name: 'Sakon Nakhon' },
      { code: '48', name: 'Nakhon Phanom' },
      { code: '49', name: 'Mukdahan' },
      { code: '50', name: 'Chiang Mai' },
      { code: '51', name: 'Lamphun' },
      { code: '52', name: 'Lampang' },
      { code: '53', name: 'Uttaradit' },
      { code: '54', name: 'Phrae' },
      { code: '55', name: 'Nan' },
      { code: '56', name: 'Phayao' },
      { code: '57', name: 'Chiang Rai' },
      { code: '58', name: 'Mae Hong Son' },
      { code: '60', name: 'Nakhon Sawan' },
      { code: '61', name: 'Uthai Thani' },
      { code: '62', name: 'Kamphaeng Phet' },
      { code: '63', name: 'Tak' },
      { code: '64', name: 'Sukhothai' },
      { code: '65', name: 'Phitsanulok' },
      { code: '66', name: 'Phichit' },
      { code: '67', name: 'Phetchabun' },
      { code: '70', name: 'Ratchaburi' },
      { code: '71', name: 'Kanchanaburi' },
      { code: '72', name: 'Suphan Buri' },
      { code: '73', name: 'Nakhon Pathom' },
      { code: '74', name: 'Samut Sakhon' },
      { code: '75', name: 'Samut Songkhram' },
      { code: '76', name: 'Phetchaburi' },
      { code: '77', name: 'Prachuap Khiri Khan' },
      { code: '80', name: 'Nakhon Si Thammarat' },
      { code: '81', name: 'Krabi' },
      { code: '82', name: 'Phang Nga' },
      { code: '83', name: 'Phuket' },
      { code: '84', name: 'Surat Thani' },
      { code: '85', name: 'Ranong' },
      { code: '86', name: 'Chumphon' },
      { code: '90', name: 'Songkhla' },
      { code: '91', name: 'Satun' },
      { code: '92', name: 'Trang' },
      { code: '93', name: 'Phatthalung' },
      { code: '94', name: 'Pattani' },
      { code: '95', name: 'Yala' },
      { code: '96', name: 'Narathiwat' },
      { code: 'S', name: 'Bueng Kan' }
    ]
  },
  {
    code: 'MY',
    name: 'Malaysia',
    provinces: [
      { code: 'JHR', name: 'Johor' },
      { code: 'KDH', name: 'Kedah' },
      { code: 'KTN', name: 'Kelantan' },
      { code: 'KUL', name: 'Kuala Lumpur' },
      { code: 'LBN', name: 'Labuan' },
      { code: 'MLK', name: 'Malacca' },
      { code: 'NSN', name: 'Negeri Sembilan' },
      { code: 'PHG', name: 'Pahang' },
      { code: 'PNG', name: 'Penang' },
      { code: 'PRK', name: 'Perak' },
      { code: 'PLS', name: 'Perlis' },
      { code: 'PJY', name: 'Putrajaya' },
      { code: 'SBH', name: 'Sabah' },
      { code: 'SWK', name: 'Sarawak' },
      { code: 'SGR', name: 'Selangor' },
      { code: 'TRG', name: 'Terengganu' }
    ]
  },
  {
    code: 'SG',
    name: 'Singapore'
  },
  {
    code: 'ID',
    name: 'Indonesia',
    provinces: [
      { code: 'AC', name: 'Aceh' },
      { code: 'SU', name: 'North Sumatra' },
      { code: 'SB', name: 'West Sumatra' },
      { code: 'RI', name: 'Riau' },
      { code: 'KR', name: 'Riau Islands' },
      { code: 'JA', name: 'Jambi' },
      { code: 'SS', name: 'South Sumatra' },
      { code: 'BB', name: 'Bangka Belitung Islands' },
      { code: 'BE', name: 'Bengkulu' },
      { code: 'LA', name: 'Lampung' },
      { code: 'JK', name: 'Jakarta' },
      { code: 'JB', name: 'West Java' },
      { code: 'BT', name: 'Banten' },
      { code: 'JT', name: 'Central Java' },
      { code: 'YO', name: 'Yogyakarta' },
      { code: 'JI', name: 'East Java' },
      { code: 'BA', name: 'Bali' },
      { code: 'NB', name: 'West Nusa Tenggara' },
      { code: 'NT', name: 'East Nusa Tenggara' },
      { code: 'KB', name: 'West Kalimantan' },
      { code: 'KT', name: 'Central Kalimantan' },
      { code: 'KS', name: 'South Kalimantan' },
      { code: 'KI', name: 'East Kalimantan' },
      { code: 'KU', name: 'North Kalimantan' },
      { code: 'SA', name: 'North Sulawesi' },
      { code: 'ST', name: 'Central Sulawesi' },
      { code: 'SN', name: 'South Sulawesi' },
      { code: 'SG', name: 'Southeast Sulawesi' },
      { code: 'GO', name: 'Gorontalo' },
      { code: 'SR', name: 'West Sulawesi' },
      { code: 'MA', name: 'Maluku' },
      { code: 'MU', name: 'North Maluku' },
      { code: 'PA', name: 'Papua' },
      { code: 'PB', name: 'West Papua' }
    ]
  },
  {
    code: 'VN',
    name: 'Vietnam',
    provinces: [
      { code: 'HN', name: 'Hanoi' },
      { code: 'HP', name: 'Hai Phong' },
      { code: 'QN', name: 'Quang Ninh' },
      { code: 'LC', name: 'Lao Cai' },
      { code: 'DT', name: 'Dien Bien' },
      { code: 'LA', name: 'Lai Chau' },
      { code: 'SL', name: 'Son La' },
      { code: 'YB', name: 'Yen Bai' },
      { code: 'HG', name: 'Hoa Binh' },
      { code: 'TQ', name: 'Thai Nguyen' },
      { code: 'LG', name: 'Lang Son' },
      { code: 'BK', name: 'Bac Kan' },
      { code: 'TH', name: 'Thai Binh' },
      { code: 'HY', name: 'Hung Yen' },
      { code: 'HD', name: 'Hai Duong' },
      { code: 'NB', name: 'Ninh Binh' },
      { code: 'NA', name: 'Nam Dinh' },
      { code: 'TN', name: 'Thai Nguyen' },
      { code: 'PY', name: 'Phu Yen' },
      { code: 'BT', name: 'Binh Thuan' },
      { code: 'NT', name: 'Ninh Thuan' },
      { code: 'KH', name: 'Khanh Hoa' },
      { code: 'DL', name: 'Da Lat' },
      { code: 'LM', name: 'Lam Dong' },
      { code: 'BP', name: 'Binh Phuoc' },
      { code: 'TY', name: 'Tay Ninh' },
      { code: 'BD', name: 'Binh Duong' },
      { code: 'DN', name: 'Dong Nai' },
      { code: 'BR', name: 'Ba Ria - Vung Tau' },
      { code: 'HCM', name: 'Ho Chi Minh City' },
      { code: 'LG', name: 'Long An' },
      { code: 'TG', name: 'Tien Giang' },
      { code: 'BT', name: 'Ben Tre' },
      { code: 'TV', name: 'Tra Vinh' },
      { code: 'VL', name: 'Vinh Long' },
      { code: 'DT', name: 'Dong Thap' },
      { code: 'AG', name: 'An Giang' },
      { code: 'KG', name: 'Kien Giang' },
      { code: 'CT', name: 'Can Tho' },
      { code: 'HU', name: 'Hau Giang' },
      { code: 'ST', name: 'Soc Trang' },
      { code: 'BL', name: 'Bac Lieu' },
      { code: 'CM', name: 'Ca Mau' }
    ]
  },
  {
    code: 'PH',
    name: 'Philippines',
    provinces: [
      { code: 'ABR', name: 'Abra' },
      { code: 'AGN', name: 'Agusan del Norte' },
      { code: 'AGS', name: 'Agusan del Sur' },
      { code: 'AKL', name: 'Aklan' },
      { code: 'ALB', name: 'Albay' },
      { code: 'ANT', name: 'Antique' },
      { code: 'APA', name: 'Apayao' },
      { code: 'AUR', name: 'Aurora' },
      { code: 'BAS', name: 'Basilan' },
      { code: 'BAN', name: 'Bataan' },
      { code: 'BTN', name: 'Batanes' },
      { code: 'BTG', name: 'Batangas' },
      { code: 'BEN', name: 'Benguet' },
      { code: 'BIL', name: 'Biliran' },
      { code: 'BOH', name: 'Bohol' },
      { code: 'BUK', name: 'Bukidnon' },
      { code: 'BUL', name: 'Bulacan' },
      { code: 'CAG', name: 'Cagayan' },
      { code: 'CAN', name: 'Camarines Norte' },
      { code: 'CAS', name: 'Camarines Sur' },
      { code: 'CAM', name: 'Camiguin' },
      { code: 'CAP', name: 'Capiz' },
      { code: 'CAT', name: 'Catanduanes' },
      { code: 'CAV', name: 'Cavite' },
      { code: 'CEB', name: 'Cebu' },
      { code: 'COM', name: 'Compostela Valley' },
      { code: 'NCO', name: 'Cotabato' },
      { code: 'DAV', name: 'Davao del Norte' },
      { code: 'DAS', name: 'Davao del Sur' },
      { code: 'DAC', name: 'Davao Occidental' },
      { code: 'DAO', name: 'Davao Oriental' },
      { code: 'DIN', name: 'Dinagat Islands' },
      { code: 'EAS', name: 'Eastern Samar' },
      { code: 'GUI', name: 'Guimaras' },
      { code: 'IFU', name: 'Ifugao' },
      { code: 'ILN', name: 'Ilocos Norte' },
      { code: 'ILS', name: 'Ilocos Sur' },
      { code: 'ILI', name: 'Iloilo' },
      { code: 'ISA', name: 'Isabela' },
      { code: 'KAL', name: 'Kalinga' },
      { code: 'LUN', name: 'La Union' },
      { code: 'LAG', name: 'Laguna' },
      { code: 'LAN', name: 'Lanao del Norte' },
      { code: 'LAS', name: 'Lanao del Sur' },
      { code: 'LEY', name: 'Leyte' },
      { code: 'MAG', name: 'Maguindanao' },
      { code: 'MAR', name: 'Marinduque' },
      { code: 'MAS', name: 'Masbate' },
      { code: 'MSC', name: 'Misamis Occidental' },
      { code: 'MSR', name: 'Misamis Oriental' },
      { code: 'MOU', name: 'Mountain Province' },
      { code: 'NEC', name: 'Negros Occidental' },
      { code: 'NER', name: 'Negros Oriental' },
      { code: 'NCT', name: 'National Capital Region' },
      { code: 'NSA', name: 'Northern Samar' },
      { code: 'NUE', name: 'Nueva Ecija' },
      { code: 'NUV', name: 'Nueva Vizcaya' },
      { code: 'MDC', name: 'Occidental Mindoro' },
      { code: 'MDR', name: 'Oriental Mindoro' },
      { code: 'PLW', name: 'Palawan' },
      { code: 'PAM', name: 'Pampanga' },
      { code: 'PAN', name: 'Pangasinan' },
      { code: 'QUE', name: 'Quezon' },
      { code: 'QUI', name: 'Quirino' },
      { code: 'RIZ', name: 'Rizal' },
      { code: 'ROM', name: 'Romblon' },
      { code: 'WSA', name: 'Samar' },
      { code: 'SAR', name: 'Sarangani' },
      { code: 'SIQ', name: 'Siquijor' },
      { code: 'SOR', name: 'Sorsogon' },
      { code: 'SCO', name: 'South Cotabato' },
      { code: 'SLE', name: 'Southern Leyte' },
      { code: 'SUK', name: 'Sultan Kudarat' },
      { code: 'SLU', name: 'Sulu' },
      { code: 'SUN', name: 'Surigao del Norte' },
      { code: 'SUR', name: 'Surigao del Sur' },
      { code: 'TAR', name: 'Tarlac' },
      { code: 'TAW', name: 'Tawi-Tawi' },
      { code: 'ZMB', name: 'Zambales' },
      { code: 'ZAN', name: 'Zamboanga del Norte' },
      { code: 'ZAS', name: 'Zamboanga del Sur' },
      { code: 'ZSI', name: 'Zamboanga Sibugay' }
    ]
  },
  {
    code: 'PL',
    name: 'Poland',
    provinces: [
      { code: 'DS', name: 'Lower Silesian' },
      { code: 'KP', name: 'Kuyavian-Pomeranian' },
      { code: 'LU', name: 'Lublin' },
      { code: 'LB', name: 'Lubusz' },
      { code: 'LD', name: 'Łódź' },
      { code: 'MA', name: 'Lesser Poland' },
      { code: 'MZ', name: 'Masovian' },
      { code: 'OP', name: 'Opole' },
      { code: 'PK', name: 'Subcarpathian' },
      { code: 'PD', name: 'Podlaskie' },
      { code: 'PM', name: 'Pomeranian' },
      { code: 'SL', name: 'Silesian' },
      { code: 'SK', name: 'Holy Cross' },
      { code: 'WN', name: 'Warmian-Masurian' },
      { code: 'WP', name: 'Greater Poland' },
      { code: 'ZP', name: 'West Pomeranian' }
    ]
  },
  {
    code: 'CZ',
    name: 'Czech Republic',
    provinces: [
      { code: 'JC', name: 'South Bohemian' },
      { code: 'JM', name: 'South Moravian' },
      { code: 'KA', name: 'Karlovy Vary' },
      { code: 'KR', name: 'Hradec Králové' },
      { code: 'LI', name: 'Liberec' },
      { code: 'MO', name: 'Moravian-Silesian' },
      { code: 'OL', name: 'Olomouc' },
      { code: 'PA', name: 'Pardubice' },
      { code: 'PL', name: 'Plzeň' },
      { code: 'PR', name: 'Prague' },
      { code: 'ST', name: 'Central Bohemian' },
      { code: 'US', name: 'Ústí nad Labem' },
      { code: 'VY', name: 'Vysočina' },
      { code: 'ZL', name: 'Zlín' }
    ]
  },
  {
    code: 'HU',
    name: 'Hungary',
    provinces: [
      { code: 'BK', name: 'Bács-Kiskun' },
      { code: 'BA', name: 'Baranya' },
      { code: 'BE', name: 'Békés' },
      { code: 'BZ', name: 'Borsod-Abaúj-Zemplén' },
      { code: 'BU', name: 'Budapest' },
      { code: 'CS', name: 'Csongrád' },
      { code: 'FE', name: 'Fejér' },
      { code: 'GS', name: 'Győr-Moson-Sopron' },
      { code: 'HB', name: 'Hajdú-Bihar' },
      { code: 'HE', name: 'Heves' },
      { code: 'JN', name: 'Jász-Nagykun-Szolnok' },
      { code: 'KE', name: 'Komárom-Esztergom' },
      { code: 'NO', name: 'Nógrád' },
      { code: 'PE', name: 'Pest' },
      { code: 'SO', name: 'Somogy' },
      { code: 'SZ', name: 'Szabolcs-Szatmár-Bereg' },
      { code: 'TO', name: 'Tolna' },
      { code: 'VA', name: 'Vas' },
      { code: 'VE', name: 'Veszprém' },
      { code: 'ZA', name: 'Zala' }
    ]
  },
  {
    code: 'RO',
    name: 'Romania',
    provinces: [
      { code: 'AB', name: 'Alba' },
      { code: 'AR', name: 'Arad' },
      { code: 'AG', name: 'Argeș' },
      { code: 'BC', name: 'Bacău' },
      { code: 'BH', name: 'Bihor' },
      { code: 'BN', name: 'Bistrița-Năsăud' },
      { code: 'BT', name: 'Botoșani' },
      { code: 'BV', name: 'Brașov' },
      { code: 'BR', name: 'Brăila' },
      { code: 'B', name: 'Bucharest' },
      { code: 'BZ', name: 'Buzău' },
      { code: 'CS', name: 'Caraș-Severin' },
      { code: 'CL', name: 'Călărași' },
      { code: 'CJ', name: 'Cluj' },
      { code: 'CT', name: 'Constanța' },
      { code: 'CV', name: 'Covasna' },
      { code: 'DB', name: 'Dâmbovița' },
      { code: 'DJ', name: 'Dolj' },
      { code: 'GL', name: 'Galați' },
      { code: 'GR', name: 'Giurgiu' },
      { code: 'GJ', name: 'Gorj' },
      { code: 'HR', name: 'Harghita' },
      { code: 'HD', name: 'Hunedoara' },
      { code: 'IL', name: 'Ialomița' },
      { code: 'IS', name: 'Iași' },
      { code: 'IF', name: 'Ilfov' },
      { code: 'MM', name: 'Maramureș' },
      { code: 'MH', name: 'Mehedinți' },
      { code: 'MS', name: 'Mureș' },
      { code: 'NT', name: 'Neamț' },
      { code: 'OT', name: 'Olt' },
      { code: 'PH', name: 'Prahova' },
      { code: 'SM', name: 'Satu Mare' },
      { code: 'SJ', name: 'Sălaj' },
      { code: 'SB', name: 'Sibiu' },
      { code: 'SV', name: 'Suceava' },
      { code: 'TR', name: 'Teleorman' },
      { code: 'TM', name: 'Timiș' },
      { code: 'TL', name: 'Tulcea' },
      { code: 'VS', name: 'Vaslui' },
      { code: 'VL', name: 'Vâlcea' },
      { code: 'VN', name: 'Vrancea' }
    ]
  },
  {
    code: 'GR',
    name: 'Greece',
    provinces: [
      { code: 'A', name: 'Attica' },
      { code: 'I', name: 'Aegean' },
      { code: 'II', name: 'Peloponnese' },
      { code: 'III', name: 'Central Greece' },
      { code: 'IV', name: 'Thessaly' },
      { code: 'V', name: 'Epirus' },
      { code: 'VI', name: 'Ionian Islands' },
      { code: 'VII', name: 'Western Greece' },
      { code: 'VIII', name: 'Central Macedonia' },
      { code: 'IX', name: 'Crete' },
      { code: 'X', name: 'Eastern Macedonia and Thrace' },
      { code: 'XI', name: 'Western Macedonia' },
      { code: 'XII', name: 'Northern Aegean' },
      { code: 'XIII', name: 'Southern Aegean' }
    ]
  },
  {
    code: 'PT',
    name: 'Portugal',
    provinces: [
      { code: '01', name: 'Aveiro' },
      { code: '02', name: 'Beja' },
      { code: '03', name: 'Braga' },
      { code: '04', name: 'Bragança' },
      { code: '05', name: 'Castelo Branco' },
      { code: '06', name: 'Coimbra' },
      { code: '07', name: 'Évora' },
      { code: '08', name: 'Faro' },
      { code: '09', name: 'Guarda' },
      { code: '10', name: 'Leiria' },
      { code: '11', name: 'Lisboa' },
      { code: '12', name: 'Portalegre' },
      { code: '13', name: 'Porto' },
      { code: '14', name: 'Santarém' },
      { code: '15', name: 'Setúbal' },
      { code: '16', name: 'Viana do Castelo' },
      { code: '17', name: 'Vila Real' },
      { code: '18', name: 'Viseu' },
      { code: '20', name: 'Azores' },
      { code: '30', name: 'Madeira' }
    ]
  },
  {
    code: 'IE',
    name: 'Ireland',
    provinces: [
      { code: 'CW', name: 'Carlow' },
      { code: 'CN', name: 'Cavan' },
      { code: 'CE', name: 'Clare' },
      { code: 'CO', name: 'Cork' },
      { code: 'DL', name: 'Donegal' },
      { code: 'D', name: 'Dublin' },
      { code: 'G', name: 'Galway' },
      { code: 'KY', name: 'Kerry' },
      { code: 'KE', name: 'Kildare' },
      { code: 'KK', name: 'Kilkenny' },
      { code: 'LS', name: 'Laois' },
      { code: 'LM', name: 'Leitrim' },
      { code: 'LK', name: 'Limerick' },
      { code: 'LD', name: 'Longford' },
      { code: 'LH', name: 'Louth' },
      { code: 'MO', name: 'Mayo' },
      { code: 'MH', name: 'Meath' },
      { code: 'MN', name: 'Monaghan' },
      { code: 'OY', name: 'Offaly' },
      { code: 'RN', name: 'Roscommon' },
      { code: 'SO', name: 'Sligo' },
      { code: 'TA', name: 'Tipperary' },
      { code: 'WD', name: 'Waterford' },
      { code: 'WH', name: 'Westmeath' },
      { code: 'WX', name: 'Wexford' },
      { code: 'WW', name: 'Wicklow' }
    ]
  }
];

export const getProvinceByCode = (countryCode: string, provinceCode: string): Province | undefined => {
  const country = getCountryByCode(countryCode);
  if (!country || !country.provinces) {
    return undefined;
  }
  
  return country.provinces.find(province => province.code === provinceCode);
};

export const getCountriesWithProvinces = (): Country[] => {
  return countries.filter(country => country.provinces && country.provinces.length > 0);
};

export const getCountriesWithoutProvinces = (): Country[] => {
  return countries.filter(country => !country.provinces || country.provinces.length === 0);
};

export const searchCountries = (query: string): Country[] => {
  const lowercaseQuery = query.toLowerCase();
  return countries.filter(country => 
    country.name.toLowerCase().includes(lowercaseQuery) ||
    country.code.toLowerCase().includes(lowercaseQuery)
  );
};

export const searchProvinces = (countryCode: string, query: string): Province[] => {
  const country = getCountryByCode(countryCode);
  if (!country || !country.provinces) {
    return [];
  }
  
  const lowercaseQuery = query.toLowerCase();
  return country.provinces.filter(province =>
    province.name.toLowerCase().includes(lowercaseQuery) ||
    province.code.toLowerCase().includes(lowercaseQuery)
  );
};

export const getCommonTaxTypes = (): string[] => {
  return ['VAT', 'GST', 'Sales Tax', 'IVA', 'Consumption Tax'];
};

export const getTaxTypesByRegion = (region: 'EU' | 'NA' | 'APAC' | 'LATAM' | 'MEA'): string[] => {
  const regionTaxTypes = {
    EU: ['VAT', 'Excise Tax', 'Customs Duty', 'Environmental Tax'],
    NA: ['Sales Tax', 'GST', 'HST', 'PST', 'State Tax', 'Local Tax'],
    APAC: ['GST', 'VAT', 'Consumption Tax', 'Service Tax'],
    LATAM: ['IVA', 'ICMS', 'IPI', 'ISS', 'IEPS'],
    MEA: ['VAT', 'Customs Duty', 'Excise Tax', 'Service Tax']
  };
  
  return regionTaxTypes[region] || [];
};

export const getCountryRegion = (countryCode: string): string => {
  const regionMap: { [key: string]: string } = {
    // North America
    'US': 'NA', 'CA': 'NA', 'MX': 'NA', 'GT': 'NA', 'BZ': 'NA', 'SV': 'NA', 'HN': 'NA', 
    'NI': 'NA', 'CR': 'NA', 'PA': 'NA', 'CU': 'NA', 'JM': 'NA', 'HT': 'NA', 'DO': 'NA', 
    'PR': 'NA', 'TT': 'NA', 'BB': 'NA', 'BS': 'NA', 'DM': 'NA', 'GD': 'NA', 'KN': 'NA', 
    'LC': 'NA', 'VC': 'NA', 'AG': 'NA', 'AI': 'NA', 'BM': 'NA', 'VG': 'NA', 'KY': 'NA', 
    'MS': 'NA', 'TC': 'NA', 'VI': 'NA', 'GL': 'NA',
    
    // South America
    'BR': 'LATAM', 'AR': 'LATAM', 'CL': 'LATAM', 'PE': 'LATAM', 'EC': 'LATAM', 'CO': 'LATAM', 
    'VE': 'LATAM', 'GY': 'LATAM', 'SR': 'LATAM', 'GF': 'LATAM', 'UY': 'LATAM', 'PY': 'LATAM', 
    'BO': 'LATAM', 'FK': 'LATAM',
    
    // Europe
    'GB': 'EU', 'IE': 'EU', 'IS': 'EU', 'NO': 'EU', 'SE': 'EU', 'FI': 'EU', 'DK': 'EU', 
    'EE': 'EU', 'LV': 'EU', 'LT': 'EU', 'PL': 'EU', 'DE': 'EU', 'NL': 'EU', 'BE': 'EU', 
    'LU': 'EU', 'FR': 'EU', 'CH': 'EU', 'AT': 'EU', 'LI': 'EU', 'IT': 'EU', 'SM': 'EU', 
    'VA': 'EU', 'MT': 'EU', 'ES': 'EU', 'AD': 'EU', 'PT': 'EU', 'MC': 'EU', 'SI': 'EU', 
    'HR': 'EU', 'BA': 'EU', 'ME': 'EU', 'RS': 'EU', 'XK': 'EU', 'AL': 'EU', 'MK': 'EU', 
    'BG': 'EU', 'RO': 'EU', 'MD': 'EU', 'UA': 'EU', 'BY': 'EU', 'RU': 'EU', 'GE': 'EU', 
    'AM': 'EU', 'AZ': 'EU', 'TR': 'EU', 'CY': 'EU', 'GR': 'EU', 'CZ': 'EU', 'SK': 'EU', 
    'HU': 'EU', 'FO': 'EU', 'SJ': 'EU', 'AX': 'EU', 'GI': 'EU', 'JE': 'EU', 'GG': 'EU', 
    'IM': 'EU',
    
    // Africa
    'MA': 'MEA', 'DZ': 'MEA', 'TN': 'MEA', 'LY': 'MEA', 'EG': 'MEA', 'SD': 'MEA', 'SS': 'MEA', 
    'ET': 'MEA', 'ER': 'MEA', 'DJ': 'MEA', 'SO': 'MEA', 'KE': 'MEA', 'UG': 'MEA', 'TZ': 'MEA', 
    'RW': 'MEA', 'BI': 'MEA', 'MZ': 'MEA', 'MW': 'MEA', 'ZM': 'MEA', 'ZW': 'MEA', 'BW': 'MEA', 
    'NA': 'MEA', 'ZA': 'MEA', 'LS': 'MEA', 'SZ': 'MEA', 'MG': 'MEA', 'MU': 'MEA', 'SC': 'MEA', 
    'KM': 'MEA', 'AO': 'MEA', 'CD': 'MEA', 'CG': 'MEA', 'CF': 'MEA', 'CM': 'MEA', 'GQ': 'MEA', 
    'GA': 'MEA', 'ST': 'MEA', 'TD': 'MEA', 'NE': 'MEA', 'NG': 'MEA', 'BJ': 'MEA', 'TG': 'MEA', 
    'GH': 'MEA', 'BF': 'MEA', 'CI': 'MEA', 'LR': 'MEA', 'SL': 'MEA', 'GN': 'MEA', 'GW': 'MEA', 
    'SN': 'MEA', 'GM': 'MEA', 'ML': 'MEA', 'MR': 'MEA', 'CV': 'MEA', 'YT': 'MEA', 'RE': 'MEA', 
    'SH': 'MEA', 'EH': 'MEA',
    
    // Middle East
    'IL': 'MEA', 'PS': 'MEA', 'LB': 'MEA', 'SY': 'MEA', 'JO': 'MEA', 'IQ': 'MEA', 'KW': 'MEA', 
    'SA': 'MEA', 'BH': 'MEA', 'QA': 'MEA', 'AE': 'MEA', 'OM': 'MEA', 'YE': 'MEA', 'IR': 'MEA',
    
    // Asia Pacific
    'AF': 'APAC', 'PK': 'APAC', 'IN': 'APAC', 'LK': 'APAC', 'MV': 'APAC', 'NP': 'APAC', 
    'BT': 'APAC', 'BD': 'APAC', 'MM': 'APAC', 'TH': 'APAC', 'LA': 'APAC', 'VN': 'APAC', 
    'KH': 'APAC', 'MY': 'APAC', 'SG': 'APAC', 'BN': 'APAC', 'ID': 'APAC', 'TL': 'APAC', 
    'PH': 'APAC', 'TW': 'APAC', 'CN': 'APAC', 'HK': 'APAC', 'MO': 'APAC', 'MN': 'APAC', 
    'KP': 'APAC', 'KR': 'APAC', 'JP': 'APAC', 'KZ': 'APAC', 'KG': 'APAC', 'TJ': 'APAC', 
    'UZ': 'APAC', 'TM': 'APAC',
    
    // Oceania
    'AU': 'APAC', 'NZ': 'APAC', 'FJ': 'APAC', 'PG': 'APAC', 'SB': 'APAC', 'VU': 'APAC', 
    'NC': 'APAC', 'PF': 'APAC', 'WS': 'APAC', 'TO': 'APAC', 'TV': 'APAC', 'KI': 'APAC', 
    'NR': 'APAC', 'MH': 'APAC', 'FM': 'APAC', 'PW': 'APAC', 'CK': 'APAC', 'NU': 'APAC', 
    'TK': 'APAC', 'AS': 'APAC', 'GU': 'APAC', 'MP': 'APAC', 'WF': 'APAC',
    
    // Caribbean and Other Territories
    'GP': 'LATAM', 'MQ': 'LATAM', 'BL': 'LATAM', 'MF': 'LATAM', 'PM': 'NA', 'AW': 'LATAM', 
    'CW': 'LATAM', 'SX': 'LATAM', 'BQ': 'LATAM', 'IO': 'APAC', 'PN': 'APAC', 'UM': 'APAC',
    
    // Antarctica
    'AQ': 'Other'
  };
  
  return regionMap[countryCode] || 'Other';
};

export const taxNameOptions = [
  // Note: This is now deprecated. Use TaxAPI.getAvailableTaxTypes() instead
  // for dynamic tax types from the database
  { value: 'VAT', label: 'VAT (Value Added Tax)' },
  { value: 'GST', label: 'GST (Goods and Services Tax)' },
  { value: 'Sales Tax', label: 'Sales Tax' },
  { value: 'IVA', label: 'IVA (Impuesto al Valor Agregado)' },
  { value: 'HST', label: 'HST (Harmonized Sales Tax)' },
  { value: 'PST', label: 'PST (Provincial Sales Tax)' },
  { value: 'QST', label: 'QST (Quebec Sales Tax)' },
  { value: 'Other', label: 'Other' }
];

/**
 * @deprecated Use TaxAPI.getAvailableTaxTypes() instead
 * This function returns hardcoded tax types and should be replaced
 * with dynamic data from the database
 */
export const getTaxNameOptions = () => {
  console.warn('getTaxNameOptions() is deprecated. Use TaxAPI.getAvailableTaxTypes() instead.');
  return taxNameOptions;
};