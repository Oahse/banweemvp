/**
 * Congo - Brazzaville country data with departments and cities
 */

import { Country } from './index';

export const congoBrazzaville: Country = {
    code: 'CG',
    name: 'Congo - Brazzaville',
    flag: '🇨🇬',
    capital: 'Brazzaville',
    area: 342000,
    currencySymbol: 'FCFA',
    officialLanguages: ['French'],
    demonym: 'Congolese',
    taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'XAF', region: 'MEA' },
    divisions: [
      { code: 'BRA', name: 'Brazzaville', type: 'department',
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
      { code: 'POI', name: 'Pointe-Noire', type: 'department',
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
      { code: 'CUV', name: 'Cuvette', type: 'department',
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
      { code: 'CUW', name: 'Cuvette-Ouest', type: 'department',
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
      { code: 'KOU', name: 'Kouilou', type: 'department',
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
      { code: 'LIK', name: 'Likouala', type: 'department',
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
      { code: 'NIA', name: 'Niari', type: 'department',
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
      { code: 'PLA', name: 'Plateaux', type: 'department',
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
      { code: 'SAN', name: 'Sangha', type: 'department',
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
      { code: 'BOL', name: 'Bouenza', type: 'department',
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
      { code: 'POO', name: 'Pool', type: 'department',
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
