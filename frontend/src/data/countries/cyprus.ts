/**
 * Cyprus country data with districts and cities
 */

import { Country } from './index';

export const cyprus: Country = {
  code: 'CY',
  name: 'Cyprus',
  flag: '🇨🇾',
  capital: 'Nicosia',
  area: 9251,
  currencySymbol: '€',
  officialLanguages: ['Greek', 'Turkish', 'English'],
  demonym: 'Cypriot',
  taxInfo: { standardRate: 19, taxName: 'VAT', currency: 'EUR', region: 'EU' },
  divisions: [
    { code: 'NIC', name: 'Nicosia', type: 'district',
      cities: [
        { code: 'NICOSIA', name: 'Nicosia' },
        { code: 'LIMASSOL', name: 'Limassol' },
        { code: 'LARNACA', name: 'Larnaca' },
        { code: 'PAPHOS', name: 'Paphos' },
        { code: 'FAMAGUSTA', name: 'Famagusta' }
      ]
    },
    { code: 'LIM', name: 'Limassol', type: 'district',
      cities: [
        { code: 'LIMASSOL', name: 'Limassol' },
        { code: 'LARNACA', name: 'Larnaca' },
        { code: 'PAPHOS', name: 'Paphos' },
        { code: 'FAMAGUSTA', name: 'Famagusta' },
        { code: 'NICOSIA', name: 'Nicosia' }
      ]
    },
    { code: 'LAR', name: 'Larnaca', type: 'district',
      cities: [
        { code: 'LARNACA', name: 'Larnaca' },
        { code: 'PAPHOS', name: 'Paphos' },
        { code: 'FAMAGUSTA', name: 'Famagusta' },
        { code: 'NICOSIA', name: 'Nicosia' },
        { code: 'LIMASSOL', name: 'Limassol' }
      ]
    },
    { code: 'PAP', name: 'Paphos', type: 'district',
      cities: [
        { code: 'PAPHOS', name: 'Paphos' },
        { code: 'FAMAGUSTA', name: 'Famagusta' },
        { code: 'NICOSIA', name: 'Nicosia' },
        { code: 'LIMASSOL', name: 'Limassol' },
        { code: 'LARNACA', name: 'Larnaca' }
      ]
    },
    { code: 'FAM', name: 'Famagusta', type: 'district',
      cities: [
        { code: 'FAMAGUSTA', name: 'Famagusta' },
        { code: 'NICOSIA', name: 'Nicosia' },
        { code: 'LIMASSOL', name: 'Limassol' },
        { code: 'LARNACA', name: 'Larnaca' },
        { code: 'PAPHOS', name: 'Paphos' }
      ]
    }
  ]
};

export default cyprus;
