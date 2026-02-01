/**
 * Seychelles country data with regions, cities, and tax information
 */

import { Country } from './index';

export const seychelles: Country = {
    code: 'SC',
    name: 'Seychelles',
    taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'SCR', region: 'MEA' },
    provinces: [
      { code: 'MAH', name: 'Mahé',
        cities: [
          { code: 'VIC', name: 'Victoria' },
          { code: 'BEAU', name: 'Beau Vallon' },
          { code: 'ANSE', name: 'Anse Royale' },
          { code: 'BEL', name: 'Bel Air' },
          { code: 'CAP', name: 'Cap Ternay' },
          { code: 'ANSE2', name: 'Anse Etoile' },
          { code: 'ANSE3', name: 'Anse Intendance' },
          { code: 'ANSE4', name: 'Anse Boileau' },
          { code: 'ANSE5', name: 'Anse La Blague' },
          { code: 'ANSE6', name: 'Anse Possession' }
        ]
      },
      { code: 'PRAS', name: 'Praslin',
        cities: [
          { code: 'BAIE', name: 'Baie Sainte Anne' },
          { code: 'GRAN', name: 'Grand Anse' },
          { code: 'CUR', name: 'Curieuse' },
          { code: 'ANSE', name: 'Anse Volbert' },
          { code: 'ANSE2', name: 'Anse Takamaka' },
          { code: 'ANSE3', name: 'Anse Bouchon' },
          { code: 'ANSE4', name: 'Anse Marie Louise' },
          { code: 'ANSE5', name: 'Anse Lazio' },
          { code: 'ANSE6', name: 'Anse Georgette' },
          { code: 'ANSE7', name: 'Anse La Blague' }
        ]
      },
      { code: 'LA', name: 'La Digue',
        cities: [
          { code: 'LA', name: 'La Passe' },
          { code: 'GRAN', name: 'Grand Anse' },
          { code: 'ANSE', name: 'Anse Seche' },
          { code: 'ANSE2', name: 'Anse Patate' },
          { code: 'ANSE3', name: 'Anse Quatre' },
          { code: 'ANSE4', name: 'Anse La Blague' },
          { code: 'ANSE5', name: 'Anse Possession' },
          { code: 'ANSE6', name: 'Anse Georgette' },
          { code: 'ANSE7', name: 'Anse Lazio' },
          { code: 'ANSE8', name: 'Anse Marie Louise' }
        ]
      },
      { code: 'SIL', name: 'Silhouette',
        cities: [
          { code: 'LA', name: 'La Passe' },
          { code: 'GRAN', name: 'Grand Anse' },
          { code: 'ANSE', name: 'Anse Seche' },
          { code: 'ANSE2', name: 'Anse Patate' },
          { code: 'ANSE3', name: 'Anse Quatre' },
          { code: 'ANSE4', name: 'Anse La Blague' },
          { code: 'ANSE5', name: 'Anse Possession' },
          { code: 'ANSE6', name: 'Anse Georgette' },
          { code: 'ANSE7', name: 'Anse Lazio' },
          { code: 'ANSE8', name: 'Anse Marie Louise' }
        ]
      },
      { code: 'BAY', name: 'Bay',
        cities: [
          { code: 'BAIE', name: 'Baie Sainte Anne' },
          { code: 'GRAN', name: 'Grand Anse' },
          { code: 'CUR', name: 'Curieuse' },
          { code: 'ANSE', name: 'Anse Volbert' },
          { code: 'ANSE2', name: 'Anse Takamaka' },
          { code: 'ANSE3', name: 'Anse Bouchon' },
          { code: 'ANSE4', name: 'Anse Marie Louise' },
          { code: 'ANSE5', name: 'Anse Lazio' },
          { code: 'ANSE6', name: 'Anse Georgette' },
          { code: 'ANSE7', name: 'Anse La Blague' }
        ]
      },
      { code: 'CUR', name: 'Curieuse',
        cities: [
          { code: 'CUR', name: 'Curieuse' },
          { code: 'BAIE', name: 'Baie Sainte Anne' },
          { code: 'GRAN', name: 'Grand Anse' },
          { code: 'ANSE', name: 'Anse Volbert' },
          { code: 'ANSE2', name: 'Anse Takamaka' },
          { code: 'ANSE3', name: 'Anse Bouchon' },
          { code: 'ANSE4', name: 'Anse Marie Louise' },
          { code: 'ANSE5', name: 'Anse Lazio' },
          { code: 'ANSE6', name: 'Anse Georgette' },
          { code: 'ANSE7', name: 'Anse La Blague' }
        ]
      },
      { code: 'COET', name: 'Coetivy',
        cities: [
          { code: 'COE', name: 'Coetivy' },
          { code: 'PONT', name: 'Pointe au Sel' },
          { code: 'POIN', name: 'Pointe au Sel' },
          { code: 'ANSE', name: 'Anse Volbert' },
          { code: 'ANSE2', name: 'Anse Takamaka' },
          { code: 'ANSE3', name: 'Anse Bouchon' },
          { code: 'ANSE4', name: 'Anse Marie Louise' },
          { code: 'ANSE5', name: 'Anse Lazio' },
          { code: 'ANSE6', name: 'Anse Georgette' },
          { code: 'ANSE7', name: 'Anse La Blague' }
        ]
      },
      { code: 'DEN', name: 'Denis',
        cities: [
          { code: 'DEN', name: 'Denis Island' },
          { code: 'POIN', name: 'Pointe au Sel' },
          { code: 'ANSE', name: 'Anse Volbert' },
          { code: 'ANSE2', name: 'Anse Takamaka' },
          { code: 'ANSE3', name: 'Anse Bouchon' },
          { code: 'ANSE4', name: 'Anse Marie Louise' },
          { code: 'ANSE5', name: 'Anse Lazio' },
          { code: 'ANSE6', name: 'Anse Georgette' },
          { code: 'ANSE7', name: 'Anse La Blague' }
        ]
      },
      { code: 'BIRD', name: 'Bird Island',
        cities: [
          { code: 'BIR', name: 'Bird Island' },
          { code: 'POIN', name: 'Pointe au Sel' },
          { code: 'ANSE', name: 'Anse Volbert' },
          { code: 'ANSE2', name: 'Anse Takamaka' },
          { code: 'ANSE3', name: 'Anse Bouchon' },
          { code: 'ANSE4', name: 'Anse Marie Louise' },
          { code: 'ANSE5', name: 'Anse Lazio' },
          { code: 'ANSE6', name: 'Anse Georgette' },
          { code: 'ANSE7', name: 'Anse La Blague' }
        ]
      },
      { code: 'ALD', name: 'Aldabra',
        cities: [
          { code: 'ALD', name: 'Aldabra' },
          { code: 'ASS', name: 'Assumption' },
          { code: 'AST', name: 'Astove' },
          { code: 'POI', name: 'Pointe au Sel' },
          { code: 'ANSE', name: 'Anse Volbert' },
          { code: 'ANSE2', name: 'Anse Takamaka' },
          { code: 'ANSE3', name: 'Anse Bouchon' },
          { code: 'ANSE4', name: 'Anse Marie Louise' },
          { code: 'ANSE5', name: 'Anse Lazio' },
          { code: 'ANSE6', name: 'Anse Georgette' }
        ]
      },
      { code: 'FAR', name: 'Farquhar',
        cities: [
          { code: 'FAR', name: 'Farquhar' },
          { code: 'PROV', name: 'Providence' },
          { code: 'WEL', name: 'Welsh' },
          { code: 'POI', name: 'Pointe au Sel' },
          { code: 'ANSE', name: 'Anse Volbert' },
          { code: 'ANSE2', name: 'Anse Takamaka' },
          { code: 'ANSE3', name: 'Anse Bouchon' },
          { code: 'ANSE4', name: 'Anse Marie Louise' },
          { code: 'ANSE5', name: 'Anse Lazio' },
          { code: 'ANSE6', name: 'Anse Georgette' }
        ]
      },
      { code: 'PROV', name: 'Providence',
        cities: [
          { code: 'PROV', name: 'Providence' },
          { code: 'FAR', name: 'Farquhar' },
          { code: 'WEL', name: 'Welsh' },
          { code: 'POI', name: 'Pointe au Sel' },
          { code: 'ANSE', name: 'Anse Volbert' },
          { code: 'ANSE2', name: 'Anse Takamaka' },
          { code: 'ANSE3', name: 'Anse Bouchon' },
          { code: 'ANSE4', name: 'Anse Marie Louise' },
          { code: 'ANSE5', name: 'Anse Lazio' },
          { code: 'ANSE6', name: 'Anse Georgette' }
        ]
      },
      { code: 'WEL', name: 'Welsh',
        cities: [
          { code: 'WEL', name: 'Welsh' },
          { code: 'PROV', name: 'Providence' },
          { code: 'FAR', name: 'Farquhar' },
          { code: 'POI', name: 'Pointe au Sel' },
          { code: 'ANSE', name: 'Anse Volbert' },
          { code: 'ANSE2', name: 'Anse Takamaka' },
          { code: 'ANSE3', name: 'Anse Bouchon' },
          { code: 'ANSE4', name: 'Anse Marie Louise' },
          { code: 'ANSE5', name: 'Anse Lazio' },
          { code: 'ANSE6', name: 'Anse Georgette' }
        ]
      },
      { code: 'POI', name: 'Pointe au Sel',
        cities: [
          { code: 'POI', name: 'Pointe au Sel' },
          { code: 'ANSE', name: 'Anse Volbert' },
          { code: 'ANSE2', name: 'Anse Takamaka' },
          { code: 'ANSE3', name: 'Anse Bouchon' },
          { code: 'ANSE4', name: 'Anse Marie Louise' },
          { code: 'ANSE5', name: 'Anse Lazio' },
          { code: 'ANSE6', name: 'Anse Georgette' },
          { code: 'ANSE7', name: 'Anse La Blague' },
          { code: 'ANSE8', name: 'Anse Marie Louise' }
        ]
      },
      { code: 'ANSE', name: 'Anse Volbert',
        cities: [
          { code: 'ANSE', name: 'Anse Volbert' },
          { code: 'ANSE2', name: 'Anse Takamaka' },
          { code: 'ANSE3', name: 'Anse Bouchon' },
          { code: 'ANSE4', name: 'Anse Marie Louise' },
          { code: 'ANSE5', name: 'Anse Lazio' },
          { code: 'ANSE6', name: 'Anse Georgette' },
          { code: 'ANSE7', name: 'Anse La Blague' },
          { code: 'ANSE8', name: 'Anse Marie Louise' },
          { code: 'ANSE9', name: 'Anse La Blague' }
        ]
      },
      { code: 'ANSE2', name: 'Anse Takamaka',
        cities: [
          { code: 'ANSE2', name: 'Anse Takamaka' },
          { code: 'ANSE', name: 'Anse Volbert' },
          { code: 'ANSE3', name: 'Anse Bouchon' },
          { code: 'ANSE4', name: 'Anse Marie Louise' },
          { code: 'ANSE5', name: 'Anse Lazio' },
          { code: 'ANSE6', name: 'Anse Georgette' },
          { code: 'ANSE7', name: 'Anse La Blague' },
          { code: 'ANSE8', name: 'Anse Marie Louise' },
          { code: 'ANSE9', name: 'Anse La Blague' }
        ]
      },
      { code: 'ANSE3', name: 'Anse Bouchon',
        cities: [
          { code: 'ANSE3', name: 'Anse Bouchon' },
          { code: 'ANSE', name: 'Anse Volbert' },
          { code: 'ANSE2', name: 'Anse Takamaka' },
          { code: 'ANSE4', name: 'Anse Marie Louise' },
          { code: 'ANSE5', name: 'Anse Lazio' },
          { code: 'ANSE6', name: 'Anse Georgette' },
          { code: 'ANSE7', name: 'Anse La Blague' },
          { code: 'ANSE8', name: 'Anse Marie Louise' },
          { code: 'ANSE9', name: 'Anse La Blague' }
        ]
      },
      { code: 'ANSE4', name: 'Anse Marie Louise',
        cities: [
          { code: 'ANSE4', name: 'Anse Marie Louise' },
          { code: 'ANSE', name: 'Anse Volbert' },
          { code: 'ANSE2', name: 'Anse Takamaka' },
          { code: 'ANSE3', name: 'Anse Bouchon' },
          { code: 'ANSE5', name: 'Anse Lazio' },
          { code: 'ANSE6', name: 'Anse Georgette' },
          { code: 'ANSE7', name: 'Anse La Blague' },
          { code: 'ANSE8', name: 'Anse Marie Louise' },
          { code: 'ANSE9', name: 'Anse La Blague' }
        ]
      },
      { code: 'ANSE5', name: 'Anse Lazio',
        cities: [
          { code: 'ANSE5', name: 'Anse Lazio' },
          { code: 'ANSE', name: 'Anse Volbert' },
          { code: 'ANSE2', name: 'Anse Takamaka' },
          { code: 'ANSE3', name: 'Anse Bouchon' },
          { code: 'ANSE4', name: 'Anse Marie Louise' },
          { code: 'ANSE6', name: 'Anse Georgette' },
          { code: 'ANSE7', name: 'Anse La Blague' },
          { code: 'ANSE8', name: 'Anse Marie Louise' },
          { code: 'ANSE9', name: 'Anse La Blague' }
        ]
      },
      { code: 'ANSE6', name: 'Anse Georgette',
        cities: [
          { code: 'ANSE6', name: 'Anse Georgette' },
          { code: 'ANSE', name: 'Anse Volbert' },
          { code: 'ANSE2', name: 'Anse Takamaka' },
          { code: 'ANSE3', name: 'Anse Bouchon' },
          { code: 'ANSE4', name: 'Anse Marie Louise' },
          { code: 'ANSE5', name: 'Anse Lazio' },
          { code: 'ANSE7', name: 'Anse La Blague' },
          { code: 'ANSE8', name: 'Anse Marie Louise' },
          { code: 'ANSE9', name: 'Anse La Blague' }
        ]
      },
      { code: 'ANSE7', name: 'Anse La Blague',
        cities: [
          { code: 'ANSE7', name: 'Anse La Blague' },
          { code: 'ANSE', name: 'Anse Volbert' },
          { code: 'ANSE2', name: 'Anse Takamaka' },
          { code: 'ANSE3', name: 'Anse Bouchon' },
          { code: 'ANSE4', name: 'Anse Marie Louise' },
          { code: 'ANSE5', name: 'Anse Lazio' },
          { code: 'ANSE6', name: 'Anse Georgette' },
          { code: 'ANSE8', name: 'Anse Marie Louise' },
          { code: 'ANSE9', name: 'Anse La Blague' }
        ]
      },
      { code: 'ANSE8', name: 'Anse Marie Louise',
        cities: [
          { code: 'ANSE8', name: 'Anse Marie Louise' },
          { code: 'ANSE', name: 'Anse Volbert' },
          { code: 'ANSE2', name: 'Anse Takamaka' },
          { code: 'ANSE3', name: 'Anse Bouchon' },
          { code: 'ANSE4', name: 'Anse Marie Louise' },
          { code: 'ANSE5', name: 'Anse Lazio' },
          { code: 'ANSE6', name: 'Anse Georgette' },
          { code: 'ANSE7', name: 'Anse La Blague' },
          { code: 'ANSE9', name: 'Anse La Blague' }
        ]
      },
      { code: 'ANSE9', name: 'Anse La Blague',
        cities: [
          { code: 'ANSE9', name: 'Anse La Blague' },
          { code: 'ANSE', name: 'Anse Volbert' },
          { code: 'ANSE2', name: 'Anse Takamaka' },
          { code: 'ANSE3', name: 'Anse Bouchon' },
          { code: 'ANSE4', name: 'Anse Marie Louise' },
          { code: 'ANSE5', name: 'Anse Lazio' },
          { code: 'ANSE6', name: 'Anse Georgette' },
          { code: 'ANSE8', name: 'Anse Marie Louise' },
          { code: 'ANSE9', name: 'Anse La Blague' }
        ]
      }
    ]
  };
