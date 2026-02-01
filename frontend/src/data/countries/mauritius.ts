/**
 * Mauritius country data with regions, cities, and tax information
 */

import { Country } from './index';

export const mauritius: Country = {
    code: 'MU',
    name: 'Mauritius',
    taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'MUR', region: 'MEA' },
    provinces: [
      { code: 'POR', name: 'Port Louis',
        cities: [
          { code: 'POR', name: 'Port Louis' },
          { code: 'VAC', name: 'Vacuous' },
          { code: 'TRO', name: 'Triolet' },
          { code: 'CURE', name: 'Curepipe' },
          { code: 'QUA', name: 'Quatre Bornes' },
          { code: 'ROSE', name: 'Rose Hill' },
          { code: 'VU', name: 'Vacoas' },
          { code: 'PHO', name: 'Phoenix' },
          { code: 'BEA', name: 'Beau Bassin' },
          { code: 'BEL', name: 'Bel Air' }
        ]
      },
      { code: 'PAM', name: 'Pamplemousses',
        cities: [
          { code: 'CUR', name: 'Curepipe' },
          { code: 'QUA', name: 'Quatre Bornes' },
          { code: 'ROSE', name: 'Rose Hill' },
          { code: 'VAC', name: 'Vacuous' },
          { code: 'TRO', name: 'Triolet' },
          { code: 'POR', name: 'Port Louis' },
          { code: 'VU', name: 'Vacoas' },
          { code: 'PHO', name: 'Phoenix' },
          { code: 'BEA', name: 'Beau Bassin' },
          { code: 'BEL', name: 'Bel Air' }
        ]
      },
      { code: 'ROG', name: 'Riviere du Rempart',
        cities: [
          { code: 'TRO', name: 'Triolet' },
          { code: 'VAC', name: 'Vacuous' },
          { code: 'POR', name: 'Port Louis' },
          { code: 'CUR', name: 'Curepipe' },
          { code: 'QUA', name: 'Quatre Bornes' },
          { code: 'ROSE', name: 'Rose Hill' },
          { code: 'VU', name: 'Vacoas' },
          { code: 'PHO', name: 'Phoenix' },
          { code: 'BEA', name: 'Beau Bassin' },
          { code: 'BEL', name: 'Bel Air' }
        ]
      },
      { code: 'PLA', name: 'Plaines Wilhems',
        cities: [
          { code: 'QUA', name: 'Quatre Bornes' },
          { code: 'ROSE', name: 'Rose Hill' },
          { code: 'VAC', name: 'Vacuous' },
          { code: 'TRO', name: 'Triolet' },
          { code: 'POR', name: 'Port Louis' },
          { code: 'CUR', name: 'Curepipe' },
          { code: 'VU', name: 'Vacoas' },
          { code: 'PHO', name: 'Phoenix' },
          { code: 'BEA', name: 'Beau Bassin' },
          { code: 'BEL', name: 'Bel Air' }
        ]
      },
      { code: 'MOK', name: 'Moka',
        cities: [
          { code: 'VAC', name: 'Vacuous' },
          { code: 'TRO', name: 'Triolet' },
          { code: 'POR', name: 'Port Louis' },
          { code: 'CUR', name: 'Curepipe' },
          { code: 'QUA', name: 'Quatre Bornes' },
          { code: 'ROSE', name: 'Rose Hill' },
          { code: 'VU', name: 'Vacoas' },
          { code: 'PHO', name: 'Phoenix' },
          { code: 'BEA', name: 'Beau Bassin' },
          { code: 'BEL', name: 'Bel Air' }
        ]
      },
      { code: 'FLA', name: 'Flacq',
        cities: [
          { code: 'CEN', name: 'Centre de Flacq' },
          { code: 'POST', name: 'Poste de Flacq' },
          { code: 'GRAND', name: 'Grand Port' },
          { code: 'BRA', name: "Bras d'Eau" },
          { code: 'CAMP', name: 'Camp de Masque' },
          { code: 'BEL', name: 'Bel Air' },
          { code: 'BEA', name: 'Beau Bassin' },
          { code: 'VAC', name: 'Vacuous' },
          { code: 'TRO', name: 'Triolet' },
          { code: 'POR', name: 'Port Louis' }
        ]
      },
      { code: 'GR', name: 'Grand Port',
        cities: [
          { code: 'GRAND', name: 'Grand Port' },
          { code: 'CEN', name: 'Centre de Flacq' },
          { code: 'POST', name: 'Poste de Flacq' },
          { code: 'BRA', name: "Bras d'Eau" },
          { code: 'CAMP', name: 'Camp de Masque' },
          { code: 'BEL', name: 'Bel Air' },
          { code: 'BEA', name: 'Beau Bassin' },
          { code: 'VAC', name: 'Vacuous' },
          { code: 'TRO', name: 'Triolet' },
          { code: 'POR', name: 'Port Louis' }
        ]
      },
      { code: 'SAV', name: 'Savanne',
        cities: [
          { code: 'SAV', name: 'Savanne' },
          { code: 'SOUL', name: 'Souillac' },
          { code: 'SUR', name: 'Surinam' },
          { code: 'CHAM', name: 'Chamarel' },
          { code: 'RIOT', name: 'Riviere des Anguilles' },
          { code: 'BEL', name: 'Bel Air' },
          { code: 'BEA', name: 'Beau Bassin' },
          { code: 'VAC', name: 'Vacuous' },
          { code: 'TRO', name: 'Triolet' },
          { code: 'POR', name: 'Port Louis' }
        ]
      },
      { code: 'SOUL', name: 'Souillac',
        cities: [
          { code: 'SOUL', name: 'Souillac' },
          { code: 'SAV', name: 'Savanne' },
          { code: 'SUR', name: 'Surinam' },
          { code: 'CHAM', name: 'Chamarel' },
          { code: 'RIOT', name: 'Riviere des Anguilles' },
          { code: 'BEL', name: 'Bel Air' },
          { code: 'BEA', name: 'Beau Bassin' },
          { code: 'VAC', name: 'Vacuous' },
          { code: 'TRO', name: 'Triolet' },
          { code: 'POR', name: 'Port Louis' }
        ]
      },
      { code: 'ROD', name: 'Rodrigues',
        cities: [
          { code: 'POR', name: 'Port Mathurin' },
          { code: 'PLA', name: 'Plaine Corail' },
          { code: 'MONT', name: 'Mont Lubin' },
          { code: 'BAIL', name: 'Baie aux Huîtres' },
          { code: 'CAMP', name: 'Camp du Roche' },
          { code: 'PET', name: 'Petite Butte' },
          { code: 'GRAND', name: 'Grand Baie' },
          { code: 'BEL', name: 'Bel Air' },
          { code: 'BEA', name: 'Beau Bassin' },
          { code: 'VAC', name: 'Vacuous' }
        ]
      },
      { code: 'AGR', name: 'Agalega',
        cities: [
          { code: 'AGR', name: 'Agalega' },
          { code: 'COCO', name: 'Coco Island' },
          { code: 'BEL', name: 'Bel Air' },
          { code: 'BEA', name: 'Beau Bassin' },
          { code: 'VAC', name: 'Vacuous' },
          { code: 'TRO', name: 'Triolet' },
          { code: 'POR', name: 'Port Louis' },
          { code: 'CUR', name: 'Curepipe' },
          { code: 'QUA', name: 'Quatre Bornes' },
          { code: 'ROSE', name: 'Rose Hill' }
        ]
      },
      { code: 'CAR', name: 'Cargados Carajos',
        cities: [
          { code: 'CAR', name: 'Cargados Carajos' },
          { code: 'ST', name: 'St Brandon' },
          { code: 'RAF', name: 'Rafael' },
          { code: 'SIRE', name: 'Siren Island' },
          { code: 'BEL', name: 'Bel Air' },
          { code: 'BEA', name: 'Beau Bassin' },
          { code: 'VAC', name: 'Vacuous' },
          { code: 'TRO', name: 'Triolet' },
          { code: 'POR', name: 'Port Louis' },
          { code: 'CUR', name: 'Curepipe' }
        ]
      },
      { code: 'VAC', name: 'Vacuous',
        cities: [
          { code: 'VAC', name: 'Vacuous' },
          { code: 'TRO', name: 'Triolet' },
          { code: 'POR', name: 'Port Louis' },
          { code: 'CUR', name: 'Curepipe' },
          { code: 'QUA', name: 'Quatre Bornes' },
          { code: 'ROSE', name: 'Rose Hill' },
          { code: 'VU', name: 'Vacoas' },
          { code: 'PHO', name: 'Phoenix' },
          { code: 'BEA', name: 'Beau Bassin' },
          { code: 'BEL', name: 'Bel Air' }
        ]
      },
      { code: 'TRO', name: 'Triolet',
        cities: [
          { code: 'TRO', name: 'Triolet' },
          { code: 'VAC', name: 'Vacuous' },
          { code: 'POR', name: 'Port Louis' },
          { code: 'CUR', name: 'Curepipe' },
          { code: 'QUA', name: 'Quatre Bornes' },
          { code: 'ROSE', name: 'Rose Hill' },
          { code: 'VU', name: 'Vacoas' },
          { code: 'PHO', name: 'Phoenix' },
          { code: 'BEA', name: 'Beau Bassin' },
          { code: 'BEL', name: 'Bel Air' }
        ]
      },
      { code: 'CUR', name: 'Curepipe',
        cities: [
          { code: 'CUR', name: 'Curepipe' },
          { code: 'QUA', name: 'Quatre Bornes' },
          { code: 'ROSE', name: 'Rose Hill' },
          { code: 'VAC', name: 'Vacuous' },
          { code: 'TRO', name: 'Triolet' },
          { code: 'POR', name: 'Port Louis' },
          { code: 'VU', name: 'Vacoas' },
          { code: 'PHO', name: 'Phoenix' },
          { code: 'BEA', name: 'Beau Bassin' },
          { code: 'BEL', name: 'Bel Air' }
        ]
      },
      { code: 'QUA', name: 'Quatre Bornes',
        cities: [
          { code: 'QUA', name: 'Quatre Bornes' },
          { code: 'ROSE', name: 'Rose Hill' },
          { code: 'VAC', name: 'Vacuous' },
          { code: 'TRO', name: 'Triolet' },
          { code: 'POR', name: 'Port Louis' },
          { code: 'CUR', name: 'Curepipe' },
          { code: 'VU', name: 'Vacoas' },
          { code: 'PHO', name: 'Phoenix' },
          { code: 'BEA', name: 'Beau Bassin' },
          { code: 'BEL', name: 'Bel Air' }
        ]
      },
      { code: 'ROSE', name: 'Rose Hill',
        cities: [
          { code: 'ROSE', name: 'Rose Hill' },
          { code: 'VAC', name: 'Vacuous' },
          { code: 'TRO', name: 'Triolet' },
          { code: 'POR', name: 'Port Louis' },
          { code: 'CUR', name: 'Curepipe' },
          { code: 'QUA', name: 'Quatre Bornes' },
          { code: 'VU', name: 'Vacoas' },
          { code: 'PHO', name: 'Phoenix' },
          { code: 'BEA', name: 'Beau Bassin' },
          { code: 'BEL', name: 'Bel Air' }
        ]
      },
      { code: 'VU', name: 'Vacoas',
        cities: [
          { code: 'VU', name: 'Vacoas' },
          { code: 'PHO', name: 'Phoenix' },
          { code: 'BEA', name: 'Beau Bassin' },
          { code: 'BEL', name: 'Bel Air' },
          { code: 'VAC', name: 'Vacuous' },
          { code: 'TRO', name: 'Triolet' },
          { code: 'POR', name: 'Port Louis' },
          { code: 'CUR', name: 'Curepipe' },
          { code: 'QUA', name: 'Quatre Bornes' },
          { code: 'ROSE', name: 'Rose Hill' }
        ]
      },
      { code: 'PHO', name: 'Phoenix',
        cities: [
          { code: 'PHO', name: 'Phoenix' },
          { code: 'BEA', name: 'Beau Bassin' },
          { code: 'BEL', name: 'Bel Air' },
          { code: 'VAC', name: 'Vacuous' },
          { code: 'TRO', name: 'Triolet' },
          { code: 'POR', name: 'Port Louis' },
          { code: 'CUR', name: 'Curepipe' },
          { code: 'QUA', name: 'Quatre Bornes' },
          { code: 'ROSE', name: 'Rose Hill' },
          { code: 'VU', name: 'Vacoas' }
        ]
      },
      { code: 'BEA', name: 'Beau Bassin',
        cities: [
          { code: 'BEA', name: 'Beau Bassin' },
          { code: 'BEL', name: 'Bel Air' },
          { code: 'VAC', name: 'Vacuous' },
          { code: 'TRO', name: 'Triolet' },
          { code: 'POR', name: 'Port Louis' },
          { code: 'CUR', name: 'Curepipe' },
          { code: 'QUA', name: 'Quatre Bornes' },
          { code: 'ROSE', name: 'Rose Hill' },
          { code: 'VU', name: 'Vacoas' },
          { code: 'PHO', name: 'Phoenix' }
        ]
      },
      { code: 'BEL', name: 'Bel Air',
        cities: [
          { code: 'BEL', name: 'Bel Air' },
          { code: 'BEA', name: 'Beau Bassin' },
          { code: 'VAC', name: 'Vacuous' },
          { code: 'TRO', name: 'Triolet' },
          { code: 'POR', name: 'Port Louis' },
          { code: 'CUR', name: 'Curepipe' },
          { code: 'QUA', name: 'Quatre Bornes' },
          { code: 'ROSE', name: 'Rose Hill' },
          { code: 'VU', name: 'Vacoas' },
          { code: 'PHO', name: 'Phoenix' }
        ]
      }
    ]
  };
