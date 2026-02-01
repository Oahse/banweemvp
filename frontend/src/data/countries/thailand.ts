/**
 * Thailand country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const thailand: Country = {
    code: 'TH',
    name: 'Thailand',
    taxInfo: { standardRate: 7, taxName: 'VAT', currency: 'THB', region: 'APAC' },
    provinces: [
      { code: '10', name: 'Bangkok',
        cities: [
          { code: 'BKK', name: 'Bangkok' },
          { code: 'PHRA', name: 'Phra Nakhon' },
          { code: 'DUSIT', name: 'Dusit' },
          { code: 'BANG', name: 'Bang Rak' },
          { code: 'PATHUM', name: 'Pathum Wan' },
          { code: 'WAT', name: 'Watthana' },
          { code: 'HUAI', name: 'Huai Khwang' },
          { code: 'KHLONG', name: 'Khlong Toei' },
          { code: 'LAT', name: 'Lat Krabang' },
          { code: 'DON', name: 'Don Mueang' }
        ]
      },
      { code: '11', name: 'Samut Prakan',
        cities: [
          { code: 'SAMUT', name: 'Samut Prakan' },
          { code: 'MUANG', name: 'Mueang Samut Prakan' },
          { code: 'BANG', name: 'Bang Phli' },
          { code: 'BANG2', name: 'Bang Bo' },
          { code: 'BANG3', name: 'Bang Sao Thong' },
          { code: 'PHRA', name: 'Phra Pradaeng' },
          { code: 'PHRA2', name: 'Phra Samut Chedi' },
          { code: 'BANG4', name: 'Bang Pu Mai' },
          { code: 'BANG5', name: 'Bang Nam Priao' },
          { code: 'BANG6', name: 'Bang Khun Thian' }
        ]
      },
      { code: '12', name: 'Nonthaburi',
        cities: [
          { code: 'NONTHABURI', name: 'Nonthaburi' },
          { code: 'MUANG', name: 'Mueang Nonthaburi' },
          { code: 'BANG', name: 'Bang Kruai' },
          { code: 'BANG2', name: 'Bang Bua Thong' },
          { code: 'PAK', name: 'Pak Kret' },
          { code: 'SAI', name: 'Sai Noi' },
          { code: 'BANG3', name: 'Bang Yai' },
          { code: 'BANG4', name: 'Bang Krasor' },
          { code: 'BANG5', name: 'Bang Rak Phatthana' },
          { code: 'BANG6', name: 'Bang Phlat' }
        ]
      },
      { code: '13', name: 'Pathum Thani',
        cities: [
          { code: 'PATHUM', name: 'Pathum Thani' },
          { code: 'MUANG', name: 'Mueang Pathum Thani' },
          { code: 'KHLONG', name: 'Khlong Luang' },
          { code: 'THANYABURI', name: 'Thanyaburi' },
          { code: 'LAM', name: 'Lam Luk Ka' },
          { code: 'LAT', name: 'Lat Lum Kaeo' },
          { code: 'SAM', name: 'Sam Khok' },
          { code: 'BANG', name: 'Bang Pa-in' },
          { code: 'BANG2', name: 'Bang Sai' },
          { code: 'BANG3', name: 'Bang Phlat' }
        ]
      },
      { code: '14', name: 'Phuket',
        cities: [
          { code: 'PHUKET', name: 'Phuket' },
          { code: 'MUANG', name: 'Mueang Phuket' },
          { code: 'KATHU', name: 'Kathu' },
          { code: 'THALANG', name: 'Thalang' },
          { code: 'PATONG', name: 'Patong' },
          { code: 'KARON', name: 'Karon' },
          { code: 'KATA', name: 'Kata' },
          { code: 'RAWAI', name: 'Rawai' },
          { code: 'CHERNG', name: 'Cherng Talay' },
          { code: 'MAI', name: 'Mai Khao' }
        ]
      },
      { code: '15', name: 'Chiang Mai',
        cities: [
          { code: 'CHIANG', name: 'Chiang Mai' },
          { code: 'MUANG', name: 'Mueang Chiang Mai' },
          { code: 'SAN', name: 'San Sai' },
          { code: 'HANG', name: 'Hang Dong' },
          { code: 'SAN2', name: 'San Kamphaeng' },
          { code: 'MAE', name: 'Mae Rim' },
          { code: 'DOI', name: 'Doi Saket' },
          { code: 'CHOM', name: 'Chom Thong' },
          { code: 'FANG', name: 'Fang' },
          { code: 'MAE2', name: 'Mae Taeng' }
        ]
      },
      { code: '16', name: 'Chonburi',
        cities: [
          { code: 'CHONBURI', name: 'Chonburi' },
          { code: 'MUANG', name: 'Mueang Chonburi' },
          { code: 'BANG', name: 'Bang Saen' },
          { code: 'BANGLAMUNG', name: 'Bang Lamung' },
          { code: 'PATTAYA', name: 'Pattaya' },
          { code: 'SI', name: 'Si Racha' },
          { code: 'PHAN', name: 'Phan Thong' },
          { code: 'PHAN2', name: 'Phanat Nikhom' },
          { code: 'BANG2', name: 'Bang Phra' },
          { code: 'BANG3', name: 'Bang Pakong' }
        ]
      },
      { code: '17', name: 'Surat Thani',
        cities: [
          { code: 'SURAT', name: 'Surat Thani' },
          { code: 'MUANG', name: 'Mueang Surat Thani' },
          { code: 'BAN', name: 'Ban Ta Khun' },
          { code: 'BAN2', name: 'Ban Don' },
          { code: 'KANCHANADIT', name: 'Kanchanadit' },
          { code: 'DON', name: 'Don Sak' },
          { code: 'KO', name: 'Ko Samui' },
          { code: 'KO2', name: 'Ko Pha Ngan' },
          { code: 'KO3', name: 'Ko Tao' },
          { code: 'BAN3', name: 'Ban Na Doem' }
        ]
      },
      { code: '18', name: 'Songkhla',
        cities: [
          { code: 'SONGKHLA', name: 'Songkhla' },
          { code: 'MUANG', name: 'Mueang Songkhla' },
          { code: 'HAT', name: 'Hat Yai' },
          { code: 'SADAO', name: 'Sadao' },
          { code: 'SATHAN', name: 'Sathing Phra' },
          { code: 'RANOT', name: 'Ranot' },
          { code: 'KHAO', name: 'Khao Yoi' },
          { code: 'BANG', name: 'Bang Klam' },
          { code: 'BANG2', name: 'Bang Phae' },
          { code: 'BANG3', name: 'Bang Phlat' }
        ]
      },
      { code: '19', name: 'Krabi',
        cities: [
          { code: 'KRABI', name: 'Krabi' },
          { code: 'MUANG', name: 'Mueang Krabi' },
          { code: 'KHLONG', name: 'Khlong Thom' },
          { code: 'KHLONG2', name: 'Khlong Phanom' },
          { code: 'KO', name: 'Ko Lanta' },
          { code: 'AO', name: 'Ao Luek' },
          { code: 'PAK', name: 'Pak Phli' },
          { code: 'LAM', name: 'Lam Thap' },
          { code: 'NEUA', name: 'Neua Klong' },
          { code: 'PLAI', name: 'Plai Phraya' }
        ]
      },
      { code: '20', name: 'Nakhon Ratchasima',
        cities: [
          { code: 'NAKHON', name: 'Nakhon Ratchasima' },
          { code: 'MUANG', name: 'Mueang Nakhon Ratchasima' },
          { code: 'PAK', name: 'Pak Thong Chai' },
          { code: 'CHOK', name: 'Chok Chai' },
          { code: 'DAAN', name: 'Daan' },
          { code: 'BAN', name: 'Ban Mai' },
          { code: 'BAN2', name: 'Ban Phai' },
          { code: 'BAN3', name: 'Ban Thaen' },
          { code: 'BAN4', name: 'Ban Phue' },
          { code: 'BAN5', name: 'Ban Non Narai' }
        ]
      },
      { code: '21', name: 'Khon Kaen',
        cities: [
          { code: 'KHON', name: 'Khon Kaen' },
          { code: 'MUANG', name: 'Mueang Khon Kaen' },
          { code: 'BAN', name: 'Ban Phai' },
          { code: 'BAN2', name: 'Ban Haet' },
          { code: 'BAN3', name: 'Ban Phue' },
          { code: 'BAN4', name: 'Ban Non Narai' },
          { code: 'BAN5', name: 'Ban Phaeng' },
          { code: 'BAN6', name: 'Ban Don' },
          { code: 'BAN7', name: 'Ban Thaen' },
          { code: 'BAN8', name: 'Ban Daen' }
        ]
      },
      { code: '22', name: 'Ubon Ratchathani',
        cities: [
          { code: 'UBON', name: 'Ubon Ratchathani' },
          { code: 'MUANG', name: 'Mueang Ubon Ratchathani' },
          { code: 'BAN', name: 'Ban Dung' },
          { code: 'BAN2', name: 'Ban Na Di' },
          { code: 'BAN3', name: 'Ban Na Khwai' },
          { code: 'BAN4', name: 'Ban Phue' },
          { code: 'BAN5', name: 'Ban Don' },
          { code: 'BAN6', name: 'Ban Thaen' },
          { code: 'BAN7', name: 'Ban Phaeng' },
          { code: 'BAN8', name: 'Ban Daen' }
        ]
      },
      { code: '23', name: 'Nakhon Si Thammarat',
        cities: [
          { code: 'NAKHON', name: 'Nakhon Si Thammarat' },
          { code: 'MUANG', name: 'Mueang Nakhon Si Thammarat' },
          { code: 'PAK', name: 'Pak Phanang' },
          { code: 'RON', name: 'Ron Phibun' },
          { code: 'CHALOM', name: 'Chaloem Phra Kiat' },
          { code: 'BAN', name: 'Ban Na Doem' },
          { code: 'BAN2', name: 'Ban Don' },
          { code: 'BAN3', name: 'Ban Phaeng' },
          { code: 'BAN4', name: 'Ban Thaen' },
          { code: 'BAN5', name: 'Ban Daen' }
        ]
      },
      { code: '24', name: 'Rayong',
        cities: [
          { code: 'RAYONG', name: 'Rayong' },
          { code: 'MUANG', name: 'Mueang Rayong' },
          { code: 'BAN', name: 'Ban Chang' },
          { code: 'BAN2', name: 'Ban Khai' },
          { code: 'BAN3', name: 'Ban Phe' },
          { code: 'BAN4', name: 'Ban Don' },
          { code: 'BAN5', name: 'Ban Phaeng' },
          { code: 'BAN6', name: 'Ban Thaen' },
          { code: 'BAN7', name: 'Ban Daen' },
          { code: 'BAN8', name: 'Ban Na Doem' }
        ]
      },
      { code: '25', name: 'Chiang Rai',
        cities: [
          { code: 'CHIANG', name: 'Chiang Rai' },
          { code: 'MUANG', name: 'Mueang Chiang Rai' },
          { code: 'MAE', name: 'Mae Sai' },
          { code: 'MAE2', name: 'Mae Chan' },
          { code: 'MAE3', name: 'Mae Fa Luang' },
          { code: 'WIANG', name: 'Wiang Chai' },
          { code: 'WIANG2', name: 'Wiang Pa Pao' },
          { code: 'PHAN', name: 'Phan' },
          { code: 'PHAYAO', name: 'Phayao' },
          { code: 'DOI', name: 'Doi Luang' }
        ]
      },
      { code: '26', name: 'Phitsanulok',
        cities: [
          { code: 'PHITSANULOK', name: 'Phitsanulok' },
          { code: 'MUANG', name: 'Mueang Phitsanulok' },
          { code: 'BANG', name: 'Bang Rakam' },
          { code: 'BANG2', name: 'Bang Krathum' },
          { code: 'BANG3', name: 'Bang Phae' },
          { code: 'BANG4', name: 'Bang Phlat' },
          { code: 'BANG5', name: 'Bang Phaeng' },
          { code: 'BANG6', name: 'Bang Thaen' },
          { code: 'BANG7', name: 'Bang Daen' },
          { code: 'BANG8', name: 'Bang Na Doem' }
        ]
      },
      { code: '27', name: 'Ratchaburi',
        cities: [
          { code: 'RATCHABURI', name: 'Ratchaburi' },
          { code: 'MUANG', name: 'Mueang Ratchaburi' },
          { code: 'BANG', name: 'Bang Phae' },
          { code: 'BANG2', name: 'Bang Phlat' },
          { code: 'BANG3', name: 'Bang Phaeng' },
          { code: 'BANG4', name: 'Bang Thaen' },
          { code: 'BANG5', name: 'Bang Daen' },
          { code: 'BANG6', name: 'Bang Na Doem' },
          { code: 'BANG7', name: 'Bang Don' },
          { code: 'BANG8', name: 'Bang Phaeng' }
        ]
      },
      { code: '28', name: 'Nakhon Pathom',
        cities: [
          { code: 'NAKHON', name: 'Nakhon Pathom' },
          { code: 'MUANG', name: 'Mueang Nakhon Pathom' },
          { code: 'BANG', name: 'Bang Len' },
          { code: 'BANG2', name: 'Bang Phae' },
          { code: 'BANG3', name: 'Bang Phlat' },
          { code: 'BANG4', name: 'Bang Phaeng' },
          { code: 'BANG5', name: 'Bang Thaen' },
          { code: 'BANG6', name: 'Bang Daen' },
          { code: 'BANG7', name: 'Bang Na Doem' },
          { code: 'BANG8', name: 'Bang Don' }
        ]
      },
      { code: '29', name: 'Samut Sakhon',
        cities: [
          { code: 'SAMUT', name: 'Samut Sakhon' },
          { code: 'MUANG', name: 'Mueang Samut Sakhon' },
          { code: 'BANG', name: 'Bang Khun Thian' },
          { code: 'BANG2', name: 'Bang Phae' },
          { code: 'BANG3', name: 'Bang Phlat' },
          { code: 'BANG4', name: 'Bang Phaeng' },
          { code: 'BANG5', name: 'Bang Thaen' },
          { code: 'BANG6', name: 'Bang Daen' },
          { code: 'BANG7', name: 'Bang Na Doem' },
          { code: 'BANG8', name: 'Bang Don' }
        ]
      },
      { code: '30', name: 'Samut Songkhram',
        cities: [
          { code: 'SAMUT', name: 'Samut Songkhram' },
          { code: 'MUANG', name: 'Mueang Samut Songkhram' },
          { code: 'BANG', name: 'Bang Khon Thi' },
          { code: 'BANG2', name: 'Bang Phae' },
          { code: 'BANG3', name: 'Bang Phlat' },
          { code: 'BANG4', name: 'Bang Phaeng' },
          { code: 'BANG5', name: 'Bang Thaen' },
          { code: 'BANG6', name: 'Bang Daen' },
          { code: 'BANG7', name: 'Bang Na Doem' },
          { code: 'BANG8', name: 'Bang Don' }
        ]
      }
    ]
};
