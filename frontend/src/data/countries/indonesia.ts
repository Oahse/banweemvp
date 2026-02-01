/**
 * Indonesia country data with provinces and special regions
 */

import { Country } from './index';

export const indonesia: Country = {
  code: 'ID',
  name: 'Indonesia',
  flag: '🇮🇩',
  capital: 'Jakarta',
  area: 1904569,
  currencySymbol: 'Rp',
  officialLanguages: ['Indonesian'],
  demonym: 'Indonesian',
  taxInfo: { standardRate: 11, taxName: 'VAT', currency: 'IDR', region: 'APAC' },
  divisions: [
    { code: 'JK', name: 'Jakarta', type: 'special capital region',
      cities: [
        { code: 'JAKARTA', name: 'Jakarta' },
        { code: 'KEMBANGAN', name: 'Kembangan' },
        { code: 'KALIDERES', name: 'Kalideres' },
        { code: 'KOJA', name: 'Koja' },
        { code: 'CENGKARENG', name: 'Cengkareng' }
      ]
    },
    { code: 'DI', name: 'Yogyakarta', type: 'special region',
      cities: [
        { code: 'YOGYAKARTA', name: 'Yogyakarta' },
        { code: 'BANTUL', name: 'Bantul' },
        { code: 'SLEMAN', name: 'Sleman' },
        { code: 'GUNUNGKIDUL', name: 'Gunung Kidul' },
        { code: 'KULONPROGO', name: 'Kulon Progo' }
      ]
    },
    { code: 'AC', name: 'Aceh', type: 'special province',
      cities: [
        { code: 'BANDAACEH', name: 'Banda Aceh' },
        { code: 'LHOKSEUMAWE', name: 'Lhokseumawe' },
        { code: 'LANGSA', name: 'Langsa' },
        { code: 'SABANG', name: 'Sabang' },
        { code: 'SUBULUSSALAM', name: 'Subulussalam' }
      ]
    },
    { code: 'BA', name: 'Bali', type: 'province',
      cities: [
        { code: 'DENPASAR', name: 'Denpasar' },
        { code: 'BADUNG', name: 'Badung' },
        { code: 'GIANYAR', name: 'Gianyar' },
        { code: 'TABANAN', name: 'Tabanan' },
        { code: 'KLUNGKUNG', name: 'Klungkung' }
      ]
    },
    { code: 'BB', name: 'Bangka Belitung', type: 'province',
      cities: [
        { code: 'PANGKALPINANG', name: 'Pangkal Pinang' },
        { code: 'TANUNGPANDAN', name: 'Tanjung Pandan' },
        { code: 'SUNGAILIAT', name: 'Sungai Liat' },
        { code: 'MANGGAR', name: 'Manggar' },
        { code: 'TOBOALI', name: 'Toboali' }
      ]
    },
    { code: 'BT', name: 'Banten', type: 'province',
      cities: [
        { code: 'SERANG', name: 'Serang' },
        { code: 'CILEGON', name: 'Cilegon' },
        { code: 'TANGERANG', name: 'Tangerang' },
        { code: 'TANGERANGSEL', name: 'Tangerang Selatan' },
        { code: 'LEBAK', name: 'Lebak' }
      ]
    },
    { code: 'BE', name: 'Bengkulu', type: 'province',
      cities: [
        { code: 'BENGKULU', name: 'Bengkulu' },
        { code: 'MUKOMUKO', name: 'Muko Muko' },
        { code: 'REJANGLEBONG', name: 'Rejang Lebong' },
        { code: 'KEPAHIANG', name: 'Kepahiang' },
        { code: 'SELUMA', name: 'Seluma' }
      ]
    },
    { code: 'GO', name: 'Gorontalo', type: 'province',
      cities: [
        { code: 'GORONTALO', name: 'Gorontalo' },
        { code: 'BOALEMO', name: 'Boalemo' },
        { code: 'BONEBOLANGO', name: 'Bone Bolango' },
        { code: 'POHUWATO', name: 'Pohuwato' },
        { code: 'NORTHGORONTALO', name: 'North Gorontalo' }
      ]
    },
    { code: 'JA', name: 'Jambi', type: 'province',
      cities: [
        { code: 'JAMBI', name: 'Jambi' },
        { code: 'SUNGAIPENUH', name: 'Sungai Penuh' },
        { code: 'BATANGHARI', name: 'Batang Hari' },
        { code: 'MUAROJAMBI', name: 'Muaro Jambi' },
        { code: 'TEBO', name: 'Tebo' }
      ]
    },
    { code: 'JB', name: 'West Java', type: 'province',
      cities: [
        { code: 'BANDUNG', name: 'Bandung' },
        { code: 'BOGOR', name: 'Bogor' },
        { code: 'DEPOK', name: 'Depok' },
        { code: 'BEKASI', name: 'Bekasi' },
        { code: 'CIREBON', name: 'Cirebon' }
      ]
    },
    { code: 'KT', name: 'Central Java', type: 'province',
      cities: [
        { code: 'SEMARANG', name: 'Semarang' },
        { code: 'SURAKARTA', name: 'Surakarta' },
        { code: 'SALATIGA', name: 'Salatiga' },
        { code: 'PEKALONGAN', name: 'Pekalongan' },
        { code: 'TEGAL', name: 'Tegal' }
      ]
    },
    { code: 'JT', name: 'East Java', type: 'province',
      cities: [
        { code: 'SURABAYA', name: 'Surabaya' },
        { code: 'MALANG', name: 'Malang' },
        { code: 'KEDIRI', name: 'Kediri' },
        { code: 'BLITAR', name: 'Blitar' },
        { code: 'MADIUN', name: 'Madiun' }
      ]
    },
    { code: 'KB', name: 'West Kalimantan', type: 'province',
      cities: [
        { code: 'PONTIANAK', name: 'Pontianak' },
        { code: 'SINGKAWANG', name: 'Singkawang' },
        { code: 'KUBURAYA', name: 'Kubu Raya' },
        { code: 'LANDAK', name: 'Landak' },
        { code: 'MEMPAWAH', name: 'Mempawah' }
      ]
    },
    { code: 'KS', name: 'South Kalimantan', type: 'province',
      cities: [
        { code: 'BANJARMASIN', name: 'Banjarmasin' },
        { code: 'BANJARBARU', name: 'Banjarbaru' },
        { code: 'BARITOKUALA', name: 'Barito Kuala' },
        { code: 'TAPIN', name: 'Tapin' },
        { code: 'HULUSUNGAI', name: 'Hulu Sungai' }
      ]
    },
    { code: 'KT', name: 'Central Kalimantan', type: 'province',
      cities: [
        { code: 'PALANGKARAYA', name: 'Palangkaraya' },
        { code: 'KAPUAS', name: 'Kapuas' },
        { code: 'PULANGPISAU', name: 'Pulang Pisau' },
        { code: 'GUNUNGMAS', name: 'Gunung Mas' },
        { code: 'KATINGAN', name: 'Katingan' }
      ]
    },
    { code: 'KI', name: 'East Kalimantan', type: 'province',
      cities: [
        { code: 'SAMARINDA', name: 'Samarinda' },
        { code: 'BALIKPAPAN', name: 'Balikpapan' },
        { code: 'BONTANG', name: 'Bontang' },
        { code: 'KUTAIKARTANEGARA', name: 'Kutai Kartanegara' },
        { code: 'PASER', name: 'Paser' }
      ]
    },
    { code: 'KR', name: 'Riau Islands', type: 'province',
      cities: [
        { code: 'TANUNGPINANG', name: 'Tanjung Pinang' },
        { code: 'BATAM', name: 'Batam' },
        { code: 'BINTAN', name: 'Bintan' },
        { code: 'KARIMUN', name: 'Karimun' },
        { code: 'LINGGA', name: 'Lingga' }
      ]
    },
    { code: 'LA', name: 'Lampung', type: 'province',
      cities: [
        { code: 'BANDARLAMPUNG', name: 'Bandar Lampung' },
        { code: 'METRO', name: 'Metro' },
        { code: 'LAMPUNGTENGAH', name: 'Lampung Tengah' },
        { code: 'LAMPUNGSELATAN', name: 'Lampung Selatan' },
        { code: 'LAMPUNGUTARA', name: 'Lampung Utara' }
      ]
    },
    { code: 'MA', name: 'Maluku', type: 'province',
      cities: [
        { code: 'AMBON', name: 'Ambon' },
        { code: 'TUAL', name: 'Tual' },
        { code: 'MASOHI', name: 'Masohi' },
        { code: 'LEITIMUR', name: 'Leitimur' },
        { code: 'SERAM', name: 'Seram' }
      ]
    },
    { code: 'MU', name: 'North Maluku', type: 'province',
      cities: [
        { code: 'TERNATE', name: 'Ternate' },
        { code: 'TIDORE', name: 'Tidore' },
        { code: 'HALMAHERA', name: 'Halmahera' },
        { code: 'MOROTAI', name: 'Morotai' },
        { code: 'SULA', name: 'Sula' }
      ]
    },
    { code: 'NB', name: 'West Nusa Tenggara', type: 'province',
      cities: [
        { code: 'MATARAM', name: 'Mataram' },
        { code: 'BIMA', name: 'Bima' },
        { code: 'SUMBAWA', name: 'Sumbawa' },
        { code: 'DOMPU', name: 'Dompu' },
        { code: 'WESTLOMBOK', name: 'West Lombok' }
      ]
    },
    { code: 'NT', name: 'East Nusa Tenggara', type: 'province',
      cities: [
        { code: 'KUPANG', name: 'Kupang' },
        { code: 'ENDE', name: 'Ende' },
        { code: 'MAUMERE', name: 'Maumere' },
        { code: 'BAA', name: 'Baa' },
        { code: 'RUTENG', name: 'Ruteng' }
      ]
    },
    { code: 'PA', name: 'Papua', type: 'province',
      cities: [
        { code: 'JAYAPURA', name: 'Jayapura' },
        { code: 'SORONG', name: 'Sorong' },
        { code: 'MERAUKE', name: 'Merauke' },
        { code: 'TIMIKA', name: 'Timika' },
        { code: 'BIAK', name: 'Biak' }
      ]
    },
    { code: 'PB', name: 'West Papua', type: 'province',
      cities: [
        { code: 'MANOKWARI', name: 'Manokwari' },
        { code: 'SORONG', name: 'Sorong' },
        { code: 'FAKFAK', name: 'Fakfak' },
        { code: 'KAIMANA', name: 'Kaimana' },
        { code: 'TELUKBINTUNI', name: 'Teluk Bintuni' }
      ]
    },
    { code: 'RI', name: 'Riau', type: 'province',
      cities: [
        { code: 'PEKANBARU', name: 'Pekanbaru' },
        { code: 'DUMAI', name: 'Dumai' },
        { code: 'BENGKALIS', name: 'Bengkalis' },
        { code: 'SIAK', name: 'Siak' },
        { code: 'KAMPAR', name: 'Kampar' }
      ]
    },
    { code: 'SR', name: 'West Sulawesi', type: 'province',
      cities: [
        { code: 'MAMUJU', name: 'Mamuju' },
        { code: 'POLEWALIMANDAR', name: 'Polewali Mandar' },
        { code: 'MAJENE', name: 'Majene' },
        { code: 'MAMASAH', name: 'Mamasa' },
        { code: 'NORTHMAMUJU', name: 'North Mamuju' }
      ]
    },
    { code: 'SN', name: 'South Sulawesi', type: 'province',
      cities: [
        { code: 'MAKASSAR', name: 'Makassar' },
        { code: 'PAREPARE', name: 'Parepare' },
        { code: 'PALOPO', name: 'Palopo' },
        { code: 'MAROS', name: 'Maros' },
        { code: 'GOWA', name: 'Gowa' }
      ]
    },
    { code: 'ST', name: 'Central Sulawesi', type: 'province',
      cities: [
        { code: 'PALU', name: 'Palu' },
        { code: 'SIGI', name: 'Sigi' },
        { code: 'PARIGIMOUTONG', name: 'Parigi Moutong' },
        { code: 'POSO', name: 'Poso' },
        { code: 'DONGGALA', name: 'Donggala' }
      ]
    },
    { code: 'SG', name: 'Southeast Sulawesi', type: 'province',
      cities: [
        { code: 'KENDARI', name: 'Kendari' },
        { code: 'BAU-BAU', name: 'Bau-Bau' },
        { code: 'KOLAKA', name: 'Kolaka' },
        { code: 'KONAWESELATAN', name: 'Konawe Selatan' },
        { code: 'MUNA', name: 'Muna' }
      ]
    },
    { code: 'SA', name: 'South Sulawesi', type: 'province',
      cities: [
        { code: 'MAKASSAR', name: 'Makassar' },
        { code: 'PAREPARE', name: 'Parepare' },
        { code: 'PALOPO', name: 'Palopo' },
        { code: 'MAROS', name: 'Maros' },
        { code: 'GOWA', name: 'Gowa' }
      ]
    },
    { code: 'SS', name: 'West Sulawesi', type: 'province',
      cities: [
        { code: 'MAMUJU', name: 'Mamuju' },
        { code: 'POLEWALIMANDAR', name: 'Polewali Mandar' },
        { code: 'MAJENE', name: 'Majene' },
        { code: 'MAMASAH', name: 'Mamasa' },
        { code: 'NORTHMAMUJU', name: 'North Mamuju' }
      ]
    },
    { code: 'SU', name: 'North Sumatra', type: 'province',
      cities: [
        { code: 'MEDAN', name: 'Medan' },
        { code: 'BINJAI', name: 'Binjai' },
        { code: 'TEBINGTINGGI', name: 'Tebing Tinggi' },
        { code: 'PADANGSIDIMPUAN', name: 'Padang Sidempuan' },
        { code: 'PEMATANGSIANTAR', name: 'Pematang Siantar' }
      ]
    },
    { code: 'SB', name: 'South Sumatra', type: 'province',
      cities: [
        { code: 'PALEMBANG', name: 'Palembang' },
        { code: 'PRABUMULIH', name: 'Prabumulih' },
        { code: 'PAGARALAM', name: 'Pagar Alam' },
        { code: 'LUBUKLINGGAU', name: 'Lubuklinggau' },
        { code: 'OGANILIR', name: 'Ogan Ilir' }
      ]
    },
    { code: 'SG', name: 'West Sumatra', type: 'province',
      cities: [
        { code: 'PADANG', name: 'Padang' },
        { code: 'PAYAKUMBUH', name: 'Payakumbuh' },
        { code: 'BUKITTINGGI', name: 'Bukittinggi' },
        { code: 'PADANGPANJANG', name: 'Padang Panjang' },
        { code: 'SOLOK', name: 'Solok' }
      ]
    },
    { code: 'SR', name: 'Riau', type: 'province',
      cities: [
        { code: 'PEKANBARU', name: 'Pekanbaru' },
        { code: 'DUMAI', name: 'Dumai' },
        { code: 'BENGKALIS', name: 'Bengkalis' },
        { code: 'SIAK', name: 'Siak' },
        { code: 'KAMPAR', name: 'Kampar' }
      ]
    },
    { code: 'SS', name: 'South Sumatra', type: 'province',
      cities: [
        { code: 'PALEMBANG', name: 'Palembang' },
        { code: 'PRABUMULIH', name: 'Prabumulih' },
        { code: 'PAGARALAM', name: 'Pagar Alam' },
        { code: 'LUBUKLINGGAU', name: 'Lubuklinggau' },
        { code: 'OGANILIR', name: 'Ogan Ilir' }
      ]
    },
    { code: 'SU', name: 'North Sumatra', type: 'province',
      cities: [
        { code: 'MEDAN', name: 'Medan' },
        { code: 'BINJAI', name: 'Binjai' },
        { code: 'TEBINGTINGGI', name: 'Tebing Tinggi' },
        { code: 'PADANGSIDIMPUAN', name: 'Padang Sidempuan' },
        { code: 'PEMATANGSIANTAR', name: 'Pematang Siantar' }
      ]
    },
    { code: 'SW', name: 'West Sumatra', type: 'province',
      cities: [
        { code: 'PADANG', name: 'Padang' },
        { code: 'PAYAKUMBUH', name: 'Payakumbuh' },
        { code: 'BUKITTINGGI', name: 'Bukittinggi' },
        { code: 'PADANGPANJANG', name: 'Padang Panjang' },
        { code: 'SOLOK', name: 'Solok' }
      ]
    }
  ]
};
