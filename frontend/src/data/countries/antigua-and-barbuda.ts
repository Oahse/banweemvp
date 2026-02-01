/**
 * Antigua and Barbuda country data with parishes and cities
 */

import { Country } from './index';

export const antiguaandbarbuda: Country = {
  code: 'AG',
  name: 'Antigua and Barbuda',
  flag: '🇦🇦',
  capital: 'St. John\'s',
  area: 442,
  currencySymbol: 'EC$',
  officialLanguages: ['English', 'Antiguan Creole', 'Barbudan Creole'],
  demonym: 'Antiguan and Barbudan',
  taxInfo: { standardRate: 15, taxName: 'ABST', currency: 'XCD', region: 'NA' },
  divisions: [
    { code: 'STJ', name: 'St. John\'s', type: 'parish',
      cities: [
        { code: 'STJOHNS', name: 'St. John\'s' },
        { code: 'CODRINGTON', name: 'Codrington' },
        {     code: 'LIBERTA', name: 'Liberta' },
        { code: 'BOLANDS', name: 'Bolands' },
        { code: 'ALL SAINTS', name: 'All Saints' }
      ]
    },
    { code: 'COD', name: 'Codrington', type: 'parish',
      cities: [
        { code: 'CODRINGTON', name: 'Codrington' },
        { code: 'LIBERTA', name: 'Liberta' },
        { code: 'BOLANDS', name: 'Bolands' },
        { code: 'ALL SAINTS', name: 'All Saints' },
        { code: 'STJOHNS', name: 'St. John\'s' }
      ]
    },
    { code: 'LIB', name: 'Liberta', type: 'parish',
      cities: [
        { code: 'LIBERTA', name: 'Liberta' },
        { code: 'BOLANDS', name: 'Bolands' },
        { code: 'ALL SAINTS', name: 'All Saints' },
        { code: 'STJOHNS', name: 'St. John\'s' },
        { code: 'CODRINGTON', name: 'Codrington' }
      ]
    },
    { code: 'BOL', name: 'Bolands', type: 'parish',
      cities: [
        { code: 'BOLANDS', name: 'Bolands' },
        { code: 'ALL SAINTS', name: 'All Saints' },
        { code: 'STJOHNS', name: 'St. John\'s' },
        { code: 'CODRINGTON', name: 'Codrington' },
        { code: 'LIBERTA', name: 'Liberta' }
      ]
    },
    { code: 'ALL', name: 'All Saints', type: 'parish',
      cities: [
        { code: 'ALL SAINTS', name: 'All Saints' },
        { code: 'STJOHNS', name: 'St. John\'s' },
        { code: 'CODRINGTON', name: 'Codrington' },
        { code: 'LIBERTA', name: 'Liberta' },
        { code: 'BOLANDS', name: 'Bolands' }
      ]
    }
  ]
};
