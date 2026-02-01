/**
 * Niger country data with regions and cities
 */

import { Country } from './index';

export const niger: Country = {
  code: 'NE',
  name: 'Niger',
  flag: '🇳🇪',
  capital: 'Niamey',
  area: 1267000,
  currencySymbol: 'CFA',
  officialLanguages: ['French'],
  demonym: 'Nigerien',
  taxInfo: { standardRate: 19, taxName: 'VAT', currency: 'XOF', region: 'MEA' },
  divisions: [
    { code: 'AGA', name: 'Agadez', type: 'region',
      cities: [
        { code: 'AGADEZ', name: 'Agadez' },
        { code: 'ARLIT', name: 'Arlit' },
        { code: 'BILMA', name: 'Bilma' },
        { code: 'DIRKOU', name: 'Dirkou' },
        { code: 'IFEROUANE', name: 'Iferouane' }
      ]
    },
    { code: 'DIF', name: 'Diffa', type: 'region',
      cities: [
        { code: 'DIFFA', name: 'Diffa' },
        { code: 'MAINE', name: 'Maine-Soroa' },
        { code: 'NGUIGMI', name: 'Nguigmi' },
        { code: 'BOSO', name: 'Boso' },
        { code: 'GUE', name: 'Gue' }
      ]
    },
    { code: 'DOS', name: 'Dosso', type: 'region',
      cities: [
        { code: 'DOSSO', name: 'Dosso' },
        { code: 'LOGA', name: 'Loga' },
        { code: 'TILLABERI', name: 'Tillabéri' },
        { code: 'FILINGUE', name: 'Filingue' },
        { code: 'BOUKO', name: 'Boukou' }
      ]
    },
    { code: 'MAR', name: 'Maradi', type: 'region',
      cities: [
        { code: 'MARADI', name: 'Maradi' },
        { code: 'TCHADOUA', name: 'Tchadoua' },
        { code: 'GUIDAN', name: 'Guidan Roumdji' },
        { code: 'MADE', name: 'Made' },
        { code: 'MADAROUNFA', name: 'Madarounfa' }
      ]
    },
    { code: 'TAH', name: 'Tahoua', type: 'region',
      cities: [
        { code: 'TAHOUA', name: 'Tahoua' },
        { code: 'MADAOUA', name: 'Madaoua' },
        { code: 'BIRNI', name: 'Birni N Konni' },
        { code: 'BOUKO', name: 'Boukou' },
        { code: 'ILLÉLA', name: 'Illéla' }
      ]
    },
    { code: 'TIL', name: 'Tillabéri', type: 'region',
      cities: [
        { code: 'TILLABERI', name: 'Tillabéri' },
        { code: 'NIAMEY', name: 'Niamey' },
        { code: 'FILINGUE', name: 'Filingue' },
        { code: 'KOLLO', name: 'Kollo' },
        { code: 'AYOROU', name: 'Ayorou' }
      ]
    },
    { code: 'ZIN', name: 'Zinder', type: 'region',
      cities: [
        { code: 'ZINDER', name: 'Zinder' },
        { code: 'MIRRIAH', name: 'Mirriah' },
        { code: 'MATAMEYE', name: 'Matameye' },
        { code: 'GOURÉ', name: 'Gouré' },
        { code: 'TANOUT', name: 'Tanout' }
      ]
    },
    { code: 'NIA', name: 'Niamey', type: 'district',
      cities: [
        { code: 'NIAMEY', name: 'Niamey' },
        { code: 'KOLLO', name: 'Kollo' },
        { code: 'LIBORE', name: 'Libore' },
        { code: 'YOURI', name: 'Youri' },
        { code: 'NIGER', name: 'Niger' }
      ]
    }
  ]
};

export default niger;
