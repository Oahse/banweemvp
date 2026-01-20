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

export interface Province {
  code: string;
  name: string;
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
      { code: 'CA', name: 'California' },
      { code: 'CO', name: 'Colorado' },
      { code: 'CT', name: 'Connecticut' },
      { code: 'DE', name: 'Delaware' },
      { code: 'FL', name: 'Florida' },
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
    provinces: [
      { code: 'AB', name: 'Alberta' },
      { code: 'BC', name: 'British Columbia' },
      { code: 'MB', name: 'Manitoba' },
      { code: 'NB', name: 'New Brunswick' },
      { code: 'NL', name: 'Newfoundland and Labrador' },
      { code: 'NS', name: 'Nova Scotia' },
      { code: 'ON', name: 'Ontario' },
      { code: 'PE', name: 'Prince Edward Island' },
      { code: 'QC', name: 'Quebec' },
      { code: 'SK', name: 'Saskatchewan' },
      { code: 'NT', name: 'Northwest Territories' },
      { code: 'NU', name: 'Nunavut' },
      { code: 'YT', name: 'Yukon' }
    ]
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    provinces: [
      { code: 'ENG', name: 'England' },
      { code: 'SCT', name: 'Scotland' },
      { code: 'WLS', name: 'Wales' },
      { code: 'NIR', name: 'Northern Ireland' }
    ]
  },
  {
    code: 'AU',
    name: 'Australia',
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
  {
    code: 'DE',
    name: 'Germany'
  },
  {
    code: 'FR',
    name: 'France'
  },
  {
    code: 'IT',
    name: 'Italy'
  },
  {
    code: 'ES',
    name: 'Spain'
  },
  {
    code: 'NL',
    name: 'Netherlands'
  },
  {
    code: 'BE',
    name: 'Belgium'
  },
  {
    code: 'CH',
    name: 'Switzerland'
  },
  {
    code: 'AT',
    name: 'Austria'
  },
  {
    code: 'SE',
    name: 'Sweden'
  },
  {
    code: 'NO',
    name: 'Norway'
  },
  {
    code: 'DK',
    name: 'Denmark'
  },
  {
    code: 'FI',
    name: 'Finland'
  },
  {
    code: 'JP',
    name: 'Japan'
  },
  {
    code: 'KR',
    name: 'South Korea'
  },
  {
    code: 'CN',
    name: 'China'
  },
  {
    code: 'IN',
    name: 'India'
  },
  {
    code: 'BR',
    name: 'Brazil'
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

export const getCountryOptions = (): CountryOption[] => {
  return countries.map(country => ({
    value: country.code,
    label: country.name
  }));
};

export const getProvinceOptions = (countryCode: string): ProvinceOption[] => {
  const country = countries.find(c => c.code === countryCode);
  if (!country || !country.provinces) {
    return [];
  }
  
  return country.provinces.map(province => ({
    value: province.code,
    label: province.name
  }));
};

export const getCountryByCode = (code: string): Country | undefined => {
  return countries.find(country => country.code === code);
};

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
    // Europe
    'GB': 'EU', 'DE': 'EU', 'FR': 'EU', 'IT': 'EU', 'ES': 'EU', 'NL': 'EU', 'BE': 'EU',
    'CH': 'EU', 'AT': 'EU', 'SE': 'EU', 'NO': 'EU', 'DK': 'EU', 'FI': 'EU', 'PL': 'EU',
    'CZ': 'EU', 'HU': 'EU', 'RO': 'EU', 'GR': 'EU', 'PT': 'EU', 'IE': 'EU',
    
    // North America
    'US': 'NA', 'CA': 'NA', 'MX': 'NA',
    
    // Asia Pacific
    'JP': 'APAC', 'KR': 'APAC', 'CN': 'APAC', 'IN': 'APAC', 'AU': 'APAC', 'TH': 'APAC',
    'MY': 'APAC', 'SG': 'APAC', 'ID': 'APAC', 'VN': 'APAC', 'PH': 'APAC',
    
    // Latin America
    'BR': 'LATAM', 'AR': 'LATAM',
    
    // Middle East & Africa
    'SA': 'MEA', 'AE': 'MEA', 'IL': 'MEA', 'TR': 'MEA', 'EG': 'MEA', 'ZA': 'MEA', 'NG': 'MEA',
    
    // Russia (can be considered as separate region or part of APAC)
    'RU': 'APAC'
  };
  
  return regionMap[countryCode] || 'Other';
};

export const taxNameOptions = [
  { value: 'VAT', label: 'VAT (Value Added Tax)' },
  { value: 'GST', label: 'GST (Goods and Services Tax)' },
  { value: 'HST', label: 'HST (Harmonized Sales Tax)' },
  { value: 'PST', label: 'PST (Provincial Sales Tax)' },
  { value: 'QST', label: 'QST (Quebec Sales Tax)' },
  { value: 'Sales Tax', label: 'Sales Tax' },
  { value: 'State Tax', label: 'State Tax' },
  { value: 'Local Tax', label: 'Local Tax' },
  { value: 'Municipal Tax', label: 'Municipal Tax' },
  { value: 'IVA', label: 'IVA (Impuesto al Valor Agregado)' },
  { value: 'ICMS', label: 'ICMS (Brazilian State Tax)' },
  { value: 'IPI', label: 'IPI (Brazilian Federal Tax)' },
  { value: 'PIS', label: 'PIS (Brazilian Social Tax)' },
  { value: 'COFINS', label: 'COFINS (Brazilian Social Tax)' },
  { value: 'ISS', label: 'ISS (Brazilian Service Tax)' },
  { value: 'IEPS', label: 'IEPS (Mexican Special Tax)' },
  { value: 'Consumption Tax', label: 'Consumption Tax' },
  { value: 'Excise Tax', label: 'Excise Tax' },
  { value: 'Customs Duty', label: 'Customs Duty' },
  { value: 'Import Tax', label: 'Import Tax' },
  { value: 'Export Tax', label: 'Export Tax' },
  { value: 'Withholding Tax', label: 'Withholding Tax' },
  { value: 'Service Tax', label: 'Service Tax' },
  { value: 'Luxury Tax', label: 'Luxury Tax' },
  { value: 'Environmental Tax', label: 'Environmental Tax' },
  { value: 'Digital Tax', label: 'Digital Tax' },
  { value: 'Carbon Tax', label: 'Carbon Tax' },
  { value: 'Tourism Tax', label: 'Tourism Tax' },
  { value: 'City Tax', label: 'City Tax' },
  { value: 'Regional Tax', label: 'Regional Tax' },
  { value: 'Federal Tax', label: 'Federal Tax' },
  { value: 'Provincial Tax', label: 'Provincial Tax' },
  { value: 'County Tax', label: 'County Tax' },
  { value: 'District Tax', label: 'District Tax' },
  { value: 'Special Tax', label: 'Special Tax' },
  { value: 'Stamp Duty', label: 'Stamp Duty' },
  { value: 'Transfer Tax', label: 'Transfer Tax' },
  { value: 'Registration Tax', label: 'Registration Tax' },
  { value: 'License Tax', label: 'License Tax' },
  { value: 'Permit Tax', label: 'Permit Tax' },
  { value: 'Other', label: 'Other' }
];

export default countries;