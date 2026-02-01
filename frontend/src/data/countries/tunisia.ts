/**
 * Tunisia country data with governorates and cities
 */

import { Country } from './index';

export const tunisia: Country = {
  code: 'TN',
  name: 'Tunisia',
  flag: '🇹🇳',
  capital: 'Tunis',
  area: 163610,
  currencySymbol: 'د.ت',
  officialLanguages: ['Arabic'],
  demonym: 'Tunisian',
  taxInfo: { standardRate: 19, taxName: 'VAT', currency: 'TND', region: 'MEA' },
  divisions: [
    { code: 'TUN', name: 'Tunis', type: 'governorate',
      cities: [
        { code: 'TUNIS', name: 'Tunis' },
        { code: 'ARIANA', name: 'Ariana' },
        { code: 'BEN', name: 'Ben Arous' },
        { code: 'MANOUBA', name: 'Manouba' },
        { code: 'ELMENZAH', name: 'El Menzah' }
      ]
    },
    { code: 'SFAX', name: 'Sfax', type: 'governorate',
      cities: [
        { code: 'SFAX', name: 'Sfax' },
        { code: 'SIDI', name: 'Sidi Mansour' },
        { code: 'SAKRA', name: 'Sakra' },
        { code: 'ELMAKNA', name: 'El Makna' },
        { code: 'JEBINIANA', name: 'Jebiniana' }
      ]
    },
    { code: 'SOU', name: 'Sousse', type: 'governorate',
      cities: [
        { code: 'SOUSSE', name: 'Sousse' },
        { code: 'MONASTIR', name: 'Monastir' },
        { code: 'MAHDIA', name: 'Mahdia' },
        { code: 'KAIROUAN', name: 'Kairouan' },
        { code: 'KASSERINE', name: 'Kasserine' }
      ]
    },
    { code: 'KAI', name: 'Kairouan', type: 'governorate',
      cities: [
        { code: 'KAIROUAN', name: 'Kairouan' },
        { code: 'CHEBBI', name: 'Chebba' },
        { code: 'ELJEM', name: 'El Djem' },
        { code: 'KSAR', name: 'Ksar Hellal' },
        { code: 'MOKNINE', name: 'Moknine' }
      ]
    },
    { code: 'BIZ', name: 'Bizerte', type: 'governorate',
      cities: [
        { code: 'BIZERTE', name: 'Bizerte' },
        { code: 'MENZEL', name: 'Menzel Bourguiba' },
        { code: 'UTIQUE', name: 'Utique' },
        { code: 'METLINE', name: 'Metline' },
        { code: 'RADES', name: 'Rades' }
      ]
    },
    { code: 'GAB', name: 'Gabès', type: 'governorate',
      cities: [
        { code: 'GABES', name: 'Gabès' },
        { code: 'MEDENINE', name: 'Medenine' },
        { code: 'TATAOUINE', name: 'Tataouine' },
        { code: 'ZARZIS', name: 'Zarzis' },
        { code: 'DJEBA', name: 'Djeba' }
      ]
    },
    { code: 'ARI', name: 'Ariana', type: 'governorate',
      cities: [
        { code: 'ARIANA', name: 'Ariana' },
        { code: 'TUNIS', name: 'Tunis' },
        { code: 'ELMENZAH', name: 'El Menzah' },
        { code: 'RADES', name: 'Rades' },
        { code: 'LA', name: 'La Marsa' }
      ]
    },
    { code: 'BEN', name: 'Ben Arous', type: 'governorate',
      cities: [
        { code: 'BEN', name: 'Ben Arous' },
        { code: 'TUNIS', name: 'Tunis' },
        { code: 'ARIANA', name: 'Ariana' },
        { code: 'ELMOUR', name: 'El Mour' },
        { code: 'FOUCHANA', name: 'Fouchana' }
      ]
    },
    { code: 'MON', name: 'Monastir', type: 'governorate',
      cities: [
        { code: 'MONASTIR', name: 'Monastir' },
        { code: 'SOUSSE', name: 'Sousse' },
        { code: 'MAHDIA', name: 'Mahdia' },
        { code: 'KSAR', name: 'Ksar Hellal' },
        { code: 'MOKNINE', name: 'Moknine' }
      ]
    },
    { code: 'NAB', name: 'Nabeul', type: 'governorate',
      cities: [
        { code: 'NABEUL', name: 'Nabeul' },
        { code: 'HAMMAMET', name: 'Hammamet' },
        { code: 'KELIBIA', name: 'Kelibia' },
        { code: 'KORBA', name: 'Korba' },
        { code: 'MENZEL', name: 'Menzel Temime' }
      ]
    },
    { code: 'JEN', name: 'Jendouba', type: 'governorate',
      cities: [
        { code: 'JENDOUBA', name: 'Jendouba' },
        { code: 'BEJA', name: 'Beja' },
        { code: 'TABARKA', name: 'Tabarka' },
        { code: 'FERNANA', name: 'Fernana' },
        { code: 'OUED', name: 'Oued Melliz' }
      ]
    },
    { code: 'BEJ', name: 'Beja', type: 'governorate',
      cities: [
        { code: 'BEJA', name: 'Beja' },
        { code: 'JENDOUBA', name: 'Jendouba' },
        { code: 'TABARKA', name: 'Tabarka' },
        { code: 'TESTOUR', name: 'Testour' },
        { code: 'GOVERNORATE', name: 'Governorate' }
      ]
    },
    { code: 'MAH', name: 'Mahdia', type: 'governorate',
      cities: [
        { code: 'MAHDIA', name: 'Mahdia' },
        { code: 'MONASTIR', name: 'Monastir' },
        { code: 'SOUSSE', name: 'Sousse' },
        { code: 'KAIROUAN', name: 'Kairouan' },
        { code: 'KSAR', name: 'Ksar Hellal' }
      ]
    },
    { code: 'KAS', name: 'Kasserine', type: 'governorate',
      cities: [
        { code: 'KASSERINE', name: 'Kasserine' },
        { code: 'SIDI', name: 'Sidi Bouzid' },
        { code: 'GAFSA', name: 'Gafsa' },
        { code: 'KAIROUAN', name: 'Kairouan' },
        { code: 'THALA', name: 'Thala' }
      ]
    },
    { code: 'GAF', name: 'Gafsa', type: 'governorate',
      cities: [
        { code: 'GAFSA', name: 'Gafsa' },
        { code: 'KASSERINE', name: 'Kasserine' },
        { code: 'TOZEUR', name: 'Tozeur' },
        { code: 'SIDI', name: 'Sidi Bouzid' },
        { code: 'REDA', name: 'Redeyef' }
      ]
    },
    { code: 'TOZ', name: 'Tozeur', type: 'governorate',
      cities: [
        { code: 'TOZEUR', name: 'Tozeur' },
        { code: 'GAFSA', name: 'Gafsa' },
        { code: 'DOUZ', name: 'Douz' },
        { code: 'NEFTA', name: 'Nefta' },
        { code: 'DEGACHE', name: 'Degache' }
      ]
    },
    { code: 'KEB', name: 'Kebili', type: 'governorate',
      cities: [
        { code: 'KEBILI', name: 'Kebili' },
        { code: 'DOUZ', name: 'Douz' },
        { code: 'TOZEUR', name: 'Tozeur' },
        { code: 'GABES', name: 'Gabès' },
        { code: 'JEMNA', name: 'Jemna' }
      ]
    },
    { code: 'TAT', name: 'Tataouine', type: 'governorate',
      cities: [
        { code: 'TATAOUINE', name: 'Tataouine' },
        { code: 'GABES', name: 'Gabès' },
        { code: 'MEDENINE', name: 'Medenine' },
        { code: 'ZARZIS', name: 'Zarzis' },
        { code: 'REMED', name: 'Remeda' }
      ]
    },
    { code: 'MED', name: 'Medenine', type: 'governorate',
      cities: [
        { code: 'MEDENINE', name: 'Medenine' },
        { code: 'TATAOUINE', name: 'Tataouine' },
        { code: 'GABES', name: 'Gabès' },
        { code: 'ZARZIS', name: 'Zarzis' },
        { code: 'JERBA', name: 'Jerba' }
      ]
    },
    { code: 'SIL', name: 'Siliana', type: 'governorate',
      cities: [
        { code: 'SILIANA', name: 'Siliana' },
        { code: 'KAIROUAN', name: 'Kairouan' },
        { code: 'KASSERINE', name: 'Kasserine' },
        { code: 'BEJA', name: 'Beja' },
        { code: 'MELLEGUE', name: 'Mellegue' }
      ]
    },
    { code: 'ZAG', name: 'Zaghouan', type: 'governorate',
      cities: [
        { code: 'ZAGHOUAN', name: 'Zaghouan' },
        { code: 'NABEUL', name: 'Nabeul' },
        { code: 'SOUSSA', name: 'Sousse' },
        { code: 'KAIROUAN', name: 'Kairouan' },
        { code: 'BIR', name: 'Bir Mcherga' }
      ]
    },
    { code: 'MAN', name: 'Manouba', type: 'governorate',
      cities: [
        { code: 'MANOUBA', name: 'Manouba' },
        { code: 'TUNIS', name: 'Tunis' },
        { code: 'ARIANA', name: 'Ariana' },
        { code: 'BEN', name: 'Ben Arous' },
        { code: 'ELMENZAH', name: 'El Menzah' }
      ]
    }
  ]
};

export default tunisia;
