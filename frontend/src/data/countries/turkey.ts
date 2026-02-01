/**
 * Turkey country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const turkey: Country = {
    code: 'TR',
    name: 'Turkey',
    taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'TRY', region: 'EU' },
    provinces: [
      { code: 'IST', name: 'Istanbul',
        cities: [
          { code: 'ISTANBUL', name: 'Istanbul' },
          { code: 'KADIKOY', name: 'Kadikoy' },
          { code: 'BEYKOZ', name: 'Beykoz' },
          { code: 'SARIYER', name: 'Sariyer' },
          { code: 'SISLI', name: 'Sisli' },
          { code: 'BESIKTAS', name: 'Besiktas' },
          { code: 'FATIH', name: 'Fatih' },
          { code: 'EYUP', name: 'Eyup' },
          { code: 'USKUDAR', name: 'Uskudar' },
          { code: 'BAKIRKOY', name: 'Bakirkoy' }
        ]
      },
      { code: 'ANK', name: 'Ankara',
        cities: [
          { code: 'ANKARA', name: 'Ankara' },
          { code: 'CANKAYA', name: 'Cankaya' },
          { code: 'KECIOREN', name: 'Kecioren' },
          { code: 'YENIMAHALLE', name: 'Yenimahalle' },
          { code: 'MAMAK', name: 'Mamak' },
          { code: 'SINCAN', name: 'Sincan' },
          { code: 'ALTINDAG', name: 'Altindag' },
          { code: 'ETIMESGUT', name: 'Etimesgut' },
          { code: 'PURSAKLAR', name: 'Pursaklar' },
          { code: 'GOLBASI', name: 'Golbasi' }
        ]
      },
      { code: 'IZM', name: 'Izmir',
        cities: [
          { code: 'IZMIR', name: 'Izmir' },
          { code: 'KARSIYAKA', name: 'Karsiyaka' },
          { code: 'BORN', name: 'Bornova' },
          { code: 'BUCA', name: 'Buca' },
          { code: 'KONAK', name: 'Konak' },
          { code: 'ALIAGA', name: 'Aliaga' },
          { code: 'MENDERES', name: 'Menderes' },
          { code: 'MENEMEN', name: 'Menemen' },
          { code: 'SEFERIHISAR', name: 'Seferihisar' },
          { code: 'URLA', name: 'Urla' }
        ]
      },
      { code: 'BUR', name: 'Bursa',
        cities: [
          { code: 'BURSA', name: 'Bursa' },
          { code: 'NILUFER', name: 'Nilufer' },
          { code: 'OSMANGAZI', name: 'Osmangazi' },
          { code: 'YILDIRIM', name: 'Yildirim' },
          { code: 'KARACABEY', name: 'Karacabey' },
          { code: 'INEGOL', name: 'Inegol' },
          { code: 'MUSTAFAKEMALPASA', name: 'Mustafakemalpasa' },
          { code: 'GEMLIK', name: 'Gemlik' },
          { code: 'KELES', name: 'Keles' },
          { code: 'ORHANGAZI', name: 'Orhangazi' }
        ]
      },
      { code: 'ANT', name: 'Antalya',
        cities: [
          { code: 'ANTALYA', name: 'Antalya' },
          { code: 'MURATPASA', name: 'Muratpasa' },
          { code: 'KONYAALTI', name: 'Konyaalti' },
          { code: 'AKSU', name: 'Aksu' },
          { code: 'SERIK', name: 'Serik' },
          { code: 'KUMLUCA', name: 'Kumluca' },
          { code: 'FINIKE', name: 'Finike' },
          { code: 'ELMALI', name: 'Elmali' },
          { code: 'KAŞ', name: 'Kas' },
          { code: 'KEMER', name: 'Kemer' }
        ]
      },
      { code: 'ADA', name: 'Adana',
        cities: [
          { code: 'ADANA', name: 'Adana' },
          { code: 'SEYHAN', name: 'Seyhan' },
          { code: 'YUREGIR', name: 'Yuregir' },
          { code: 'KOZAN', name: 'Kozan' },
          { code: 'CEYHAN', name: 'Ceyhan' },
          { code: 'FEKE', name: 'Feke' },
          { code: 'KARaisal', name: 'Karaisal' },
          { code: 'POZANTI', name: 'Pozanti' },
          { code: 'SAIMBEYLI', name: 'Saimbeyli' },
          { code: 'TUFANBEYLI', name: 'Tufanbeyli' }
        ]
      },
      { code: 'SAN', name: 'Sanliurfa',
        cities: [
          { code: 'SANLIURFA', name: 'Sanliurfa' },
          { code: 'EYYUBIYE', name: 'Eyyubiye' },
          { code: 'HALILIYE', name: 'Haliliye' },
          { code: 'KARAKOPRU', name: 'Karakopru' },
          { code: 'VIRANSEHIR', name: 'Viransehir' },
          { code: 'SIVEREK', name: 'Siverek' },
          { code: 'BOZOVA', name: 'Bozova' },
          { code: 'HARRAN', name: 'Harran' },
          { code: 'SURUC', name: 'Suruc' },
          { code: 'AKCAKALE', name: 'Akcakale' }
        ]
      },
      { code: 'GAZ', name: 'Gaziantep',
        cities: [
          { code: 'GAZIANTEP', name: 'Gaziantep' },
          { code: 'SAHINBEY', name: 'Sahinbey' },
          { code: 'SEHITKAMIL', name: 'Sehitkamil' },
          { code: 'NIZIP', name: 'Nizip' },
          { code: 'ARABAN', name: 'Araban' },
          { code: 'KARKAMIS', name: 'Karkamis' },
          { code: 'NURDAGI', name: 'Nurdagi' },
          { code: 'OGUZELI', name: 'Oguzeli' },
          { code: 'YAVUZELI', name: 'Yavuzeli' },
          { code: 'ISLAHIYE', name: 'Islahiye' }
        ]
      },
      { code: 'KON', name: 'Konya',
        cities: [
          { code: 'KONYA', name: 'Konya' },
          { code: 'SELCUKLU', name: 'Selcuklu' },
          { code: 'KARATAY', name: 'Karatay' },
          { code: 'MERAM', name: 'Meram' },
          { code: 'EREGLI', name: 'Eregli' },
          { code: 'BEYSEHIR', name: 'Beysehir' },
          { code: 'CUMRA', name: 'Cumra' },
          { code: 'KARAPINAR', name: 'Karapinar' },
          { code: 'HALKAPINAR', name: 'Halkapinar' },
          { code: 'DEREBUCAK', name: 'Derebucak' }
        ]
      },
      { code: 'KOC', name: 'Kocaeli',
        cities: [
          { code: 'KOCAELI', name: 'Kocaeli' },
          { code: 'IZMIT', name: 'Izmit' },
          { code: 'GEBZE', name: 'Gebze' },
          { code: 'DERINCE', name: 'Derince' },
          { code: 'KANDIRA', name: 'Kandira' },
          { code: 'KARAMURSEL', name: 'Karamursel' },
          { code: 'GOLCUK', name: 'Golcuk' },
          { code: 'KORFEZ', name: 'Korfez' },
          { code: 'MAP', name: 'Map' },
          { code: 'DILovasi', name: 'Dilovasi' }
        ]
      },
      { code: 'AYD', name: 'Aydin',
        cities: [
          { code: 'AYDIN', name: 'Aydin' },
          { code: 'NAZILLI', name: 'Nazilli' },
          { code: 'SÖKE', name: 'Soke' },
          { code: 'KUSADASI', name: 'Kusadasi' },
          { code: 'DIDIM', name: 'Didim' },
          { code: 'GERMENCIK', name: 'Germencik' },
          { code: 'INCIRLIOVA', name: 'Incirliova' },
          { code: 'KARPUZLU', name: 'Karapuzlu' },
          { code: 'KOÇARLI', name: 'Kocarli' },
          { code: 'YENIPAZAR', name: 'Yenipazar' }
        ]
      },
      { code: 'MAN', name: 'Manisa',
        cities: [
          { code: 'MANISA', name: 'Manisa' },
          { code: 'AKHISAR', name: 'Akhisar' },
          { code: 'SALIHLI', name: 'Salihli' },
          { code: 'DEMIRCI', name: 'Demirci' },
          { code: 'TURGUTLU', name: 'Turgutlu' },
          { code: 'ALAŞEHİR', name: 'Alasehir' },
          { code: 'SARUHANLI', name: 'Saruhanli' },
          { code: 'GÖLMARMARA', name: 'Golmarmara' },
          { code: 'KIRKAĞAÇ', name: 'Kirkağaç' },
          { code: 'KÖPRÜBAŞI', name: 'Koprubasi' }
        ]
      },
      { code: 'BAL', name: 'Balikesir',
        cities: [
          { code: 'BALIKESIR', name: 'Balikesir' },
          { code: 'BANDIRMA', name: 'Bandirma' },
          { code: 'AYVALIK', name: 'Ayvalik' },
          { code: 'GÖNEN', name: 'Gonen' },
          { code: 'BURHANIYE', name: 'Burhaniye' },
          { code: 'EDREMIT', name: 'Edremit' },
          { code: 'ERDEK', name: 'Erdek' },
          { code: 'GÖMEÇ', name: 'Gomec' },
          { code: 'HAVRAN', name: 'Havran' },
          { code: 'İVRİNDİ', name: 'Ivrindi' }
        ]
      },
      { code: 'SAK', name: 'Sakarya',
        cities: [
          { code: 'SAKARYA', name: 'Sakarya' },
          { code: 'ADAPAZARI', name: 'Adapazari' },
          { code: 'SERDİVAN', name: 'Serdivan' },
          { code: 'ERENLER', name: 'Erenler' },
          { code: 'HENDEK', name: 'Hendek' },
          { code: 'KARASU', name: 'Karasu' },
          { code: 'KAYNARCA', name: 'Kaynarca' },
          { code: 'KOCAALİ', name: 'Kocaali' },
          { code: 'PAMUKOVA', name: 'Pamukova' },
          { code: 'SÖĞÜTLÜ', name: 'Sogutlu' }
        ]
      },
      { code: 'MUG', name: 'Mugla',
        cities: [
          { code: 'MUGLA', name: 'Mugla' },
          { code: 'BODRUM', name: 'Bodrum' },
          { code: 'MARMARIS', name: 'Marmaris' },
          { code: 'FETHIYE', name: 'Fethiye' },
          { code: 'DATCA', name: 'Datca' },
          { code: 'MİLAS', name: 'Milas' },
          { code: 'YATAĞAN', name: 'Yatagan' },
          { code: 'KÖYCEĞİZ', name: 'Koycegiz' },
          { code: 'ULA', name: 'Ula' },
          { code: 'ORTACA', name: 'Ortaca' }
        ]
      },
      { code: 'HAT', name: 'Hatay',
        cities: [
          { code: 'HATAY', name: 'Hatay' },
          { code: 'ANTAKYA', name: 'Antakya' },
          { code: 'ISKENDERUN', name: 'Iskenderun' },
          { code: 'DÖRTYOL', name: 'Dortyol' },
          { code: 'ERZİN', name: 'Erzin' },
          { code: 'KIRIKHAN', name: 'Kirikhan' },
          { code: 'REYHANLI', name: 'Reyhanli' },
          { code: 'SAMANDAGI', name: 'Samandagi' },
          { code: 'ALTINÖZÜ', name: 'Altinozu' },
          { code: 'BELEN', name: 'Belen' }
        ]
      },
      { code: 'DEN', name: 'Denizli',
        cities: [
          { code: 'DENIZLI', name: 'Denizli' },
          { code: 'PAMUKKALE', name: 'Pamukkale' },
          { code: 'MERKEZEFENDI', name: 'Merkezefendi' },
          { code: 'PAMUKKALE2', name: 'Pamukkale' },
          { code: 'TAVAS', name: 'Tavas' },
          { code: 'ÇAL', name: 'Cal' },
          { code: 'BULDAN', name: 'Buldan' },
          { code: 'SARAYKÖY', name: 'Saraykoy' },
          { code: 'BABADAĞ', name: 'Babadag' },
          { code: 'ACIPAYAM', name: 'Acipayam' }
        ]
      },
      { code: 'TRA', name: 'Trabzon',
        cities: [
          { code: 'TRABZON', name: 'Trabzon' },
          { code: 'ORTAHISAR', name: 'Ortahisar' },
          { code: 'AKCAABAT', name: 'Akcaabat' },
          { code: 'YOMRA', name: 'Yomra' },
          { code: 'ARSİN', name: 'Arsin' },
          { code: 'VAKFIKEBİR', name: 'Vakfikebir' },
          { code: 'TONYA', name: 'Tonya' },
          { code: 'MAÇKA', name: 'Macka' },
          { code: 'SÜRMENE', name: 'Surmene' },
          { code: 'OF', name: 'Of' }
        ]
      },
      { code: 'SAMS', name: 'Samsun',
        cities: [
          { code: 'SAMSUN', name: 'Samsun' },
          { code: 'ILKADIM', name: 'Ilkadim' },
          { code: 'ATAKUM', name: 'Atakum' },
          { code: 'CANIK', name: 'Canik' },
          { code: 'TEKKEKÖY', name: 'Tekkekoy' },
          { code: 'BAFRA', name: 'Bafra' },
          { code: 'ÇARŞAMBA', name: 'Carsamba' },
          { code: 'TERME', name: 'Terme' },
          { code: 'HAVZA', name: 'Havza' },
          { code: 'LADIK', name: 'Ladik' }
        ]
      }
    ]
};
