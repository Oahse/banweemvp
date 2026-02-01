/**
 * Gabon country data with provinces and cities
 */

import { Country } from './index';

export const gabon: Country = {
  code: 'GA',
  name: 'Gabon',
  flag: '🇬🇦',
  capital: 'Libreville',
  area: 267667,
  currencySymbol: 'FCFA',
  officialLanguages: ['French'],
  demonym: 'Gabonese',
  taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'XAF', region: 'MEA' },
  divisions: [
    { code: 'LIB', name: 'Estuaire', type: 'province',
      cities: [
        { code: 'LIBREVILLE', name: 'Libreville' },
        { code: 'OWENDO', name: 'Owendo' },
        { code: 'AKANDA', name: 'Akanda' },
        { code: 'NDJOLE', name: 'Ndjolé' },
        { code: 'KANGO', name: 'Kango' }
      ]
    },
    { code: 'HUA', name: 'Haut-Ogooué', type: 'province',
      cities: [
        { code: 'FRANCEVILLE', name: 'Franceville' },
        { code: 'MOANDA', name: 'Moanda' },
        { code: 'MOUNANA', name: 'Mounana' },
        { code: 'BONGOVILLE', name: 'Bongoville' },
        { code: 'LASTOURVILLE', name: 'Lastoursville' }
      ]
    },
    { code: 'MOY', name: 'Moyen-Ogooué', type: 'province',
      cities: [
        { code: 'LAMBARÉNÉ', name: 'Lambaréné' },
        { code: 'NDJOLE', name: 'Ndjolé' },
        { code: 'MOUILA', name: 'Mouila' },
        { code: 'FOUgamou', name: 'Fougamou' },
        { code: 'SINDARA', name: 'Sindara' }
      ]
    },
    { code: 'NGO', name: 'Ngounié', type: 'province',
      cities: [
        { code: 'MOUILA', name: 'Mouila' },
        { code: 'MIMONGO', name: 'Mimongo' },
        { code: 'FOUgamou', name: 'Fougamou' },
        { code: 'LEBAMBA', name: 'Lebamba' },
        { code: 'NDENDÉ', name: 'Ndendé' }
      ]
    },
    { code: 'NYA', name: 'Nyanga', type: 'province',
      cities: [
        { code: 'TCHIBANGA', name: 'Tchibanga' },
        { code: 'MOABI', name: 'Moabi' },
        { code: 'MAYUMBA', name: 'Mayumba' },
        { code: 'BIFOUN', name: 'Bifoun' },
        { code: 'MINVOUL', name: 'Minvoul' }
      ]
    },
    { code: 'OIO', name: 'Ogooué-Ivindo', type: 'province',
      cities: [
        { code: 'MAKOKOU', name: 'Makokou' },
        { code: 'OYO', name: 'Oyo' },
        { code: 'MOUNANA', name: 'Mounana' },
        { code: 'BOUÉ', name: 'Boué' },
        { code: 'OKONDJA', name: 'Okondja' }
      ]
    },
    { code: 'OLO', name: 'Ogooué-Lolo', type: 'province',
      cities: [
        { code: 'KOULAMOUTOU', name: 'Koulamoutou' },
        { code: 'MOULOUNDA', name: 'Mouloundou' },
        { code: 'LASTOURVILLE', name: 'Lastoursville' },
        { code: 'LEBAMBA', name: 'Lebamba' },
        { code: 'NDENDÉ', name: 'Ndendé' }
      ]
    },
    { code: 'OMA', name: 'Ogooué-Maritime', type: 'province',
      cities: [
        { code: 'PORT', name: 'Port-Gentil' },
        { code: 'GAMBELA', name: 'Gambela' },
        { code: 'OYEM', name: 'Oyem' },
        { code: 'BITAM', name: 'Bitam' },
        { code: 'MINVOUL', name: 'Minvoul' }
      ]
    },
    { code: 'WOL', name: 'Woleu-Ntem', type: 'province',
      cities: [
        { code: 'OYEM', name: 'Oyem' },
        { code: 'BITAM', name: 'Bitam' },
        { code: 'MINVOUL', name: 'Minvoul' },
        { code: 'MIZON', name: 'Mizon' },
        { code: 'MEDOUNE', name: 'Medouneu' }
      ]
    }
  ]
};

export default gabon;
