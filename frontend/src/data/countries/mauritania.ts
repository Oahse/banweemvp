/**
 * Mauritania country data with regions, cities, and tax information
 */

import { Country } from './index';

export const mauritania: Country = {
    code: 'MR',
    name: 'Mauritania',
    taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'MRO', region: 'MEA' },
    provinces: [
      { code: 'NOU', name: 'Nouakchott',
        cities: [
          { code: 'NOU', name: 'Nouakchott' },
          { code: 'ARA', name: 'Arafat' },
          { code: 'TAR', name: 'Teyarett' },
          { code: 'RIY', name: 'Riyadh' },
          { code: 'EL', name: 'El Mina' },
          { code: 'TOL', name: 'Tolou' },
          { code: 'SEB', name: 'Sebkha' },
          { code: 'KSA', name: 'Ksar' },
          { code: 'DAR', name: 'Dar Naim' },
          { code: 'BIR', name: 'Bir Moghrein' }
        ]
      },
      { code: 'AD', name: 'Adrar',
        cities: [
          { code: 'ATA', name: 'Atar' },
          { code: 'CHI', name: 'Chinguetti' },
          { code: 'OUJ', name: 'Ouadane' },
          { code: 'BIR', name: 'Bir Moghrein' },
          { code: 'NOU', name: 'Nouakchott' },
          { code: 'ARA', name: 'Arafat' },
          { code: 'TAR', name: 'Teyarett' },
          { code: 'RIY', name: 'Riyadh' },
          { code: 'EL', name: 'El Mina' },
          { code: 'TOL', name: 'Tolou' }
        ]
      },
      { code: 'ASS', name: 'Assaba',
        cities: [
          { code: 'KIF', name: 'Kiffa' },
          { code: 'AIO', name: 'Aïoun El Atrouss' },
          { code: 'BAM', name: 'Bamako' },
          { code: 'NOU', name: 'Nouakchott' },
          { code: 'ARA', name: 'Arafat' },
          { code: 'TAR', name: 'Teyarett' },
          { code: 'RIY', name: 'Riyadh' },
          { code: 'EL', name: 'El Mina' },
          { code: 'TOL', name: 'Tolou' },
          { code: 'SEB', name: 'Sebkha' }
        ]
      },
      { code: 'BRA', name: 'Brakna',
        cities: [
          { code: 'ALE', name: 'Aleg' },
          { code: 'MAG', name: 'Moghrein' },
          { code: 'NOU', name: 'Nouakchott' },
          { code: 'ARA', name: 'Arafat' },
          { code: 'TAR', name: 'Teyarett' },
          { code: 'RIY', name: 'Riyadh' },
          { code: 'EL', name: 'El Mina' },
          { code: 'TOL', name: 'Tolou' },
          { code: 'SEB', name: 'Sebkha' },
          { code: 'KSA', name: 'Ksar' }
        ]
      },
      { code: 'DAG', name: 'Dakhlet Nouadhibou',
        cities: [
          { code: 'NOU', name: 'Nouadhibou' },
          { code: 'NOU', name: 'Nouakchott' },
          { code: 'ARA', name: 'Arafat' },
          { code: 'TAR', name: 'Teyarett' },
          { code: 'RIY', name: 'Riyadh' },
          { code: 'EL', name: 'El Mina' },
          { code: 'TOL', name: 'Tolou' },
          { code: 'SEB', name: 'Sebkha' },
          { code: 'KSA', name: 'Ksar' },
          { code: 'DAR', name: 'Dar Naim' }
        ]
      },
      { code: 'GOR', name: 'Gorgol',
        cities: [
          { code: 'KAE', name: 'Kaédi' },
          { code: 'MBO', name: 'Mbout' },
          { code: 'NOU', name: 'Nouakchott' },
          { code: 'ARA', name: 'Arafat' },
          { code: 'TAR', name: 'Teyarett' },
          { code: 'RIY', name: 'Riyadh' },
          { code: 'EL', name: 'El Mina' },
          { code: 'TOL', name: 'Tolou' },
          { code: 'SEB', name: 'Sebkha' },
          { code: 'KSA', name: 'Ksar' }
        ]
      },
      { code: 'GUI', name: 'Guidimaka',
        cities: [
          { code: 'SEL', name: 'Sélibaby' },
          { code: 'NOU', name: 'Nouakchott' },
          { code: 'ARA', name: 'Arafat' },
          { code: 'TAR', name: 'Teyarett' },
          { code: 'RIY', name: 'Riyadh' },
          { code: 'EL', name: 'El Mina' },
          { code: 'TOL', name: 'Tolou' },
          { code: 'SEB', name: 'Sebkha' },
          { code: 'KSA', name: 'Ksar' },
          { code: 'DAR', name: 'Dar Naim' }
        ]
      },
      { code: 'HOD', name: 'Hodh Ech Chargui',
        cities: [
          { code: 'NEM', name: 'Néma' },
          { code: 'NOU', name: 'Nouakchott' },
          { code: 'ARA', name: 'Arafat' },
          { code: 'TAR', name: 'Teyarett' },
          { code: 'RIY', name: 'Riyadh' },
          { code: 'EL', name: 'El Mina' },
          { code: 'TOL', name: 'Tolou' },
          { code: 'SEB', name: 'Sebkha' },
          { code: 'KSA', name: 'Ksar' },
          { code: 'DAR', name: 'Dar Naim' }
        ]
      },
      { code: 'HOD', name: 'Hodh El Gharbi',
        cities: [
          { code: 'AYO', name: 'Ayoun el Atrous' },
          { code: 'NOU', name: 'Nouakchott' },
          { code: 'ARA', name: 'Arafat' },
          { code: 'TAR', name: 'Teyarett' },
          { code: 'RIY', name: 'Riyadh' },
          { code: 'EL', name: 'El Mina' },
          { code: 'TOL', name: 'Tolou' },
          { code: 'SEB', name: 'Sebkha' },
          { code: 'KSA', name: 'Ksar' },
          { code: 'DAR', name: 'Dar Naim' }
        ]
      },
      { code: 'INC', name: 'Inchiri',
        cities: [
          { code: 'NOU', name: 'Nouakchott' },
          { code: 'ARA', name: 'Arafat' },
          { code: 'TAR', name: 'Teyarett' },
          { code: 'RIY', name: 'Riyadh' },
          { code: 'EL', name: 'El Mina' },
          { code: 'TOL', name: 'Tolou' },
          { code: 'SEB', name: 'Sebkha' },
          { code: 'KSA', name: 'Ksar' },
          { code: 'DAR', name: 'Dar Naim' },
          { code: 'BIR', name: 'Bir Moghrein' }
        ]
      },
      { code: 'TAG', name: 'Tagant',
        cities: [
          { code: 'TID', name: 'Tidjikja' },
          { code: 'NOU', name: 'Nouakchott' },
          { code: 'ARA', name: 'Arafat' },
          { code: 'TAR', name: 'Teyarett' },
          { code: 'RIY', name: 'Riyadh' },
          { code: 'EL', name: 'El Mina' },
          { code: 'TOL', name: 'Tolou' },
          { code: 'SEB', name: 'Sebkha' },
          { code: 'KSA', name: 'Ksar' },
          { code: 'DAR', name: 'Dar Naim' }
        ]
      },
      { code: 'TIR', name: 'Tiris Zemmour',
        cities: [
          { code: 'ZOU', name: 'Zouerate' },
          { code: 'NOU', name: 'Nouakchott' },
          { code: 'ARA', name: 'Arafat' },
          { code: 'TAR', name: 'Teyarett' },
          { code: 'RIY', name: 'Riyadh' },
          { code: 'EL', name: 'El Mina' },
          { code: 'TOL', name: 'Tolou' },
          { code: 'SEB', name: 'Sebkha' },
          { code: 'KSA', name: 'Ksar' },
          { code: 'DAR', name: 'Dar Naim' }
        ]
      },
      { code: 'TRC', name: 'Trarza',
        cities: [
          { code: 'ROS', name: 'Rosso' },
          { code: 'NOU', name: 'Nouakchott' },
          { code: 'ARA', name: 'Arafat' },
          { code: 'TAR', name: 'Teyarett' },
          { code: 'RIY', name: 'Riyadh' },
          { code: 'EL', name: 'El Mina' },
          { code: 'TOL', name: 'Tolou' },
          { code: 'SEB', name: 'Sebkha' },
          { code: 'KSA', name: 'Ksar' },
          { code: 'DAR', name: 'Dar Naim' }
        ]
      }
    ]
  };
