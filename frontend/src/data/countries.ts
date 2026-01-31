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
    code: 'US',
    name: 'United States',
    provinces: [
      { code: 'AL', name: 'Alabama' },
      { code: 'AK', name: 'Alaska' },
      { code: 'AZ', name: 'Arizona' },
      { code: 'AR', name: 'Arkansas' },
      { code: 'CA', name: 'California', 
        taxInfo: { standardRate: 8.75, taxName: 'Sales Tax', currency: 'USD', region: 'NA' },
        cities: [
          { code: 'LA', name: 'Los Angeles' },
          { code: 'SF', name: 'San Francisco' },
          { code: 'SD', name: 'San Diego' },
          { code: 'SJ', name: 'San Jose' },
          { code: 'SA', name: 'Sacramento' },
          { code: 'FR', name: 'Fresno' },
          { code: 'LB', name: 'Long Beach' },
          { code: 'OA', name: 'Oakland' },
          { code: 'BK', name: 'Bakersfield' },
          { code: 'AN', name: 'Anaheim' }
        ]
      },
      { code: 'NY', name: 'New York',
        cities: [
          { code: 'NYC', name: 'New York City' },
          { code: 'BU', name: 'Buffalo' },
          { code: 'RO', name: 'Rochester' },
          { code: 'YO', name: 'Yonkers' },
          { code: 'SY', name: 'Syracuse' },
          { code: 'AL', name: 'Albany' },
          { code: 'NR', name: 'New Rochelle' },
          { code: 'MT', name: 'Mount Vernon' },
          { code: 'SC', name: 'Schenectady' },
          { code: 'UT', name: 'Utica' }
        ]
      },
      { code: 'TX', name: 'Texas',
        cities: [
          { code: 'HO', name: 'Houston' },
          { code: 'DA', name: 'Dallas' },
          { code: 'SA', name: 'San Antonio' },
          { code: 'AU', name: 'Austin' },
          { code: 'FO', name: 'Fort Worth' },
          { code: 'EL', name: 'El Paso' },
          { code: 'AR', name: 'Arlington' },
          { code: 'CO', name: 'Corpus Christi' },
          { code: 'PL', name: 'Plano' },
          { code: 'LI', name: 'Laredo' }
        ]
      },
      { code: 'FL', name: 'Florida',
        cities: [
          { code: 'MI', name: 'Miami' },
          { code: 'TA', name: 'Tampa' },
          { code: 'OR', name: 'Orlando' },
          { code: 'JA', name: 'Jacksonville' },
          { code: 'ST', name: 'St. Petersburg' },
          { code: 'HI', name: 'Hialeah' },
          { code: 'TA2', name: 'Tallahassee' },
          { code: 'FO', name: 'Fort Lauderdale' },
          { code: 'PO', name: 'Port St. Lucie' },
          { code: 'CA', name: 'Cape Coral' }
        ]
      },
      { code: 'CO', name: 'Colorado', taxInfo: { standardRate: 2.9, taxName: 'Sales Tax', currency: 'USD', region: 'NA' } },
      { code: 'CT', name: 'Connecticut', taxInfo: { standardRate: 6.35, taxName: 'Sales Tax', currency: 'USD', region: 'NA' } },
      { code: 'DE', name: 'Delaware' },
      { code: 'GA', name: 'Georgia' },
      { code: 'HI', name: 'Hawaii' },
      { code: 'ID', name: 'Idaho' },
      { code: 'IL', name: 'Illinois' },
      { code: 'IN', name: 'Indiana' },
      { code: 'IA', name: 'Iowa' },
      { code: 'KS', name: 'Kansas' },
      { code: 'KY', name: 'Kentucky' },
      { code: 'LA', name: 'Louisiana' },
      { code: 'ME', name: 'Maine' },
      { code: 'MD', name: 'Maryland' },
      { code: 'MA', name: 'Massachusetts' },
      { code: 'MI', name: 'Michigan' },
      { code: 'MN', name: 'Minnesota' },
      { code: 'MS', name: 'Mississippi' },
      { code: 'MO', name: 'Missouri' },
      { code: 'MT', name: 'Montana' },
      { code: 'NE', name: 'Nebraska' },
      { code: 'NV', name: 'Nevada' },
      { code: 'NH', name: 'New Hampshire' },
      { code: 'NJ', name: 'New Jersey' },
      { code: 'NM', name: 'New Mexico' },
      { code: 'NY', name: 'New York' },
      { code: 'NC', name: 'North Carolina' },
      { code: 'ND', name: 'North Dakota' },
      { code: 'OH', name: 'Ohio' },
      { code: 'OK', name: 'Oklahoma' },
      { code: 'OR', name: 'Oregon' },
      { code: 'PA', name: 'Pennsylvania' },
      { code: 'RI', name: 'Rhode Island' },
      { code: 'SC', name: 'South Carolina' },
      { code: 'SD', name: 'South Dakota' },
      { code: 'TN', name: 'Tennessee' },
      { code: 'TX', name: 'Texas' },
      { code: 'UT', name: 'Utah' },
      { code: 'VT', name: 'Vermont' },
      { code: 'VA', name: 'Virginia' },
      { code: 'WA', name: 'Washington' },
      { code: 'WV', name: 'West Virginia' },
      { code: 'WI', name: 'Wisconsin' },
      { code: 'WY', name: 'Wyoming' },
      { code: 'DC', name: 'District of Columbia' }
    ]
  },
  {
    code: 'CA',
    name: 'Canada',
    taxInfo: { standardRate: 5, taxName: 'GST', currency: 'CAD', region: 'NA' },
    provinces: [
      { code: 'AB', name: 'Alberta', 
        taxInfo: { standardRate: 5, taxName: 'GST', currency: 'CAD', region: 'NA' },
        cities: [
          { code: 'CG', name: 'Calgary' },
          { code: 'ED', name: 'Edmonton' },
          { code: 'RD', name: 'Red Deer' },
          { code: 'LR', name: 'Lethbridge' },
          { code: 'GR', name: 'Grande Prairie' },
          { code: 'ME', name: 'Medicine Hat' },
          { code: 'AY', name: 'Airdrie' },
          { code: 'SP', name: 'Spruce Grove' },
          { code: 'LE', name: 'Leduc' },
          { code: 'VE', name: 'Vermilion' }
        ]
      },
      { code: 'BC', name: 'British Columbia', 
        taxInfo: { standardRate: 12, taxName: 'GST + PST', currency: 'CAD', region: 'NA' },
        cities: [
          { code: 'VA', name: 'Vancouver' },
          { code: 'VI', name: 'Victoria' },
          { code: 'SU', name: 'Surrey' },
          { code: 'BU', name: 'Burnaby' },
          { code: 'RI', name: 'Richmond' },
          { code: 'AB', name: 'Abbotsford' },
          { code: 'CO', name: 'Coquitlam' },
          { code: 'KE', name: 'Kelowna' },
          { code: 'SA', name: 'Saanich' },
          { code: 'LA', name: 'Langley' }
        ]
      },
      { code: 'ON', name: 'Ontario', 
        taxInfo: { standardRate: 13, taxName: 'HST', currency: 'CAD', region: 'NA' },
        cities: [
          { code: 'TO', name: 'Toronto' },
          { code: 'OT', name: 'Ottawa' },
          { code: 'MI', name: 'Mississauga' },
          { code: 'BR', name: 'Brampton' },
          { code: 'HA', name: 'Hamilton' },
          { code: 'LO', name: 'London' },
          { code: 'MA', name: 'Markham' },
          { code: 'WI', name: 'Windsor' },
          { code: 'KI', name: 'Kitchener' },
          { code: 'VA2', name: 'Vaughan' }
        ]
      },
      { code: 'QC', name: 'Quebec', 
        taxInfo: { standardRate: 14.975, taxName: 'GST + QST', currency: 'CAD', region: 'NA' },
        cities: [
          { code: 'MO', name: 'Montreal' },
          { code: 'QU', name: 'Quebec City' },
          { code: 'LA', name: 'Laval' },
          { code: 'GA', name: 'Gatineau' },
          { code: 'LO', name: 'Longueuil' },
          { code: 'SH', name: 'Sherbrooke' },
          { code: 'SA', name: 'Saguenay' },
          { code: 'LE', name: 'Levis' },
          { code: 'TR', name: 'Trois-Rivières' },
          { code: 'TE', name: 'Terrebonne' }
        ]
      },
      { code: 'SK', name: 'Saskatchewan' },
      { code: 'NT', name: 'Northwest Territories' },
      { code: 'NU', name: 'Nunavut' },
      { code: 'YT', name: 'Yukon' }
    ]
  },
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
  { code: 'GT', name: 'Guatemala' },
  { code: 'BZ', name: 'Belize' },
  { code: 'SV', name: 'El Salvador' },
  { code: 'HN', name: 'Honduras' },
  { code: 'NI', name: 'Nicaragua' },
  { code: 'CR', name: 'Costa Rica' },
  { code: 'PA', name: 'Panama' },
  { code: 'CU', name: 'Cuba' },
  { code: 'JM', name: 'Jamaica' },
  { code: 'HT', name: 'Haiti' },
  { code: 'DO', name: 'Dominican Republic' },
  { code: 'PR', name: 'Puerto Rico' },
  { code: 'TT', name: 'Trinidad and Tobago' },
  { code: 'BB', name: 'Barbados' },
  { code: 'BS', name: 'Bahamas' },
  { code: 'DM', name: 'Dominica' },
  { code: 'GD', name: 'Grenada' },
  { code: 'KN', name: 'Saint Kitts and Nevis' },
  { code: 'LC', name: 'Saint Lucia' },
  { code: 'VC', name: 'Saint Vincent and the Grenadines' },
  { code: 'AG', name: 'Antigua and Barbuda' },

  // Africa - Comprehensive list with tax information
  { code: 'NG', name: 'Nigeria', taxInfo: { standardRate: 7.5, taxName: 'VAT', currency: 'NGN', region: 'MEA' } },
  { code: 'ZA', name: 'South Africa', taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'ZAR', region: 'MEA' } },
  { code: 'EG', name: 'Egypt', taxInfo: { standardRate: 14, taxName: 'VAT', currency: 'EGP', region: 'MEA' } },
  { code: 'KE', name: 'Kenya', taxInfo: { standardRate: 16, taxName: 'VAT', currency: 'KES', region: 'MEA' } },
  { code: 'GH', name: 'Ghana', taxInfo: { standardRate: 12.5, taxName: 'VAT', currency: 'GHS', region: 'MEA' } },
  { code: 'MA', name: 'Morocco', taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'MAD', region: 'MEA' } },
  { code: 'TN', name: 'Tunisia', taxInfo: { standardRate: 19, taxName: 'VAT', currency: 'TND', region: 'MEA' } },
  { code: 'DZ', name: 'Algeria', taxInfo: { standardRate: 19, taxName: 'VAT', currency: 'DZD', region: 'MEA' } },
  { code: 'ET', name: 'Ethiopia', taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'ETB', region: 'MEA' } },
  { code: 'TZ', name: 'Tanzania', taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'TZS', region: 'MEA' } },
  { code: 'UG', name: 'Uganda', taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'UGX', region: 'MEA' } },
  { code: 'ZM', name: 'Zambia', taxInfo: { standardRate: 16, taxName: 'VAT', currency: 'ZMW', region: 'MEA' } },
  { code: 'ZW', name: 'Zimbabwe', taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'ZWL', region: 'MEA' } },
  { code: 'BW', name: 'Botswana', taxInfo: { standardRate: 12, taxName: 'VAT', currency: 'BWP', region: 'MEA' } },
  { code: 'MW', name: 'Malawi', taxInfo: { standardRate: 16.5, taxName: 'VAT', currency: 'MWK', region: 'MEA' } },
  { code: 'MZ', name: 'Mozambique', taxInfo: { standardRate: 17, taxName: 'VAT', currency: 'MZN', region: 'MEA' } },
  { code: 'NA', name: 'Namibia', taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'NAD', region: 'MEA' } },
  { code: 'SZ', name: 'Eswatini', taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'SZL', region: 'MEA' } },
  { code: 'LS', name: 'Lesotho', taxInfo: { standardRate: 14, taxName: 'VAT', currency: 'LSL', region: 'MEA' } },
  { code: 'AO', name: 'Angola', taxInfo: { standardRate: 14, taxName: 'VAT', currency: 'AOA', region: 'MEA' } },
  { code: 'CM', name: 'Cameroon', taxInfo: { standardRate: 19.25, taxName: 'VAT', currency: 'XAF', region: 'MEA' } },
  { code: 'CF', name: 'Central African Republic', taxInfo: { standardRate: 19, taxName: 'VAT', currency: 'XAF', region: 'MEA' } },
  { code: 'TD', name: 'Chad', taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'XAF', region: 'MEA' } },
  { code: 'CG', name: 'Congo - Brazzaville', taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'XAF', region: 'MEA' } },
  { code: 'CD', name: 'Congo - Kinshasa', taxInfo: { standardRate: 16, taxName: 'VAT', currency: 'CDF', region: 'MEA' } },
  { code: 'GA', name: 'Gabon', taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'XAF', region: 'MEA' } },
  { code: 'GQ', name: 'Equatorial Guinea', taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'XAF', region: 'MEA' } },
  { code: 'ST', name: 'São Tomé and Príncipe', taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'STN', region: 'MEA' } },
  { code: 'CV', name: 'Cabo Verde', taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'CVE', region: 'MEA' } },
  { code: 'GW', name: 'Guinea-Bissau', taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'XOF', region: 'MEA' } },
  { code: 'GN', name: 'Guinea', taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'GNF', region: 'MEA' } },
  { code: 'SL', name: 'Sierra Leone', taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'SLL', region: 'MEA' } },
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
      { code: 'ENG', name: 'England' },
      { code: 'SCT', name: 'Scotland' },
      { code: 'WLS', name: 'Wales' },
      { code: 'NIR', name: 'Northern Ireland' }
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
  { code: 'AF', name: 'Afghanistan' },
  { code: 'PK', name: 'Pakistan' },
  {
    code: 'IN',
    name: 'India',
    provinces: [
      { code: 'AP', name: 'Andhra Pradesh' },
      { code: 'AR', name: 'Arunachal Pradesh' },
      { code: 'AS', name: 'Assam' },
      { code: 'BR', name: 'Bihar' },
      { code: 'CT', name: 'Chhattisgarh' },
      { code: 'GA', name: 'Goa' },
      { code: 'GJ', name: 'Gujarat' },
      { code: 'HR', name: 'Haryana' },
      { code: 'HP', name: 'Himachal Pradesh' },
      { code: 'JH', name: 'Jharkhand' },
      { code: 'KA', name: 'Karnataka' },
      { code: 'KL', name: 'Kerala' },
      { code: 'MP', name: 'Madhya Pradesh' },
      { code: 'MH', name: 'Maharashtra' },
      { code: 'MN', name: 'Manipur' },
      { code: 'ML', name: 'Meghalaya' },
      { code: 'MZ', name: 'Mizoram' },
      { code: 'NL', name: 'Nagaland' },
      { code: 'OR', name: 'Odisha' },
      { code: 'PB', name: 'Punjab' },
      { code: 'RJ', name: 'Rajasthan' },
      { code: 'SK', name: 'Sikkim' },
      { code: 'TN', name: 'Tamil Nadu' },
      { code: 'TG', name: 'Telangana' },
      { code: 'TR', name: 'Tripura' },
      { code: 'UP', name: 'Uttar Pradesh' },
      { code: 'UT', name: 'Uttarakhand' },
      { code: 'WB', name: 'West Bengal' },
      { code: 'AN', name: 'Andaman and Nicobar Islands' },
      { code: 'CH', name: 'Chandigarh' },
      { code: 'DN', name: 'Dadra and Nagar Haveli and Daman and Diu' },
      { code: 'DL', name: 'Delhi' },
      { code: 'JK', name: 'Jammu and Kashmir' },
      { code: 'LA', name: 'Ladakh' },
      { code: 'LD', name: 'Lakshadweep' },
      { code: 'PY', name: 'Puducherry' }
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
  { code: 'CN', name: 'China', taxInfo: { standardRate: 13, taxName: 'VAT', currency: 'CNY', region: 'APAC' } },
  { code: 'HK', name: 'Hong Kong' },
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