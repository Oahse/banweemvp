/**
 * China country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const china: Country = {
    code: 'CN',
    name: 'China',
    taxInfo: { standardRate: 13, taxName: 'VAT', currency: 'CNY', region: 'APAC' },
    provinces: [
      { code: 'BEIJING', name: 'Beijing',
        cities: [
          { code: 'BEIJING', name: 'Beijing' },
          { code: 'SHANGHAI', name: 'Shanghai' },
          { code: 'GUANGZHOU', name: 'Guangzhou' },
          { code: 'SHENZHEN', name: 'Shenzhen' },
          { code: 'CHENGDU', name: 'Chengdu' },
          { code: 'HANGZHOU', name: 'Hangzhou' },
          { code: 'WUHAN', name: 'Wuhan' },
          { code: 'XIAN', name: 'Xian' },
          { code: 'CHONGQING', name: 'Chongqing' },
          { code: 'TIANJIN', name: 'Tianjin' }
        ]
      },
      { code: 'SHANGHAI', name: 'Shanghai',
        cities: [
          { code: 'SHANGHAI', name: 'Shanghai' },
          { code: 'BEIJING', name: 'Beijing' },
          { code: 'GUANGZHOU', name: 'Guangzhou' },
          { code: 'SHENZHEN', name: 'Shenzhen' },
          { code: 'CHENGDU', name: 'Chengdu' },
          { code: 'HANGZHOU', name: 'Hangzhou' },
          { code: 'WUHAN', name: 'Wuhan' },
          { code: 'XIAN', name: 'Xian' },
          { code: 'CHONGQING', name: 'Chongqing' },
          { code: 'TIANJIN', name: 'Tianjin' }
        ]
      },
      { code: 'GUANGDONG', name: 'Guangdong',
        cities: [
          { code: 'GUANGZHOU', name: 'Guangzhou' },
          { code: 'SHENZHEN', name: 'Shenzhen' },
          { code: 'DONGGUAN', name: 'Dongguan' },
          { code: 'FOSHAN', name: 'Foshan' },
          { code: 'ZHONGSHAN', name: 'Zhongshan' },
          { code: 'ZHUHAI', name: 'Zhuhai' },
          { code: 'JIANGMEN', name: 'Jiangmen' },
          { code: 'ZHAOQING', name: 'Zhaoqing' },
          { code: 'HUZHOU', name: 'Huizhou' },
          { code: 'MEIZHOU', name: 'Meizhou' }
        ]
      },
      { code: 'JIANGSU', name: 'Jiangsu',
        cities: [
          { code: 'NANJING', name: 'Nanjing' },
          { code: 'SUZHOU', name: 'Suzhou' },
          { code: 'WUXI', name: 'Wuxi' },
          { code: 'CHANGZHOU', name: 'Changzhou' },
          { code: 'NANTONG', name: 'Nantong' },
          { code: 'YANGZHOU', name: 'Yangzhou' },
          { code: 'TAIZHOU', name: 'Taizhou' },
          { code: 'ZHENJIANG', name: 'Zhenjiang' },
          { code: 'LIANYUNGANG', name: 'Lianyungang' },
          { code: 'XUZHOU', name: 'Xuzhou' }
        ]
      },
      { code: 'ZHEJIANG', name: 'Zhejiang',
        cities: [
          { code: 'HANGZHOU', name: 'Hangzhou' },
          { code: 'NINGBO', name: 'Ningbo' },
          { code: 'WENZHOU', name: 'Wenzhou' },
          { code: 'JINHUA', name: 'Jinhua' },
          { code: 'JIAO', name: 'Jiaxing' },
          { code: 'TAIZHOU', name: 'Taizhou' },
          { code: 'SHAOXING', name: 'Shaoxing' },
          { code: 'QUZHOU', name: 'Quzhou' },
          { code: 'ZHoushan', name: 'Zhoushan' },
          { code: 'LISHUI', name: 'Lishui' }
        ]
      },
      { code: 'SHANDONG', name: 'Shandong',
        cities: [
          { code: 'JINAN', name: 'Jinan' },
          { code: 'QINGDAO', name: 'Qingdao' },
          { code: 'ZIBO', name: 'Zibo' },
          { code: 'ZAOZHUANG', name: 'Zaozhuang' },
          { code: 'DONGING', name: 'Dongying' },
          { code: 'YANTAI', name: 'Yantai' },
          { code: 'WEIHAI', name: 'Weihai' },
          { code: 'RIZHAO', name: 'Rizhao' },
          { code: 'LAIWU', name: 'Laiwu' },
          { code: 'LINYI', name: 'Linyi' }
        ]
      },
      { code: 'HENAN', name: 'Henan',
        cities: [
          { code: 'ZHENGZHOU', name: 'Zhengzhou' },
          { code: 'LUOYANG', name: 'Luoyang' },
          { code: 'KAIFENG', name: 'Kaifeng' },
          { code: 'ANYANG', name: 'Anyang' },
          { code: 'XINXIANG', name: 'Xinxiang' },
          { code: 'JIAOZUO', name: 'Jiaozuo' },
          { code: 'Puyang', name: 'Puyang' },
          { code: 'XUCHANG', name: 'Xuchang' },
          { code: 'LUOHE', name: 'Luohe' },
          { code: 'SANMENXIA', name: 'Sanmenxia' }
        ]
      },
      { code: 'SICHUAN', name: 'Sichuan',
        cities: [
          { code: 'CHENGDU', name: 'Chengdu' },
          { code: 'MIANYANG', name: 'Mianyang' },
          { code: 'DEYANG', name: 'Deyang' },
          { code: 'NANCHONG', name: 'Nanchong' },
          { code: 'YIBIN', name: 'Yibin' },
          { code: 'GUANGYUAN', name: 'Guangyuan' },
          { code: 'DAZHOU', name: 'Dazhou' },
          { code: 'LESHAN', name: 'Leshan' },
          { code: 'NEIJIANG', name: 'Neijiang' },
          { code: 'ZIGONG', name: 'Zigong' }
        ]
      },
      { code: 'HUBEI', name: 'Hubei',
        cities: [
          { code: 'WUHAN', name: 'Wuhan' },
          { code: 'HUANGSHI', name: 'Huangshi' },
          { code: 'SHIYAN', name: 'Shiyan' },
          { code: 'YICHANG', name: 'Yichang' },
          { code: 'XIANGYANG', name: 'Xiangyang' },
          { code: 'EZHOU', name: 'Ezhou' },
          { code: 'JINGMEN', name: 'Jingmen' },
          { code: 'XIAOGAN', name: 'Xiaogan' },
          { code: 'JINGZHOU', name: 'Jingzhou' },
          { code: 'HUANGGANG', name: 'Huanggang' }
        ]
      },
      { code: 'HUNAN', name: 'Hunan',
        cities: [
          { code: 'CHANGSHA', name: 'Changsha' },
          { code: 'ZHUZHOU', name: 'Zhuzhou' },
          { code: 'XIANGTAN', name: 'Xiangtan' },
          { code: 'HENGYANG', name: 'Hengyang' },
          { code: 'SHAoyang', name: 'Shaoyang' },
          { code: 'YUEYANG', name: 'Yueyang' },
          { code: 'CHANGDE', name: 'Changde' },
          { code: 'ZHANGJIAJIE', name: 'Zhangjiajie' },
          { code: 'YIYANG', name: 'Yiyang' },
          { code: 'CHENZHOU', name: 'Chenzhou' }
        ]
      }
    ]
};
