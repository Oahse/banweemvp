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
      { code: 'AL', name: 'Alabama',
        cities: [
          { code: 'BH', name: 'Birmingham' },
          { code: 'MO', name: 'Montgomery' },
          { code: 'MB', name: 'Mobile' },
          { code: 'HU', name: 'Huntsville' },
          { code: 'TA', name: 'Tuscaloosa' },
          { code: 'HO', name: 'Hoover' },
          { code: 'DO', name: 'Dothan' },
          { code: 'DE', name: 'Decatur' },
          { code: 'AU', name: 'Auburn' },
          { code: 'MA', name: 'Madison' }
        ]
      },
      { code: 'AK', name: 'Alaska',
        cities: [
          { code: 'AN', name: 'Anchorage' },
          { code: 'FA', name: 'Fairbanks' },
          { code: 'JU', name: 'Juneau' },
          { code: 'SI', name: 'Sitka' },
          { code: 'KE', name: 'Ketchikan' },
          { code: 'PA', name: 'Petersburg' },
          { code: 'KE2', name: 'Kenai' },
          { code: 'KO', name: 'Kodiak' },
          { code: 'BE', name: 'Bethel' },
          { code: 'PO', name: 'Palmer' }
        ]
      },
      { code: 'AZ', name: 'Arizona',
        cities: [
          { code: 'PH', name: 'Phoenix' },
          { code: 'TU', name: 'Tucson' },
          { code: 'ME', name: 'Mesa' },
          { code: 'CH', name: 'Chandler' },
          { code: 'GL', name: 'Glendale' },
          { code: 'SC', name: 'Scottsdale' },
          { code: 'GI', name: 'Gilbert' },
          { code: 'TE', name: 'Tempe' },
          { code: 'PE', name: 'Peoria' },
          { code: 'SU', name: 'Surprise' }
        ]
      },
      { code: 'AR', name: 'Arkansas',
        cities: [
          { code: 'LI', name: 'Little Rock' },
          { code: 'FT', name: 'Fort Smith' },
          { code: 'FA', name: 'Fayetteville' },
          { code: 'SP', name: 'Springdale' },
          { code: 'JO', name: 'Jonesboro' },
          { code: 'NL', name: 'North Little Rock' },
          { code: 'CO', name: 'Conway' },
          { code: 'RO', name: 'Rogers' },
          { code: 'PI', name: 'Pine Bluff' },
          { code: 'BE', name: 'Bentonville' }
        ]
      },
      { code: 'CO', name: 'Colorado', 
        taxInfo: { standardRate: 2.9, taxName: 'Sales Tax', currency: 'USD', region: 'NA' },
        cities: [
          { code: 'DE', name: 'Denver' },
          { code: 'CO2', name: 'Colorado Springs' },
          { code: 'AU', name: 'Aurora' },
          { code: 'FO', name: 'Fort Collins' },
          { code: 'LA', name: 'Lakewood' },
          { code: 'TH', name: 'Thornton' },
          { code: 'AR', name: 'Arvada' },
          { code: 'WE', name: 'Westminster' },
          { code: 'PR', name: 'Pueblo' },
          { code: 'BO', name: 'Boulder' }
        ]
      },
      { code: 'CT', name: 'Connecticut', 
        taxInfo: { standardRate: 6.35, taxName: 'Sales Tax', currency: 'USD', region: 'NA' },
        cities: [
          { code: 'BR', name: 'Bridgeport' },
          { code: 'NE', name: 'New Haven' },
          { code: 'HA', name: 'Hartford' },
          { code: 'ST', name: 'Stamford' },
          { code: 'WA', name: 'Waterbury' },
          { code: 'NO', name: 'Norwalk' },
          { code: 'DA', name: 'Danbury' },
          { code: 'NE2', name: 'New Britain' },
          { code: 'ME', name: 'Meriden' },
          { code: 'MI', name: 'Middletown' }
        ]
      },
      { code: 'DE', name: 'Delaware',
        cities: [
          { code: 'WI', name: 'Wilmington' },
          { code: 'DO', name: 'Dover' },
          { code: 'NE', name: 'Newark' },
          { code: 'MI', name: 'Middletown' },
          { code: 'SE', name: 'Seaford' },
          { code: 'DE2', name: 'Delaware City' },
          { code: 'SM', name: 'Smyrna' },
          { code: 'MI2', name: 'Milford' },
          { code: 'EL', name: 'Elsmere' },
          { code: 'GE', name: 'Georgetown' }
        ]
      },
      { code: 'GA', name: 'Georgia',
        cities: [
          { code: 'AT', name: 'Atlanta' },
          { code: 'AU', name: 'Augusta' },
          { code: 'CO', name: 'Columbus' },
          { code: 'SA', name: 'Savannah' },
          { code: 'AT2', name: 'Athens' },
          { code: 'SA2', name: 'Sandy Springs' },
          { code: 'RO', name: 'Roswell' },
          { code: 'MA', name: 'Macon' },
          { code: 'AL', name: 'Albany' },
          { code: 'WA', name: 'Warner Robins' }
        ]
      },
      { code: 'HI', name: 'Hawaii',
        cities: [
          { code: 'HO', name: 'Honolulu' },
          { code: 'PI', name: 'Pearl City' },
          { code: 'HI2', name: 'Hilo' },
          { code: 'KA', name: 'Kailua' },
          { code: 'WA', name: 'Waipahu' },
          { code: 'KA2', name: 'Kaneohe' },
          { code: 'MI', name: 'Mililani Town' },
          { code: 'KA3', name: 'Kahului' },
          { code: 'KI', name: 'Kailua-Kona' },
          { code: 'LI', name: 'Lihue' }
        ]
      },
      { code: 'ID', name: 'Idaho',
        cities: [
          { code: 'BO', name: 'Boise' },
          { code: 'NE', name: 'Nampa' },
          { code: 'ME', name: 'Meridian' },
          { code: 'ID', name: 'Idaho Falls' },
          { code: 'PO', name: 'Pocatello' },
          { code: 'CO', name: 'Coeur d\'Alene' },
          { code: 'TW', name: 'Twin Falls' },
          { code: 'CA', name: 'Caldwell' },
          { code: 'LE', name: 'Lewiston' },
          { code: 'RE', name: 'Rexburg' }
        ]
      },
      { code: 'IL', name: 'Illinois',
        cities: [
          { code: 'CH', name: 'Chicago' },
          { code: 'AU', name: 'Aurora' },
          { code: 'RO', name: 'Rockford' },
          { code: 'JO', name: 'Joliet' },
          { code: 'NA', name: 'Naperville' },
          { code: 'SP', name: 'Springfield' },
          { code: 'PE', name: 'Peoria' },
          { code: 'EL', name: 'Elgin' },
          { code: 'WA', name: 'Waukegan' },
          { code: 'CI', name: 'Cicero' }
        ]
      },
      { code: 'IN', name: 'Indiana',
        cities: [
          { code: 'IN', name: 'Indianapolis' },
          { code: 'FO', name: 'Fort Wayne' },
          { code: 'EV', name: 'Evansville' },
          { code: 'SO', name: 'South Bend' },
          { code: 'CA', name: 'Carmel' },
          { code: 'FI', name: 'Fishers' },
          { code: 'BL', name: 'Bloomington' },
          { code: 'HA', name: 'Hammond' },
          { code: 'GA', name: 'Gary' },
          { code: 'LA', name: 'Lafayette' }
        ]
      },
      { code: 'IA', name: 'Iowa',
        cities: [
          { code: 'DE', name: 'Des Moines' },
          { code: 'CE', name: 'Cedar Rapids' },
          { code: 'DA', name: 'Davenport' },
          { code: 'SI', name: 'Sioux City' },
          { code: 'WA', name: 'Waterloo' },
          { code: 'IO', name: 'Iowa City' },
          { code: 'AM', name: 'Ames' },
          { code: 'WE', name: 'West Des Moines' },
          { code: 'AN', name: 'Ankeny' },
          { code: 'UR', name: 'Urbandale' }
        ]
      },
      { code: 'KS', name: 'Kansas',
        cities: [
          { code: 'WI', name: 'Wichita' },
          { code: 'OV', name: 'Overland Park' },
          { code: 'KA', name: 'Kansas City' },
          { code: 'TO', name: 'Topeka' },
          { code: 'OL', name: 'Olathe' },
          { code: 'LA', name: 'Lawrence' },
          { code: 'SH', name: 'Shawnee' },
          { code: 'MA', name: 'Manhattan' },
          { code: 'LE', name: 'Lenexa' },
          { code: 'SA', name: 'Salina' }
        ]
      },
      { code: 'KY', name: 'Kentucky',
        cities: [
          { code: 'LO', name: 'Louisville' },
          { code: 'LE', name: 'Lexington' },
          { code: 'BO', name: 'Bowling Green' },
          { code: 'OV', name: 'Owensboro' },
          { code: 'CO', name: 'Covington' },
          { code: 'HO', name: 'Hopkinsville' },
          { code: 'RI', name: 'Richmond' },
          { code: 'FI', name: 'Florence' },
          { code: 'GE', name: 'Georgetown' },
          { code: 'HI', name: 'Henderson' }
        ]
      },
      { code: 'LA', name: 'Louisiana',
        cities: [
          { code: 'NE', name: 'New Orleans' },
          { code: 'BA', name: 'Baton Rouge' },
          { code: 'SH', name: 'Shreveport' },
          { code: 'LA', name: 'Lafayette' },
          { code: 'LA2', name: 'Lake Charles' },
          { code: 'KE', name: 'Kenner' },
          { code: 'BO', name: 'Bossier City' },
          { code: 'MO', name: 'Monroe' },
          { code: 'AL', name: 'Alexandria' },
          { code: 'NE2', name: 'New Iberia' }
        ]
      },
      { code: 'ME', name: 'Maine',
        cities: [
          { code: 'PO', name: 'Portland' },
          { code: 'LE', name: 'Lewiston' },
          { code: 'BA', name: 'Bangor' },
          { code: 'SO', name: 'South Portland' },
          { code: 'AU', name: 'Auburn' },
          { code: 'BI', name: 'Biddeford' },
          { code: 'SA', name: 'Sanford' },
          { code: 'BR', name: 'Brunswick' },
          { code: 'SC', name: 'Scarborough' },
          { code: 'WE', name: 'Westbrook' }
        ]
      },
      { code: 'MD', name: 'Maryland',
        cities: [
          { code: 'BA', name: 'Baltimore' },
          { code: 'FR', name: 'Frederick' },
          { code: 'RO', name: 'Rockville' },
          { code: 'GA', name: 'Gaithersburg' },
          { code: 'BO', name: 'Bowie' },
          { code: 'HA', name: 'Hagerstown' },
          { code: 'AN', name: 'Annapolis' },
          { code: 'CO', name: 'College Park' },
          { code: 'ES', name: 'Ellicott City' },
          { code: 'SI', name: 'Silver Spring' }
        ]
      },
      { code: 'MA', name: 'Massachusetts',
        cities: [
          { code: 'BO', name: 'Boston' },
          { code: 'WO', name: 'Worcester' },
          { code: 'SP', name: 'Springfield' },
          { code: 'LO', name: 'Lowell' },
          { code: 'CA', name: 'Cambridge' },
          { code: 'NE', name: 'New Bedford' },
          { code: 'BR', name: 'Brockton' },
          { code: 'QU', name: 'Quincy' },
          { code: 'LY', name: 'Lynn' },
          { code: 'FA', name: 'Fall River' }
        ]
      },
      { code: 'MI', name: 'Michigan',
        cities: [
          { code: 'DE', name: 'Detroit' },
          { code: 'GR', name: 'Grand Rapids' },
          { code: 'WA', name: 'Warren' },
          { code: 'ST', name: 'Sterling Heights' },
          { code: 'LA', name: 'Lansing' },
          { code: 'AN', name: 'Ann Arbor' },
          { code: 'FL', name: 'Flint' },
          { code: 'DE2', name: 'Dearborn' },
          { code: 'LI', name: 'Livonia' },
          { code: 'CL', name: 'Clinton' }
        ]
      },
      { code: 'MN', name: 'Minnesota',
        cities: [
          { code: 'MI', name: 'Minneapolis' },
          { code: 'SA', name: 'Saint Paul' },
          { code: 'RO', name: 'Rochester' },
          { code: 'DU', name: 'Duluth' },
          { code: 'BL', name: 'Bloomington' },
          { code: 'BR', name: 'Brooklyn Park' },
          { code: 'PI', name: 'Plymouth' },
          { code: 'EA', name: 'Eagan' },
          { code: 'ST', name: 'St. Cloud' },
          { code: 'BU', name: 'Burnsville' }
        ]
      },
      { code: 'MS', name: 'Mississippi',
        cities: [
          { code: 'JA', name: 'Jackson' },
          { code: 'GU', name: 'Gulfport' },
          { code: 'SO', name: 'Southaven' },
          { code: 'HA', name: 'Hattiesburg' },
          { code: 'BI', name: 'Biloxi' },
          { code: 'ME', name: 'Meridian' },
          { code: 'TU', name: 'Tupelo' },
          { code: 'OL', name: 'Olive Branch' },
          { code: 'GR', name: 'Greenville' },
          { code: 'HO', name: 'Horn Lake' }
        ]
      },
      { code: 'MO', name: 'Missouri',
        cities: [
          { code: 'KA', name: 'Kansas City' },
          { code: 'SA', name: 'St. Louis' },
          { code: 'SP', name: 'Springfield' },
          { code: 'IN', name: 'Independence' },
          { code: 'CO', name: 'Columbia' },
          { code: 'OL', name: 'O\'Fallon' },
          { code: 'SA2', name: 'St. Joseph' },
          { code: 'ST', name: 'St. Charles' },
          { code: 'ST2', name: 'St. Peters' },
          { code: 'FL', name: 'Florissant' }
        ]
      },
      { code: 'MT', name: 'Montana',
        cities: [
          { code: 'BI', name: 'Billings' },
          { code: 'MI', name: 'Missoula' },
          { code: 'GR', name: 'Great Falls' },
          { code: 'BO', name: 'Bozeman' },
          { code: 'HE', name: 'Helena' },
          { code: 'KA', name: 'Kalispell' },
          { code: 'AN', name: 'Anaconda' },
          { code: 'HA', name: 'Havre' },
          { code: 'LI', name: 'Livingston' },
          { code: 'BU', name: 'Butte' }
        ]
      },
      { code: 'NE', name: 'Nebraska',
        cities: [
          { code: 'OM', name: 'Omaha' },
          { code: 'LI', name: 'Lincoln' },
          { code: 'BE', name: 'Bellevue' },
          { code: 'GR', name: 'Grand Island' },
          { code: 'KE', name: 'Kearney' },
          { code: 'FR', name: 'Fremont' },
          { code: 'NO', name: 'Norfolk' },
          { code: 'HA', name: 'Hastings' },
          { code: 'NO2', name: 'North Platte' },
          { code: 'CO', name: 'Columbus' }
        ]
      },
      { code: 'NV', name: 'Nevada',
        cities: [
          { code: 'LA', name: 'Las Vegas' },
          { code: 'RE', name: 'Reno' },
          { code: 'HE', name: 'Henderson' },
          { code: 'SP', name: 'Sparks' },
          { code: 'CA', name: 'Carson City' },
          { code: 'EL', name: 'Elko' },
          { code: 'NO', name: 'North Las Vegas' },
          { code: 'ME', name: 'Mesquite' },
          { code: 'BO', name: 'Boulder City' },
          { code: 'FE', name: 'Fernley' }
        ]
      },
      { code: 'NH', name: 'New Hampshire',
        cities: [
          { code: 'MA', name: 'Manchester' },
          { code: 'NA', name: 'Nashua' },
          { code: 'CO', name: 'Concord' },
          { code: 'DO', name: 'Derry' },
          { code: 'DO2', name: 'Dover' },
          { code: 'RO', name: 'Rochester' },
          { code: 'SA', name: 'Salem' },
          { code: 'ME', name: 'Merrimack' },
          { code: 'LO', name: 'Londonderry' },
          { code: 'HU', name: 'Hudson' }
        ]
      },
      { code: 'NJ', name: 'New Jersey',
        cities: [
          { code: 'NE', name: 'Newark' },
          { code: 'JE', name: 'Jersey City' },
          { code: 'PA', name: 'Paterson' },
          { code: 'EL', name: 'Elizabeth' },
          { code: 'ED', name: 'Edison' },
          { code: 'WO', name: 'Woodbridge' },
          { code: 'LA', name: 'Lakewood' },
          { code: 'HA', name: 'Hamilton' },
          { code: 'TO', name: 'Toms River' },
          { code: 'CL', name: 'Clifton' }
        ]
      },
      { code: 'NM', name: 'New Mexico',
        cities: [
          { code: 'AL', name: 'Albuquerque' },
          { code: 'LA', name: 'Las Cruces' },
          { code: 'RO', name: 'Rio Rancho' },
          { code: 'SA', name: 'Santa Fe' },
          { code: 'RO2', name: 'Roswell' },
          { code: 'FA', name: 'Farmington' },
          { code: 'HO', name: 'Hobbs' },
          { code: 'AL2', name: 'Alamogordo' },
          { code: 'PO', name: 'Portales' },
          { code: 'AR', name: 'Artesia' }
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
      { code: 'NC', name: 'North Carolina',
        cities: [
          { code: 'CH', name: 'Charlotte' },
          { code: 'RA', name: 'Raleigh' },
          { code: 'GR', name: 'Greensboro' },
          { code: 'DU', name: 'Durham' },
          { code: 'WI', name: 'Winston-Salem' },
          { code: 'FA', name: 'Fayetteville' },
          { code: 'CA', name: 'Cary' },
          { code: 'WI2', name: 'Wilmington' },
          { code: 'HI', name: 'High Point' },
          { code: 'GR2', name: 'Greenville' }
        ]
      },
      { code: 'ND', name: 'North Dakota',
        cities: [
          { code: 'FA', name: 'Fargo' },
          { code: 'BI', name: 'Bismarck' },
          { code: 'GR', name: 'Grand Forks' },
          { code: 'MI', name: 'Minot' },
          { code: 'WE', name: 'West Fargo' },
          { code: 'DI', name: 'Dickinson' },
          { code: 'MO', name: 'Mandan' },
          { code: 'WI', name: 'Williston' },
          { code: 'PO', name: 'Port of Dakota' },
          { code: 'JA', name: 'Jamestown' }
        ]
      },
      { code: 'OH', name: 'Ohio',
        cities: [
          { code: 'CO', name: 'Columbus' },
          { code: 'CL', name: 'Cleveland' },
          { code: 'CI', name: 'Cincinnati' },
          { code: 'TO', name: 'Toledo' },
          { code: 'AK', name: 'Akron' },
          { code: 'DA', name: 'Dayton' },
          { code: 'PA', name: 'Parma' },
          { code: 'YO', name: 'Youngstown' },
          { code: 'CA', name: 'Canton' },
          { code: 'LI', name: 'Lorain' }
        ]
      },
      { code: 'OK', name: 'Oklahoma',
        cities: [
          { code: 'OK', name: 'Oklahoma City' },
          { code: 'TU', name: 'Tulsa' },
          { code: 'NO', name: 'Norman' },
          { code: 'BR', name: 'Broken Arrow' },
          { code: 'LA', name: 'Lawton' },
          { code: 'ED', name: 'Edmond' },
          { code: 'MO', name: 'Moore' },
          { code: 'MI', name: 'Midwest City' },
          { code: 'EN', name: 'Enid' },
          { code: 'ST', name: 'Stillwater' }
        ]
      },
      { code: 'OR', name: 'Oregon',
        cities: [
          { code: 'PO', name: 'Portland' },
          { code: 'EU', name: 'Eugene' },
          { code: 'SA', name: 'Salem' },
          { code: 'GR', name: 'Gresham' },
          { code: 'HI', name: 'Hillsboro' },
          { code: 'BE', name: 'Beaverton' },
          { code: 'BE2', name: 'Bend' },
          { code: 'ME', name: 'Medford' },
          { code: 'SP', name: 'Springfield' },
          { code: 'CO', name: 'Corvallis' }
        ]
      },
      { code: 'PA', name: 'Pennsylvania',
        cities: [
          { code: 'PH', name: 'Philadelphia' },
          { code: 'PI', name: 'Pittsburgh' },
          { code: 'AL', name: 'Allentown' },
          { code: 'ER', name: 'Erie' },
          { code: 'RE', name: 'Reading' },
          { code: 'SC', name: 'Scranton' },
          { code: 'BE', name: 'Bethlehem' },
          { code: 'LA', name: 'Lancaster' },
          { code: 'HA', name: 'Harrisburg' },
          { code: 'AL2', name: 'Altoona' }
        ]
      },
      { code: 'RI', name: 'Rhode Island',
        cities: [
          { code: 'PR', name: 'Providence' },
          { code: 'WA', name: 'Warwick' },
          { code: 'CR', name: 'Cranston' },
          { code: 'PA', name: 'Pawtucket' },
          { code: 'EA', name: 'East Providence' },
          { code: 'WO', name: 'Woonsocket' },
          { code: 'ME', name: 'Middletown' },
          { code: 'NE', name: 'Newport' },
          { code: 'CE', name: 'Central Falls' },
          { code: 'WE', name: 'West Warwick' }
        ]
      },
      { code: 'SC', name: 'South Carolina',
        cities: [
          { code: 'CO', name: 'Columbia' },
          { code: 'CH', name: 'Charleston' },
          { code: 'NO', name: 'North Charleston' },
          { code: 'MO', name: 'Mount Pleasant' },
          { code: 'RO', name: 'Rock Hill' },
          { code: 'GR', name: 'Greenville' },
          { code: 'SP', name: 'Spartanburg' },
          { code: 'SU', name: 'Sumter' },
          { code: 'FL', name: 'Florence' },
          { code: 'AN', name: 'Anderson' }
        ]
      },
      { code: 'SD', name: 'South Dakota',
        cities: [
          { code: 'SI', name: 'Sioux Falls' },
          { code: 'RA', name: 'Rapid City' },
          { code: 'AB', name: 'Aberdeen' },
          { code: 'BR', name: 'Brookings' },
          { code: 'WA', name: 'Watertown' },
          { code: 'MI', name: 'Mitchell' },
          { code: 'PI', name: 'Pierre' },
          { code: 'YO', name: 'Yankton' },
          { code: 'HU', name: 'Huron' },
          { code: 'VE', name: 'Vermillion' }
        ]
      },
      { code: 'TN', name: 'Tennessee',
        cities: [
          { code: 'NA', name: 'Nashville' },
          { code: 'ME', name: 'Memphis' },
          { code: 'KN', name: 'Knoxville' },
          { code: 'CH', name: 'Chattanooga' },
          { code: 'CL', name: 'Clarksville' },
          { code: 'MO', name: 'Murfreesboro' },
          { code: 'JA', name: 'Jackson' },
          { code: 'JO', name: 'Johnson City' },
          { code: 'FR', name: 'Franklin' },
          { code: 'HO', name: 'Hendersonville' }
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
      { code: 'UT', name: 'Utah',
        cities: [
          { code: 'SA', name: 'Salt Lake City' },
          { code: 'WE', name: 'West Valley City' },
          { code: 'PR', name: 'Provo' },
          { code: 'WE2', name: 'West Jordan' },
          { code: 'OR', name: 'Orem' },
          { code: 'SA2', name: 'Sandy' },
          { code: 'OG', name: 'Ogden' },
          { code: 'ST', name: 'St. George' },
          { code: 'LA', name: 'Layton' },
          { code: 'HI', name: 'Hill Air Force Base' }
        ]
      },
      { code: 'VT', name: 'Vermont',
        cities: [
          { code: 'BU', name: 'Burlington' },
          { code: 'ES', name: 'Essex' },
          { code: 'SO', name: 'South Burlington' },
          { code: 'CO', name: 'Colchester' },
          { code: 'RU', name: 'Rutland' },
          { code: 'BE', name: 'Bennington' },
          { code: 'BR', name: 'Brattleboro' },
          { code: 'MI', name: 'Milton' },
          { code: 'BA', name: 'Barre' },
          { code: 'WI', name: 'Williston' }
        ]
      },
      { code: 'VA', name: 'Virginia',
        cities: [
          { code: 'VI', name: 'Virginia Beach' },
          { code: 'NO', name: 'Norfolk' },
          { code: 'CH', name: 'Chesapeake' },
          { code: 'RI', name: 'Richmond' },
          { code: 'NE', name: 'Newport News' },
          { code: 'AL', name: 'Alexandria' },
          { code: 'HA', name: 'Hampton' },
          { code: 'PO', name: 'Portsmouth' },
          { code: 'SU', name: 'Suffolk' },
          { code: 'RO', name: 'Roanoke' }
        ]
      },
      { code: 'WA', name: 'Washington',
        cities: [
          { code: 'SE', name: 'Seattle' },
          { code: 'SP', name: 'Spokane' },
          { code: 'TA', name: 'Tacoma' },
          { code: 'VA', name: 'Vancouver' },
          { code: 'BE', name: 'Bellevue' },
          { code: 'KE', name: 'Kent' },
          { code: 'EV', name: 'Everett' },
          { code: 'RE', name: 'Renton' },
          { code: 'FE', name: 'Federal Way' },
          { code: 'SP2', name: 'Spokane Valley' }
        ]
      },
      { code: 'WV', name: 'West Virginia',
        cities: [
          { code: 'CH', name: 'Charleston' },
          { code: 'HU', name: 'Huntington' },
          { code: 'PA', name: 'Parkersburg' },
          { code: 'MO', name: 'Morgantown' },
          { code: 'WE', name: 'Wheeling' },
          { code: 'FA', name: 'Fairmont' },
          { code: 'CL', name: 'Clarksburg' },
          { code: 'MA', name: 'Martinsburg' },
          { code: 'VI', name: 'Vienna' },
          { code: 'BE', name: 'Berkeley Springs' }
        ]
      },
      { code: 'WI', name: 'Wisconsin',
        cities: [
          { code: 'MI', name: 'Milwaukee' },
          { code: 'MA', name: 'Madison' },
          { code: 'GR', name: 'Green Bay' },
          { code: 'KE', name: 'Kenosha' },
          { code: 'RA', name: 'Racine' },
          { code: 'AP', name: 'Appleton' },
          { code: 'WA', name: 'Waukesha' },
          { code: 'EA', name: 'Eau Claire' },
          { code: 'JA', name: 'Janesville' },
          { code: 'WE', name: 'West Allis' }
        ]
      },
      { code: 'WY', name: 'Wyoming',
        cities: [
          { code: 'CH', name: 'Cheyenne' },
          { code: 'CA', name: 'Casper' },
          { code: 'LA', name: 'Laramie' },
          { code: 'GI', name: 'Gillette' },
          { code: 'RO', name: 'Rock Springs' },
          { code: 'SH', name: 'Sheridan' },
          { code: 'GR', name: 'Green River' },
          { code: 'EV', name: 'Evanston' },
          { code: 'RI', name: 'Riverton' },
          { code: 'JA', name: 'Jackson' }
        ]
      },
      { code: 'DC', name: 'District of Columbia',
        cities: [
          { code: 'WA', name: 'Washington' },
          { code: 'GE', name: 'Georgetown' },
          { code: 'AD', name: 'Adams Morgan' },
          { code: 'CA', name: 'Capitol Hill' },
          { code: 'DU', name: 'Dupont Circle' },
          { code: 'FO', name: 'Foggy Bottom' },
          { code: 'CH', name: 'Chinatown' },
          { code: 'SW', name: 'Southwest' },
          { code: 'NE', name: 'Northeast' },
          { code: 'NW', name: 'Northwest' }
        ]
      }
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
      { code: 'MB', name: 'Manitoba', 
        taxInfo: { standardRate: 12, taxName: 'GST + PST', currency: 'CAD', region: 'NA' },
        cities: [
          { code: 'WI', name: 'Winnipeg' },
          { code: 'BR', name: 'Brandon' },
          { code: 'ST', name: 'Steinbach' },
          { code: 'TH', name: 'Thompson' },
          { code: 'PO', name: 'Portage la Prairie' },
          { code: 'SE', name: 'Selkirk' },
          { code: 'MO', name: 'Morden' },
          { code: 'DA', name: 'Dauphin' },
          { code: 'FL', name: 'Flin Flon' },
          { code: 'SW', name: 'Swan River' }
        ]
      },
      { code: 'NB', name: 'New Brunswick', 
        taxInfo: { standardRate: 15, taxName: 'HST', currency: 'CAD', region: 'NA' },
        cities: [
          { code: 'MO', name: 'Moncton' },
          { code: 'SA', name: 'Saint John' },
          { code: 'FR', name: 'Fredericton' },
          { code: 'DA', name: 'Dieppe' },
          { code: 'MI', name: 'Miramichi' },
          { code: 'BA', name: 'Bathurst' },
          { code: 'ED', name: 'Edmundston' },
          { code: 'CA', name: 'Campbellton' },
          { code: 'SU', name: 'Sackville' },
          { code: 'RO', name: 'Rothesay' }
        ]
      },
      { code: 'NL', name: 'Newfoundland and Labrador', 
        taxInfo: { standardRate: 15, taxName: 'HST', currency: 'CAD', region: 'NA' },
        cities: [
          { code: 'ST', name: 'St. John\'s' },
          { code: 'CO', name: 'Corner Brook' },
          { code: 'GA', name: 'Gander' },
          { code: 'MA', name: 'Mount Pearl' },
          { code: 'PA', name: 'Paradise' },
          { code: 'CO2', name: 'Conception Bay South' },
          { code: 'GR', name: 'Grand Falls-Windsor' },
          { code: 'DE', name: 'Deer Lake' },
          { code: 'CA', name: 'Carbonear' },
          { code: 'HA', name: 'Harbour Grace' }
        ]
      },
      { code: 'NS', name: 'Nova Scotia', 
        taxInfo: { standardRate: 15, taxName: 'HST', currency: 'CAD', region: 'NA' },
        cities: [
          { code: 'HA', name: 'Halifax' },
          { code: 'DA', name: 'Dartmouth' },
          { code: 'SY', name: 'Sydney' },
          { code: 'TR', name: 'Truro' },
          { code: 'NE', name: 'New Glasgow' },
          { code: 'GL', name: 'Glace Bay' },
          { code: 'CA', name: 'Cape Breton' },
          { code: 'AM', name: 'Amherst' },
          { code: 'KE', name: 'Kentville' },
          { code: 'YO', name: 'Yarmouth' }
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
      { code: 'PE', name: 'Prince Edward Island', 
        taxInfo: { standardRate: 15, taxName: 'HST', currency: 'CAD', region: 'NA' },
        cities: [
          { code: 'CH', name: 'Charlottetown' },
          { code: 'SU', name: 'Summerside' },
          { code: 'ST', name: 'Stratford' },
          { code: 'CO', name: 'Cornwall' },
          { code: 'MO', name: 'Montague' },
          { code: 'AL', name: 'Alberton' },
          { code: 'SO', name: 'Souris' },
          { code: 'TY', name: 'Tyne Valley' },
          { code: 'WE', name: 'Wellington' },
          { code: 'BR', name: 'Borden-Carleton' }
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
      { code: 'SK', name: 'Saskatchewan',
        cities: [
          { code: 'SA', name: 'Saskatoon' },
          { code: 'RE', name: 'Regina' },
          { code: 'PA', name: 'Prince Albert' },
          { code: 'MO', name: 'Moose Jaw' },
          { code: 'SW', name: 'Swift Current' },
          { code: 'YO', name: 'Yorkton' },
          { code: 'NO', name: 'North Battleford' },
          { code: 'ES', name: 'Estevan' },
          { code: 'WA', name: 'Warman' },
          { code: 'HU', name: 'Humboldt' }
        ]
      },
      { code: 'NT', name: 'Northwest Territories',
        cities: [
          { code: 'YE', name: 'Yellowknife' },
          { code: 'HA', name: 'Hay River' },
          { code: 'IN', name: 'Inuvik' },
          { code: 'FO', name: 'Fort Smith' },
          { code: 'NO', name: 'Norman Wells' },
          { code: 'IQ', name: 'Iqaluit' },
          { code: 'RA', name: 'Rankin Inlet' },
          { code: 'BA', name: 'Baker Lake' },
          { code: 'TU', name: 'Tuktoyaktuk' },
          { code: 'PA', name: 'Paulatuk' }
        ]
      },
      { code: 'NU', name: 'Nunavut',
        cities: [
          { code: 'IQ', name: 'Iqaluit' },
          { code: 'RA', name: 'Rankin Inlet' },
          { code: 'AR', name: 'Arviat' },
          { code: 'BA', name: 'Baker Lake' },
          { code: 'PU', name: 'Pond Inlet' },
          { code: 'CI', name: 'Clyde River' },
          { code: 'KI', name: 'Kugluktuk' },
          { code: 'PA', name: 'Pangnirtung' },
          { code: 'IG', name: 'Igloolik' },
          { code: 'TA', name: 'Taloyoak' }
        ]
      },
      { code: 'YT', name: 'Yukon',
        cities: [
          { code: 'WH', name: 'Whitehorse' },
          { code: 'DA', name: 'Dawson City' },
          { code: 'WA', name: 'Watson Lake' },
          { code: 'HI', name: 'Haines Junction' },
          { code: 'MA', name: 'Mayo' },
          { code: 'CA', name: 'Carmacks' },
          { code: 'PE', name: 'Pelly Crossing' },
          { code: 'BE', name: 'Beaver Creek' },
          { code: 'OL', name: 'Old Crow' },
          { code: 'TE', name: 'Teslin' }
        ]
      }
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
  code: 'NG',
  name: 'Nigeria',
  taxInfo: { standardRate: 7.5, taxName: 'VAT', currency: 'NGN', region: 'MEA' },
  provinces: [
    // Federal Capital Territory
    { code: 'FCT', name: 'Federal Capital Territory',
      cities: [
        { code: 'ABUJA', name: 'Abuja' },
        { code: 'GWARINPA', name: 'Gwarinpa' },
        { code: 'WUSE', name: 'Wuse' },
        { code: 'MABUSHI', name: 'Mabushi' },
        { code: 'ASOKORO', name: 'Asokoro' },
        { code: 'GARKI', name: 'Garki' },
        { code: 'JABI', name: 'Jabi' },
        { code: 'LIFE', name: 'Life Camp' },
        { code: 'KUBWA', name: 'Kubwa' },
        { code: 'BWARI', name: 'Bwari' }
      ]
    },
    // North Central States
    { code: 'KW', name: 'Kwara',
      cities: [
        { code: 'ILORIN', name: 'Ilorin' },
        { code: 'OFFA', name: 'Offa' },
        { code: 'OKE', name: 'Oke-Ode' },
        { code: 'JEBBA', name: 'Jebba' },
        { code: 'PATIGI', name: 'Patigi' },
        { code: 'KAIMA', name: 'Kaima' },
        { code: 'LAFIAGI', name: 'Lafiagi' },
        { code: 'SHAO', name: 'Shao' },
        { code: 'OYUN', name: 'Oyun' },
        { code: 'EDIDI', name: 'Edidi' }
      ]
    },
    { code: 'KO', name: 'Kogi',
      cities: [
        { code: 'LOKOJA', name: 'Lokoja' },
        { code: 'OKENE', name: 'Okene' },
        { code: 'KABBA', name: 'Kabba' },
        { code: 'IDAH', name: 'Idah' },
        { code: 'OGORI', name: 'Ogori' },
        { code: 'DEKINA', name: 'Dekina' },
        { code: 'ANYIGBA', name: 'Anyigba' },
        { code: 'AJAOKUTA', name: 'Ajaokuta' },
        { code: 'OBAJANA', name: 'Obajana' },
        { code: 'BASSA', name: 'Bassa' }
      ]
    },
    { code: 'BN', name: 'Benue',
      cities: [
        { code: 'MAKURDI', name: 'Makurdi' },
        { code: 'GBOKO', name: 'Gboko' },
        { code: 'OTUKPO', name: 'Otukpo' },
        { code: 'KATSINA', name: 'Katsina-Ala' },
        { code: 'VANDIKYA', name: 'Vandikya' },
        { code: 'KONSHISHA', name: 'Konshisha' },
        { code: 'GBOR', name: 'Gborko' },
        { code: 'UKUM', name: 'Ukum' },
        { code: 'LOGO', name: 'Logo' },
        { code: 'TARKA', name: 'Tarka' }
      ]
    },
    { code: 'PL', name: 'Plateau',
      cities: [
        { code: 'JOS', name: 'Jos' },
        { code: 'BUKURU', name: 'Bukuru' },
        { code: 'PANKSHIN', name: 'Pankshin' },
        { code: 'SHENDAM', name: 'Shendam' },
        { code: 'WASE', name: 'Wase' },
        { code: 'LANGTANG', name: 'Langtang' },
        { code: 'KANAM', name: 'Kanam' },
        { code: 'KANKE', name: 'Kanke' },
        { code: 'BARKIN', name: 'Barkin Ladi' },
        { code: 'BOKKOS', name: 'Bokkos' }
      ]
    },
    { code: 'NS', name: 'Nasarawa',
      cities: [
        { code: 'LAFIA', name: 'Lafia' },
        { code: 'Keffi', name: 'Keffi' },
        { code: 'AKWANGA', name: 'Akwanga' },
        { code: 'KARU', name: 'Karu' },
        { code: 'Doma', name: 'Doma' },
        { code: 'NASSARAWA', name: 'Nassarawa' },
        { code: 'OB', name: 'Obi' },
        { code: 'WAMBA', name: 'Wamba' },
        { code: 'TOTO', name: 'Toto' },
        { code: 'KOKONA', name: 'Kokona' }
      ]
    },
    { code: 'NI', name: 'Niger',
      cities: [
        { code: 'MINNA', name: 'Minna' },
        { code: 'BIDA', name: 'Bida' },
        { code: 'SULEJA', name: 'Suleja' },
        { code: 'KONTAGORA', name: 'Kontagora' },
        { code: 'LAPAI', name: 'Lapai' },
        { code: 'AGAIE', name: 'Agaie' },
        { code: 'MOKWA', name: 'Mokwa' },
        { code: 'BORGU', name: 'Borgu' },
        { code: 'MASHEGU', name: 'Mashegu' },
        { code: 'RAFI', name: 'Rafi' }
      ]
    },
    // North East States
    { code: 'GM', name: 'Gombe',
      cities: [
        { code: 'GOMBE', name: 'Gombe' },
        { code: 'KALTUNGO', name: 'Kaltungo' },
        { code: 'BALANGA', name: 'Balanga' },
        { code: 'FUNAKAYE', name: 'Funakaye' },
        { code: 'BILLIRI', name: 'Billiri' },
        { code: 'AKKO', name: 'Akko' },
        { code: 'KWAMI', name: 'Kwami' },
        { code: 'SHONGOM', name: 'Shongom' },
        { code: 'DUKKU', name: 'Dukku' },
        { code: 'NAFADA', name: 'Nafada' }
      ]
    },
    { code: 'YB', name: 'Yobe',
      cities: [
        { code: 'DAMATURU', name: 'Damaturu' },
        { code: 'POTISKUM', name: 'Potiskum' },
        { code: 'GASHUA', name: 'Gashua' },
        { code: 'NGURU', name: 'Nguru' },
        { code: 'GEIDAM', name: 'Geidam' },
        { code: 'BAYAMARI', name: 'Bayamari' },
        { code: 'BUNI', name: 'Buni Yadi' },
        { code: 'GULANI', name: 'Gulani' },
        { code: 'GUJBA', name: 'Gujba' },
        { code: 'TARMUWA', name: 'Tarmuwa' }
      ]
    },
    { code: 'BO', name: 'Borno',
      cities: [
        { code: 'MAIDUGURI', name: 'Maiduguri' },
        { code: 'BIU', name: 'Biu' },
        { code: 'BAMA', name: 'Bama' },
        { code: 'GWOZA', name: 'Gwoza' },
        { code: 'DAMBOA', name: 'Damboa' },
        { code: 'MONGUNO', name: 'Monguno' },
        { code: 'KUKAWA', name: 'Kukawa' },
        { code: 'KAGA', name: 'Kaga' },
        { code: 'HAWUL', name: 'Hawul' },
        { code: 'SHANI', name: 'Shani' }
      ]
    },
    { code: 'AD', name: 'Adamawa',
      cities: [
        { code: 'YOLA', name: 'Yola' },
        { code: 'JIMETA', name: 'Jimeta' },
        { code: 'MUBI', name: 'Mubi' },
        { code: 'NUMAN', name: 'Numan' },
        { code: 'GIREI', name: 'Girei' },
        { code: 'MAYO', name: 'Mayo-Belwa' },
        { code: 'TOUNGO', name: 'Toungo' },
        { code: 'DEMO', name: 'Demsa' },
        { code: 'SHELL', name: 'Shelleng' },
        { code: 'VERE', name: 'Vere' }
      ]
    },
    { code: 'TR', name: 'Taraba',
      cities: [
        { code: 'JALINGO', name: 'Jalingo' },
        { code: 'WUKARI', name: 'Wukari' },
        { code: 'TAKUM', name: 'Takum' },
        { code: 'BELLO', name: 'Bello' },
        { code: 'GASHAKA', name: 'Gashaka' },
        { code: 'KARIM', name: 'Karim Lamido' },
        { code: 'ARDO', name: 'Ardo Kola' },
        { code: 'SARDAUNA', name: 'Sardauna' },
        { code: 'YORRO', name: 'Yorro' },
        { code: 'IBI', name: 'Ibi' }
      ]
    },
    { code: 'BA', name: 'Bauchi',
      cities: [
        { code: 'BAUCHI', name: 'Bauchi' },
        { code: 'AZARE', name: 'Azare' },
        { code: 'MISAU', name: 'Misau' },
        { code: 'JAMA', name: 'Jama\'are' },
        { code: 'KATAGUM', name: 'Katagum' },
        { code: 'GANJUWA', name: 'Ganjuwa' },
        { code: 'TAFAWA', name: 'Tafawa Balewa' },
        { code: 'DARAZO', name: 'Darazo' },
        { code: 'BOGORO', name: 'Bogoro' },
        { code: 'KIRFI', name: 'Kirfi' }
      ]
    },
    // North West States
    { code: 'KN', name: 'Kano',
      cities: [
        { code: 'KANO', name: 'Kano' },
        { code: 'DUTSE', name: 'Dutse' },
        { code: 'GAYA', name: 'Gaya' },
        { code: 'WUDIL', name: 'Wudil' },
        { code: 'RANO', name: 'Rano' },
        { code: 'BICHI', name: 'Bichi' },
        { code: 'GARKO', name: 'Garko' },
        { code: 'TAKAI', name: 'Takai' },
        { code: 'SUMAILA', name: 'Sumaila' },
        { code: 'SHANONO', name: 'Shanono' }
      ]
    },
    { code: 'KT', name: 'Katsina',
      cities: [
        { code: 'KATSINA', name: 'Katsina' },
        { code: 'DAURA', name: 'Daura' },
        { code: 'FUNTUA', name: 'Funtua' },
        { code: 'MALUMFASHI', name: 'Malumfashi' },
        { code: 'BAURE', name: 'Baure' },
        { code: 'BINDAWA', name: 'Bindawa' },
        { code: 'DANJA', name: 'Danja' },
        { code: 'DUTSI', name: 'Dutsi' },
        { code: 'INGAWA', name: 'Ingawa' },
        { code: 'JIBIYA', name: 'Jibiya' }
      ]
    },
    { code: 'KD', name: 'Kaduna',
      cities: [
        { code: 'KADUNA', name: 'Kaduna' },
        { code: 'ZARIA', name: 'Zaria' },
        { code: 'KAFANCHAN', name: 'Kafanchan' },
        { code: 'KAGORO', name: 'Kagoro' },
        { code: 'ZONKWA', name: 'Zonkwa' },
        { code: 'KACHIA', name: 'Kachia' },
        { code: 'KAGARKO', name: 'Kagarko' },
        { code: 'BIRNIN', name: 'Birnin Gwari' },
        { code: 'GIWA', name: 'Giwa' },
        { code: 'IKARA', name: 'Ikara' }
      ]
    },
    { code: 'SO', name: 'Sokoto',
      cities: [
        { code: 'SOKOTO', name: 'Sokoto' },
        { code: 'TAMBUWAL', name: 'Tambuwal' },
        { code: 'GWADABAWA', name: 'Gwadabawa' },
        { code: 'BINJI', name: 'Binji' },
        { code: 'ILLELA', name: 'Illela' },
        { code: 'GADA', name: 'Gada' },
        { code: 'TANGAZA', name: 'Tangaza' },
        { code: 'SABON', name: 'Sabon Birni' },
        { code: 'ISA', name: 'Isa' },
        { code: 'RABAH', name: 'Rabah' }
      ]
    },
    { code: 'ZM', name: 'Zamfara',
      cities: [
        { code: 'GUSAU', name: 'Gusau' },
        { code: 'TALATA', name: 'Talata Mafara' },
        { code: 'Kaura', name: 'Kaura Namoda' },
        { code: 'BUNGUDU', name: 'Bungudu' },
        { code: 'MARU', name: 'Maru' },
        { code: 'MARADUN', name: 'Maradun' },
        { code: 'SHINKAFI', name: 'Shinkafi' },
        { code: 'BIRNIN', name: 'Birnin Magaji' },
        { code: 'ANKA', name: 'Anka' },
        { code: 'Bukkuyum', name: 'Bukkuyum' }
      ]
    },
    { code: 'KB', name: 'Kebbi',
      cities: [
        { code: 'BIRNIN', name: 'Birnin Kebbi' },
        { code: 'ARGUNGU', name: 'Argungu' },
        { code: 'YELWA', name: 'Yelwa' },
        { code: 'BUNZA', name: 'Bunza' },
        { code: 'GANDU', name: 'Gandu' },
        { code: 'KALGO', name: 'Kalgo' },
        { code: 'KOKE', name: 'Koke' },
        { code: 'MAIYAMA', name: 'Maiyama' },
        { code: 'NGASKI', name: 'Ngaski' },
        { code: 'SAKABA', name: 'Sakaba' }
      ]
    },
    { code: 'JI', name: 'Jigawa',
      cities: [
        { code: 'DUTSE', name: 'Dutse' },
        { code: 'HADEJIA', name: 'Hadejia' },
        { code: 'KAZAURE', name: 'Kazaure' },
        { code: 'RINGIM', name: 'Ringim' },
        { code: 'BIRNIN', name: 'Birnin Kudu' },
        { code: 'KIRI', name: 'Kiri Kasama' },
        { code: 'GUMEL', name: 'Gumel' },
        { code: 'GURI', name: 'Guri' },
        { code: 'GWARZO', name: 'Gwarzo' },
        { code: 'Taura', name: 'Taura' }
      ]
    },
    // South West States
    { code: 'LA', name: 'Lagos',
      cities: [
        { code: 'LAGOS', name: 'Lagos' },
        { code: 'IKEJA', name: 'Ikeja' },
        { code: 'BADAGRY', name: 'Badagry' },
        { code: 'EPE', name: 'Epe' },
        { code: 'IKORODU', name: 'Ikorodu' },
        { code: 'MUSHIN', name: 'Mushin' },
        { code: 'OSHODI', name: 'Oshodi' },
        { code: 'SURULERE', name: 'Surulere' },
        { code: 'FESTAC', name: 'Festac Town' },
        { code: 'VI', name: 'Victoria Island' }
      ]
    },
    { code: 'OG', name: 'Ogun',
      cities: [
        { code: 'ABEOKUTA', name: 'Abeokuta' },
        { code: 'IJEBU', name: 'Ijebu-Ode' },
        { code: 'SAGAMU', name: 'Sagamu' },
        { code: 'OTTA', name: 'Otta' },
        { code: 'ILARO', name: 'Ilaro' },
        { code: 'IJEBU', name: 'Ijebu-Igbo' },
        { code: 'OGO', name: 'Ogo-Oluwa' },
        { code: 'REMO', name: 'Remo' },
        { code: 'IPERU', name: 'Iperu' },
        { code: 'SHAGAMU', name: 'Shagamu' }
      ]
    },
    { code: 'OY', name: 'Oyo',
      cities: [
        { code: 'IBADAN', name: 'Ibadan' },
        { code: 'OYO', name: 'Oyo' },
        { code: 'OGBOMOSO', name: 'Ogbomoso' },
        { code: 'ISEYIN', name: 'Iseyin' },
        { code: 'OKEHO', name: 'Okeho' },
        { code: 'IGBOHO', name: 'Igboho' },
        { code: 'SAKI', name: 'Saki' },
        { code: 'EDE', name: 'Ede' },
        { code: 'OSHOGBO', name: 'Osogbo' },
        { code: 'IBADAN2', name: 'Ibadan North' }
      ]
    },
    { code: 'OS', name: 'Osun',
      cities: [
        { code: 'OSOGBO', name: 'Osogbo' },
        { code: 'ILE', name: 'Ile-Ife' },
        { code: 'EDE', name: 'Ede' },
        { code: 'IKEJI', name: 'Ikeji-Arakeji' },
        { code: 'ILESHA', name: 'Ilesha' },
        { code: 'IKIRUN', name: 'Ikirun' },
        { code: 'IKIRE', name: 'Ikire' },
        { code: 'EJIGBO', name: 'Ejigbo' },
        { code: 'IFON', name: 'Ifon' },
        { code: 'ILA', name: 'Ila' }
      ]
    },
    { code: 'ON', name: 'Ondo',
      cities: [
        { code: 'AKURE', name: 'Akure' },
        { code: 'ONDO', name: 'Ondo' },
        { code: 'OKITIPUPA', name: 'Okitipupa' },
        { code: 'ADO', name: 'Ado-Ekiti' },
        { code: 'IKARE', name: 'Ikare' },
        { code: 'OBA', name: 'Oba-Akoko' },
        { code: 'OKE', name: 'Oke-Igbo' },
        { code: 'IGBOKODA', name: 'Igbokoda' },
        { code: 'IRAGBIJI', name: 'Iragbiji' },
        { code: 'ORE', name: 'Ore' }
      ]
    },
    { code: 'EK', name: 'Ekiti',
      cities: [
        { code: 'ADO', name: 'Ado-Ekiti' },
        { code: 'IKERE', name: 'Ikere-Ekiti' },
        { code: 'OTUN', name: 'Otun-Ekiti' },
        { code: 'OYE', name: 'Oye-Ekiti' },
        { code: 'EMURE', name: 'Emure-Ekiti' },
        { code: 'IJERO', name: 'Ijero-Ekiti' },
        { code: 'IDO', name: 'Ido-Osi' },
        { code: 'MOPA', name: 'Mopa' },
        { code: 'ARAMOKO', name: 'Aramoko-Ekiti' },
        { code: 'ISE', name: 'Ise-Ekiti' }
      ]
    },
    // South East States
    { code: 'EN', name: 'Enugu',
      cities: [
        { code: 'ENUGU', name: 'Enugu' },
        { code: 'NSUKKA', name: 'Nsukka' },
        { code: 'AWKA', name: 'Awka' },
        { code: 'ONITSHA', name: 'Onitsha' },
        { code: 'OJI', name: 'Oji River' },
        { code: 'UDI', name: 'Udi' },
        { code: 'AGBANI', name: 'Agbani' },
        { code: 'EKWULOBIA', name: 'Ekwulobia' },
        { code: 'IGBO', name: 'Igbo-Ukwu' },
        { code: 'NNEWI', name: 'Nnewi' }
      ]
    },
    { code: 'AN', name: 'Anambra',
      cities: [
        { code: 'AWKA', name: 'Awka' },
        { code: 'ONITSHA', name: 'Onitsha' },
        { code: 'NNEWI', name: 'Nnewi' },
        { code: 'EKWULOBIA', name: 'Ekwulobia' },
        { code: 'OBA', name: 'Oba' },
        { code: 'IHIALA', name: 'Ihiala' },
        { code: 'AGULERI', name: 'Aguleri' },
        { code: 'UMU', name: 'Umuahia' },
        { code: 'OGIDI', name: 'Ogidi' },
        { code: 'ADAZI', name: 'Adazi' }
      ]
    },
    { code: 'IM', name: 'Imo',
      cities: [
        { code: 'OWERRI', name: 'Owerri' },
        { code: 'ORLU', name: 'Orlu' },
        { code: 'OKIGWE', name: 'Okigwe' },
        { code: 'MBANO', name: 'Mbano' },
        { code: 'MBAISE', name: 'Mbaise' },
        { code: 'OGUTA', name: 'Oguta' },
        { code: 'IHITTE', name: 'Ihitte' },
        { code: 'NKWERRE', name: 'Nkwerre' },
        { code: 'ORU', name: 'Oru' },
        { code: 'IDEATO', name: 'Ideato' }
      ]
    },
    { code: 'AB', name: 'Abia',
      cities: [
        { code: 'UMUAHIA', name: 'Umuahia' },
        { code: 'ABA', name: 'Aba' },
        { code: 'OHAFIA', name: 'Ohafia' },
        { code: 'AFIKPO', name: 'Afikpo' },
        { code: 'ISU', name: 'Isu' },
        { code: 'AKWETE', name: 'Akwete' },
        { code: 'BENDE', name: 'Bende' },
        { code: 'IHEO', name: 'Iheo' },
        { code: 'OBINGO', name: 'Obingo' },
        { code: 'UKWA', name: 'Ukwa' }
      ]
    },
    { code: 'EB', name: 'Ebonyi',
      cities: [
        { code: 'ABAKALIKI', name: 'Abakaliki' },
        { code: 'AFIKPO', name: 'Afikpo' },
        { code: 'ONUEKE', name: 'Onueke' },
        { code: 'EBONYI', name: 'Ebonyi' },
        { code: 'IKWO', name: 'Ikwo' },
        { code: 'IZZI', name: 'Izzi' },
        { code: 'ISHIELU', name: 'Ishielu' },
        { code: 'OHAOZARA', name: 'Ohaozara' },
        { code: 'ONICHA', name: 'Onicha' },
        { code: 'EZZA', name: 'Ezza' }
      ]
    },
    // South South States
    { code: 'RI', name: 'Rivers',
      cities: [
        { code: 'PORT', name: 'Port Harcourt' },
        { code: 'BONNY', name: 'Bonny' },
        { code: 'OMOKU', name: 'Omoku' },
        { code: 'ELELE', name: 'Elele' },
        { code: 'DEGEMA', name: 'Degema' },
        { code: 'AHOADA', name: 'Ahoada' },
        { code: 'OBIO', name: 'Obio-Akpor' },
        { code: 'OKRIKA', name: 'Okrika' },
        { code: 'OGU', name: 'Ogu-Bolo' },
        { code: 'ANDONI', name: 'Andoni' }
      ]
    },
    { code: 'BY', name: 'Bayelsa',
      cities: [
        { code: 'YENAGOA', name: 'Yenagoa' },
        { code: 'KAIAMA', name: 'Kaiama' },
        { code: 'SAGBAMA', name: 'Sagbama' },
        { code: 'BRASS', name: 'Brass' },
        { code: 'NEMBE', name: 'Nembe' },
        { code: 'OGBIA', name: 'Ogbia' },
        { code: 'EKEREMOR', name: 'Ekeremor' },
        { code: 'SOUTHERN', name: 'Southern Ijaw' },
        { code: 'KOLOKUMA', name: 'Kolokuma-Opokuma' },
        { code: 'YENAGOA2', name: 'Yenagoa North' }
      ]
    },
    { code: 'DE', name: 'Delta',
      cities: [
        { code: 'ASABA', name: 'Asaba' },
        { code: 'WARRI', name: 'Warri' },
        { code: 'UGHELLI', name: 'Ughelli' },
        { code: 'SAPELE', name: 'Sapele' },
        { code: 'AGBOR', name: 'Agbor' },
        { code: 'OBIARUKU', name: 'Obiaruku' },
        { code: 'KOKORI', name: 'Kokori' },
        { code: 'OZORO', name: 'Ozoro' },
        { code: 'KOKORI2', name: 'Kokori' },
        { code: 'IDUMUJE', name: 'Idumuje-Ugboko' }
      ]
    },
    { code: 'ED', name: 'Edo',
      cities: [
        { code: 'BENIN', name: 'Benin City' },
        { code: 'EKPO', name: 'Ekpoma' },
        { code: 'UBIAJA', name: 'Ubiaja' },
        { code: 'IGUEBEN', name: 'Igueben' },
        { code: 'AFUZE', name: 'Afuze' },
        { code: 'FUGAR', name: 'Fugar' },
        { code: 'IRRUA', name: 'Irrua' },
        { code: 'SABONGIDA', name: 'Sabongida-Ora' },
        { code: 'USAGBE', name: 'Usagbe' },
        { code: 'UGBOKHA', name: 'Ugbokha' }
      ]
    },
    { code: 'AK', name: 'Akwa Ibom',
      cities: [
        { code: 'UYO', name: 'Uyo' },
        { code: 'IKOT', name: 'Ikot Ekpene' },
        { code: 'ETINAN', name: 'Etinan' },
        { code: 'IKOT', name: 'Ikot Abasi' },
        { code: 'IBENO', name: 'Ibeno' },
        { code: 'ORON', name: 'Oron' },
        { code: 'EKET', name: 'Eket' },
        { code: 'ABAK', name: 'Abak' },
        { code: 'ITU', name: 'Itu' },
        { code: 'NSIT', name: 'Nsit' }
      ]
    },
    { code: 'CR', name: 'Cross River',
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
    { code: 'KUMASI', name: 'Ashanti',
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
  code: 'ZW',
  name: 'Zimbabwe',
  taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'ZWL', region: 'MEA' },
  provinces: [
    { code: 'HARARE', name: 'Harare',
      cities: [
        { code: 'HARARE', name: 'Harare' },
        { code: 'BULAWAYO', name: 'Bulawayo' },
        { code: 'CHITUNGWIZA', name: 'Chitungwiza' },
        { code: 'MUTARE', name: 'Mutare' },
        { code: 'GWERU', name: 'Gweru' },
        { code: 'KWEKWE', name: 'Kwekwe' },
        { code: 'KADOMA', name: 'Kadoma' },
        { code: 'MASVINGO', name: 'Masvingo' },
        { code: 'MARONDERA', name: 'Marondera' },
        { code: 'RUSAPE', name: 'Rusape' }
      ]
    }
  ]
},
  {
  code: 'BW',
  name: 'Botswana',
  taxInfo: { standardRate: 12, taxName: 'VAT', currency: 'BWP', region: 'MEA' },
  provinces: [
    { code: 'GABORONE', name: 'Gaborone',
      cities: [
        { code: 'GABORONE', name: 'Gaborone' },
        { code: 'FRANCISTOWN', name: 'Francistown' },
        { code: 'MAUN', name: 'Maun' },
        { code: 'SELEBI', name: 'Selebi-Phikwe' },
        { code: 'SEROWE', name: 'Serowe' },
        { code: 'MAHALAPYE', name: 'Mahalapye' },
        { code: 'MOCHUDI', name: 'Mochudi' },
        { code: 'KANYE', name: 'Kanye' },
        { code: 'LOBATSE', name: 'Lobatse' },
        { code: 'PALAPYE', name: 'Palapye' }
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
  taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'GBP', region: 'EMEA' },
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