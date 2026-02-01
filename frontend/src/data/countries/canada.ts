/**
 * Canada country data with states, cities, and tax information
 */

import { Country } from './index';

export const canada: Country = {
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
  };