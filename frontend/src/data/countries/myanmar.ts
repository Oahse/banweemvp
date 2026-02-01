/**
 * Myanmar country data with regions, cities, and tax information
 */

import { Country } from './index';

export const myanmar: Country = {
    code: 'MM',
    name: 'Myanmar',
    taxInfo: { standardRate: 5, taxName: 'VAT', currency: 'MMK', region: 'APAC' },
    provinces: [
      { code: 'YGN', name: 'Yangon',
        cities: [
          { code: 'YANGON', name: 'Yangon' },
          { code: 'MANDALAY', name: 'Mandalay' },
          { code: 'NAYPYIDAW', name: 'Naypyidaw' },
          { code: 'MOLAM', name: 'Molam' },
          { code: 'PATHEIN', name: 'Pathein' },
          { code: 'PYAY', name: 'Pyay' },
          { code: 'TAUNGGYI', name: 'Taunggyi' },
          { code: 'SITTWE', name: 'Sittwe' },
          { code: 'MAGWE', name: 'Magwe' },
          { code: 'TAUNGGYI2', name: 'Taunggyi' }
        ]
      },
      { code: 'MDY', name: 'Mandalay',
        cities: [
          { code: 'MANDALAY', name: 'Mandalay' },
          { code: 'PYIN', name: 'Pyin Oo Lwin' },
          { code: 'MEIKHTILA', name: 'Meikhtila' },
          { code: 'MONYWA', name: 'Monywa' },
          { code: 'SHWEBO', name: 'Shwebo' },
          { code: 'KALE', name: 'Kale' },
          { code: 'KATHA', name: 'Katha' },
          { code: 'BHAMO', name: 'Bhamo' },
          { code: 'MYITKYINA', name: 'Myitkyina' },
          { code: 'PUTAO', name: 'Putao' }
        ]
      },
      { code: 'NPT', name: 'Nay Pyi Taw',
        cities: [
          { code: 'NAYPYIDAW', name: 'Naypyidaw' },
          { code: 'PYINMANA', name: 'Pyinmana' },
          { code: 'LEPKADAW', name: 'Lepkadaw' },
          { code: 'PYIN', name: 'Pyin' },
          { code: 'TATKON', name: 'Tatkon' },
          { code: 'YEDASH', name: 'Yedash' },
          { code: 'ZABU', name: 'Zabu' },
          { code: 'PINLAUNG', name: 'Pinlaung' },
          { code: 'PAUNGBAN', name: 'Paungban' },
          { code: 'NAYPYIDAW2', name: 'Naypyidaw' }
        ]
      },
      { code: 'SGG', name: 'Sagaing',
        cities: [
          { code: 'SAGAING', name: 'Sagaing' },
          { code: 'MONYWA', name: 'Monywa' },
          { code: 'SHWEBO', name: 'Shwebo' },
          { code: 'KALE', name: 'Kale' },
          { code: 'KATHA', name: 'Katha' },
          { code: 'BHAMO', name: 'Bhamo' },
          { code: 'MYITKYINA', name: 'Myitkyina' },
          { code: 'PUTAO', name: 'Putao' },
          { code: 'HOMMALIN', name: 'Homalin' },
          { code: 'TAMU', name: 'Tamu' }
        ]
      },
      { code: 'TGY', name: 'Tanintharyi',
        cities: [
          { code: 'DAWEI', name: 'Dawei' },
          { code: 'MYEIK', name: 'Myeik' },
          { code: 'KAWTHOUNG', name: 'Kawthoung' },
          { code: 'MAUBIN', name: 'Maubin' },
          { code: 'PAKTAW', name: 'Pakokku' },
          { code: 'MYAWADY', name: 'Myawady' },
          { code: 'KYAING', name: 'Kyaing' },
          { code: 'PALAW', name: 'Palaw' },
          { code: 'KYAUKPHYU', name: 'Kyaikphyu' },
          { code: 'DAWEI2', name: 'Dawei' }
        ]
      },
      { code: 'AKY', name: 'Ayeyarwady',
        cities: [
          { code: 'PATHEIN', name: 'Pathein' },
          { code: 'PYAY', name: 'Pyay' },
          { code: 'MYAUNGMYA', name: 'Myaungmya' },
          { code: 'HENZADA', name: 'Henzada' },
          { code: 'LABUTTA', name: 'Labutta' },
          { code: 'MAUBIN', name: 'Maubin' },
          { code: 'WAKEMA', name: 'Wakema' },
          { code: 'MYAUNGLA', name: 'Myaungla' },
          { code: 'KYAUKPYU', name: 'Kyaikpyu' },
          { code: 'PATHEIN2', name: 'Pathein' }
        ]
      },
      { code: 'BGO', name: 'Bago',
        cities: [
          { code: 'BAGO', name: 'Bago' },
          { code: 'TAUNGGYI', name: 'Taunggyi' },
          { code: 'PYAY', name: 'Pyay' },
          { code: 'THANDWE', name: 'Thandwe' },
          { code: 'PYU', name: 'Pyu' },
          { code: 'TAUNGGYI2', name: 'Taunggyi' },
          { code: 'PYAY2', name: 'Pyay' },
          { code: 'THANDWE2', name: 'Thandwe' },
          { code: 'PYU2', name: 'Pyu' },
          { code: 'TAUNGGYI3', name: 'Taunggyi' }
        ]
      },
      { code: 'MGY', name: 'Magway',
        cities: [
          { code: 'MAGWE', name: 'Magwe' },
          { code: 'CHAUK', name: 'Chauk' },
          { code: 'MINBU', name: 'Minbu' },
          { code: 'THAYET', name: 'Thayet' },
          { code: 'PAKOKKU', name: 'Pakokku' },
          { code: 'YENANGYAUNG', name: 'Yenangyaung' },
          { code: 'MYAUNG', name: 'Myaung' },
          { code: 'SEIKPHU', name: 'Seikphu' },
          { code: 'KANGYI', name: 'Kangyi' },
          { code: 'SALIN', name: 'Salin' }
        ]
      },
      { code: 'RKH', name: 'Rakhine',
        cities: [
          { code: 'SITTWE', name: 'Sittwe' },
          { code: 'THANDWE', name: 'Thandwe' },
          { code: 'KYAUKPHYU', name: 'Kyaikphyu' },
          { code: 'TOUNGUP', name: 'Taungup' },
          { code: 'SANDOWAY', name: 'Sandoway' },
          { code: 'MRAUKU', name: 'Mrauk U' },
          { code: 'MINBYA', name: 'Minbya' },
          { code: 'ANN', name: 'Ann' },
          { code: 'KYAUKPHYU2', name: 'Kyaikphyu' },
          { code: 'SITTWE2', name: 'Sittwe' }
        ],
      },
      { code: 'SHN', name: 'Shan',
        cities: [
          { code: 'TAUNGGYI', name: 'Taunggyi' },
          { code: 'LAASHIO', name: 'Lashio' },
          { code: 'KUNLONG', name: 'Kunlong' },
          { code: 'LASHIO2', name: 'Lashio' },
          { code: 'MU', name: 'Mu' },
          { code: 'NAMSANG', name: 'Namsang' },
          { code: 'MONG', name: 'Mong' },
          { code: 'NAMHSAN', name: 'Namhsan' },
          { code: 'NAMTU', name: 'Namtu' },
          { code: 'PANG', name: 'Pang' }
        ],
      },
      { code: 'KAY', name: 'Kayah',
        cities: [
          { code: 'LOIKAW', name: 'Loikaw' },
          { code: 'DEMOSO', name: 'Demoso' },
          { code: 'PRUSO', name: 'Pruso' },
          { code: 'BAWLAKHE', name: 'Bawlakhe' },
          { code: 'HPASO', name: 'Hpaso' },
          { code: 'SHADAW', name: 'Shadaw' },
          { code: 'MASEIN', name: 'Masein' },
          { code: 'PASAUNG', name: 'Pasaung' },
          { code: 'LOIKAW2', name: 'Loikaw' },
          { code: 'DEMOSO2', name: 'Demoso' }
        ],
      },
      { code: 'KCH', name: 'Chin',
        cities: [
          { code: 'HAKHA', name: 'Hakha' },
          { code: 'FALAM', name: 'Falam' },
          { code: 'TIDIM', name: 'Tidim' },
          { code: 'TONZANG', name: 'Tonza' },
          { code: 'MINDAT', name: 'Mindat' },
          { code: 'KANPALET', name: 'Kanpetlet' },
          { code: 'MATUPI', name: 'Matupi' },
          { code: 'PALETLWA', name: 'Paletwa' },
          { code: 'REH', name: 'Reh' },
          { code: 'SAMI', name: 'Sami' }
        ],
      },
      { code: 'MON', name: 'Mon',
        cities: [
          { code: 'MAWLAMYINE', name: 'Mawlamyine' },
          { code: 'THATON', name: 'Thaton' },
          { code: 'BILIN', name: 'Bilin' },
          { code: 'KYAIKTO', name: 'Kyaikto' },
          { code: 'YE', name: 'Ye' },
          { code: 'PAUN', name: 'Paung' },
          { code: 'MAWLAMYINE2', name: 'Mawlamyine' },
          { code: 'THATON2', name: 'Thaton' },
          { code: 'BILIN2', name: 'Bilin' },
          { code: 'KYAIKTO2', name: 'Kyaikto' }
        ]
      }
    ]
};
