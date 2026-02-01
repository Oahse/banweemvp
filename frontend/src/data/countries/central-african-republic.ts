/**
 * Central African Republic country data with prefectures, cities, and tax information
 */

import { Country } from './index';

export const centralAfricanRepublic: Country = {
    code: 'CF',
    name: 'Central African Republic',
    taxInfo: { standardRate: 19, taxName: 'VAT', currency: 'XAF', region: 'MEA' },
    provinces: [
      { code: 'BAM', name: 'Bamingui',
        cities: [
          { code: 'BAM', name: 'Bamingui' },
          { code: 'BRI', name: 'Bria' },
          { code: 'KAG', name: 'Kaga-Bandoro' },
          { code: 'NDA', name: 'Ndélé' },
          { code: 'OUA', name: 'Ouadda' },
          { code: 'SAM', name: 'Sambélé' },
          { code: 'BAM2', name: 'Bamingui' },
          { code: 'BRI2', name: 'Bria' },
          { code: 'KAG2', name: 'Kaga-Bandoro' },
          { code: 'NDA2', name: 'Ndélé' }
        ]
      },
      { code: 'BAN', name: 'Bangui',
        cities: [
          { code: 'BAN', name: 'Bangui' },
          { code: 'BIM', name: 'Bimbo' },
          { code: 'BEG', name: 'Bégoua' },
          { code: 'BOA', name: 'Boali' },
          { code: 'BOU', name: 'Bouar' },
          { code: 'BER', name: 'Berbérati' },
          { code: 'BAM', name: 'Bambari' },
          { code: 'BRI', name: 'Bria' },
          { code: 'KAG', name: 'Kaga-Bandoro' },
          { code: 'NDA', name: 'Ndélé' }
        ]
      },
      { code: 'BAS', name: 'Basse-Kotto',
        cities: [
          { code: 'MOB', name: 'Mobaye' },
          { code: 'ALI', name: 'Alindao' },
          { code: 'KEM', name: 'Kembé' },
          { code: 'MIN', name: 'Mingala' },
          { code: 'SAT', name: 'Satema' },
          { code: 'ZEM', name: 'Zémio' },
          { code: 'BAM', name: 'Bangassou' },
          { code: 'GRI', name: 'Grimari' },
          { code: 'KOU', name: 'Kouango' },
          { code: 'RAB', name: 'Rafai' }
        ]
      },
      { code: 'HMB', name: 'Haute-Mbomou',
        cities: [
          { code: 'BAM', name: 'Bangassou' },
          { code: 'GRI', name: 'Grimari' },
          { code: 'KOU', name: 'Kouango' },
          { code: 'RAB', name: 'Rafai' },
          { code: 'ZEM', name: 'Zémio' },
          { code: 'MOB', name: 'Mobaye' },
          { code: 'ALI', name: 'Alindao' },
          { code: 'KEM', name: 'Kembé' },
          { code: 'MIN', name: 'Mingala' },
          { code: 'SAT', name: 'Satema' }
        ]
      },
      { code: 'HMK', name: 'Haute-Kotto',
        cities: [
          { code: 'BRI', name: 'Bria' },
          { code: 'KAG', name: 'Kaga-Bandoro' },
          { code: 'NDA', name: 'Ndélé' },
          { code: 'OUA', name: 'Ouadda' },
          { code: 'SAM', name: 'Sambélé' },
          { code: 'BAM', name: 'Bamingui' },
          { code: 'BRI2', name: 'Bria' },
          { code: 'KAG2', name: 'Kaga-Bandoro' },
          { code: 'NDA2', name: 'Ndélé' },
          { code: 'OUA2', name: 'Ouadda' }
        ]
      },
      { code: 'KEM', name: 'Kémo',
        cities: [
          { code: 'SIB', name: 'Sibut' },
          { code: 'DEK', name: 'Déké' },
          { code: 'NAN', name: 'Nangha' },
          { code: 'NGU', name: 'Ngoumou' },
          { code: 'PYA', name: 'Pya' },
          { code: 'BAM', name: 'Bangui' },
          { code: 'BIM', name: 'Bimbo' },
          { code: 'BEG', name: 'Bégoua' },
          { code: 'BOA', name: 'Boali' },
          { code: 'BOU', name: 'Bouar' }
        ]
      },
      { code: 'LOB', name: 'Lobaye',
        cities: [
          { code: 'MAB', name: 'Mbaïki' },
          { code: 'BAM', name: 'Bambari' },
          { code: 'BRI', name: 'Bria' },
          { code: 'KAG', name: 'Kaga-Bandoro' },
          { code: 'NDA', name: 'Ndélé' },
          { code: 'OUA', name: 'Ouadda' },
          { code: 'SAM', name: 'Sambélé' },
          { code: 'BAM2', name: 'Bamingui' },
          { code: 'BRI2', name: 'Bria' },
          { code: 'KAG2', name: 'Kaga-Bandoro' }
        ]
      },
      { code: 'MAM', name: 'Mambéré-Kadéï',
        cities: [
          { code: 'BER', name: 'Berbérati' },
          { code: 'BOU', name: 'Bouar' },
          { code: 'GAM', name: 'Gamboula' },
          { code: 'CARN', name: 'Carnot' },
          { code: 'BAO', name: 'Baoro' },
          { code: 'DOE', name: 'Doe' },
          { code: 'KOU', name: 'Koui' },
          { code: 'NAN', name: 'Nanga' },
          { code: 'PAU', name: 'Paoua' },
          { code: 'BAM', name: 'Bambari' }
        ]
      },
      { code: 'MBR', name: 'Mbomou',
        cities: [
          { code: 'BAM', name: 'Bangassou' },
          { code: 'GRI', name: 'Grimari' },
          { code: 'KOU', name: 'Kouango' },
          { code: 'RAB', name: 'Rafai' },
          { code: 'ZEM', name: 'Zémio' },
          { code: 'MOB', name: 'Mobaye' },
          { code: 'ALI', name: 'Alindao' },
          { code: 'KEM', name: 'Kembé' },
          { code: 'MIN', name: 'Mingala' },
          { code: 'SAT', name: 'Satema' }
        ]
      },
      { code: 'NAN', name: 'Nana-Mambéré',
        cities: [
          { code: 'BOU', name: 'Bouar' },
          { code: 'BAO', name: 'Baoro' },
          { code: 'BER', name: 'Berbérati' },
          { code: 'GAM', name: 'Gamboula' },
          { code: 'CARN', name: 'Carnot' },
          { code: 'DOE', name: 'Doe' },
          { code: 'KOU', name: 'Koui' },
          { code: 'NAN', name: 'Nanga' },
          { code: 'PAU', name: 'Paoua' },
          { code: 'BAM', name: 'Bambari' }
        ]
      },
      { code: 'OMB', name: 'Ombella-Mpoko',
        cities: [
          { code: 'BIM', name: 'Bimbo' },
          { code: 'BEG', name: 'Bégoua' },
          { code: 'BOA', name: 'Boali' },
          { code: 'DAM', name: 'Damara' },
          { code: 'YAL', name: 'Yaloké' },
          { code: 'BAM', name: 'Bangui' },
          { code: 'BIM2', name: 'Bimbo' },
          { code: 'BEG2', name: 'Bégoua' },
          { code: 'BOA2', name: 'Boali' },
          { code: 'BOU', name: 'Bouar' }
        ]
      },
      { code: 'OUH', name: 'Ouham',
        cities: [
          { code: 'BOU', name: 'Bouar' },
          { code: 'BOA', name: 'Baoro' },
          { code: 'BER', name: 'Berbérati' },
          { code: 'GAM', name: 'Gamboula' },
          { code: 'CARN', name: 'Carnot' },
          { code: 'DOE', name: 'Doe' },
          { code: 'KOU', name: 'Koui' },
          { code: 'NAN', name: 'Nanga' },
          { code: 'PAU', name: 'Paoua' },
          { code: 'BAM', name: 'Bambari' }
        ]
      },
      { code: 'OUPE', name: 'Ouham-Pendé',
        cities: [
          { code: 'BOA', name: 'Boa' },
          { code: 'PAU', name: 'Paoua' },
          { code: 'BET', name: 'Béloko' },
          { code: 'KAG', name: 'Kaga-Bandoro' },
          { code: 'NDA', name: 'Ndélé' },
          { code: 'OUA', name: 'Ouadda' },
          { code: 'SAM', name: 'Sambélé' },
          { code: 'BAM', name: 'Bamingui' },
          { code: 'BRI', name: 'Bria' },
          { code: 'KAG2', name: 'Kaga-Bandoro' }
        ]
      },
      { code: 'OUAK', name: 'Ouaka',
        cities: [
          { code: 'BAM', name: 'Bambari' },
          { code: 'BRI', name: 'Bria' },
          { code: 'KAG', name: 'Kaga-Bandoro' },
          { code: 'NDA', name: 'Ndélé' },
          { code: 'OUA', name: 'Ouadda' },
          { code: 'SAM', name: 'Sambélé' },
          { code: 'BAM2', name: 'Bamingui' },
          { code: 'BRI2', name: 'Bria' },
          { code: 'KAG2', name: 'Kaga-Bandoro' },
          { code: 'NDA2', name: 'Ndélé' }
        ]
      },
      { code: 'SANG', name: 'Sangha-Mbaéré',
        cities: [
          { code: 'NOL', name: 'Nola' },
          { code: 'BAY', name: 'Bayanga' },
          { code: 'BAM', name: 'Bambari' },
          { code: 'BRI', name: 'Bria' },
          { code: 'KAG', name: 'Kaga-Bandoro' },
          { code: 'NDA', name: 'Ndélé' },
          { code: 'OUA', name: 'Ouadda' },
          { code: 'SAM', name: 'Sambélé' },
          { code: 'BAM2', name: 'Bamingui' },
          { code: 'BRI2', name: 'Bria' }
        ]
      },
      { code: 'VAK', name: 'Vakaga',
        cities: [
          { code: 'BIR', name: 'Birao' },
          { code: 'OUA', name: 'Ouadda' },
          { code: 'SAM', name: 'Sambélé' },
          { code: 'BAM', name: 'Bamingui' },
          { code: 'BRI', name: 'Bria' },
          { code: 'KAG', name: 'Kaga-Bandoro' },
          { code: 'NDA', name: 'Ndélé' },
          { code: 'OUA2', name: 'Ouadda' },
          { code: 'SAM2', name: 'Sambélé' },
          { code: 'BAM2', name: 'Bamingui' }
        ]
      }
    ]
  };
