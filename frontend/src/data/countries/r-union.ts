/**
 * Réunion country data with arrondissements and cities
 */

import { Country } from './index';

export const runion: Country = {
  code: 'RE',
  name: 'Réunion',
  flag: '🇷🇪',
  capital: 'Saint-Denis',
  area: 2511,
  currencySymbol: '€',
  officialLanguages: ['French'],
  demonym: 'Réunionese',
  taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'EUR', region: 'MEA' },
  divisions: [
    { code: 'SD', name: 'Saint-Denis', type: 'arrondissement',
      cities: [
        { code: 'SAINT_DENIS', name: 'Saint-Denis' },
        { code: 'SAINT_MARIE', name: 'Sainte-Marie' },
        { code: 'LA Possession', name: 'La Possession' },
        { code: 'SAINT_ANDRE', name: 'Saint-André' },
        { code: 'BRAS_PANON', name: 'Bras Panon' }
      ]
    },
    { code: 'STP', name: 'Saint-Paul', type: 'arrondissement',
      cities: [
        { code: 'SAINT_PAUL', name: 'Saint-Paul' },
        { code: 'LE_TAMpon', name: 'Le Tampon' },
        { code: 'ETANG_SALE', name: 'Étang-Salé' },
        { code: 'SAINT_LEU', name: 'Saint-Leu' },
        { code: 'LES_AVIRONS', name: 'Les Avirons' }
      ]
    },
    { code: 'STB', name: 'Saint-Benoît', type: 'arrondissement',
      cities: [
        { code: 'SAINT_BENOIT', name: 'Saint-Benoît' },
        { code: 'SAINT_ROSE', name: 'Sainte-Rose' },
        { code: 'SALAZIE', name: 'Salazie' },
        { code: 'CILAOS', name: 'Cilaos' },
        { code: 'L_ENTRE_DEUX', name: 'L\'Entre-Deux' }
      ]
    }
  ]
};
