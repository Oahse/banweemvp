/**
 * Angola country data with provinces and cities
 */

import { Country } from './index';

export const angola: Country = {
  code: 'AO',
  name: 'Angola',
  flag: '🇦🇴',
  capital: 'Luanda',
  area: 1246700,
  currencySymbol: 'Kz',
  officialLanguages: ['Portuguese'],
  demonym: 'Angolan',
  taxInfo: { standardRate: 14, taxName: 'VAT', currency: 'AOA', region: 'MEA' },
  divisions: [
    { code: 'LUA', name: 'Luanda', type: 'province',
      cities: [
        { code: 'LUANDA', name: 'Luanda' },
        { code: 'CACUACO', name: 'Cacuaco' },
        { code: 'VIANA', name: 'Viana' },
        { code: 'CASSINGA', name: 'Cassinga' },
        { code: 'ICOL', name: 'Icolo e Bengo' }
      ]
    },
    { code: 'HUI', name: 'Huambo', type: 'province',
      cities: [
        { code: 'HUAMBO', name: 'Huambo' },
        { code: 'CAALA', name: 'Caála' },
        { code: 'LONGONJO', name: 'Longonjo' },
        { code: 'CHINJENJE', name: 'Chinjenje' },
        { code: 'CUNJE', name: 'Cunje' }
      ]
    },
    { code: 'BEN', name: 'Benguela', type: 'province',
      cities: [
        { code: 'BENGUELA', name: 'Benguela' },
        { code: 'LOBITO', name: 'Lobito' },
        { code: 'BAIA', name: 'Baía Farta' },
        { code: 'CUBAL', name: 'Cubal' },
        { code: 'GANDA', name: 'Ganda' }
      ]
    },
    { code: 'HUI', name: 'Huíla', type: 'province',
      cities: [
        { code: 'LUBANGO', name: 'Lubango' },
        { code: 'CHIBEMBA', name: 'Chibemba' },
        { code: 'CAHAMA', name: 'Cahama' },
        { code: 'CUVANGO', name: 'Cuvango' },
        { code: 'JAMBA', name: 'Jamba' }
      ]
    },
    { code: 'MAL', name: 'Malanje', type: 'province',
      cities: [
        { code: 'MALANJE', name: 'Malanje' },
        { code: 'KUITO', name: 'Kuito' },
        { code: 'CALANDULA', name: 'Calandula' },
        { code: 'CACULO', name: 'Caculo' },
        { code: 'MASSANGO', name: 'Massango' }
      ]
    },
    { code: 'NAM', name: 'Namibe', type: 'province',
      cities: [
        { code: 'NAMIBE', name: 'Namibe' },
        { code: 'TOMBUA', name: 'Tombua' },
        { code: 'BIBALA', name: 'Bibala' },
        { code: 'CAMUCUIO', name: 'Camucuio' },
        { code: 'VIREI', name: 'Virei' }
      ]
    },
    { code: 'CAB', name: 'Cabinda', type: 'province',
      cities: [
        { code: 'CABINDA', name: 'Cabinda' },
        { code: 'BUCCO', name: 'Bucco Zau' },
        { code: 'BELAS', name: 'Belas' },
        { code: 'MUCABA', name: 'Mucaba' },
        { code: 'BETO', name: 'Beto' }
      ]
    },
    { code: 'UIG', name: 'Uíge', type: 'province',
      cities: [
        { code: 'UIGE', name: 'Uíge' },
        { code: 'NEGAGE', name: 'Negage' },
        { code: 'DAMBA', name: 'Damba' },
        { code: 'MAQUENZA', name: 'Maquela do Zombo' },
        { code: 'PURI', name: 'Puri' }
      ]
    },
    { code: 'ZAI', name: 'Zaire', type: 'province',
      cities: [
        { code: 'SOYO', name: 'Soyo' },
        { code: 'MBANZA', name: 'Mbanza Kongo' },
        { code: 'NZETO', name: 'Nzeto' },
        { code: 'CUIMBA', name: 'Cuimba' },
        { code: 'NOQUI', name: 'Noqui' }
      ]
    },
    { code: 'CUN', name: 'Cunene', type: 'province',
      cities: [
        { code: 'ONGIVA', name: 'Ondjiva' },
        { code: 'XANGONGO', name: 'Xangongo' },
        { code: 'CUROCA', name: 'Curoca' },
        { code: 'KUHANGO', name: 'Kuhango' },
        { code: 'NAMACUNDE', name: 'Namacunde' }
      ]
    },
    { code: 'LUN', name: 'Lunda Norte', type: 'province',
      cities: [
        { code: 'DUNDO', name: 'Dundo' },
        { code: 'LUCAPA', name: 'Lucapa' },
        { code: 'CAPEMA', name: 'Capemba' },
        { code: 'CHITTA', name: 'Chitato' },
        { code: 'LOVUA', name: 'Lovua' }
      ]
    },
    { code: 'LUS', name: 'Lunda Sul', type: 'province',
      cities: [
        { code: 'SAURIMO', name: 'Saurimo' },
        { code: 'CACOLO', name: 'Cacolo' },
        { code: 'DALA', name: 'Dala' },
        { code: 'MUKONDA', name: 'Mukonda' },
        { code: 'ALTO', name: 'Alto Chicapa' }
      ]
    },
    { code: 'MOX', name: 'Moxico', type: 'province',
      cities: [
        { code: 'LUENA', name: 'Luena' },
        { code: 'LENDO', name: 'Léua' },
        { code: 'CAMEIA', name: 'Cameia' },
        { code: 'LUACANO', name: 'Luacano' },
        { code: 'BUNDAS', name: 'Bundas' }
      ]
    },
    { code: 'BIE', name: 'Bié', type: 'province',
      cities: [
        { code: 'KUITO', name: 'Kuito' },
        { code: 'CAMACUPA', name: 'Camacupa' },
        { code: 'CATABOLA', name: 'Catabola' },
        { code: 'CHINTEMBO', name: 'Chitembo' },
        { code: 'CUNHINGA', name: 'Cunhinga' }
      ]
    },
    { code: 'NAM', name: 'Cuando Cubango', type: 'province',
      cities: [
        { code: 'MENONGUE', name: 'Menongue' },
        { code: 'RIVUNGO', name: 'Rivungo' },
        { code: 'CUANGAR', name: 'Cuangar' },
        { code: 'CALAI', name: 'Calai' },
        { code: 'MAVINGA', name: 'Mavinga' }
      ]
    },
    { code: 'CAB', name: 'Cuanza Norte', type: 'province',
      cities: [
        { code: 'NDALATANDO', name: 'Ndalatando' },
        { code: 'CAMABATELA', name: 'Cambambe' },
        { code: 'CAZENGO', name: 'Cazengo' },
        { code: 'GOLUNGO', name: 'Golungo' },
        { code: 'SAMBIZANGA', name: 'Sambizanga' }
      ]
    },
    { code: 'CUZ', name: 'Cuanza Sul', type: 'province',
      cities: [
        { code: 'SUMBE', name: 'Sumbe' },
        { code: 'PORTO', name: 'Porto Amboim' },
        { code: 'CASSONGUE', name: 'Cassongue' },
        { code: 'SELES', name: 'Seles' },
        { code: 'LIBONGOS', name: 'Libongos' }
      ]
    }
  ]
};

export default angola;
