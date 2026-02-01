/**
 * Afghanistan country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const afghanistan: Country = {
    code: 'AF',
    name: 'Afghanistan',
    taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'AFN', region: 'MEA' },
    provinces: [
      { code: 'KAB', name: 'Kabul',
        cities: [
          { code: 'KABUL', name: 'Kabul' },
          { code: 'CHARASIAB', name: 'Char Asiab' },
          { code: 'DEH', name: 'Deh Sabz' },
          { code: 'GUL', name: 'Gul Darah' },
          { code: 'KALAKAN', name: 'Kalakan' },
          { code: 'KHUD', name: 'Khudhaman' },
          { code: 'MIR', name: 'Mir Bacha Kot' },
          { code: 'MUSA', name: 'Musa Khel' },
          { code: 'PAGHMAN', name: 'Paghman' },
          { code: 'QALA', name: 'Qala-i-Zal' }
        ]
      },
      { code: 'HER', name: 'Herat',
        cities: [
          { code: 'HERAT', name: 'Herat' },
          { code: 'ADRA', name: 'Adraskan' },
          { code: 'CHISHT', name: 'Chishti Sharif' },
          { code: 'FARSI', name: 'Farsi' },
          { code: 'GHORIAN', name: 'Ghorian' },
          { code: 'GUL', name: 'Gulran' },
          { code: 'INJIL', name: 'Injil' },
          { code: 'KARUKH', name: 'Karukh' },
          { code: 'KOH', name: 'Kohsan' },
          { code: 'KUSHK', name: 'Kushk' }
        ]
      },
      { code: 'KAN', name: 'Kandahar',
        cities: [
          { code: 'KANDAHAR', name: 'Kandahar' },
          { code: 'ARGHANDAB', name: 'Arghandab' },
          { code: 'ARGHISTAN', name: 'Arghistan' },
          { code: 'DAMAN', name: 'Daman' },
          { code: 'GIRISHK', name: 'Girishk' },
          { code: 'KOH', name: 'Koh-i-Safed' },
          { code: 'MARUF', name: 'Maruf' },
          { code: 'MIA', name: 'Mia Neshin' },
          { code: 'NESH', name: 'Nesh' },
          { code: 'REG', name: 'Reg' }
        ]
      },
      { code: 'MAZ', name: 'Mazar-i-Sharif',
        cities: [
          { code: 'MAZAR', name: 'Mazar-i-Sharif' },
          { code: 'BALKH', name: 'Balkh' },
          { code: 'CHAHAR', name: 'Chahar Bolak' },
          { code: 'DASH', name: 'Dash Mardan' },
          { code: 'DOST', name: 'Dost' },
          { code: 'KHULM', name: 'Khulm' },
          { code: 'KISHM', name: 'Kishm' },
          { code: 'MARDYAN', name: 'Mardyan' },
          { code: 'NAMAK', name: 'Namak Ab' },
          { code: 'SHOR', name: 'Shor Tapa' }
        ]
      },
      { code: 'NAN', name: 'Nangarhar',
        cities: [
          { code: 'JALALABAD', name: 'Jalalabad' },
          { code: 'ACHIN', name: 'Achin' },
          { code: 'BARKI', name: 'Barki Barak' },
          { code: 'BATI', name: 'Bati Kot' },
          { code: 'DEH', name: 'Deh Bala' },
          { code: 'DUR', name: 'Dur Baba' },
          { code: 'GOSHTA', name: 'Goshta' },
          { code: 'KAMA', name: 'Kama' },
          { code: 'KHUD', name: 'Khugyani' },
          { code: 'KOT', name: 'Kot' }
        ]
      },
      { code: 'PAN', name: 'Paktia',
        cities: [
          { code: 'GARDEZ', name: 'Gardez' },
          { code: 'AHMAD', name: 'Ahmad Abad' },
          { code: 'ALI', name: 'Ali Shing' },
          { code: 'CHAMKANI', name: 'Chamkani' },
          { code: 'DAND', name: 'Dand Wa Patan' },
          { code: 'JANI', name: 'Jani Khel' },
          { code: 'LAZA', name: 'Laza Ahmad Khel' },
          { code: 'MIR', name: 'Mir Zamin' },
          { code: 'SAYED', name: 'Sayed Karam' },
          { code: 'SHAR', name: 'Sharana' }
        ]
      },
      { code: 'PKT', name: 'Paktika',
        cities: [
          { code: 'SHARAN', name: 'Sharan' },
          { code: 'ARGO', name: 'Argo' },
          { code: 'BARMAL', name: 'Barmal' },
          { code: 'GAYAN', name: 'Gayan' },
          { code: 'JANIKHEL', name: 'Janikhel' },
          { code: 'MATA', name: 'Mata Khan' },
          { code: 'NAYAK', name: 'Nayak' },
          { code: 'OMNA', name: 'Omna' },
          { code: 'SAR', name: 'Sar Hawza' },
          { code: 'TANAI', name: 'Tanai' }
        ]
      },
      { code: 'KUN', name: 'Kunar',
        cities: [
          { code: 'ASADABAD', name: 'Asadabad' },
          { code: 'BAR', name: 'Bar Kunar' },
          { code: 'CHAPA', name: 'Chapa Dara' },
          { code: 'DANGAM', name: 'Dangam' },
          { code: 'GHAZI', name: 'Ghazi Abad' },
          { code: 'KAMA', name: 'Kama' },
          { code: 'MARAWARA', name: 'Marawara' },
          { code: 'NARAI', name: 'Narai' },
          { code: 'NUR', name: 'Nur Gul' },
          { code: 'SIRKAN', name: 'Sirkanay' }
        ]
      },
      { code: 'LAG', name: 'Laghman',
        cities: [
          { code: 'MEHTARLAM', name: 'Mehtarlam' },
          { code: 'ALINGAR', name: 'Alingar' },
          { code: 'ALISHING', name: 'Alishing' },
          { code: 'DAWLAT', name: 'Dawlat Shah' },
          { code: 'QARGHAYI', name: 'Qarghayi' },
          { code: 'QARGHAYI2', name: 'Qarghayi' },
          { code: 'QARGHAYI3', name: 'Qarghayi' },
          { code: 'QARGHAYI4', name: 'Qarghayi' },
          { code: 'QARGHAYI5', name: 'Qarghayi' },
          { code: 'QARGHAYI6', name: 'Qarghayi' }
        ]
      },
      { code: 'LOGAR', name: 'Logar',
        cities: [
          { code: 'PULI', name: 'Puli Alam' },
          { code: 'BARAKI', name: 'Baraki Barak' },
          { code: 'CHARKH', name: 'Charkh' },
          { code: 'KHI', name: 'Khi' },
          { code: 'KHOSHI', name: 'Khoshi' },
          { code: 'MOHAMMAD', name: 'Mohammad Agha' },
          { code: 'PULI2', name: 'Puli Alam' },
          { code: 'BARAKI2', name: 'Baraki Barak' },
          { code: 'CHARKH2', name: 'Charkh' },
          { code: 'KHI2', name: 'Khi' }
        ]
      },
      { code: 'NIM', name: 'Nimruz',
        cities: [
          { code: 'ZARANJ', name: 'Zaranj' },
          { code: 'CHAHAR', name: 'Chahar Burjak' },
          { code: 'CHAKANSUR', name: 'Chakhansur' },
          { code: 'KANG', name: 'Kang' },
          { code: 'KHASH', name: 'Khash Rod' },
          { code: 'SABZ', name: 'Sabz' },
          { code: 'ZARANJ2', name: 'Zaranj' },
          { code: 'CHAHAR2', name: 'Chahar Burjak' },
          { code: 'CHAKANSUR2', name: 'Chakhansur' },
          { code: 'KANG2', name: 'Kang' }
        ]
      },
      { code: 'NUR', name: 'Nuristan',
        cities: [
          { code: 'PARUN', name: 'Parun' },
          { code: 'BARGI', name: 'Bargi Matal' },
          { code: 'DO', name: 'Do Ab' },
          { code: 'KAMDESH', name: 'Kamdesh' },
          { code: 'MANDOL', name: 'Mandol' },
          { code: 'NUR', name: 'Nuristan' },
          { code: 'PARUN2', name: 'Parun' },
          { code: 'BARGI2', name: 'Bargi Matal' },
          { code: 'DO2', name: 'Do Ab' },
          { code: 'KAMDESH2', name: 'Kamdesh' }
        ]
      },
      { code: 'SAM', name: 'Samangan',
        cities: [
          { code: 'AYBAK', name: 'Aybak' },
          { code: 'DARA', name: 'Dara-i-Suf' },
          { code: 'FARKHAR', name: 'Farkhar' },
          { code: 'HAZARA', name: 'Hazara' },
          { code: 'KHUD', name: 'Khud Abad' },
          { code: 'RUY', name: 'Ruy Du Ab' },
          { code: 'TASH', name: 'Tash Gozar' },
          { code: 'AYBAK2', name: 'Aybak' },
          { code: 'DARA2', name: 'Dara-i-Suf' },
          { code: 'FARKHAR2', name: 'Farkhar' }
        ]
      },
      { code: 'TAK', name: 'Takhar',
        cities: [
          { code: 'TALOQAN', name: 'Taloqan' },
          { code: 'BANGI', name: 'Bangi' },
          { code: 'CHAH', name: 'Chah Ab' },
          { code: 'DASHT', name: 'Dasht-i-Qala' },
          { code: 'FARKHAR', name: 'Farkhar' },
          { code: 'ISHKASHIM', name: 'Ishkashim' },
          { code: 'KALAFGAN', name: 'Kalafgan' },
          { code: 'KHWAJA', name: 'Khwaja Bahauddin' },
          { code: 'NAMAK', name: 'Namak Ab' },
          { code: 'RUSTAQ', name: 'Rustaq' }
        ]
      },
      { code: 'URU', name: 'Uruzgan',
        cities: [
          { code: 'TARIN', name: 'Tarin Kowt' },
          { code: 'CHORA', name: 'Chora' },
          { code: 'DEH', name: 'Deh Rawod' },
          { code: 'GIZAB', name: 'Gizab' },
          { code: 'KHAS', name: 'Khas Uruzgan' },
          { code: 'SHAH', name: 'Shah Joy' },
          { code: 'TARIN2', name: 'Tarin Kowt' },
          { code: 'CHORA2', name: 'Chora' },
          { code: 'DEH2', name: 'Deh Rawod' },
          { code: 'GIZAB2', name: 'Gizab' }
        ]
      },
      { code: 'ZAB', name: 'Zabul',
        cities: [
          { code: 'QALAT', name: 'Qalat-i-Ghilzai' },
          { code: 'ARGHANDAB', name: 'Arghandab' },
          { code: 'ATGHAR', name: 'Atghar' },
          { code: 'DAY', name: 'Day Chopan' },
          { code: 'MIZAN', name: 'Mizan' },
          { code: 'QALAT', name: 'Qalat-i-Ghilzai' },
          { code: 'SHAH', name: 'Shah Joy' },
          { code: 'SHINKAY', name: 'Shinkay' },
          { code: 'TARN', name: 'Tarnak' },
          { code: 'WAGH', name: 'Wagh' }
        ]
      }
    ]
};
