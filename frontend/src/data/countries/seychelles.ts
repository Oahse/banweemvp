/**
 * Seychelles country data with islands and cities
 */

import { Country } from './index';

export const seychelles: Country = {
  code: 'SC',
  name: 'Seychelles',
  flag: '🇸🇨',
  capital: 'Victoria',
  area: 459,
  currencySymbol: 'SCR',
  officialLanguages: ['Seychello Creole', 'English', 'French'],
  demonym: 'Seychellois',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'USD', region: 'MEA' },
  divisions: [
    { code: 'MAH', name: 'Mahé', type: 'island',
      cities: [
        { code: 'VICTORIA', name: 'Victoria' },
        { code: 'BEAU', name: 'Beau Vallon' },
        { code: 'BEL', name: 'Bel Ombre' },
        { code: 'PORT', name: 'Port Glaud' },
        { code: 'TAKAMAKA', name: 'Takamaka' }
      ]
    },
    { code: 'PRAS', name: 'Praslin', type: 'island',
      cities: [
        { code: 'BAIE', name: 'Baie Sainte Anne' },
        { code: 'GRAND', name: 'Grand Anse' },
        { code: 'CURIEUSE', name: 'Curieuse' },
        { code: 'LA', name: 'La Digue' },
        { code: 'COUR', name: 'Cousin Island' }
      ]
    },
    { code: 'LA', name: 'La Digue', type: 'island',
      cities: [
        { code: 'LA', name: 'La Passe' },
        { code: 'GRAND', name: 'Grand Anse' },
        { code: 'ANSE', name: 'Anse Royale' },
        { code: 'BAIE', name: 'Baie Sainte Anne' },
        { code: 'CURIEUSE', name: 'Curieuse' }
      ]
    },
    { code: 'SIL', name: 'Silhouette', type: 'island',
      cities: [
        { code: 'LA', name: 'La Passe' },
        { code: 'GRAND', name: 'Grand Anse' },
        { code: 'ANSE', name: 'Anse Royale' },
        { code: 'BAIE', name: 'Baie Sainte Anne' },
        { code: 'CURIEUSE', name: 'Curieuse' }
      ]
    }
  ]
};

export default seychelles;
