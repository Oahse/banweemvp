/**
 * Ethiopia country data with regional states and chartered cities
 */

import { Country } from './index';

export const ethiopia: Country = {
  code: 'ET',
  name: 'Ethiopia',
  flag: '🇪🇹',
  capital: 'Addis Ababa',
  area: 1104300,
  currencySymbol: 'Br',
  officialLanguages: ['Amharic', 'Oromo', 'Somali', 'Tigrinya'],
  demonym: 'Ethiopian',
  taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'ETB', region: 'MEA' },
  divisions: [
    { code: 'AA', name: 'Addis Ababa', type: 'chartered city',
      cities: [
        { code: 'ADDISABABA', name: 'Addis Ababa' },
        { code: 'BOLE', name: 'Bole' },
        { code: 'KOLFE', name: 'Kolfe Keranio' },
        { code: 'YEKATIT', name: 'Yeka' },
        { code: 'ARADA', name: 'Arada' }
      ]
    },
    { code: 'DD', name: 'Dire Dawa', type: 'chartered city',
      cities: [
        { code: 'DIREDAWA', name: 'Dire Dawa' },
        { code: 'GURAGOLE', name: 'Guragole' },
        { code: 'MULUHARA', name: 'Muluhera' },
        { code: 'GOLI', name: 'Goli' },
        { code: 'GENALE', name: 'Genale' }
      ]
    },
    { code: 'AF', name: 'Afar', type: 'regional state',
      cities: [
        { code: 'SAMARA', name: 'Samara' },
        { code: 'AWASH', name: 'Awash' },
        { code: 'ASAYITA', name: 'Asayita' },
        { code: 'CHIFRA', name: 'Chifra' },
        { code: 'DUBTI', name: 'Dubti' }
      ]
    },
    { code: 'AM', name: 'Amhara', type: 'regional state',
      cities: [
        { code: 'BAHIRDAR', name: 'Bahir Dar' },
        { code: 'GONDAR', name: 'Gondar' },
        { code: 'DEBRE', name: 'Debre Birhan' },
        { code: 'DESE', name: 'Dese' },
        { code: 'WOLDIYA', name: 'Woldiya' }
      ]
    },
    { code: 'BN', name: 'Benishangul-Gumuz', type: 'regional state',
      cities: [
        { code: 'ASOSA', name: 'Asosa' },
        { code: 'KAMASHI', name: 'Kamashi' },
        { code: 'PANGALE', name: 'Pangale' },
        { code: 'BULAN', name: 'Bulan' },
        { code: 'MANDEKA', name: 'Mandeka' }
      ]
    },
    { code: 'GG', name: 'Gambela', type: 'regional state',
      cities: [
        { code: 'GAMBELA', name: 'Gambela' },
        { code: 'ANGO', name: 'Anglo' },
        { code: 'GOG', name: 'Gog' },
        { code: 'DIMA', name: 'Dima' },
        { code: 'WORE', name: 'Wore' }
      ]
    },
    { code: 'HA', name: 'Harari', type: 'regional state',
      cities: [
        { code: 'HARAR', name: 'Harar' },
        { code: 'AWUBAR', name: 'Awubar' },
        { code: 'BEDENO', name: 'Bede' },
        { code: 'GURSUM', name: 'Gursum' },
        { code: 'FUGIS', name: 'Fugis' }
      ]
    },
    { code: 'OR', name: 'Oromia', type: 'regional state',
      cities: [
        { code: 'ADAMA', name: 'Adama' },
        { code: 'JIMMA', name: 'Jimma' },
        { code: 'NAZRET', name: 'Nazret' },
        { code: 'SHASHAMENE', name: 'Shashamene' },
        { code: 'NEGELE', name: 'Negele' }
      ]
    },
    { code: 'SN', name: 'Southern Nations', type: 'regional state',
      cities: [
        { code: 'HAWASSA', name: 'Hawassa' },
        { code: 'ARBA', name: 'Arba Minch' },
        { code: 'WOLAYITA', name: 'Wolaita' },
        { code: 'SIDAMA', name: 'Sidama' },
        { code: 'GAMO', name: 'Gamo' }
      ]
    },
    { code: 'SO', name: 'Somali', type: 'regional state',
      cities: [
        { code: 'JIGJIGA', name: 'Jigjiga' },
        { code: 'DEGEHABUR', name: 'Degehabur' },
        { code: 'GODE', name: 'Gode' },
        { code: 'KEBRIDEHAR', name: 'Kebri Dehar' },
        { code: 'SHINILE', name: 'Shinile' }
      ]
    },
    { code: 'TG', name: 'Tigray', type: 'regional state',
      cities: [
        { code: 'MEKELE', name: 'Mekelle' },
        { code: 'ADIGRAT', name: 'Adigrat' },
        { code: 'AXUM', name: 'Axum' },
        { code: 'SHIRE', name: 'Shire' },
        { code: 'ALAMATA', name: 'Alamata' }
      ]
    }
  ]
};
