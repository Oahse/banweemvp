/**
 * Thailand country data with provinces and special administrative areas
 */

import { Country } from './index';

export const thailand: Country = {
  code: 'TH',
  name: 'Thailand',
  flag: '🇹🇭',
  capital: 'Bangkok',
  area: 513120,
  currencySymbol: '฿',
  officialLanguages: ['Thai'],
  demonym: 'Thai',
  taxInfo: { standardRate: 7, taxName: 'VAT', currency: 'THB', region: 'APAC' },
  divisions: [
    { code: 'BKK', name: 'Bangkok', type: 'special administrative area',
      cities: [
        { code: 'BANGKOK', name: 'Bangkok' },
        { code: 'PHRAKHANONG', name: 'Phra Khanong' },
        { code: 'SUKHUMVIT', name: 'Sukhumvit' },
        { code: 'SILOM', name: 'Silom' },
        { code: 'SATHORN', name: 'Sathorn' }
      ]
    },
    { code: 'CNX', name: 'Chiang Mai', type: 'province',
      cities: [
        { code: 'CHIANGMAI', name: 'Chiang Mai' },
        { code: 'SANPAKHOI', name: 'San Pakhoi' },
        { code: 'SANSAI', name: 'San Sai' },
        { code: 'MAETANG', name: 'Mae Taeng' },
        { code: 'CHOMTHONG', name: 'Chom Thong' }
      ]
    },
    { code: 'KKC', name: 'Khon Kaen', type: 'province',
      cities: [
        { code: 'KHONKAEN', name: 'Khon Kaen' },
        { code: 'BANPHAI', name: 'Ban Phai' },
        { code: 'NONSILUANG', name: 'Non Siluang' },
        { code: 'MANJAKHAI', name: 'Manjak Hai' },
        { code: 'CHUAPHA', name: 'Chua Pha' }
      ]
    },
    { code: 'HKT', name: 'Phuket', type: 'province',
      cities: [
        { code: 'PHUKET', name: 'Phuket' },
        { code: 'PATONG', name: 'Patong' },
        { code: 'KARON', name: 'Karon' },
        { code: 'KATA', name: 'Kata' },
        { code: 'RAWAI', name: 'Rawai' }
      ]
    },
    { code: 'RAY', name: 'Rayong', type: 'province',
      cities: [
        { code: 'RAYONG', name: 'Rayong' },
        { code: 'MAPTA', name: 'Map Ta Phut' },
        { code: 'BANPHAE', name: 'Ban Phe' },
        { code: 'KLAENG', name: 'Klaeng' },
        { code: 'WANGCHAN', name: 'Wang Chan' }
      ]
    },
    { code: 'SUR', name: 'Surat Thani', type: 'province',
      cities: [
        { code: 'SURATTHANI', name: 'Surat Thani' },
        { code: 'KOHSAMUI', name: 'Koh Samui' },
        { code: 'KOHANG', name: 'Ko Tao' },
        { code: 'KOHANG', name: 'Ko Pha Ngan' },
        { code: 'DONSAK', name: 'Don Sak' }
      ]
    },
    { code: 'NRT', name: 'Narathiwat', type: 'province',
      cities: [
        { code: 'NARATHIWAT', name: 'Narathiwat' },
        { code: 'TAKBAI', name: 'Tak Bai' },
        { code: 'SUNGAIKOLOK', name: 'Su-ngai Kolok' },
        { code: 'BACHO', name: 'Bacho' },
        { code: 'RANGAE', name: 'Rangae' }
      ]
    },
    { code: 'YLA', name: 'Yala', type: 'province',
      cities: [
        { code: 'YALA', name: 'Yala' },
        { code: 'BETONG', name: 'Betong' },
        { code: 'BANANG', name: 'Banang Sata' },
        { code: 'KABANG', name: 'Kabang' },
        { code: 'THANTO', name: 'Thanto' }
      ]
    },
    { code: 'PTE', name: 'Pattani', type: 'province',
      cities: [
        { code: 'PATTANI', name: 'Pattani' },
        { code: 'SAABURI', name: 'Saaburi' },
        { code: 'KHOKPHO', name: 'Khok Pho' },
        { code: 'MAYO', name: 'Mayo' },
        { code: 'YARING', name: 'Yaring' }
      ]
    },
    { code: 'SAT', name: 'Satun', type: 'province',
      cities: [
        { code: 'SATUN', name: 'Satun' },
        { code: 'LAUNGU', name: 'La-ngu' },
        { code: 'KHUANKHANUN', name: 'Khuan Khanun' },
        { code: 'THUNGWA', name: 'Thung Wa' },
        { code: 'MANANG', name: 'Manang' }
      ]
    },
    { code: 'SON', name: 'Songkhla', type: 'province',
      cities: [
        { code: 'SONGKHLA', name: 'Songkhla' },
        { code: 'HATYAI', name: 'Hat Yai' },
        { code: 'SADAU', name: 'Sadao' },
        { code: 'SATING', name: 'Sating Phra' },
        { code: 'RANOT', name: 'Ranot' }
      ]
    },
    { code: 'PTA', name: 'Pattaya', type: 'special administrative area',
      cities: [
        { code: 'PATTAYA', name: 'Pattaya' },
        { code: 'NAKLUA', name: 'Naklua' },
        { code: 'JOMTIEN', name: 'Jomtien' },
        { code: 'WONGAMAT', name: 'Wong Amat' },
        { code: 'BUKHAO', name: 'Bua Khao' }
      ]
    },
    { code: 'KBI', name: 'Krabi', type: 'province',
      cities: [
        { code: 'KRABI', name: 'Krabi' },
        { code: 'AONANG', name: 'Ao Nang' },
        { code: 'KLONG', name: 'Klong' },
        { code: 'KOH', name: 'Ko Lanta' },
        { code: 'NUEAKLONG', name: 'Nuea Klong' }
      ]
    },
    { code: 'TRT', name: 'Trang', type: 'province',
      cities: [
        { code: 'TRANG', name: 'Trang' },
        { code: 'KANTANG', name: 'Kantang' },
        { code: 'YAN', name: 'Yan Ta Khao' },
        { code: 'HUAYYOT', name: 'Huai Yot' },
        { code: 'WANGWIS', name: 'Wang Wiset' }
      ]
    },
    { code: 'PLK', name: 'Phang Nga', type: 'province',
      cities: [
        { code: 'PHANGNGA', name: 'Phang Nga' },
        { code: 'KOH', name: 'Ko Yao' },
        { code: 'TAKUA', name: 'Takua Pa' },
        { code: 'KURABURI', name: 'Kura Buri' },
        { code: 'THAPPUT', name: 'Thap Put' }
      ]
    },
    { code: 'NBI', name: 'Nakhon Si Thammarat', type: 'province',
      cities: [
        { code: 'NAKHON', name: 'Nakhon Si Thammarat' },
        { code: 'THUNG', name: 'Thung Song' },
        { code: 'THASALA', name: 'Tha Sala' },
        { code: 'LANNA', name: 'Lan Saka' },
        { code: 'PAKPHANANG', name: 'Pak Phanang' }
      ]
    },
    { code: 'KRN', name: 'Krung Thep', type: 'province',
      cities: [
        { code: 'KRUNGTHEP', name: 'Krung Thep' },
        { code: 'DIN', name: 'Din Daeng' },
        { code: 'HUA', name: 'Hua Khwang' },
        { code: 'LAT', name: 'Lat Krabang' },
        { code: 'MIN', name: 'Min Buri' }
      ]
    },
    { code: 'SMN', name: 'Samut Prakan', type: 'province',
      cities: [
        { code: 'SAMUT', name: 'Samut Prakan' },
        { code: 'MUANG', name: 'Mueang Samut Prakan' },
        { code: 'BANG', name: 'Bang Phli' },
        { code: 'BANGSA', name: 'Bang Sa Thai' },
        { code: 'PHRA', name: 'Phra Pradaeng' }
      ]
    },
    { code: 'NMA', name: 'Nakhon Pathom', type: 'province',
      cities: [
        { code: 'NAKHON', name: 'Nakhon Pathom' },
        { code: 'MUANG', name: 'Mueang Nakhon Pathom' },
        { code: 'KAMPHAENG', name: 'Kamphaeng Saen' },
        { code: 'NAKHON', name: 'Nakhon Chai Si' },
        { code: 'DON', name: 'Don Tum' }
      ]
    },
    { code: 'NKN', name: 'Nakhon Nayok', type: 'province',
      cities: [
        { code: 'NAKHON', name: 'Nakhon Nayok' },
        { code: 'MUANG', name: 'Mueang Nakhon Nayok' },
        { code: 'BAN', name: 'Ban Na' },
        { code: 'WANG', name: 'Wang Hin' },
        { code: 'PAK', name: 'Pak Phli' }
      ]
    },
    { code: 'PATH', name: 'Pathum Thani', type: 'province',
      cities: [
        { code: 'PATHUM', name: 'Pathum Thani' },
        { code: 'MUANG', name: 'Mueang Pathum Thani' },
        { code: 'KHLONG', name: 'Khlong Luang' },
        { code: 'LAT', name: 'Lat Lum Kaeo' },
        { code: 'SAM', name: 'Sam Khok' }
      ]
    },
    { code: 'AYU', name: 'Ayutthaya', type: 'province',
      cities: [
        { code: 'AYUTTHAYA', name: 'Ayutthaya' },
        { code: 'PHRA', name: 'Phra Nakhon Si Ayutthaya' },
        { code: 'BANG', name: 'Bang Pa-in' },
        { code: 'BANG', name: 'Bang Ban' },
        { code: 'BANG', name: 'Bang Sai' }
      ]
    },
    { code: 'ANG', name: 'Ang Thong', type: 'province',
      cities: [
        { code: 'ANG', name: 'Ang Thong' },
        { code: 'MUANG', name: 'Mueang Ang Thong' },
        { code: 'PA', name: 'Pa Mok' },
        { code: 'WAT', name: 'Wat Sing' },
        { code: 'SAM', name: 'Sam Ko' }
      ]
    },
    { code: 'LKB', name: 'Lopburi', type: 'province',
      cities: [
        { code: 'LOPBURI', name: 'Lopburi' },
        { code: 'MUANG', name: 'Mueang Lopburi' },
        { code: 'KHOK', name: 'Khok Charoen' },
        { code: 'LAM', name: 'Lam Sonthi' },
        { code: 'BAN', name: 'Ban Mi' }
      ]
    },
    { code: 'SING', name: 'Sing Buri', type: 'province',
      cities: [
        { code: 'SING', name: 'Sing Buri' },
        { code: 'MUANG', name: 'Mueang Sing Buri' },
        { code: 'BANG', name: 'Bang Rachan' },
        { code: 'KHAO', name: 'Khao Bang Sai' },
        { code: 'PHROM', name: 'Phrom Buri' }
      ]
    },
    { code: 'CHAN', name: 'Chai Nat', type: 'province',
      cities: [
        { code: 'CHAINAT', name: 'Chai Nat' },
        { code: 'MUANG', name: 'Mueang Chai Nat' },
        { code: 'WAT', name: 'Wat Sing' },
        { code: 'SANKHA', name: 'Sankha Buri' },
        { code: 'HANKHA', name: 'Hankha' }
      ]
    },
    { code: 'SARA', name: 'Saraburi', type: 'province',
      cities: [
        { code: 'SARABURI', name: 'Saraburi' },
        { code: 'MUANG', name: 'Mueang Saraburi' },
        { code: 'KAENG', name: 'Kaeng Khoi' },
        { code: 'NONG', name: 'Nong Don' },
        { code: 'WANG', name: 'Wang Muang' }
      ]
    },
    { code: 'NBN', name: 'Nonthaburi', type: 'province',
      cities: [
        { code: 'NONTABURI', name: 'Nonthaburi' },
        { code: 'MUANG', name: 'Mueang Nonthaburi' },
        { code: 'PAK', name: 'Pak Kret' },
        { code: 'BANG', name: 'Bang Kruai' },
        { code: 'BANG', name: 'Bang Yai' }
      ]
    }
  ]
};
