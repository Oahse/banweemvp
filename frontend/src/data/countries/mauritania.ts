/**
 * Mauritania country data with regions and cities
 */

import { Country } from './index';

export const mauritania: Country = {
  code: 'MR',
  name: 'Mauritania',
  flag: '🇲🇷',
  capital: 'Nouakchott',
  area: 1030700,
  currencySymbol: 'UM',
  officialLanguages: ['Arabic'],
  demonym: 'Mauritanian',
  taxInfo: { standardRate: 16, taxName: 'VAT', currency: 'MRU', region: 'MEA' },
  divisions: [
    { code: 'NOU', name: 'Nouakchott', type: 'region',
      cities: [
        { code: 'NOUAKCHOTT', name: 'Nouakchott' },
        { code: 'NOUADHIBOU', name: 'Nouadhibou' },
        { code: 'ATAR', name: 'Atar' },
        { code: 'ROSO', name: 'Rosso' },
        { code: 'KAEDI', name: 'Kaedi' }
      ]
    },
    { code: 'AD', name: 'Adrar', type: 'region',
      cities: [
        { code: 'ATAR', name: 'Atar' },
        { code: 'CHINGUITTI', name: 'Chinguetti' },
        { code: 'OUADANE', name: 'Ouadane' },
        { code: 'OUJFERT', name: 'Oujfert' },
        { code: 'TERJIT', name: 'Terjit' }
      ]
    },
    { code: 'ASS', name: 'Assaba', type: 'region',
      cities: [
        { code: 'KIFFA', name: 'Kiffa' },
        { code: 'KAEDI', name: 'Kaedi' },
        { code: 'ROSO', name: 'Rosso' },
        { code: 'NOUAKCHOTT', name: 'Nouakchott' },
        { code: 'NOUADHIBOU', name: 'Nouadhibou' }
      ]
    },
    { code: 'BRA', name: 'Brakna', type: 'region',
      cities: [
        { code: 'ALEG', name: 'Aleg' },
        { code: 'MAGTA', name: 'Magta Lehjel' },
        { code: 'BOUTILIMIT', name: 'Boutilimit' },
        { code: 'KAEDI', name: 'Kaedi' },
        { code: 'ROSO', name: 'Rosso' }
      ]
    },
    { code: 'DAR', name: 'Dakhlet Nouadhibou', type: 'region',
      cities: [
        { code: 'NOUADHIBOU', name: 'Nouadhibou' },
        { code: 'CHAMI', name: 'Chami' },
        { code: 'ARGUIN', name: 'Arguin' },
        { code: 'IJKILANE', name: 'Ijkilane' },
        { code: 'TICHIT', name: 'Tichit' }
      ]
    },
    { code: 'GOR', name: 'Gorgol', type: 'region',
      cities: [
        { code: 'KAEDI', name: 'Kaedi' },
        { code: 'ROSO', name: 'Rosso' },
        { code: 'NOUAKCHOTT', name: 'Nouakchott' },
        { code: 'NOUADHIBOU', name: 'Nouadhibou' },
        { code: 'ATAR', name: 'Atar' }
      ]
    },
    { code: 'GUI', name: 'Guidimaka', type: 'region',
      cities: [
        { code: 'SELIBABY', name: 'Sélibaby' },
        { code: 'OUALATA', name: 'Oualata' },
        { code: 'TICHIT', name: 'Tichit' },
        { code: 'IJKILANE', name: 'Ijkilane' },
        { code: 'ARGUIN', name: 'Arguin' }
      ]
    },
    { code: 'HOD', name: 'Hodh Ech Chargui', type: 'region',
      cities: [
        { code: 'NEMA', name: 'Néma' },
        { code: 'TICHIT', name: 'Tichit' },
        { code: 'OUALATA', name: 'Oualata' },
        { code: 'SELIBABY', name: 'Sélibaby' },
        { code: 'ARGUIN', name: 'Arguin' }
      ]
    },
    { code: 'HOD', name: 'Hodh El Gharbi', type: 'region',
      cities: [
        { code: 'AYOUN', name: 'Ayoun el Atrouss' },
        { code: 'TICHIT', name: 'Tichit' },
        { code: 'OUALATA', name: 'Oualata' },
        { code: 'SELIBABY', name: 'Sélibaby' },
        { code: 'NEMA', name: 'Néma' }
      ]
    },
    { code: 'INC', name: 'Inchiri', type: 'region',
      cities: [
        { code: 'AKJOUJT', name: 'Akjoujt' },
        { code: 'ATAR', name: 'Atar' },
        { code: 'CHINGUITTI', name: 'Chinguetti' },
        { code: 'OUADANE', name: 'Ouadane' },
        { code: 'OUJFERT', name: 'Oujfert' }
      ]
    },
    { code: 'TAG', name: 'Tagant', type: 'region',
      cities: [
        { code: 'TIDJIKJA', name: 'Tidjikja' },
        { code: 'TICHIT', name: 'Tichit' },
        { code: 'OUALATA', name: 'Oualata' },
        { code: 'SELIBABY', name: 'Sélibaby' },
        { code: 'ARGUIN', name: 'Arguin' }
      ]
    },
    { code: 'TRA', name: 'Trarza', type: 'region',
      cities: [
        { code: 'ROSO', name: 'Rosso' },
        { code: 'NOUAKCHOTT', name: 'Nouakchott' },
        { code: 'NOUADHIBOU', name: 'Nouadhibou' },
        { code: 'ATAR', name: 'Atar' },
        { code: 'KAEDI', name: 'Kaedi' }
      ]
    },
    { code: 'TIR', name: 'Tiris Zemmour', type: 'region',
      cities: [
        { code: 'ZOUERAT', name: 'Zouérat' },
        { code: 'FDERIK', name: 'Fderîck' },
        { code: 'BIR', name: 'Bir Moghrein' },
        { code: 'ARGUIN', name: 'Arguin' },
        { code: 'CHAMI', name: 'Chami' }
      ]
    }
  ]
};

export default mauritania;
