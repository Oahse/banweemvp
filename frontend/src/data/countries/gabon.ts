/**
 * Gabon country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const gabon: Country = {
    code: 'GA',
    name: 'Gabon',
    taxInfo: { standardRate: 10, taxName: 'VAT', currency: 'XAF', region: 'MEA' },
    provinces: [
      { code: 'EST', name: 'Estuaire',
        cities: [
          { code: 'LIB', name: 'Libreville' },
          { code: 'POR', name: 'Port-Gentil' },
          { code: 'OYO', name: 'Oyem' },
          { code: 'BIT', name: 'Bitam' },
          { code: 'MAK', name: 'Makokou' },
          { code: 'KOU', name: 'Koulamoutou' },
          { code: 'MEL', name: 'Melen' },
          { code: 'NDJ', name: 'Ndjolé' },
          { code: 'NDO', name: 'Ndounga' },
          { code: 'NZE', name: 'Nzeng' }
        ]
      },
      { code: 'HAU', name: 'Haut-Ogooué',
        cities: [
          { code: 'FRV', name: 'Franceville' },
          { code: 'MOU', name: 'Moanda' },
          { code: 'MOU2', name: 'Mounana' },
          { code: 'MOU3', name: 'Moulengui' },
          { code: 'MOU4', name: 'Mouila' },
          { code: 'MOU5', name: 'Mounana' },
          { code: 'MOU6', name: 'Moulengui' },
          { code: 'MOU7', name: 'Moanda' },
          { code: 'MOU8', name: 'Mounana' },
          { code: 'MOU9', name: 'Moulengui' }
        ]
      },
      { code: 'MOY', name: 'Moyen-Ogooué',
        cities: [
          { code: 'LAM', name: 'Lambaréné' },
          { code: 'MOU', name: 'Mouila' },
          { code: 'MOU2', name: 'Mounana' },
          { code: 'MOU3', name: 'Moulengui' },
          { code: 'MOU4', name: 'Moanda' },
          { code: 'MOU5', name: 'Mounana' },
          { code: 'MOU6', name: 'Moulengui' },
          { code: 'MOU7', name: 'Moanda' },
          { code: 'MOU8', name: 'Mounana' },
          { code: 'MOU9', name: 'Moulengui' }
        ]
      },
      { code: 'NGO', name: 'Ngounié',
        cities: [
          { code: 'LAM', name: 'Lambaréné' },
          { code: 'MOU', name: 'Mouila' },
          { code: 'MOU2', name: 'Mounana' },
          { code: 'MOU3', name: 'Moulengui' },
          { code: 'MOU4', name: 'Moanda' },
          { code: 'MOU5', name: 'Mounana' },
          { code: 'MOU6', name: 'Moulengui' },
          { code: 'MOU7', name: 'Moanda' },
          { code: 'MOU8', name: 'Mounana' },
          { code: 'MOU9', name: 'Moulengui' }
        ]
      },
      { code: 'NYA', name: 'Nyanga',
        cities: [
          { code: 'TCH', name: 'Tchibanga' },
          { code: 'MOU', name: 'Mouila' },
          { code: 'MOU2', name: 'Mounana' },
          { code: 'MOU3', name: 'Moulengui' },
          { code: 'MOU4', name: 'Moanda' },
          { code: 'MOU5', name: 'Mounana' },
          { code: 'MOU6', name: 'Moulengui' },
          { code: 'MOU7', name: 'Moanda' },
          { code: 'MOU8', name: 'Mounana' },
          { code: 'MOU9', name: 'Moulengui' }
        ]
      },
      { code: 'OGO', name: 'Ogooué-Ivindo',
        cities: [
          { code: 'MAK', name: 'Makokou' },
          { code: 'MOU', name: 'Mouila' },
          { code: 'MOU2', name: 'Mounana' },
          { code: 'MOU3', name: 'Moulengui' },
          { code: 'MOU4', name: 'Moanda' },
          { code: 'MOU5', name: 'Mounana' },
          { code: 'MOU6', name: 'Moulengui' },
          { code: 'MOU7', name: 'Moanda' },
          { code: 'MOU8', name: 'Mounana' },
          { code: 'MOU9', name: 'Moulengui' }
        ]
      },
      { code: 'OLO', name: 'Ogooué-Lolo',
        cities: [
          { code: 'KOU', name: 'Koulamoutou' },
          { code: 'MOU', name: 'Mouila' },
          { code: 'MOU2', name: 'Mounana' },
          { code: 'MOU3', name: 'Moulengui' },
          { code: 'MOU4', name: 'Moanda' },
          { code: 'MOU5', name: 'Mounana' },
          { code: 'MOU6', name: 'Moulengui' },
          { code: 'MOU7', name: 'Moanda' },
          { code: 'MOU8', name: 'Mounana' },
          { code: 'MOU9', name: 'Moulengui' }
        ]
      },
      { code: 'OMO', name: 'Ogooué-Maritime',
        cities: [
          { code: 'POR', name: 'Port-Gentil' },
          { code: 'MOU', name: 'Mouila' },
          { code: 'MOU2', name: 'Mounana' },
          { code: 'MOU3', name: 'Moulengui' },
          { code: 'MOU4', name: 'Moanda' },
          { code: 'MOU5', name: 'Mounana' },
          { code: 'MOU6', name: 'Moulengui' },
          { code: 'MOU7', name: 'Moanda' },
          { code: 'MOU8', name: 'Mounana' },
          { code: 'MOU9', name: 'Moulengui' }
        ]
      },
      { code: 'WOL', name: 'Woleu-Ntem',
        cities: [
          { code: 'OYE', name: 'Oyem' },
          { code: 'BIT', name: 'Bitam' },
          { code: 'MOU', name: 'Mouila' },
          { code: 'MOU2', name: 'Mounana' },
          { code: 'MOU3', name: 'Moulengui' },
          { code: 'MOU4', name: 'Moanda' },
          { code: 'MOU5', name: 'Mounana' },
          { code: 'MOU6', name: 'Moulengui' },
          { code: 'MOU7', name: 'Moanda' },
          { code: 'MOU8', name: 'Mounana' }
        ]
      }
    ]
  };
