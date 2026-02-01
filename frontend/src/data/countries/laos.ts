/**
 * Laos country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const laos: Country = {
    code: 'LA',
    name: 'Laos',
    taxInfo: { standardRate: 10, taxName: 'VAT', currency: 'LAK', region: 'APAC' },
    provinces: [
      { code: 'VTE', name: 'Vientiane',
        cities: [
          { code: 'VIENTIANE', name: 'Vientiane' },
          { code: 'VIENTIANE2', name: 'Vientiane' },
          { code: 'VIENTIANE3', name: 'Vientiane' },
          { code: 'VIENTIANE4', name: 'Vientiane' },
          { code: 'VIENTIANE5', name: 'Vientiane' },
          { code: 'VIENTIANE6', name: 'Vientiane' },
          { code: 'VIENTIANE7', name: 'Vientiane' },
          { code: 'VIENTIANE8', name: 'Vientiane' },
          { code: 'VIENTIANE9', name: 'Vientiane' },
          { code: 'VIENTIANE10', name: 'Vientiane' }
        ]
      },
      { code: 'LPB', name: 'Luang Prabang',
        cities: [
          { code: 'LUANG', name: 'Luang Prabang' },
          { code: 'LUANG2', name: 'Luang Prabang' },
          { code: 'LUANG3', name: 'Luang Prabang' },
          { code: 'LUANG4', name: 'Luang Prabang' },
          { code: 'LUANG5', name: 'Luang Prabang' },
          { code: 'LUANG6', name: 'Luang Prabang' },
          { code: 'LUANG7', name: 'Luang Prabang' },
          { code: 'LUANG8', name: 'Luang Prabang' },
          { code: 'LUANG9', name: 'Luang Prabang' },
          { code: 'LUANG10', name: 'Luang Prabang' }
        ]
      },
      { code: 'SVK', name: 'Savannakhet',
        cities: [
          { code: 'SAVANNAKHET', name: 'Savannakhet' },
          { code: 'SAVANNAKHET2', name: 'Savannakhet' },
          { code: 'SAVANNAKHET3', name: 'Savannakhet' },
          { code: 'SAVANNAKHET4', name: 'Savannakhet' },
          { code: 'SAVANNAKHET5', name: 'Savannakhet' },
          { code: 'SAVANNAKHET6', name: 'Savannakhet' },
          { code: 'SAVANNAKHET7', name: 'Savannakhet' },
          { code: 'SAVANNAKHET8', name: 'Savannakhet' },
          { code: 'SAVANNAKHET9', name: 'Savannakhet' },
          { code: 'SAVANNAKHET10', name: 'Savannakhet' }
        ]
      },
      { code: 'PXS', name: 'Pakse',
        cities: [
          { code: 'PAKSE', name: 'Pakse' },
          { code: 'PAKSE2', name: 'Pakse' },
          { code: 'PAKSE3', name: 'Pakse' },
          { code: 'PAKSE4', name: 'Pakse' },
          { code: 'PAKSE5', name: 'Pakse' },
          { code: 'PAKSE6', name: 'Pakse' },
          { code: 'PAKSE7', name: 'Pakse' },
          { code: 'PAKSE8', name: 'Pakse' },
          { code: 'PAKSE9', name: 'Pakse' },
          { code: 'PAKSE10', name: 'Pakse' }
        ]
      },
      { code: 'XNE', name: 'Xiangkhouang',
        cities: [
          { code: 'XIANGKHOUANG', name: 'Xiangkhouang' },
          { code: 'XIANGKHOUANG2', name: 'Xiangkhouang' },
          { code: 'XIANGKHOUANG3', name: 'Xiangkhouang' },
          { code: 'XIANGKHOUANG4', name: 'Xiangkhouang' },
          { code: 'XIANGKHOUANG5', name: 'Xiangkhouang' },
          { code: 'XIANGKHOUANG6', name: 'Xiangkhouang' },
          { code: 'XIANGKHOUANG7', name: 'Xiangkhouang' },
          { code: 'XIANGKHOUANG8', name: 'Xiangkhouang' },
          { code: 'XIANGKHOUANG9', name: 'Xiangkhouang' },
          { code: 'XIANGKHOUANG10', name: 'Xiangkhouang' }
        ]
      },
      { code: 'HOU', name: 'Houaphanh',
        cities: [
          { code: 'HOUAPHANH', name: 'Houaphanh' },
          { code: 'HOUAPHANH2', name: 'Houaphanh' },
          { code: 'HOUAPHANH3', name: 'Houaphanh' },
          { code: 'HOUAPHANH4', name: 'Houaphanh' },
          { code: 'HOUAPHANH5', name: 'Houaphanh' },
          { code: 'HOUAPHANH6', name: 'Houaphanh' },
          { code: 'HOUAPHANH7', name: 'Houaphanh' },
          { code: 'HOUAPHANH8', name: 'Houaphanh' },
          { code: 'HOUAPHANH9', name: 'Houaphanh' },
          { code: 'HOUAPHANH10', name: 'Houaphanh' }
        ]
      },
      { code: 'LM', name: 'Luang Namtha',
        cities: [
          { code: 'LUANG', name: 'Luang Namtha' },
          { code: 'LUANG2', name: 'Luang Namtha' },
          { code: 'LUANG3', name: 'Luang Namtha' },
          { code: 'LUANG4', name: 'Luang Namtha' },
          { code: 'LUANG5', name: 'Luang Namtha' },
          { code: 'LUANG6', name: 'Luang Namtha' },
          { code: 'LUANG7', name: 'Luang Namtha' },
          { code: 'LUANG8', name: 'Luang Namtha' },
          { code: 'LUANG9', name: 'Luang Namtha' },
          { code: 'LUANG10', name: 'Luang Namtha' }
        ]
      },
      { code: 'BL', name: 'Bokeo',
        cities: [
          { code: 'BOKEO', name: 'Bokeo' },
          { code: 'BOKEO2', name: 'Bokeo' },
          { code: 'BOKEO3', name: 'Bokeo' },
          { code: 'BOKEO4', name: 'Bokeo' },
          { code: 'BOKEO5', name: 'Bokeo' },
          { code: 'BOKEO6', name: 'Bokeo' },
          { code: 'BOKEO7', name: 'Bokeo' },
          { code: 'BOKEO8', name: 'Bokeo' },
          { code: 'BOKEO9', name: 'Bokeo' },
          { code: 'BOKEO10', name: 'Bokeo' }
        ]
      },
      { code: 'SL', name: 'Salavan',
        cities: [
          { code: 'SALAVAN', name: 'Salavan' },
          { code: 'SALAVAN2', name: 'Salavan' },
          { code: 'SALAVAN3', name: 'Salavan' },
          { code: 'SALAVAN4', name: 'Salavan' },
          { code: 'SALAVAN5', name: 'Salavan' },
          { code: 'SALAVAN6', name: 'Salavan' },
          { code: 'SALAVAN7', name: 'Salavan' },
          { code: 'SALAVAN8', name: 'Salavan' },
          { code: 'SALAVAN9', name: 'Salavan' },
          { code: 'SALAVAN10', name: 'Salavan' }
        ]
      },
      { code: 'XEK', name: 'Xekong',
        cities: [
          { code: 'XEKONG', name: 'Xekong' },
          { code: 'XEKONG2', name: 'Xekong' },
          { code: 'XEKONG3', name: 'Xekong' },
          { code: 'XEKONG4', name: 'Xekong' },
          { code: 'XEKONG5', name: 'Xekong' },
          { code: 'XEKONG6', name: 'Xekong' },
          { code: 'XEKONG7', name: 'Xekong' },
          { code: 'XEKONG8', name: 'Xekong' },
          { code: 'XEKONG9', name: 'Xekong' },
          { code: 'XEKONG10', name: 'Xekong' }
        ]
      },
      { code: 'AT', name: 'Attapeu',
        cities: [
          { code: 'ATTAPEU', name: 'Attapeu' },
          { code: 'ATTAPEU2', name: 'Attapeu' },
          { code: 'ATTAPEU3', name: 'Attapeu' },
          { code: 'ATTAPEU4', name: 'Attapeu' },
          { code: 'ATTAPEU5', name: 'Attapeu' },
          { code: 'ATTAPEU6', name: 'Attapeu' },
          { code: 'ATTAPEU7', name: 'Attapeu' },
          { code: 'ATTAPEU8', name: 'Attapeu' },
          { code: 'ATTAPEU9', name: 'Attapeu' },
          { code: 'ATTAPEU10', name: 'Attapeu' }
        ]
      },
      { code: 'BK', name: 'Bolikhamxay',
        cities: [
          { code: 'BOLIKHAMXAY', name: 'Bolikhamxay' },
          { code: 'BOLIKHAMXAY2', name: 'Bolikhamxay' },
          { code: 'BOLIKHAMXAY3', name: 'Bolikhamxay' },
          { code: 'BOLIKHAMXAY4', name: 'Bolikhamxay' },
          { code: 'BOLIKHAMXAY5', name: 'Bolikhamxay' },
          { code: 'BOLIKHAMXAY6', name: 'Bolikhamxay' },
          { code: 'BOLIKHAMXAY7', name: 'Bolikhamxay' },
          { code: 'BOLIKHAMXAY8', name: 'Bolikhamxay' },
          { code: 'BOLIKHAMXAY9', name: 'Bolikhamxay' },
          { code: 'BOLIKHAMXAY10', name: 'Bolikhamxay' }
        ]
      },
      { code: 'KHM', name: 'Khammouane',
        cities: [
          { code: 'KHAMMOUANE', name: 'Khammouane' },
          { code: 'KHAMMOUANE2', name: 'Khammouane' },
          { code: 'KHAMMOUANE3', name: 'Khammouane' },
          { code: 'KHAMMOUANE4', name: 'Khammouane' },
          { code: 'KHAMMOUANE5', name: 'Khammouane' },
          { code: 'KHAMMOUANE6', name: 'Khammouane' },
          { code: 'KHAMMOUANE7', name: 'Khammouane' },
          { code: 'KHAMMOUANE8', name: 'Khammouane' },
          { code: 'KHAMMOUANE9', name: 'Khammouane' },
          { code: 'KHAMMOUANE10', name: 'Khammouane' }
        ]
      },
      { code: 'OUX', name: 'Oudomxay',
        cities: [
          { code: 'OUDOMXAY', name: 'Oudomxay' },
          { code: 'OUDOMXAY2', name: 'Oudomxay' },
          { code: 'OUDOMXAY3', name: 'Oudomxay' },
          { code: 'OUDOMXAY4', name: 'Oudomxay' },
          { code: 'OUDOMXAY5', name: 'Oudomxay' },
          { code: 'OUDOMXAY6', name: 'Oudomxay' },
          { code: 'OUDOMXAY7', name: 'Oudomxay' },
          { code: 'OUDOMXAY8', name: 'Oudomxay' },
          { code: 'OUDOMXAY9', name: 'Oudomxay' },
          { code: 'OUDOMXAY10', name: 'Oudomxay' }
        ]
      },
      { code: 'PH', name: 'Phongsaly',
        cities: [
          { code: 'PHONGSALY', name: 'Phongsaly' },
          { code: 'PHONGSALY2', name: 'Phongsaly' },
          { code: 'PHONGSALY3', name: 'Phongsaly' },
          { code: 'PHONGSALY4', name: 'Phongsaly' },
          { code: 'PHONGSALY5', name: 'Phongsaly' },
          { code: 'PHONGSALY6', name: 'Phongsaly' },
          { code: 'PHONGSALY7', name: 'Phongsaly' },
          { code: 'PHONGSALY8', name: 'Phongsaly' },
          { code: 'PHONGSALY9', name: 'Phongsaly' },
          { code: 'PHONGSALY10', name: 'Phongsaly' }
        ]
      },
      { code: 'VI', name: 'Vientiane',
        cities: [
          { code: 'VIENTIANE', name: 'Vientiane' },
          { code: 'VIENTIANE2', name: 'Vientiane' },
          { code: 'VIENTIANE3', name: 'Vientiane' },
          { code: 'VIENTIANE4', name: 'Vientiane' },
          { code: 'VIENTIANE5', name: 'Vientiane' },
          { code: 'VIENTIANE6', name: 'Vientiane' },
          { code: 'VIENTIANE7', name: 'Vientiane' },
          { code: 'VIENTIANE8', name: 'Vientiane' },
          { code: 'VIENTIANE9', name: 'Vientiane' },
          { code: 'VIENTIANE10', name: 'Vientiane' }
        ]
      }
    ]
};
