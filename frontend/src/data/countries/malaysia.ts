/**
 * Malaysia country data with states and federal territories
 */

import { Country } from './index';

export const malaysia: Country = {
  code: 'MY',
  name: 'Malaysia',
  flag: '🇲🇾',
  capital: 'Kuala Lumpur',
  area: 330803,
  currencySymbol: 'RM',
  officialLanguages: ['Malay'],
  demonym: 'Malaysian',
  taxInfo: { standardRate: 6, taxName: 'GST', currency: 'MYR', region: 'APAC' },
  divisions: [
    { code: 'JHR', name: 'Johor', type: 'state',
      cities: [
        { code: 'JOHORBAHRU', name: 'Johor Bahru' },
        { code: 'BATUPAHAT', name: 'Batu Pahat' },
        { code: 'MUAR', name: 'Muar' },
        { code: 'KLUANG', name: 'Kluang' },
        { code: 'SEGAMAT', name: 'Segamat' }
      ]
    },
    { code: 'KDH', name: 'Kedah', type: 'state',
      cities: [
        { code: 'ALORSETAR', name: 'Alor Setar' },
        { code: 'SUNGAI', name: 'Sungai Petani' },
        { code: 'KULIM', name: 'Kulim' },
        { code: 'LANGKAWI', name: 'Langkawi' },
        { code: 'YAN', name: 'Yan' }
      ]
    },
    { code: 'KTN', name: 'Kelantan', type: 'state',
      cities: [
        { code: 'KOTABHARU', name: 'Kota Bharu' },
        { code: 'KUBANGKERIAN', name: 'Kubang Kerian' },
        { code: 'PASIRMAS', name: 'Pasir Mas' },
        { code: 'TANAHMERAH', name: 'Tanah Merah' },
        { code: 'KUALAKRAI', name: 'Kuala Krai' }
      ]
    },
    { code: 'MLK', name: 'Malacca', type: 'state',
      cities: [
        { code: 'MALACCA', name: 'Malacca City' },
        { code: 'ALORGAJAH', name: 'Alor Gajah' },
        { code: 'JASIN', name: 'Jasin' },
        { code: 'MERLIMAU', name: 'Merlimau' },
        { code: 'TELUK', name: 'Teluk' }
      ]
    },
    { code: 'NSN', name: 'Negeri Sembilan', type: 'state',
      cities: [
        { code: 'SEREMBAN', name: 'Seremban' },
        { code: 'PORTDICKSON', name: 'Port Dickson' },
        { code: 'NILAI', name: 'Nilai' },
        { code: 'REMBAU', name: 'Rembau' },
        { code: 'JEMPOL', name: 'Jempol' }
      ]
    },
    { code: 'PHG', name: 'Pahang', type: 'state',
      cities: [
        { code: 'KUANTAN', name: 'Kuantan' },
        { code: 'TEMERLOH', name: 'Temerloh' },
        { code: 'BENTONG', name: 'Bentong' },
        { code: 'RAUB', name: 'Raub' },
        { code: 'JERANTUT', name: 'Jerantut' }
      ]
    },
    { code: 'PRK', name: 'Perak', type: 'state',
      cities: [
        { code: 'IPOH', name: 'Ipoh' },
        { code: 'TAIPING', name: 'Taiping' },
        { code: 'KUALAKANGSAR', name: 'Kuala Kangsar' },
        { code: 'TAPAH', name: 'Tapah' },
        { code: 'KAMPAR', name: 'Kampar' }
      ]
    },
    { code: 'PLS', name: 'Perlis', type: 'state',
      cities: [
        { code: 'KANGAR', name: 'Kangar' },
        { code: 'ARAUPUTRA', name: 'Arau' },
        { code: 'KANGAR', name: 'Kangar' },
        { code: 'PADANG', name: 'Padang Besar' },
        { code: 'KUALAPERAIS', name: 'Kuala Perlis' }
      ]
    },
    { code: 'PNG', name: 'Penang', type: 'state',
      cities: [
        { code: 'GEORGETOWN', name: 'George Town' },
        { code: 'BAYAN', name: 'Bayan Lepas' },
        { code: 'BALIK', name: 'Balik Pulau' },
        { code: 'BUTTERWORTH', name: 'Butterworth' },
        { code: 'NIBONG', name: 'Nibong Tebal' }
      ]
    },
    { code: 'SBH', name: 'Sabah', type: 'state',
      cities: [
        { code: 'KOTAKINABALU', name: 'Kota Kinabalu' },
        { code: 'SANDAKAN', name: 'Sandakan' },
        { code: 'TAWAU', name: 'Tawau' },
        { code: 'LAHAD', name: 'Lahad Datu' },
        { code: 'KUNAK', name: 'Kunak' }
      ]
    },
    { code: 'SWK', name: 'Sarawak', type: 'state',
      cities: [
        { code: 'KUCHING', name: 'Kuching' },
        { code: 'MIRI', name: 'Miri' },
        { code: 'SIBU', name: 'Sibu' },
        { code: 'BINTULU', name: 'Bintulu' },
        { code: 'LIMBANG', name: 'Limbang' }
      ]
    },
    { code: 'SGR', name: 'Selangor', type: 'state',
      cities: [
        { code: 'SHAHALAM', name: 'Shah Alam' },
        { code: 'PETALING', name: 'Petaling Jaya' },
        { code: 'SUBANG', name: 'Subang Jaya' },
        { code: 'KLANG', name: 'Klang' },
        { code: 'KUALASELANGOR', name: 'Kuala Selangor' }
      ]
    },
    { code: 'TRG', name: 'Terengganu', type: 'state',
      cities: [
        { code: 'KUALATERENGGANU', name: 'Kuala Terengganu' },
        { code: 'KEMAMAN', name: 'Kemaman' },
        { code: 'KUALABESUT', name: 'Kuala Besut' },
        { code: 'MARANG', name: 'Marang' },
        { code: 'DUNGUN', name: 'Dungun' }
      ]
    },
    { code: 'KUL', name: 'Kuala Lumpur', type: 'federal territory',
      cities: [
        { code: 'KUALALUMPUR', name: 'Kuala Lumpur' },
        { code: 'BANGSAR', name: 'Bangsar' },
        { code: 'AMPANG', name: 'Ampang' },
        { code: 'CHERAS', name: 'Cheras' },
        { code: 'PETALING', name: 'Petaling' }
      ]
    },
    { code: 'LBN', name: 'Labuan', type: 'federal territory',
      cities: [
        { code: 'LABUAN', name: 'Labuan' },
        { code: 'VICTORIA', name: 'Victoria' },
        { code: 'KIAMAN', name: 'Kiaman' },
        { code: 'BEAUFORT', name: 'Beaufort' },
        { code: 'SIPITANG', name: 'Sipitang' }
      ]
    },
    { code: 'PJY', name: 'Putrajaya', type: 'federal territory',
      cities: [
        { code: 'PUTRAJAYA', name: 'Putrajaya' },
        { code: 'SERISARAWAK', name: 'Seri Sarawak' },
        { code: 'SERIPERDANA', name: 'Seri Perdana' },
        { code: 'SERIJEMPOL', name: 'Seri Jempol' },
        { code: 'SERIWAWASAN', name: 'Seri Wawasan' }
      ]
    }
  ]
};
