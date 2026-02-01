/**
 * Benin country data with departments and cities
 */

import { Country } from './index';

export const benin: Country = {
  code: 'BJ',
  name: 'Benin',
  flag: '🇧🇯',
  capital: 'Porto-Novo',
  area: 114763,
  currencySymbol: 'CFA',
  officialLanguages: ['French'],
  demonym: 'Beninese',
  taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'XOF', region: 'MEA' },
  divisions: [
    { code: 'ALI', name: 'Alibori', type: 'department',
      cities: [
        { code: 'KANDI', name: 'Kandi' },
        { code: 'MALANVILLE', name: 'Malanville' },
        { code: 'BANIKOARA', name: 'Banikoara' },
        { code: 'KARIMAMA', name: 'Karimama' },
        { code: 'SEGBANA', name: 'Segbana' }
      ]
    },
    { code: 'ATA', name: 'Atacora', type: 'department',
      cities: [
        { code: 'NATITINGOU', name: 'Natitingou' },
        { code: 'DJUGOU', name: 'Djougou' },
        { code: 'KOUANDE', name: 'Kouandé' },
        { code: 'PEHUNCO', name: 'Pehunco' },
        { code: 'TANGUIETA', name: 'Tanguiéta' }
      ]
    },
    { code: 'ATL', name: 'Atlantique', type: 'department',
      cities: [
        { code: 'ABOMEY', name: 'Abomey-Calavi' },
        { code: 'ALLADA', name: 'Allada' },
        { code: 'OUIDAH', name: 'Ouidah' },
        { code: 'SODOME', name: 'Sô-Ava' },
        { code: 'TORI', name: 'Tori-Bossito' }
      ]
    },
    { code: 'BOR', name: 'Borgou', type: 'department',
      cities: [
        { code: 'PARAKOU', name: 'Parakou' },
        { code: 'DJEREMI', name: 'Djèrèmi' },
        { code: 'KALALE', name: 'Kalalé' },
        { code: 'NDA', name: 'N\'Dali' },
        { code: 'PERERE', name: 'Pèrèrè' }
      ]
    },
    { code: 'COL', name: 'Collines', type: 'department',
      cities: [
        { code: 'SAVALOU', name: 'Savalou' },
        { code: 'DASSA', name: 'Dassa-Zoumé' },
        { code: 'GLAZOUE', name: 'Glazoué' },
        { code: 'BANTE', name: 'Bantè' },
        { code: 'DASSA', name: 'Dassa' }
      ]
    },
    { code: 'COU', name: 'Couffo', type: 'department',
      cities: [
        { code: 'LOKOSSA', name: 'Lokossa' },
        { code: 'DOGBO', name: 'Dogbo-Tota' },
        { code: 'KLUE', name: 'Klouékanmè' },
        { code: 'LALO', name: 'Lalo' },
        { code: 'TOME', name: 'Toviklin' }
      ]
    },
    { code: 'DONG', name: 'Donga', type: 'department',
      cities: [
        { code: 'DJUGOU', name: 'Djougou' },
        { code: 'BASSILA', name: 'Bassila' },
        { code: 'COBLY', name: 'Cobly' },
        { code: 'BOUCOMBE', name: 'Boukoumbé' },
        { code: 'KOPARGO', name: 'Kopargo' }
      ]
    },
    { code: 'LIT', name: 'Littoral', type: 'department',
      cities: [
        { code: 'COTONOU', name: 'Cotonou' },
        { code: 'ABOMEY', name: 'Abomey-Calavi' },
        { code: 'PORTO', name: 'Porto-Novo' },
        { code: 'SODOME', name: 'Sô-Ava' },
        { code: 'COTONOU', name: 'Cotonou' }
      ]
    },
    { code: 'MON', name: 'Mono', type: 'department',
      cities: [
        { code: 'LOKOSSA', name: 'Lokossa' },
        { code: 'ATHIEME', name: 'Athiémé' },
        { code: 'BANTO', name: 'Bantè' },
        { code: 'COMA', name: 'Comé' },
        { code: 'GRAND', name: 'Grand-Popo' }
      ]
    },
    { code: 'OU', name: 'Ouémé', type: 'department',
      cities: [
        { code: 'PORTO', name: 'Porto-Novo' },
        { code: 'ADJA', name: 'Adja-Ouèrè' },
        { code: 'AGUE', name: 'Adjarra' },
        { code: 'AKPRO', name: 'Akpro-Missérété' },
        { code: 'AVRANKOU', name: 'Avrankou' }
      ]
    },
    { code: 'PLA', name: 'Plateau', type: 'department',
      cities: [
        { code: 'SAKETE', name: 'Sakété' },
        { code: 'KETOU', name: 'Kétou' },
        { code: 'POBE', name: 'Pobè' },
        { code: 'ADJA', name: 'Adja-Ouèrè' },
        { code: 'IFANGNI', name: 'Ifangni' }
      ]
    },
    { code: 'ZOU', name: 'Zou', type: 'department',
      cities: [
        { code: 'ABOMEY', name: 'Abomey' },
        { code: 'BOHICON', name: 'Bohicon' },
        { code: 'Cove', name: 'Covè' },
        { code: 'DJIDJA', name: 'Djidja' },
        { code: 'OUINHI', name: 'Ouinhi' }
      ]
    }
  ]
};

export default benin;
