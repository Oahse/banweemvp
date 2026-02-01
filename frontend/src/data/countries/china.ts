/**
 * China country data with provinces, municipalities, and cities
 */

import { Country } from './index';

export const china: Country = {
    code: 'CN',
    name: 'China',
    flag: '🇨🇳',
    capital: 'Beijing',
    area: 9596961,
    currencySymbol: '¥',
    officialLanguages: ['Mandarin'],
    demonym: 'Chinese',
    taxInfo: { standardRate: 13, taxName: 'VAT', currency: 'CNY', region: 'APAC' },
    divisions: [
      { code: 'BJ', name: 'Beijing', type: 'municipality',
        cities: [
          { code: 'BEIJING', name: 'Beijing' },
          { code: 'DONGCHENG', name: 'Dongcheng' },
          { code: 'XICHENG', name: 'Xicheng' },
          { code: 'CHAOYANG', name: 'Chaoyang' },
          { code: 'FENGTAI', name: 'Fengtai' }
        ]
      },
      { code: 'SH', name: 'Shanghai', type: 'municipality',
        cities: [
          { code: 'SHANGHAI', name: 'Shanghai' },
          { code: 'HUANGPU', name: 'Huangpu' },
          { code: 'XUHUI', name: 'Xuhui' },
          { code: 'CHANGNING', name: 'Changning' },
          { code: 'JINGAN', name: 'Jingan' }
        ]
      },
      { code: 'TJ', name: 'Tianjin', type: 'municipality',
        cities: [
          { code: 'TIANJIN', name: 'Tianjin' },
          { code: 'HEPING', name: 'Heping' },
          { code: 'HEXI', name: 'Hexi' },
          { code: 'NANKAI', name: 'Nankai' },
          { code: 'HEBEI', name: 'Hebei' }
        ]
      },
      { code: 'CQ', name: 'Chongqing', type: 'municipality',
        cities: [
          { code: 'CHONGQING', name: 'Chongqing' },
          { code: 'YUZHONG', name: 'Yuzhong' },
          { code: 'JIANGBEI', name: 'Jiangbei' },
          { code: 'SHAPINGBA', name: 'Shapingba' },
          { code: 'JIULONGPO', name: 'Jiulongpo' }
        ]
      },
      { code: 'GD', name: 'Guangdong', type: 'province',
        cities: [
          { code: 'GUANGZHOU', name: 'Guangzhou' },
          { code: 'SHENZHEN', name: 'Shenzhen' },
          { code: 'DONGGUAN', name: 'Dongguan' },
          { code: 'FOSHAN', name: 'Foshan' },
          { code: 'ZHONGSHAN', name: 'Zhongshan' }
        ]
      },
      { code: 'JS', name: 'Jiangsu', type: 'province',
        cities: [
          { code: 'NANJING', name: 'Nanjing' },
          { code: 'SUZHOU', name: 'Suzhou' },
          { code: 'WUXI', name: 'Wuxi' },
          { code: 'CHANGZHOU', name: 'Changzhou' },
          { code: 'NANTONG', name: 'Nantong' }
        ]
      },
      { code: 'ZJ', name: 'Zhejiang', type: 'province',
        cities: [
          { code: 'HANGZHOU', name: 'Hangzhou' },
          { code: 'NINGBO', name: 'Ningbo' },
          { code: 'WENZHOU', name: 'Wenzhou' },
          { code: 'JINHUA', name: 'Jinhua' },
          { code: 'JIAO', name: 'Jiaxing' }
        ]
      },
      { code: 'SD', name: 'Shandong', type: 'province',
        cities: [
          { code: 'JINAN', name: 'Jinan' },
          { code: 'QINGDAO', name: 'Qingdao' },
          { code: 'ZIBO', name: 'Zibo' },
          { code: 'ZAOZHUANG', name: 'Zaozhuang' },
          { code: 'DONGING', name: 'Dongying' }
        ]
      },
      { code: 'HN', name: 'Henan', type: 'province',
        cities: [
          { code: 'ZHENGZHOU', name: 'Zhengzhou' },
          { code: 'LUOYANG', name: 'Luoyang' },
          { code: 'KAIFENG', name: 'Kaifeng' },
          { code: 'ANYANG', name: 'Anyang' },
          { code: 'XINXIANG', name: 'Xinxiang' }
        ]
      },
      { code: 'SC', name: 'Sichuan', type: 'province',
        cities: [
          { code: 'CHENGDU', name: 'Chengdu' },
          { code: 'MIANYANG', name: 'Mianyang' },
          { code: 'DEYANG', name: 'Deyang' },
          { code: 'NANCHONG', name: 'Nanchong' },
          { code: 'YIBIN', name: 'Yibin' }
        ]
      },
      { code: 'HB', name: 'Hubei', type: 'province',
        cities: [
          { code: 'WUHAN', name: 'Wuhan' },
          { code: 'HUANGSHI', name: 'Huangshi' },
          { code: 'SHIYAN', name: 'Shiyan' },
          { code: 'YICHANG', name: 'Yichang' },
          { code: 'XIANGYANG', name: 'Xiangyang' }
        ]
      },
      { code: 'XJ', name: 'Xinjiang', type: 'autonomous region',
        cities: [
          { code: 'URUMQI', name: 'Urumqi' },
          { code: 'KARAMAY', name: 'Karamay' },
          { code: 'TURPAN', name: 'Turpan' },
          { code: 'HAMI', name: 'Hami' },
          { code: 'KASHGAR', name: 'Kashgar' }
        ]
      },
      { code: 'GX', name: 'Guangxi', type: 'autonomous region',
        cities: [
          { code: 'NANNING', name: 'Nanning' },
          { code: 'LIUZHOU', name: 'Liuzhou' },
          { code: 'GUILIN', name: 'Guilin' },
          { code: 'WUZHOU', name: 'Wuzhou' },
          { code: 'BEIHAI', name: 'Beihai' }
        ]
      },
      { code: 'NM', name: 'Inner Mongolia', type: 'autonomous region',
        cities: [
          { code: 'HOHHOT', name: 'Hohhot' },
          { code: 'BAOTOU', name: 'Baotou' },
          { code: 'ORDOS', name: 'Ordos' },
          { code: 'WUHAI', name: 'Wuhai' },
          { code: 'CHIFENG', name: 'Chifeng' }
        ]
      },
      { code: 'NX', name: 'Ningxia', type: 'autonomous region',
        cities: [
          { code: 'YINCHUAN', name: 'Yinchuan' },
          { code: 'SHIZUISHAN', name: 'Shizuishan' },
          { code: 'WUZHONG', name: 'Wuzhong' },
          { code: 'ZHONGWEI', name: 'Zhongwei' },
          { code: 'GUYUAN', name: 'Guyuan' }
        ]
      },
      { code: 'XZ', name: 'Tibet', type: 'autonomous region',
        cities: [
          { code: 'LHASA', name: 'Lhasa' },
          { code: 'SHIGATSE', name: 'Shigatse' },
          { code: 'CHAMDO', name: 'Chamdo' },
          { code: 'NYINGCHI', name: 'Nyingchi' },
          { code: 'QAMDO', name: 'Qamdo' }
        ]
      }
    ]
};
