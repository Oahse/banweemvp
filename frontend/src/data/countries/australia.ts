/**
 * Australia country data with states, cities, and tax information
 */

import { Country } from './index';

export const australia: Country = {
    code: 'AU',
    name: 'Australia',
    taxInfo: { standardRate: 10, taxName: 'GST', currency: 'AUD', region: 'APAC' },
    provinces: [
      { code: 'NSW', name: 'New South Wales',
        cities: [
          { code: 'SYD', name: 'Sydney' },
          { code: 'NEWCASTLE', name: 'Newcastle' },
          { code: 'WOLLONGONG', name: 'Wollongong' },
          { code: 'CENTRAL', name: 'Central Coast' },
          { code: 'NEWCASTLE2', name: 'Newcastle' },
          { code: 'LAKE', name: 'Lake Macquarie' },
          { code: 'WOLLONGONG2', name: 'Wollongong' },
          { code: 'NEWCASTLE3', name: 'Newcastle' },
          { code: 'WAGGA', name: 'Wagga Wagga' },
          { code: 'TAMWORTH', name: 'Tamworth' }
        ]
      },
      { code: 'VIC', name: 'Victoria',
        cities: [
          { code: 'MEL', name: 'Melbourne' },
          { code: 'GEELONG', name: 'Geelong' },
          { code: 'BALLARAT', name: 'Ballarat' },
          { code: 'BENDIGO', name: 'Bendigo' },
          { code: 'SHEPPARTON', name: 'Shepparton' },
          { code: 'MELTON', name: 'Melton' },
          { code: 'WARRNAMBOOL', name: 'Warrnambool' },
          { code: 'WANGARATTA', name: 'Wangaratta' },
          { code: 'TRARALGON', name: 'Traralgon' },
          { code: 'MILDURA', name: 'Mildura' }
        ]
      },
      { code: 'QLD', name: 'Queensland',
        cities: [
          { code: 'BNE', name: 'Brisbane' },
          { code: 'GOLD', name: 'Gold Coast' },
          { code: 'SUNSHINE', name: 'Sunshine Coast' },
          { code: 'TOWNSVILLE', name: 'Townsville' },
          { code: 'CAIRNS', name: 'Cairns' },
          { code: 'MACKAY', name: 'Mackay' },
          { code: 'ROCKHAMPTON', name: 'Rockhampton' },
          { code: 'BUNDABERG', name: 'Bundaberg' },
          { code: 'HERVEY', name: 'Hervey Bay' },
          { code: 'TOOWOOMBA', name: 'Toowoomba' }
        ]
      },
      { code: 'WA', name: 'Western Australia',
        cities: [
          { code: 'PER', name: 'Perth' },
          { code: 'FREMANTLE', name: 'Fremantle' },
          { code: 'BUNBURY', name: 'Bunbury' },
          { code: 'ROCKINGHAM', name: 'Rockingham' },
          { code: 'MANDURAH', name: 'Mandurah' },
          { code: 'KALGOORLIE', name: 'Kalgoorlie' },
          { code: 'ALBANY', name: 'Albany' },
          { code: 'GERALDTON', name: 'Geraldton' },
          { code: 'PORT', name: 'Port Hedland' },
          { code: 'KARRATHA', name: 'Karratha' }
        ]
      },
      { code: 'SA', name: 'South Australia',
        cities: [
          { code: 'ADL', name: 'Adelaide' },
          { code: 'MOUNT', name: 'Mount Gambier' },
          { code: 'WHYALLA', name: 'Whyalla' },
          { code: 'MURRAY', name: 'Murray Bridge' },
          { code: 'PORT', name: 'Port Augusta' },
          { code: 'PORT2', name: 'Port Pirie' },
          { code: 'VICTOR', name: 'Victor Harbor' },
          { code: 'MOUNT2', name: 'Mount Barker' },
          { code: 'ELIZABETH', name: 'Elizabeth' },
          { code: 'GAWLER', name: 'Gawler' }
        ]
      },
      { code: 'TAS', name: 'Tasmania',
        cities: [
          { code: 'HOBART', name: 'Hobart' },
          { code: 'LAUNCESTON', name: 'Launceston' },
          { code: 'BURNIE', name: 'Burnie' },
          { code: 'DEVONPORT', name: 'Devonport' },
          { code: 'ULVERSTONE', name: 'Ulverstone' },
          { code: 'SMITHTON', name: 'Smithton' },
          { code: 'QUEENSTOWN', name: 'Queenstown' },
          { code: 'GEORGE', name: 'George Town' },
          { code: 'SWANSEA', name: 'Swansea' },
          { code: 'RICHMOND', name: 'Richmond' }
        ]
      },
      { code: 'ACT', name: 'Australian Capital Territory',
        cities: [
          { code: 'CANBERRA', name: 'Canberra' },
          { code: 'QUEANBEYAN', name: 'Queanbeyan' },
          { code: 'YASS', name: 'Yass' },
          { code: 'COOMA', name: 'Cooma' },
          { code: 'GOULBURN', name: 'Goulburn' },
          { code: 'BUNGENDORE', name: 'Bungendore' },
          { code: 'MURRUMBAT', name: 'Murrumbateman' },
          { code: 'WODEN', name: 'Woden' },
          { code: 'TUGGERANONG', name: 'Tuggeranong' },
          { code: 'BELCONNEN', name: 'Belconnen' }
        ]
      },
      { code: 'NT', name: 'Northern Territory',
        cities: [
          { code: 'DARWIN', name: 'Darwin' },
          { code: 'ALICE', name: 'Alice Springs' },
          { code: 'PALMERSTON', name: 'Palmerston' },
          { code: 'KATHERINE', name: 'Katherine' },
          { code: 'TENNANT', name: 'Tennant Creek' },
          { code: 'JABIRU', name: 'Jabiru' },
          { code: 'NHULUNBUY', name: 'Nhulunbuy' },
          { code: 'WADEYE', name: 'Wadeye' },
          { code: 'ALICE2', name: 'Alice Springs' },
          { code: 'DARWIN2', name: 'Darwin' }
        ]
      }
    ]
};
