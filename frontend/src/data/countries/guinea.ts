/**
 * Guinea country data with regions and cities
 */

import { Country } from './index';

export const guinea: Country = {
  code: 'GN',
  name: 'Guinea',
  flag: '🇬🇳',
  capital: 'Conakry',
  area: 245857,
  currencySymbol: 'FG',
  officialLanguages: ['French'],
  demonym: 'Guinean',
  taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'GNF', region: 'MEA' },
  divisions: [
    { code: 'CON', name: 'Conakry', type: 'region',
      cities: [
        { code: 'CONAKRY', name: 'Conakry' },
        { code: 'DIXINN', name: 'Dixinn' },
        { code: 'RATOMA', name: 'Ratoma' },
        { code: 'MATAM', name: 'Matam' },
        { code: 'KALOUM', name: 'Kaloum' }
      ]
    },
    { code: 'BOK', name: 'Boké', type: 'region',
      cities: [
        { code: 'BOKE', name: 'Boké' },
        { code: 'BOFFA', name: 'Boffa' },
        { code: 'FRIA', name: 'Fria' },
        { code: 'KAMSAR', name: 'Kamsar' },
        { code: 'TATA', name: 'Tata' }
      ]
    },
    { code: 'FAR', name: 'Faranah', type: 'region',
      cities: [
        { code: 'FARANAH', name: 'Faranah' },
        { code: 'KISSIDOUGOU', name: 'Kissidougou' },
        { code: 'BANAN', name: 'Banan' },
        { code: 'GUECKEDOU', name: 'Guéckédou' },
        { code: 'MACENTA', name: 'Macenta' }
      ]
    },
    { code: 'KAN', name: 'Kankan', type: 'region',
      cities: [
        { code: 'KANKAN', name: 'Kankan' },
        { code: 'SIGUIRI', name: 'Siguiri' },
        { code: 'KOURA', name: 'Koura' },
        { code: 'MANDIANA', name: 'Mandiana' },
        { code: 'DABOLA', name: 'Dabola' }
      ]
    },
    { code: 'KIN', name: 'Kindia', type: 'region',
      cities: [
        { code: 'KINDIA', name: 'Kindia' },
        { code: 'TELIMELE', name: 'Télimélé' },
        { code: 'FORÉCARIAH', name: 'Forécariah' },
        { code: 'COYAH', name: 'Coyah' },
        { code: 'DUBREKA', name: 'Dubréka' }
      ]
    },
    { code: 'LAB', name: 'Labé', type: 'region',
      cities: [
        { code: 'LABE', name: 'Labé' },
        { code: 'TOUGUE', name: 'Tougué' },
        { code: 'MAMOU', name: 'Mamou' },
        { code: 'DALABA', name: 'Dalaba' },
        { code: 'POITA', name: 'Pita' }
      ]
    },
    { code: 'MAM', name: 'Mamou', type: 'region',
      cities: [
        { code: 'MAMOU', name: 'Mamou' },
        { code: 'DALABA', name: 'Dalaba' },
        { code: 'POITA', name: 'Pita' },
        { code: 'TOUGUE', name: 'Tougué' },
        { code: 'LABE', name: 'Labé' }
      ]
    },
    { code: 'NZE', name: 'Nzérékoré', type: 'region',
      cities: [
        { code: 'NZEREKORE', name: 'Nzérékoré' },
        { code: 'MACENTA', name: 'Macenta' },
        { code: 'GUECKEDOU', name: 'Guéckédou' },
        { code: 'KISSIDOUGOU', name: 'Kissidougou' },
        { code: 'BANAN', name: 'Banan' }
      ]
    }
  ]
};

export default guinea;
