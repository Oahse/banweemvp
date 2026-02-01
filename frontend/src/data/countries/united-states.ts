/**
 * United States country data with states, cities, and tax information
 */

import { Country } from './index';

export const unitedStates: Country = {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    capital: 'Washington, D.C.',
    area: 9833517,
    currencySymbol: '$',
    officialLanguages: ['English'],
    demonym: 'American',
    taxInfo: { standardRate: 0, taxName: 'Sales Tax', currency: 'USD', region: 'NA' },
    divisions: [
      { code: 'AL', name: 'Alabama', type: 'state',
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
      { code: 'AK', name: 'Alaska', type: 'state',
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
      { code: 'AZ', name: 'Arizona', type: 'state',
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
      { code: 'CA', name: 'California', type: 'state',
        taxInfo: { standardRate: 7.25, taxName: 'Sales Tax', currency: 'USD', region: 'NA' },
        cities: [
          { code: 'LA', name: 'Los Angeles' },
          { code: 'SD', name: 'San Diego' },
          { code: 'SJ', name: 'San Jose' },
          { code: 'SF', name: 'San Francisco' },
          { code: 'FR', name: 'Fresno' },
          { code: 'SC', name: 'Sacramento' },
          { code: 'LB', name: 'Long Beach' },
          { code: 'OA', name: 'Oakland' },
          { code: 'BK', name: 'Bakersfield' },
          { code: 'AN', name: 'Anaheim' }
        ]
      },
      { code: 'AR', name: 'Arkansas', type: 'state',
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
      { code: 'CO', name: 'Colorado', type: 'state', 
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
      { code: 'CT', name: 'Connecticut', type: 'state', 
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
      { code: 'DE', name: 'Delaware', type: 'state',
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
      { code: 'GA', name: 'Georgia', type: 'state',
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
      { code: 'FL', name: 'Florida', type: 'state',
        taxInfo: { standardRate: 6, taxName: 'Sales Tax', currency: 'USD', region: 'NA' },
        cities: [
          { code: 'JA', name: 'Jacksonville' },
          { code: 'MI', name: 'Miami' },
          { code: 'TA', name: 'Tampa' },
          { code: 'OR', name: 'Orlando' },
          { code: 'ST', name: 'St. Petersburg' },
          { code: 'HE', name: 'Hialeah' },
          { code: 'TA2', name: 'Tallahassee' },
          { code: 'FO', name: 'Fort Lauderdale' },
          { code: 'PO', name: 'Port St. Lucie' },
          { code: 'CA', name: 'Cape Coral' }
        ]
      },
      { code: 'HI', name: 'Hawaii', type: 'state',
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
      { code: 'ID', name: 'Idaho', type: 'state',
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
      { code: 'IL', name: 'Illinois', type: 'state',
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
      { code: 'IN', name: 'Indiana', type: 'state',
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
      { code: 'IA', name: 'Iowa', type: 'state',
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
      { code: 'KS', name: 'Kansas', type: 'state',
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
      { code: 'KY', name: 'Kentucky', type: 'state',
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
      { code: 'LA', name: 'Louisiana', type: 'state',
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
      { code: 'ME', name: 'Maine', type: 'state',
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
      { code: 'MD', name: 'Maryland', type: 'state',
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
      { code: 'MA', name: 'Massachusetts', type: 'state',
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
      { code: 'MI', name: 'Michigan', type: 'state',
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
      { code: 'MN', name: 'Minnesota', type: 'state',
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
      { code: 'MS', name: 'Mississippi', type: 'state',
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
      { code: 'MO', name: 'Missouri', type: 'state',
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
      { code: 'MT', name: 'Montana', type: 'state',
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
      { code: 'NE', name: 'Nebraska', type: 'state',
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
      { code: 'NV', name: 'Nevada', type: 'state',
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
      { code: 'NH', name: 'New Hampshire', type: 'state',
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
      { code: 'NJ', name: 'New Jersey', type: 'state',
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
      { code: 'NM', name: 'New Mexico', type: 'state',
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
      { code: 'NY', name: 'New York', type: 'state',
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
      { code: 'NC', name: 'North Carolina', type: 'state',
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
      { code: 'ND', name: 'North Dakota', type: 'state',
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
      { code: 'OH', name: 'Ohio', type: 'state',
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
      { code: 'OK', name: 'Oklahoma', type: 'state',
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
      { code: 'OR', name: 'Oregon', type: 'state',
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
      { code: 'PA', name: 'Pennsylvania', type: 'state',
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
      { code: 'RI', name: 'Rhode Island', type: 'state',
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
      { code: 'SC', name: 'South Carolina', type: 'state',
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
      { code: 'SD', name: 'South Dakota', type: 'state',
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
      { code: 'TN', name: 'Tennessee', type: 'state',
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
      { code: 'TX', name: 'Texas', type: 'state',
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
      { code: 'UT', name: 'Utah', type: 'state',
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
      { code: 'VT', name: 'Vermont', type: 'state',
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
      { code: 'VA', name: 'Virginia', type: 'state',
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
      { code: 'WA', name: 'Washington', type: 'state',
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
      { code: 'WV', name: 'West Virginia', type: 'state',
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
      { code: 'WI', name: 'Wisconsin', type: 'state',
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
      { code: 'WY', name: 'Wyoming', type: 'state',
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
      { code: 'DC', name: 'District of Columbia', type: 'federal district',
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
  };