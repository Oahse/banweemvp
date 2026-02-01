/**
 * Iran country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const iran: Country = {
    code: 'IR',
    name: 'Iran',
    taxInfo: { standardRate: 9, taxName: 'VAT', currency: 'IRR', region: 'MEA' },
    provinces: [
      { code: 'TEHRAN', name: 'Tehran',
        cities: [
          { code: 'TEHRAN', name: 'Tehran' },
          { code: 'MASHHAD', name: 'Mashhad' },
          { code: 'ISFAHAN', name: 'Isfahan' },
          { code: 'SHIRAZ', name: 'Shiraz' },
          { code: 'TABRIZ', name: 'Tabriz' },
          { code: 'KARAJ', name: 'Karaj' },
          { code: 'QOM', name: 'Qom' },
          { code: 'AHVAZ', name: 'Ahvaz' },
          { code: 'RASHT', name: 'Rasht' },
          { code: 'KISH', name: 'Kish' }
        ]
      },
      { code: 'ALBORZ', name: 'Alborz',
        cities: [
          { code: 'KARAJ', name: 'Karaj' },
          { code: 'TEHRAN', name: 'Tehran' },
          { code: 'MASHHAD', name: 'Mashhad' },
          { code: 'ISFAHAN', name: 'Isfahan' },
          { code: 'SHIRAZ', name: 'Shiraz' },
          { code: 'TABRIZ', name: 'Tabriz' },
          { code: 'QOM', name: 'Qom' },
          { code: 'AHVAZ', name: 'Ahvaz' },
          { code: 'RASHT', name: 'Rasht' },
          { code: 'KISH', name: 'Kish' }
        ]
      },
      { code: 'ARDAKAN', name: 'Ardakan',
        cities: [
          { code: 'ARDAKAN', name: 'Ardakan' },
          { code: 'SAVEH', name: 'Saveh' },
          { code: 'KHORRAM', name: 'Khorram' },
          { code: 'ABHAR', name: 'Abhar' },
          { code: 'KHANSAR', name: 'Khansar' },
          { code: 'KHOMEINI', name: 'Khomeini' },
          { code: 'RAZAN', name: 'Razan' },
          { code: 'SHEND', name: 'Shend' },
          { code: 'TAFT', name: 'Taft' },
          { code: 'ZARIN', name: 'Zarin' }
        ]
      },
      { code: 'EAST', name: 'East Azerbaijan',
        cities: [
          { code: 'TABRIZ', name: 'Tabriz' },
          { code: 'MARAGHEH', name: 'Maragheh' },
          { code: 'AHA', name: 'Ahar' },
          { code: 'JOLFA', name: 'Jolfa' },
          { code: 'MARAND', name: 'Marand' },
          { code: 'MIA', name: 'Mianeh' },
          { code: 'SARAB', name: 'Sarab' },
          { code: 'SHABESTAR', name: 'Shabestar' },
          { code: 'BOSTAN', name: 'Bostanabad' },
          { code: 'CHAROYMAQ', name: 'Charoymaq' }
        ]
      },
      { code: 'WEST', name: 'West Azerbaijan',
        cities: [
          { code: 'URMIA', name: 'Urmia' },
          { code: 'KHOT', name: 'Khoy' },
          { code: 'MAKU', name: 'Maku' },
          { code: 'MIANDOAB', name: 'Miandoab' },
          { code: 'NAQADEH', name: 'Naqadeh' },
          { code: 'PIRANSHAR', name: 'Piranshahr' },
          { code: 'SALMAS', name: 'Salmas' },
          { code: 'SHAHIN', name: 'Shahin Dezh' },
          { code: 'TAKAB', name: 'Takab' },
          { code: 'USHNU', name: 'Ushnu' }
        ]
      },
      { code: 'BUSHEHR', name: 'Bushehr',
        cities: [
          { code: 'BUSHEHR', name: 'Bushehr' },
          { code: 'BORAZJAN', name: 'Borazjan' },
          { code: 'DASHTI', name: 'Dashti' },
          { code: 'DASHTI2', name: 'Dashti' },
          { code: 'DEYLAM', name: 'Deylam' },
          { code: 'GANAVEH', name: 'Ganaveh' },
          { code: 'JAM', name: 'Jam' },
          { code: 'KANGAN', name: 'Kangan' },
          { code: 'TANGESTAN', name: 'Tangestan' },
          { code: 'ASALUYEH', name: 'Asaluyeh' }
        ]
      },
      { code: 'CHAHAR', name: 'Chahar',
        cities: [
          { code: 'SHAHR', name: 'Shahr-e Kord' },
          { code: 'ILAM', name: 'Ilam' },
          { code: 'DEHLORAN', name: 'Dehloran' },
          { code: 'MEHRAN', name: 'Mehran' },
          { code: 'SHIRVAN', name: 'Shirvan' },
          { code: 'SIRVAN', name: 'Sirvan' },
          { code: 'ZAHAB', name: 'Zahab' },
          { code: 'KHORRAM', name: 'Khorram' },
          { code: 'ABHAR', name: 'Abhar' },
          { code: 'KHANSAR', name: 'Khansar' }
        ]
      },
      { code: 'FARS', name: 'Fars',
        cities: [
          { code: 'SHIRAZ', name: 'Shiraz' },
          { code: 'MARVDASHT', name: 'Marvdasht' },
          { code: 'JAHROM', name: 'Jahrom' },
          { code: 'ESTAHBAN', name: 'Estahban' },
          { code: 'FARASHBAND', name: 'Farashband' },
          { code: 'GERASH', name: 'Gerash' },
          { code: 'KHAFAJ', name: 'Khafaj' },
          { code: 'LAR', name: 'Lar' },
          { code: 'LAMERD', name: 'Lamerd' },
          { code: 'SEPIDAN', name: 'Sepidan' }
        ]
      },
      { code: 'GILAN', name: 'Gilan',
        cities: [
          { code: 'RASHT', name: 'Rasht' },
          { code: 'BANDAR', name: 'Bandar-e Anzali' },
          { code: 'LAHIJAN', name: 'Lahijan' },
          { code: 'LANGUD', name: 'Langud' },
          { code: 'MANJIL', name: 'Manjil' },
          { code: 'ROUDSAR', name: 'Rudsar' },
          { code: 'SOWME', name: 'Sowme' },
          { code: 'TALES', name: 'Talesh' },
          { code: 'FUMAN', name: 'Fuman' },
          { code: 'MASAL', name: 'Masal' }
        ]
      },
      { code: 'GORGAN', name: 'Golestan',
        cities: [
          { code: 'GORGAN', name: 'Gorgan' },
          { code: 'GONBAD', name: 'Gonbad-e Kavus' },
          { code: 'BANDAR', name: 'Bandar-e Torkaman' },
          { code: 'ALI', name: 'Aliabad-e Katul' },
          { code: 'AZAD', name: 'Azadshahr' },
          { code: 'KORDKUY', name: 'Kordkuy' },
          { code: 'MARAVET', name: 'Maravet Tappeh' },
          { code: 'MINU', name: 'Minudasht' },
          { code: 'RAMIAN', name: 'Ramian' },
          { code: 'TORKAMAN', name: 'Torkaman' }
        ]
      },
      { code: 'HAMADAN', name: 'Hamadan',
        cities: [
          { code: 'HAMADAN', name: 'Hamadan' },
          { code: 'MALAYER', name: 'Malayer' },
          { code: 'NAHAVAND', name: 'Nahavand' },
          { code: 'TOYSEERKAN', name: 'Toyserkan' },
          { code: 'ASAD', name: 'Asadabad' },
          { code: 'BAHAR', name: 'Bahar' },
          { code: 'FAMENIN', name: 'Famenin' },
          { code: 'KABUDRA', name: 'Kabudrahang' },
          { code: 'RAZAN', name: 'Razan' },
          { code: 'SHIRIN', name: 'Shirin' }
        ]
      },
      { code: 'HORMOZGAN', name: 'Hormozgan',
        cities: [
          { code: 'BANDAR', name: 'Bandar Abbas' },
          { code: 'MINAB', name: 'Minab' },
          { code: 'BANDAR2', name: 'Bandar-e Emam' },
          { code: 'JASK', name: 'Jask' },
          { code: 'QESHM', name: 'Qeshm' },
          { code: 'HORMUZ', name: 'Hormuz' },
          { code: 'ABUMUSA', name: 'Abu Musa' },
          { code: 'HENGAM', name: 'Hengam' },
          { code: 'KHARG', name: 'Kharg' },
          { code: 'LAVAR', name: 'Lavar' }
        ]
      },
      { code: 'ILAM', name: 'Ilam',
        cities: [
          { code: 'ILAM', name: 'Ilam' },
          { code: 'MEHRAN', name: 'Mehran' },
          { code: 'DEHLORAN', name: 'Dehloran' },
          { code: 'SHIRVAN', name: 'Shirvan' },
          { code: 'SIRVAN', name: 'Sirvan' },
          { code: 'ZAHAB', name: 'Zahab' },
          { code: 'KHORRAM', name: 'Khorram' },
          { code: 'ABHAR', name: 'Abhar' },
          { code: 'KHANSAR', name: 'Khansar' },
          { code: 'KHOMEINI', name: 'Khomeini' }
        ]
      },
      { code: 'ISFAHAN', name: 'Isfahan',
        cities: [
          { code: 'ISFAHAN', name: 'Isfahan' },
          { code: 'KASHAN', name: 'Kashan' },
          { code: 'NAJAFABAD', name: 'Najafabad' },
          { code: 'MOBARAKEH', name: 'Mobarakkeh' },
          { code: 'FARIDAN', name: 'Faridan' },
          { code: 'SEMIROM', name: 'Semirom' },
          { code: 'ARDESTAN', name: 'Ardestan' },
          { code: 'BARKHAR', name: 'Barkhar' },
          { code: 'BIDJAND', name: 'Bidjand' },
          { code: 'GOLPAYEGAN', name: 'Golpayegan' }
        ]
      },
      { code: 'KERMAN', name: 'Kerman',
        cities: [
          { code: 'KERMAN', name: 'Kerman' },
          { code: 'BAFT', name: 'Baft' },
          { code: 'BAM', name: 'Bam' },
          { code: 'JIROFT', name: 'Jiroft' },
          { code: 'RAFSANJAN', name: 'Rafsanjan' },
          { code: 'SIRJAN', name: 'Sirjan' },
          { code: 'ZARAND', name: 'Zarand' },
          { code: 'BAHRAM', name: 'Bahraman' },
          { code: 'RAVAR', name: 'Ravar' },
          { code: 'KABOOT', name: 'Kabootaran' }
        ]
      },
      { code: 'KHOZESTAN', name: 'Khuzestan',
        cities: [
          { code: 'AHVAZ', name: 'Ahvaz' },
          { code: 'ABADAN', name: 'Abadan' },
          { code: 'KHOORRAMSHAHR', name: 'Khorramshahr' },
          { code: 'BEHBAHAN', name: 'Behbahan' },
          { code: 'DEZFUL', name: 'Dezful' },
          { code: 'IZEH', name: 'Izeh' },
          { code: 'MASJED', name: 'Masjed Soleyman' },
          { code: 'SHAD', name: 'Shadegan' },
          { code: 'SHUSH', name: 'Shush' },
          { code: 'ANDIMESHK', name: 'Andimeshk' }
        ]
      },
      { code: 'KOHGILUYEH', name: 'Kohgiluyeh',
        cities: [
          { code: 'YASUJ', name: 'Yasuj' },
          { code: 'DEHDASHT', name: 'Dehdasht' },
          { code: 'DOGONBADAN', name: 'Dogonbadan' },
          { code: 'LORDEGAN', name: 'Lordegan' },
          { code: 'BAHMA', name: 'Bahma' },
          { code: 'BOYER', name: 'Boyer-Ahmad' },
          { code: 'CHARAM', name: 'Charam' },
          { code: 'KOHGILUYEH', name: 'Kohgiluyeh' },
          { code: 'MARGOON', name: 'Margoon' },
          { code: 'SEPIDAN', name: 'Sepidan' }
        ]
      },
      { code: 'KURDISTAN', name: 'Kurdistan',
        cities: [
          { code: 'SANANDAJ', name: 'Sanandaj' },
          { code: 'MARIVAN', name: 'Marivan' },
          { code: 'BANEH', name: 'Baneh' },
          { code: 'QORVEH', name: 'Qorveh' },
          { code: 'SAQQEZ', name: 'Saqqez' },
          { code: 'SARVABAD', name: 'Sarvabad' },
          { code: 'DIVANDARREH', name: 'Divandarreh' },
          { code: 'KAMYARAN', name: 'Kamyaran' },
          { code: 'PIRANSHAR', name: 'Piranshahr' },
          { code: 'SARPOL', name: 'Sarpol-e Zahab' }
        ]
      },
      { code: 'LORESTAN', name: 'Lorestan',
        cities: [
          { code: 'KHORRAMABAD', name: 'Khorramabad' },
          { code: 'BORUJERD', name: 'Borujerd' },
          { code: 'ALIGUDARZ', name: 'Aligudarz' },
          { code: 'DORUD', name: 'Dorud' },
          { code: 'KOHRAM', name: 'Khorram' },
          { code: 'PAVEH', name: 'Paveh' },
          { code: 'POL', name: 'Pol-e Dokhtar' },
          { code: 'ALASHTAR', name: 'Alashtar' },
          { code: 'NOORABAD', name: 'Noorabad' },
          { code: 'SEPIDDASHT', name: 'Sepiddasht' }
        ]
      },
      { code: 'MARKAZI', name: 'Markazi',
        cities: [
          { code: 'ARAK', name: 'Arak' },
          { code: 'SAVEH', name: 'Saveh' },
          { code: 'KHOMEIN', name: 'Khomein' },
          { code: 'DELIJAN', name: 'Delijan' },
          { code: 'SALAFCHEGAN', name: 'Salafchegan' },
          { code: 'TAFRESH', name: 'Tafresh' ',
          { code: 'ASHTIAN', name: 'Ashtian' },
          { code: 'SHAZAND', name: 'Shazand' },
          { code: 'KHOMEIN2', name: 'Khomein' },
          { code: 'ARAK2', name: 'Arak' }
        ]
      },
      { code: 'MAZANDARAN', name: 'Mazandaran',
        cities: [
          { code: 'SARI', name: 'Sari' },
          { code: 'BABOL', name: 'Babol' },
          { code: 'AMOL', name: 'Amol' },
          { code: 'QAE', name: 'Qaem Shahr' },
          { code: 'BEHSHAHR', name: 'Behshahr' },
          { code: 'TONEKABON', name: 'Tonekabon' },
          { code: 'RAMSAR', name: 'Ramsar' },
          { code: 'NOUSHAR', name: 'Noshahr' },
          { code: 'JUYBAR', name: 'Juybar' },
          { code: 'KELAR', name: 'Kelarabad' }
        ]
      },
      { code: 'QAZVIN', name: 'Qazvin',
        cities: [
          { code: 'QAZVIN', name: 'Qazvin' },
          { code: 'TAKESTAN', name: 'Takestan' },
          { code: 'ABEY', name: 'Abyek' },
          {          { code: 'BOIN', name: 'Boin Zahra' },
          { code: 'BUIN', name: 'Buin Zahra' },
          { code: 'MOHAMMAD', name: 'Mohammadieh' },
          { code: 'ALAMUT', name: 'Alamut' },
          { code: 'AVAJ', name: 'Avaj' },
          { code: 'QAZVIN2', name: 'Qazvin' },
          { code: 'TAKESTAN2', name: 'Takestan' }
        ]
      },
      { code: 'QOM', name: 'Qom',
        cities: [
          { code: 'QOM', name: 'Qom' },
          { code: 'TEHRAN', name: 'Tehran' },
          { code: 'MASHHAD', name: 'Mashhad' },
          { code: 'ISFAHAN', name: 'Isfahan' },
          { code: 'SHIRAZ', name: 'Shiraz' },
          { code: 'TABRIZ', name: 'Tabriz' },
          { code: 'KARAJ', name: 'Karaj' },
          { code: 'AHVAZ', name: 'Ahvaz' },
          { code: 'RASHT', name: 'Rasht' },
          { code: 'KISH', name: 'Kish' }
        ]
      },
      { code: 'RAZAVI', name: 'Razavi Khorasan',
        cities: [
          { code: 'MASHHAD', name: 'Mashhad' },
          { code: 'NEISHABUR', name: 'Neishabur' },
          { code: 'SABZEVAR', name: 'Sabzevar' },
          { code: 'TORBAT', name: 'Torbat-e Heydarieh' },
          { code: 'GONABAD', name: 'Gonabad' },
          { code: 'BOJNURD', name: 'Bojnurd' },
          { code: 'BIRJAND', name: 'Birjand' },
          { code: 'FARIMAN', name: 'Fariman' },
          { code: 'KASHMAR', name: 'Kashmar' },
          { code: 'TAHBAD', name: 'Tabad' }
        ]
      },
      { code: 'SEMNAN', name: 'Semnan',
        cities: [
          { code: 'SEMNAN', name: 'Semnan' },
          { code: 'DAMGHAN', name: 'Damghan' },
          { code: 'GARMSAR', name: 'Garmsar' },
          { code: 'SHAHROUD', name: 'Shahroud' },
          { code: 'MEHDI', name: 'Mehdishahr' },
          { code: 'SORKHE', name: 'Sorkheh' },
          { code: 'BIARJMAND', name: 'Biarjmand' },
          { code: 'JAJARM', name: 'Jajarm' },
          { code: 'MEYAMI', name: 'Meyami' },
          { code: 'SHAHROUD2', name: 'Shahroud' }
        ]
      },
      { code: 'SISTAN', name: 'Sistan and Baluchestan',
        cities: [
          { code: 'ZAHEDAN', name: 'Zahedan' },
          { code: 'ZABOL', name: 'Zabol' },
          {code: 'IRANSHAHR', name: 'Iran Shahr' },
          { code: 'KHASH', name: 'Khash' },
          { code: 'ZABOL2', name: 'Zabol' },
          { code: 'IRANSHAHR2', name: 'Iran Shahr' },
          { code: 'KHASH2', name: 'Khash' },
          { code: 'ZABOL3', name: 'Zabol' },
          { code: 'IRANSHAHR3', name: ' 'Iran Shahr' },
          { code: 'KHASH3', name: 'Khash' }
        ]
      },
      { code: 'TEHRAN', name: 'Tehran',
        cities: [
          { code: 'TEHRAN', name: 'Tehran' },
          { code: 'MASHHAD', name: 'Mashhad' },
          { code: 'ISFAHAN', name: 'Isfahan' },
          { code: 'SHIRAZ', name: 'Shiraz' },
          { code: 'TABRIZ', name: 'Tabriz' },
          { code: 'KARAJ', name: 'Karaj' },
          { code: 'QOM', name: 'Qom' },
          { code: 'AHVAZ', name: 'Ahvaz' },
          { code: 'RASHT', name: 'Rasht' },
          { code: 'KISH', name: 'Kish' }
        ]
      },
      { code: 'WEST', name: 'West Azerbaijan',
        cities: [
          { code: 'URMIA', name: 'Urmia' },
          { code: 'KHOT', name: 'Khoy' },
          { code: 'MAKU', name: 'Maku' },
          { code: 'MIANDOAB', name: 'Miandoab' },
          { code: 'NAQADEH', name: 'Naqadeh' },
          { code: 'PIRANSHAR', name: 'Piranshahr' },
          { code: 'SALMAS', name: 'Salmas' },
          { code: 'SHAHIN', name: 'Shahin Dezh' },
          { code: 'TAKAB', name: 'Takab' },
          { code: 'USHNU', name: 'Ushnu' }
        ]
      },
      { code: 'YAZD', name: 'Yazd',
        cities: [
          { code: 'YAZD', name: 'Yazd' },
          { code: 'MEHRIZ', name: 'Mehriz' },
          { code: 'ARDAKAN', name: 'Ardakan' },
          { code: 'BAFQ', name: 'Bafq' },
          { code: 'TABAS', name: 'Tabas' },
          {           { code: 'KHATAM', name: 'Khatam' },
          { code: 'MEHABAD', name: 'Mehabad' },
          { code: 'TAFT', name: 'Taft' },
          { code: 'ZARIN', name: 'Zarin' },
          { code: 'YAZD2', name: 'Yazd' }
        ]
        ]
      },
      { code: 'ZANJAN', name: 'Zanjan',
        cities: [
          { code: 'ZANJAN', name: 'Zanjan' },
          { code: 'ABHAR', name: 'Abhar' },
          { code: 'KHODABANDEH', name: 'Khodabandeh' },
          { code: 'KHORRAM', name: 'Khorram' },
          { code: 'IJROOD', name: 'Ijrood' },
          { code: 'KHOJAND', name: 'Khojand' },
          { code: 'ZARRIN', name: 'Zarrin' },
          { code: 'MAH', name: 'Mah Neshan' },
          { code: 'ZANJAN2', name: 'Zanjan' },
          { code: 'ABHAR2', name: 'Abhar' }
        ]
      }
    ]
};
