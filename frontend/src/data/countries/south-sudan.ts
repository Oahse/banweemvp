/**
 * South Sudan country data with regions, cities, and tax information
 */

import { Country } from './index';

export const southSudan: Country = {
    code: 'SS',
    name: 'South Sudan',
    taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'SSP', region: 'MEA' },
    provinces: [
      { code: 'JUB', name: 'Jubek',
        cities: [
          { code: 'JUB', name: 'Juba' },
          { code: 'YEI', name: 'Yei' },
          { code: 'MOR', name: 'Moro' },
          { code: 'KAY', name: 'Kaya' },
          { code: 'LASU', name: 'Lasu' },
          { code: 'MUN', name: 'Mundri' },
          { code: 'TAL', name: 'Tali' },
          { code: 'TERE', name: 'Terekeka' },
          { code: 'LOK', name: 'Lokiliri' },
          { code: 'WOND', name: 'Wonduruba' }
        ]
      },
      { code: 'EQU', name: 'Equatoria',
        cities: [
          { code: 'TOR', name: 'Torit' },
          { code: 'KAP', name: 'Kapoeta' },
          { code: 'IKO', name: 'Ikotos' },
          { code: 'MAG', name: 'Magwi' },
          { code: 'NIM', name: 'Nimule' },
          { code: 'PAL', name: 'Paloch' },
          { code: 'PAR', name: 'Parjok' },
          { code: 'KIN', name: 'Kinyeti' },
          { code: 'LOD', name: 'Lodwar' },
          { code: 'NAR', name: 'Narus' }
        ]
      },
      { code: 'UPP', name: 'Upper Nile',
        cities: [
          { code: 'MAL', name: 'Malakal' },
          { code: 'REN', name: 'Renk' },
          { code: 'MEL', name: 'Melut' },
          { code: 'FASH', name: 'Fashoda' },
          { code: 'BAL', name: 'Baliet' },
          { code: 'PANY', name: 'Panyikang' },
          { code: 'MAB', name: 'Maban' },
          { code: 'LONG', name: 'Longechuk' },
          { code: 'MAW', name: 'Mawei' },
          { code: 'WAD', name: 'Wadakona' }
        ]
      },
      { code: 'BAR', name: 'Bahr el Ghazal',
        cities: [
          { code: 'WAU', name: 'Wau' },
          { code: 'AW', name: 'Aweil' },
          { code: 'RUM', name: 'Rumbek' },
          { code: 'KUA', name: 'Kuajok' },
          { code: 'TONJ', name: 'Tonj' },
          { code: 'GOG', name: 'Gogrial' },
          { code: 'YI', name: 'Yirol' },
          { code: 'RAG', name: 'Raga' },
          { code: 'MAJ', name: 'Majak' },
          { code: 'ABU', name: 'Abiem' }
        ]
      },
      { code: 'NBE', name: 'Northern Bahr el Ghazal',
        cities: [
          { code: 'AW', name: 'Aweil' },
          { code: 'MAJ', name: 'Majak' },
          { code: 'ABU', name: 'Abiem' },
          { code: 'MALA', name: 'Malual' },
          { code: 'GEM', name: 'Gemma' },
          { code: 'ARO', name: 'Aroyo' },
          { code: 'WUN', name: 'Wunpou' },
          { code: 'NYA', name: 'Nyamlel' },
          { code: 'GOG2', name: 'Gogrial' },
          { code: 'TONJ2', name: 'Tonj' }
        ]
      },
      { code: 'WBE', name: 'Western Bahr el Ghazal',
        cities: [
          { code: 'WAU', name: 'Wau' },
          { code: 'RAG', name: 'Raga' },
          { code: 'BAM', name: 'Bamboo' },
          { code: 'DEB', name: 'Deim Zubeir' },
          { code: 'KUJ', name: 'Kujoc' },
          { code: 'NAM', name: 'Nambia' },
          { code: 'BAG', name: 'Baggari' },
          { code: 'BUSA', name: 'Busseri' },
          { code: 'KPA', name: 'Kpagwi' },
          { code: 'BOR', name: 'Bor' }
        ]
      },
      { code: 'LAK', name: 'Lakes',
        cities: [
          { code: 'RUM', name: 'Rumbek' },
          { code: 'YI', name: 'Yirol' },
          { code: 'CUEI', name: 'Cueibet' },
          { code: 'AWA', name: 'Awerial' },
          { code: 'PANY', name: 'Panyijiar' },
          { code: 'GEM2', name: 'Gemma' },
          { code: 'MAT', name: 'Malek' },
          { code: 'KOK', name: 'Kok' },
          { code: 'AL', name: 'Aluakluak' },
          { code: 'PAK', name: 'Pakor' }
        ]
      },
      { code: 'WES', name: 'Western Equatoria',
        cities: [
          { code: 'YAMB', name: 'Yambio' },
          { code: 'MAR', name: 'Maridi' },
          { code: 'TAMB', name: 'Tambura' },
          { code: 'EZO', name: 'Ezo' },
          { code: 'NAG', name: 'Nagero' },
          { code: 'MUND', name: 'Mundri' },
          { code: 'MVO', name: 'Mvolo' },
          { code: 'IBA', name: 'Ibba' },
          { code: 'TAMB2', name: 'Tambura' },
          { code: 'NAZ', name: 'Nazarit' }
        ]
      },
      { code: 'EES', name: 'Eastern Equatoria',
        cities: [
          { code: 'TOR', name: 'Torit' },
          { code: 'KAP', name: 'Kapoeta' },
          { code: 'IKO', name: 'Ikotos' },
          { code: 'MAG', name: 'Magwi' },
          { code: 'NIM', name: 'Nimule' },
          { code: 'PAL', name: 'Paloch' },
          { code: 'PAR', name: 'Parjok' },
          { code: 'KIN', name: 'Kinyeti' },
          { code: 'LOD', name: 'Lodwar' },
          { code: 'NAR', name: 'Narus' }
        ]
      },
      { code: 'JON', name: 'Jonglei',
        cities: [
          { code: 'BOR', name: 'Bor' },
          { code: 'FANG', name: 'Fangak' },
          { code: 'AKO', name: 'Akobo' },
          { code: 'PIB', name: 'Pibor' },
          { code: 'PIG', name: 'Pigi' },
          { code: 'DUK', name: 'Duk' },
          { code: 'TWIC', name: 'Twic' },
          { code: 'BOR2', name: 'Bor' },
          { code: 'AYOD', name: 'Ayod' },
          { code: 'UCH', name: 'Uror' }
        ]
      },
      { code: 'UNITY', name: 'Unity',
        cities: [
          { code: 'BEN', name: 'Bentiu' },
          { code: 'LEER', name: 'Leer' },
          { code: 'KOCH', name: 'Koch' },
          { code: 'MAY', name: 'Mayom' },
          { code: 'RUB', name: 'Rubkona' },
          { code: 'ABYEI', name: 'Abyei' },
          { code: 'PARI', name: 'Pariang' },
          { code: 'GUM', name: 'Gumri' },
          { code: 'MIR', name: 'Mir' },
          { code: 'TOU', name: 'Toukh' }
        ]
      },
      { code: 'WAP', name: 'Warrap',
        cities: [
          { code: 'KUA', name: 'Kuajok' },
          { code: 'TONJ', name: 'Tonj' },
          { code: 'GOG', name: 'Gogrial' },
          { code: 'TWIC', name: 'Twic' },
          { code: 'GOG2', name: 'Gogrial' },
          { code: 'TONJ2', name: 'Tonj' },
          { code: 'KUA2', name: 'Kuajok' },
          { code: 'PAK', name: 'Pakor' },
          { code: 'PAK2', name: 'Pakor' },
          { code: 'GOG3', name: 'Gogrial' }
        ]
      },
      { code: 'NUP', name: 'Nile',
        cities: [
          { code: 'MAL', name: 'Malakal' },
          { code: 'REN', name: 'Renk' },
          { code: 'MEL', name: 'Melut' },
          { code: 'FASH', name: 'Fashoda' },
          { code: 'BAL', name: 'Baliet' },
          { code: 'PANY', name: 'Panyikang' },
          { code: 'MAB', name: 'Maban' },
          { code: 'LONG', name: 'Longechuk' },
          { code: 'MAW', name: 'Mawei' },
          { code: 'WAD', name: 'Wadakona' }
        ]
      }
    ]
  };
