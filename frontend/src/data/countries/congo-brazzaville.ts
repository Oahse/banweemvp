/**
 * Congo - Brazzaville country data with departments, cities, and tax information
 */

import { Country } from './index';

export const congoBrazzaville: Country = {
    code: 'CG',
    name: 'Congo - Brazzaville',
    taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'XAF', region: 'MEA' },
    provinces: [
      { code: 'BRA', name: 'Brazzaville',
        cities: [
          { code: 'BRA', name: 'Brazzaville' },
          { code: 'BAM', name: 'Bamako' },
          { code: 'KIN', name: 'Kinshasa' },
          { code: 'POI', name: 'Pointe-Noire' },
          { code: 'DOL', name: 'Dolisie' },
          { code: 'NKA', name: 'Nkayi' },
          { code: 'MAD', name: 'Madingou' },
          { code: 'MOU', name: 'Mouyondzi' },
          { code: 'GAMB', name: 'Gamboma' },
          { code: 'KEL', name: 'Kellé' }
        ]
      },
      { code: 'POI', name: 'Pointe-Noire',
        cities: [
          { code: 'POI', name: 'Pointe-Noire' },
          { code: 'LOAN', name: 'Loango' },
          { code: 'MIND', name: 'Mindouli' },
          { code: 'MOUT', name: 'Moutamba' },
          { code: 'TCHI', name: 'Tchikamba' },
          { code: 'BAM', name: 'Bamako' },
          { code: 'KIN', name: 'Kinshasa' },
          { code: 'DOL', name: 'Dolisie' },
          { code: 'NKA', name: 'Nkayi' },
          { code: 'MAD', name: 'Madingou' }
        ]
      },
      { code: 'CUV', name: 'Cuvette',
        cities: [
          { code: 'OWA', name: 'Owando' },
          { code: 'MAK', name: 'Makoua' },
          { code: 'BOK', name: 'Bokoro' },
          { code: 'NGO', name: 'Ngoko' },
          { code: 'BEM', name: 'Bembé' },
          { code: 'MOS', name: 'Mosaka' },
          { code: 'OKO', name: 'Okoyo' },
          { code: 'SAB', name: 'Sangha' },
          { code: 'BAM', name: 'Bamako' },
          { code: 'KIN', name: 'Kinshasa' }
        ]
      },
      { code: 'CUW', name: 'Cuvette-Ouest',
        cities: [
          { code: 'EWO', name: 'Ewo' },
          { code: 'KEB', name: 'Kellé' },
          { code: 'MAD', name: 'Madingou' },
          { code: 'MOU', name: 'Mouyondzi' },
          { code: 'GAMB', name: 'Gamboma' },
          { code: 'BAM', name: 'Bamako' },
          { code: 'KIN', name: 'Kinshasa' },
          { code: 'POI', name: 'Pointe-Noire' },
          { code: 'DOL', name: 'Dolisie' },
          { code: 'NKA', name: 'Nkayi' }
        ]
      },
      { code: 'KOU', name: 'Kouilou',
        cities: [
          { code: 'LOU', name: 'Loukoléla' },
          { code: 'BAM', name: 'Bamako' },
          { code: 'KIN', name: 'Kinshasa' },
          { code: 'POI', name: 'Pointe-Noire' },
          { code: 'DOL', name: 'Dolisie' },
          { code: 'NKA', name: 'Nkayi' },
          { code: 'MAD', name: 'Madingou' },
          { code: 'MOU', name: 'Mouyondzi' },
          { code: 'GAMB', name: 'Gamboma' },
          { code: 'KEL', name: 'Kellé' }
        ]
      },
      { code: 'LIK', name: 'Likouala',
        cities: [
          { code: 'IMP', name: 'Impfondo' },
          { code: 'BET', name: 'Bétou' },
          { code: 'BOL', name: 'Bolobo' },
          { code: 'DJOU', name: 'Djoué' },
          { code: 'ENY', name: 'Enyellé' },
          { code: 'EP', name: 'Epéna' },
          { code: 'MONG', name: 'Mongala' },
          { code: 'BAM', name: 'Bamako' },
          { code: 'KIN', name: 'Kinshasa' },
          { code: 'POI', name: 'Pointe-Noire' }
        ]
      },
      { code: 'NIA', name: 'Niari',
        cities: [
          { code: 'DOL', name: 'Dolisie' },
          { code: 'NKA', name: 'Nkayi' },
          { code: 'MAD', name: 'Madingou' },
          { code: 'MOU', name: 'Mouyondzi' },
          { code: 'GAMB', name: 'Gamboma' },
          { code: 'BAM', name: 'Bamako' },
          { code: 'KIN', name: 'Kinshasa' },
          { code: 'POI', name: 'Pointe-Noire' },
          { code: 'BRA', name: 'Brazzaville' },
          { code: 'LOAN', name: 'Loango' }
        ]
      },
      { code: 'PLA', name: 'Plateaux',
        cities: [
          { code: 'DJAM', name: 'Djambala' },
          { code: 'GAMB', name: 'Gamboma' },
          { code: 'KEL', name: 'Kellé' },
          { code: 'MAD', name: 'Madingou' },
          { code: 'MOU', name: 'Mouyondzi' },
          { code: 'BAM', name: 'Bamako' },
          { code: 'KIN', name: 'Kinshasa' },
          { code: 'POI', name: 'Pointe-Noire' },
          { code: 'DOL', name: 'Dolisie' },
          { code: 'NKA', name: 'Nkayi' }
        ]
      },
      { code: 'SAN', name: 'Sangha',
        cities: [
          { code: 'OU', name: 'Ouésso' },
          { code: 'MOK', name: 'Mokéko' },
          { code: 'SAB', name: 'Sangha' },
          { code: 'BEM', name: 'Bembé' },
          { code: 'MOS', name: 'Mosaka' },
          { code: 'OKO', name: 'Okoyo' },
          { code: 'BAM', name: 'Bamako' },
          { code: 'KIN', name: 'Kinshasa' },
          { code: 'POI', name: 'Pointe-Noire' },
          { code: 'DOL', name: 'Dolisie' }
        ]
      },
      { code: 'BOL', name: 'Bouenza',
        cities: [
          { code: 'MAD', name: 'Madingou' },
          { code: 'MOU', name: 'Mouyondzi' },
          { code: 'GAMB', name: 'Gamboma' },
          { code: 'KEL', name: 'Kellé' },
          { code: 'BAM', name: 'Bamako' },
          { code: 'KIN', name: 'Kinshasa' },
          { code: 'POI', name: 'Pointe-Noire' },
          { code: 'DOL', name: 'Dolisie' },
          { code: 'NKA', name: 'Nkayi' },
          { code: 'BRA', name: 'Brazzaville' }
        ]
      },
      { code: 'POO', name: 'Pool',
        cities: [
          { code: 'KIN', name: 'Kinkala' },
          { code: 'BAM', name: 'Bamako' },
          { code: 'KIN2', name: 'Kinshasa' },
          { code: 'POI', name: 'Pointe-Noire' },
          { code: 'DOL', name: 'Dolisie' },
          { code: 'NKA', name: 'Nkayi' },
          { code: 'MAD', name: 'Madingou' },
          { code: 'MOU', name: 'Mouyondzi' },
          { code: 'GAMB', name: 'Gamboma' },
          { code: 'KEL', name: 'Kellé' }
        ]
      }
    ]
  };
