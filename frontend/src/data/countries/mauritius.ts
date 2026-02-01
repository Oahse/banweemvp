/**
 * Mauritius country data with islands and cities
 */

import { Country } from './index';

export const mauritius: Country = {
  code: 'MU',
  name: 'Mauritius',
  flag: '🇲🇺',
  capital: 'Port Louis',
  area: 2040,
  currencySymbol: 'Rs',
  officialLanguages: ['English'],
  demonym: 'Mauritian',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'USD', region: 'MEA' },
  divisions: [
    { code: 'MAU', name: 'Mauritius', type: 'island',
      cities: [
        { code: 'PORT', name: 'Port Louis' },
        { code: 'CUREPIPE', name: 'Curepipe' },
        { code: 'VACOAS', name: 'Vacoas' },
        { code: 'QUATRE', name: 'Quatre Bornes' },
        { code: 'ROSE', name: 'Rose Hill' }
      ]
    },
    { code: 'ROD', name: 'Rodrigues', type: 'island',
      cities: [
        { code: 'PORT', name: 'Port Mathurin' },
        { code: 'RODRIGUES', name: 'Rodrigues' },
        { code: 'MONTUB', name: 'Mont Lubin' },
        { code: 'CITADONNEL', name: 'Citadelle Donat' },
        { code: 'BAILLE', name: 'Baie du Tombeau' }
      ]
    },
    { code: 'AG', name: 'Agalega', type: 'island',
      cities: [
        { code: 'AGALEGA', name: 'Agalega' },
        { code: 'SOUTH', name: 'South Island' },
        { code: 'NORTH', name: 'North Island' },
        { code: 'CRABE', name: 'Crabe Island' },
        { code: 'SIRENE', name: 'Siren Island' }
      ]
    },
    { code: 'CAR', name: 'Cargados Carajos', type: 'island',
      cities: [
        { code: 'CARGADOS', name: 'Cargados Carajos' },
        { code: 'SOUTH', name: 'South Island' },
        { code: 'NORTH', name: 'North Island' },
        { code: 'CRABE', name: 'Crabe Island' },
        { code: 'SIRENE', name: 'Siren Island' }
      ]
    }
  ]
};

export default mauritius;
