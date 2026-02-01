/**
 * Afghanistan country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const afghanistan: Country = {
  code: 'AF',
  name: 'Afghanistan',
  taxInfo: { standardRate: 0, taxName: 'No VAT/GST', currency: 'AFN', region: 'APAC' },
  provinces: [
    { code: 'KAB', name: 'Kabul',
      cities: [
        { code: 'KABUL', name: 'Kabul' },
        { code: 'CHARASIAB', name: 'Charasiab' },
        { code: 'PAGHMAN', name: 'Paghman' },
        { code: 'BAGRAMI', name: 'Bagrami' },
        { code: 'SROB', name: 'Surobi' },
        { code: 'MUSA', name: 'Musa Khel' },
        { code: 'DEH', name: 'Deh Sabz' },
        { code: 'ISTALIF', name: 'Istalif' },
        { code: 'SHAKAR', name: 'Shakar Dara' },
        { code: 'GULDARA', name: 'Guldara' }
      ]
    },
    { code: 'HER', name: 'Herat',
      cities: [
        { code: 'HERAT', name: 'Herat' },
        { code: 'ENJIL', name: 'Enjil' },
        { code: 'GHORIAN', name: 'Ghoryan' },
        { code: 'GULRAN', name: 'Gulran' },
        { code: 'KARUKH', name: 'Karukh' },
        { code: 'KUSHK', name: 'Kushk' },
        { code: 'KUSHKAK', name: 'Kushkak' },
        { code: 'SHINDAND', name: 'Shindand' },
        { code: 'ADRESKAN', name: 'Adraskan' },
        { code: 'CHIST', name: 'Chishti Sharif' }
      ]
    },
    { code: 'KAN', name: 'Kandahar',
      cities: [
        { code: 'KANDAHAR', name: 'Kandahar' },
        { code: 'ARGHANDAB', name: 'Arghandab' },
        { code: 'ARGHISTAN', name: 'Arghistan' },
        { code: 'DAMAN', name: 'Daman' },
        { code: 'GRISHK', name: 'Grishk' },
        { code: 'KANDAHAR2', name: 'Kandahar City' },
        { code: 'KHAKREZ', name: 'Khakrez' },
        { code: 'MARUF', name: 'Maruf' },
        { code: 'MAYWAND', name: 'Maywand' },
        { code: 'NESH', name: 'Nesh' }
      ]
    },
    { code: 'NAN', name: 'Nangarhar',
      cities: [
        { code: 'JALALABAD', name: 'Jalalabad' },
        { code: 'ACHIN', name: 'Achin' },
        { code: 'BATIKOT', name: 'Batikot' },
        { code: 'BHSUD', name: 'Bhsud' },
        { code: 'DEH', name: 'Deh Bala' },
        { code: 'DUR', name: 'Dur Baba' },
        { code: 'GOSHTA', name: 'Goshta' },
        { code: 'KAMA', name: 'Kama' },
        { code: 'KUZ', name: 'Kuz Kunar' },
        { code: 'LALPURA', name: 'Lalpura' }
      ]
    },
    { code: 'BAG', name: 'Baghlan',
      cities: [
        { code: 'PULI', name: 'Puli Khumri' },
        { code: 'BAGHLAN', name: 'Baghlan' },
        { code: 'BURKA', name: 'Burka' },
        { code: 'DAND', name: 'Dand-e Ghori' },
        { code: 'DAN', name: 'Dana' },
        { code: 'DIH', name: 'Dih Salah' },
        { code: 'FARANG', name: 'Farang wa Gharu' },
        { code: 'GOST', name: 'Gost' },
        { code: 'KHANJAN', name: 'Khanjan' },
        { code: 'KHINJAN', name: 'Khinjan' }
      ]
    },
    { code: 'BAL', name: 'Balkh',
      cities: [
        { code: 'MAZAR', name: 'Mazar-i-Sharif' },
        { code: 'BALKH', name: 'Balkh' },
        { code: 'CHAHAR', name: 'Chahar Bolak' },
        { code: 'CHARKENT', name: 'Charkent' },
        { code: 'DADAY', name: 'Daday' },
        { code: 'KALDAR', name: 'Kaldar' },
        { code: 'KISHM', name: 'Kishm' },
        { code: 'KOHDAN', name: 'Kohdan' },
        { code: 'MAI', name: 'Maimana' },
        { code: 'NAMAK', name: 'Namak Ab' }
      ]
    },
    { code: 'BAM', name: 'Bamyan',
      cities: [
        { code: 'BAMYAN', name: 'Bamyan' },
        { code: 'BAMYAN2', name: 'Bamyan City' },
        { code: 'KABUL2', name: 'Kabul' },
        { code: 'KAHMARD', name: 'Kahmard' },
        { code: 'PANJAB', name: 'Panjab' },
        { code: 'SAIGHAN', name: 'Saighan' },
        { code: 'SHIBAR', name: 'Shibar' },
        { code: 'WARAS', name: 'Waras' },
        { code: 'YAKAWLANG', name: 'Yakawlang' },
        { code: 'BAND', name: 'Band-e Amir' }
      ]
    },
    { code: 'DAI', name: 'Daykundi',
      cities: [
        { code: 'NILI', name: 'Nili' },
        { code: 'ASHTAR', name: 'Ashtarlay' },
        { code: 'JABR', name: 'Jabr' },
        { code: 'KHA', name: 'Khadir' },
        { code: 'KEJ', name: 'Kejran' },
        { code: 'KITI', name: 'Kitti' },
        { code: 'MIRAMOR', name: 'Miramor' },
        { code: 'SANG', name: 'Sangtakht' },
        { code: 'SHAH', name: 'Shahristan' },
        { code: 'UNGOOR', name: 'Ungo' }
      ]
    },
    { code: 'FAR', name: 'Farah',
      cities: [
        { code: 'FARAH', name: 'Farah' },
        { code: 'ANAR', name: 'Anar Darah' },
        { code: 'BALA', name: 'Bala Buluk' },
        { code: 'BOK', name: 'Bokh' },
        { code: 'GULISTAN', name: 'Gulistan' },
        { code: 'KHAK', name: 'Khak Safed' },
        { code: 'PUR', name: 'Pur Chaman' },
        { code: 'PUSHT', name: 'Pusht Rod' },
        { code: 'QALA', name: 'Qala Kah' },
        { code: 'SHIB', name: 'Shib Koh' }
      ]
    },
    { code: 'FARY', name: 'Faryab',
      cities: [
        { code: 'MAIMANA', name: 'Maimana' },
        { code: 'ALMAR', name: 'Almar' },
        { code: 'ANDKH', name: 'Andkhoy' },
        { code: 'DARZAB', name: 'Darzab' },
        { code: 'GURZIWAN', name: 'Gurziwan' },
        { code: 'KHWAJA', name: 'Khwaja Sabz Posh' },
        { code: 'KOHISTAN', name: 'Kohistan' },
        { code: 'MAYMANA', name: 'Maymana' },
        { code: 'QARAM', name: 'Qaramqol' },
        { code: 'QAYSAR', name: 'Qaysar' }
      ]
    },
    { code: 'GHA', name: 'Ghazni',
      cities: [
        { code: 'GHAZNI', name: 'Ghazni' },
        { code: 'AB', name: 'Ab Band' },
        { code: 'AJRISTAN', name: 'Ajeristan' },
        { code: 'ANDAR', name: 'Andar' },
        { code: 'DEH', name: 'Deh Yak' },
        { code: 'GELAN', name: 'Gelan' },
        { code: 'GHO', name: 'Ghakhi' },
        { code: 'JAGHATU', name: 'Jaghatu' },
        { code: 'JAGHORI', name: 'Jaghori' },
        { code: 'KHOGYANI', name: 'Khogyani' }
      ]
    },
    { code: 'GHO', name: 'Ghor',
      cities: [
        { code: 'CHAGHCHARAN', name: 'Chaghcharan' },
        { code: 'CHAGHCHARAN2', name: 'Chaghcharan City' },
        { code: 'DOLINA', name: 'Dolina' },
        { code: 'DU', name: 'Du Layna' },
        { code: 'LAL', name: 'Lal Wa Sarjangal' },
        { code: 'PASSA', name: 'Passa' },
        { code: 'SAGHAR', name: 'Saghar' },
        { code: 'SHARAK', name: 'Sharak' },
        { code: 'TAKHAR', name: 'Takhar' },
        { code: 'TULAK', name: 'Tulak' }
      ]
    },
    { code: 'HEL', name: 'Helmand',
      cities: [
        { code: 'LASHKAR', name: 'Lashkar Gah' },
        { code: 'BAGHRAN', name: 'Baghran' },
        { code: 'DISHU', name: 'Dishu' },
        { code: 'GARM', name: 'Garmsir' },
        { code: 'GRISHK', name: 'Grishk' },
        { code: 'KHAH', name: 'Kahak' },
        { code: 'MUSA', name: 'Musa Qala' },
        { code: 'NAD', name: 'Nad Ali' },
        { code: 'NAVA', name: 'Nawa' },
        { code: 'SANGIN', name: 'Sangin' }
      ]
    },
    { code: 'HIL', name: 'Hilmand',
      cities: [
        { code: 'LASHKAR', name: 'Lashkar Gah' },
        { code: 'NAWA', name: 'Nawa' },
        { code: 'SANGIN', name: 'Sangin' },
        { code: 'MUSA', name: 'Musa Qala' },
        { code: 'GARM', name: 'Garmsir' },
        { code: 'GRISHK', name: 'Grishk' },
        { code: 'BAGHRAN', name: 'Baghran' },
        { code: 'DISHU', name: 'Dishu' },
        { code: 'KHAH', name: 'Kahak' },
        { code: 'NAD', name: 'Nad Ali' }
      ]
    },
    { code: 'JOW', name: 'Jowzjan',
      cities: [
        { code: 'SHEBERGHAN', name: 'Sheberghan' },
        { code: 'AQCHA', name: 'Aqcha' },
        { code: 'DARZAB', name: 'Darzab' },
        { code: 'FAIZ', name: 'Faizabad' },
        { code: 'KHAN', name: 'Khan Abad' },
        { code: 'KHWAJA', name: 'Khwaja Du Koh' },
        { code: 'MARDYAN', name: 'Mardyan' },
        { code: 'QUSH', name: 'Qush Tepa' },
        { code: 'SHEBERGHAN2', name: 'Sheberghan City' },
        { code: 'MANGAN', name: 'Mangan' }
      ]
    },
    { code: 'KAP', name: 'Kapisa',
      cities: [
        { code: 'MAHMUD', name: 'Mahmud-i-Raqi' },
        { code: 'ALASAI', name: 'Alasai' },
        { code: 'HESA', name: 'Hesa Awal Kohistan' },
        { code: 'KOH', name: 'Koh Band' },
        { code: 'MAHMUD', name: 'Mahmud Raqi' },
        { code: 'NIDJAB', name: 'Nijrab' },
        { code: 'TAGAB', name: 'Tagab' },
        { code: 'KOHISTAN', name: 'Kohistan' },
        { code: 'KOH', name: 'Koh' },
        { code: 'ALASAI2', name: 'Alasai' }
      ]
    },
    { code: 'KHO', name: 'Khost',
      cities: [
        { code: 'KHOST', name: 'Khost' },
        { code: 'BAK', name: 'Bak' },
        { code: 'GUR', name: 'Gurbuz' },
        { code: 'JERI', name: 'Jaji Maidan' },
        { code: 'KHOST2', name: 'Khost City' },
        { code: 'MUSA', name: 'Musa Khel' },
        { code: 'NADIR', name: 'Nadir Shah Kot' },
        { code: 'QALANDER', name: 'Qalandar' },
        { code: 'SABARI', name: 'Sabari' },
        { code: 'SPERA', name: 'Spera' }
      ]
    },
    { code: 'KUN', name: 'Kunar',
      cities: [
        { code: 'ASADABAD', name: 'Asadabad' },
        { code: 'BAR', name: 'Bar Kunar' },
        { code: 'CHAPA', name: 'Chapa Dara' },
        { code: 'DAR', name: 'Dara-i-Pech' },
        { code: 'GHAS', name: 'Ghasa' },
        { code: 'KAMA', name: 'Kama' },
        { code: 'KUNAR', name: 'Kunar' },
        { code: 'MARAWARA', name: 'Marawara' },
        { code: 'NARAI', name: 'Narai' },
        { code: 'NARANG', name: 'Narang' }
      ]
    },
    { code: 'KUN2', name: 'Kunduz',
      cities: [
        { code: 'KUNDUZ', name: 'Kunduz' },
        { code: 'ALI', name: 'Ali Abad' },
        { code: 'CHAHAR', name: 'Chahar Darreh' },
        { code: 'DASHT', name: 'Dashti Archi' },
        { code: 'EMAM', name: 'Emam Sahib' },
        { code: 'KHAN', name: 'Khan Abad' },
        { code: 'KUNDUZ2', name: 'Kunduz City' },
        { code: 'QALA', name: 'Qala-i-Zal' },
        { code: 'TEP', name: 'Tepa' },
        { code: 'ZAR', name: 'Zar' }
      ]
    },
    { code: 'LAG', name: 'Laghman',
      cities: [
        { code: 'MEHTAR', name: 'Mehtar Lam' },
        { code: 'ALINGAR', name: 'Alingar' },
        { code: 'ALISHING', name: 'Alishing' },
        { code: 'DAWLAT', name: 'Dawlat Shah' },
        { code: 'MEHTAR', name: 'Mehtar Lam City' },
        { code: 'QARGHAYI', name: 'Qarghayi' },
        { code: 'SAID', name: 'Said Karam' },
        { code: 'ALISHING2', name: 'Alishing' },
        { code: 'DAWLAT2', name: 'Dawlat Shah' },
        { code: 'QARGHAYI2', name: 'Qarghayi' }
      ]
    },
    { code: 'LOG', name: 'Logar',
      cities: [
        { code: 'PULI', name: 'Puli Alam' },
        { code: 'BARAKI', name: 'Baraki Barak' },
        { code: 'CHARKH', name: 'Charkh' },
        { code: 'KHI', name: 'Khoshi' },
        { code: 'KHWAS', name: 'Khwash' },
        { code: 'MUHAMMAD', name: 'Muhammad Agha' },
        { code: 'PULI', name: 'Puli Alam City' },
        { code: 'AZRA', name: 'Azra' },
        { code: 'BARAKI2', name: 'Baraki Barak' },
        { code: 'CHARKH2', name: 'Charkh' }
      ]
    },
    { code: 'NAN2', name: 'Nangrahar',
      cities: [
        { code: 'JALALABAD', name: 'Jalalabad' },
        { code: 'ACHIN', name: 'Achin' },
        { code: 'BATIKOT', name: 'Batikot' },
        { code: 'BHSUD', name: 'Bhsud' },
        { code: 'DEH', name: 'Deh Bala' },
        { code: 'DUR', name: 'Dur Baba' },
        { code: 'GOSHTA', name: 'Goshta' },
        { code: 'KAMA', name: 'Kama' },
        { code: 'KUZ', name: 'Kuz Kunar' },
        { code: 'LALPURA', name: 'Lalpura' }
      ]
    },
    { code: 'NIM', name: 'Nimruz',
      cities: [
        { code: 'ZARANJ', name: 'Zaranj' },
        { code: 'CHAHAR', name: 'Chahar Burjak' },
        { code: 'CHAKANSUR', name: 'Chakhansur' },
        { code: 'KHASH', name: 'Khash Rod' },
        { code: 'KANG', name: 'Kang' },
        { code: 'ZARANJ2', name: 'Zaranj City' },
        { code: 'CHAHAR2', name: 'Chahar Burjak' },
        { code: 'CHAKANSUR2', name: 'Chakhansur' },
        { code: 'KHASH2', name: 'Khash Rod' },
        { code: 'KANG2', name: 'Kang' }
      ]
    },
    { code: 'NUR', name: 'Nuristan',
      cities: [
        { code: 'PARUN', name: 'Parun' },
        { code: 'BAR', name: 'Bar Kunar' },
        { code: 'DU', name: 'Du Ab' },
        { code: 'KAMDESH', name: 'Kamdesh' },
        { code: 'MANDOL', name: 'Mandol' },
        { code: 'NURISTAN', name: 'Nuristan' },
        { code: 'PARUN2', name: 'Parun City' },
        { code: 'WAMA', name: 'Wama' },
        { code: 'WAYGAL', name: 'Waygal' },
        { code: 'BARGI', name: 'Bargi Matal' }
      ]
    },
    { code: 'PAN', name: 'Panjshir',
      cities: [
        { code: 'BASARAK', name: 'Bazarak' },
        { code: 'ANABAH', name: 'Anabah' },
        { code: 'BASARAK2', name: 'Bazarak City' },
        { code: 'DARA', name: 'Dara' },
        { code: 'KHENJ', name: 'Khenj' },
        { code: 'PANJSHIR', name: 'Panjshir' },
        { code: 'RUKHA', name: 'Rukha' },
        { code: 'SHUTUL', name: 'Shutul' },
        { code: 'UNABAH', name: 'Unabah' },
        { code: 'PANJSHIR2', name: 'Panjshir City' }
      ]
    },
    { code: 'PAR', name: 'Parwan',
      cities: [
        { code: 'CHARIKAR', name: 'Charikar' },
        { code: 'BAHI', name: 'Bahi' },
        { code: 'CHARIKAR2', name: 'Charikar City' },
        { code: 'GUL', name: 'Gulbahar' },
        { code: 'JABAL', name: 'Jabal Saraj' },
        { code: 'SALANG', name: 'Salang' },
        { code: 'SAYED', name: 'Sayed Khel' },
        { code: 'SHEIKH', name: 'Sheikh Ali' },
        { code: 'SURHI', name: 'Surhi Parsa' },
        { code: 'CHARIKAR3', name: 'Charikar' }
      ]
    },
    { code: 'SAM', name: 'Samangan',
      cities: [
        { code: 'AYBAK', name: 'Aybak' },
        { code: 'AIBAK', name: 'Aibak' },
        { code: 'DARA', name: 'Dara-i-Suf' },
        { code: 'FEROZ', name: 'Feroz Nakhchir' },
        { code: 'HAZAR', name: 'Hazar Sumuch' },
        { code: 'KHULM', name: 'Khulm' },
        { code: 'RUYI', name: 'Ruyi Du Ab' },
        { code: 'SAMANGAN', name: 'Samangan' },
        { code: 'TAKHT', name: 'Takhar' },
        { code: 'AYBAK2', name: 'Aybak City' }
      ]
    },
    { code: 'SAR', name: 'Sar-e Pul',
      cities: [
        { code: 'SAR', name: 'Sar-e Pul' },
        { code: 'BALKHAB', name: 'Balkhab' },
        { code: 'GOZARGAH', name: 'Gozargah' },
        { code: 'GOSHTA', name: 'Goshta' },
        { code: 'KOHISTAN', name: 'Kohistan' },
        { code: 'SANG', name: 'Sangcharak' },
        { code: 'SAR2', name: 'Sar-e Pul City' },
        { code: 'SOZMA', name: 'Sozma Qala' },
        { code: 'BALKHAB2', name: 'Balkhab' },
        { code: 'GOZARGAH2', name: 'Gozargah' }
      ]
    },
    { code: 'TAK', name: 'Takhar',
      cities: [
        { code: 'TALEQAN', name: 'Taluqan' },
        { code: 'BANGI', name: 'Bangi' },
        { code: 'CHAH', name: 'Chah Ab' },
        { code: 'DARQAD', name: 'Darqad' },
        { code: 'DASHT', name: 'Dashti Qala' },
        { code: 'FARKHAR', name: 'Farkhar' },
        { code: 'ISHKASHIM', name: 'Ishkashim' },
        { code: 'KALAFGAN', name: 'Kalafgan' },
        { code: 'KHWAJA', name: 'Khwaja Ghar' },
        { code: 'NAMAK', name: 'Namak Ab' }
      ]
    },
    { code: 'URU', name: 'Uruzgan',
      cities: [
        { code: 'TARIN', name: 'Tarin Kowt' },
        { code: 'CHORA', name: 'Chora' },
        { code: 'DEH', name: 'Deh Rawod' },
        { code: 'GIZAB', name: 'Gizab' },
        { code: 'KHAS', name: 'Khas Uruzgan' },
        { code: 'SHAH', name: 'Shahidi Hassas' },
        { code: 'TARIN2', name: 'Tarin Kowt City' },
        { code: 'CHORA2', name: 'Chora' },
        { code: 'DEH2', name: 'Deh Rawod' },
        { code: 'GIZAB2', name: 'Gizab' }
      ]
    },
    { code: 'WAR', name: 'Wardak',
      cities: [
        { code: 'MEIDAN', name: 'Maidan Shahr' },
        { code: 'CHAK', name: 'Chak' },
        { code: 'DAIMIR', name: 'Daimir' },
        { code: 'GELAN', name: 'Gelan' },
        { code: 'HISAR', name: 'Hisar-e-Shahi' },
        { code: 'JALREZ', name: 'Jalrez' },
        { code: 'MARKA', name: 'Marka' },
        { code: 'NARKH', name: 'Narkh' },
        { code: 'SAYED', name: 'Sayed Abad' },
        { code: 'MEIDAN2', name: 'Maidan Shahr City' }
      ]
    },
    { code: 'ZAB', name: 'Zabul',
      cities: [
        { code: 'QALAT', name: 'Qalat' },
        { code: 'ARGHANDAB', name: 'Arghandab' },
        { code: 'ATGHAR', name: 'Atghar' },
        { code: 'DAIMIR', name: 'Daimir' },
        { code: 'MIZAN', name: 'Mizan' },
        { code: 'NAWA', name: 'Nawa' },
        { code: 'QALAT2', name: 'Qalat City' },
        { code: 'SHAHJOY', name: 'Shahjoy' },
        { code: 'SHIN', name: 'Shin' },
        { code: 'TARN', name: 'Tarnak Wa Jaldak' }
      ]
    }
  ]
};

export default afghanistan;
