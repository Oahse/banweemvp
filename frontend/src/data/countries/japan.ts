/**
 * Japan country data with prefectures, cities, and tax information
 */

import { Country } from './index';

export const japan: Country = {
    code: 'JP',
    name: 'Japan',
    taxInfo: { standardRate: 10, taxName: 'Consumption Tax', currency: 'JPY', region: 'APAC' },
    provinces: [
      { code: '13', name: 'Tokyo',
        cities: [
          { code: 'TKY', name: 'Tokyo' },
          { code: 'SHINJUKU', name: 'Shinjuku' },
          { code: 'SHIBUYA', name: 'Shibuya' },
          { code: 'SHINAGAWA', name: 'Shinagawa' },
          { code: 'CHUO', name: 'Chuo' },
          { code: 'MINATO', name: 'Minato' },
          { code: 'BUNKYO', name: 'Bunkyo' },
          { code: 'TAITO', name: 'Taito' },
          { code: 'SUMIDA', name: 'Sumida' },
          { code: 'KOTO', name: 'Koto' }
        ]
      },
      { code: '27', name: 'Osaka',
        cities: [
          { code: 'OSA', name: 'Osaka' },
          { code: 'SAKAI', name: 'Sakai' },
          { code: 'HIGASHIOSAKA', name: 'Higashiosaka' },
          { code: 'HABIKINO', name: 'Habikino' },
          { code: 'HIRAKATA', name: 'Hirakata' },
          { code: 'SUITA', name: 'Suita' },
          { code: 'TOYONAKA', name: 'Toyonaka' },
          { code: 'NEYAGAWA', name: 'Neyagawa' },
          { code: 'KAWACHINAGANO', name: 'Kawachinagano' },
          { code: 'MINOH', name: 'Minoh' }
        ]
      },
      { code: '23', name: 'Aichi',
        cities: [
          { code: 'NGO', name: 'Nagoya' },
          { code: 'TOYOTA', name: 'Toyota' },
          { code: 'OKAZAKI', name: 'Okazaki' },
          { code: 'ICHINOMIYA', name: 'Ichinomiya' },
          { code: 'KASUGAI', name: 'Kasugai' },
          { code: 'TOYOHASHI', name: 'Toyohashi' },
          { code: 'SETO', name: 'Seto' },
          { code: 'HANDA', name: 'Handa' },
          { code: 'KARIYA', name: 'Kariya' },
          { code: 'TOYOKAWA', name: 'Toyokawa' }
        ]
      },
      { code: '14', name: 'Kanagawa',
        cities: [
          { code: 'YOK', name: 'Yokohama' },
          { code: 'KAWASAKI', name: 'Kawasaki' },
          { code: 'SAKAI', name: 'Sakai' },
          { code: 'YOKOSUKA', name: 'Yokosuka' },
          { code: 'HIRATSUKA', name: 'Hiratsuka' },
          { code: 'CHIGASAKI', name: 'Chigasaki' },
          { code: 'FUJISAWA', name: 'Fujisawa' },
          { code: 'ODAWARA', name: 'Odawara' },
          { code: 'ATSUGI', name: 'Atsugi' },
          { code: 'YAMATO', name: 'Yamato' }
        ]
      },
      { code: '11', name: 'Saitama',
        cities: [
          { code: 'SIT', name: 'Saitama' },
          { code: 'KAWAGOE', name: 'Kawagoe' },
          { code: 'KOSHIGAYA', name: 'Koshigaya' },
          { code: 'SOKA', name: 'Soka' },
          { code: 'KASUKABE', name: 'Kasukabe' },
          { code: 'AGEO', name: 'Ageo' },
          { code: 'SHIKI', name: 'Shiki' },
          { code: 'WAKO', name: 'Wako' },
          { code: 'HASUDA', name: 'Hasuda' },
          { code: 'KONOSU', name: 'Konosu' }
        ]
      },
      { code: '12', name: 'Chiba',
        cities: [
          { code: 'CHI', name: 'Chiba' },
          { code: 'FUNABASHI', name: 'Funabashi' },
          { code: 'MATSUDO', name: 'Matsudo' },
          { code: 'KASHIWA', name: 'Kashiwa' },
          { code: 'ICHIKAWA', name: 'Ichikawa' },
          { code: 'NARASHINO', name: 'Narashino' },
          { code: 'KATSUSHIKA', name: 'Katsushika' },
          { code: 'URAYASU', name: 'Urayasu' },
          { code: 'YACHIYO', name: 'Yachiyo' },
          { code: 'NAGAREYAMA', name: 'Nagareyama' }
        ]
      },
      { code: '28', name: 'Hyogo',
        cities: [
          { code: 'KOBE', name: 'Kobe' },
          { code: 'HIMEJI', name: 'Himeji' },
          { code: 'AMAGASAKI', name: 'Amagasaki' },
          { code: 'NISHINOMIYA', name: 'Nishinomiya' },
          { code: 'AKASHI', name: 'Akashi' },
          { code: 'KAKOGAWA', name: 'Kakogawa' },
          { code: 'ITAMI', name: 'Itami' },
          { code: 'TOYOOKA', name: 'Toyooka' },
          { code: 'SUMA', name: 'Suma' },
          { code: 'TAKARAZUKA', name: 'Takarazuka' }
        ]
      },
      { code: '40', name: 'Fukuoka',
        cities: [
          { code: 'FKU', name: 'Fukuoka' },
          { code: 'KITAKYUSHU', name: 'Kitakyushu' },
          { code: 'KURUME', name: 'Kurume' },
          { code: 'CHIKUSHINO', name: 'Chikushino' },
          { code: 'OGORI', name: 'Ogori' },
          { code: 'KASUGA', name: 'Kasuga' },
          { code: 'YANAGAWA', name: 'Yanagawa' },
          { code: 'IZUKA', name: 'Iizuka' },
          { code: 'TAGAWA', name: 'Tagawa' },
          { code: 'NOGATA', name: 'Nogata' }
        ]
      },
      { code: '22', name: 'Shizuoka',
        cities: [
          { code: 'HAMAMATSU', name: 'Hamamatsu' },
          { code: 'SHIZUOKA', name: 'Shizuoka' },
          { code: 'NUMAZU', name: 'Numazu' },
          { code: 'FUJINOMIYA', name: 'Fujinomiya' },
          { code: 'ITO', name: 'Ito' },
          { code: 'SHIMADA', name: 'Shimada' },
          { code: 'FUJIEDA', name: 'Fujieda' },
          { code: 'KIKUGAWA', name: 'Kikugawa' },
          { code: 'KAKEGAWA', name: 'Kakegawa' },
          { code: 'MISHIMA', name: 'Mishima' }
        ]
      },
      { code: '19', name: 'Yamanashi',
        cities: [
          { code: 'KOFU', name: 'Kofu' },
          { code: 'FUJIYOSHIDA', name: 'Fujiyoshida' },
          { code: 'TSURU', name: 'Tsuru' },
          { code: 'YAMANASHI', name: 'Yamanashi' },
          { code: 'MINOB', name: 'Minobu' },
          { code: 'NIRASAKI', name: 'Nirasaki' },
          { code: 'HOCHI', name: 'Hochi' },
          { code: 'UEHARA', name: 'Uehara' },
          { code: 'FUEFUKI', name: 'Fuefuki' },
          { code: 'KOSHU', name: 'Koshu' }
        ]
      },
      { code: '26', name: 'Kyoto',
        cities: [
          { code: 'KYO', name: 'Kyoto' },
          { code: 'FUKUCHIYAMA', name: 'Fukuchiyama' },
          { code: 'MAIZURU', name: 'Maizuru' },
          { code: 'AYABE', name: 'Ayabe' },
          { code: 'UJI', name: 'Uji' },
          { code: 'MIYAZU', name: 'Miyazu' },
          { code: 'KAMEOKA', name: 'Kameoka' },
          { code: 'NANTAN', name: 'Nantan' },
          { code: 'JOYO', name: 'Joyo' },
          { code: 'MUKO', name: 'Muko' }
        ]
      },
      { code: '25', name: 'Shiga',
        cities: [
          { code: 'OTSU', name: 'Otsu' },
          { code: 'KUSATSU', name: 'Kusatsu' },
          { code: 'MORIYAMA', name: 'Moriyama' },
          { code: 'NAGAHAMA', name: 'Nagahama' },
          { code: 'HIGASHIOMI', name: 'Higashiomi' },
          { code: 'OMIHACHIMAN', name: 'Omihachiman' },
          { code: 'YASU', name: 'Yasu' },
          { code: 'KONAN', name: 'Konan' },
          { code: 'TAKASHIMA', name: 'Takashima' },
          { code: 'RITTO', name: 'Ritto' }
        ]
      },
      { code: '24', name: 'Mie',
        cities: [
          { code: 'Tsu', name: 'Tsu' },
          { code: 'YOKKAICHI', name: 'Yokkaichi' },
          { code: 'SUZUKA', name: 'Suzuka' },
          { code: 'MATSUMOTO', name: 'Matsumoto' },
          { code: 'NABARI', name: 'Nabari' },
          { code: 'OWASE', name: 'Owase' },
          { code: 'IGA', name: 'Iga' },
          { code: 'KAMEYAMA', name: 'Kameyama' },
          { code: 'TOKI', name: 'Toki' },
          { code: 'INABE', name: 'Inabe' }
        ]
      },
      { code: '21', name: 'Gifu',
        cities: [
          { code: 'GIFU', name: 'Gifu' },
          { code: 'OGAKI', name: 'Ogaki' },
          { code: 'TAKAYAMA', name: 'Takayama' },
          { code: 'SEKI', name: 'Seki' },
          { code: 'KAKAMIGAHARA', name: 'Kakamigahara' },
          { code: 'HASHIMA', name: 'Hashima' },
          { code: 'MINO', name: 'Mino' },
          { code: 'GUJO', name: 'Gujo' },
          { code: 'ENAG', name: 'Ena' },
          { code: 'MIZUHO', name: 'Mizuho' }
        ]
      },
      { code: '20', name: 'Nagano',
        cities: [
          { code: 'NAGANO', name: 'Nagano' },
          { code: 'MATSUMOTO', name: 'Matsumoto' },
          { code: 'UEDA', name: 'Ueda' },
          { code: 'OKAYA', name: 'Okayama' },
          { code: 'SUIWA', name: 'Suwa' },
          { code: 'IIDA', name: 'Iida' },
          { code: 'SHIOJIRI', name: 'Shiojiri' },
          { code: 'CHINO', name: 'Chino' },
          { code: 'SAKU', name: 'Saku' },
          { code: 'AZUMINO', name: 'Azumino' }
        ]
      }
    ]
};
