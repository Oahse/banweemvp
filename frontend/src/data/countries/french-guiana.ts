/**
 * French Guiana country data with arrondissements and cities
 */

import { Country } from './index';

export const frenchguiana: Country = {
  code: 'GF',
  name: 'French Guiana',
  flag: '🇬🇫',
  capital: 'Cayenne',
  area: 83534,
  currencySymbol: '€',
  officialLanguages: ['French', 'Guianese Creole'],
  demonym: 'French Guianese',
  taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'EUR', region: 'LATAM' },
  divisions: [
    { code: 'CAY', name: 'Cayenne', type: 'arrondissement',
      cities: [
        { code: 'CAYENNE', name: 'Cayenne' },
        { code: 'SAINT LAURENT', name: 'Saint-Laurent-du-Maroni' },
        { code: 'KOUROU', name: 'Kourou' },
        { code: 'SAINT GEORGES', name: 'Saint-Georges' },
        { code: 'MARIPASOULA', name: 'Maripasoula' }
      ]
    },
    { code: 'SAINT', name: 'Saint-Laurent-du-Maroni', type: 'arrondissement',
      cities: [
        { code: 'SAINT LAURENT', name: 'Saint-Laurent-du-Maroni' },
        { code: 'KOUROU', name: 'Kourou' },
        { code: 'SAINT GEORGES', name: 'Saint-Georges' },
        { code: 'MARIPASOULA', name: 'Maripasoula' },
        { code: 'CAYENNE', name: 'Cayenne' }
      ]
    },
    { code: 'KOU', name: 'Kourou', type: 'arrondissement',
      cities: [
        { code: 'KOUROU', name: 'Kourou' },
        { code: 'SAINT GEORGES', name: 'Saint-Georges' },
        { code: 'MARIPASOULA', name: 'Maripasoula' },
        { code: 'CAYENNE', name: 'Cayenne' },
        { code: 'SAINT LAURENT', name: 'Saint-Laurent-du-Maroni' }
      ]
    },
    { code: 'GEOR', name: 'Saint-Georges', type: 'arrondissement',
      cities: [
        { code: 'SAINT GEORGES', name: 'Saint-Georges' },
        { code: 'MARIPASOULA', name: 'Maripasoula' },
        { code: 'CAYENNE', name: 'Cayenne' },
        { code: 'SAINT LAURENT', name: 'Saint-Laurent-du-Maroni' },
        { code: 'KOUROU', name: 'Kourou' }
      ]
    },
    { code: 'MARI', name: 'Maripasoula', type: 'arrondissement',
      cities: [
        { code: 'MARIPASOULA', name: 'Maripasoula' },
        { code: 'CAYENNE', name: 'Cayenne' },
        { code: 'SAINT LAURENT', name: 'Saint-Laurent-du-Maroni' },
        { code: 'KOUROU', name: 'Kourou' },
        { code: 'SAINT GEORGES', name: 'Saint-Georges' }
      ]
    }
  ]
};
