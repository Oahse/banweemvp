/**
 * Central African Republic country data with prefectures and cities
 */

import { Country } from './index';

export const centralafricanrepublic: Country = {
  code: 'CF',
  name: 'Central African Republic',
  flag: '🇨🇫',
  capital: 'Bangui',
  area: 622984,
  currencySymbol: 'FCFA',
  officialLanguages: ['French', 'Sango'],
  demonym: 'Central African',
  taxInfo: { standardRate: 19, taxName: 'VAT', currency: 'XAF', region: 'MEA' },
  divisions: [
    { code: 'BAN', name: 'Bangui', type: 'prefecture',
      cities: [
        { code: 'BANGUI', name: 'Bangui' },
        { code: 'BERBERATI', name: 'Berberati' },
        { code: 'BOSSANGOA', name: 'Bossangoa' },
        { code: 'BAMBERI', name: 'Bambari' },
        { code: 'BOUAR', name: 'Bouar' }
      ]
    },
    { code: 'BAM', name: 'Bamingui-Bangoran', type: 'prefecture',
      cities: [
        { code: 'BAMBERI', name: 'Bambari' },
        { code: 'KAGA', name: 'Kaga-Bandoro' },
        { code: 'MONGOU', name: 'Mongoumba' },
        { code: 'SIBUT', name: 'Sibut' },
        { code: 'BANGASSOU', name: 'Bangassou' }
      ]
    },
    { code: 'BAS', name: 'Basse-Kotto', type: 'prefecture',
      cities: [
        { code: 'MOBAYE', name: 'Mobaye' },
        { code: 'ALINDAO', name: 'Alindao' },
        { code: 'KEMBI', name: 'Kembé' },
        { code: 'ZEMIO', name: 'Zemio' },
        { code: 'RAFALI', name: 'Rafai' }
      ]
    },
    { code: 'HAU', name: 'Haute-Kotto', type: 'prefecture',
      cities: [
        { code: 'BRIA', name: 'Bria' },
        { code: 'OUADDA', name: 'Ouadda' },
        { code: 'YALINGA', name: 'Yalinga' },
        { code: 'BAMBARI', name: 'Bambari' },
        { code: 'KAGA', name: 'Kaga-Bandoro' }
      ]
    },
    { code: 'HAU', name: 'Haute-Mbomou', type: 'prefecture',
      cities: [
        { code: 'OUADDA', name: 'Ouadda' },
        { code: 'YALINGA', name: 'Yalinga' },
        { code: 'BRIA', name: 'Bria' },
        { code: 'BAMBARI', name: 'Bambari' },
        { code: 'KAGA', name: 'Kaga-Bandoro' }
      ]
    },
    { code: 'KEM', name: 'Kémo', type: 'prefecture',
      cities: [
        { code: 'SIBUT', name: 'Sibut' },
        { code: 'BAMBARI', name: 'Bambari' },
        { code: 'KAGA', name: 'Kaga-Bandoro' },
        { code: 'MONGOU', name: 'Mongoumba' },
        { code: 'BANGASSOU', name: 'Bangassou' }
      ]
    },
    { code: 'LOB', name: 'Lobaye', type: 'prefecture',
      cities: [
        { code: 'MBAIKI', name: 'Mbaïki' },
        { code: 'BOGANGA', name: 'Bogangolo' },
        { code: 'BODONGO', name: 'Bodongo' },
        { code: 'BOUAR', name: 'Bouar' },
        { code: 'BOSSANGOA', name: 'Bossangoa' }
      ]
    },
    { code: 'MAM', name: 'Mambéré-Kadéï', type: 'prefecture',
      cities: [
        { code: 'BAMBERI', name: 'Bambari' },
        { code: 'KAGA', name: 'Kaga-Bandoro' },
        { code: 'MONGOU', name: 'Mongoumba' },
        { code: 'SIBUT', name: 'Sibut' },
        { code: 'BANGASSOU', name: 'Bangassou' }
      ]
    },
    { code: 'MBA', name: 'Mbomou', type: 'prefecture',
      cities: [
        { code: 'BAMBERI', name: 'Bambari' },
        { code: 'KAGA', name: 'Kaga-Bandoro' },
        { code: 'MONGOU', name: 'Mongoumba' },
        { code: 'SIBUT', name: 'Sibut' },
        { code: 'BANGASSOU', name: 'Bangassou' }
      ]
    },
    { code: 'NAN', name: 'Nana-Mambéré', type: 'prefecture',
      cities: [
        { code: 'BAMBERI', name: 'Bambari' },
        { code: 'KAGA', name: 'Kaga-Bandoro' },
        { code: 'MONGOU', name: 'Mongoumba' },
        { code: 'SIBUT', name: 'Sibut' },
        { code: 'BANGASSOU', name: 'Bangassou' }
      ]
    },
    { code: 'OMB', name: 'Ombella-Mpoko', type: 'prefecture',
      cities: [
        { code: 'BIMBO', name: 'Bimbo' },
        { code: 'BOGANGA', name: 'Bogangolo' },
        { code: 'BODONGO', name: 'Bodongo' },
        { code: 'BOUAR', name: 'Bouar' },
        { code: 'BOSSANGOA', name: 'Bossangoa' }
      ]
    },
    { code: 'OUH', name: 'Ouaka', type: 'prefecture',
      cities: [
        { code: 'BAMBARI', name: 'Bambari' },
        { code: 'KAGA', name: 'Kaga-Bandoro' },
        { code: 'MONGOU', name: 'Mongoumba' },
        { code: 'SIBUT', name: 'Sibut' },
        { code: 'BANGASSOU', name: 'Bangassou' }
      ]
    },
    { code: 'OUH', name: 'Ouham', type: 'prefecture',
      cities: [
        { code: 'BOSSANGOA', name: 'Bossangoa' },
        { code: 'BAMBERI', name: 'Bambari' },
        { code: 'KAGA', name: 'Kaga-Bandoro' },
        { code: 'MONGOU', name: 'Mongoumba' },
        { code: 'SIBUT', name: 'Sibut' }
      ]
    },
    { code: 'OUH', name: 'Ouham-Pendé', type: 'prefecture',
      cities: [
        { code: 'BOSSANGOA', name: 'Bossangoa' },
        { code: 'BAMBERI', name: 'Bambari' },
        { code: 'KAGA', name: 'Kaga-Bandoro' },
        { code: 'MONGOU', name: 'Mongoumba' },
        { code: 'SIBUT', name: 'Sibut' }
      ]
    },
    { code: 'VAK', name: 'Vakaga', type: 'prefecture',
      cities: [
        { code: 'BRIA', name: 'Bria' },
        { code: 'OUADDA', name: 'Ouadda' },
        { code: 'YALINGA', name: 'Yalinga' },
        { code: 'BAMBARI', name: 'Bambari' },
        { code: 'KAGA', name: 'Kaga-Bandoro' }
      ]
    }
  ]
};

export default centralafricanrepublic;
