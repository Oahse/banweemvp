/**
 * Mongolia country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const mongolia: Country = {
    code: 'MN',
    name: 'Mongolia',
    taxInfo: { standardRate: 10, taxName: 'VAT', currency: 'MNT', region: 'APAC' },
    provinces: [
      { code: 'ULAANBAATAR', name: 'Ulaanbaatar',
        cities: [
          { code: 'ULAANBAATAR', name: 'Ulaanbaatar' },
          { code: 'SUKHBAATAR', name: 'Sukhbaatar' },
          { code: 'KHAN', name: 'Khan Uul' },
          { code: 'CHINGELTEI', name: 'Chingeltei' },
          { code: 'BAYANZURKH', name: 'Bayanzurkh' },
          { code: 'SONGINO', name: 'Songino Khairkhan' },
          { code: 'BAYANGOL', name: 'Bayangol' },
          { code: 'GER', name: 'Ger District' },
          { code: 'NARAN', name: 'Naran Tuul' },
          { code: 'BAGANUUR', name: 'Bagaanuur' }
        ]
      },
      { code: 'ARKHANGAI', name: 'Arkhangai',
        cities: [
          { code: 'TSETSERLEG', name: 'Tsetserleg' },
          { code: 'ERDENEMANDAL', name: 'Erdenemandal' },
          { code: 'IKH', name: 'Ikh Tamir' },
          { code: 'JARGALANT', name: 'Jargalant' },
          { code: 'KHANGAI', name: 'Khangai' },
          { code: 'KHOTONT', name: 'Khotont' },
          { code: 'KHARKHORIN', name: 'Kharhorin' },
          { code: 'TSENKHER', name: 'Tsenkher' },
          { code: 'TUVSHIN', name: 'Tuvshinshiree' },
          { code: 'UNDR', name: 'Undur Ulaan' }
        ]
      },
      { code: 'BAYAN', name: 'Bayan',
        cities: [
          { code: 'BAYAN', name: 'Bayan' },
          { code: 'BAYAN', name: 'Bayan' },
          { code: 'BAYAN', name: 'Bayan' },
          { code: 'BAYAN', name: 'Bayan' },
          { code: 'BAYAN', name: 'Bayan' },
          { code: 'BAYAN', name: 'Bayan' },
          { code: 'BAYAN', name: 'Bayan' },
          { code: 'BAYAN', name: 'Bayan' },
          { code: 'BAYAN', name: 'Bayan' },
          { code: 'BAYAN', name: 'Bayan' }
        ]
      },
      { code: 'BAYAN', name: 'Bayan',
        cities: [
          { code: 'BAYAN', name: 'Bayan' },
          { code: 'BAYAN', name: 'Bayan' },
          { code: 'BAYAN', name: 'Bayan' },
          { code: 'BAYAN', name: 'Bayan' },
          { code: 'BAYAN', name: 'Bayan' },
          { code: 'BAYAN', name: 'Bayan' },
          { code: 'BAYAN', name: 'Bayan' },
          { code: 'BAYAN', name: 'Bayan' },
          { code: 'BAYAN', name: 'Bayan' },
          { code: 'BAYAN', name: 'Bayan' }
        ]
      },
      { code: 'BULGAN', name: 'Bulgan',
        cities: [
          { code: 'BULGAN', name: 'Bulgan' },
          { code: 'ERDENET', name: 'Erdenet' },
          { code: 'DASHINCHILEN', name: 'Dashinchilen' },
          { code: 'KHANGAL', name: 'Khangal' },
          { code: 'KHISHIG', name: 'Khishig' },
          { code: 'MONGOL', name: 'Mongol' },
          { code: 'RAMA', name: 'Rama' },
          { code: 'SAIHAN', name: 'Saihan' },
          { code: 'SOMON', name: 'Somon' },
          { code: 'TEEL', name: 'Teel' }
        ]
      },
      { code: 'GOVI', name: 'Govi',
        cities: [
          { code: 'GOVI', name: 'Govi' },
          { code: 'GOVI', name: 'Govi' },
          { code: 'GOVI', name: 'Govi' },
          { code: 'GOVI', name: 'Govi' },
          { code: 'GOVI', name: 'Govi' },
          { code: 'GOVI', name: 'Govi' },
          { code: 'GOVI', name: 'Govi' },
          { code: 'GOVI', name: 'Govi' },
          { code: 'GOVI', name: 'Govi' },
          { code: 'GOVI', name: 'Govi' }
        ]
      },
      { code: 'KHENTII', name: 'Khentii',
        cities: [
          { code: 'CHINGGIS', name: 'Chinggis' },
          { code: 'BINDER', name: 'Binder' },
          { code: 'DADAL', name: 'Dadal' },
          { code: 'DELGERKHAAN', name: 'Delgerkhaan' },
          { code: 'GURVAN', name: 'Gurvan' },
          { code: 'JARGALKHAAN', name: 'Jargalkhaan' },
          { code: 'MUNGUNMORIT', name: 'Mungunmorit' },
          { code: 'NOROVLIN', name: 'Norovlin' },
          { code: 'OMNOGOVI', name: 'Omnogovi' },
          { code: 'TSENKH', name: 'Tsenkher' }
        ]
      },
      { code: 'KHUVSGUL', name: 'Khuvsgul',
        cities: [
          { code: 'MORON', name: 'Moron' },
          { code: 'BULGAN', name: 'Bulgan' },
          { code: 'CHANDMAN', name: 'Chandman' },
          { code: 'KHANKH', name: 'Khankh' },
          { code: 'KHOVSGOL', name: 'Khovsgol' },
          { code: 'RENCHINLHUMBE', name: 'Renchinlhumbe' },
          { code: 'SHIN', name: 'Shin' },
          { code: 'TOSONTSENGEL', name: 'Tosontsengel' },
          { code: 'TSAGAAN', name: 'Tsagaan' },
          { code: 'Ulaan', name: 'Ulaan Uul' }
        ]
      },
      { code: 'OMNOGOVI', name: 'Omnogovi',
        cities: [
          { code: 'DALANZADGAD', name: 'Dalanzadgad' },
          { code: 'BAYAN', name: 'Bayan' },
          { code: 'BULGAN', name: 'Bulgan' },
          { code: 'GOVI', name: 'Govi' },
          { code: 'KHAN', name: 'Khan' },
          { code: 'MANLA', name: 'Manla' },
          { code: 'NOMO', name: 'Nomo' },
          { code: 'SEVREI', name: 'Sevrei' },
          { code: 'TSOGT', name: 'Tsogt' },
          { code: 'TSOGTSETS', name: 'Tsogtsets' }
        ]
      },
      { code: 'ORKHON', name: 'Orkhon',
        cities: [
          { code: 'ERDENET', name: 'Erdenet' },
          { code: 'BULGAN', name: 'Bulgan' },
          { code: 'JARGALANT', name: 'Jargalant' },
          { code: 'KHANGAI', name: 'Khangai' },
          { code: 'KHARKHORIN', name: 'Kharhorin' },
          { code: 'TSENKHER', name: 'Tsenkher' },
          { code: 'TUVSHIN', name: 'Tuvshinshiree' },
          { code: 'UNDR', name: 'Undur Ulaan' },
          { code: 'BAYAN', name: 'Bayan' },
          { code: 'BAYAN', name: 'Bayan' }
        ]
      },
      { code: 'OVOR', name: 'Ovor',
        cities: [
          { code: 'OVOR', name: 'Ovor' },
          { code: 'OVOR', name: 'Ovor' },
          { code: 'OVOR', name: 'Ovor' },
          { code: 'OVOR', name: 'Ovor' },
          { code: 'OVOR', name: 'Ovor' },
          { code: 'OVOR', name: 'Ovor' },
          { code: 'OVOR', name: 'Ovor' },
          { code: 'OVOR', name: 'Ovor' },
          { code: 'OVOR', name: 'Ovor' },
          { code: 'OVOR', name: 'Ovor' }
        ]
      },
      { code: 'SEL', name: 'Selenge',
        cities: [
          { code: 'SUKHBAATAR', name: 'Sukhbaatar' },
          { code: 'ALTAN', name: 'Altan' },
          { code: 'BULGAN', name: 'Bulgan' },
          { code: 'DARKHAN', name: 'Darkhan' },
          { code: 'ERDENET', name: 'Erdenet' },
          { code: 'JARGALANT', name: 'Jargalant' },
          { code: 'KHANGAI', name: 'Khangai' },
          { code: 'KHARKHORIN', name: 'Kharhorin' },
          { code: 'TSENKHER', name: 'Tsenkher' },
          { code: 'TUVSHIN', name: 'Tuvshinshiree' }
        ]
      },
      { code: 'SUKHBAATAR', name: 'Sukhbaatar',
        cities: [
          { code: 'SUKHBAATAR', name: 'Sukhbaatar' },
          { code: 'BARUUN', name: 'Baruun' },
          { code: 'BULGAN', name: 'Bulgan' },
          { code: 'DARKHAN', name: 'Darkhan' },
          { code: 'ERDENET', name: 'Erdenet' },
          { code: 'JARGALANT', name: 'Jargalant' },
          { code: 'KHANGAI', name: 'Khangai' },
          { code: 'KHARKHORIN', name: 'Kharhorin' },
          { code: 'TSENKHER', name: 'Tsenkher' },
          { code: 'TUVSHIN', name: 'Tuvshinshiree' }
        ]
      },
      { code: 'TUV', name: 'Tuv',
        cities: [
          { code: 'ZUUN', name: 'Zuun' },
          { code: 'BAYAN', name: 'Bayan' },
          { code: 'BULGAN', name: 'Bulgan' },
          { code: 'DARKHAN', name: 'Darkhan' },
          { code: 'ERDENET', name: 'Erdenet' },
          { code: 'JARGALANT', name: 'Jargalant' },
          { code: 'KHANGAI', name: 'Khangai' },
          { code: 'KHARKHORIN', name: 'Kharhorin' },
          { code: 'TSENKHER', name: 'Tsenkher' },
          { code: 'TUVSHIN', name: 'Tuvshinshiree' }
        ]
      },
      { code: 'UVS', name: 'Uvs',
        cities: [
          { code: 'ULANGOM', name: 'Ulaangom' },
          { code: 'BULGAN', name: 'Bulgan' },
          { code: 'CHANDMAN', name: 'Chandman' },
          { code: 'KHANKH', name: 'Khankh' },
          { code: 'KHOVSGOL', name: 'Khovsgol' },
          { code: 'RENCHINLHUMBE', name: 'Renchinlhumbe' },
          { code: 'SHIN', name: 'Shin' },
          { code: 'TOSONTSENGEL', name: 'Tosontsengel' },
          { code: 'TSAGAAN', name: 'Tsagaan' },
          { code: 'Ulaan', name: 'Ulaan Uul' }
        ]
      },
      { code: 'ZAVKHAN', name: 'Zavkhan',
        cities: [
          { code: 'ULIASTAI', name: 'Uliastai' },
          { code: 'ALTAI', name: 'Altai' },
          { code: 'BAYAN', name: 'Bayan' },
          { code: 'BULGAN', name: 'Bulgan' },
          { code: 'CHANDMAN', name: 'Chandman' },
          { code: 'KHANKH', name: 'Khankh' },
          { code: 'KHOVSGOL', name: 'Khovsgol' },
          { code: 'RENCHINLHUMBE', name: 'Renchinlhumbe' },
          { code: 'SHIN', name: 'Shin' },
          { code: 'TOSONTSENGEL', name: 'Tosontsengel' }
        ]
      }
    ]
};
