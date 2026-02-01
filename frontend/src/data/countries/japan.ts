/**
 * Japan country data with prefectures, cities, and tax information
 */

import { Country } from './index';

export const japan: Country = {
  code: 'JP',
  name: 'Japan',
  taxInfo: { standardRate: 10, taxName: 'Consumption Tax', currency: 'JPY', region: 'APAC' },
  provinces: [
    { code: 'HOKKAIDO', name: 'Hokkaido',
      cities: [
        { code: 'SAPPORO', name: 'Sapporo' },
        { code: 'HAKODATE', name: 'Hakodate' },
        { code: 'ASAHIKAWA', name: 'Asahikawa' }
      ]
    },
    { code: 'TOHOKU', name: 'Tohoku',
      cities: [
        { code: 'SENDAI', name: 'Sendai' },
        { code: 'AKITA', name: 'Akita' },
        { code: 'AOMORI', name: 'Aomori' },
        { code: 'MORIOKA', name: 'Morioka' },
        { code: 'FUKUSHIMA', name: 'Fukushima' },
        { code: 'YAMAGATA', name: 'Yamagata' }
      ]
    },
    { code: 'KANTO', name: 'Kanto',
      cities: [
        { code: 'TOKYO', name: 'Tokyo' },
        { code: 'YOKOHAMA', name: 'Yokohama' },
        { code: 'SAITAMA', name: 'Saitama' },
        { code: 'CHIBA', name: 'Chiba' },
        { code: 'KANAGAWA', name: 'Kanagawa' },
        { code: 'GUNMA', name: 'Gunma' },
        { code: 'TOCHIGI', name: 'Tochigi' },
        { code: 'IBARAKI', name: 'Ibaraki' }
      ]
    },
    { code: 'CHUBU', name: 'Chubu',
      cities: [
        { code: 'NAGOYA', name: 'Nagoya' },
        { code: 'NIIGATA', name: 'Niigata' },
        { code: 'TOYAMA', name: 'Toyama' },
        { code: 'ISHIKAWA', name: 'Ishikawa' },
        { code: 'FUKUI', name: 'Fukui' },
        { code: 'YAMANASHI', name: 'Yamanashi' },
        { code: 'NAGANO', name: 'Nagano' },
        { code: 'GIFU', name: 'Gifu' },
        { code: 'SHIZUOKA', name: 'Shizuoka' },
        { code: 'AICHI', name: 'Aichi' }
      ]
    },
    { code: 'KANSAI', name: 'Kansai',
      cities: [
        { code: 'OSAKA', name: 'Osaka' },
        { code: 'KYOTO', name: 'Kyoto' },
        { code: 'KOBE', name: 'Kobe' },
        { code: 'NARA', name: 'Nara' },
        { code: 'WAKAYAMA', name: 'Wakayama' },
        { code: 'SHIGA', name: 'Shiga' },
        { code: 'HYOGO', name: 'Hyogo' }
      ]
    },
    { code: 'CHUGOKU', name: 'Chugoku',
      cities: [
        { code: 'HIROSHIMA', name: 'Hiroshima' },
        { code: 'OKAYAMA', name: 'Okayama' },
        { code: 'SHIMANE', name: 'Shimane' },
        { code: 'TOTTORI', name: 'Tottori' },
        { code: 'YAMAGUCHI', name: 'Yamaguchi' }
      ]
    },
    { code: 'SHIKOKU', name: 'Shikoku',
      cities: [
        { code: 'TAKAMATSU', name: 'Takamatsu' },
        { code: 'MATSUYAMA', name: 'Matsuyama' },
        { code: 'KOCHI', name: 'Kochi' },
        { code: 'TOKUSHIMA', name: 'Tokushima' },
        { code: 'EHIME', name: 'Ehime' }
      ]
    },
    { code: 'KYUSHU', name: 'Kyushu',
      cities: [
        { code: 'FUKUOKA', name: 'Fukuoka' },
        { code: 'KITAKYUSHU', name: 'Kitakyushu' },
        { code: 'NAGASAKI', name: 'Nagasaki' },
        { code: 'KUMAMOTO', name: 'Kumamoto' },
        { code: 'OITA', name: 'Oita' },
        { code: 'MIYAZAKI', name: 'Miyazaki' },
        { code: 'KAGOSHIMA', name: 'Kagoshima' },
        { code: 'SAGA', name: 'Saga' },
        { code: 'OKINAWA', name: 'Okinawa' }
      ]
    }
  ]
};

export default japan;
