/**
 * Mali country data with regions and cities
 */

import { Country } from './index';

export const mali: Country = {
  code: 'ML',
  name: 'Mali',
  flag: '🇲🇱',
  capital: 'Bamako',
  area: 1240192,
  currencySymbol: 'CFA',
  officialLanguages: ['French'],
  demonym: 'Malian',
  taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'XOF', region: 'MEA' },
  divisions: [
    { code: 'BAM', name: 'Bamako', type: 'district',
      cities: [
        { code: 'BAMAKO', name: 'Bamako' },
        { code: 'KATI', name: 'Kati' },
        { code: 'KALABANKORO', name: 'Kalabankoro' },
        { code: 'SIBY', name: 'Siby' },
        { code: 'KANGABA', name: 'Kangaba' }
      ]
    },
    { code: 'KAY', name: 'Kayes', type: 'region',
      cities: [
        { code: 'KAYES', name: 'Kayes' },
        { code: 'KITA', name: 'Kita' },
        { code: 'KEMEKODI', name: 'Kéniéko' },
        { code: 'DIOILA', name: 'Diéma' },
        { code: 'YELIMANE', name: 'Yélimané' }
      ]
    },
    { code: 'KOU', name: 'Koulikoro', type: 'region',
      cities: [
        { code: 'KOULIKORO', name: 'Koulikoro' },
        { code: 'KATI', name: 'Kati' },
        { code: 'KOLONDIEBA', name: 'Kolondiéba' },
        { code: 'NARA', name: 'Nara' },
        { code: 'BANAMBA', name: 'Banamba' }
      ]
    },
    { code: 'SIC', name: 'Sikasso', type: 'region',
      cities: [
        { code: 'SIKASSO', name: 'Sikasso' },
        { code: 'KOUTIALA', name: 'Koutiala' },
        { code: 'SINDOU', name: 'Sindou' },
        { code: 'BOUGOUNI', name: 'Bougouni' },
        { code: 'YANFOLILA', name: 'Yanfolila' }
      ]
    },
    { code: 'SEG', name: 'Ségou', type: 'region',
      cities: [
        { code: 'SEGOU', name: 'Ségou' },
        { code: 'BLA', name: 'Bla' },
        { code: 'SAN', name: 'San' },
        { code: 'BAROUELI', name: 'Barouéli' },
        { code: 'MACINA', name: 'Macina' }
      ]
    },
    { code: 'MOG', name: 'Mopti', type: 'region',
      cities: [
        { code: 'MOPTI', name: 'Mopti' },
        { code: 'DJENNE', name: 'Djenné' },
        { code: 'BANDIAGARA', name: 'Bandiagara' },
        { code: 'DOUENTZA', name: 'Douentza' },
        { code: 'KORO', name: 'Koro' }
      ]
    },
    { code: 'TOM', name: 'Tombouctou', type: 'region',
      cities: [
        { code: 'TOMBOUCTOU', name: 'Tombouctou' },
        { code: 'GOUNDAM', name: 'Goundam' },
        { code: 'DIRÉ', name: 'Diré' },
        { code: 'GOURMA', name: 'Gourma-Rharous' },
        { code: 'NIAFONKE', name: 'Niafunké' }
      ]
    },
    { code: 'GAO', name: 'Gao', type: 'region',
      cities: [
        { code: 'GAO', name: 'Gao' },
        { code: 'MENAKA', name: 'Ménaka' },
        { code: 'ANSONGO', name: 'Ansongo' },
        { code: 'BOUREM', name: 'Bourem' },
        { code: 'TIN-ESSAKO', name: 'Tin-Essako' }
      ]
    },
    { code: 'KID', name: 'Kidal', type: 'region',
      cities: [
        { code: 'KIDAL', name: 'Kidal' },
        { code: 'TESSALIT', name: 'Tessalit' },
        { code: 'AGUEHO', name: 'Aguelhok' },
        { code: 'BOURESSA', name: 'Bouressa' },
        { code: 'ESOUK', name: 'Esouk' }
      ]
    }
  ]
};

export default mali;
