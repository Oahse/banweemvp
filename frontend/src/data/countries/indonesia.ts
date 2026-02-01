/**
 * Indonesia country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const indonesia: Country = {
    code: 'ID',
    name: 'Indonesia',
    taxInfo: { standardRate: 11, taxName: 'VAT', currency: 'IDR', region: 'APAC' },
    provinces: [
      { code: 'JK', name: 'Jakarta',
        cities: [
          { code: 'JKT', name: 'Jakarta' },
          { code: 'JAKARTA', name: 'Jakarta' },
          { code: 'JAKARTA2', name: 'Jakarta' },
          { code: 'JAKARTA3', name: 'Jakarta' },
          { code: 'JAKARTA4', name: 'Jakarta' },
          { code: 'JAKARTA5', name: 'Jakarta' },
          { code: 'JAKARTA6', name: 'Jakarta' },
          { code: 'JAKARTA7', name: 'Jakarta' },
          { code: 'JAKARTA8', name: 'Jakarta' },
          { code: 'JAKARTA9', name: 'Jakarta' }
        ]
      },
      { code: 'JB', name: 'West Java',
        cities: [
          { code: 'BDG', name: 'Bandung' },
          { code: 'BEKASI', name: 'Bekasi' },
          { code: 'BOGOR', name: 'Bogor' },
          { code: 'DEPOK', name: 'Depok' },
          { code: 'CIREBON', name: 'Cirebon' },
          { code: 'SUKABUMI', name: 'Sukabumi' },
          { code: 'TASIKMALAYA', name: 'Tasikmalaya' },
          { code: 'PURWAKARTA', name: 'Purwakarta' },
          { code: 'CIMAHI', name: 'Cimahi' },
          { code: 'BANJAR', name: 'Banjar' }
        ]
      },
      { code: 'JT', name: 'Central Java',
        cities: [
          { code: 'SRG', name: 'Semarang' },
          { code: 'SURAKARTA', name: 'Surakarta' },
          { code: 'YOGYAKARTA', name: 'Yogyakarta' },
          { code: 'TEGAL', name: 'Tegal' },
          { code: 'PEKALONGAN', name: 'Pekalongan' },
          { code: 'SALATIGA', name: 'Salatiga' },
          { code: 'MAGELANG', name: 'Magelang' },
          { code: 'PURWOKERTO', name: 'Purwokerto' },
          { code: 'KLATEN', name: 'Klaten' },
          { code: 'BOJONEGORO', name: 'Bojonegoro' }
        ]
      },
      { code: 'JI', name: 'East Java',
        cities: [
          { code: 'SBY', name: 'Surabaya' },
          { code: 'MALANG', name: 'Malang' },
          { code: 'KEDIRI', name: 'Kediri' },
          { code: 'BLITAR', name: 'Blitar' },
          { code: 'MADIUN', name: 'Madiun' },
          { code: 'JEMBER', name: 'Jember' },
          { code: 'PROBOLINGGO', name: 'Probolinggo' },
          { code: 'PASURUAN', name: 'Pasuruan' },
          { code: 'MOJOKERTO', name: 'Mojokerto' },
          { code: 'BANYUWANGI', name: 'Banyuwangi' }
        ]
      },
      { code: 'BA', name: 'Bali',
        cities: [
          { code: 'DPS', name: 'Denpasar' },
          { code: 'UBUD', name: 'Ubud' },
          { code: 'KUTA', name: 'Kuta' },
          { code: 'SEMINYAK', name: 'Seminyak' },
          { code: 'SANUR', name: 'Sanur' },
          { code: 'NUSA', name: 'Nusa Dua' },
          { code: 'CANGGU', name: 'Canggu' },
          { code: 'JIMBARAN', name: 'Jimbaran' },
          { code: 'TANAH', name: 'Tanah Lot' },
          { code: 'ULUWATU', name: 'Uluwatu' }
        ]
      },
      { code: 'SU', name: 'North Sumatra',
        cities: [
          { code: 'MDN', name: 'Medan' },
          { code: 'PEKANBARU', name: 'Pekanbaru' },
          { code: 'BATAM', name: 'Batam' },
          { code: 'PALEMBANG', name: 'Palembang' },
          { code: 'PADANG', name: 'Padang' },
          { code: 'JAMBI', name: 'Jambi' },
          { code: 'BENGKULU', name: 'Bengkulu' },
          { code: 'LAMPUNG', name: 'Lampung' },
          { code: 'BANDAR', name: 'Bandar Lampung' },
          { code: 'METRO', name: 'Metro' }
        ]
      },
      { code: 'SS', name: 'South Sumatra',
        cities: [
          { code: 'PLM', name: 'Palembang' },
          { code: 'PRABUMULIH', name: 'Prabumulih' },
          { code: 'PAGAR', name: 'Pagar Alam' },
          { code: 'LUBUK', name: 'Lubuk Linggau' },
          { code: 'BANYUASIN', name: 'Banyuasin' },
          { code: 'OGAN', name: 'Ogan Ilir' },
          { code: 'OGAN2', name: 'Ogan Komering Ilir' },
          { code: 'MUARA', name: 'Muara Enim' },
          { code: 'LAHAT', name: 'Lahat' },
          { code: 'EMPAT', name: 'Empat Lawang' }
        ]
      },
      { code: 'RI', name: 'Riau',
        cities: [
          { code: 'PKU', name: 'Pekanbaru' },
          { code: 'DUMAI', name: 'Dumai' },
          { code: 'BENGKALIS', name: 'Bengkalis' },
          { code: 'SIAK', name: 'Siak' },
          { code: 'PELALAWAN', name: 'Pelalawan' },
          { code: 'ROKAN', name: 'Rokan Hulu' },
          { code: 'ROKAN2', name: 'Rokan Hilir' },
          { code: 'KAMPAR', name: 'Kampar' },
          { code: 'INDRAGIRI', name: 'Indragiri Hulu' },
          { code: 'INDRAGIRI2', name: 'Indragiri Hilir' }
        ]
      },
      { code: 'KR', name: 'Riau Islands',
        cities: [
          { code: 'BTH', name: 'Batam' },
          { code: 'TJ', name: 'Tanjung Pinang' },
          { code: 'KARIMUN', name: 'Karimun' },
          { code: 'BINTAN', name: 'Bintan' },
          { code: 'NATUNA', name: 'Natuna' },
          { code: 'LINGGA', name: 'Lingga' },
          { code: 'ANAMBAS', name: 'Anambas' },
          { code: 'BATAM2', name: 'Batam' },
          { code: 'TANJUNG', name: 'Tanjung Balai Karimun' },
          { code: 'TANJUNG2', name: 'Tanjung Pinang' }
        ]
      },
      { code: 'KB', name: 'West Kalimantan',
        cities: [
          { code: 'PNK', name: 'Pontianak' },
          { code: 'SINGKAWANG', name: 'Singkawang' },
          { code: 'KETAPANG', name: 'Ketapang' },
          { code: 'SINTANG', name: 'Sintang' },
          { code: 'MEMPAWAH', name: 'Mempawah' },
          { code: 'SANGGAU', name: 'Sanggau' },
          { code: 'SEKADAU', name: 'Sekadau' },
          { code: 'LANDAK', name: 'Landak' },
          { code: 'KAPUAS', name: 'Kapuas Hulu' },
          { code: 'BENGKAYANG', name: 'Bengkayang' }
        ]
      },
      { code: 'KT', name: 'Central Kalimantan',
        cities: [
          { code: 'PKY', name: 'Palangkaraya' },
          { code: 'SAMPIT', name: 'Sampit' },
          { code: 'KUALA', name: 'Kuala Kapuas' },
          { code: 'PANGKALAN', name: 'Pangkalan Bun' },
          { code: 'MUARA', name: 'Muara Teweh' },
          { code: 'KASONGAN', name: 'Kasongan' },
          { code: 'BUNTOK', name: 'Buntok' },
          { code: 'PURUK', name: 'Puruk Cahu' },
          { code: 'KUALA2', name: 'Kuala Kurun' },
          { code: 'TAMIANG', name: 'Tamiang Layang' }
        ]
      },
      { code: 'KS', name: 'South Kalimantan',
        cities: [
          { code: 'BDJ', name: 'Banjarmasin' },
          { code: 'BANJARBARU', name: 'Banjarbaru' },
          { code: 'MARTAPURA', name: 'Martapura' },
          { code: 'BARABAI', name: 'Barabai' },
          { code: 'KANDANGAN', name: 'Kandangan' },
          { code: 'RANTAU', name: 'Rantau' },
          { code: 'TANJUNG', name: 'Tanjung' },
          { code: 'AMUNTAI', name: 'Amuntai' },
          { code: 'PELAIHARI', name: 'Pelaihari' },
          { code: 'KOTABARU', name: 'Kotabaru' }
        ]
      },
      { code: 'KU', name: 'East Kalimantan',
        cities: [
          { code: 'SMD', name: 'Samarinda' },
          { code: 'BPN', name: 'Balikpapan' },
          { code: 'BONTANG', name: 'Bontang' },
          { code: 'TENGGARONG', name: 'Tenggarong' },
          { code: 'KUTAI', name: 'Kutai Kartanegara' },
          { code: 'PASER', name: 'Paser' },
          { code: 'BERAU', name: 'Berau' },
          { code: 'KUTAI2', name: 'Kutai Timur' },
          { code: 'KUTAI3', name: 'Kutai Barat' },
          { code: 'MAHAKAM', name: 'Mahakam Ulu' }
        ]
      },
      { code: 'SB', name: 'West Sulawesi',
        cities: [
          { code: 'MAMUJU', name: 'Mamuju' },
          { code: 'POLEWALI', name: 'Polewali Mandar' },
          { code: 'MAJENE', name: 'Majene' },
          { code: 'MAMASA', name: 'Mamasa' },
          { code: 'MAMUJU2', name: 'Mamuju Tengah' },
          { code: 'MAMUJU3', name: 'Mamuju Utara' },
          { code: 'POLEWALI2', name: 'Polewali Mandar' },
          { code: 'MAJENE2', name: 'Majene' },
          { code: 'MAMASA2', name: 'Mamasa' },
          { code: 'MAMUJU4', name: 'Mamuju' }
        ]
      },
      { code: 'SN', name: 'North Sulawesi',
        cities: [
          { code: 'MDC', name: 'Manado' },
          { code: 'BITUNG', name: 'Bitung' },
          { code: 'TOMOHON', name: 'Tomohon' },
          { code: 'KOTAMOBAGU', name: 'Kotamobagu' },
          { code: 'MINAHASA', name: 'Minahasa' },
          { code: 'MINAHASA2', name: 'Minahasa Utara' },
          { code: 'MINAHASA3', name: 'Minahasa Selatan' },
          { code: 'MINAHASA4', name: 'Minahasa Tenggara' },
          { code: 'BOLAANG', name: 'Bolaang Mongondow' },
          { code: 'BOLAANG2', name: 'Bolaang Mongondow Utara' }
        ]
      },
      { code: 'ST', name: 'Central Sulawesi',
        cities: [
          { code: 'PLW', name: 'Palu' },
          { code: 'POSO', name: 'Poso' },
          { code: 'LUWUK', name: 'Luwuk' },
          { code: 'TOLITOLI', name: 'Tolitoli' },
          { code: 'AMPA', name: 'Ampibabo' },
          { code: 'BANGGAI', name: 'Banggai' },
          { code: 'BANGGAI2', name: 'Banggai Kepulauan' },
          { code: 'BANGGAI3', name: 'Banggai Laut' },
          { code: 'MOROWALI', name: 'Morowali' },
          { code: 'MOROWALI2', name: 'Morowali Utara' }
        ]
      },
      { code: 'SG', name: 'South Sulawesi',
        cities: [
          { code: 'UPG', name: 'Makassar' },
          { code: 'PAREPARE', name: 'Parepare' },
          { code: 'PALOPO', name: 'Palopo' },
          { code: 'MAROS', name: 'Maros' },
          { code: 'PANGKEP', name: 'Pangkajene' },
          { code: 'BARRU', name: 'Barru' },
          { code: 'BONE', name: 'Bone' },
          { code: 'SOPPENG', name: 'Soppeng' },
          { code: 'WAJO', name: 'Wajo' },
          { code: 'SIDENRENG', name: 'Sidenreng Rappang' }
        ]
      },
      { code: 'SA', name: 'Southeast Sulawesi',
        cities: [
          { code: 'KDI', name: 'Kendari' },
          { code: 'BAU-BAU', name: 'Bau-Bau' },
          { code: 'KOLAKA', name: 'Kolaka' },
          { code: 'KONAWE', name: 'Konawe' },
          { code: 'KONAWE2', name: 'Konawe Selatan' },
          { code: 'KONAWE3', name: 'Konawe Utara' },
          { code: 'KONAWE4', name: 'Konawe Kepulauan' },
          { code: 'MUNA', name: 'Muna' },
          { code: 'MUNA2', name: 'Muna Barat' },
          { code: 'BUTON', name: 'Buton' }
        ]
      },
      { code: 'GO', name: 'Gorontalo',
        cities: [
          { code: 'GTO', name: 'Gorontalo' },
          { code: 'LIMBOTO', name: 'Limboto' },
          { code: 'Kwandang', name: 'Kwandang' },
          { code: 'Tilamuta', name: 'Tilamuta' },
          { code: 'Marisa', name: 'Marisa' },
          { code: 'Bone', name: 'Bone Bolango' },
          { code: 'Pohuwato', name: 'Pohuwato' },
          { code: 'Gorontalo2', name: 'Gorontalo Utara' },
          { code: 'Gorontalo3', name: 'Gorontalo' },
          { code: 'Gorontalo4', name: 'Gorontalo' }
        ]
      },
      { code: 'NT', name: 'West Nusa Tenggara',
        cities: [
          { code: 'LOP', name: 'Mataram' },
          { code: 'BIMA', name: 'Bima' },
          { code: 'DOMPU', name: 'Dompu' },
          { code: 'SUMBAWA', name: 'Sumbawa' },
          { code: 'SUMBAWA2', name: 'Sumbawa Barat' },
          { code: 'LOMBOK', name: 'Lombok' },
          { code: 'LOMBOK2', name: 'Lombok Barat' },
          { code: 'LOMBOK3', name: 'Lombok Tengah' },
          { code: 'LOMBOK4', name: 'Lombok Timur' },
          { code: 'LOMBOK5', name: 'Lombok Utara' }
        ]
      },
      { code: 'NT', name: 'East Nusa Tenggara',
        cities: [
          { code: 'KOE', name: 'Kupang' },
          { code: 'ENDE', name: 'Ende' },
          { code: 'MAUMERE', name: 'Maumere' },
          { code: 'FLORES', name: 'Flores' },
          { code: 'SUMBA', name: 'Sumba' },
          { code: 'SUMBA2', name: 'Sumba Barat' },
          { code: 'SUMBA3', name: 'Sumba Tengah' },
          { code: 'SUMBA4', name: 'Sumba Timur' },
          { code: 'ALOR', name: 'Alor' },
          { code: 'LEMBATA', name: 'Lembata' }
        ]
      },
      { code: 'ML', name: 'Maluku',
        cities: [
          { code: 'AMQ', name: 'Ambon' },
          { code: 'TUAL', name: 'Tual' },
          { code: 'MASOHI', name: 'Masohi' },
          { code: 'SAHU', name: 'Sahu' },
          { code: 'WEST', name: 'Seram Bagian Barat' },
          { code: 'EAST', name: 'Seram Bagian Timur' },
          { code: 'BURU', name: 'Buru' },
          { code: 'BURU2', name: 'Buru Selatan' },
          { code: 'MALUKU2', name: 'Maluku Tengah' },
          { code: 'MALUKU3', name: 'Maluku Tenggara' }
        ]
      },
      { code: 'MU', name: 'North Maluku',
        cities: [
          { code: 'TTE', name: 'Ternate' },
          { code: 'TIDORE', name: 'Tidore' },
          { code: 'JAILOLO', name: 'Jailolo' },
          { code: 'LABUHA', name: 'Labuha' },
          { code: 'SOA', name: 'Soa Sio' },
          { code: 'MOROTAI', name: 'Morotai' },
          { code: 'HALMAHERA', name: 'Halmahera Barat' },
          { code: 'HALMAHERA2', name: 'Halmahera Tengah' },
          { code: 'HALMAHERA3', name: 'Halmahera Utara' },
          { code: 'HALMAHERA4', name: 'Halmahera Selatan' }
        ]
      },
      { code: 'PA', name: 'Papua',
        cities: [
          { code: 'JAYAPURA', name: 'Jayapura' },
          { code: 'MERAUKE', name: 'Merauke' },
          { code: 'TIMIKA', name: 'Timika' },
          { code: 'NABIRE', name: 'Nabire' },
          { code: 'BIAK', name: 'Biak' },
          { code: 'SERUI', name: 'Serui' },
          { code: 'SORONG', name: 'Sorong' },
          { code: 'MANOKWARI', name: 'Manokwari' },
          { code: 'FAKFAK', name: 'Fakfak' },
          { code: 'KAIMANA', name: 'Kaimana' }
        ]
      },
      { code: 'PB', name: 'West Papua',
        cities: [
          { code: 'MANOKWARI', name: 'Manokwari' },
          { code: 'SORONG', name: 'Sorong' },
          { code: 'FAKFAK', name: 'Fakfak' },
          { code: 'KAIMANA', name: 'Kaimana' },
          { code: 'RAJA', name: 'Raja Ampat' },
          { code: 'SORONG2', name: 'Sorong Selatan' },
          { code: 'SORONG3', name: 'Sorong' },
          { code: 'TAMBRAUW', name: 'Tambrauw' },
          { code: 'MANOKWARI2', name: 'Manokwari Selatan' },
          { code: 'PEGUNUNGAN', name: 'Pegunungan Arfak' }
        ]
      }
    ]
};
