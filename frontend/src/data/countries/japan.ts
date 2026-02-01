/**
 * Japan country data with prefectures, cities, and tax information
 */

import { Country } from './index';

export const japan: Country = {
  code: 'JP',
  name: 'Japan',
  flag: '🇯🇵',
  capital: 'Tokyo',
  area: 377975,
  currencySymbol: '¥',
  officialLanguages: ['Japanese'],
  demonym: 'Japanese',
  taxInfo: { standardRate: 10, taxName: 'Consumption Tax', currency: 'JPY', region: 'APAC' },
  divisions: [
    { code: 'HOKKAIDO', name: 'Hokkaido', type: 'prefecture',
      cities: [
        { code: 'SAPPORO', name: 'Sapporo' },
        { code: 'HAKODATE', name: 'Hakodate' },
        { code: 'ASAHIKAWA', name: 'Asahikawa' }
      ]
    },
    { code: 'AOMORI', name: 'Aomori', type: 'prefecture',
      cities: [
        { code: 'AOMORI', name: 'Aomori' },
        { code: 'HIROSAKI', name: 'Hirosaki' },
        { code: 'KUROISHI', name: 'Kuroishi' }
      ]
    },
    { code: 'IWATE', name: 'Iwate', type: 'prefecture',
      cities: [
        { code: 'MORIOKA', name: 'Morioka' },
        { code: 'ICHINOSEKI', name: 'Ichinoseki' },
        { code: 'OFUNATO', name: 'Ofunato' }
      ]
    },
    { code: 'MIYAGI', name: 'Miyagi', type: 'prefecture',
      cities: [
        { code: 'SENDAI', name: 'Sendai' },
        { code: 'ISHINOMAKI', name: 'Ishinomaki' },
        { code: 'TAGAJO', name: 'Tagajo' }
      ]
    },
    { code: 'AKITA', name: 'Akita', type: 'prefecture',
      cities: [
        { code: 'AKITA', name: 'Akita' },
        { code: 'YOKOTE', name: 'Yokote' },
        { code: 'KAZUNO', name: 'Kazuno' }
      ]
    },
    { code: 'YAMAGATA', name: 'Yamagata', type: 'prefecture',
      cities: [
        { code: 'YAMAGATA', name: 'Yamagata' },
        { code: 'TSURUOKA', name: 'Tsuruoka' },
        { code: 'SAGATA', name: 'Sagata' }
      ]
    },
    { code: 'FUKUSHIMA', name: 'Fukushima', type: 'prefecture',
      cities: [
        { code: 'FUKUSHIMA', name: 'Fukushima' },
        { code: 'IWAKI', name: 'Iwaki' },
        { code: 'KORIYAMA', name: 'Koriyama' }
      ]
    },
    { code: 'TOKYO', name: 'Tokyo', type: 'metropolis',
      cities: [
        { code: 'TOKYO', name: 'Tokyo' },
        { code: 'SHINJUKU', name: 'Shinjuku' },
        { code: 'SHIBUYA', name: 'Shibuya' }
      ]
    },
    { code: 'OSAKA', name: 'Osaka', type: 'prefecture',
      cities: [
        { code: 'OSAKA', name: 'Osaka' },
        { code: 'SAKAI', name: 'Sakai' },
        { code: 'HIGASHIOSAKA', name: 'Higashiosaka' }
      ]
    },
    { code: 'KYOTO', name: 'Kyoto', type: 'prefecture',
      cities: [
        { code: 'KYOTO', name: 'Kyoto' },
        { code: 'UJI', name: 'Uji' },
        { code: 'KAMEOKA', name: 'Kameoka' }
      ]
    }
  ]
};

export default japan;
