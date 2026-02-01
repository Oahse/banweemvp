/**
 * Turkey country data with provinces and cities
 */

import { Country } from './index';

export const turkey: Country = {
  code: 'TR',
  name: 'Turkey',
  flag: '🇹🇷',
  capital: 'Ankara',
  area: 783562,
  currencySymbol: '₺',
  officialLanguages: ['Turkish'],
  demonym: 'Turkish',
  taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'TRY', region: 'MEA' },
  divisions: [
    { code: 'IST', name: 'Istanbul', type: 'province',
      cities: [
        { code: 'ISTANBUL', name: 'Istanbul' },
        { code: 'KADIKOY', name: 'Kadıköy' },
        { code: 'SISLI', name: 'Şişli' },
        { code: 'BEYOGLU', name: 'Beyoğlu' },
        { code: 'USKUDAR', name: 'Üsküdar' }
      ]
    },
    { code: 'ANK', name: 'Ankara', type: 'province',
      cities: [
        { code: 'ANKARA', name: 'Ankara' },
        { code: 'ESKISEHIR', name: 'Eskişehir' },
        { code: 'KAYSERI', name: 'Kayseri' },
        { code: 'KIRIKKALE', name: 'Kırıkkale' },
        { code: 'KIRSEHIR', name: 'Kırşehir' }
      ]
    },
    { code: 'IZM', name: 'İzmir', type: 'province',
      cities: [
        { code: 'IZMIR', name: 'İzmir' },
        { code: 'MANISA', name: 'Manisa' },
        { code: 'AYDIN', name: 'Aydın' },
        { code: 'DENIZLI', name: 'Denizli' },
        { code: 'MUGLA', name: 'Muğla' }
      ]
    },
    { code: 'BUR', name: 'Bursa', type: 'province',
      cities: [
        { code: 'BURSA', name: 'Bursa' },
        { code: 'BALIKESIR', name: 'Balıkesir' },
        { code: 'CANAKKALE', name: 'Çanakkale' },
        { code: 'EDIRNE', name: 'Edirne' },
        { code: 'KIRKLARELI', name: 'Kırklareli' }
      ]
    },
    { code: 'ANT', name: 'Antalya', type: 'province',
      cities: [
        { code: 'ANTALYA', name: 'Antalya' },
        { code: 'MERSIN', name: 'Mersin' },
        { code: 'ADANA', name: 'Adana' },
        { code: 'HATAY', name: 'Hatay' },
        { code: 'ISPARTA', name: 'Isparta' }
      ]
    },
    { code: 'KON', name: 'Konya', type: 'province',
      cities: [
        { code: 'KONYA', name: 'Konya' },
        { code: 'KARAMAN', name: 'Karaman' },
        { code: 'NEVSEHIR', name: 'Nevşehir' },
        { code: 'AKSARAY', name: 'Aksaray' },
        { code: 'NIGDE', name: 'Niğde' }
      ]
    },
    { code: 'SAM', name: 'Samsun', type: 'province',
      cities: [
        { code: 'SAMSUN', name: 'Samsun' },
        { code: 'TRABZON', name: 'Trabzon' },
        { code: 'ORDU', name: 'Ordu' },
        { code: 'GUMUSHANE', name: 'Gümüşhane' },
        { code: 'RIZE', name: 'Rize' }
      ]
    },
    { code: 'GAZ', name: 'Gaziantep', type: 'province',
      cities: [
        { code: 'GAZIANTEP', name: 'Gaziantep' },
        { code: 'SANLIURFA', name: 'Şanlıurfa' },
        { code: 'DIYARBAKIR', name: 'Diyarbakır' },
        { code: 'MARDIN', name: 'Mardin' },
        { code: 'BATMAN', name: 'Batman' }
      ]
    },
    { code: 'KOCA', name: 'Kocaeli', type: 'province',
      cities: [
        { code: 'KOCAELI', name: 'Kocaeli' },
        { code: 'SAKARYA', name: 'Sakarya' },
        { code: 'DUZCE', name: 'Düzce' },
        { code: 'BOLU', name: 'Bolu' },
        { code: 'KARABUK', name: 'Karabük' }
      ]
    },
    { code: 'AYD', name: 'Aydın', type: 'province',
      cities: [
        { code: 'AYDIN', name: 'Aydın' },
        { code: 'DENIZLI', name: 'Denizli' },
        { code: 'MUGLA', name: 'Muğla' },
        { code: 'AFYON', name: 'Afyonkarahisar' },
        { code: 'USAK', name: 'Uşak' }
      ]
    },
    { code: 'ERZ', name: 'Erzurum', type: 'province',
      cities: [
        { code: 'ERZURUM', name: 'Erzurum' },
        { code: 'ERZINCAN', name: 'Erzincan' },
        { code: 'BAYBURT', name: 'Bayburt' },
        { code: 'GUMUSHANE', name: 'Gümüşhane' },
        { code: 'TRABZON', name: 'Trabzon' }
      ]
    },
    { code: 'ESK', name: 'Eskişehir', type: 'province',
      cities: [
        { code: 'ESKISEHIR', name: 'Eskişehir' },
        { code: 'KUTAHYA', name: 'Kütahya' },
        { code: 'AFYON', name: 'Afyonkarahisar' },
        { code: 'USAK', name: 'Uşak' },
        { code: 'BALIKESIR', name: 'Balıkesir' }
      ]
    },
    { code: 'HAT', name: 'Hatay', type: 'province',
      cities: [
        { code: 'HATAY', name: 'Hatay' },
        { code: 'ADANA', name: 'Adana' },
        { code: 'OSMANIYE', name: 'Osmaniye' },
        { code: 'KAYSERI', name: 'Kayseri' },
        { code: 'NIGDE', name: 'Niğde' }
      ]
    },
    { code: 'MAL', name: 'Malatya', type: 'province',
      cities: [
        { code: 'MALATYA', name: 'Malatya' },
        { code: 'ELAZIG', name: 'Elazığ' },
        { code: 'TUNCELI', name: 'Tunceli' },
        { code: 'BINGOL', name: 'Bingöl' },
        { code: 'MUS', name: 'Muş' }
      ]
    },
    { code: 'VAN', name: 'Van', type: 'province',
      cities: [
        { code: 'VAN', name: 'Van' },
        { code: 'AGRI', name: 'Ağrı' },
        { code: 'IGDIR', name: 'Iğdır' },
        { code: 'KARS', name: 'Kars' },
        { code: 'ARDAHAN', name: 'Ardahan' }
      ]
    },
    { code: 'MUS', name: 'Muş', type: 'province',
      cities: [
        { code: 'MUS', name: 'Muş' },
        { code: 'BINGOL', name: 'Bingöl' },
        { code: 'TUNCELI', name: 'Tunceli' },
        { code: 'ERZINCAN', name: 'Erzincan' },
        { code: 'BAYBURT', name: 'Bayburt' }
      ]
    },
    { code: 'BING', name: 'Bingöl', type: 'province',
      cities: [
        { code: 'BINGOL', name: 'Bingöl' },
        { code: 'MUS', name: 'Muş' },
        { code: 'TUNCELI', name: 'Tunceli' },
        { code: 'ERZINCAN', name: 'Erzincan' },
        { code: 'ELAZIG', name: 'Elazığ' }
      ]
    },
    { code: 'TUN', name: 'Tunceli', type: 'province',
      cities: [
        { code: 'TUNCELI', name: 'Tunceli' },
        { code: 'ERZINCAN', name: 'Erzincan' },
        { code: 'BINGOL', name: 'Bingöl' },
        { code: 'MUS', name: 'Muş' },
        { code: 'ELAZIG', name: 'Elazığ' }
      ]
    },
    { code: 'ELA', name: 'Elazığ', type: 'province',
      cities: [
        { code: 'ELAZIG', name: 'Elazığ' },
        { code: 'MALATYA', name: 'Malatya' },
        { code: 'TUNCELI', name: 'Tunceli' },
        { code: 'BINGOL', name: 'Bingöl' },
        { code: 'MUS', name: 'Muş' }
      ]
    },
    { code: 'KAR', name: 'Kars', type: 'province',
      cities: [
        { code: 'KARS', name: 'Kars' },
        { code: 'IGDIR', name: 'Iğdır' },
        { code: 'AGRI', name: 'Ağrı' },
        { code: 'VAN', name: 'Van' },
        { code: 'ARDAHAN', name: 'Ardahan' }
      ]
    },
    { code: 'IGD', name: 'Iğdır', type: 'province',
      cities: [
        { code: 'IGDIR', name: 'Iğdır' },
        { code: 'KARS', name: 'Kars' },
        { code: 'AGRI', name: 'Ağrı' },
        { code: 'VAN', name: 'Van' },
        { code: 'ARDAHAN', name: 'Ardahan' }
      ]
    },
    { code: 'AGR', name: 'Ağrı', type: 'province',
      cities: [
        { code: 'AGRI', name: 'Ağrı' },
        { code: 'IGDIR', name: 'Iğdır' },
        { code: 'KARS', name: 'Kars' },
        { code: 'VAN', name: 'Van' },
        { code: 'ARDAHAN', name: 'Ardahan' }
      ]
    },
    { code: 'ARD', name: 'Ardahan', type: 'province',
      cities: [
        { code: 'ARDAHAN', name: 'Ardahan' },
        { code: 'KARS', name: 'Kars' },
        { code: 'IGDIR', name: 'Iğdır' },
        { code: 'AGRI', name: 'Ağrı' },
        { code: 'VAN', name: 'Van' }
      ]
    },
    { code: 'ART', name: 'Artvin', type: 'province',
      cities: [
        { code: 'ARTVIN', name: 'Artvin' },
        { code: 'RIZE', name: 'Rize' },
        { code: 'TRABZON', name: 'Trabzon' },
        { code: 'GUMUSHANE', name: 'Gümüşhane' },
        { code: 'BAYBURT', name: 'Bayburt' }
      ]
    },
    { code: 'RIZ', name: 'Rize', type: 'province',
      cities: [
        { code: 'RIZE', name: 'Rize' },
        { code: 'TRABZON', name: 'Trabzon' },
        { code: 'ARTVIN', name: 'Artvin' },
        { code: 'GUMUSHANE', name: 'Gümüşhane' },
        { code: 'BAYBURT', name: 'Bayburt' }
      ]
    },
    { code: 'GUM', name: 'Gümüşhane', type: 'province',
      cities: [
        { code: 'GUMUSHANE', name: 'Gümüşhane' },
        { code: 'TRABZON', name: 'Trabzon' },
        { code: 'RIZE', name: 'Rize' },
        { code: 'ARTVIN', name: 'Artvin' },
        { code: 'BAYBURT', name: 'Bayburt' }
      ]
    },
    { code: 'BAY', name: 'Bayburt', type: 'province',
      cities: [
        { code: 'BAYBURT', name: 'Bayburt' },
        { code: 'TRABZON', name: 'Trabzon' },
        { code: 'GUMUSHANE', name: 'Gümüşhane' },
        { code: 'RIZE', name: 'Rize' },
        { code: 'ARTVIN', name: 'Artvin' }
      ]
    },
    { code: 'TRAB', name: 'Trabzon', type: 'province',
      cities: [
        { code: 'TRABZON', name: 'Trabzon' },
        { code: 'RIZE', name: 'Rize' },
        { code: 'ARTVIN', name: 'Artvin' },
        { code: 'GUMUSHANE', name: 'Gümüşhane' },
        { code: 'BAYBURT', name: 'Bayburt' }
      ]
    },
    { code: 'ORD', name: 'Ordu', type: 'province',
      cities: [
        { code: 'ORDU', name: 'Ordu' },
        { code: 'SAMSUN', name: 'Samsun' },
        { code: 'GUMUSHANE', name: 'Gümüşhane' },
        { code: 'TRABZON', name: 'Trabzon' },
        { code: 'RIZE', name: 'Rize' }
      ]
    },
    { code: 'GIRES', name: 'Giresun', type: 'province',
      cities: [
        { code: 'GIRESUN', name: 'Giresun' },
        { code: 'TRABZON', name: 'Trabzon' },
        { code: 'ORDU', name: 'Ordu' },
        { code: 'SAMSUN', name: 'Samsun' },
        { code: 'GUMUSHANE', name: 'Gümüşhane' }
      ]
    },
    { code: 'SIN', name: 'Sinop', type: 'province',
      cities: [
        { code: 'SINOP', name: 'Sinop' },
        { code: 'SAMSUN', name: 'Samsun' },
        { code: 'ORDU', name: 'Ordu' },
        { code: 'GIRESUN', name: 'Giresun' },
        { code: 'TRABZON', name: 'Trabzon' }
      ]
    },
    { code: 'SAMS', name: 'Samsun', type: 'province',
      cities: [
        { code: 'SAMSUN', name: 'Samsun' },
        { code: 'ORDU', name: 'Ordu' },
        { code: 'GIRESUN', name: 'Giresun' },
        { code: 'SINOP', name: 'Sinop' },
        { code: 'TRABZON', name: 'Trabzon' }
      ]
    },
    { code: 'BART', name: 'Bartın', type: 'province',
      cities: [
        { code: 'BARTIN', name: 'Bartın' },
        { code: 'ZONGULDAK', name: 'Zonguldak' },
        { code: 'KARABUK', name: 'Karabük' },
        { code: 'DUZCE', name: 'Düzce' },
        { code: 'BOLU', name: 'Bolu' }
      ]
    },
    { code: 'ZON', name: 'Zonguldak', type: 'province',
      cities: [
        { code: 'ZONGULDAK', name: 'Zonguldak' },
        { code: 'BARTIN', name: 'Bartın' },
        { code: 'KARABUK', name: 'Karabük' },
        { code: 'DUZCE', name: 'Düzce' },
        { code: 'BOLU', name: 'Bolu' }
      ]
    },
    { code: 'KAR', name: 'Karabük', type: 'province',
      cities: [
        { code: 'KARABUK', name: 'Karabük' },
        { code: 'ZONGULDAK', name: 'Zonguldak' },
        { code: 'BARTIN', name: 'Bartın' },
        { code: 'DUZCE', name: 'Düzce' },
        { code: 'BOLU', name: 'Bolu' }
      ]
    },
    { code: 'DUZ', name: 'Düzce', type: 'province',
      cities: [
        { code: 'DUZCE', name: 'Düzce' },
        { code: 'ZONGULDAK', name: 'Zonguldak' },
        { code: 'BARTIN', name: 'Bartın' },
        { code: 'KARABUK', name: 'Karabük' },
        { code: 'BOLU', name: 'Bolu' }
      ]
    },
    { code: 'BOL', name: 'Bolu', type: 'province',
      cities: [
        { code: 'BOLU', name: 'Bolu' },
        { code: 'DUZCE', name: 'Düzce' },
        { code: 'ZONGULDAK', name: 'Zonguldak' },
        { code: 'BARTIN', name: 'Bartın' },
        { code: 'KARABUK', name: 'Karabük' }
      ]
    },
    { code: 'KIR', name: 'Kırıkkale', type: 'province',
      cities: [
        { code: 'KIRIKKALE', name: 'Kırıkkale' },
        { code: 'ANKARA', name: 'Ankara' },
        { code: 'KIRSEHIR', name: 'Kırşehir' },
        { code: 'NEVSEHIR', name: 'Nevşehir' },
        { code: 'AKSARAY', name: 'Aksaray' }
      ]
    },
    { code: 'KIR', name: 'Kırşehir', type: 'province',
      cities: [
        { code: 'KIRSEHIR', name: 'Kırşehir' },
        { code: 'ANKARA', name: 'Ankara' },
        { code: 'KIRIKKALE', name: 'Kırıkkale' },
        { code: 'NEVSEHIR', name: 'Nevşehir' },
        { code: 'AKSARAY', name: 'Aksaray' }
      ]
    },
    { code: 'NEV', name: 'Nevşehir', type: 'province',
      cities: [
        { code: 'NEVSEHIR', name: 'Nevşehir' },
        { code: 'KIRSEHIR', name: 'Kırşehir' },
        { code: 'ANKARA', name: 'Ankara' },
        { code: 'KIRIKKALE', name: 'Kırıkkale' },
        { code: 'AKSARAY', name: 'Aksaray' }
      ]
    },
    { code: 'AKS', name: 'Aksaray', type: 'province',
      cities: [
        { code: 'AKSARAY', name: 'Aksaray' },
        { code: 'KIRSEHIR', name: 'Kırşehir' },
        { code: 'NEVSEHIR', name: 'Nevşehir' },
        { code: 'ANKARA', name: 'Ankara' },
        { code: 'KIRIKKALE', name: 'Kırıkkale' }
      ]
    },
    { code: 'KUT', name: 'Kütahya', type: 'province',
      cities: [
        { code: 'KUTAHYA', name: 'Kütahya' },
        { code: 'ESKISEHIR', name: 'Eskişehir' },
        { code: 'AFYON', name: 'Afyonkarahisar' },
        { code: 'USAK', name: 'Uşak' },
        { code: 'BALIKESIR', name: 'Balıkesir' }
      ]
    },
    { code: 'AFY', name: 'Afyonkarahisar', type: 'province',
      cities: [
        { code: 'AFYON', name: 'Afyonkarahisar' },
        { code: 'USAK', name: 'Uşak' },
        { code: 'KUTAHYA', name: 'Kütahya' },
        { code: 'ESKISEHIR', name: 'Eskişehir' },
        { code: 'BALIKESIR', name: 'Balıkesir' }
      ]
    },
    { code: 'USAK', name: 'Uşak', type: 'province',
      cities: [
        { code: 'USAK', name: 'Uşak' },
        { code: 'AFYON', name: 'Afyonkarahisar' },
        { code: 'KUTAHYA', name: 'Kütahya' },
        { code: 'ESKISEHIR', name: 'Eskişehir' },
        { code: 'BALIKESIR', name: 'Balıkesir' }
      ]
    },
    { code: 'MAN', name: 'Manisa', type: 'province',
      cities: [
        { code: 'MANISA', name: 'Manisa' },
        { code: 'IZMIR', name: 'İzmir' },
        { code: 'AYDIN', name: 'Aydın' },
        { code: 'DENIZLI', name: 'Denizli' },
        { code: 'MUGLA', name: 'Muğla' }
      ]
    },
    { code: 'DEN', name: 'Denizli', type: 'province',
      cities: [
        { code: 'DENIZLI', name: 'Denizli' },
        { code: 'MANISA', name: 'Manisa' },
        { code: 'IZMIR', name: 'İzmir' },
        { code: 'AYDIN', name: 'Aydın' },
        { code: 'MUGLA', name: 'Muğla' }
      ]
    },
    { code: 'MUG', name: 'Muğla', type: 'province',
      cities: [
        { code: 'MUGLA', name: 'Muğla' },
        { code: 'IZMIR', name: 'İzmir' },
        { code: 'AYDIN', name: 'Aydın' },
        { code: 'DENIZLI', name: 'Denizli' },
        { code: 'MANISA', name: 'Manisa' }
      ]
    },
    { code: 'AYD', name: 'Aydın', type: 'province',
      cities: [
        { code: 'AYDIN', name: 'Aydın' },
        { code: 'MUGLA', name: 'Muğla' },
        { code: 'DENIZLI', name: 'Denizli' },
        { code: 'MANISA', name: 'Manisa' },
        { code: 'IZMIR', name: 'İzmir' }
      ]
    },
    { code: 'ISPA', name: 'Isparta', type: 'province',
      cities: [
        { code: 'ISPARTA', name: 'Isparta' },
        { code: 'ANTALYA', name: 'Antalya' },
        { code: 'BURDUR', name: 'Burdur' },
        { code: 'AFYON', name: 'Afyonkarahisar' },
        { code: 'KUTAHYA', name: 'Kütahya' }
      ]
    },
    { code: 'BUR', name: 'Burdur', type: 'province',
      cities: [
        { code: 'BURDUR', name: 'Burdur' },
        { code: 'ISPARTA', name: 'Isparta' },
        { code: 'ANTALYA', name: 'Antalya' },
        { code: 'AFYON', name: 'Afyonkarahisar' },
        { code: 'KUTAHYA', name: 'Kütahya' }
      ]
    },
    { code: 'MER', name: 'Mersin', type: 'province',
      cities: [
        { code: 'MERSIN', name: 'Mersin' },
        { code: 'ANTALYA', name: 'Antalya' },
        { code: 'ADANA', name: 'Adana' },
        { code: 'HATAY', name: 'Hatay' },
        { code: 'KONYA', name: 'Konya' }
      ]
    },
    { code: 'ADA', name: 'Adana', type: 'province',
      cities: [
        { code: 'ADANA', name: 'Adana' },
        { code: 'MERSIN', name: 'Mersin' },
        { code: 'ANTALYA', name: 'Antalya' },
        { code: 'HATAY', name: 'Hatay' },
        { code: 'KONYA', name: 'Konya' }
      ]
    },
    { code: 'OSM', name: 'Osmaniye', type: 'province',
      cities: [
        { code: 'OSMANIYE', name: 'Osmaniye' },
        { code: 'ADANA', name: 'Adana' },
        { code: 'MERSIN', name: 'Mersin' },
        { code: 'HATAY', name: 'Hatay' },
        { code: 'KAYSERI', name: 'Kayseri' }
      ]
    },
    { code: 'KAY', name: 'Kayseri', type: 'province',
      cities: [
        { code: 'KAYSERI', name: 'Kayseri' },
        { code: 'NEVSEHIR', name: 'Nevşehir' },
        { code: 'KIRSEHIR', name: 'Kırşehir' },
        { code: 'ANKARA', name: 'Ankara' },
        { code: 'KIRIKKALE', name: 'Kırıkkale' }
      ]
    },
    { code: 'NIG', name: 'Niğde', type: 'province',
      cities: [
        { code: 'NIGDE', name: 'Niğde' },
        { code: 'KAYSERI', name: 'Kayseri' },
        { code: 'NEVSEHIR', name: 'Nevşehir' },
        { code: 'KIRSEHIR', name: 'Kırşehir' },
        { code: 'ANKARA', name: 'Ankara' }
      ]
    },
    { code: 'KIR', name: 'Kırşehir', type: 'province',
      cities: [
        { code: 'KIRSEHIR', name: 'Kırşehir' },
        { code: 'NEVSEHIR', name: 'Nevşehir' },
        { code: 'KAYSERI', name: 'Kayseri' },
        { code: 'NIGDE', name: 'Niğde' },
        { code: 'ANKARA', name: 'Ankara' }
      ]
    },
    { code: 'NEV', name: 'Nevşehir', type: 'province',
      cities: [
        { code: 'NEVSEHIR', name: 'Nevşehir' },
        { code: 'KAYSERI', name: 'Kayseri' },
        { code: 'KIRSEHIR', name: 'Kırşehir' },
        { code: 'NIGDE', name: 'Niğde' },
        { code: 'ANKARA', name: 'Ankara' }
      ]
    },
    { code: 'AKS', name: 'Aksaray', type: 'province',
      cities: [
        { code: 'AKSARAY', name: 'Aksaray' },
        { code: 'KIRSEHIR', name: 'Kırşehir' },
        { code: 'NEVSEHIR', name: 'Nevşehir' },
        { code: 'KAYSERI', name: 'Kayseri' },
        { code: 'NIGDE', name: 'Niğde' }
      ]
    },
    { code: 'KON', name: 'Konya', type: 'province',
      cities: [
        { code: 'KONYA', name: 'Konya' },
        { code: 'KARAMAN', name: 'Karaman' },
        { code: 'NEVSEHIR', name: 'Nevşehir' },
        { code: 'AKSARAY', name: 'Aksaray' },
        { code: 'NIGDE', name: 'Niğde' }
      ]
    },
    { code: 'KAR', name: 'Karaman', type: 'province',
      cities: [
        { code: 'KARAMAN', name: 'Karaman' },
        { code: 'KONYA', name: 'Konya' },
        { code: 'NEVSEHIR', name: 'Nevşehir' },
        { code: 'AKSARAY', name: 'Aksaray' },
        { code: 'NIGDE', name: 'Niğde' }
      ]
    }
  ]
};
