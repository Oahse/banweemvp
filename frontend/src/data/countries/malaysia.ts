/**
 * Malaysia country data with states, cities, and tax information
 */

import { Country } from './index';

export const malaysia: Country = {
    code: 'MY',
    name: 'Malaysia',
    taxInfo: { standardRate: 6, taxName: 'GST', currency: 'MYR', region: 'APAC' },
    provinces: [
      { code: 'KUL', name: 'Kuala Lumpur',
        cities: [
          { code: 'KUALA', name: 'Kuala Lumpur' },
          { code: 'PETALING', name: 'Petaling Jaya' },
          { code: 'SUBANG', name: 'Subang Jaya' },
          { code: 'SHAH', name: 'Shah Alam' },
          { code: 'AMPANG', name: 'Ampang' },
          { code: 'BANGSAR', name: 'Bangsar' },
          { code: 'MONT', name: 'Mont Kiara' },
          { code: 'CHERAS', name: 'Cheras' },
          { code: 'KEPONG', name: 'Kepong' },
          { code: 'SETAPAK', name: 'Setapak' }
        ]
      },
      { code: 'JHR', name: 'Johor',
        cities: [
          { code: 'JOHOR', name: 'Johor Bahru' },
          { code: 'BATU', name: 'Batu Pahat' },
          { code: 'MUAR', name: 'Muar' },
          { code: 'KLUANG', name: 'Kluang' },
          { code: 'SEGAMAT', name: 'Segamat' },
          { code: 'KOTA', name: 'Kota Tinggi' },
          { code: 'PONTIAN', name: 'Pontian' },
          { code: 'KULAI', name: 'Kulai' },
          { code: 'PASIR', name: 'Pasir Gudang' },
          { code: 'TANGKAK', name: 'Tangkak' }
        ]
      },
      { code: 'PHG', name: 'Pahang',
        cities: [
          { code: 'KUANTAN', name: 'Kuantan' },
          { code: 'TEMERLOH', name: 'Temerloh' },
          { code: 'BENTONG', name: 'Bentong' },
          { code: 'RAUB', name: 'Raub' },
          { code: 'PEKAN', name: 'Pekan' },
          { code: 'JERANTUT', name: 'Jerantut' },
          { code: 'MARAN', name: 'Maran' },
          { code: 'ROMPIN', name: 'Rompin' },
          { code: 'BANDAR', name: 'Bandar Tun Razak' },
          { code: 'CAMERON', name: 'Cameron Highlands' }
        ]
      },
      { code: 'PNG', name: 'Penang',
        cities: [
          { code: 'GEORGE', name: 'George Town' },
          { code: 'BUTTERWORTH', name: 'Butterworth' },
          { code: 'BAYAN', name: 'Bayan Lepas' },
          { code: 'BALIK', name: 'Balik Pulau' },
          { code: 'NIBONG', name: 'Nibong Tebal' },
          { code: 'TANJONG', name: 'Tanjong Tokong' },
          { code: 'AIR', name: 'Air Itam' },
          { code: 'JELUTONG', name: 'Jelutong' },
          { code: 'PAYA', name: 'Paya Terubong' },
          { code: 'BATU', name: 'Batu Maung' }
        ]
      },
      { code: 'PRK', name: 'Perak',
        cities: [
          { code: 'IPOH', name: 'Ipoh' },
          { code: 'TAIPING', name: 'Taiping' },
          { code: 'KUALA', name: 'Kuala Kangsar' },
          { code: 'TAPAH', name: 'Tapah' },
          { code: 'SERI', name: 'Seri Manjung' },
          { code: 'KAMPAR', name: 'Kampar' },
          { code: 'LUMUT', name: 'Lumut' },
          { code: 'PARIT', name: 'Parit Buntar' },
          { code: 'BAGAN', name: 'Bagan Serai' },
          { code: 'PROTON', name: 'Proton City' }
        ]
      },
      { code: 'SEL', name: 'Selangor',
        cities: [
          { code: 'SHAH', name: 'Shah Alam' },
          { code: 'PETALING', name: 'Petaling Jaya' },
          { code: 'SUBANG', name: 'Subang Jaya' },
          { code: 'KLANG', name: 'Klang' },
          { code: 'AMPANG', name: 'Ampang' },
          { code: 'KAJANG', name: 'Kajang' },
          { code: 'BANGI', name: 'Bangi' },
          { code: 'SELANGOR', name: 'Selangor' },
          { code: 'RAWANG', name: 'Rawang' },
          { code: 'SEKINCHAN', name: 'Sekinchan' }
        ]
      },
      { code: 'KDH', name: 'Kedah',
        cities: [
          { code: 'ALOR', name: 'Alor Setar' },
          { code: 'SUNGAI', name: 'Sungai Petani' },
          { code: 'KULIM', name: 'Kulim' },
          { code: 'LANGKAWI', name: 'Langkawi' },
          { code: 'YAN', name: 'Yan' },
          { code: 'PENDANG', name: 'Pendang' },
          { code: 'KUBANG', name: 'Kubang Pasu' },
          { code: 'SIK', name: 'Sik' },
          { code: 'Baling', name: 'Baling' },
          { code: 'PADANG', name: 'Padang Terap' }
        ]
      },
      { code: 'KTN', name: 'Kelantan',
        cities: [
          { code: 'KOTA', name: 'Kota Bharu' },
          { code: 'KUALA', name: 'Kuala Krai' },
          { code: 'PASIR', name: 'Pasir Mas' },
          { code: 'TANAH', name: 'Tanah Merah' },
          { code: 'MACHANG', name: 'Machang' },
          { code: 'BACHOK', name: 'Bachok' },
          { code: 'GUA', name: 'Gua Musang' },
          { code: 'JELI', name: 'Jeli' },
          { code: 'WAKAF', name: 'Wakaf Bharu' },
          { code: 'RANTAU', name: 'Rantau Panjang' }
        ]
      },
      { code: 'MLK', name: 'Melaka',
        cities: [
          { code: 'MALACCA', name: 'Malacca City' },
          { code: 'ALOR', name: 'Alor Gajah' },
          { code: 'JASIN', name: 'Jasin' },
          { code: 'MERLIMAU', name: 'Merlimau' },
          { code: 'BANDAR', name: 'Bandar Melaka' },
          { code: 'TELUK', name: 'Teluk Mas' },
          { code: 'AYER', name: 'Ayer Keroh' },
          { code: 'BUKIT', name: 'Bukit Beruang' },
          { code: 'PULAU', name: 'Pulau Sebang' },
          { code: 'KLEBANG', name: 'Klebang' }
        ]
      },
      { code: 'NSN', name: 'Negeri Sembilan',
        cities: [
          { code: 'SEREMBAN', name: 'Seremban' },
          { code: 'PORT', name: 'Port Dickson' },
          { code: 'NILAI', name: 'Nilai' },
          { code: 'BAHARU', name: 'Bahau' },
          { code: 'REMBAU', name: 'Rembau' },
          { code: 'TAMPIN', name: 'Tampin' },
          { code: 'KUALA', name: 'Kuala Pilah' },
          { code: 'JEMPOL', name: 'Jempol' },
          { code: 'RANTAU', name: 'Rantau' },
          { code: 'PEDAS', name: 'Pedas' }
        ]
      },
      { code: 'PLS', name: 'Perlis',
        cities: [
          { code: 'KANGAR', name: 'Kangar' },
          { code: 'ARA', name: 'Arau' },
          { code: 'KUALA', name: 'Kuala Perlis' },
          { code: 'PADANG', name: 'Padang Besar' },
          { code: 'SANGLANG', name: 'Sanglang' },
          { code: 'KAYANG', name: 'Kayang' },
          { code: 'WANG', name: 'Wang Kelian' },
          { code: 'BESERI', name: 'Beseri' },
          { code: 'MATANG', name: 'Matang' },
          { code: 'SIMPANG', name: 'Simpang Ampat' }
        ]
      },
      { code: 'TRG', name: 'Terengganu',
        cities: [
          { code: 'KUALA', name: 'Kuala Terengganu' },
          { code: 'KEMAMAN', name: 'Kemaman' },
          { code: 'KUALA', name: 'Kuala Besut' },
          { code: 'MARANG', name: 'Marang' },
          { code: 'DUNGUN', name: 'Dungun' },
          { code: 'HULU', name: 'Hulu Terengganu' },
          { code: 'BESUT', name: 'Besut' },
          { code: 'SETIU', name: 'Setiu' },
          { code: 'JERTIH', name: 'Jertih' },
          { code: 'PENGKALAN', name: 'Pengkalan Chepa' }
        ]
      },
      { code: 'SBH', name: 'Sabah',
        cities: [
          { code: 'KOTA', name: 'Kota Kinabalu' },
          { code: 'SANDAKAN', name: 'Sandakan' },
          { code: 'TAU', name: 'Tawau' },
          { code: 'LAHAD', name: 'Lahad Datu' },
          { code: 'KENINGAU', name: 'Keningau' },
          { code: 'PAPAR', name: 'Papar' },
          { code: 'BEAUFORT', name: 'Beaufort' },
          { code: 'KINABATANGAN', name: 'Kinabatangan' },
          { code: 'KUDAT', name: 'Kudat' },
          { code: 'KOTA', name: 'Kota Marudu' }
        ]
      },
      { code: 'SWK', name: 'Sarawak',
        cities: [
          { code: 'KUCHING', name: 'Kuching' },
          { code: 'MIRI', name: 'Miri' },
          { code: 'SIBU', name: 'Sibu' },
          { code: 'BINTULU', name: 'Bintulu' },
          { code: 'LIMBANG', name: 'Limbang' },
          { code: 'SRI', name: 'Sri Aman' },
          { code: 'KAPIT', name: 'Kapit' },
          { code: 'SARIKEI', name: 'Sarikei' },
          { code: 'BAU', name: 'Bau' },
          { code: 'LAWAS', name: 'Lawas' }
        ]
      },
      { code: 'LBN', name: 'Labuan',
        cities: [
          { code: 'LABUAN', name: 'Labuan' },
          { code: 'VICTORIA', name: 'Victoria' },
          { code: 'BEAUFORT', name: 'Beaufort' },
          { code: 'KUALA', name: 'Kuala Lumpur' },
          { code: 'PAPAR', name: 'Papar' },
          { code: 'RANAU', name: 'Ranau' },
          { code: 'KINABALU', name: 'Kinabalu Park' },
          { code: 'SANDAKAN', name: 'Sandakan' },
          { code: 'TAWAU', name: 'Tawau' },
          { code: 'KOTA', name: 'Kota Kinabalu' }
        ]
      },
      { code: 'PJY', name: 'Putrajaya',
        cities: [
          { code: 'PUTRAJAYA', name: 'Putrajaya' },
          { code: 'PRESINT', name: 'Presint 1' },
          { code: 'PRESINT2', name: 'Presint 2' },
          { code: 'PRESINT3', name: 'Presint 3' },
          { code: 'PRESINT4', name: 'Presint 4' },
          { code: 'PRESINT5', name: 'Presint 5' },
          { code: 'PRESINT6', name: 'Presint 6' },
          { code: 'PRESINT7', name: 'Presint 7' },
          { code: 'PRESINT8', name: 'Presint 8' },
          { code: 'PRESINT9', name: 'Presint 9' }
        ]
      }
    ]
};
