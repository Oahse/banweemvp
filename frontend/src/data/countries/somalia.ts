/**
 * Somalia country data with regions, cities, and tax information
 */

import { Country } from './index';

export const somalia: Country = {
    code: 'SO',
    name: 'Somalia',
    taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'SOS', region: 'MEA' },
    provinces: [
      { code: 'BAN', name: 'Banaadir',
        cities: [
          { code: 'MOG', name: 'Mogadishu' },
          { code: 'AFGO', name: 'Afgooye' },
          { code: 'JOW', name: 'Jowhar' },
          { code: 'BAL', name: 'Balcad' },
          { code: 'WAN', name: 'Wanla Weyn' },
          { code: 'WAR', name: 'Warsheikh' },
          { code: 'EL', name: 'El Baraf' },
          { code: 'MAH', name: 'Mahaday' },
          { code: 'RUN', name: 'Runirgood' },
          { code: 'GAL', name: 'Galguduud' }
        ]
      },
      { code: 'NORT', name: 'Northwest',
        cities: [
          { code: 'HAR', name: 'Hargeisa' },
          { code: 'BOR', name: 'Burao' },
          { code: 'BER', name: 'Berbera' },
          { code: 'ERI', name: 'Erigavo' },
          { code: 'LAS', name: 'Las Anod' },
          { code: 'GAR', name: 'Garowe' },
          { code: 'BOS', name: 'Bosaso' },
          { code: 'GALK', name: 'Galkayo' },
          { code: 'CEER', name: 'Ceerigaabo' },
          { code: 'OOD', name: 'Oodweyne' }
        ]
      },
      { code: 'NORT2', name: 'Northeast',
        cities: [
          { code: 'GAR', name: 'Garowe' },
          { code: 'BOS', name: 'Bosaso' },
          { code: 'GALK', name: 'Galkayo' },
          { code: 'LAS', name: 'Las Anod' },
          { code: 'ERI', name: 'Erigavo' },
          { code: 'BER', name: 'Berbera' },
          { code: 'BOR', name: 'Burao' },
          { code: 'HAR', name: 'Hargeisa' },
          { code: 'CEER', name: 'Ceerigaabo' },
          { code: 'OOD', name: 'Oodweyne' }
        ]
      },
      { code: 'GAL', name: 'Galguduud',
        cities: [
          { code: 'DUS', name: 'Dhusamareb' },
          { code: 'CEEL', name: 'Ceel Dheer' },
          { code: 'GAL', name: 'Galguduud' },
          { code: 'EL', name: 'El Buur' },
          { code: 'BUL', name: 'Bulo Burde' },
          { code: 'ABUD', name: 'Abudwak' },
          { code: 'GEL', name: 'Gelinsoor' },
          { code: 'BARD', name: 'Bardhere' },
          { code: 'JAL', name: 'Jalalaqsi' },
          { code: 'BAY', name: 'Baydhabo' }
        ]
      },
      { code: 'HIR', name: 'Hiran',
        cities: [
          { code: 'BELE', name: 'Beledweyne' },
          { code: 'BUL', name: 'Bulo Burde' },
          { code: 'JAL', name: 'Jalalaqsi' },
          { code: 'MOO', name: 'Mogadishu' },
          { code: 'JOW', name: 'Jowhar' },
          { code: 'BAL', name: 'Balcad' },
          { code: 'WAN', name: 'Wanla Weyn' },
          { code: 'WAR', name: 'Warsheikh' },
          { code: 'EL', name: 'El Baraf' },
          { code: 'MAH', name: 'Mahaday' }
        ]
      },
      { code: 'MUD', name: 'Mudug',
        cities: [
          { code: 'GALK', name: 'Galkayo' },
          { code: 'GAR', name: 'Garowe' },
          { code: 'BOS', name: 'Bosaso' },
          { code: 'HOB', name: 'Hobyo' },
          { code: 'GAL', name: 'Galkayo' },
          { code: 'BAND', name: 'Bandar Beyla' },
          { code: 'BARD', name: 'Bardhere' },
          { code: 'JAL', name: 'Jalalaqsi' },
          { code: 'BELE', name: 'Beledweyne' },
          { code: 'BUL', name: 'Bulo Burde' }
        ]
      },
      { code: 'NUG', name: 'Nugaal',
        cities: [
          { code: 'GAR', name: 'Garowe' },
          { code: 'EYL', name: 'Eyl' },
          { code: 'BOS', name: 'Bosaso' },
          { code: 'GALK', name: 'Galkayo' },
          { code: 'HOB', name: 'Hobyo' },
          { code: 'BAND', name: 'Bandar Beyla' },
          { code: 'BARD', name: 'Bardhere' },
          { code: 'JAL', name: 'Jalalaqsi' },
          { code: 'BELE', name: 'Beledweyne' },
          { code: 'BUL', name: 'Bulo Burde' }
        ]
      },
      { code: 'BAY', name: 'Bay',
        cities: [
          { code: 'BAYD', name: 'Baidoa' },
          { code: 'BARD', name: 'Bardhere' },
          { code: 'DIIN', name: 'Diinsoor' },
          { code: 'QANS', name: 'Qansahdhere' },
          { code: 'BUR', name: 'Burhakaba' },
          { code: 'WAN', name: 'Wanla Weyn' },
          { code: 'JOW', name: 'Jowhar' },
          { code: 'BAL', name: 'Balcad' },
          { code: 'MOO', name: 'Mogadishu' },
          { code: 'AFGO', name: 'Afgooye' }
        ]
      },
      { code: 'BAK', name: 'Bakool',
        cities: [
          { code: 'HUD', name: 'Hudur' },
          { code: 'WED', name: 'Wajid' },
          { code: 'EL', name: 'El Barde' },
          { code: 'YED', name: 'Yeed' },
          { code: 'RAB', name: 'Rab Dhuure' },
          { code: 'TIYE', name: 'Tiyeglow' },
          { code: 'LUQ', name: 'Luuq' },
          { code: 'GAR', name: 'Garbaharey' },
          { code: 'BARD', name: 'Bardhere' },
          { code: 'BAYD', name: 'Baidoa' }
        ]
      },
      { code: 'LOW', name: 'Lower Shabelle',
        cities: [
          { code: 'MARK', name: 'Marka' },
          { code: 'BAR', name: 'Barawa' },
          { code: 'AFGO', name: 'Afgooye' },
          { code: 'WAN', name: 'Wanla Weyn' },
          { code: 'JOW', name: 'Jowhar' },
          { code: 'BAL', name: 'Balcad' },
          { code: 'MOO', name: 'Mogadishu' },
          { code: 'JAL', name: 'Jalalaqsi' },
          { code: 'BELE', name: 'Beledweyne' },
          { code: 'BUL', name: 'Bulo Burde' }
        ]
      },
      { code: 'MID', name: 'Middle Shabelle',
        cities: [
          { code: 'JOW', name: 'Jowhar' },
          { code: 'BAL', name: 'Balcad' },
          { code: 'MOO', name: 'Mogadishu' },
          { code: 'AFGO', name: 'Afgooye' },
          { code: 'WAN', name: 'Wanla Weyn' },
          { code: 'WAR', name: 'Warsheikh' },
          { code: 'EL', name: 'El Baraf' },
          { code: 'MAH', name: 'Mahaday' },
          { code: 'RUN', name: 'Runirgood' },
          { code: 'GAL', name: 'Galguduud' }
        ]
      },
      { code: 'GED', name: 'Gedo',
        cities: [
          { code: 'GAR', name: 'Garbaharey' },
          { code: 'BA', name: 'Bardhere' },
          { code: 'LUQ', name: 'Luuq' },
          { code: 'DOLO', name: 'Doolow' },
          { code: 'EL', name: 'El Wak' },
          { code: 'BELE', name: 'Beled Hawo' },
          { code: 'BARD', name: 'Bardhere' },
          { code: 'BAYD', name: 'Baidoa' },
          { code: 'DIIN', name: 'Diinsoor' },
          { code: 'QANS', name: 'Qansahdhere' }
        ]
      },
      { code: 'JUB', name: 'Jubbada Dhexe',
        cities: [
          { code: 'BU', name: 'Buale' },
          { code: 'JAM', name: 'Jamaame' },
          { code: 'JIL', name: 'Jilib' },
          { code: 'SAK', name: 'Sakow' },
          { code: 'BARD', name: 'Bardhere' },
          { code: 'BAYD', name: 'Baidoa' },
          { code: 'DIIN', name: 'Diinsoor' },
          { code: 'QANS', name: 'Qansahdhere' },
          { code: 'BUR', name: 'Burhakaba' },
          { code: 'WAN', name: 'Wanla Weyn' }
        ]
      },
      { code: 'JUB2', name: 'Jubbada Hoose',
        cities: [
          { code: 'KIS', name: 'Kismayo' },
          { code: 'JAM', name: 'Jamaame' },
          { code: 'JIL', name: 'Jilib' },
          { code: 'BU', name: 'Buale' },
          { code: 'SAK', name: 'Sakow' },
          { code: 'BARD', name: 'Bardhere' },
          { code: 'BAYD', name: 'Baidoa' },
          { code: 'DIIN', name: 'Diinsoor' },
          { code: 'QANS', name: 'Qansahdhere' },
          { code: 'BUR', name: 'Burhakaba' }
        ]
      },
      { code: 'SHAB', name: 'Shabeellaha Hoose',
        cities: [
          { code: 'MARK', name: 'Marka' },
          { code: 'BAR', name: 'Barawa' },
          { code: 'AFGO', name: 'Afgooye' },
          { code: 'WAN', name: 'Wanla Weyn' },
          { code: 'JOW', name: 'Jowhar' },
          { code: 'BAL', name: 'Balcad' },
          { code: 'MOO', name: 'Mogadishu' },
          { code: 'JAL', name: 'Jalalaqsi' },
          { code: 'BELE', name: 'Beledweyne' },
          { code: 'BUL', name: 'Bulo Burde' }
        ]
      },
      { code: 'SHAB2', name: 'Shabeellaha Dhexe',
        cities: [
          { code: 'JOW', name: 'Jowhar' },
          { code: 'BAL', name: 'Balcad' },
          { code: 'MOO', name: 'Mogadishu' },
          { code: 'AFGO', name: 'Afgooye' },
          { code: 'WAN', name: 'Wanla Weyn' },
          { code: 'WAR', name: 'Warsheikh' },
          { code: 'EL', name: 'El Baraf' },
          { code: 'MAH', name: 'Mahaday' },
          { code: 'RUN', name: 'Runirgood' },
          { code: 'GAL', name: 'Galguduud' }
        ]
      },
      { code: 'AWE', name: 'Awdal',
        cities: [
          { code: 'BOR', name: 'Borama' },
          { code: 'ZEI', name: 'Zeila' },
          { code: 'LOY', name: 'Loya Ade' },
          { code: 'BUL', name: 'Bulhar' },
          { code: 'HAR', name: 'Hargeisa' },
          { code: 'BER', name: 'Berbera' },
          { code: 'ERI', name: 'Erigavo' },
          { code: 'LAS', name: 'Las Anod' },
          { code: 'GAR', name: 'Garowe' },
          { code: 'BOS', name: 'Bosaso' }
        ]
      },
      { code: 'MAR', name: 'Maroodi Jeex',
        cities: [
          { code: 'HAR', name: 'Hargeisa' },
          { code: 'BER', name: 'Berbera' },
          { code: 'BOR', name: 'Burao' },
          { code: 'ERI', name: 'Erigavo' },
          { code: 'LAS', name: 'Las Anod' },
          { code: 'GAR', name: 'Garowe' },
          { code: 'BOS', name: 'Bosaso' },
          { code: 'GALK', name: 'Galkayo' },
          { code: 'CEER', name: 'Ceerigaabo' },
          { code: 'OOD', name: 'Oodweyne' }
        ]
      },
      { code: 'TOG', name: 'Togdheer',
        cities: [
          { code: 'BUR', name: 'Burao' },
          { code: 'HAR', name: 'Hargeisa' },
          { code: 'BER', name: 'Berbera' },
          { code: 'ERI', name: 'Erigavo' },
          { code: 'LAS', name: 'Las Anod' },
          { code: 'GAR', name: 'Garowe' },
          { code: 'BOS', name: 'Bosaso' },
          { code: 'GALK', name: 'Galkayo' },
          { code: 'CEER', name: 'Ceerigaabo' },
          { code: 'OOD', name: 'Oodweyne' }
        ]
      },
      { code: 'SOL', name: 'Sool',
        cities: [
          { code: 'LAS', name: 'Las Anod' },
          { code: 'HOO', name: 'Hoodia' },
          { code: 'TAL', name: 'Taleh' },
          { code: 'ERI', name: 'Erigavo' },
          { code: 'HAR', name: 'Hargeisa' },
          { code: 'BER', name: 'Berbera' },
          { code: 'BOR', name: 'Burao' },
          { code: 'GAR', name: 'Garowe' },
          { code: 'BOS', name: 'Bosaso' },
          { code: 'GALK', name: 'Galkayo' }
        ]
      },
      { code: 'SAN', name: 'Sanaag',
        cities: [
          { code: 'ERI', name: 'Erigavo' },
          { code: 'CEER', name: 'Ceerigaabo' },
          { code: 'BAD', name: 'Badhan' },
          { code: 'LAS', name: 'Las Khorey' },
          { code: 'HAR', name: 'Hargeisa' },
          { code: 'BER', name: 'Berbera' },
          { code: 'BOR', name: 'Burao' },
          { code: 'GAR', name: 'Garowe' },
          { code: 'BOS', name: 'Bosaso' },
          { code: 'GALK', name: 'Galkayo' }
        ]
      }
    ]
  };
