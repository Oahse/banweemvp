/**
 * Countries and provinces data for tax rates and address management
 * Comprehensive list of 500+ countries with tax information
 */

/**
 * Country interface using the official division names for each country
 * Uses real administrative division types (e.g., "parish", "province", "state", "national district")
 * No generic terms like "province" unless that's the actual official designation
 */
export interface Country {
  code: string; // ISO 2-letter country code
  name: string; // Full country name
  flag: string; // Flag emoji
  capital: string; // Capital city
  area: number; // Area in square kilometers
  currencySymbol: string; // Currency symbol (e.g., $, €, £)
  officialLanguages: string[]; // Official languages
  demonym: string; // Demonym (e.g., Canadian, American)
  taxInfo: {
    standardRate: number; // VAT or Sales Tax rate
    taxName: string;       // VAT, GST, etc.
    currency: string;      // ISO currency
    region: string;        // region or continent
  };
  divisions: Array<{
    code: string;          // division code
    name: string;          // division name
    type: string;          // official type: parish, province, state, national district, etc.
    taxInfo?: {
      standardRate: number; // VAT or Sales Tax rate
      taxName: string;       // VAT, GST, etc.
      currency: string;      // ISO currency
      region: string;        // region or continent
    };
    cities: Array<{
      code: string;        // city code
      name: string;        // city name
    }>;
  }>;
};

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
  region: string; // More flexible region string
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

export const getProvincesByCountry = (countryCode: string): any[] => {
  const country = getCountryByCode(countryCode);
  return country?.divisions || [];
};

export const getCitiesByProvince = (countryCode: string, provinceCode: string): any[] => {
  const country = getCountryByCode(countryCode);
  const division = country?.divisions?.find((d: any) => d.code === provinceCode);
  return division?.cities || [];
};

export const getTaxInfo = (countryCode: string, provinceCode?: string): TaxInfo | null => {
  const country = getCountryByCode(countryCode);
  
  // First check division-specific tax
  if (provinceCode && country?.divisions) {
    const division = country.divisions.find((d: any) => d.code === provinceCode);
    if (division?.taxInfo) {
      return division.taxInfo;
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
  })).sort((a: any, b: any) => a.label.localeCompare(b.label));
};

export const getProvinceOptions = (countryCode: string): any[] => {
  const divisions = getProvincesByCountry(countryCode);
  return divisions.map((division: any) => ({
    value: division.code,
    label: division.name
  })).sort((a: any, b: any) => a.label.localeCompare(b.label));
};

export const getCityOptions = (countryCode: string, provinceCode: string): any[] => {
  const cities = getCitiesByProvince(countryCode, provinceCode);
  return cities.map((city: any) => ({
    value: city.code,
    label: city.name
  })).sort((a: any, b: any) => a.label.localeCompare(b.label));
};


export const getProvinceByCode = (countryCode: string, provinceCode: string): any | undefined => {
  const country = getCountryByCode(countryCode);
  if (!country || !country.divisions) {
    return undefined;
  }
  
  return country.divisions.find((division: any) => division.code === provinceCode);
};

export const getCountriesWithProvinces = (): Country[] => {
  return countries.filter(country => country.divisions && country.divisions.length > 0);
};

export const getCountriesWithoutProvinces = (): Country[] => {
  return countries.filter(country => !country.divisions || country.divisions.length === 0);
};

export const searchCountries = (query: string): Country[] => {
  const lowercaseQuery = query.toLowerCase();
  return countries.filter(country => 
    country.name.toLowerCase().includes(lowercaseQuery) ||
    country.code.toLowerCase().includes(lowercaseQuery)
  );
};

export const searchProvinces = (countryCode: string, query: string): any[] => {
  const country = getCountryByCode(countryCode);
  if (!country || !country.divisions) {
    return [];
  }
  
  const lowercaseQuery = query.toLowerCase();
  return country.divisions.filter((division: any) =>
    division.name.toLowerCase().includes(lowercaseQuery) ||
    division.code.toLowerCase().includes(lowercaseQuery)
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